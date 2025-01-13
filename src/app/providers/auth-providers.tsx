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
import clearCurrentUser from '@/state/use-user-store';
import { useRouter } from 'next/navigation';
import { useStore } from 'zustand';
import useUserDataStore from '@/state/use-user-data-store';
import useTokenStore from '@/state/use-token-store';
import { useCompany } from './company-provider';
import useClientOnboardingStore from '@/state/use-client-onboarding-store';
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
    nationality: string,
    has_accepted: string,
    is_influencer: string,
    whatsapp_number: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthenticatedUser | RegistrationSuccessData | null>(null);
  const { setTokens } = useStore(useTokenStore);
  const {
    companyInfo, setCompanyInfo,
    contactInfo, setContactInfo,
    paymentMethod, setPaymentMethod,
    socialMediaLinks, setSocialMediaLinks
  } = useStore(useClientOnboardingStore);
  const { company, fetchCompany } = useCompany();
  const [cookies, setCookie, removeCookie] = useCookies([
    'access', 'refresh', 'user_role',
    'onboarding_presented', 'profile_progress',
    'profile_completed', 'facebook',
    'governmentIDName',
    'governmentIDUrl',
    'headshotBlobUrl',
    'instagram',
    'linkedin',
    'nationality',
    'skills',
    'twitter',
    'username',
    'website'
  ]);

  const {
    setUserData,
    clearUserData } = useStore(useUserDataStore);

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

      setTokens(data?.tokens?.refresh, data?.tokens?.access);

      setUser(loggedInUser);
      setCookie('access', data?.tokens?.access, { path: '/', maxAge: 604800 });
      setCookie('refresh', data?.tokens?.refresh, { path: '/', maxAge: 604800 });
      setCookie('user_role', data?.tokens?.user_role, { path: '/', maxAge: 604800 });
      setCookie('profile_progress', data?.tokens?.profile_progress, { path: '/', maxAge: 604800 });
      setCookie('onboarding_presented', data?.tokens?.onboarding_presented, { path: '/', maxAge: 604800 });
      setCookie('profile_completed', data?.tokens?.profile_completed, { path: '/', maxAge: 604800 });

      fetchCompany();
      console.log('Company', company?.payment_method);
      const paymentMethodJSON = company?.payment_method ? JSON.parse(company?.payment_method) : null;
      console.log("Payment Methods", paymentMethodJSON);
      if (company) {

        setCompanyInfo({
          name: company.name || '',
          slogan: company.slogan || '',
          description: company.description || '',
        });

        setContactInfo({
          address: company.address || '',
          phone_number: company.phone_number || '',
          whatsapp_number: company.whatsapp_number || '',
        });

      }

      setUserData(
        data?.tokens?.user_role,
        data?.tokens?.profile_progress,
        data?.tokens?.onboarding_presented,
        data?.tokens?.profile_completed
      );

    },
    onError: (error: ErrorData) => {
      console.error('Login error: ', error);
    },
  });

  const registerMutation = useMutation({
    mutationKey: ['register_user'],
    mutationFn: async (userData: RegistrationData) => {

      console.log("User Data", userData);

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
        nationality: userData.nationality,
        has_accepted: Boolean(userData.has_accepted),
        is_influencer: userData.is_influencer,
        whatsapp_number: String(userData.whatsapp_number)
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
    removeCookie('profile_completed', { path: '/' });
    removeCookie('onboarding_presented', { path: '/' });
    removeCookie('profile_progress', { path: '/' });
    removeCookie('facebook', { path: '/' });
    removeCookie('governmentIDName', { path: '/' });
    removeCookie('governmentIDUrl', { path: '/' });
    removeCookie('headshotBlobUrl', { path: '/' });
    removeCookie('instagram', { path: '/' });
    removeCookie('linkedin', { path: '/' });
    removeCookie('nationality', { path: '/' });
    removeCookie('skills', { path: '/' });
    removeCookie('twitter', { path: '/' });
    removeCookie('username', { path: '/' });
    removeCookie('website', { path: '/' });
    setUser(null);
    clearCurrentUser();
    clearUserData();
  };

  const login = async (username: string, password: string) => {
    await loginMutation.mutateAsync({ username, password });
    if (user) {
      console.log("User", user);
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
    nationality: string,
    has_accepted: string,
    is_influencer: string,
    whatsapp_number: string
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
      nationality: nationality,
      has_accepted: has_accepted,
      is_influencer: is_influencer,
      whatsapp_number: whatsapp_number
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