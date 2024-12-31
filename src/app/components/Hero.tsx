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
          background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.7), rgba(58, 176, 224, 0.7))',
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
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h2">
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
          <Typography variant="h6">
            Staffing Your Success, One Event at a Time.
          </Typography>
        </motion.div>
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