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
import { restCall } from '@/services/restCall';
import axios from 'axios';

const TalentOnboarding: React.FC = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const { createTalentProfile } = useOnboarding();
  const [cookies] = useCookies([
    'headshotBlobUrl',
    'username',
    'access',
    'governmentIDUrl',
    'portfolioBlobUrl'
  ]);

  const accessToken = cookies?.access;

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

  const handleSubmit = () => {
    uploadHeadshot();
    createTalentProfile();
  }

  const saveFileMetadata = async (fileName: string, s3Url: string) => {
    try {
      const response = await restCall('/portal/save-file-metadata/', 'POST', {
        file_name: fileName,
        s3_url: s3Url,
      }, accessToken);

      if (response.status === 201) {
        console.log('File metadata saved:', response.data);
      } else {
        console.error('Failed to save file metadata:', response);
      }
    } catch (error) {
      console.error('Error saving file metadata:', error);
    }
  };

  const uploadToS3 = async (blob: any, fileName: string) => {

    const fileType = blob.type;
    try {
      console.log("Blob s3:", blob);
      console.log("Filename:", fileName);
      console.log("File Type:", fileType);
      const response = await restCall(`/portal/generate-presigned-url/?file_name=${fileName}&file_type=${fileType}`, 'GET', {}, accessToken);

      const { url } = response;

      if (url) {
        const uploadResponse = await axios.put(url, blob, {
          headers: {
            'Content-Type': fileType,
          },
        });

        if (uploadResponse.status === 200) {
          console.log('Upload successful!');
          const s3Url = url.split('?')[0];
          await saveFileMetadata(fileName, s3Url);
        } else {
          console.error('Upload failed:', uploadResponse.statusText);
        }
      } else {
        console.error('Failed to get presigned URL');
      }
    } catch (error) {
      console.error('Error during upload:', error);
    }
  };
  const uploadPortfolio = async () => {
    const portfolioBlobUrl = cookies.portfolioBlobUrl;

    if (portfolioBlobUrl) {
      try {
        const response = await fetch(portfolioBlobUrl);
        const blob = await response.blob();

        const fileName = `portfolio_${cookies['username']}_${Date.now()}.pdf`; 

        console.log("Blob:", blob);
        console.log("Filename:", fileName);

        await uploadToS3(blob, fileName);
      } catch (error) {
        console.error('Error uploading portfolio:', error);
      }
    } else {
      console.error('No portfolio blob URL found in cookies.');
    }
  };

  const uploadID = async () => {
    const idBlobUrl = cookies.governmentIDUrl;

    if (idBlobUrl) {
      try {
        const response = await fetch(idBlobUrl);
        const blob = await response.blob();

        const fileName = `id_${cookies['username']}_${Date.now()}.png`; 

        console.log("Blob:", blob);
        console.log("Filename:", fileName);

        await uploadToS3(blob, fileName);
      } catch (error) {
        console.error('Error uploading ID:', error);
      }
    } else {
      console.error('No ID blob URL found in cookies.');
    }
  };

  const uploadHeadshot = async () => {
    const headshotBlobUrl = cookies.headshotBlobUrl;

    if (headshotBlobUrl) {
      try {
        const response = await fetch(headshotBlobUrl);
        const blob = await response.blob();

        const fileName = `headshot_${cookies['username']}_${Date.now()}.png`;

        console.log("Blob:", blob);
        console.log("Filename:", fileName);

        await uploadToS3(blob, fileName);
      } catch (error) {
        console.error('Error uploading headshot:', error);
      }
    } else {
      console.error('No headshot blob URL found in cookies.');
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