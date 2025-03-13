import { Box } from '@mui/material';
import React from 'react';
import { ClipLoader } from 'react-spinners';
import { motion } from 'framer-motion';

const Creating: React.FC = () => {
  return (
    <Box sx={styles.container}>
      <ClipLoader color="#977342" size={150} cssOverride={styles.spinner} />
      <motion.div
        style={styles.hourglass}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Hourglass SVG or CSS representation */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="100"
          viewBox="0 0 50 100"
          style={styles.hourglassIcon}
        >
          <rect x="15" y="0" width="20" height="40" fill="#977342" />
          <rect x="10" y="40" width="30" height="60" fill="#977342" />
        </svg>
      </motion.div>
      <h2 style={styles.loadingText}>Creating Profile...</h2>
      <br />
      <h5>Please Wait...</h5>
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
    background: '#000',
    position: 'relative',
    overflow: 'hidden',
  },
  spinner: {
    borderWidth: '8px',
    animation: 'spin 1s linear infinite',
  },
  hourglass: {
    margin: '20px 0',
  },
  hourglassIcon: {
    fill: '#977342',
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

export default Creating;