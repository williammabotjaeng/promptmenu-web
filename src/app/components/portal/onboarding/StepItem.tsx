import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { StepItemProps } from '@/types/Props/StepItemProps';

export const StepItem: React.FC<StepItemProps> = ({ number, title, isActive }) => {
  return (
    <Box sx={{
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginRight: '40px'
    }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          textAlign: 'center',
          border: '2px solid',
          borderColor: isActive ? '#977342' : '#4B5563',
          backgroundColor: isActive ? '#977342' : 'transparent',
          color: isActive ? 'white' : '#4B5563',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        {number}
      </Box>
      <Typography variant="body2" sx={{ marginTop: 1, color: 'white', textAlign: 'center' }}>
        {title}
      </Typography>
    </Box>
  );
};