"use client";

import { createContext, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useCookies } from "react-cookie";
import useTokenStore from "@/state/use-token-store"; // Assuming you have this store
import useAuthStore from "@/state/use-auth-store"; // Assuming you have this store
import { useStore } from "zustand";

// Create authentication context
const AuthContext = createContext(null);

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
  },
});

// Cookie options
const cookieOptions: any = {
  path: "/",
  maxAge: 7 * 24 * 60 * 60, // 7 days
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

// Token cookie options
const tokenCookieOptions: any = {
  ...cookieOptions,
  maxAge: 60 * 60, // 60 minutes (adjust based on token expiry)
};

export function AuthProvider({ children }) {
  const router = useRouter();
  const { setTokens } = useStore(useTokenStore);
  const { setAuth, clearAuth } = useStore(useAuthStore);
  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "refresh_token",
    "user_role",
    "username",
    "firstname",
    "lastname",
    "user_type",
    "company_name",
  ]);

  // Setup axios interceptor for auth headers
  api.interceptors.request.use(
    (config) => {
      const accessToken = cookies.access_token;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Handle token refresh on 401 responses
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        cookies.refresh_token
      ) {
        originalRequest._retry = true;

        try {
          const response: any = await refreshTokenMutation.mutateAsync(
            cookies.refresh_token
          );

          if (response?.access_token) {
            // Update the auth header for the retry
            originalRequest.headers.Authorization = `Bearer ${response.access_token}`;
            return axios(originalRequest);
          }
        } catch (refreshError) {
          // If refresh fails, logout
          console.error("Token refresh failed:", refreshError);
          logoutMutation.mutate();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  // Login mutation - matches backend expectations
  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const response = await api.post("/accounts/login/", { email, password });
      return response.data;
    },
    onSuccess: (data: any) => {
      console.log("Login successful:", data);

      // Store tokens from response structure matching your backend
      setTokens(data.tokens.refresh, data.tokens.access);
      setAuth(true);

      // Set user cookies based on response data
      setCookie("access_token", data.tokens.access, tokenCookieOptions);
      setCookie("refresh_token", data.tokens.refresh, cookieOptions);
      setCookie("user_role", data.tokens.user_role, cookieOptions);
      setCookie("username", data.username, cookieOptions);
      setCookie("firstname", data.tokens.firstname, cookieOptions);
      setCookie("lastname", data.tokens.lastname, cookieOptions);

      // Set owner-specific data if applicable
      if (data.owner_profile) {
        setCookie(
          "company_name",
          data.owner_profile.company_name,
          cookieOptions
        );
      }

      // Redirect based on user type
      if (data.user_type === "owner") {
        router.push("/dashboard/restaurant");
      } else {
        router.push("/dashboard/diner");
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: async (userData) => {
      const response = await api.post("/accounts/register/", userData);
      return response.data;
    },
    onSuccess: (data: any) => {
      console.log("Registration successful:", data);

      // Store tokens from response structure matching your backend
      setTokens(data.tokens.refresh, data.tokens.access);
      setAuth(true);

      // Set user cookies based on response data
      setCookie("access_token", data.tokens.access, tokenCookieOptions);
      setCookie("refresh_token", data.tokens.refresh, cookieOptions);
      setCookie("user_role", data.tokens.user_role, cookieOptions);
      setCookie("username", data.username, cookieOptions);
      setCookie("firstname", data.tokens.firstname, cookieOptions);
      setCookie("lastname", data.tokens.lastname, cookieOptions);
      setCookie("user_type", data.user_type, cookieOptions);

      // Set owner-specific data if applicable
      if (data.owner_profile) {
        setCookie(
          "company_name",
          data.owner_profile.company_name,
          cookieOptions
        );
      }

      // Redirect based on user type
      if (data.user_type === "owner") {
        router.push("/dashboard/restaurant");
      } else {
        router.push("/dashboard/diner");
      }
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });

  // OTP verification mutation
  const verifyOtpMutation = useMutation({
    mutationKey: ["verify_otp"],
    mutationFn: async (otpData) => {
      const response = await api.post("/accounts/verify_otp/", otpData);
      return response.data;
    },
    onSuccess: (data: any) => {
      // Store tokens
      setTokens(data.tokens.refresh, data.tokens.access);
      setAuth(true);

      // Set cookies based on response
      setCookie("access_token", data.tokens.access, tokenCookieOptions);
      setCookie("refresh_token", data.tokens.refresh, cookieOptions);
      setCookie(
        "user_role",
        data.tokens.user_role === "None" ? undefined : data.tokens.user_role,
        cookieOptions
      );
      setCookie("firstname", data.tokens.firstname, cookieOptions);
      setCookie("lastname", data.tokens.lastname, cookieOptions);
      setCookie("username", data.username, cookieOptions);

      // Redirect to dashboard
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("OTP verification error:", error);
    },
  });

  // Logout mutation
  // Logout mutation
  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      console.log("Starting logout mutation");

      if (cookies.access_token) {
        try {
          // Use the access token header explicitly for this request
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/accounts/logout/`,
            {}, // empty body
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookies.access_token}`,
                "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
              },
            }
          );
          console.log("Logout API response:", response);
          return true;
        } catch (error) {
          console.error("Logout API error:", error);
          // Continue with client-side logout even if API call fails
          return true;
        }
      } else {
        console.warn(
          "No access token available, performing client-side logout only"
        );
        return true;
      }
    },
    onSuccess: () => {
      // Clear auth state
      clearAuth();

      // Remove all auth cookies
      const allCookies = [
        "access_token",
        "refresh_token",
        "user_role",
        "username",
        "firstname",
        "lastname",
        "company_name",
      ];

      allCookies.forEach((cookieName: any) => {
        removeCookie(cookieName, { path: "/" });
      });

      // Redirect to login page
      router.push("/login");
    },
  });

  // Refresh token mutation
  const refreshTokenMutation = useMutation({
    mutationKey: ["refreshToken"],
    mutationFn: async (refreshToken) => {
      const response = await api.post("/accounts/refresh-token/", {
        refresh: refreshToken,
      });
      return response.data;
    },
    onSuccess: (data: any) => {
      // Update stored tokens
      setTokens(data.refresh, data.access);

      // Update cookies
      setCookie("access_token", data.access, tokenCookieOptions);
      if (data.refresh) {
        setCookie("refresh_token", data.refresh, cookieOptions);
      }

      return data;
    },
    onError: (error) => {
      console.error("Token refresh error:", error);
      // Logout on any refresh error
      logoutMutation.mutate();
      throw error;
    },
  });

  // Forgot password mutation
  const forgotPasswordMutation = useMutation({
    mutationKey: ["forgotPassword"],
    mutationFn: async (email) => {
      const response = await api.post("/accounts/forgot-password/", { email });
      return response.data;
    },
    onSuccess: (data) => {
      router.push("/forgot-password-confirmation");
    },
  });

  // Reset password mutation
  const resetPasswordMutation = useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      const response = await api.post("/accounts/reset-password/", {
        username,
        password,
      });
      return response.data;
    },
    onSuccess: (data) => {
      router.push("/login");
    },
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: async ({ field, value }: { field: string; value: string }) => {
      const response = await api.patch("/accounts/update-user/", {
        [field]: value,
      });
      return response.data;
    },
  });

  // Microsoft login mutation
  const microsoftLoginMutation = useMutation({
    mutationKey: ["microsoftLogin"],
    mutationFn: async () => {
      // Redirect to Microsoft login
      const response: any = await api.get("/auth/microsoft/login");
      window.location.href = response.data.url;
      return true;
    },
  });

  // Expose auth methods and state
  const auth = {
    // Auth methods
    login: (credentials) => loginMutation.mutateAsync(credentials),
    register: (userData) => registerMutation.mutateAsync(userData),
    verifyOtp: (otpData) => verifyOtpMutation.mutateAsync(otpData),
    logout: () => logoutMutation.mutateAsync(),
    forgotPassword: (email) => forgotPasswordMutation.mutateAsync(email),
    resetPassword: (data) => resetPasswordMutation.mutateAsync(data),
    updateUser: (userData) => updateUserMutation.mutateAsync(userData),
    microsoftLogin: () => microsoftLoginMutation.mutateAsync(),

    // Auth state
    isAuthenticated: !!cookies.access_token,
    userRole: cookies.user_role,
    username: cookies.username,

    // Loading states
    loginIsLoading: loginMutation.isPending,
    registerIsLoading: registerMutation.isPending,
    logoutIsLoading: logoutMutation.isPending,
    verifyOtpIsLoading: verifyOtpMutation.isPending,

    // Error states
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    verifyOtpError: verifyOtpMutation.error,

    // Api instance for authenticated requests
    api,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
