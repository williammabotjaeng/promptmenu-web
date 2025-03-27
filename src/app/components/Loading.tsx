import { Box, Typography, keyframes } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { Restaurant, MenuBook, Fastfood, EmojiFoodBeverage } from '@mui/icons-material';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loading = () => {
  const [dots, setDots] = useState('.');
  const [loadingMessage, setLoadingMessage] = useState('Preparing your digital menu');
  
  // Food-related loading messages
  const loadingMessages = [
    'Preparing your digital menu',
    'Setting the digital table',
    'Gathering the ingredients',
    'Seasoning your experience',
    'Cooking up something special',
    'Plating your perfect menu'
  ];
  
  useEffect(() => {
    // Cycle through loading messages
    const messageInterval = setInterval(() => {
      setLoadingMessage(prev => {
        const currentIndex = loadingMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 3000);
    
    // Animate the dots
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '.' : prev + '.');
    }, 500);
    
    return () => {
      clearInterval(messageInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.contentWrapper}>
        {/* Logo */}
        <Box sx={styles.logoContainer}>
          <MenuBook sx={styles.logoIcon} />
          <Typography 
            variant="h3" 
            sx={styles.logoText}
          >
            <span style={{ color: '#107C10' }}>Prompt</span>
            <span style={{ color: '#0078D4' }}>Menu</span>
          </Typography>
        </Box>
        
        {/* Plate with food icons */}
        <Box sx={styles.plateContainer}>
          <Box sx={styles.plate}>
            <Box sx={styles.plateInner}>
              {/* Rotating food icons */}
              <Box sx={styles.foodIconsContainer}>
                <Fastfood sx={{ ...styles.foodIcon, animationDelay: '0s' }} />
                <EmojiFoodBeverage sx={{ ...styles.foodIcon, animationDelay: '0.5s' }} />
                <Restaurant sx={{ ...styles.foodIcon, animationDelay: '1s' }} />
              </Box>
            </Box>
          </Box>
        </Box>
        
        <Typography variant="h5" sx={styles.loadingText}>
          {loadingMessage}{dots}
        </Typography>
        
        <Box sx={styles.progressBar}>
          <Box sx={styles.progressFill}></Box>
        </Box>
        
        <Typography variant="body2" sx={styles.subText}>
          Your digital menu experience powered by Azure AI
        </Typography>
      </Box>
      
      {/* Decorative elements representing food and plates */}
      <Box sx={styles.decorativeCircle1}></Box>
      <Box sx={styles.decorativeCircle2}></Box>
      <Box sx={{
        ...styles.decorativeCircle3,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '60%',
          height: '60%',
          borderRadius: '50%',
          backgroundColor: 'rgba(16, 124, 16, 0.1)',
          transform: 'translate(-50%, -50%)'
        }
      }}></Box>
      
      {/* Steam effect */}
      <Box sx={styles.steamContainer}>
        <Box sx={{...styles.steam, animationDelay: '0.2s'}}></Box>
        <Box sx={{...styles.steam, animationDelay: '0.8s', left: '60%'}}></Box>
        <Box sx={{...styles.steam, animationDelay: '1.5s', left: '40%'}}></Box>
      </Box>
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
    background: 'linear-gradient(135deg, #f5f9f5 0%, #e0f1f9 100%)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
    animation: `${float} 3s infinite ease-in-out`,
  },
  logoIcon: {
    fontSize: 40,
    marginRight: 1,
    color: '#107C10',
  },
  logoText: {
    fontFamily: '"Segoe UI", sans-serif',
    fontWeight: 700,
    letterSpacing: '-0.5px',
  },
  plateContainer: {
    position: 'relative',
    marginBottom: '2rem',
  },
  plate: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    backgroundColor: 'white',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '90%',
      height: '90%',
      borderRadius: '50%',
      border: '2px solid rgba(0, 0, 0, 0.05)',
    },
  },
  plateInner: {
    width: '80%',
    height: '80%',
    borderRadius: '50%',
    backgroundColor: 'rgba(240, 240, 240, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodIconsContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    animation: `${rotate} 8s infinite linear`,
  },
  foodIcon: {
    position: 'absolute',
    fontSize: 28,
    color: '#0078D4',
    animation: `${float} 2s infinite ease-in-out`,
    '&:nth-of-type(1)': {
      top: '10%',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    '&:nth-of-type(2)': {
      bottom: '15%',
      left: '15%',
    },
    '&:nth-of-type(3)': {
      bottom: '15%',
      right: '15%',
    },
  },
  loadingText: {
    color: '#107C10',
    marginBottom: '1.5rem',
    fontFamily: 'Segoe UI, sans-serif',
    fontWeight: 600,
    textAlign: 'center',
  },
  subText: {
    color: '#0078D4',
    marginTop: '1rem',
    fontFamily: 'Segoe UI, sans-serif',
    opacity: 0.9,
  },
  progressBar: {
    width: '250px',
    height: '4px',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '100%',
    backgroundImage: 'linear-gradient(90deg, transparent, #107C10, #0078D4, #107C10, transparent)',
    backgroundSize: '200% 100%',
    animation: `${shimmer} 2s infinite linear`,
  },
  decorativeCircle1: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(16, 124, 16, 0.1) 0%, rgba(16, 124, 16, 0) 70%)',
    top: '-100px',
    left: '-100px',
    zIndex: 1,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0, 120, 212, 0.08) 0%, rgba(0, 120, 212, 0) 70%)',
    bottom: '-150px',
    right: '-150px',
    zIndex: 1,
  },
  decorativeCircle3: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(80, 230, 255, 0.07) 0%, rgba(80, 230, 255, 0) 70%)',
    bottom: '100px',
    left: '15%',
    zIndex: 1,
  },
  steamContainer: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '120px',
    height: '100px',
    zIndex: 1,
  },
  steam: {
    position: 'absolute',
    width: '20px',
    height: '60px',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: '50%',
    left: '50%',
    transform: 'translateX(-50%)',
    filter: 'blur(10px)',
    animation: `${float} 3s infinite ease-out`,
    opacity: 0.6,
  }
};

export default Loading;