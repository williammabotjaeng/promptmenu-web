"use client";

import * as React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard as solidIdCard } from '@fortawesome/free-solid-svg-icons'; 
import { faIdCard as regularIdCard } from '@fortawesome/free-regular-svg-icons'; 
import { UploadSectionProps } from '@/types/Props/UploadSectionsProps';

export const UploadSection: React.FC<UploadSectionProps> = ({ title }) => {
  const renderIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'front side':
        return <FontAwesomeIcon icon={solidIdCard} style={{ fontSize: '40px', color: '#977342' }} />;
      case 'back side':
        return <FontAwesomeIcon icon={regularIdCard} style={{ fontSize: '40px', color: '#977342' }} />;
      default:
        return null;
    }
  };

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
        border: '2px dotted', 
        borderColor: '#CEAB76', 
        bgcolor: 'transparent', 
        borderRadius: '8px', 
        maxWidth: '400px', 
        mx: 'auto', 
        mt: 2 
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '40px', minHeight: '36px' }}>
          {renderIcon(title)}
        </Box>
        <Typography variant="body1" sx={{ textAlign: 'center', color: '#977342', mt: 1 }}>
          {title}
        </Typography>
        <Button 
          variant="contained" 
          sx={{ mt: 2, bgcolor: '#977342', color: 'white', '&:hover': { bgcolor: '#977342' } }} 
          aria-label={`Upload ${title}`}
        >
          Upload
        </Button>
      </Box>
    </Paper>
  );
};