import { useState } from "react";
import googleLogo from "../../assets/Google_logo.png";
import useAuth from "../../hooks/useAuth";
import { axiosPublic } from "../../utilities/utilities";
import { toast } from "react-toastify";

const GoogleLogin = () => {

    const { setUser, loginWithGoogle } = useAuth();
    const [errorMessage, setErrorMessage] = useState('');

    const handleGoogleLogin = () => {
        setErrorMessage('');
        loginWithGoogle()
            .then(async result => {
                await setUser(result.user);
                const userInfo = {
                    name: result.user.displayName,
                    email: result.user.email,
                };
                const {data} = await axiosPublic.post('/users', userInfo);
                if (data.message || data.insertedId) {
                    toast.success('Login Successful', {autoClose: 1500})
                }
            })
            .catch(error => setErrorMessage(error.message));
    }

    return (
        <div className="h-full flex flex-col justify-center items-center gap-2">
            <p onClick={handleGoogleLogin} className="cursor-pointer hover:scale-105 py-1 px-2 rounded-lg flex justify-center items-center gap-1 bg-[#575757] text-white w-max">
                <img src={googleLogo} className="w-3 h-3" alt="Google-logo" />
                <span className="text-xs">Login with Google</span>
            </p>
            <p className="text-red-600 text-lg">{errorMessage}</p>
        </div>
    );
};

export default GoogleLogin;