import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { PaymentMethodProps } from '@/types/Props/PaymentMethodProps';

export const PaymentMethod: React.FC<PaymentMethodProps> = ({ label, isActive }) => {
  return (
    <Box 
      sx={{ 
        px: 6, 
        py: 2, 
        pt: isActive ? 1.5 : 3, 
        pb: isActive ? 3 : 2, 
        borderBottom: isActive ? '2px solid #977342' : 'none', 
        color: isActive ? '#977342' : 'inherit', 
        backgroundColor: isActive ? 'rgba(151, 115, 66, 0.1)' : 'transparent', 
        maxWidth: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        '&:focus-within': {
          border: '2px solid #977342', 
        },
      }}
    >
      <Typography variant="body1" sx={{ color: isActive ? '#ceab76' : '#977342' }}>
        {label}
      </Typography>
    </Box>
  );
};