import { useContext, useState } from "react";
import googleLogo from "../assets/Google_logo.png";
import { axiosAll } from "../utilities/utilities";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthContext";

const GoogleLogin = () => {

    const { setUser, loginWithGoogle } = useContext(AuthContext);
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
                const {data} = await axiosAll.post('/users', userInfo);
                if (data.message || data.insertedId) {
                    toast.success('Login Successful', {autoClose: 1500})
                }
            })
            .catch(error => setErrorMessage(error.message));
    }

    return (
        <div className="h-[calc(100vh-57px)] sm:h-[calc(100vh-65px)] flex flex-col justify-center items-center gap-2">
            <p onClick={handleGoogleLogin} className="cursor-pointer hover:scale-105 py-2 px-4 rounded-lg flex justify-center items-center gap-2 bg-[#575757] text-white w-max">
                <img src={googleLogo} className="w-5 h-5" alt="Google-logo" />
                <span className="text-lg font-semibold">Login with Google</span>
            </p>
            <p className="text-red-600 text-lg">{errorMessage}</p>
        </div>
    );
};

export default GoogleLogin;