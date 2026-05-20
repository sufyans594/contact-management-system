import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
});

// Request interceptor to add the JWT token to requests
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle 401 Unauthorized errors globally
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Optional: handle unauthorized access, e.g., clear token and redirect to login
            localStorage.removeItem('token');
            // Assuming window.location or a router instance is used
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
