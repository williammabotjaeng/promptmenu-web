import React from 'react';
import { Box, Typography } from '@mui/material';
import { StatisticProps } from '@/types/Props/StatisticProps';

export const Statistic: React.FC<StatisticProps> = ({ value, label }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        flex: 1, 
        backgroundColor: 'transparent' 
      }}
    >
      <Typography 
        variant="h4" 
        component="div" 
        sx={{ 
          zIndex: 10, 
          paddingX: 4, 
          paddingBottom: 1, 
          fontWeight: 'bold', 
          color: 'stone.500', 
          textAlign: 'center', 
          maxWidth: '100%', 
          '@media (max-width:600px)': { paddingX: 2 } 
        }}
      >
        {value}
      </Typography>
      <Typography 
        variant="body2" 
        sx={{ 
          paddingX: 4, 
          paddingY: 0.5, 
          marginTop: 1, 
          color: 'gray.400', 
          textAlign: 'center', 
          maxWidth: '100%', 
          '@media (max-width:600px)': { paddingX: 2 } 
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};