"use client";

import React, { useState, useEffect, act } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { Box, Typography, Grid, TextField, Button, Avatar, IconButton } from '@mui/material';
import { AddAPhoto } from '@mui/icons-material';
import { TalentProfileData } from '@/types/TalentProfileData';
import PersonalInformation from '@/components/portal/onboarding/PersonalInfo';
import PhysicalAttributes from '@/components/portal/onboarding/PhysicalAttr';
import IDandCreds from '@/components/portal/onboarding/IDandCreds';
import ProfileReview from '@/components/portal/onboarding/ProfileReview';
import SocialMediaLinks from '@/components/portal/onboarding/SocialMediaLinks';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store';
import { useStore } from 'zustand';
import HeadshotUploader from '@/components/portal/onboarding/HeadshotUploader';
import SkillsSelection from '@/components/portal/onboarding/SkillsSelection';
import { useOnboarding } from '@/providers/onboarding-providers';

const TalentOnboarding: React.FC = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const { createTalentProfile } = useOnboarding();

  const steps = [
    { title: 'Step 1: Personal Information', content: 'Please provide your personal details.' },
    { title: 'Step 2: Headshot', content: 'Upload a headshot photo.' },
    { title: 'Step 3: Skills', content: 'Select your skills from the list below.' },
    { title: 'Step 4: Physical Attributes', content: 'Provide your physical attributes.' },
    { title: 'Step 5: Identification and Credentials', content: 'Upload your government ID and banking details.' },
    { title: 'Step 6: Social Media & Online', content: '' },
    { title: 'Step 7: Review', content: 'Review your information.' },
    { title: 'Step 8: Submit', content: 'Submit your information.' },
  ];


  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleSkip = () => {
    router.push('/dashboard');
  };

  // const handleSubmit = async () => {
  //   createTalentProfile();
  //   router.push('/portal');
  // };



  return (
    <Box className="onboarding-container" sx={{ width: '100vw' }}>
      <div className="onboarding-content">
        <Typography variant="h2" style={{ color: 'black' }}>
          {steps[activeStep].title}
        </Typography>
        <Typography variant="body1" style={{ color: 'black' }}>
          {steps[activeStep].content}
        </Typography>

        {activeStep === 0 && (
          <PersonalInformation activeStep={activeStep} />
        )}

        {activeStep === 1 && (
          <HeadshotUploader activeStep={activeStep} />
        )}

        {activeStep === 2 && (
          <SkillsSelection activeStep={activeStep} />
        )}

        {activeStep === 3 && (
          <PhysicalAttributes activeStep={activeStep} />
        )}

        {activeStep === 4 && (
          <IDandCreds activeStep={activeStep} />
        )}

        {activeStep === 5 && (
          <SocialMediaLinks activeStep={activeStep} />
        )}

        {activeStep === 6 && (
          <ProfileReview />
        )}

        <div>
          <br /><br />
          {activeStep > 0 && (
            <Button onClick={handleBack} style={{ marginRight: '10px', backgroundColor: '#000', color: '#977342', borderRadius: '12px' }}>
              Back
            </Button>
          )}
          {activeStep < steps.length - 1 && (
            <Button onClick={handleNext} style={{ backgroundColor: '#977342', color: '#fff', borderRadius: '12px' }}>
              Next
            </Button>
          )}
          {activeStep === steps.length - 1 && (
            <Button onClick={() => createTalentProfile()} style={{ backgroundColor: '#977342', color: '#fff', borderRadius: '12px' }}>
              Submit
            </Button>
          )}
          <Button onClick={handleSkip} style={{ marginLeft: '10px', backgroundColor: '#000', color: '#977342', borderRadius: '12px' }}>
            Skip this for now
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default TalentOnboarding;