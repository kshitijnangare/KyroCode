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

    login: async (payload) => {
        
    }
})) 