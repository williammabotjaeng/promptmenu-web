"use client";

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

const giphyEmbeds = [
  'https://giphy.com/embed/tYo3qHjD1FPVI2DrTn', 
  'https://giphy.com/embed/88irBytASglCWNxunm',
  'https://giphy.com/embed/uEOms1gk6a5xlGaUeP'
];

const Hero: React.FC = () => {
  const [currentClipIndex, setCurrentClipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentClipIndex((prevIndex) => (prevIndex + 1) % giphyEmbeds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        height: '88vh',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      <iframe
        src={giphyEmbeds[currentClipIndex]}
        width="102%"
        height="138%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
          border: 'none',
          overflow: 'hidden'
        }}
        allowFullScreen
      ></iframe>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.7), rgba(58, 176, 224, 0.7))', // Adjust opacity as needed
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          padding: '100px 20px',
          color: '#fff',
          textAlign: 'right',
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
            fontSize: '32px',
          }}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default Hero;