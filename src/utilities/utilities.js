import axios from "axios";

export const axiosAll = axios.create({baseURL: import.meta.env.VITE_API_URL});