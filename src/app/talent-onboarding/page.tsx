"use client";

import React, { useState, useEffect, act } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { Box, Typography, Grid, TextField, Button, Avatar, IconButton } from '@mui/material';
import { AddAPhoto } from '@mui/icons-material';
import { TalentProfileData } from '@/types/TalentProfileData';
import PersonalInformation from '@/components/portal/onboarding/PersonalInfo';
import { PhysicalAttributes } from '@/components/portal/onboarding/PhysicalAttr';
import { IDandCreds } from '@/components/portal/onboarding/IDandCreds';
import { ProfileReview } from '@/components/portal/onboarding/ProfileReview';
import { SocialMediaLinks } from '@/components/portal/onboarding/SocialMediaLinks';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store';
import { useStore } from 'zustand';
import HeadshotUploader from '@/components/portal/onboarding/HeadshotUploader';
import SkillsSelection from '@/components/portal/onboarding/SkillsSelection';
import { useOnboarding } from '@/providers/onboarding-providers';
import { restCall } from '@/services/restCall';
import axios from 'axios';
import PortfolioMedia from '@/components/portal/onboarding/PortfolioMedia';
import { PaymentSection } from '@/components/portal/onboarding/PaymentSection';
import { PortfolioBuilder } from '@/components/portal/onboarding/PortfolioBuilder';

const TalentOnboarding: React.FC = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const { createTalentProfile } = useOnboarding();
  const [cookies] = useCookies([
    'headshotBlobUrl',
    'username',
    'access',
    'governmentIDUrl',
    'portfolioVideo',
    'portfolioImages',
    'portfolioPdf'
  ]);

  const accessToken = cookies?.access;

  const steps = [
    { title: 'Step 1: Headshot', content: 'Upload a headshot photo.' },
    { title: 'Step 2: Skills', content: 'Select your skills from the list below.' },
    { title: 'Step 3: Physical Attributes', content: 'Provide your physical attributes.' },
    { title: 'Step 4: Identification and Credentials', content: 'Upload your government ID and banking details.' },
    { title: 'Step 5: Social Media & Online', content: '' },
    { title: 'Step 6: Portfolio & Media', content: 'Upload PDF Portfolio, Images and Video' },
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
    uploadPortfolioPDF();
    uploadPortfolioImages();
    uploadPortfolioVideo();
    uploadHeadshot();
    uploadID();
    createTalentProfile();
  }

  const fileTypeMapping = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'application/pdf': 'pdf',
    'image/gif': 'gif',
    'video/mp4': 'mp4',
  };

  const getFileExtension = (blob) => {
    return fileTypeMapping[blob.type] || 'bin';
  };

  const saveFileMetadata = async (fileName, s3Url) => {
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

  const uploadToS3 = async (blob, fileName) => {
    const fileType = blob.type;
    try {
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

  const uploadFiles = async (blobUrls, filePrefix) => {
    if (!blobUrls || blobUrls.length === 0) {
      console.error(`No ${filePrefix} blob URLs found.`);
      return;
    }

    try {
      for (const blobUrl of blobUrls) {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        const fileExtension = getFileExtension(blob);
        const fileName = `${filePrefix}_${cookies['username']}_${Date.now()}.${fileExtension}`;

        console.log("Blob:", blob);
        console.log("Filename:", fileName);

        await uploadToS3(blob, fileName);
      }
    } catch (error) {
      console.error(`Error uploading ${filePrefix}:`, error);
    }
  };

  const uploadPortfolioVideo = () => uploadFiles([cookies.portfolioVideo], 'portfolioVideo');
  const uploadPortfolioImages = () => uploadFiles(Array.from(cookies.portfolioImages), 'portfolioImages');
  const uploadPortfolioPDF = () => uploadFiles([cookies.portfolioPdf], 'portfolioPDF');
  const uploadID = () => uploadFiles([cookies.governmentIDUrl], 'id');
  const uploadHeadshot = () => uploadFiles([cookies.headshotBlobUrl], 'headshot');

  return (
    <Box sx={{ width: '100vw', backgroundColor: 'black', border: 'none' }}>
      {activeStep === 0 && (
        <HeadshotUploader activeStep={activeStep} setActiveStep={setActiveStep} />
      )}

      {activeStep === 1 && (
        <SkillsSelection activeStep={activeStep} setActiveStep={setActiveStep} />
      )}

      {activeStep === 2 && (
        <PaymentSection activeStep={activeStep} setActiveStep={setActiveStep} />
      )}

      {activeStep === 3 && (
        <PhysicalAttributes activeStep={activeStep} setActiveStep={setActiveStep} />
      )}

      {activeStep === 4 && (
        <IDandCreds activeStep={activeStep} setActiveStep={setActiveStep} />
      )}

      {activeStep === 5 && (
        <SocialMediaLinks activeStep={activeStep} setActiveStep={setActiveStep} />
      )}

      {activeStep === 6 && (
        <PortfolioBuilder  activeStep={activeStep} setActiveStep={setActiveStep} />
      )}

      {activeStep === 7 && (
        <ProfileReview activeStep={activeStep} setActiveStep={setActiveStep} />
      )}
    </Box>
  );
};

export default TalentOnboarding;