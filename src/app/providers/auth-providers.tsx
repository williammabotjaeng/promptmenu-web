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
import setCurrentUser from '@/state/use-user-store';
import clearCurrentUser from '@/state/use-user-store';
import { useRouter } from 'next/navigation';
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
     user_role: string,
     firstname: string,
     lastname: string,
     gender: string,
     phonenumber: string,
     nationality: string ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthenticatedUser | RegistrationSuccessData | null>(null);
  const { setTokens } = useTokenStore(); 
  const [cookies, setCookie, removeCookie] = useCookies(['access', 'refresh', 'user_role']); 

  const router = useRouter();
  
  const loginMutation = useMutation({
    mutationKey: ['login_user'],
    mutationFn: async ({ username, password }: LoginData) => {
      return await apiCall('/accounts/login/', 'POST', { username, password });
    },
    onSuccess: (data: LoginSuccessData) => {
      console.log('Login successful: ', data);
      const loggedInUser: AuthenticatedUser = {
        refresh: data?.tokens?.refresh,
        access: data?.tokens?.access,
        user_role: data?.tokens?.user_role
      };
      console.log("tokens", data?.tokens)
      setUser(loggedInUser); 
      setCookie('access', data?.tokens?.access, { path: '/', maxAge: 604800 });
      setCookie('refresh', data?.tokens?.refresh, { path: '/', maxAge: 604800 }); 
      setCookie('user_role', data?.tokens?.user_role, { path: '/', maxAge: 604800 }); 
    },
    onError: (error: ErrorData) => {
      console.error('Login error: ', error);
    },
  });

  const registerMutation = useMutation({
    mutationKey: ['register_user'],
    mutationFn: async (userData: RegistrationData) => {
      return await apiCall('/accounts/register/', 'POST', {
        username: userData.username,
        user_role: userData.user_role,
        date_of_birth: userData.date_of_birth,
        email: userData.email,
        firstname: userData.firstname,
        lastname: userData.lastname,
        password: userData.password,
        gender: userData.gender,
        phonenumber: userData.phonenumber,
        nationality: userData.country
      });
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
    },
    onError: (error) => {
      console.error('OTP verification error: ', error);
    },
  });

  const logout = () => {
    removeCookie('access', { path: '/' }); 
    removeCookie('refresh', { path: '/' }); 
    removeCookie('user_role', { path: '/' });
    setUser(null); 
    clearCurrentUser();
  };

  const login = async (username: string, password: string) => {
    await loginMutation.mutateAsync({ username, password });
    if (user)
    {
      router.push('/dashboard')
    }
  };

  const verifyOtp = async (username: string, otp: string) => {
    await verifyOtpMutation.mutateAsync({ username, otp });
  };

  const register = async (
    username: string, 
    password: string, 
    email: string,
    user_role: string,
    firstname: string,
    lastname: string,
    date_of_birth: string,
    gender: string,
    phonenumber: string,
    nationality: string
  ) => {
    await registerMutation.mutateAsync({ 
      username: username, 
      password: password, 
      email: email, 
      user_role: user_role, 
      firstname: firstname, 
      lastname: lastname, 
      date_of_birth: date_of_birth, 
      gender: gender, 
      phonenumber: phonenumber,
      nationality: nationality
    });
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