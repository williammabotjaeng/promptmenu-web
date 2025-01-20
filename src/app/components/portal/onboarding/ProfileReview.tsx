"use client";

import * as React from 'react';
import { Box, Paper, Typography, Divider, Button } from '@mui/material';
import { StepItem } from '@/components/portal/onboarding/StepItem';
import { DocumentItem } from '@/components/portal/onboarding/DocumentItem';
import { SocialMediaLink } from '@/components/portal/onboarding/SocialMediaLink';
import { AttributeCard } from '@/components/portal/onboarding/AttributeCard';
import { SkillBadge } from '@/components/portal/onboarding/SkillBadge';
import OnboardingHeader from '@/components/portal/onboarding/OnboardingHeader';
import { useRouter } from 'next/navigation';
import { OnboardingStepProps } from '@/types/Props/OnboardingStepProps';

const steps = [
  { number: 1, title: 'Headshot', isActive: false },
  { number: 2, title: 'Skills', isActive: false },
  { number: 3, title: 'Payment', isActive: false },
  { number: 4, title: 'Attributes', isActive: false },
  { number: 5, title: 'Social', isActive: false },
  { number: 6, title: 'ID', isActive: false },
  { number: 7, title: 'Portfolio', isActive: false },
  { number: 8, title: 'Review', isActive: true }
];

const skills = ['Acting', 'Modeling', 'Dancing', 'Singing'];

const attributes = [
  { label: 'Height', value: '175 cm' },
  { label: 'Weight', value: '65 kg' },
  { label: 'Hair Color', value: 'Brown' },
  { label: 'Eye Color', value: 'Blue' }
];

const socialLinks = [
  { icon: 'instagram', username: '@talentname' },
  { icon: 'tiktok', username: '@talentname' }
];

const documents = [
  { title: 'Acting_Resume.pdf', date: 'Updated Jan 20, 2025' },
  { title: 'Portfolio_2025.pdf', date: 'Updated Jan 22, 2025' }
];

export const ProfileReview: React.FC<OnboardingStepProps> = ({ activeStep, setActiveStep }) => {
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
    <Paper elevation={3} sx={{ padding: 3, borderRadius: '8px', backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', color: '#CEAB76' }}>
      {/* Header Section */}
      <OnboardingHeader steps={steps} onClose={onClose} />

      <Divider sx={{ marginY: 2 }} />

      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Skills
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', marginBottom: 2 }}>
        {skills.map((skill) => (
          <SkillBadge key={skill} name={skill} />
        ))}
      </Box>

      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Attributes
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 2 }}>
        {attributes.map((attr) => (
          <AttributeCard key={attr.label} label={attr.label} value={attr.value} />
        ))}
      </Box>

      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Social Media Links
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', marginBottom: 2 }}>
        {socialLinks.map((link) => (
          <SocialMediaLink key={link.username} icon={link.icon} username={link.username} />
        ))}
      </Box>

      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Documents
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
        {documents.map((doc) => (
          <DocumentItem key={doc.title} title={doc.title} date={doc.date} />
        ))}
      </Box>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
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
          SubmitProfile
        </Button>
      </Box>
    </Paper>
  );
};