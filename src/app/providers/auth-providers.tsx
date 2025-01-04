import React, { createContext, useContext, useState } from 'react';
import { AuthenticatedUser } from '@/types/AuthenticatedUser';
import { useMutation } from '@tanstack/react-query';
import { LoginSuccessData } from '@/types/LoginSuccessData';
import { LoginData } from '@/types/LoginData';
import { RegistrationData } from '@/types/RegistrationData';
import { RegistrationSuccessData } from '@/types/RegistrationSuccessData';
import { RegistrationErrorData } from '@/types/RegistrationErrorData';
import { ErrorData } from '@/types/ErrorData';
import { OTPData } from '@/types/OTPData';
import { useCookies } from 'react-cookie'; 
import useTokenStore from '@/state/use-token-store'; 
import { apiCall } from '@/services/apiCall';

interface AuthContextType {
  user: AuthenticatedUser | RegistrationSuccessData | null; 
  login: (username: string, password: string) => Promise<void>;
  verifyOtp: (username: string, otp: string) => Promise<void>;
  logout: () => void;
  register: (
     username: string,
     password: string, 
     email: string,
     date_of_birth: string,
     user_roles: string,
     firstname: string,
     lastname: string ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthenticatedUser | RegistrationSuccessData | null>(null);
  const { setTokens } = useTokenStore(); 
  const [cookies, setCookie, removeCookie] = useCookies(['access', 'refresh']); 
  
  const loginMutation = useMutation({
    mutationKey: ['login_user'],
    mutationFn: async ({ username, password }: LoginData) => {
      return await apiCall('/accounts/login/', 'POST', { username, password });
    },
    onSuccess: (data: LoginSuccessData) => {
      console.log('Login successful: ', data);
      // Store tokens in Zustand
      setTokens(data.refresh, data.access); 
      // Store tokens in cookies
      setCookie('access', data.access, { path: '/', maxAge: 604800 });
      setCookie('refresh', data.refresh, { path: '/', maxAge: 604800 });
      // Optionally set user state
      const loggedInUser: AuthenticatedUser = {
        refresh: data.refresh,
        access: data.access,
      };
      setUser(loggedInUser);
    },
    onError: (error: ErrorData) => {
      console.error('Login error: ', error);
    },
  });

  const registerMutation = useMutation({
    mutationKey: ['register_user'],
    mutationFn: async (userData: RegistrationData) => {
      return await apiCall('/accounts/register/', 'POST', userData);
    },
    onSuccess: (data: RegistrationSuccessData) => {
      console.log('Registration successful: ', data);
    },
    onError: (error: RegistrationErrorData) => {
      console.error('Registration error: ', { ...error });
    },
  });

  const verifyOtpMutation = useMutation({
    mutationKey: ['verify_otp'],
    mutationFn: async (data: OTPData) => {
      return await apiCall('/accounts/verify_otp/', 'POST', data);
    },
    onSuccess: (data) => {
      console.log('OTP verification successful: ', data);
      const loggedInUser: AuthenticatedUser = {
        refresh: data?.tokens?.refresh,
        access: data?.tokens?.access,
      };
      setUser(loggedInUser); 
      setCookie('access', data?.tokens?.access, { path: '/', maxAge: 604800 });
      setCookie('refresh', data?.tokens?.refresh, { path: '/', maxAge: 604800 }); 
    },
    onError: (error) => {
      console.error('OTP verification error: ', error);
    },
  });

  const logout = () => {
    removeCookie('access', { path: '/' }); 
    removeCookie('refresh', { path: '/' }); 
    setUser(null); 
  };

  const login = async (username: string, password: string) => {
    await loginMutation.mutateAsync({ username, password });
  };

  const verifyOtp = async (username: string, otp: string) => {
    await verifyOtpMutation.mutateAsync({ username, otp });
  };

  const register = async (username: string, password: string, email: string) => {
    await registerMutation.mutateAsync({ username, password, email });
  };

  return (
    <AuthContext.Provider value={{ user, login, verifyOtp, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};