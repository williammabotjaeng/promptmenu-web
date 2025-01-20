import * as React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { StepItem } from './StepItem';
import { SocialInput } from './SocialInput';

const steps = [
  { number: 1, label: 'Headshot' },
  { number: 2, label: 'Skills' },
  { number: 3, label: 'Payment' },
  { number: 4, label: 'Attributes' },
  { number: 5, label: 'Social', isActive: true },
  { number: 6, label: 'ID' },
  { number: 7, label: 'Portfolio' },
  { number: 8, label: 'Review' }
];

const socialInputs = [
  { icon: 'https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/706f69bc9cd97cf6acc7f31acb4d6bd21124c3b2fc2b056ed0cfa79de9d48bed?apiKey=7fae980a988640eea8add1e49a5d542e&', placeholder: 'Instagram Username', alt: 'Instagram icon' },
  { icon: 'https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/a5a482778fb29359dc2ac9e7875b41952a8186eed259e5631ebd9c3d2556312c?apiKey=7fae980a988640eea8add1e49a5d542e&', placeholder: 'TikTok Username', alt: 'TikTok icon' },
  { icon: 'https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/f1a37df730715be6b4acf25617d4ceb6f3607892f70193a12bd711185db15a11?apiKey=7fae980a988640eea8add1e49a5d542e&', placeholder: 'Website URL', alt: 'Website icon' }
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
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/aba364a301f04bfd4452f6cae61721b407b1c79bf7b4b5a0309f3d96e6268c8d?apiKey=7fae980a988640eea8add1e49a5d542e&"
              alt="Menu icon"
              style={{ objectFit: 'contain', width: '18px' }}
            />
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
                <StepItem key={step.number} {...step} />
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