"use client";

import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';

const Hero: React.FC = () => {
  useEffect(() => {
    const textElements = document.querySelectorAll('.slide-in-text');
    textElements.forEach((element) => {
      element.classList.add('animate');
    });
  }, []);

  return (
    <Box
      sx={{
        background: 'linear-gradient(180deg, #3B82F6, #3AB0E0)',
        padding: '100px 20px',
        color: '#fff',
        textAlign: 'right',
        height: '88vh'
      }}
    >
      <Typography variant="h2" className="slide-in-text">
        Welcome to Our Casting Agency
      </Typography>
      <br />
      <Typography variant="h6" className="slide-in-text">
      Staffing Your Success, One Event at a Time.
      </Typography>
      <br />
      <Button
        variant="contained"
        sx={{
          backgroundColor: 'black',
          marginTop: '20px',
          fontSize: '32px'
        }}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default Hero;