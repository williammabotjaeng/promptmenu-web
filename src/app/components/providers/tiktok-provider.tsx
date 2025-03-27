"use client";

import React, { createContext, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { restCall } from "@/services/restCall";
import { csrfRestCall } from "@/services/csrfRestCall";
import { redirect } from "next/navigation";

interface TikTokContextType {
  tikTokLogin: () => void;
  fetchTiktokUserInfo: () => Promise<void>;
  userInfo: any | null;
}

const TikTokContext = createContext<TikTokContextType | null>(null);

export const TikTokProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cookies, setCookie] = useCookies(['access', 'csrftoken']);
  const accessToken = cookies?.access;
  const csrfToken = cookies?.csrftoken;

  const loginMutation = useMutation({
    mutationKey: ["tiktok_login"],
    mutationFn: async () => {
        const response = await csrfRestCall("/portal/tiktok/login/", "GET", {}, accessToken, csrfToken);
        console.log("Login Response:", response);
        redirect(response?.auth_url);
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

  const tikTokLogin = async () => {
    await loginMutation.mutateAsync();
  };

  const fetchTiktokUserInfo = async () => {
    await fetchUserInfoMutation.mutateAsync();
  };

  return (
    <TikTokContext.Provider
      value={{
        tikTokLogin,
        fetchTiktokUserInfo,
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