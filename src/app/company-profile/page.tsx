"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { RegisterForm } from '@/components/RegisterForm';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAuth } from '@/providers/auth-providers';
import '@/styles/globals.css';
import { CompanyRegisterForm } from '@/components/CompanyRegisterForm';
import { useCookies } from 'react-cookie';

const CompanyProfile: React.FC = () => {
  const { register } = useAuth();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const { updateUser } = useAuth();

  const [cookies, setCookie] = useCookies(['onboarding_presented']);

  const onboardingPresented = cookies['onboarding_presented'];

  const userRole = 'client';

  const handleOnboardingStatus = () => {
    updateUser(
      {
        field: 'onboarding_presented',
        value: true
      }
    )
    setCookie('onboarding_presented', true);
  };

  useEffect(() => {
    const textElement = document.querySelector('.slide-in-text');
    if (textElement) {
      textElement.classList.add('animate');
    }

    if (!onboardingPresented) handleOnboardingStatus();

  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <CompanyRegisterForm />
    </>
  );
};

export default CompanyProfile;