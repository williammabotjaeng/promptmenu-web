"use client";

import axios from "axios";

const TIKTOK_BASE_URL = process.env.NEXT_PUBLIC_TIKTOK_BASE_URL;

const axiosInstance = axios.create({
  baseURL: TIKTOK_BASE_URL,
});

/**
 * TikTok API Call
 * @param endpoint - TikTok API endpoint
 * @param method - HTTP method (GET, POST, etc.)
 * @param body - Request body (if applicable)
 * @param accessToken - TikTok access token
 */
export const tiktokApiCall = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  body: any = null,
  accessToken: string
) => {
  try {
    const response = await axiosInstance({
      url: `${TIKTOK_BASE_URL}${endpoint}`,
      method,
      data: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error calling TikTok API:", error.response?.data || error.message);
    throw error;
  }
};