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
  talentProfiles: any[] | null;
  signedUrls: Record<string, string> | null;
  profileSignedUrls: Record<string, string> | null;
  fetchTalentProfile: () => Promise<void>;
  fetchTalentProfiles: () => Promise<any>;
  deleteFiles: (filePaths: string[]) => Promise<void>;
  updateTalentProfile: (
    profileId: string,
    data: TalentProfileData
  ) => Promise<void>;
  fetchProfileSignedUrls: (profiles: any[]) => Promise<Record<string, string>>;
  roleApplicants: any[] | null;
  fetchRoleApplicants: (roleId: string) => Promise<any>;
  updateApplicantStatus: (roleId: string, userId: string, status: string) => Promise<void>;
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

  const [signedUrls, setSignedUrls] = useState<Record<string, string> | null>(null);
  const [profileSignedUrls, setProfileSignedUrls] = useState<Record<string, string> | null>(null);
  const [talentProfiles, setTalentProfiles] = useState<any[] | null>(null);

  const [roleApplicants, setRoleApplicants] = useState<any[] | null>(null);

  
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
    mutationFn: async () => {
      // Build query parameters
      const queryParams = new URLSearchParams();
      
      const url = `/portal/talent-profiles/`;
      
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
    onSuccess: async (data) => {
      console.log('Talent profiles fetched successfully', data);
      setTalentProfiles(data);
      
      // Fetch signed URLs for talent profiles' headshots
      if (Array.isArray(data) && data.length > 0) {
        try {
          const urls = await fetchProfileSignedUrls(data);
          setProfileSignedUrls(urls);
        } catch (error) {
          console.error("Error fetching profile signed URLs:", error);
        }
      }
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

  const fetchRoleApplicantsMutation = useMutation({
    mutationKey: ["fetch_role_applicants"],
    mutationFn: async (roleId: string) => {
      const response = await restCall(
        `/portal/roles/${roleId}/applicants/`,
        "GET",
        {},
        accessToken
      );
      console.log("Role Applicants Response", response);
      return response;
    },
    onSuccess: async (data: any) => {
      console.log('Role applicants fetched successfully', data);
      setRoleApplicants(data);
      
      // Fetch signed URLs for applicants' profile images
      if (Array.isArray(data) && data.length > 0) {
        try {
          const urls = await fetchProfileSignedUrls(data);
          setProfileSignedUrls(urls);
        } catch (error) {
          console.error("Error fetching applicant profile signed URLs:", error);
        }
      }
    },
    onError: (error) => {
      console.error('Error fetching role applicants: ', error);
    },
  });
  
  // Add this mutation for updating applicant status
  const updateApplicantStatusMutation = useMutation({
    mutationKey: ["update_applicant_status"],
    mutationFn: async ({
      roleId,
      userId,
      status,
    }: {
      roleId: string;
      userId: string;
      status: string;
    }) => {
      return await csrfRestCall(
        `/portal/roles/${roleId}/applicants/${userId}/status/`,
        "PUT",
        { status },
        accessToken,
        csrfToken
      );
    },
    onSuccess: (data) => {
      console.log("Applicant status updated successfully", data);
      // Update the local state to reflect the change
      if (roleApplicants) {
        setRoleApplicants(roleApplicants.map(applicant => {
          if (applicant.user?.id === data.user_id) {
            return {
              ...applicant,
              application_data: {
                ...applicant.application_data,
                status: data.status
              }
            };
          }
          return applicant;
        }));
      }
    },
    onError: (error) => {
      console.error("Error updating applicant status: ", error);
    },
  });

  const fetchTalentProfile = async () => {
    await fetchTalentProfileQuery.refetch();
  };

  const fetchTalentProfiles = async () => {
    return await fetchTalentProfilesMutation.mutateAsync();
  };

  const updateTalentProfile = async (
    profileId: string,
    data: TalentProfileData
  ) => {
    await updateTalentProfileMutation.mutateAsync({ profileId, data });
  };

  const fetchRoleApplicants = async (roleId: string) => {
    return await fetchRoleApplicantsMutation.mutateAsync(roleId);
  };
  
  const updateApplicantStatus = async (
    roleId: string,
    userId: string,
    status: string
  ) => {
    await updateApplicantStatusMutation.mutateAsync({ roleId, userId, status });
  };

  const deleteFiles = async (filePaths: string[]) => {
    await deleteFilesMutation.mutateAsync(filePaths);
  };

  // New function to fetch signed URLs for talent profile headshots
  const fetchProfileSignedUrls = async (profiles: any[]): Promise<Record<string, string>> => {
    if (!profiles || profiles.length === 0) {
      return {};
    }
    
    console.log("Fetching signed URLs for talent profiles:", profiles);
    
    // Extract headshot paths from profiles with proper typing
    const headshotPaths: Record<string, string> = profiles.reduce((acc: Record<string, string>, profile) => {
      if (profile && profile.id && profile.headshot && typeof profile.headshot === 'string') {
        acc[profile.id] = profile.headshot;
      }
      return acc;
    }, {});

    // Skip if no headshots to fetch
    if (Object.keys(headshotPaths).length === 0) {
      console.log("No profile headshots to fetch");
      return {};
    }

    try {
      // Prepare the payload for the API
      const filenames = Object.values(headshotPaths).filter((path): path is string => Boolean(path));
      
      console.log("Requesting signed URLs for headshot paths:", filenames);
      
      const response = await csrfRestCall(
        `/portal/talent-assets/get-signed-urls/`,
        "POST",
        {
          filenames: {
            profileHeadshots: filenames,
          },
        },
        accessToken,
        csrfToken
      );
      
      console.log("Profile Headshot Signed URLs response:", response);
      
      // Get the signed URLs from the response
      const signedUrlsResponse = response?.signed_urls || {};
      console.log("Signed URLs Response:", signedUrlsResponse);
      
      // Check if we have the expected array structure
      if (!signedUrlsResponse.profileHeadshots || !Array.isArray(signedUrlsResponse.profileHeadshots)) {
        console.error("Unexpected signed URLs response format", signedUrlsResponse);
        return {};
      }
      
      // Map the profile IDs to their respective signed URLs using array index
      const profileUrlMap: Record<string, string> = {};
      console.log("Profile URL Map initialized:", profileUrlMap);
      
      // Convert headshotPaths to array for indexing
      const profileIds = Object.keys(headshotPaths);
      
      // Map each profile ID to the corresponding URL by index
      profileIds.forEach((profileId, index) => {
        if (index < signedUrlsResponse.profileHeadshots.length) {
          profileUrlMap[profileId] = signedUrlsResponse.profileHeadshots[index];
        }
      });
      
      console.log("Mapped profile IDs to signed URLs:", profileUrlMap);
      return profileUrlMap;
    } catch (error) {
      console.error("Error fetching profile signed URLs:", error);
      return {};
    }
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
          additionalImages: talentProfile.additional_images || [],
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
        talentProfiles,
        signedUrls,
        profileSignedUrls,
        fetchTalentProfile,
        fetchTalentProfiles,
        updateTalentProfile,
        deleteFiles,
        fetchProfileSignedUrls, 
        fetchRoleApplicants,
        updateApplicantStatus,
        roleApplicants
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