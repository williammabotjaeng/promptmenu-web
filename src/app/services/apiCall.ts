import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const X_API_KEY = process.env.REACT_APP_X_API_KEY; 

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const apiCall = async (endpoint: string, method: 'GET' | 'POST' | 'PUT', body: any = null) => {

  const response = await axiosInstance({
    url: endpoint,
    method,
    data: body,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': X_API_KEY,
      'platform': 'web'
    },
  });
  return response.data;
};