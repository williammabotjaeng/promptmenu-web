"use client";

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';

const featuredTalent = '@/assets/featured-talent.png';

const FeaturedTalent: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: { xs: 10, md: 20 } }}>
      <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#6B7280' }}>
        Featured
        <span style={{ color: '#fff' }}> Talents</span>
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Image
          loading="lazy"
          src={featuredTalent?.src}
          alt="Featured talents showcase"
          layout="responsive"
          width={1248}
          height={400} 
          style={{ objectFit: 'contain' }}
        />
      </Box>

      <Button
        variant="contained"
        sx={{
          mt: 4,
          px: 4,
          py: 2,
          fontSize: '1rem',
          color: '#fff',
          backgroundColor: '#6B7280',
          borderRadius: '20px',
          '&:hover': {
            backgroundColor: '#4B5563', 
          },
        }}
      >
        View All Talents
      </Button>
    </Box>
  );
};

export default FeaturedTalent;