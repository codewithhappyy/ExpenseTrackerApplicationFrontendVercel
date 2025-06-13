import { useContext, useEffect } from "react"
import { UserContext } from "../context/userContext"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axiosInstance"
import { API_PATHS } from "../utils/apiPaths"

export const useUserAuth = () => {
    const { user, updateUser, clearUser }  = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
       if(user) return;

       let isMounter = true;

       const fetchUserInfo = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            if(isMounter && response.data) {
                updateUser(response.data)
            }
        } catch (error) {
            console.log('Failed to fetch user info:', error)
            if(isMounter) {
                clearUser();
                navigate("/login");
            }
        }
    }

    fetchUserInfo();

    return () => {
        isMounter = false;
    };
    }, [updateUser, clearUser, navigate])
}