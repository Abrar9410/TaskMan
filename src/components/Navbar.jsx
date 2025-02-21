import logo from "../assets/TaskMan.png";
import emptyUser from "../assets/user.png";
import Swal from "sweetalert2";
import ThemeToggler from "./ThemeToggler";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";


const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure you want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, log out!"
        }).then((result) => {
            if (result.isConfirmed) {
                logOut();
            }
        });
    }

    return (
        <div className="sticky top-0 z-10 bg-opacity-30 backdrop-blur-md py-2 shadow-md">
            <div className="w-11/12 md:w-10/12 mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <img src={logo} alt="logo" className="w-4 min-[275px]:w-6 min-[400px]:w-8 sm:w-10 lg:w-12 xl:w-14" />
                    <span className="text-orange-500 max-[275px]:text-sm min-[400px]:text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold">TaskMan</span>
                </div>
                <div className="flex justify-end items-center gap-2 lg:gap-3 xl:gap-4">
                    <ThemeToggler></ThemeToggler>
                    {
                        user ?
                            <button
                                onClick={handleLogOut}
                                className="w-max px-2 py-1 cursor-pointer hover:bg-white hover:text-red-600 bg-red-600 text-white sm:text-lg font-semibold outline-none">
                                Log Out
                            </button> :
                            <div className="w-max bg-white rounded-full"><img src={emptyUser} alt="empty_user" className="w-6 min-[350px]:w-8 sm:w-10"/></div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;