"use client";

import React, { createContext, useContext, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { restCall } from '@/services/restCall';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { TalentProfileData } from '@/types/TalentProfileData';
import { CompanyData } from '@/types/CompanyData';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store';
import { useStore } from 'zustand';
import moment from 'moment';
import CompanyInfo from '@/components/dashboard/onboarding/CompanyInfo';
import useClientOnboardingStore from '@/state/use-client-onboarding-store';

interface OnboardingContextType {
  createTalentProfile: () => Promise<void>;
  createCompany: () => Promise<void>;
  updateCompany: (companyId: string, data: CompanyData) => Promise<void>;
  updateTalentProfile: (profileId: string, data: TalentProfileData) => Promise<void>;
  updateProfileProgress: (progress: number) => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies([
    'profile_progress',
    'governmentIDUrl',
    'headshotBlobUrl',
    'website',
    'facebook',
    'twitter',
    'linkedin',
    'instagram',
    'skills',
    'username',
    'nationality',
    'access'
  ]);
  const {
    setPersonalInfo,
    setBankDetails,
    personalInfo,
    bankDetails,
    physicalAttributes,
    setPhysicalAttributes
  } = useStore(useTalentOnboardingStore);

  const {
    setCompanyInfo,
    setContactInfo,
    // setPaymentMethod,
    setSocialMediaLinks,
    companyInfo,
    contactInfo,
    // paymentMethod,
    socialMediaLinks
  } = useStore(useClientOnboardingStore);

  const accessToken = cookies['access'];

  const formatDateToYYYYMMDD = (date: string | null | undefined) => {
    return moment(date).format('YYYY-MM-DD');
  };

  const formattedDate = formatDateToYYYYMMDD(personalInfo?.date_of_birth);

  const companyData = {
    username: cookies['username'],
    name: companyInfo?.name,
    slogan: companyInfo?.slogan,
    description: companyInfo?.description,
    address: contactInfo?.address,
    phone_number: contactInfo?.phone_number,
    whatsapp_number: contactInfo?.whatsapp_number,
    // payment_method: JSON.stringify(paymentMethod),
    website: socialMediaLinks?.website,
    social_media_links: {
      facebook: socialMediaLinks?.social_media_links?.facebook,
      instagram: socialMediaLinks?.social_media_links?.instagram,
      linkedin: socialMediaLinks?.social_media_links?.linkedin
    }
  };

  const createTalentProfileMutation = useMutation({
    mutationKey: ['create_talent_profile'],
    mutationFn: async () => {
      console.log("personal info", personalInfo);
      return await restCall('/portal/talent-profile/create/', 'POST', {
        username: cookies['username'],
        headshot: cookies['headshotBlobUrl'],
        firstname: personalInfo?.firstname,
        lastname: personalInfo?.lastname,
        date_of_birth: formattedDate,
        gender: personalInfo?.gender,
        phone_number: personalInfo?.phone_number,
        nationality: cookies['nationality'],
        skills: cookies['skills'],
        height: physicalAttributes?.height,
        weight: physicalAttributes?.weight,
        ethnicity: physicalAttributes?.ethnicity,
        government_id: cookies['governmentIDUrl'],
        banking_details: JSON.stringify(bankDetails),
        portfolio_pdf: null,
        additional_images: null
      }, accessToken);
    },
    onSuccess: (data) => {
      console.log('Talent profile created successfully', data);
      router.push('/dashboard');
    },
    onError: (error) => {
      console.error('Error creating talent profile: ', error);
    },
  });

  const createCompanyMutation = useMutation({
    mutationKey: ['create_company'],
    mutationFn: async () => {
      console.log("Company Data", companyData);
      return await restCall('/dashboard/company/create/', 'POST', companyData, accessToken);
    },
    onSuccess: () => {
      console.log('Company created successfully');
      router.push('/dashboard');
    },
    onError: (error) => {
      console.error('Error creating company: ', error);
    },
  });

  const updateCompanyMutation = useMutation({
    mutationKey: ['update_company'],
    mutationFn: async ({ companyId, data }: { companyId: string; data: CompanyData }) => {
      return await restCall(`/dashboard/company/update/${companyId}/`, 'PUT', {

      }, accessToken);
    },
    onSuccess: () => {
      console.log('Company updated successfully');
    },
    onError: (error) => {
      console.error('Error updating company: ', error);
    },
  });

  const updateTalentProfileMutation = useMutation({
    mutationKey: ['update_talent_profile'],
    mutationFn: async ({ profileId, data }: { profileId: string; data: TalentProfileData }) => {
      return await restCall(`/talent-profiles/update/${profileId}/`, 'PUT', data, accessToken);
    },
    onSuccess: () => {
      console.log('Talent profile updated successfully');
    },
    onError: (error) => {
      console.error('Error updating talent profile: ', error);
    },
  });

  const updateProfileProgress = async (progress: number) => {
    setCookie('profile_progress', progress, { path: '/', maxAge: 604800 });
    console.log('Profile progress updated to: ', progress);
  };

  const createTalentProfile = async () => {
    await createTalentProfileMutation.mutateAsync();
  };

  const createCompany = async () => {
    await createCompanyMutation.mutateAsync();
  };

  const updateCompany = async (companyId: string, data: CompanyData) => {
    await updateCompanyMutation.mutateAsync({ companyId, data });
  };

  const updateTalentProfile = async (profileId: string, data: TalentProfileData) => {
    await updateTalentProfileMutation.mutateAsync({ profileId, data });
  };

  return (
    <OnboardingContext.Provider value={{ createTalentProfile, createCompany, updateCompany, updateTalentProfile, updateProfileProgress }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};