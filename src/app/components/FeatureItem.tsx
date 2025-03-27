import * as React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { FeatureItemProps } from '@/types/Props/FeatureItemProps';

export const FeatureItem: React.FC<FeatureItemProps> = ({ iconSrc, text, alt }) => {
  return (
    <Box 
      display="flex" 
      alignItems="center" 
      gap={2} 
      py={1} 
      width="100%" 
      bgcolor="transparent"
    >
      <Avatar 
        src={iconSrc} 
        alt={alt} 
        variant="rounded" 
        sx={{ width: 24, height: 24 }} 
      />
      <Typography 
        variant="body1" 
        color="white" 
        sx={{ flexGrow: 1, maxWidth: '582px' }} 
      >
        {text}
      </Typography>
    </Box>
  );
};