import { Box, Typography, keyframes } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const Loading = () => {
  const [dots, setDots] = useState('.');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '.' : prev + '.');
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.contentWrapper}>
        {/* Logo placeholder - replace with your actual logo */}
        <Box sx={styles.logoContainer}>
          <Typography 
            variant="h3" 
            sx={styles.logoText}
          >
            <span style={{ color: '#977342' }}>SSH</span>
          </Typography>
        </Box>
        
        <ClipLoader color="#977342" size={80} cssOverride={styles.spinner} />
        
        <Typography variant="h5" sx={styles.loadingText}>
          Loading{dots}
        </Typography>
        
        <Box sx={styles.progressBar}>
          <Box sx={styles.progressFill}></Box>
        </Box>
        
        <Typography variant="body2" sx={styles.subText}>
          Preparing your experience
        </Typography>
      </Box>
      
      {/* Decorative elements */}
      <Box sx={styles.decorativeCircle1}></Box>
      <Box sx={styles.decorativeCircle2}></Box>
      <Box sx={styles.decorativeCircle3}></Box>
    </Box>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
    position: 'relative',
    overflow: 'hidden',
    animation: `${fadeIn} 0.5s ease-in-out`,
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    padding: '2rem',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(25, 25, 25, 0.7)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  },
  logoContainer: {
    marginBottom: '2rem',
    animation: `${pulse} 2s infinite ease-in-out`,
  },
  logoText: {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 800,
    color: '#977342',
    letterSpacing: '-0.5px',
  },
  spinner: {
    borderWidth: '5px',
    animation: 'spin 1s linear infinite',
    marginBottom: '1.5rem',
  },
  loadingText: {
    color: '#977342',
    marginBottom: '1.5rem',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)',
    letterSpacing: '1px',
  },
  subText: {
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: '1rem',
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'italic',
  },
  progressBar: {
    width: '250px',
    height: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '100%',
    backgroundImage: 'linear-gradient(90deg, transparent, #977342, #CEAB76, #977342, transparent)',
    backgroundSize: '200% 100%',
    animation: `${shimmer} 2s infinite linear`,
  },
  decorativeCircle1: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(151, 115, 66, 0.15) 0%, rgba(151, 115, 66, 0) 70%)',
    top: '-100px',
    left: '-100px',
    zIndex: 1,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(206, 171, 118, 0.1) 0%, rgba(206, 171, 118, 0) 70%)',
    bottom: '-150px',
    right: '-150px',
    zIndex: 1,
  },
  decorativeCircle3: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 70%)',
    bottom: '100px',
    left: '15%',
    zIndex: 1,
  },
};

export default Loading;