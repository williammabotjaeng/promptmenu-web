"use client";

import React, { useEffect, useState } from 'react';
import { Box, Fade, Typography } from '@mui/material';
import { motion } from 'framer-motion';

// Microsoft-inspired color scheme
const theme = {
  colors: {
    primary: "#107C10", // Microsoft green
    secondary: "#0078D4", // Microsoft blue
    accent: "#50E6FF", // Azure blue
    lightGreen: "#84c680",
    background: "#f5f5f5",
    text: "#323130",
    lightText: "#605E5C",
    white: "#FFFFFF",
  },
};

const LoadingScreen = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.white,
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      <Box 
        sx={{ 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          width: '100%',
          maxWidth: '400px',
          height: '300px',
        }}
      >
        {/* Cooking Pot */}
        <Box
          component={motion.div}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.7,
            delay: 0.2,
          }}
          sx={{
            width: '120px',
            height: '80px',
            borderRadius: '0 0 60px 60px',
            backgroundColor: '#444',
            position: 'relative',
            mb: 1,
            overflow: 'visible',
          }}
        >
          {/* Pot Handles */}
          <Box
            component={motion.div}
            sx={{
              position: 'absolute',
              width: '140px',
              height: '20px',
              top: '10px',
              left: '-10px',
              borderRadius: '20px',
              backgroundColor: '#333',
            }}
          />
          
          {/* Steam 1 */}
          <Box
            component={motion.div}
            animate={{ 
              y: [-10, -20, -10],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            sx={{
              width: '15px',
              height: '15px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              position: 'absolute',
              top: '-25px',
              left: '30px',
            }}
          />
          
          {/* Steam 2 */}
          <Box
            component={motion.div}
            animate={{ 
              y: [-10, -25, -10],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
            sx={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              position: 'absolute',
              top: '-20px',
              left: '60px',
            }}
          />
          
          {/* Steam 3 */}
          <Box
            component={motion.div}
            animate={{ 
              y: [-5, -20, -5],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
            sx={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              position: 'absolute',
              top: '-15px',
              left: '85px',
            }}
          />
        </Box>
        
        {/* Stirring Spoon */}
        <Box
          component={motion.div}
          initial={{ rotate: -30, x: -50, opacity: 0 }}
          animate={{ rotate: 30, x: 50, opacity: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 0.4,
          }}
          sx={{
            width: '120px',
            height: '20px',
            backgroundColor: '#C19A6B',
            borderRadius: '10px',
            position: 'absolute',
            top: '80px',
            transformOrigin: 'right center',
            zIndex: 1,
          }}
        >
          {/* Spoon Head */}
          <Box
            sx={{
              width: '35px',
              height: '35px',
              backgroundColor: '#C19A6B',
              borderRadius: '50%',
              position: 'absolute',
              top: '-8px',
              left: '-5px',
            }}
          />
        </Box>
        
        {/* Logo */}
        <Box
          component={motion.div}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          sx={{
            mt: 16,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: `${theme.colors.primary}15`,
            padding: '10px 20px',
            borderRadius: '30px',
          }}
        >
          <Box
            component="svg"
            sx={{ width: 24, height: 24, mr: 1 }}
            viewBox="0 0 24 24"
          >
            <path 
              fill={theme.colors.primary} 
              d="M8.1,13.34L3.91,9.16C2.35,7.59 2.35,5.06 3.91,3.5L10.93,10.5L8.1,13.34M14.88,11.53L13.41,13L20.29,19.88L18.88,21.29L12,14.41L5.12,21.29L3.71,19.88L13.47,10.12C12.76,8.59 13.26,6.44 14.85,4.85C16.76,2.93 19.5,2.57 20.96,4.03C22.43,5.5 22.07,8.24 20.15,10.15C18.56,11.74 16.41,12.24 14.88,11.53Z" 
            />
          </Box>
          <Typography
            sx={{
              color: theme.colors.primary,
              fontWeight: 600,
              fontSize: '1.25rem',
            }}
          >
            PromptMenu
          </Typography>
        </Box>
        
        {/* Loading Text */}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          sx={{ mt: 3 }}
        >
          <Typography
            variant="body1"
            sx={{
              color: theme.colors.lightText,
              fontWeight: 500,
            }}
          >
            Preparing your digital menu experience...
          </Typography>
        </Box>
        
        {/* Loading Progress */}
        <Box
          sx={{
            width: '200px',
            height: '4px',
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: '4px',
            overflow: 'hidden',
            mt: 2,
          }}
        >
          <Box
            component={motion.div}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            sx={{
              width: '50%',
              height: '100%',
              background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
              borderRadius: '4px',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

// Usage in Home component
const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Show loading for 3 seconds
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      {/* Loading screen */}
      {loading && <LoadingScreen />}
      
      {/* Main content */}
      <Fade in={!loading} timeout={800}>
        <Box>
          {/* Your page content here */}
        </Box>
      </Fade>
    </>
  );
};

export default LoadingScreen;