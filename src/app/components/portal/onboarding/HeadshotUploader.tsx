"use client";

import React, { useState, useEffect } from 'react';
import { Box, Avatar, IconButton, Snackbar, Alert, Button } from '@mui/material';
import { AddAPhoto } from '@mui/icons-material';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store';
import { TalentProfileData } from '@/types/TalentProfileData';
import { useStore } from 'zustand';
import { useCookies } from 'react-cookie';

const HeadshotUploader = ({ activeStep }) => {
  const { talentData, setTalentData } = useStore(useTalentOnboardingStore);
  
  const [headshot, setHeadshot] = useState<string | null>(null);
  const [cookies, setCookie] = useCookies(['headshotBlobUrl']);
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    console.log("fired on load")
    console.log("Headshot Value", cookies['headshotBlobUrl']);
    if (cookies['headshotBlobUrl']) {
      setHeadshot(cookies['headshotBlobUrl']);
    }
  }, [cookies])

  const handleHeadshotUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setHeadshot(objectUrl);
      setCookie('headshotBlobUrl', objectUrl);
      setSnackbarMessage('Headshot Uploaded Successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
    {activeStep === 1 && (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Avatar
        src={headshot || ''}
        sx={{ width: 200, height: 200 }}
      />
      <IconButton color="primary" component="label">
        <AddAPhoto />
        <input type="file" hidden onChange={handleHeadshotUpload} />
      </IconButton>
      <Button
        variant="contained"
        onClick={() => console.log("upload")}
        sx={{ marginTop: 2, backgroundColor: '#000', color: '#977342', '&:hover': {
                  backgroundColor: '#CEAB76', 
                  color: '#000', 
                }, 
            }}
      >
        Save this step
      </Button>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} sx={{ width: '100%', color: '#977342', backgroundColor: 'black' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
    )}
    </>
  );
};

export default HeadshotUploader;