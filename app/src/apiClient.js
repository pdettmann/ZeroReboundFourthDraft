import axios from 'axios';

const API_HOST = process.env.NODE_ENV === 'development' ? 'http://localhost' : 'https://api.zerorebound.com';
const API_PORT = process.env.NODE_ENV === 'development' ? 8080 : 80;

const apiClient = axios.create({
    baseURL: `${API_HOST}:${API_PORT}`,
    withCredentials: true,
});

export default apiClient;
