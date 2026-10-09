import { create } from 'zustand';
import { registerAPI, loginAPI } from '../services/authServices';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

const [accessToken, setAccessToken] = useState(null);

const getInitialState = () => {
    const refreshToken = Cookies.get('refreshToken') || null;
    const accessToken = accessToken;
    return {
        refreshToken: refreshToken,
        accessToken: accessToken
    }
}

export const useAuthStore = create((set, get) => ({
    ...getInitialState(),

    /**
     * Login action.
     */
    login: async (payload) => {
        set({ isLoading: true, error: null });
        try {
            const response = await loginAPI(payload);

            const { token, user } = response.data.data;
            if (!token || !user) {
                throw new Error("Login response missing token or user.");
            }

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            set({
                token,
                user,
                isAuthenticated: true,
                isLoading: false,
                error: null
            });

            return response.data;
        } catch (err) {
            const message = err.response?.data?.message || 'Login failed';
            set({ isLoading: false, error: message });
            throw new Error(message);
        }
    },

    /**
     * Register action.
     */
    register: async (payload) => {
        set({ isLoading: true, error: null });
        try {
            const response = await registerAPI(payload);
            // Your data is inside response.data.data
            const { token, user } = response.data.data;

            if (!token || !user) {
                throw new Error("Register response missing token or user.");
            }

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            set({
                token,
                user,
                isAuthenticated: true,
                isLoading: false,
                error: null
            });

            return response.data;
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed';
            set({ isLoading: false, error: message });
            throw new Error(message);
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
        });
    },

    clearError: () => {
        set({ error: null });
    },

    /**
     * Check Auth status
     */
    checkAuth: async () => {
        const { token } = get();
        if (!token) {
            return;
        }

        try {
            const response = await authMeAPI();
            const { user } = response.data.data;

            set({
                user,
                isAuthenticated: true,
                isLoading: false
            });
            localStorage.setItem('user', JSON.stringify(user));

        } catch (error) {
            console.error("Token verification failed:", error);
            if (error.response && [401, 403, 404].includes(error.response.status)) {
                get().logout();
            }
            set({ isLoading: false });
        }
    }
}));