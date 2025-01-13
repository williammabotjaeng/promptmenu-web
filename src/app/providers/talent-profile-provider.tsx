"use client";

import React, { createContext, useContext } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { restCall } from '@/services/restCall';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { TalentProfileData } from '@/types/TalentProfileData';
import { useStore } from 'zustand';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store';

interface TalentProfileContextType {
  talentProfile: TalentProfileData | null;
  fetchTalentProfile: () => Promise<void>;
  updateTalentProfile: (profileId: string, data: TalentProfileData) => Promise<void>;
}

const TalentProfileContext = createContext<TalentProfileContextType | null>(null);

export const TalentProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [cookies] = useCookies(['access', 'username']);
  const accessToken = cookies['access'];
  const userName = cookies['username'];

  const {
    setPersonalInfo,
    setPhysicalAttributes,
    setGovernmentID,
    setBankDetails,
    setProfileSocials,
    setTalentData,
  } = useStore(useTalentOnboardingStore);

  const fetchTalentProfileQuery = useQuery({
    queryKey: ['fetch_talent_profile'],
    queryFn: async () => {
      const response = await restCall(`/dashboard/talent-profile/retrieve/?username=${userName}`, 'GET', {}, accessToken);
      console.log("Talent Profile Response", response);
      setPersonalInfo({
        firstname: response.firstname,
        lastname: response.lastname,
        date_of_birth: response.date_of_birth,
        gender: response.gender,
        phone_number: response.phone_number,
        whatsapp_number: response.whatsapp_number,
      });
      setPhysicalAttributes({
        height: response.height,
        weight: response.weight,
        ethnicity: response.ethnicity,
      });
      setGovernmentID(response.government_id);
      setBankDetails(response.banking_details);
      setProfileSocials({
        website: response.website,
        social_media_links: response.social_media_links,
      });
      setTalentData(response);
      return response;
    },
    enabled: false, 
  });

  const updateTalentProfileMutation = useMutation({
    mutationKey: ['update_talent_profile'],
    mutationFn: async ({ profileId, data }: { profileId: string; data: TalentProfileData }) => {
      return await restCall(`/dashboard/talent-profile/update/${profileId}/`, 'PUT', data, accessToken);
    },
    onSuccess: (data) => {
      console.log('Talent profile updated successfully', data);
    },
    onError: (error) => {
      console.error('Error updating talent profile: ', error);
    },
  });

  const fetchTalentProfile = async () => {
    await fetchTalentProfileQuery.refetch();
  };

  const updateTalentProfile = async (profileId: string, data: TalentProfileData) => {
    await updateTalentProfileMutation.mutateAsync({ profileId, data });
  };

  return (
    <TalentProfileContext.Provider value={{ talentProfile: fetchTalentProfileQuery.data, fetchTalentProfile, updateTalentProfile }}>
      {children}
    </TalentProfileContext.Provider>
  );
};

export const useTalentProfile = () => {
  const context = useContext(TalentProfileContext);
  if (!context) {
    throw new Error('useTalentProfile must be used within a TalentProfileProvider');
  }
  return context;
};