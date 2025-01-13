"use client";

import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useStore } from 'zustand';
import useTokenStore from '@/state/use-token-store';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const X_API_KEY = process.env.NEXT_PUBLIC_X_API_KEY; 

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const restCall = async (endpoint: string, method: 'GET' | 'POST' | 'PUT', body: any = null, accessToken: string) => {
    
    const response = await axiosInstance({
    url: `http://localhost:8000${endpoint}`,
    method,
    data: body,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': X_API_KEY,
      'Authorization': `Bearer ${accessToken}`, 
    },
  });
  return response.data;
};