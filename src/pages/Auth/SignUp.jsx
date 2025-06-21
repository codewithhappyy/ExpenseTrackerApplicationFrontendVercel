import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import { UserContext } from "../../context/userContext";

const SignUp = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const { updateUser } = useContext(UserContext);

    const navigate = useNavigate();

    //Handle SignUp Form Submission
    const handleSignUp = async (e) => {
        e.preventDefault();

        if(!name){
            setError("Please enter your name");
            return;
        }

        if (!validateEmail(email) || !email) {
            setError("Please enter a valid email address");
            return;
        }

        if(!password){
            setError("Please enter your password");
            return;
        }

        if(password.length < 6){
            setError("Password must be at least 6 characters long");
            return;
        }

        setError(null);

        //SignUp API call 
        try {
            let profileImageUrl = null;
            
            if(profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
                //console.log('Upload Response:', imgUploadRes); 
                profileImageUrl = imgUploadRes.imageUrl; 
                //console.log('Profile URL:', profileImageUrl); 
            }
            
            const response = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, {
                name,
                email,
                password,
                profileImageUrl
            });

            const { token, user } = response.data;
            console.log('Registered User:', user); 

            if(token) {
                localStorage.setItem("token", token);
                updateUser(user);
                navigate("/dashboard");
            }

        } catch (error) {
            console.log('Error details:', error);
            if(error.response && error.response.data.message) { 
                setError(error.response.data.message);
            } else {
                setError("An error occurred. Please try again.");
            }
        } 
    }

    return (
        <AuthLayout>
            <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Create an Account</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Join us to track your expenses and income.
                </p>

                <form onSubmit={handleSignUp}>
                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label="Name"
                            placeholder="John Doe"
                            type="text"
                        />

                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email Address"
                            placeholder='john@example.com'
                            type='text'
                        />

                        <div className="md:col-span-2">
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                label="Password"
                                placeholder='Min 6 Characters'
                                type='password'
                            />
                        </div>

                    </div>

                    {error && (
                        <div className="text-red-500 text-xs pb-2.5">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-violet-500 shadow-lg shadow-purple-600/5 text-white py-2 px-4 rounded-md hover:bg-violet-600 hover:shadow-purple-600/10 transition-colors"
                    >
                        Sign Up
                    </button>

                    <p className="text-[13px] text-slate-800 mt-4">Already have an account?{''} <Link className="font-medium underline" to="/login">Login</Link></p>

                </form>
            </div>
        </AuthLayout>
    )
}

export default SignUp;