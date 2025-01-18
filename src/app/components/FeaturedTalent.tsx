"use client";

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import featuredTalent from '@/assets/featured-talent.png'; 

const FeaturedTalent: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: { xs: 2, md: 6 } }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#977342' }}>
        Featured
        <span style={{ color: '#fff' }}> Talents</span>
      </Typography>

      <Box>
        <Image
          loading="lazy"
          src={featuredTalent} 
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
          backgroundColor: '#977342',
          borderRadius: '20px',
          '&:hover': {
            backgroundColor: '#000',
            color: '#977342' 
          },
        }}
      >
        View All Talents
      </Button>
    </Box>
  );
};

export default FeaturedTalent;