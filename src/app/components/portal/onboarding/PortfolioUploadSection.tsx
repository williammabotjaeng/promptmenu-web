"use client";

import * as React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { PortfolioUploadSectionProps } from '@/types/Props/PortfolioUploadSectionProps';

export const PortfolioUploadSection: React.FC<PortfolioUploadSectionProps> = ({
  title,
  description,
  buttonText,
  iconSrc,
  iconAlt
}) => {
  return (
    <Box sx={{ py: 0.5, mt: 2, maxWidth: '100%' }}>
      <Typography variant="h6" sx={{ color: 'orange' }}>
        {title}
      </Typography>
      <Paper 
        elevation={3} 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          px: 4, 
          py: 5, 
          mt: 2, 
          border: '2px dashed', 
          borderColor: 'stone.500', 
          bgcolor: 'transparent', 
          borderRadius: '8px' 
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '36px', minHeight: '36px' }}>
            <img
              loading="lazy"
              src={iconSrc}
              alt={iconAlt}
              style={{ objectFit: 'contain', width: '36px', height: '36px' }}
            />
          </Box>
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'orange', mt: 1 }}>
            {description}
          </Typography>
          <Button 
            variant="contained" 
            sx={{ mt: 2, bgcolor: 'stone.500', color: 'white', '&:hover': { bgcolor: 'orange' } }} 
          >
            {buttonText}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};