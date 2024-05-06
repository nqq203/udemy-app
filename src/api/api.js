import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:1000',
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