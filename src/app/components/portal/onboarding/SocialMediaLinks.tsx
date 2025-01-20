"use client";

import * as React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { StepItem } from './StepItem';
import { SocialInput } from './SocialInput';
import OnboardingHeader from '@/components/portal/onboarding/OnboardingHeader';
import { useRouter } from 'next/navigation';
import { OnboardingStepProps } from '@/types/Props/OnboardingStepProps';

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

export const SocialMediaLinks: React.FC<OnboardingStepProps> = ({ activeStep, setActiveStep }) => {
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
    <Box sx={{ display: 'flex', overflow: 'hidden', flexDirection: 'column', backgroundColor: 'black' }}>
      {/* Header Section */}
      <OnboardingHeader steps={steps} onClose={onClose} />

      {/* Social Media Links Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Paper sx={{ display: 'flex', flexDirection: 'column', padding: 4, marginLeft: 6, borderRadius: '8px', backgroundColor: 'rgba(75, 85, 99, 0.1)', width: '768px' }}>
          <Typography variant="h5" sx={{ pt: 0.25, pb: 3, color: '#977342' }}>
            Social Media
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 4 }}>
            {socialInputs.map((input, index) => (
              <SocialInput key={index} {...input} />
            ))}
          </Box>
        </Paper>
        <Typography variant="caption" sx={{ paddingX: 16, color: 'gray', textAlign: 'center' }}>
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
  );
};