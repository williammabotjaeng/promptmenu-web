"use client";

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

const giphyEmbeds = [
  'https://giphy.com/embed/tYo3qHjD1FPVI2DrTn', 
  'https://giphy.com/embed/AGDOyVndCDMfd40Zda',
  'https://giphy.com/embed/88irBytASglCWNxunm',
  'https://giphy.com/embed/fV2O1h54jpyYa9UNHJ',
  'https://giphy.com/embed/uEOms1gk6a5xlGaUeP',
];

const Hero: React.FC = () => {
  const [currentClipIndex, setCurrentClipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentClipIndex((prevIndex) => (prevIndex + 1) % giphyEmbeds.length);
    }, 5000); // Change clip every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        height: '88vh',
        overflow: 'hidden',
        fontFamily: 'Open Sans'
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
          background: 'rgba(151, 115, 66, 0.8)', // Gold overlay with some transparency
          zIndex: 1,
          fontFamily: 'Open Sans'
        }}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          padding: '100px 20px',
          color: '#000', // Black text color
          textAlign: 'right',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h2" sx={{ fontFamily: 'Open Sans', color: '#000' }}>
            Welcome to Our Casting Agency
          </Typography>
        </motion.div>
        <br />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h6" style={{ fontFamily: 'Open Sans', color: '#000' }}>
            Staffing Your Success, One Event at a Time.
          </Typography>
        </motion.div>
        <br />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 5 }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#000', // Black background for button
              color: '#977342', // Dark Gold text for button
              marginTop: '20px',
              fontSize: '32px',
              fontFamily: 'Open Sans',
              '&:hover': {
                backgroundColor: '#CEAB76', // Change to Light Beige on hover
                color: '#000', // Change text color to black on hover
              },
            }}
          >
            Get Started
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Hero;