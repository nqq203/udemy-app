import axios from 'axios';

const api = axios.create({
  baseURL: 'https://udemy-app-backend.onrender.com',
}
);

api.interceptors.request.use(
  config => {
    config.headers['authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;