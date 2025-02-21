/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          light: '#FFFFFF', // Light mode background
          dark: '#1A202C',  // Dark mode background
        },
      },
    },
  },
}

