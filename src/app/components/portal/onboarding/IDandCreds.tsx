"use client";

import * as React from 'react';
import { Box, Typography, Button, Paper, Container } from '@mui/material';
import { UploadSection } from '@/components/portal/onboarding/UploadSection';
import OnboardingHeader from '@/components/portal/onboarding/OnboardingHeader';
import { useRouter } from 'next/navigation';
import { OnboardingStepProps } from '@/types/Props/OnboardingStepProps';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store';
import { useStore } from 'zustand';

const steps = [
  { number: 1, title: 'Headshot', isActive: false },
  { number: 2, title: 'Skills', isActive: false },
  { number: 3, title: 'Payment', isActive: false },
  { number: 4, title: 'Attributes', isActive: false },
  { number: 5, title: 'Social', isActive: false },
  { number: 6, title: 'ID', isActive: true },
  { number: 7, title: 'Portfolio', isActive: false },
  { number: 8, title: 'Review', isActive: false }
];

export const IDandCreds: React.FC<OnboardingStepProps> = ({ activeStep, setActiveStep }) => {
  const { talentData, setTalentData } = useStore(useTalentOnboardingStore);
  const router = useRouter();

  // Function to handle file selection and create a blob
  const handleFileSelect = (file: File, side: string) => {
    console.log('File selected:', file);
    console.log('Doc Side:', side);

    const fileBlob = URL.createObjectURL(file);

    
  };

  const onClose = () => {
    router.push('/portal');
  };

  const handleContinue = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Container maxWidth="lg" sx={{ backgroundColor: 'black', opacity: 0.9, paddingBottom: '24px' }}>
      {/* Header Section */}
      <OnboardingHeader steps={steps} onClose={onClose} />

      <Paper elevation={3} sx={{ padding: 4, marginTop: 4, backgroundColor: 'rgba(151, 115, 66, 0.1)' }}>
        <Typography variant="h5" sx={{ color: '#977342', marginBottom: 2, textAlign: 'center' }}>
          ID Document
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'center' }}>
          {/* Pass the side of the document to the UploadSection */}
          <UploadSection title="Front Side" />
          <UploadSection title="Back Side" />
        </Box>
      </Paper>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', paddingX: 2, marginTop: 4 }}>
        <Button 
          sx={{ color: '#977342', border: '2px solid #977342', '&:hover': { color: '#fff' }, marginBottom: { xs: 1, md: 0 } }} 
          onClick={handleBack}
        >
          Back
        </Button>
        <Button 
          sx={{ color: '#000', backgroundColor: '#CEAB76' }} 
          onClick={handleContinue}
        >
          Continue
        </Button>
      </Box>

      {/* Step Indicator Section */}
      <footer style={{ textAlign: 'center', marginTop: '28px', color: 'gray' }}>
        <Typography variant="body2">
          Step {activeStep + 1} of 8 - ID Document
        </Typography>
      </footer>
    </Container>
  );
};