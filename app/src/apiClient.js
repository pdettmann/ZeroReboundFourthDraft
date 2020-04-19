import axios from 'axios';

const PORT=8080;

const apiClient = axios.create({
    baseURL: `http://localhost:${PORT}`,
    withCredentials: true,
});

export default apiClient;
