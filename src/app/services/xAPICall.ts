"use client";

import { getCookie } from 'cookies-next';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const X_API_KEY = process.env.NEXT_PUBLIC_X_API_KEY;

const getCsrfToken = async (): Promise<string> => {
  const token = getCookie('csrftoken');
  return token ? token : ''; 
};

export const xAPICall = async (endpoint: string, method: 'GET' | 'POST' | 'PUT', body: any = null) => {
  const csrfToken = await getCsrfToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'X-API-KEY': X_API_KEY,
    'X-CSRFToken': csrfToken, 
  };

  const options: RequestInit = {
    method,
    headers,
    credentials: 'include', 
  };

  if (body) {
    options.body = JSON.stringify(body); 
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`); 
    }

    return await response.json(); 
  } catch (error) {
    console.error('API call error:', error);
    throw error; 
  }
};