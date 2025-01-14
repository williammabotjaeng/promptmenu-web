"use client";

import React, { useState } from 'react';
import { Box, Avatar, IconButton, Snackbar, Alert, Button } from '@mui/material';
import { AddAPhoto, AddCircle } from '@mui/icons-material';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store';
import { TalentProfileData } from '@/types/TalentProfileData';
import { useStore } from 'zustand';
import { useCookies } from 'react-cookie';

const PortfolioMedia = ({ activeStep }) => {
  const { talentData, setTalentData } = useStore(useTalentOnboardingStore);
  const [images, setImages] = useState<string[]>([]);
  const [pdf, setPdf] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [cookies, setCookie] = useCookies(['portfolioBlobUrl', 'portfolioVideo', 'portfolioImages']);
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const newImages = files.map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
      setCookie('portfolioImages', [...images, ...newImages]);
      setSnackbarMessage('Images Uploaded Successfully');
      setSnackbarOpen(true);
    }
  };

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setPdf(objectUrl);
      setCookie('portfolioBlobUrl', objectUrl);
      setSnackbarMessage('PDF Uploaded Successfully');
      setSnackbarOpen(true);
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setVideo(objectUrl);
      setCookie('portfolioVideo', objectUrl);
      setSnackbarMessage('Video Uploaded Successfully');
      setSnackbarOpen(true);
    }
  };

  const handleSave = () => {
    setTalentData((prev: TalentProfileData) => ({
      ...prev,
      portfolioImages: images,
      portfolioPdf: pdf,
      portfolioVideo: video,
    }));
    setSnackbarMessage('Portfolio Saved Successfully');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      {activeStep === 6 && (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box display="flex" flexDirection="column" alignItems="center">
            {images.map((img, index) => (
              <Avatar key={index} src={img} sx={{ width: 100, height: 100, margin: 1 }} />
            ))}
            {images.length < 5 && (
              <IconButton color="primary" component="label">
                <AddCircle />
                <input type="file" hidden accept="image/*" multiple onChange={handleImageUpload} />
              </IconButton>
            )}
          </Box>
          <IconButton color="primary" component="label" sx={{ marginTop: 2 }}>
            <AddAPhoto />
            <input type="file" hidden accept="application/pdf" onChange={handlePdfUpload} />
          </IconButton>
          <IconButton color="primary" component="label" sx={{ marginTop: 2 }}>
            <AddAPhoto />
            <input type="file" hidden accept="video/mp4" onChange={handleVideoUpload} />
          </IconButton>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{ marginTop: 2, backgroundColor: '#000', color: '#977342', '&:hover': {
                backgroundColor: '#CEAB76', 
                color: '#000', 
              }, 
            }}
          >
            Save Portfolio
          </Button>

          {/* Snackbar for notifications */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%', color: '#977342', backgroundColor: 'black' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      )}
    </>
  );
};

export default PortfolioMedia;