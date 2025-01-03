import axios, { AxiosInstance } from 'axios';

const ROOT_URL = process.env.ROOT_URL;
const X_API_KEY = process.env.X_API_KEY;

const api: AxiosInstance = axios.create({
  baseURL: ROOT_URL,
  headers: {
    'X-API-Key': X_API_KEY,
  },
});

export default api;