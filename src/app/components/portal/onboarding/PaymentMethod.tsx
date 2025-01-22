import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { PaymentMethodProps } from '@/types/Props/PaymentMethodProps';

export const PaymentMethod: React.FC<PaymentMethodProps> = ({ label, isActive }) => {
  return (
    <Box 
      sx={{ 
        px: { xs: 4, md: 6 }, 
        py: { xs: 1.5, md: 2 },
        pt: isActive ? { xs: 1, md: 1.5 } : { xs: 2, md: 3 },
        pb: isActive ? { xs: 2, md: 3 } : { xs: 1.5, md: 2 }, 
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
      <Typography 
        variant="body1" 
        sx={{ 
          color: isActive ? '#ceab76' : '#977342',
          fontSize: { xs: '0.875rem', md: '1rem' },
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};