"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { restCall } from "@/services/restCall";

// Type definitions
interface AuthUser {
  displayName: string;
  email: string;
  user_type: "owner" | "customer" | "staff";
  givenName?: string;
  surname?: string;
  company_name?: string;
  business_address?: string;
  subscription_tier?: string;
  mobile_number?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  error: any;
}

// Create auth context
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "user_type",
    "displayName",
    "email",
    "company_name",
    "subscription_tier"
  ]);
  const router = useRouter();

  // Check if user is already authenticated on mount
  useEffect(() => {
    const token = cookies.access_token;
    if (token) {
      checkAuthStatus(token);
    }
  }, []);

  // Check auth status with API
  const checkAuthStatus = async (token: string) => {
    try {
      const response = await restCall('/accounts/check-auth/', 'GET', null, token);
      
      if (response?.authenticated) {
        setUser(response.user);
        setIsAuthenticated(true);
      } else {
        // Clear invalid auth state
        handleLogout();
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      handleLogout();
    }
  };

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (userData: any) => {
      // For registration, we don't have a token yet
      // We'll use a temporary empty token that will be replaced by restCall's internal logic
      const endpoint = '/accounts/register/';
      
      return await restCall(endpoint, 'POST', userData, '');
    },
    onSuccess: (data) => {
      // Handle successful registration
      if (data.token) {
        // Auto login if token is provided
        handleLoginSuccess(data);
      } else {
        // Redirect to login if no token
        router.push('/login?registered=true');
      }
    }
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      return await restCall('/accounts/login/', 'POST', { email, password }, '');
    },
    onSuccess: (data) => {
      handleLoginSuccess(data);
    }
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const token = cookies.access_token;
      return await restCall('/accounts/logout/', 'POST', {}, token);
    },
    onSuccess: () => {
      handleLogout();
    },
    onError: () => {
      // Even if API call fails, still clear local state
      handleLogout();
    }
  });

  // Handle successful login
  const handleLoginSuccess = (data: any) => {
    // Store user data
    setUser({
      displayName: data.display_name || data.displayName,
      email: data.email,
      user_type: data.user_type,
      givenName: data.given_name || data.givenName,
      surname: data.surname,
      company_name: data.company_name,
      business_address: data.business_address,
      subscription_tier: data.subscription_tier,
      mobile_number: data.mobile_number
    });
    
    setIsAuthenticated(true);
    
    // Set cookies
    const token = data.token || data.access_token;
    setCookie("access_token", token, { path: "/", maxAge: 604800 }); // 7 days
    setCookie("user_type", data.user_type, { path: "/", maxAge: 604800 });
    setCookie("displayName", data.display_name || data.displayName, { path: "/", maxAge: 604800 });
    setCookie("email", data.email, { path: "/", maxAge: 604800 });
    
    if (data.company_name) {
      setCookie("company_name", data.company_name, { path: "/", maxAge: 604800 });
    }
    
    if (data.subscription_tier) {
      setCookie("subscription_tier", data.subscription_tier, { path: "/", maxAge: 604800 });
    }
    
    // Redirect to dashboard
    if (data.user_type === "owner") {
        router.push('/dashboard/restaurant');
    } else {
        router.push('/dashboard/diner');
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Clear user data
    setUser(null);
    setIsAuthenticated(false);
    
    // Clear cookies
    removeCookie("access_token", { path: "/" });
    removeCookie("user_type", { path: "/" });
    removeCookie("displayName", { path: "/" });
    removeCookie("email", { path: "/" });
    removeCookie("company_name", { path: "/" });
    removeCookie("subscription_tier", { path: "/" });
    
    // Redirect to login
    router.push('/login');
  };

  // Register function
  const register = async (userData: any) => {
    await registerMutation.mutateAsync(userData);
  };

  // Login function
  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  // Logout function
  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  // Determine loading state
  const isLoading = loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending;

  // Determine error state
  const error = loginMutation.error || registerMutation.error || logoutMutation.error;

  // Create auth context value
  const authContextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    error
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};