"use client";

import * as React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description'; 
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'; 
import { PortfolioUploadSectionProps } from '@/types/Props/PortfolioUploadSectionProps';

export const PortfolioUploadSection: React.FC<PortfolioUploadSectionProps> = ({
  title,
  description,
  buttonText
}) => {
  const renderIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'videos':
        return <VideoLibraryIcon sx={{ fontSize: '36px', color: '#977342' }} />;
      case 'resume/cv':
        return <DescriptionIcon sx={{ fontSize: '36px', color: '#977342' }} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ py: 0.5, mt: 2, maxWidth: '100%' }}>
      <Typography variant="h6" sx={{ color: '#977342' }}>
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
            {renderIcon(title)}
          </Box>
          <Typography variant="body1" sx={{ textAlign: 'center', color: '#977342', mt: 1 }}>
            {description}
          </Typography>
          <Button 
            variant="contained" 
            sx={{ mt: 2, bgcolor: 'stone.500', color: 'white', '&:hover': { bgcolor: '#977342' } }} 
          >
            {buttonText}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};