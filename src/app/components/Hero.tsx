"use client";

import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

const Hero: React.FC = () => {
  const router = useRouter(); // Initialize useRouter

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
        {/* Left Section */}
        <Grid item xs={6} sx={{ position: 'relative', overflow: 'hidden' }}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(151, 115, 66, 0.5)', // Background overlay
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
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <PersonSearchOutlinedIcon sx={{ fontSize: '172px', color: '#000' }} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
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
                onClick={() => router.push('/register')} // Navigate to "register" route
              >
                Find Talent
              </Button>
            </motion.div>
          </Box>
        </Grid>

        {/* Right Section */}
        <Grid item xs={6} sx={{ position: 'relative', overflow: 'hidden' }}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(151, 115, 66, 0.5)', // Background overlay
              zIndex: 1,
              borderLeft: '4px solid black'
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
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ContentPasteSearchIcon sx={{ fontSize: '172px', color: '#000' }} />
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
                onClick={() => router.push('/register')} // Navigate to "register" route
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