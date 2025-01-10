import React, { createContext, useContext, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiCall } from '@/services/apiCall';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { TalentProfileData } from '@/types/TalentProfileData'; 
import { CompanyData } from '@/types/CompanyData'; 

interface OnboardingContextType {
  createTalentProfile: (data: TalentProfileData) => Promise<void>;
  createCompany: (data: CompanyData) => Promise<void>;
  updateCompany: (companyId: string, data: CompanyData) => Promise<void>;
  updateTalentProfile: (profileId: string, data: TalentProfileData) => Promise<void>;
  updateProfileProgress: (progress: number) => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['profile_progress']);

  const createTalentProfileMutation = useMutation({
    mutationKey: ['create_talent_profile'],
    mutationFn: async (data: TalentProfileData) => {
      return await apiCall('/talent-profiles/create/', 'POST', data);
    },
    onSuccess: () => {
      console.log('Talent profile created successfully');
      router.push('/dashboard'); // Redirect after successful creation
    },
    onError: (error) => {
      console.error('Error creating talent profile: ', error);
    },
  });

  const createCompanyMutation = useMutation({
    mutationKey: ['create_company'],
    mutationFn: async (data: CompanyData) => {
      return await apiCall('/companies/create/', 'POST', data);
    },
    onSuccess: () => {
      console.log('Company created successfully');
      router.push('/dashboard'); // Redirect after successful creation
    },
    onError: (error) => {
      console.error('Error creating company: ', error);
    },
  });

  const updateCompanyMutation = useMutation({
    mutationKey: ['update_company'],
    mutationFn: async ({ companyId, data }: { companyId: string; data: CompanyData }) => {
      return await apiCall(`/companies/update/${companyId}/`, 'PUT', data);
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
      return await apiCall(`/talent-profiles/update/${profileId}/`, 'PUT', data);
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

  const createTalentProfile = async (data: TalentProfileData) => {
    await createTalentProfileMutation.mutateAsync(data);
  };

  const createCompany = async (data: CompanyData) => {
    await createCompanyMutation.mutateAsync(data);
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