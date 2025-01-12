import React, { useEffect } from 'react';
import { Box, Avatar, IconButton } from '@mui/material';
import { AddAPhoto } from '@mui/icons-material';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store';
import { TalentProfileData } from '@/types/TalentProfileData';
import { useStore } from 'zustand';

const HeadshotUploader = ({ activeStep }) => {
  const { talentData, setTalentData } = useStore(useTalentOnboardingStore);

  const handleHeadshotUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      
      setTalentData((prev: TalentProfileData) => ({ ...prev, headshot: objectUrl }));
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Avatar
        src={talentData.headshot || ''}
        sx={{ width: 200, height: 200 }}
      />
      <IconButton color="primary" component="label">
        <AddAPhoto />
        <input type="file" hidden onChange={handleHeadshotUpload} />
      </IconButton>
    </Box>
  );
};

export default HeadshotUploader;