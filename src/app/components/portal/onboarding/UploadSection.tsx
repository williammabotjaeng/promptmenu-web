"use client";

import * as React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard as solidIdCard } from '@fortawesome/free-solid-svg-icons';
import { faIdCard as regularIdCard } from '@fortawesome/free-regular-svg-icons';
import { UploadSectionProps } from '@/types/Props/UploadSectionsProps';
import { useStore } from 'zustand';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store';
import { useCookies } from 'react-cookie';
import { useState } from 'react';

export const UploadSection: React.FC<UploadSectionProps> = ({ title, onFileSelect }) => {

  const { talentData, setTalentData } = useStore(useTalentOnboardingStore);

  const [cookies, setCookie, removeCookie] = useCookies(['id_front_blob', 'id_back_blob']);
  const [idData, setIDData] = useState({
    front: '',
    back: ''
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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
      setTalentData({
        headshot: objectUrl,
        website: '',
        social_media_links: undefined,
        user: ''
      });
      // setCookie('headshotBlobUrl', objectUrl);
      setSnackbarMessage('Headshot Uploaded Successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      onFileSelect(file);
    }
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
        <Button
          variant="contained"
          component="label" // Use `component="label"` to associate the button with the file input
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
      </Box>
    </Paper>
  );
};