"use client";

import React, { createContext, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { restCall } from "@/services/restCall";
import { csrfRestCall } from "@/services/csrfRestCall";
import { redirect } from "next/navigation";

interface SnapchatContextType {
  snapchatLogin: () => void;
  fetchSnapchatUserInfo: () => Promise<void>;
  userInfo: any | null;
}

const SnapchatContext = createContext<SnapchatContextType | null>(null);

export const SnapchatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cookies] = useCookies(['access', 'csrftoken']);
  const accessToken = cookies?.access;
  const csrfToken = cookies?.csrftoken;

  const loginMutation = useMutation({
    mutationKey: ["snapchat_login"],
    mutationFn: async () => {
      const response = await csrfRestCall("/portal/snapchat/oauth/", "GET", {}, accessToken, csrfToken);
      console.log("Login Response:", response);
      redirect(response?.auth_url);
    },
    onSuccess: (data) => {
      console.log("User Info:", data);
    },
  });

  const fetchUserInfoMutation = useMutation({
    mutationKey: ["fetch_snapchat_user_info"],
    mutationFn: async () => {
      if (!accessToken) throw new Error("Access token is missing");
      const response = await restCall("/user/info/", "GET", {}, accessToken);
      return response;
    },
    onSuccess: (data) => {
      console.log("User Info:", data);
    },
  });

  const snapchatLogin = async () => {
    await loginMutation.mutateAsync();
  };

  const fetchSnapchatUserInfo = async () => {
    await fetchUserInfoMutation.mutateAsync();
  };

  return (
    <SnapchatContext.Provider
      value={{
        snapchatLogin,
        fetchSnapchatUserInfo,
        userInfo: fetchUserInfoMutation.data || null,
      }}
    >
      {children}
    </SnapchatContext.Provider>
  );
};

export const useSnapchat = () => {
  const context = useContext(SnapchatContext);
  if (!context) {
    throw new Error("useSnapchat must be used within a SnapchatProvider");
  }
  return context;
};