"use client";

import React from 'react';
import { Box } from '@mui/material';
import heroBanner from '@/assets/hero-banner.png'; 

const Hero: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '90vh',
        overflow: 'hidden',
        fontFamily: 'Open Sans',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${heroBanner.src})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Black overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          zIndex: 1,
        }}
      />
      {/* Content can be added here if needed */}
    </Box>
  );
};

export default Hero;