"use client";

import React, { createContext, useContext } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { restCall } from '@/services/restCall';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { CompanyData } from '@/types/CompanyData';
import { useStore } from 'zustand';
import useClientOnboardingStore from '@/state/use-client-onboarding-store';

interface CompanyContextType {
  company: CompanyData | null;
  fetchCompany: () => Promise<void>;
  updateCompany: (companyId: string, data: CompanyData) => Promise<void>;
}

const CompanyContext = createContext<CompanyContextType | null>(null);

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['access', 'username', 'company_id']);
  const accessToken = cookies['access'];
  const userName = cookies['username'];

  const {
    setCompanyInfo,
    companyInfo,
  } = useStore(useClientOnboardingStore);

  const fetchCompanyMutation = useQuery({
    queryKey: ['fetch_company'],
    queryFn: async () => {
      const response = await restCall(`/dashboard/company/retrieve/?username=${userName}`, 'GET', {}, accessToken);
      console.log("Company Response", response);
      setCookie('company_id', response?.id);
      setCompanyInfo(response);
      return response;
    },
    enabled: false, 
  });

  const updateCompanyMutation = useMutation({
    mutationKey: ['update_company'],
    mutationFn: async ({ companyId, data }: { companyId: string; data: CompanyData }) => {
      return await restCall(`/dashboard/company/update/${companyId}/`, 'PUT', data, accessToken);
    },
    onSuccess: (data) => {
      console.log('Company updated successfully', data);
    },
    onError: (error) => {
      console.error('Error updating company: ', error);
    },
  });

  const fetchCompany = async () => {
    await fetchCompanyMutation.refetch();
  };

  const updateCompany = async (companyId: string, data: CompanyData) => {
    await updateCompanyMutation.mutateAsync({ companyId, data });
  };

  return (
    <CompanyContext.Provider value={{ company: fetchCompanyMutation.data, fetchCompany, updateCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};