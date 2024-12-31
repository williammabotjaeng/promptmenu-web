"use client";

import Header from './components/Header';
import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Hero from './components/Hero';

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
      <Hero />
    </div>
  );
};

export default Home;