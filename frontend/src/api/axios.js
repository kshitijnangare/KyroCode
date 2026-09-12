import axios from "axios";
import { useAuthStore } from "../store/authStore";

// An axios instance
const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
    withCredentials: true,
});

API.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    }
);

export default API;