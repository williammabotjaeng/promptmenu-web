"use client";

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
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
      
      {/* Text Content */}
      <Typography
        variant="h1"
        sx={{
          position: 'absolute',
          left: '5%', 
          color: 'transparent', 
          fontSize: '72px',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', opacity: 0.5 }}>
          <span style={{ color: '#977342' }}>Discover</span>&nbsp;
          <span style={{ color: '#fff' }}> Your </span>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', opacity: 0.5 }}>
          <span style={{ color: '#977342' }}>Next</span>&nbsp;
          <span style={{ color: '#fff' }}> Star</span>
        </Box>
        <Typography  component={"span"} color="white" sx={{ display: 'block', fontSize: '24', opacity: .6 }}>Staffing Your Success, One Event at a Time.</Typography>
        
        {/* Buttons */}
        <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#977342',
              color: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: '20px',
              marginRight: '10px',
              padding: '10px 20px',
              opacity: .6,
              '&:hover': {
                backgroundColor: '#8a5e2e', 
              },
            }}
          >
            Join as Talent
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'black',
              color: '#fff',
              border: '1px solid #977342',
              borderRadius: '20px',
              padding: '10px 20px',
              opacity: .6,
              '&:hover': {
                backgroundColor: '#333', 
              },
            }}
          >
            Hire Talent
          </Button>
        </Box>
      </Typography>
      
    </Box>
  );
};

export default Hero;