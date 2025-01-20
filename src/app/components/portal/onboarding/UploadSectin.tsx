"use client";

import * as React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { UploadSectionProps } from '@/types/Props/UploadSectionsProps';

export const UploadSection: React.FC<UploadSectionProps> = ({ title, iconSrc }) => {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        px: 4, 
        py: 3, 
        width: '100%', 
        border: '2px dashed', 
        borderColor: 'stone.500', 
        bgcolor: 'transparent', 
        borderRadius: '8px', 
        maxWidth: '400px', 
        mx: 'auto', 
        mt: 2 
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '40px', minHeight: '36px' }}>
          <img
            loading="lazy"
            src={iconSrc}
            alt={`${title} upload icon`}
            style={{ objectFit: 'contain', width: '40px', height: '40px' }}
          />
        </Box>
        <Typography variant="body1" sx={{ textAlign: 'center', color: 'orange', mt: 1 }}>
          {title}
        </Typography>
        <Button 
          variant="contained" 
          sx={{ mt: 2, bgcolor: 'stone.500', color: 'white', '&:hover': { bgcolor: 'orange' } }} 
          aria-label={`Upload ${title}`}
        >
          Upload
        </Button>
      </Box>
    </Paper>
  );
};