"use client";

import Header from './components/Header';
import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const Home: React.FC = () => {
  useEffect(() => {
    const textElement = document.querySelector('.slide-in-text');
    if (textElement) {
      textElement.classList.add('animate');
    }
  }, []);

  return (
    <div>
      <Header />
      <Box textAlign="center" mt={5}>
        <Typography variant="h3" className="slide-in-text">Welcome to SSH | Staffing Supply Hub</Typography>
        <Typography variant="h6">Staffing Your Success, One Event at a Time.</Typography>
      </Box>
    </div>
  );
};

export default Home;