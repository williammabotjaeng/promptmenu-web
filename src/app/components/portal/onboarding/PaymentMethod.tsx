import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { PaymentMethodProps } from '@/types/Props/PaymentMethodProps';

export const PaymentMethod: React.FC<PaymentMethodProps> = ({ label, isActive }) => {
  return (
    <Box 
      sx={{ 
        px: 6, 
        py: 5, 
        pt: isActive ? 3.5 : 5, 
        pb: isActive ? 6 : 5, 
        borderBottom: isActive ? '2px solid #977342' : 'none', 
        color: isActive ? '#977342' : 'inherit', 
        backgroundColor: 'transparent', 
        maxWidth: '100%', 
        display: 'flex', 
        alignItems: 'center' 
      }}
    >
      <Typography variant="body1">
        {label}
      </Typography>
    </Box>
  );
};