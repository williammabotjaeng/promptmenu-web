"use client";

import * as React from 'react';
import { Box, Typography, Button, Paper, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard as solidIdCard } from '@fortawesome/free-solid-svg-icons';
import { faIdCard as regularIdCard } from '@fortawesome/free-regular-svg-icons';
import DeleteIcon from '@mui/icons-material/Delete';
import { UploadSectionProps } from '@/types/Props/UploadSectionsProps';
import { useStore } from 'zustand';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store';
import { useState } from 'react';

export const UploadSection: React.FC<UploadSectionProps> = ({ title }) => {
  const { talentData, setTalentData } = useStore(useTalentOnboardingStore);

  const [idData, setIDData] = useState({
    front: talentData?.government_id_front || '',
    back: talentData?.government_id_back || ''
  });

  const renderIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'front side':
        return <FontAwesomeIcon icon={solidIdCard} style={{ fontSize: '40px', color: '#977342' }} />;
      case 'back side':
        return <FontAwesomeIcon icon={regularIdCard} style={{ fontSize: '40px', color: '#977342' }} />;
      default:
        return null;
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      const side = title.toLowerCase().includes('front') ? 'front' : 'back';

      // Update the idData state with the uploaded file's blob URL
      setIDData((prev) => ({
        ...prev,
        [side]: objectUrl
      }));

      // Update the talentData state with the uploaded file's blob URL
      setTalentData({
        ...talentData,
        [`government_id_${side}`]: objectUrl
      });
    }
  };

  const handleDelete = () => {
    const side = title.toLowerCase().includes('front') ? 'front' : 'back';

    // Remove the image from idData state
    setIDData((prev) => ({
      ...prev,
      [side]: ''
    }));

    // Remove the image from talentData state
    setTalentData({
      ...talentData,
      [`government_id_${side}`]: ''
    });
  };

  const renderUploadContent = () => {
    const side = title.toLowerCase().includes('front') ? 'front' : 'back';
    const uploadedImage = idData[side];

    if (uploadedImage) {
      // Display the uploaded image with a delete button
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 2
          }}
        >
          <Box
            sx={{
              width: '100px',
              height: '100px',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '2px solid #CEAB76',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 1
            }}
          >
            <img
              src={uploadedImage}
              alt={`${title} Preview`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
          <IconButton
            onClick={handleDelete}
            sx={{
              color: 'red',
              '&:hover': { color: 'darkred' }
            }}
            aria-label={`Delete ${title}`}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      );
    }

    // Display the upload button if no image is uploaded
    return (
      <Button
        variant="contained"
        component="label"
        sx={{ mt: 2, bgcolor: '#977342', color: 'white', '&:hover': { bgcolor: '#977342' } }}
        aria-label={`Upload ${title}`}
      >
        Upload
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: 4,
        py: 3,
        width: '100%',
        border: '2px dotted',
        borderColor: '#CEAB76',
        bgcolor: 'transparent',
        borderRadius: '8px',
        maxWidth: '400px',
        mx: 'auto',
        mt: 2
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '40px', minHeight: '36px' }}>
          {renderIcon(title)}
        </Box>
        <Typography variant="body1" sx={{ textAlign: 'center', color: '#977342', mt: 1 }}>
          {title}
        </Typography>
        {renderUploadContent()}
      </Box>
    </Paper>
  );
};