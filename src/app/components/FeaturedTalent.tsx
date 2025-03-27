"use client";

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import featuredTalentLeft from '@/assets/featured-talent-left.png'; 
import featuredTalentCenter from '@/assets/featured-talent-center.png'; 
import featuredTalentRight from '@/assets/featured-talent-right.png'; 
import Link from 'next/link';

const FeaturedTalent: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: { xs: 2, md: 6 }, height: '100%' }}>
      <br />
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#977342' }}>
        Featured
        <span style={{ color: '#fff' }}> Talents</span>
      </Typography>
      <br />
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
        {/* Image 1 */}
        <Box sx={{ borderRadius: '10px', overflow: 'hidden' }}>
          <Image
            loading="lazy"
            src={featuredTalentLeft}
            alt="Featured talents showcase 1"
            layout="responsive"
            width={450} 
            height={250} 
            style={{ objectFit: 'contain' }}
          />
        </Box>

        {/* Image 2 */}
        <Box sx={{ borderRadius: '10px', overflow: 'hidden' }}>
          <Image
            loading="lazy"
            src={featuredTalentCenter}
            alt="Featured talents showcase 2"
            layout="responsive"
            width={450}
            height={250}
            style={{ objectFit: 'contain' }}
          />
        </Box>

        {/* Image 3 */}
        <Box sx={{ borderRadius: '10px', overflow: 'hidden' }}>
          <Image
            loading="lazy"
            src={featuredTalentRight}
            alt="Featured talents showcase 3"
            layout="responsive"
            width={450}
            height={250}
            style={{ objectFit: 'contain' }}
          />
        </Box>
      </Box>
      <br />
      <br />
      <Link href="/talent">
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
            color: '#977342',
            border: '1px solid #977342'
          },
        }}
      >
        View All Talents
      </Button>
      </Link>
      <br />
      <br />
    </Box>
  );
};

export default FeaturedTalent;