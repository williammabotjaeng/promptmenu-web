"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { restCall } from "@/services/restCall";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { TalentProfileData } from "@/types/TalentProfileData";
import { useStore } from "zustand";
import useTalentOnboardingStore from "@/state/use-talent-onboarding-store";
import { csrfRestCall } from "@/services/csrfRestCall";

interface TalentProfileContextType {
  talentProfile: TalentProfileData | any | null;
  signedUrls: Record<string, string> | null;
  fetchTalentProfile: () => Promise<void>;
  fetchTalentProfiles: ({ skill, location, experience }: { skill: any; location: any; experience: any; }) => Promise<void>;
  deleteFiles: (filePaths: string[]) => Promise<void>;
  updateTalentProfile: (
    profileId: string,
    data: TalentProfileData
  ) => Promise<void>;
}

const TalentProfileContext = createContext<TalentProfileContextType | null>(
  null
);

export const TalentProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [cookies] = useCookies(["access", "username", "csrftoken"]);
  const accessToken = cookies["access"];
  const userName = cookies["username"];
  const csrfToken = cookies["csrftoken"];

  const [signedUrls, setSignedUrls] = useState<Record<string, string> | null>(
    null
  );

  const {
    setPersonalInfo,
    setPhysicalAttributes,
    setGovernmentID,
    setBankDetails,
    setProfileSocials,
    setTalentData,
  } = useStore(useTalentOnboardingStore);

  const fetchTalentProfileQuery = useQuery({
    queryKey: ["fetch_talent_profile"],
    queryFn: async () => {
      const response = await restCall(
        `/portal/talent-profile/retrieve/?username=${userName}`,
        "GET",
        {},
        accessToken
      );
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

  const deleteFilesMutation = useMutation({
    mutationKey: ["delete_files"],
    mutationFn: async (filePaths: string[]) => {
      return await csrfRestCall(
        "/portal/delete-files/",
        "POST",
        { file_paths: filePaths },
        accessToken,
        csrfToken
      );
    },
    onSuccess: (data) => {
      console.log("Files deleted successfully", data);
    },
    onError: (error) => {
      console.error("Error deleting files: ", error);
    },
  });

  const fetchTalentProfilesMutation = useMutation({
    mutationKey: ["fetch_talent_profiles"],
    mutationFn: async (params: { skill?: string; location?: string; experience?: string } = {}) => {
      // Build query parameters
      const queryParams = new URLSearchParams();
      
      if (params.skill) queryParams.append('skill', params.skill);
      if (params.location) queryParams.append('location', params.location);
      if (params.experience) queryParams.append('experience', params.experience);
      
      const url = `/api/talent-profiles/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const response = await csrfRestCall(
        url,
        'GET',
        {},
        accessToken,
        csrfToken
      );
      
      console.log("Talent Profiles Response", response);
      return response;
    },
    onSuccess: (data) => {
      console.log('Talent profiles fetched successfully', data);
      // You can add additional state updates here if needed
      // For example: setTalentProfiles(data);
    },
    onError: (error) => {
      console.error('Error fetching talent profiles: ', error);
    },
  });

  const updateTalentProfileMutation = useMutation({
    mutationKey: ["update_talent_profile"],
    mutationFn: async ({
      profileId,
      data,
    }: {
      profileId: string;
      data: TalentProfileData;
    }) => {
      return await restCall(
        `/portal/talent-profile/update/${profileId}/`,
        "PUT",
        data,
        accessToken
      );
    },
    onSuccess: (data) => {
      console.log("Talent profile updated successfully", data);
    },
    onError: (error) => {
      console.error("Error updating talent profile: ", error);
    },
  });

  const fetchTalentProfile = async () => {
    await fetchTalentProfileQuery.refetch();
  };

  const fetchTalentProfiles = async ({
    skill, location, experience
  }) => {
    await fetchTalentProfilesMutation.mutateAsync({skill, location, experience});
  };

  const updateTalentProfile = async (
    profileId: string,
    data: TalentProfileData
  ) => {
    await updateTalentProfileMutation.mutateAsync({ profileId, data });
  };

  const deleteFiles = async (filePaths: string[]) => {
    await deleteFilesMutation.mutateAsync(filePaths);
  };

  useEffect(() => {
    const fetchSignedUrls = async () => {
      if (fetchTalentProfileQuery.data) {
        const talentProfile = fetchTalentProfileQuery.data;

        const talentAssets = {
          headshot: talentProfile.headshot,
          governmentIdFront: talentProfile.government_id_front,
          governmentIdBack: talentProfile.government_id_back,
          portfolioPdf: talentProfile.portfolio_pdf,
          portfolioVideo: talentProfile.portfolio_video,
          additionalImages: talentProfile.additional_images,
        };

        console.log("Talent Assets:", talentAssets);

        try {
          const response = await csrfRestCall(
            `/portal/talent-assets/get-signed-urls/`,
            "POST",
            {
              filenames: {
                headshot: talentAssets.headshot,
                government_id_front: talentAssets.governmentIdFront,
                government_id_back: talentAssets.governmentIdBack,
                portfolio_pdf: talentAssets.portfolioPdf,
                portfolio_video: talentAssets.portfolioVideo,
                additional_images: [...talentAssets.additionalImages],
              },
            },
            accessToken,
            csrfToken
          );
          console.log("Signed URLs:", response);
          setSignedUrls(response.signed_urls);
        } catch (error) {
          console.error("Error fetching signed URLs:", error);
        }
      }
    };

    fetchSignedUrls();
  }, [fetchTalentProfileQuery.data]);

  return (
    <TalentProfileContext.Provider
      value={{
        talentProfile: fetchTalentProfileQuery.data,
        signedUrls,
        fetchTalentProfile,
        fetchTalentProfiles,
        updateTalentProfile,
        deleteFiles,
      }}
    >
      {children}
    </TalentProfileContext.Provider>
  );
};

export const useTalentProfile = () => {
  const context = useContext(TalentProfileContext);
  if (!context) {
    throw new Error(
      "useTalentProfile must be used within a TalentProfileProvider"
    );
  }
  return context;
};
