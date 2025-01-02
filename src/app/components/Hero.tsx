"use client";

import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

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
    }, 5000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        height: '60vh',
        overflow: 'hidden',
        fontFamily: 'Open Sans',
        borderBottom: '8px solid #977342',
      }}
    >
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={6} sx={{ position: 'relative', overflow: 'hidden' }}>
          <iframe
            src={giphyEmbeds[currentClipIndex]}
            width="100%"
            height="100%"
            style={{
              border: 'none',
              filter: 'blur(5px)', 
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: -1,
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
              background: 'rgba(151, 115, 66, 0.5)', 
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              padding: '20px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: .2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PersonSearchOutlinedIcon sx={{ fontSize: '128px', color: '#000' }} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#000', 
                  color: '#977342', 
                  border: '4px solid #977342',
                  fontSize: '32px',
                  fontFamily: 'Open Sans',
                  marginTop: '10px',
                  fontWeight: '700',
                  '&:hover': {
                    backgroundColor: '#CEAB76', 
                    color: '#000', 
                  },
                }}
              >
                Find Talent
              </Button>
            </motion.div>
          </Box>
        </Grid>
        <Grid item xs={6} sx={{ position: 'relative', overflow: 'hidden' }}>
          <iframe
            src={giphyEmbeds[(currentClipIndex + 1) % giphyEmbeds.length]} 
            width="100%"
            height="100%"
            style={{
              border: 'none',
              filter: 'blur(5px)', 
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: -1,
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
              background: 'rgba(151, 115, 66, 0.5)', 
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              padding: '20px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: .2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ContentPasteSearchIcon sx={{ fontSize: '128px', color: '#000', }} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#000', 
                  color: '#977342', 
                  border: '4px solid #977342',
                  fontSize: '32px',
                  fontFamily: 'Open Sans',
                  fontWeight: '700',
                  marginTop: '10px',
                  '&:hover': {
                    backgroundColor: '#CEAB76', 
                    color: '#000', 
                  },
                }}
              >
                Job Calls
              </Button>
            </motion.div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;