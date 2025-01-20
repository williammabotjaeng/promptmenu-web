"use client";

import * as React from 'react';
import { Box, Typography, Button, Paper, AppBar, Toolbar, Container } from '@mui/material';
import { StepItem } from '@/components/portal/onboarding/StepItem';
import { UploadSection } from '@/components/portal/onboarding/UploadSection';
import OnboardingHeader from '@/components/portal/onboarding/OnboardingHeader';
import { useRouter } from 'next/navigation';

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

export const IDandCreds: React.FC<{ activeStep: number; setActiveStep: (step: number) => void; }> = ({ activeStep, setActiveStep }) => {
  const router = useRouter();

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

      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/04941e81747f3ecb6811e1684b15614793214440d6dff851abf37ed98ca1961c?apiKey=7fae980a988640eea8add1e49a5d542e&"
          alt="Decorative"
          style={{ width: '121px', marginTop: '-11px' }}
        />
      </Box>

      <nav>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: '20px' }}>
          {steps.map((step) => (
            <StepItem
              key={step.number}
              number={step.number}
              title={step.title}
              isActive={step.isActive}
            />
          ))}
        </Box>
      </nav>

      <Paper elevation={3} sx={{ padding: 4, marginTop: 4, backgroundColor: 'rgba(245, 245, 245, 0.1)' }}>
        <Typography variant="h5" sx={{ color: 'orange', marginBottom: 2 }}>
          ID Document
        </Typography>
        <Box sx={{ display: 'flex', gap: 5, flexDirection: { xs: 'column', md: 'row' } }}>
          <UploadSection title="Front Side" />
          <UploadSection title="Back Side" />
        </Box>
      </Paper>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingX: 4, marginTop: 4 }}>
        <Button 
          sx={{ color: '#977342', border: '2px solid #977342', '&:hover': { color: '#fff' } }} 
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