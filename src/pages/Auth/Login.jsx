import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const { updateUser } = useContext(UserContext);
 
    const navigate = useNavigate();

    //Handle Login Form Submission
    const handleLogin = async (e) => { 
        e.preventDefault();

        if(!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if(password.length < 6) {
            setError("Password must be at least 6 characters long");   
            return;
        }

        setError(null);

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password,
            });
            const { token, user } = response.data;

            if(token) {
                localStorage.setItem("token", token); 
                updateUser(user);
                navigate("/dashboard");
            }
            console.log(user);

        } catch (error) {
            if(error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    }

    return (
        <AuthLayout>
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Please enter your details to log in
                </p>

                <form onSubmit={handleLogin}>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email Address"
                        placeholder='john@example.com'
                        type='text'
                    />

                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        placeholder='Min 6 Characters'
                        type='password'
                    />

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-violet-500 shadow-lg shadow-purple-600/5 text-white py-2 px-4 rounded-md hover:bg-violet-600 hover:shadow-purple-600/10 transition-colors"
                    >
                        Log In
                    </button>

                    <p className="text-[13px] text-slate-800 mt-4">Don't have an account?{''} <Link className="font-medium underline" to="/signup">SignUp</Link></p>

                </form>
            </div>
        </AuthLayout>
    )
}

export default Login;