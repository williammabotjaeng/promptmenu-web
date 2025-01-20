"use client";

import * as React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { StepItem } from '@/components/portal/onboarding/StepItem';
import { PortfolioUploadSection } from '@/components/portal/onboarding/PortfolioUploadSection';

const steps = [
  { number: 1, title: 'Headshot' },
  { number: 2, title: 'Skills' },
  { number: 3, title: 'Payment' },
  { number: 4, title: 'Attributes' },
  { number: 5, title: 'Social' },
  { number: 6, title: 'ID' },
  { number: 7, title: 'Portfolio', isActive: true },
  { number: 8, title: 'Review' }
];

export const PortfolioBuilder: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ backgroundColor: 'white', borderRadius: '8px', border: '2px solid gray' }}>
      <Box sx={{ paddingBottom: '96px', backgroundColor: 'transparent' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', color: 'orange' }}>
          <Typography variant="h4">Staffing Solutions Hub</Typography>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/af43027af516aad76123aea989672db17ed5430d09957d312f5d82c3325ed597?apiKey=7fae980a988640eea8add1e49a5d542e&"
            alt="Logo"
            style={{ width: '18px', height: 'auto' }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '16px', color: 'white' }}>
          {steps.map((step) => (
            <StepItem
              key={step.number}
              number={step.number}
              title={step.title}
              isActive={step.isActive}
            />
          ))}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
          <Paper elevation={3} sx={{ padding: 4, backgroundColor: 'rgba(245, 245, 245, 0.1)', width: '100%', maxWidth: '768px' }}>
            <Typography variant="h5" sx={{ color: 'orange', marginBottom: 2 }}>
              Portfolio
            </Typography>

            <Typography variant="h6" sx={{ color: 'orange', marginBottom: 1 }}>
              Images
            </Typography>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/c3e6d3aa45f545140b21248d8faa19f323bec646924e19bb0ed829ca445a648f?apiKey=7fae980a988640eea8add1e49a5d542e&"
              alt="Portfolio images grid"
              style={{ width: '100%', aspectRatio: '3.14', marginBottom: '16px' }}
            />

            <PortfolioUploadSection
              title="Videos"
              description="Upload your showreel or video portfolio"
              buttonText="Upload Video"
            />

            <PortfolioUploadSection
              title="Resume/CV"
              description="Upload your CV in PDF format"
              buttonText="Upload PDF"
            />
          </Paper>
        </Box>

        <Box sx={{ textAlign: 'center', marginTop: '24px', color: 'gray' }}>
          <Typography variant="body2">
            Step 7 of 8 - Portfolio
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};