import axios from "axios";
import { BASE_URL } from "./apiPaths";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use((response) => {
    return response;
},
    (error) => {
        if(error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        } else if (error.response.status === 500) {
            toast.error("Internal server error. Please try again later.");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;