"use client";

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
import { apiCall } from '@/services/apiCall';
import { xAPICall } from '@/services/xAPICall';
import clearCurrentUser from '@/state/use-user-store';
import { useStore } from 'zustand';
import useTokenStore from '@/state/use-token-store';
import { AuthContextType } from '@/types/AuthContext';
import { useRouter, redirect } from 'next/navigation';
import useAuthStore from '@/state/use-auth-store';
import { UserUpdateData } from '@/types/UserUpdateData';
import { restCall } from '@/services/restCall';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(false);
  const { setTokens } = useStore(useTokenStore);
  const { setAuth, clearAuth } = useStore(useAuthStore);
  const [cookies, setCookie, removeCookie] = useCookies([
    'access', 'refresh', 'ssh_session_id', 
    'user_role', 'username', 'firstname', 
    'lastname', 'onboarding_presented'
  ]);

  const accessToken = cookies?.access;

  const router = useRouter();

  const loginMutation = useMutation({
    mutationKey: ['login_user'],
    mutationFn: async ({ email, password }: LoginData) => {
      return await apiCall('/accounts/login/', 'POST', { email, password });
    },
    onSuccess: (data) => {
      setTokens(data?.tokens?.refresh, data?.tokens?.access);
      setUser(true);
      setAuth(true);
      setCookie('access', data?.tokens?.access, { path: '/', maxAge: 604800 });
      setCookie('refresh', data?.tokens?.refresh, { path: '/', maxAge: 604800 });
      setCookie('user_role', data?.tokens?.user_role, { path: '/', maxAge: 604800 });
      setCookie('firstname', data?.tokens?.firstname, { path: '/', maxAge: 604800 });
      setCookie('lastname', data?.tokens?.lastname, { path: '/', maxAge: 604800 });
      setCookie('onboarding_presented', data?.tokens?.lastname, { path: '/', maxAge: 604800 });
      setCookie('ssh_session_id', data?.ssh_session_id, { path: '/', maxAge: 604800 });
      redirect('/dashboard'); 
    },
    onError: (error) => {
      console.error('Login error: ', error);
    },
  });

  const registerMutation = useMutation({
    mutationKey: ['register_user'],
    mutationFn: async (userData: RegistrationData) => {
      return await apiCall('/accounts/register/', 'POST', {
        username: userData.username,
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        password: userData.password,
      });
    },
    onSuccess: (data: RegistrationSuccessData) => {
    
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
      setTokens(data?.tokens?.refresh, data?.tokens?.access);
      setUser(true);
      setAuth(true);
      let temp_user_role = data?.tokens?.user_role === 'None' ? undefined : data?.tokens?.user_role; 
      setCookie('access', data?.tokens?.access, { path: '/', maxAge: 604800 });
      setCookie('refresh', data?.tokens?.refresh, { path: '/', maxAge: 604800 });
      setCookie('user_role', temp_user_role, { path: '/', maxAge: 604800 });
      setCookie('firstname', data?.tokens?.firstname, { path: '/', maxAge: 604800 });
      setCookie('lastname', data?.tokens?.lastname, { path: '/', maxAge: 604800 });
      setCookie('onboarding_presented', data?.tokens?.lastname, { path: '/', maxAge: 604800 });
      setCookie('ssh_session_id', data?.ssh_session_id, { path: '/', maxAge: 604800 });
    },
    onError: (error) => {
      console.error('OTP verification error: ', error);
    },
  });

  const logoutMutation = useMutation({
    mutationKey: ['logout_user'],
    mutationFn: async () => {
      return await apiCall('/accounts/logout/', 'POST'); 
    },
    onSuccess: () => {
      removeCookie('access', { path: '/' });
      removeCookie('refresh', { path: '/' });
      removeCookie('ssh_session_id', { path: '/' });
      removeCookie('user_role', { path: '/' });
      removeCookie('username', { path: '/' });
      redirect('/login'); 
    },
    onError: (error) => {
      console.error('Logout error: ', error);
    },
  });

  const updateUserMutation = useMutation({
    mutationKey: ['update_user'],
    mutationFn: async ({ field, value}: UserUpdateData) => {
      return await restCall('/accounts/update-user/', 'PATCH', {
        [field]: value
      }, accessToken);
    },
    onSuccess: (data) => {
      console.log('User updated successfully:', data);
      
    },
    onError: (error) => {
      console.error('Update user error: ', error);
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
    lastname: string
  ) => {
    const registrationData = {
      username,
      password,
      email,
      firstname,
      lastname,
    };

    await registerMutation.mutateAsync(registrationData);
  };

  const updateUser = async (userData) => {
    await updateUserMutation.mutateAsync(userData);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      verifyOtp, 
      logout, 
      register, 
      updateUser,
      loginIsLoading: loginMutation.isPending,
      loginError: loginMutation.isError,
      verifyOtpIsLoading: verifyOtpMutation.isPending,
      verifyOtpError: verifyOtpMutation.isError,
      registerIsLoading: registerMutation.isPending,
      registerError: registerMutation.error as ErrorData | null,
    }}>
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