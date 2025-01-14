"use client";

import React, { useState } from 'react';
import { Box, Avatar, IconButton, Snackbar, Alert, Button, Card, CardContent, Typography } from '@mui/material';
import { AddAPhoto, AddCircle, Close } from '@mui/icons-material';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store';
import { TalentProfileData } from '@/types/TalentProfileData';
import { useStore } from 'zustand';
import { useCookies } from 'react-cookie';
import { Worker, Viewer } from '@react-pdf/renderer';
import ReactPlayer from 'react-player';

const PortfolioMedia = ({ activeStep }) => {
  const { talentData, setTalentData } = useStore(useTalentOnboardingStore);
  const [images, setImages] = useState<string[]>([]);
  const [pdf, setPdf] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [cookies, setCookie] = useCookies(['portfolioBlobUrl', 'portfolioVideo', 'portfolioImages', 'portfolioPdf']);
  
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
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
  };

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setPdf(objectUrl);
      setCookie('portfolioPdf', objectUrl);
      setSnackbarMessage('PDF Uploaded Successfully');
      setSnackbarSeverity('success');
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
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
  };

  const handleRemovePdf = () => {
    setPdf(null);
    setCookie('portfolioPdf', null);
  };

  const handleRemoveVideo = () => {
    setVideo(null);
    setCookie('portfolioVideo', null);
  };

  const handleSave = async () => {
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
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" width="100%">
          {/* Images Column */}
          <Box flex="1" display="flex" flexDirection="column" alignItems="center">
            <Box display="flex" flexWrap="wrap" justifyContent="center">
              {images.map((img, index) => (
                <Card key={index} sx={{ width: 150, height: 150, margin: 1 }}>
                  <CardContent>
                    <Avatar src={img} sx={{ width: 100, height: 100 }} />
                  </CardContent>
                </Card>
              ))}
              {images.length < 5 && (
                <IconButton color="primary" component="label">
                  <AddCircle />
                  <input type="file" hidden accept="image/*" multiple onChange={handleImageUpload} />
                </IconButton>
              )}
            </Box>
          </Box>

          {/* PDF Column */}
          <Box flex="1" display="flex" flexDirection="column" alignItems="center">
            {pdf ? (
              <Box>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js">
                  <Viewer fileUrl={pdf} />
                </Worker>
                <Typography variant="subtitle1">{cookies['portfolioPdf']?.split('/').pop()}</Typography>
                <IconButton color="error" onClick={handleRemovePdf}>
                  <Close />
                </IconButton>
              </Box>
            ) : (
              <IconButton color="primary" component="label" sx={{ marginTop: 2 }}>
                <AddAPhoto />
                <input type="file" hidden accept="application/pdf" onChange={handlePdfUpload} />
              </IconButton>
            )}
          </Box>

          {/* Video Column */}
          <Box flex="1" display="flex" flexDirection="column" alignItems="center">
            {video ? (
              <Box>
                <ReactPlayer url={video} controls width="100%" height="auto" />
                <Typography variant="subtitle1">{cookies['portfolioVideo']?.split('/').pop()}</Typography>
                <IconButton color="error" onClick={handleRemoveVideo}>
                  <Close />
                </IconButton>
              </Box>
            ) : (
              <IconButton color="primary" component="label" sx={{ marginTop: 2 }}>
                <AddAPhoto />
                <input type="file" hidden accept="video/mp4" onChange={handleVideoUpload} />
              </IconButton>
            )}
          </Box>
        </Box>
      )}

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
    </>
  );
};

export default PortfolioMedia;