import API from '../api/axios.js';

export const registerAPI = (payload) => API.post('/auth/register', payload);

export const loginAPI = (payload) => API.post('/auth/login', payload);

export const refreshAPI = () => API.post('/auth/refresh');

// Both works
// export const verifyEmailAPI = (token) => API.get('auth/verify-email', { params: {token} });
export const verifyEmailAPI = (token) => API.get(`/auth/verify-email?token=${token}`);

// here payload: {email: email} is a object
export const resendVerification = (payload) => API.post('/auth/resend-verification', payload);

export const forgotPasswordAPI = (payload) => API.post('/auth/forgot-password', payload);

export const resetPasswordAPI = (payload) => API.post('/auth/reset-password', payload);

export const logoutAPI = () => API.post('/auth/logout');

export const logoutOfAllDevices = () => API.post('/auth/logout-of-all-devices');