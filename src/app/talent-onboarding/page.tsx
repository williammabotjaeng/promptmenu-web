"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { Box, Typography, Grid, TextField, Button, Avatar, IconButton } from '@mui/material';
import { AddAPhoto } from '@mui/icons-material';
import { TalentProfileData } from '@/types/TalentProfileData';
import PersonalInformation from '@/components/portal/onboarding/PersonalInfo';

const TalentOnboarding: React.FC = () => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['talentData']);
  const [activeStep, setActiveStep] = useState(0);
  const [talentData, setTalentData] = useState<TalentProfileData>({
    user: '',
    headshot: null,
    date_of_birth: null,
    gender: null,
    phone_number: null,
    nationality: null,
    skills: [],
    height: null,
    weight: null,
    ethnicity: null,
    government_id: null,
    banking_details: null,
    portfolio_pdf: null,
    additional_images: null,
    is_verified: false,
    verification_notification_sent: false,
    created_at: '',
    updated_at: '',
  });

  const [personalInfo, setPersonalInfo] = useState({
    user: 'Jane Doe',
    date_of_birth: '1990-01-01',
    gender: 'Female',
    phone_number: '+1 (555) 123-4567',
  });

  const steps = [
    { title: 'Step 1: Personal Information', content: 'Please provide your personal details.' },
    { title: 'Step 2: Headshot', content: 'Upload a headshot photo.' },
    { title: 'Step 3: Physical Attributes', content: 'Provide your physical attributes.' },
    { title: 'Step 4: Identification and Credentials', content: 'Upload your government ID and banking details.' },
    { title: 'Step 5: Portfolio', content: 'Upload your portfolio PDF and additional images.' },
    { title: 'Step 6: Review', content: 'Review your information.' },
    { title: 'Step 7: Submit', content: 'Submit your information.' },
  ];

  useEffect(() => {
    const loadTalentData = async () => {
      const response = await fetch('/api/talent');
      const data = await response.json();
      if (data) {
        setTalentData(data);
      }
    };

    loadTalentData();
  }, []);

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
    setCookie('talentData', JSON.stringify(talentData), { path: '/' });
    router.push('/dashboard');
  };

  const handleSubmit = async () => {
    const method = talentData.user ? 'PUT' : 'POST';
    const endpoint = talentData.user ? `/dashboard/talent/${talentData.user}` : '/dashboard/talent';

    await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(talentData),
    });

    router.push('/dashboard');
  };

  const handleHeadshotUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setTalentData((prev) => ({ ...prev, headshot: event.target.files[0] }));
    }
  };

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
          <PersonalInformation activeStep={activeStep} personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} />
        )}

        {activeStep === 1 && (
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar
              src={talentData.headshot ? URL.createObjectURL(talentData.headshot) : ''}
              sx={{ width: 200, height: 200 }}
            />
            <IconButton color="primary" component="label">
              <AddAPhoto />
              <input type="file" hidden onChange={handleHeadshotUpload} />
            </IconButton>
          </Box>
        )}

        {/* Additional steps can be added here */}

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
            <Button onClick={handleSubmit} style={{ backgroundColor: '#977342', color: '#fff', borderRadius: '12px' }}>
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