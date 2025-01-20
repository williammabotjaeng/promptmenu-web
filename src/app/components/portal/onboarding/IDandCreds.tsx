"use client";

import * as React from 'react';
import { Box, Typography, Button, Paper, AppBar, Toolbar, Container } from '@mui/material';
import { StepItem } from '@/components/portal/onboarding/StepItem';
import { UploadSection } from '@/components/portal/onboarding/UploadSection';

const steps = [
  { number: 1, label: 'Headshot' },
  { number: 2, label: 'Skills' },
  { number: 3, label: 'Payment' },
  { number: 4, label: 'Attributes' },
  { number: 5, label: 'Social' },
  { number: 6, label: 'ID', isActive: true },
  { number: 7, label: 'Portfolio' },
  { number: 8, label: 'Review' }
];

export const IDandCreds: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ backgroundColor: 'black', opacity: 0.9, paddingBottom: '24px' }}>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, color: 'orange' }}>
            Staffing Solutions Hub
          </Typography>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/59a53a1b50992d090204c79bff6fd43d3018569a46054c439fe42bd04dc79c7b?apiKey=7fae980a988640eea8add1e49a5d542e&"
            alt="Logo"
            style={{ width: '18px', height: 'auto' }}
          />
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/04941e81747f3ecb6811e1684b15614793214440d6dff851abf37ed98ca1961c?apiKey=7fae980a988640eea8add1e49a5d542e&"
          alt="Decorative"
          style={{ width: '121px', marginTop: '-11px' }}
        />
      </Box>

      <nav>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: '20px' }}>
          {steps.map((step) => (
            <StepItem
              key={step.number}
              number={step.number}
              label={step.label}
              isActive={step.isActive}
            />
          ))}
        </Box>
      </nav>

      <Paper elevation={3} sx={{ padding: 4, marginTop: 4, backgroundColor: 'rgba(245, 245, 245, 0.1)' }}>
        <Typography variant="h5" sx={{ color: 'orange', marginBottom: 2 }}>
          ID Document
        </Typography>
        <Box sx={{ display: 'flex', gap: 5, flexDirection: { xs: 'column', md: 'row' } }}>
          <UploadSection title="Front Side" />
          <UploadSection title="Back Side" />
        </Box>
      </Paper>

      <footer style={{ textAlign: 'center', marginTop: '28px', color: 'gray' }}>
        <Typography variant="body2">
          Step 6 of 8 - ID Document
        </Typography>
      </footer>
    </Container>
  );
};