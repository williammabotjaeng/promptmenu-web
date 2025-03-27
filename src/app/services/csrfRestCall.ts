"use client";

import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useStore } from 'zustand';
import useTokenStore from '@/state/use-token-store';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const X_API_KEY = process.env.NEXT_PUBLIC_X_API_KEY; 
const APP_ENV = process.env.NEXT_PUBLIC_ENV;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const csrfRestCall = async (endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'PATCH', body: any = null, accessToken: string, csrfToken: string) => {
    
    const response = await axiosInstance({
    url: APP_ENV === 'local' ? `https://localhost:8000${endpoint}` : `https://api.staffingsolutionshub.com${endpoint}`,
    method,
    data: body,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': X_API_KEY,
      'Authorization': `Bearer ${accessToken}`, 
      'X-CSRF-Token': csrfToken
    },
  });
  return response.data;
};