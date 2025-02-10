import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_HOST,
    headers: {
        'Content-Type': 'application/json'
    }
});

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('JWT');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (!config.data && config.headers['Content-Type'] === 'application/json') {
            config.data = {};
        }
        return config;
    },
    error => Promise.reject(error)
);

instance.interceptors.response.use(response => response,
    error => {
        if (error.code === 'ERR_CANCELED') {
            return Promise.reject(error);
        }
        if (error.response.status === 401 && !error.response.request.responseURL.includes("/api/v1/auth/signin")) {
            localStorage.removeItem('JWT');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default instance;