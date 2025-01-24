"use client";

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import heroBanner from '@/assets/hero-banner.png'; 
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '90vh',
        overflow: 'hidden',
        fontFamily: 'Inter',
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
          backgroundColor: 'rgba(0, 0, 0, 0.75)', 
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
          fontSize: { xs: '36px', sm: '48px', md: '60px', lg: '72px' }, // Responsive font size
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', opacity: 0.5 }}>
          <span style={{ color: '#977342', fontWeight: 'bold' }}>Discover</span>&nbsp;
          <span style={{ color: '#fff', fontWeight: 'bold' }}> Your </span>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', opacity: 0.5 }}>
          <span style={{ color: '#977342', fontWeight: 'bold' }}>Next</span>&nbsp;
          <span style={{ color: '#fff', fontWeight: 'bold' }}> Star</span>
        </Box>
        <Typography component={"span"} color="white" sx={{ display: 'block', fontSize: { xs: '16px', sm: '20px', md: '24px' }, opacity: .6 }}>Staffing Your Success, One Event at a Time.</Typography>
        
        {/* Buttons */}
        <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
          <Link href="/register">
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
          </Link>
          <Link href="/register">
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
          </Link>
        </Box>
      </Typography>
      
    </Box>
  );
};

export default Hero;