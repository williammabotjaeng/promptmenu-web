import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { StepButtonProps } from '@/types/Props/StepButtonProps';

export const StepButton: React.FC<StepButtonProps> = ({ number, label, isActive = false }) => {
  return (
    <Box className="flex flex-col pb-2.5" sx={{ backgroundColor: 'transparent' }}>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          width: '32px', 
          height: '32px', 
          borderRadius: '50%', 
          backgroundColor: isActive ? '#977342' : 'transparent', 
          border: isActive ? 'none' : '2px solid #4B5563', 
          color: isActive ? 'white' : '#4B5563', 
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        {number}
      </Box>
      <Typography variant="body2" sx={{ marginTop: 1, textAlign: 'center', color: '#4B5563' }}>
        {label}
      </Typography>
    </Box>
  );
};