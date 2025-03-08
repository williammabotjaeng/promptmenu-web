"use client";

import React, { createContext, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { restCall } from "@/services/restCall";

interface TikTokContextType {
  login: () => void;
  fetchUserInfo: () => Promise<void>;
  userInfo: any | null;
}

const TikTokContext = createContext<TikTokContextType | null>(null);

export const TikTokProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cookies, setCookie] = useCookies(['tiktok_access_token']);
  const accessToken = cookies.tiktok_access_token;

  const loginMutation = useMutation({
    mutationKey: ["tiktok_login"],
    mutationFn: async () => {
        const response = await restCall("portal/tiktok/login", "GET", {}, accessToken);
        console.log("Login Response:", response);
        return response;
      },
      onSuccess: (data) => {
        console.log("User Info:", data);
      },
  });

  const fetchUserInfoMutation = useMutation({
    mutationKey: ["fetch_tiktok_user_info"],
    mutationFn: async () => {
      if (!accessToken) throw new Error("Access token is missing");
      const response = await restCall("/user/info/", "GET", {}, accessToken);
      return response;
    },
    onSuccess: (data) => {
      console.log("User Info:", data);
    },
  });

  const login = async () => {
    await loginMutation.mutateAsync();
  };

  const fetchUserInfo = async () => {
    await fetchUserInfoMutation.mutateAsync();
  };

  return (
    <TikTokContext.Provider
      value={{
        login,
        fetchUserInfo,
        userInfo: fetchUserInfoMutation.data || null,
      }}
    >
      {children}
    </TikTokContext.Provider>
  );
};

export const useTikTok = () => {
  const context = useContext(TikTokContext);
  if (!context) {
    throw new Error("useTikTok must be used within a TikTokProvider");
  }
  return context;
};