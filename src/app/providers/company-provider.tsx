"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { restCall } from "@/services/restCall";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { CompanyData } from "@/types/CompanyData";
import { useStore } from "zustand";
import useClientOnboardingStore from "@/state/use-client-onboarding-store";
import { csrfRestCall } from "@/services/csrfRestCall";

interface CompanyContextType {
  company: CompanyData | null;
  signedUrls: Record<string, string> | null;
  fetchCompany: () => Promise<void>;
  updateCompany: (companyId: string, data: CompanyData) => Promise<void>;
}

const CompanyContext = createContext<CompanyContextType | null>(null);

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies([
    "access",
    "username",
    "company_id",
    "csrftoken",
  ]);
  const accessToken = cookies["access"];
  const userName = cookies["username"];
  const csrfToken = cookies["csrftoken"];

  const [signedUrls, setSignedUrls] = useState<Record<string, string> | null>(
    null
  );

  const { setCompanyInfo, companyInfo } = useStore(useClientOnboardingStore);

  const fetchCompanyMutation = useQuery({
    queryKey: ["fetch_company"],
    queryFn: async () => {
      const response = await restCall(
        `/dashboard/company/retrieve/?username=${userName}`,
        "GET",
        {},
        accessToken
      );
      console.log("Company Response", response);
      setCookie("company_id", response?.id);
      setCompanyInfo(response);
      return response;
    },
    enabled: false,
  });

  const updateCompanyMutation = useMutation({
    mutationKey: ["update_company"],
    mutationFn: async ({
      username,
      data,
    }: {
      username: string;
      data: CompanyData;
    }) => {
      console.log("ID and Data:", username, data);
      return await restCall(
        `/dashboard/company/update/${username}/`,
        "PUT",
        data,
        accessToken
      );
    },
    onSuccess: (data) => {
      console.log("Company updated successfully", data);
    },
    onError: (error) => {
      console.error("Error updating company: ", error);
    },
  });

  const fetchCompany = async () => {
    await fetchCompanyMutation.refetch();
  };

  const updateCompany = async (username: string, data: CompanyData) => {
    await updateCompanyMutation.mutateAsync({ username, data });
  };

  useEffect(() => {
    const fetchSignedUrls = async () => {
      if (fetchCompanyMutation.data) {
        const company = fetchCompanyMutation.data;

        const companyAssets = {
          logo: company.logo,
          vatCertificate: company.vat_certificate,
          tradeLicense: company.trade_license,
        };

        console.log("Company Assets:", companyAssets);

        try {
          const response = await csrfRestCall(
            `/dashboard/company-assets/get-signed-urls/`,
            "POST",
            {
              filenames: {
                logo: companyAssets.logo,
                tradeLicense: companyAssets.tradeLicense,
                vatCertificate: companyAssets.vatCertificate,
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
  }, [fetchCompanyMutation.data]);

  return (
    <CompanyContext.Provider
      value={{
        company: fetchCompanyMutation.data,
        signedUrls,
        fetchCompany,
        updateCompany,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
};
