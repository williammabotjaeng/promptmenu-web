"use client";

import * as React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { StepItem } from './StepItem';
import { SocialInput } from './SocialInput';
import OnboardingHeader from '@/components/portal/onboarding/OnboardingHeader';
import { useRouter } from 'next/navigation';

const steps = [
  { number: 1, title: 'Headshot', isActive: false },
  { number: 2, title: 'Skills', isActive: false },
  { number: 3, title: 'Payment', isActive: false },
  { number: 4, title: 'Attributes', isActive: false },
  { number: 5, title: 'Social', isActive: true },
  { number: 6, title: 'ID', isActive: false },
  { number: 7, title: 'Portfolio', isActive: false },
  { number: 8, title: 'Review', isActive: false }
];

const socialInputs = [
  { icon: 'instagram', placeholder: 'Instagram Username', alt: 'Instagram icon' },
  { icon: 'tiktok', placeholder: 'TikTok Username', alt: 'TikTok icon' },
  { icon: 'website', placeholder: 'Website URL', alt: 'Website icon' }
];

export const SocialMediaLinks: React.FC<{ activeStep: number; setActiveStep: (step: number) => void; }> = ({ activeStep, setActiveStep }) => {
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
    <Box sx={{ display: 'flex', overflow: 'hidden', flexDirection: 'column', backgroundColor: 'white', borderRadius: '8px', border: '2px solid gray' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: 'black', opacity: 0 }}>
        {/* Header Section */}
        <OnboardingHeader steps={steps} onClose={onClose} />

        {/* Social Media Links Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', paddingBottom: '24px' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'space-between', paddingX: 6, paddingTop: 6, paddingBottom: 1, color: 'orange' }}>
            <Typography variant="h5" sx={{ py: 1 }}>
              Staffing Solutions Hub
            </Typography>
            <MenuIcon sx={{ color: 'white', width: '18px', height: '18px' }} />
          </Box>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/04941e81747f3ecb6811e1684b15614793214440d6dff851abf37ed98ca1961c?apiKey=7fae980a988640eea8add1e49a5d542e&"
            alt="Logo"
            style={{ objectFit: 'contain', zIndex: 10, marginTop: '-44px', marginLeft: '128px', maxWidth: '100%', width: '121px' }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingX: 16, marginTop: '-24px', color: 'white' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'space-between', marginLeft: 5, maxWidth: '100%' }}>
              {steps.map((step) => (
                <StepItem
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  isActive={step.isActive}
                />
              ))}
            </Box>
          </Box>
          <Paper sx={{ display: 'flex', flexDirection: 'column', padding: 4, marginTop: 14, marginLeft: 6, borderRadius: '8px', backgroundColor: 'rgba(75, 85, 99, 0.1)', width: '768px' }}>
            <Typography variant="h5" sx={{ pt: 0.25, pb: 3, color: 'orange' }}>
              Social Media
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 6, width: '100%', gap: 4 }}>
              {socialInputs.map((input, index) => (
                <SocialInput key={index} {...input} />
              ))}
            </Box>
          </Paper>
          <Typography variant="caption" sx={{ paddingX: 16, paddingY: 7, marginTop: 24, color: 'gray', textAlign: 'center' }}>
            Step {activeStep + 1} of 8 - Socials
          </Typography>
        </Box>

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
      </Box>
    </Box>
  );
};