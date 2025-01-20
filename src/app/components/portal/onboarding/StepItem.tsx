import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { StepItemProps } from '@/types/Props/StepItemProps';

export const StepItem: React.FC<StepItemProps> = ({ number, title, isActive }) => {
  return (
    <Box className="flex flex-col pb-2 mt-1" sx={{ backgroundColor: 'transparent' }}>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          width: '32px', 
          height: '32px', 
          borderRadius: '50%', 
          border: '2px solid', 
          borderColor: isActive ? '#977342' : '#4B5563', 
          backgroundColor: isActive ? '#977342' : 'transparent', 
          color: isActive ? 'white' : '#4B5563', 
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        {number}
      </Box>
      <Typography variant="body2" sx={{ marginTop: 1, textAlign: 'center', color: 'white' }}>
        {title}
      </Typography>
    </Box>
  );
};