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
import clearCurrentUser from '@/state/use-user-store';
import { useRouter } from 'next/navigation';
import { useStore } from 'zustand';
import useUserDataStore from '@/state/use-user-data-store';
import useTokenStore from '@/state/use-token-store';
import { useCompany } from './company-provider';
import { useTalentProfile } from './talent-profile-provider';
import useClientOnboardingStore from '@/state/use-client-onboarding-store';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store';

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
    nationality: string,
    has_accepted: string,
    is_influencer: string,
    whatsapp_number: string,
    preferred_payment_methods: string,
    vat_certificate: string,
    trade_license: string,
    custom_payment_terms: string,
    accept_std_payment_terms: string,
    accounts_email: string,
    mobile_number: string,
    job_title: string,
    contact_person: string,
    state_province_region: string,
    company_name: string,
    address: string,
    telephone: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthenticatedUser | RegistrationSuccessData | null>(null);
  const { setTokens } = useStore(useTokenStore);
  const {
    companyInfo, setCompanyInfo,
    contactInfo, setContactInfo,
    socialMediaLinks, setSocialMediaLinks
  } = useStore(useClientOnboardingStore);

  const {
    personalInfo, setPersonalInfo,
    physicalAttributes, setPhysicalAttributes,
    governmentID, setGovernmentID,
    bankDetails, setBankDetails,
    profileSocials, setProfileSocials,
    talentData, setTalentData
  } = useTalentOnboardingStore();

  const { company, fetchCompany } = useCompany();
  const { talentProfile, fetchTalentProfile } = useTalentProfile();
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

      if (data?.tokens?.user_role === 'client') {
        fetchCompany();
      }

      if (data?.tokens?.user_role === 'talent') {
        fetchTalentProfile();
      }

      console.log('Talent Profile', talentProfile);
      const paymentMethodJSON = company?.payment_method ? JSON.parse(company?.payment_method) : null;

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

        if (paymentMethodJSON) {
          
        }

        setSocialMediaLinks({
          website: company?.website || '',
          social_media_links: {
            twitter: company?.social_media_links?.twitter,
            facebook: company?.social_media_links?.facebook,
            instagram: company?.social_media_links?.instagram,
            linkedin: company?.social_media_links?.linkedin,
          },
        });
      }

      if (talentProfile) {
        // Set personal info
        setPersonalInfo({
          firstname: talentProfile.firstname || '',
          lastname: talentProfile.lastname || '',
          date_of_birth: talentProfile.date_of_birth || '',
          gender: talentProfile.gender || 'male',
          phone_number: talentProfile.phone_number || '',
          whatsapp_number: talentProfile.whatsapp_number || '',
        });

        // Set physical attributes
        setPhysicalAttributes({
          height: String(talentProfile.height) || '',
          weight: String(talentProfile.weight) || '',
          ethnicity: talentProfile.ethnicity || '',
        });

        // Set government ID if available
        // setGovernmentID(talentProfile.government_id || null);

        // Set bank details if available
        // setBankDetails({
        //   bankName: talentProfile.banking_details?.bankName || '',
        //   accountNumber: talentProfile.banking_details?.accountNumber || '',
        //   iban: talentProfile.banking_details?.iban || '',
        //   accountHolderName: talentProfile.banking_details?.accountHolderName || '',
        // });

        // Set profile socials
        setProfileSocials({
          website: talentProfile.website || '',
          social_media_links: {
            twitter: talentProfile.social_media_links?.twitter || '',
            facebook: talentProfile.social_media_links?.facebook || '',
            instagram: talentProfile.social_media_links?.instagram || '',
            linkedin: talentProfile.social_media_links?.linkedin || '',
          },
        });

        // Set talent data
        setTalentData({
          user: talentProfile.user || null,
          headshot: talentProfile.headshot || null,
          date_of_birth: talentProfile.date_of_birth || null,
          gender: talentProfile.gender || null,
          phone_number: talentProfile.phone_number || null,
          nationality: talentProfile.nationality || null,
          skills: talentProfile.skills || [],
          height: talentProfile.height || null,
          weight: talentProfile.weight || null,
          ethnicity: talentProfile.ethnicity || null,
          government_id: talentProfile.government_id || null,
          banking_details: talentProfile.banking_details || null,
          portfolio_pdf: talentProfile.portfolio_pdf || null,
          additional_images: talentProfile.additional_images || null,
          is_verified: talentProfile.is_verified || false,
          verification_notification_sent: talentProfile.verification_notification_sent || false,
          created_at: talentProfile.created_at || '',
          updated_at: talentProfile.updated_at || '',
          website: talentProfile.website || '',
          social_media_links: talentProfile.social_media_links || ''
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
        nationality: userData.nationality,
        has_accepted: Boolean(userData.has_accepted),
        is_influencer: userData.is_influencer,
        whatsapp_number: String(userData.whatsapp_number),
        address: userData.address,
        telephone: userData.address,
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
    onSuccess: (data: LoginSuccessData) => {

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

      if (data?.tokens?.user_role === 'client') {
        fetchCompany();
      }

      if (data?.tokens?.user_role === 'talent') {
        fetchTalentProfile();
      }

      console.log('Talent Profile', talentProfile);
      const paymentMethodJSON = company?.payment_method ? JSON.parse(company?.payment_method) : null;

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

        setSocialMediaLinks({
          website: company?.website || '',
          social_media_links: {
            twitter: company?.social_media_links?.twitter,
            facebook: company?.social_media_links?.facebook,
            instagram: company?.social_media_links?.instagram,
            linkedin: company?.social_media_links?.linkedin,
          },
        });
      }

      if (talentProfile) {
        // Set personal info
        setPersonalInfo({
          firstname: talentProfile.firstname || '',
          lastname: talentProfile.lastname || '',
          date_of_birth: talentProfile.date_of_birth || '',
          gender: talentProfile.gender || 'male',
          phone_number: talentProfile.phone_number || '',
          whatsapp_number: talentProfile.whatsapp_number || '',
        });

        // Payment Methods
        if (paymentMethodJSON) {
          
        }

        // Set physical attributes
        setPhysicalAttributes({
          height: String(talentProfile.height) || '',
          weight: String(talentProfile.weight) || '',
          ethnicity: talentProfile.ethnicity || '',
        });

        // Set government ID if available
        // setGovernmentID(talentProfile.government_id || null);

        // Set bank details if available
        // setBankDetails({
        //   bankName: talentProfile.banking_details?.bankName || '',
        //   accountNumber: talentProfile.banking_details?.accountNumber || '',
        //   iban: talentProfile.banking_details?.iban || '',
        //   accountHolderName: talentProfile.banking_details?.accountHolderName || '',
        // });

        // Set profile socials
        setProfileSocials({
          website: talentProfile.website || '',
          social_media_links: {
            twitter: talentProfile.social_media_links?.twitter || '',
            facebook: talentProfile.social_media_links?.facebook || '',
            instagram: talentProfile.social_media_links?.instagram || '',
            linkedin: talentProfile.social_media_links?.linkedin || '',
          },
        });

        // Set talent data
        setTalentData({
          user: talentProfile.user || null,
          headshot: talentProfile.headshot || null,
          date_of_birth: talentProfile.date_of_birth || null,
          gender: talentProfile.gender || null,
          phone_number: talentProfile.phone_number || null,
          nationality: talentProfile.nationality || null,
          skills: talentProfile.skills || [],
          height: talentProfile.height || null,
          weight: talentProfile.weight || null,
          ethnicity: talentProfile.ethnicity || null,
          government_id: talentProfile.government_id || null,
          banking_details: talentProfile.banking_details || null,
          portfolio_pdf: talentProfile.portfolio_pdf || null,
          additional_images: talentProfile.additional_images || null,
          is_verified: talentProfile.is_verified || false,
          verification_notification_sent: talentProfile.verification_notification_sent || false,
          website: talentProfile.website || '',
          social_media_links: talentProfile.social_media_links || '',
          created_at: talentProfile.created_at || '',
          updated_at: talentProfile.updated_at || '',
        });
      }

      setUserData(
        data?.tokens?.user_role,
        data?.tokens?.profile_progress,
        data?.tokens?.onboarding_presented,
        data?.tokens?.profile_completed
      );

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
    nationality: string,
    has_accepted: string,
    is_influencer: string,
    whatsapp_number: string,
    address: string,
    preferred_payment_methods: string,
    vat_certificate: string,
    trade_license: string,
    custom_payment_terms: string,
    accept_std_payment_terms: string,
    accounts_email: string,
    mobile_number: string,
    job_title: string,
    contact_person: string,
    state_province_region: string,
    company_name: string,
    telephone: string
  ) => {
    const registrationData = {
      username,
      password,
      email,
      user_role,
      firstname,
      lastname,
      date_of_birth,
      gender,
      nationality,
      has_accepted,
      is_influencer,
      whatsapp_number,
      address,
      preferred_payment_methods,
      vat_certificate,
      trade_license,
      custom_payment_terms,
      accept_std_payment_terms,
      accounts_email,
      mobile_number,
      job_title,
      contact_person,
      state_province_region,
      company_name,
      telephone
    };

    await registerMutation.mutateAsync(registrationData);
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