import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://api.zerorebound.com';

const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export default apiClient;
