import axios from 'axios';
import settings from '../settings.json';

export const http = axios.create({
    baseURL: settings.apiUrl,
});

http.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('token');
    config.headers = {
        Authorization: `Bearer ${token}`,
    };
    return config;
});

http.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error?.response?.status === 403) {
            window.localStorage.removeItem('token');
            window.location.pathname = '/login';
        } else {
            return Promise.reject(error);
        }
    }
);
