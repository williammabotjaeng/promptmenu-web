import { Box } from '@mui/material';
import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loading: React.FC = () => {
  return (
    <Box sx={styles.container}>
      <ClipLoader color="#977342" size={150} cssOverride={styles.spinner} />
      <h2 style={styles.loadingText}>Loading...</h2>
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
    background: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },
  spinner: {
    borderWidth: '8px', 
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    color: '#977342',
    marginTop: '20px',
    fontSize: '24px',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  },
};

export default Loading;