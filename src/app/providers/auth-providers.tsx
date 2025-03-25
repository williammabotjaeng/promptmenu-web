"use client";

import React, { createContext, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { LoginData } from "@/types/LoginData";
import { RegistrationData } from "@/types/RegistrationData";
import { RegistrationSuccessData } from "@/types/RegistrationSuccessData";
import { RegistrationErrorData } from "@/types/RegistrationErrorData";
import { ErrorData } from "@/types/ErrorData";
import { OTPData } from "@/types/OTPData";
import { useCookies } from "react-cookie";
import { apiCall } from "@/services/apiCall";
import { useStore } from "zustand";
import useTokenStore from "@/state/use-token-store";
import { AuthContextType } from "@/types/AuthContext";
import { useRouter, redirect } from "next/navigation";
import useAuthStore from "@/state/use-auth-store";
import { UserUpdateData } from "@/types/UserUpdateData";
import { restCall } from "@/services/restCall";
import { Alert } from "@mui/material";

const AuthContext = createContext<AuthContextType | null>(null);

interface ResetData {
  username: string;
  password: string;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(false);
  const { setTokens } = useStore(useTokenStore);
  const { setAuth, clearAuth } = useStore(useAuthStore);
  const [cookies, setCookie, removeCookie] = useCookies([
    "access",
    "refresh",
    "ssh_session_id",
    "user_role",
    "username",
    "firstname",
    "lastname",
    "onboarding_presented",
    "skills",
    "headshotBlobUrl",
    "sshsessionid",
    "instagram",
    "tiktok",
    "company_id",
    "vatPdf",
    "tradePdf",
    "website",
    "ssh_access",
    "has_settings",
    "has_profile",
    "company_id",
    "company_logo",
    "sshsessionid",
    "current_event"
  ]);

  const accessToken = cookies?.access;

  const router = useRouter();

  const loginMutation = useMutation({
    mutationKey: ["login_user"],
    mutationFn: async ({ email, password }: LoginData) => {
      return await apiCall("/accounts/login/", "POST", { email, password });
    },
    onSuccess: (data) => {
      console.log("Login Successful:", data);
      setTokens(data?.tokens?.refresh, data?.tokens?.access);
      setUser(true);
      setAuth(true);
      setCookie("access", data?.tokens?.access, { path: "/", maxAge: 604800 });
      setCookie("refresh", data?.tokens?.refresh, {
        path: "/",
        maxAge: 604800,
      });
      setCookie("user_role", data?.tokens?.user_role, {
        path: "/",
        maxAge: 604800,
      });
      setCookie("firstname", data?.tokens?.firstname, {
        path: "/",
        maxAge: 604800,
      });
      setCookie("lastname", data?.tokens?.lastname, {
        path: "/",
        maxAge: 604800,
      });
      setCookie("username", data?.username, { path: "/", maxAge: 604800 });
      setCookie("ssh_access", data?.ssh_access, { path: "/", maxAge: 604800 });
      setCookie("has_settings", data?.has_settings, {
        path: "/",
        maxAge: 604800,
      });
      setCookie("has_profile", data?.has_settings, {
        path: "/",
        maxAge: 604800,
      });
      setCookie("onboarding_presented", data?.tokens?.onboarding_presented, {
        path: "/",
        maxAge: 604800,
      });
      setCookie("ssh_session_id", data?.ssh_session_id, {
        path: "/",
        maxAge: 604800,
      });
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("Login error: ", error);
    },
  });

  const registerMutation = useMutation({
    mutationKey: ["register_user"],
    mutationFn: async (userData: RegistrationData) => {
      return await apiCall("/accounts/register/", "POST", {
        username: userData.username,
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        password: userData.password,
        user_role: userData.user_role,
      });
    },
    onSuccess: (data: RegistrationSuccessData) => {},
    onError: (error: RegistrationErrorData) => {
      console.error("Registration error: ", { ...error });
    },
  });

  const verifyOtpMutation = useMutation({
    mutationKey: ["verify_otp"],
    mutationFn: async (data: OTPData) => {
      return await apiCall("/accounts/verify_otp/", "POST", data);
    },
    onSuccess: (data) => {
      setTokens(data?.tokens?.refresh, data?.tokens?.access);
      setUser(true);
      setAuth(true);
      let temp_user_role =
        data?.tokens?.user_role === "None"
          ? undefined
          : data?.tokens?.user_role;
      setCookie("access", data?.tokens?.access, { path: "/", maxAge: 604800 });
      setCookie("refresh", data?.tokens?.refresh, {
        path: "/",
        maxAge: 604800,
      });
      setCookie("user_role", temp_user_role, { path: "/", maxAge: 604800 });
      setCookie("firstname", data?.tokens?.firstname, {
        path: "/",
        maxAge: 604800,
      });
      setCookie("lastname", data?.tokens?.lastname, {
        path: "/",
        maxAge: 604800,
      });
      setCookie("onboarding_presented", data?.tokens?.onboarding_presented, {
        path: "/",
        maxAge: 604800,
      });
      setCookie("ssh_session_id", data?.session_id, {
        path: "/",
        maxAge: 604800,
      });
      setCookie("ssh_access", data?.ssh_access, { path: "/", maxAge: 604800 });
      setCookie("has_settings", data?.has_settings, {
        path: "/",
        maxAge: 604800,
      });
      setCookie("has_profile", data?.has_settings, {
        path: "/",
        maxAge: 604800,
      });
      setCookie("username", data?.username, { path: "/", maxAge: 604800 });
    },
    onError: (error) => {
      console.error("OTP verification error: ", error);
    },
  });

  const logoutMutation = useMutation({
    mutationKey: ["logout_user"],
    mutationFn: async () => {
      return await apiCall("/accounts/logout/", "POST");
    },
    onSuccess: () => {
      removeCookie("access", { path: "/" });
      removeCookie("refresh", { path: "/" });
      removeCookie("ssh_session_id", { path: "/" });
      removeCookie("user_role", { path: "/" });
      removeCookie("username", { path: "/" });
      removeCookie("onboarding_presented", { path: "/" });
      removeCookie("firstname", { path: "/" });
      removeCookie("lastname", { path: "/" });
      removeCookie("has_settings", { path: "/" });
      removeCookie("skills", { path: "/" });
      removeCookie("headshotBlobUrl", { path: "/" });
      removeCookie("sshsessionid", { path: "/" });
      removeCookie("instagram", { path: "/" });
      removeCookie("tiktok", { path: "/" });
      removeCookie("website", { path: "/" });
      removeCookie("vatPdf", { path: "/" });
      removeCookie("tradePdf", { path: "/" });
      removeCookie("ssh_access", { path: "/" });
      removeCookie("has_profile", { path: "/" });
      removeCookie("sshsessionid", { path: "/" });
      removeCookie("company_id", { path: "/" });
      removeCookie("company_logo", { path: "/" });
      removeCookie("sshsessionid", { path: "/" });
      removeCookie("current_event", { path: "/" });
      router.push("/login");
    },
    onError: (error) => {
      console.error("Logout error: ", error);
    },
  });

  const forgotMutation = useMutation({
    mutationKey: ["forgot_password"],
    mutationFn: async (userEmail: { email: string }) => {
      return await apiCall("/accounts/forgot-password/", "POST", {
        email: userEmail
      });
    },
    onSuccess: (data) => {
      console.log("Email Sent:", data);
      router.push("/forgot-success");
    },
    onError: (error) => {
      console.error("Forgot Password error: ", { ...error });
    },
  });

  const resetMutation = useMutation({
    mutationKey: ["reset_password"],
    mutationFn: async ({username, password}: ResetData) => {
      console.log("U: P:", username, password);
      return await apiCall("/accounts/reset-password/", "POST", {
        username: username,
        password: password
      });
    },
    onSuccess: (data) => {
      console.log("Password Reset:", data);
      router.push("/login");
    },
    onError: (error) => {
      console.error("Forgot Password error: ", { ...error });
    },
  });

  const updateUserMutation = useMutation({
    mutationKey: ["update_user"],
    mutationFn: async ({ field, value }: UserUpdateData) => {
      return await restCall(
        "/accounts/update-user/",
        "PATCH",
        {
          [field]: value,
        },
        accessToken
      );
    },
    onSuccess: (data) => {
      console.log("User updated successfully:", data);
    },
    onError: (error) => {
      console.error("Update user error: ", error);
    },
  });

  const login = async (email, password) => {
    await loginMutation.mutateAsync({ email, password });
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const verifyOtp = async (username: string, otp: string) => {
    await verifyOtpMutation.mutateAsync({ username, otp });
  };

  const register = async (
    username: string,
    password: string,
    email: string,
    firstname: string,
    lastname: string,
    user_role: "talent" | "client" | "influencer"
  ) => {
    const registrationData = {
      username,
      password,
      email,
      firstname,
      lastname,
      user_role,
    };

    await registerMutation.mutateAsync(registrationData);
  };

  const updateUser = async (userData) => {
    await updateUserMutation.mutateAsync(userData);
  };

  const forgot = async (email) => {
    await forgotMutation.mutateAsync(email);
  };

  const reset = async (username, password) => {
    await resetMutation.mutateAsync({username, password});
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        verifyOtp,
        logout,
        register,
        updateUser,
        forgot,
        reset,
        loginIsLoading: loginMutation.isPending,
        loginError: loginMutation.isError,
        verifyOtpIsLoading: verifyOtpMutation.isPending,
        verifyOtpError: verifyOtpMutation.isError,
        registerIsLoading: registerMutation.isPending,
        registerError: registerMutation.error as ErrorData | null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
