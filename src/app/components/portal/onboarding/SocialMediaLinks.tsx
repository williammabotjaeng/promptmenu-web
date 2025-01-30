"use client";

import * as React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { SocialInput } from './SocialInput';
import OnboardingHeader from '@/components/portal/onboarding/OnboardingHeader';
import { useRouter } from 'next/navigation';
import { OnboardingStepProps } from '@/types/Props/OnboardingStepProps';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

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
  const [cookies, setCookie] = useCookies(['website', 'twitter', 'tiktok', 'facebook', 'instagram', 'linkedin']);
  const [socialData, setSocialData] = React.useState({
    instagram: '',
    tiktok: '',
    website: '',
  });

  const onClose = () => {
    router.push('/portal');
  };

  const handleContinue = () => {
    setActiveStep(activeStep + 1);
    setCookie('website', socialData.website);
    setCookie('tiktok', socialData.tiktok);
    setCookie('instagram', socialData.instagram);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSocialInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSocialData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    setSocialData({
      website: cookies.website || '',
      tiktok: cookies.tiktok || '',
      // twitter: cookies.twitter || '',
      // facebook: cookies.facebook || '',
      instagram: cookies.instagram || '',
     // linkedin: cookies.linkedin || '',
    });
  }, [cookies]);

  return (
    <Box sx={{ display: 'flex', overflow: 'hidden', flexDirection: 'column', backgroundColor: 'black', paddingX: { xs: 2, md: 4 } }}>
      {/* Header Section */}
      <OnboardingHeader steps={steps} onClose={onClose} />

      {/* Social Media Links Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Paper sx={{ display: 'flex', flexDirection: 'column', padding: 4, borderRadius: '8px', backgroundColor: 'rgba(75, 85, 99, 0.1)', width: { xs: '90%', md: '50%' }, marginTop: 4 }}>
          <Typography variant="h5" sx={{ pt: 0.25, pb: 3, color: '#977342', textAlign: 'center' }}>
            Social Media
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 4 }}>
            {socialInputs.map((input, index) => (
              <SocialInput
                key={index}
                {...input}
                value={socialData[input.icon as keyof typeof socialData]}
                onChange={handleSocialInputChange(input.icon)}
              />
            ))}
          </Box>
        </Paper>
      </Box>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', paddingX: 2, marginTop: 4, marginLeft: { md: 40 }, width: { xs: '100%', md: '52%' }, alignItems: 'center' }}>
        <Button
          sx={{ color: '#977342', border: '2px solid #977342', '&:hover': { color: '#fff' }, marginBottom: { xs: 1, md: 0 }, width: { xs: '100%', md: '20%' } }}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          sx={{ color: '#000', backgroundColor: '#CEAB76', width: { xs: '100%', md: '20%' } }}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </Box>

      <Typography variant="caption" sx={{ paddingX: 2, color: 'gray', textAlign: 'center', marginTop: 2 }}>
        Step {activeStep + 1} of 8 - Socials
      </Typography>
    </Box>
  );
};