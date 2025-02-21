import { useContext } from "react";                         //Temporary- For this app only
import { useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";               //Temporary- For this app only


const ThemeToggler = () => {

    const [theme, setTheme] = useState(null);
    const { isDarkMode, setIsDarkMode } = useContext(AuthContext);  //Temporary- For this app only

    // Set theme based on system preference or localStorage on initial load
    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
            document.documentElement.classList.add(storedTheme);
            if (storedTheme === 'dark') setIsDarkMode(true);   //Temporary- For this app only
            if (storedTheme === 'light') setIsDarkMode(false);   //Temporary- For this app only
        } else if (prefersDark) {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            setIsDarkMode(false);                              //Temporary- For this app only
        }
    }, [setIsDarkMode]);

    // Update theme dynamically when user toggles
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
        newTheme === 'dark' ? setIsDarkMode(true) : setIsDarkMode(false)   //Temporary- For this app only
    };

    if (theme === null) return null;

    return (
        <>
            <label className="flex items-center cursor-pointer gap-1 min-[350px]:gap-2 relative">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isDarkMode ? 'white' : 'black'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <path
                        d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
                <input
                    type="checkbox"
                    onChange={toggleTheme}
                    className="w-12 h-6 appearance-none bg-gray-300 rounded-full cursor-pointer transition-colors duration-300 checked:bg-gray-600 peer outline-none"
                    checked={theme === 'dark'}
                />
                <div className="w-5 h-5 bg-white rounded-full absolute left-7 top-0.5 peer-checked:translate-x-7 transition-transform duration-300" />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isDarkMode ? 'white' : 'black'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            </label>
        </>
    );
};

export default ThemeToggler;