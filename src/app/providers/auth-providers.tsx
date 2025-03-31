"use client";

import { createContext, useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import useTokenStore from '@/state/use-token-store'; // Assuming you have this store
import useAuthStore from '@/state/use-auth-store'; // Assuming you have this store
import { useStore } from 'zustand';

// Create authentication context
const AuthContext = createContext(null);

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY,
  }
});

// Cookie options
const cookieOptions : any = {
  path: '/',
  maxAge: 7 * 24 * 60 * 60, // 7 days
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict'
};

// Token cookie options
const tokenCookieOptions : any = {
  ...cookieOptions,
  maxAge: 65 * 60 // 65 minutes (matching backend token lifetime)
};

export function AuthProvider({ children }) {
  const router = useRouter();
  const { setTokens } = useStore(useTokenStore);
  const { setAuth, clearAuth } = useStore(useAuthStore);
  const [cookies, setCookie, removeCookie] = useCookies([
    'access_token',
    'refresh_token',
    'user',
    'user_role',
    'username',
    'displayName',
    'userPrincipalName'
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
      
      if (error.response?.status === 401 && !originalRequest._retry && cookies.refresh_token) {
        originalRequest._retry = true;
        
        try {
          const response = await refreshTokenMutation.mutateAsync(cookies.refresh_token);
          
          if (response?.access_token) {
            // Update the auth header for the retry
            originalRequest.headers.Authorization = `Bearer ${response.access_token}`;
            return axios(originalRequest);
          }
        } catch (refreshError) {
          // If refresh fails, logout
          console.error('Token refresh failed:', refreshError);
          logoutMutation.mutate();
          return Promise.reject(refreshError);
        }
      }
      
      return Promise.reject(error);
    }
  );

  // Login mutation
  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (credentials) => {
      const response = await api.post('/accounts/login/', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Login successful:', data);
      
      // Store tokens
      setTokens(data.token.refresh_token, data.token.access_token);
      setAuth(true);
      
      // Calculate token expiry time
      const expiryTime = new Date();
      expiryTime.setSeconds(expiryTime.getSeconds() + data.token.expires_in);
      
      // Store user data in cookie
      const userToStore = {
        id: data.userId,
        mongodb_id: data.mongodb_id,
        username: data.username,
        displayName: data.displayName,
        userPrincipalName: data.userPrincipalName,
        user_type: data.user_type
      };
      
      // Set cookies
      setCookie('user', userToStore, cookieOptions);
      setCookie('access_token', data.token.access_token, tokenCookieOptions);
      setCookie('refresh_token', data.token.refresh_token, cookieOptions);
      setCookie('user_role', data.user_type, cookieOptions);
      setCookie('username', data.username, cookieOptions);
      setCookie('displayName', data.displayName, cookieOptions);
      setCookie('userPrincipalName', data.userPrincipalName, cookieOptions);
      
      // Redirect to dashboard
      if (data?.user_type === "owner") {
        router.push('/dashboard/restaurant'); 
      } else if (data?.user_type === "customer") {
        router.push('/dashboard/diner');
      }
    },
    onError: (error) => {
      console.error('Login error:', error);
    }
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationKey: ['register'],
    mutationFn: async (userData) => {
      const response = await api.post('/accounts/register/', userData);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Registration successful:', data);
      
      // If auto-login is enabled and token is included
      if (data.token) {
        // Store tokens
        setTokens(data.token.refresh_token, data.token.access_token);
        setAuth(true);
        
        // Calculate token expiry time
        const expiryTime = new Date();
        expiryTime.setSeconds(expiryTime.getSeconds() + data.token.expires_in);
        
        // Store user data
        const userToStore = {
          id: data.userId,
          mongodb_id: data.mongodb_id,
          username: data.username,
          displayName: data.displayName,
          userPrincipalName: data.userPrincipalName,
          user_type: data.user_type
        };
        
        // Set cookies
        setCookie('user', userToStore, cookieOptions);
        setCookie('access_token', data.token.access_token, tokenCookieOptions);
        setCookie('refresh_token', data.token.refresh_token, cookieOptions);
        setCookie('user_role', data.user_type, cookieOptions);
        setCookie('username', data.username, cookieOptions);
        setCookie('displayName', data.displayName, cookieOptions);
        setCookie('userPrincipalName', data.userPrincipalName, cookieOptions);
        
        // Redirect to dashboard
        if (data?.user_type === "owner") {
          router.push('/dashboard/restaurant');
        } else {
          router.push('/dashboard/diner');
        } 
      } else {
        // If no auto-login, redirect to login page
        router.push('/login');
      }
    },
    onError: (error) => {
      console.error('Registration error:', error);
    }
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      try {
        // Only call the logout endpoint if we have an access token
        if (cookies.access_token) {
          await api.post('/accounts/logout/');
        }
        return true;
      } catch (error) {
        console.error('Logout error:', error);
        return true; // Still proceed with local logout even if API fails
      }
    },
    onSuccess: () => {
      // Clear auth state
      clearAuth();
      
      // Remove all auth cookies
      removeCookie('user', { path: '/' });
      removeCookie('access_token', { path: '/' });
      removeCookie('refresh_token', { path: '/' });
      removeCookie('user_role', { path: '/' });
      removeCookie('username', { path: '/' });
      removeCookie('displayName', { path: '/' });
      removeCookie('userPrincipalName', { path: '/' });
      
      // Redirect to login page
      router.push('/login');
    }
  });

  // Refresh token mutation
  const refreshTokenMutation = useMutation({
    mutationKey: ['refreshToken'],
    mutationFn: async (refreshToken) => {
      const response = await api.post('/accounts/refresh-token/', { refresh_token: refreshToken });
      return response.data;
    },
    onSuccess: (data) => {
      // Update stored tokens
      setTokens(data.refresh_token, data.access_token);
      
      // Calculate token expiry time
      const expiryTime = new Date();
      expiryTime.setSeconds(expiryTime.getSeconds() + data.expires_in);
      
      // Update cookies
      setCookie('access_token', data.access_token, tokenCookieOptions);
      if (data.refresh_token) {
        setCookie('refresh_token', data.refresh_token, cookieOptions);
      }
      
      return data;
    },
    onError: (error: any) => {
      console.error('Token refresh error:', error);
      
      // Check for session expiry
      if (error?.data?.status === 'SESSION_EXPIRED') {
        logoutMutation.mutate();
        router.push('/login?expired=true');
      } else {
        // Logout on any refresh error
        logoutMutation.mutate();
      }
      
      throw error;
    }
  });

  // Microsoft login mutation
  const microsoftLoginMutation = useMutation({
    mutationKey: ['microsoftLogin'],
    mutationFn: async (userType: any) => {
      const microsoftLoginUrl = `${process.env.NEXT_PUBLIC_API_URL}/accounts/microsoft/login/`;
      const params = new URLSearchParams({
        userType: userType || 'customer'
      }).toString();
      
      window.location.href = `${microsoftLoginUrl}?${params}`;
      return true;
    }
  });

  // Password reset request mutation
  const forgotPasswordMutation = useMutation({
    mutationKey: ['forgotPassword'],
    mutationFn: async (email) => {
      const response = await api.post('/accounts/forgot-password/', { email });
      return response.data;
    },
    onSuccess: (data) => {
      router.push('/forgot-password-confirmation');
    }
  });

  // Password reset mutation
  const resetPasswordMutation = useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: async ({ token, password } : { token: string; password: string }) => {
      const response = await api.post('/accounts/reset-password/', { token, password });
      return response.data;
    },
    onSuccess: (data) => {
      router.push('/login?reset=success');
    }
  });

  // User profile update mutation
  const updateProfileMutation = useMutation({
    mutationKey: ['updateProfile'],
    mutationFn: async (profileData) => {
      const response = await api.put('/user/profile/', profileData);
      return response.data;
    }
  });

  // Expose auth methods
  const auth = {
    login: (credentials) => loginMutation.mutateAsync(credentials),
    register: (userData) => registerMutation.mutateAsync(userData),
    logout: () => logoutMutation.mutateAsync(),
    refreshToken: (token) => refreshTokenMutation.mutateAsync(token),
    microsoftLogin: (userType) => microsoftLoginMutation.mutateAsync(userType),
    forgotPassword: (email) => forgotPasswordMutation.mutateAsync(email),
    resetPassword: (data) => resetPasswordMutation.mutateAsync(data),
    updateProfile: (data) => updateProfileMutation.mutateAsync(data),
    
    // Auth state
    user: cookies.user || null,
    isAuthenticated: !!cookies.user,
    userRole: cookies.user_role,
    
    // Loading states
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isRefreshing: refreshTokenMutation.isPending,
    
    // Error states
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    logoutError: logoutMutation.error,
    refreshError: refreshTokenMutation.error,
    
    // API instance for authenticated requests
    api
  };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;