import * as React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { StepItem } from '@/components/portal/onboarding/StepItem';
import { ActionButton } from '@/components/portal/onboarding/ActionButton';
import { FileUpload } from '@/components/portal/onboarding/FileUpload';

const steps = [
  { number: 1, title: 'Headshot', isActive: true },
  { number: 2, title: 'Skills' },
  { number: 3, title: 'Payment' },
  { number: 4, title: 'Attributes' },
  { number: 5, title: 'Social' },
  { number: 6, title: 'ID' },
  { number: 7, title: 'Portfolio' },
  { number: 8, title: 'Review' }
];

const HeadshotUpload: React.FC = () => {
  const handleFileSelect = (file: File) => {
    console.log('Selected file:', file);
  };

  return (
    <Box className="flex overflow-hidden flex-col bg-white rounded-lg border-2 border-gray-300">
      <Box className="flex flex-col w-full bg-black pb-[786px] max-md:pb-24">
        {/* Header Section */}
        <Box className="flex justify-between items-center px-6 pt-6">
          <Typography variant="h5" sx={{ color: '#977342', fontWeight: 'bold' }}>
            Staffing Solutions Hub
          </Typography>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/7b668d9598f58e6e2696b10f8284a8abb9ce9eec02ed873406e8dd103dfa2a6a?apiKey=7fae980a988640eea8add1e49a5d542e&"
            alt=""
            style={{ objectFit: 'contain', width: '18px' }}
          />
        </Box>

        {/* Steps Section */}
        <Box className="flex justify-center mt-4">
        {steps.map((step) => (
            <StepItem
              key={step.number}
              number={step.number}
              title={step.title}
              isActive={step.isActive}
            />
          ))}
        </Box>

        {/* Upload Form Section */}
        <Box className="flex flex-col items-center justify-center mt-10">
          <Paper
            elevation={3}
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              padding: 4,
              borderRadius: '8px',
              width: '100%',
              maxWidth: '400px',
              textAlign: 'center'
            }}
          >
            <Typography variant="h6" sx={{ color: 'white', marginBottom: 2 }}>
              Upload Your Headshot
            </Typography>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/04941e81747f3ecb6811e1684b15614793214440d6dff851abf37ed98ca1961c?apiKey=7fae980a988640eea8add1e49a5d542e&"
              alt="Profile preview"
              style={{ objectFit: 'contain', width: '121px', marginBottom: 2 }}
            />
            <FileUpload
              title=""
              supportedFormats="JPG, PNG"
              maxSize="5MB"
              onFileSelect={handleFileSelect}
            />
            <Box className="flex justify-between mt-4">
              <ActionButton label="Back" variant="secondary" />
              <ActionButton label="Continue" variant="primary" />
            </Box>
          </Paper>
        </Box>

        {/* Step Indicator Section */}
        <Typography variant="caption" sx={{ px: 16, py: 7, mb: 0, color: 'gray', textAlign: 'center' }}>
          Step 1 of 8 - Headshot Upload
        </Typography>
      </Box>
    </Box>
  );
};

export default HeadshotUpload;