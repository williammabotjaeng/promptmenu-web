"use client";

import React, { createContext, useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { restCall } from "@/services/restCall";
import { csrfRestCall } from "@/services/csrfRestCall";

interface SettingsContextType {
  settings: any | null;
  createSettings: (data: any) => Promise<void>;
  updateSettings: (data: any) => Promise<void>;
  fetchSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cookies] = useCookies(['access', 'csrftoken']);
  const accessToken = cookies?.access;
  const csrfToken = cookies?.csrftoken;

  // Fetch settings
  const { data: settings, refetch: refetchSettings } = useQuery({
    queryKey: ["fetch_settings"],
    queryFn: async () => {
      if (!accessToken) throw new Error("Access token is missing");
      const response = await restCall("/portal/settings/", "GET", {}, accessToken);
      return response;
    },
    enabled: !!accessToken, // Only run the query if accessToken is available
  });

  // Create settings mutation
  const createSettingsMutation = useMutation({
    mutationKey: ["create_settings"],
    mutationFn: async (newSettings: any) => {
      const response = await restCall("/portal/settings/create/", "POST", newSettings, accessToken);
      return response;
    },
    onSuccess: () => {
      refetchSettings(); 
    },
  });

  // Update settings mutation
  const updateSettingsMutation = useMutation({
    mutationKey: ["update_settings"],
    mutationFn: async (updatedSettings: any) => {
      console.log("Update Settings:", updatedSettings);
      const response = await restCall("/portal/settings/update/", "PATCH", updatedSettings, accessToken);
      console.log("Update response:", response);
      return response;
    },
    onSuccess: (data) => {
      console.log("Update Successful:", data);
      refetchSettings();
    },
  });

  const createSettings = async (data: any) => {
    await createSettingsMutation.mutateAsync(data);
  };

  const updateSettings = async (data: any) => {
    await updateSettingsMutation.mutateAsync(data);
  };

  const fetchSettings = async () => {
    await refetchSettings();
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        createSettings,
        updateSettings,
        fetchSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};