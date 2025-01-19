import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { StepButton } from '@/components/portal/onboarding/StepButton';
import { ActionButton } from '@/components/portal/onboarding/ActionButton';
import { FileUpload } from '@/components/portal/onboarding/FileUpload';

const steps = [
  { number: 1, label: 'Headshot', isActive: true },
  { number: 2, label: 'Skills' },
  { number: 3, label: 'Payment' },
  { number: 4, label: 'Attributes' },
  { number: 5, label: 'Social' },
  { number: 6, label: 'ID' },
  { number: 7, label: 'Portfolio' },
  { number: 8, label: 'Review' }
];

const HeadshotUpload: React.FC = () => {
  const handleFileSelect = (file: File) => {
    console.log('Selected file:', file);
  };

  return (
    <Box className="flex overflow-hidden flex-col bg-white rounded-lg border-2 border-gray-300">
      <Box className="flex flex-col w-full bg-black pb-[786px] max-md:pb-24">
        <Box className="flex flex-wrap gap-5 justify-between items-start px-6 pt-6 pb-1 w-full text-2xl font-bold text-orange-300">
          <Typography variant="h5" sx={{ py: 1 }}>
            Staffing Solutions Hub
          </Typography>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/7b668d9598f58e6e2696b10f8284a8abb9ce9eec02ed873406e8dd103dfa2a6a?apiKey=7fae980a988640eea8add1e49a5d542e&"
            alt=""
            style={{ objectFit: 'contain', width: '18px' }}
          />
        </Box>

        <Box className="flex flex-col items-center px-16 w-full text-white">
          <Box className="flex flex-wrap gap-5 justify-between ml-6 max-w-full">
            {steps.map((step) => (
              <StepButton key={step.number} {...step} />
            ))}
          </Box>
        </Box>

        <Box className="flex z-10 flex-wrap gap-10 items-start mt-0 ml-32 max-w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/04941e81747f3ecb6811e1684b15614793214440d6dff851abf37ed98ca1961c?apiKey=7fae980a988640eea8add1e49a5d542e&"
            alt="Profile preview"
            style={{ objectFit: 'contain', width: '121px' }}
          />
          <Box className="flex flex-col grow shrink-0 self-end px-6 mt-36 basis-0 w-fit">
            <FileUpload
              title="Upload Your Headshot"
              supportedFormats="JPG, PNG"
              maxSize="5MB"
              onFileSelect={handleFileSelect}
            />
            <Box className="flex flex-wrap gap-5 justify-between mt-8 text-base text-center">
              <ActionButton label="Back" variant="secondary" />
              <ActionButton label="Continue" variant="primary" />
            </Box>
          </Box>
        </Box>

        <Typography variant="caption" sx={{ px: 16, py: 7, mb: 0, ml: 5, color: 'gray', textAlign: 'center' }}>
          Step 1 of 8 - Headshot Upload
        </Typography>
      </Box>
    </Box>
  );
};

export default HeadshotUpload;