"use client";

import * as React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Importing Material-UI Menu icon
import { StepItem } from './StepItem';
import { SocialInput } from './SocialInput';

const steps = [
  { number: 1, title: 'Headshot' },
  { number: 2, title: 'Skills' },
  { number: 3, title: 'Payment' },
  { number: 4, title: 'Attributes' },
  { number: 5, title: 'Social', isActive: true },
  { number: 6, title: 'ID' },
  { number: 7, title: 'Portfolio' },
  { number: 8, title: 'Review' }
];

const socialInputs = [
  { icon: 'instagram', placeholder: 'Instagram Username', alt: 'Instagram icon' },
  { icon: 'tiktok', placeholder: 'TikTok Username', alt: 'TikTok icon' },
  { icon: 'website', placeholder: 'Website URL', alt: 'Website icon' }
];

export const SocialMediaLinks: React.FC = () => {
  return (
    <Box className="flex overflow-hidden flex-col bg-white rounded-lg border-2 border-gray-300">
      <Box className="flex flex-col w-full bg-black bg-opacity-0">
        <Box className="flex flex-col w-full bg-black pb-[786px] max-md:pb-24">
          <Box className="flex flex-wrap gap-5 justify-between items-start px-6 pt-6 pb-1 w-full text-2xl font-bold text-orange-300">
            <Typography variant="h5" sx={{ py: 1 }}>
              Staffing Solutions Hub
            </Typography>
            <MenuIcon sx={{ color: 'white', width: '18px', height: '18px' }} /> 
          </Box>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/04941e81747f3ecb6811e1684b15614793214440d6dff851abf37ed98ca1961c?apiKey=7fae980a988640eea8add1e49a5d542e&"
            alt="Logo"
            style={{ objectFit: 'contain', zIndex: 10, marginTop: '-44px', marginLeft: '128px', maxWidth: '100%', width: '121px' }}
          />
          <Box className="flex z-10 flex-col items-center px-16 -mt-24 w-full text-white">
            <Box className="flex flex-wrap gap-5 justify-between items-start ml-5 max-w-full">
              {steps.map((step) => (
                <StepItem
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  isActive={step.isActive}
                />
              ))}
            </Box>
          </Box>
          <Paper className="flex flex-col self-center p-8 mt-14 ml-6 max-w-full rounded-xl bg-stone-500 bg-opacity-10 w-[768px]">
            <Typography variant="h5" sx={{ pt: 0.25, pb: 3, color: 'orange' }}>
              Social Media
            </Typography>
            <Box className="flex flex-col mt-6 w-full space-y-4">
              {socialInputs.map((input, index) => (
                <SocialInput key={index} {...input} />
              ))}
            </Box>
          </Paper>
          <Typography variant="caption" sx={{ px: 16, py: 7, mt: 24, mb: 0, ml: 5, color: 'gray', textAlign: 'center' }}>
            Step 5 of 8 - Socials
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};