import * as React from 'react';
import { Box, Button } from '@mui/material';

interface PaymentMethodProps {
  label: string; // The label of the payment method (e.g., "Credit Card", "PayPal")
  isActive: boolean; // Whether this payment method is currently active
  onClick: () => void; // Function to handle when the payment method is clicked
}

export const PaymentMethod: React.FC<PaymentMethodProps> = ({ label, isActive, onClick }) => {
  return (
    <Box
      onClick={onClick}
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
        justifyContent: 'center',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'rgba(151, 115, 66, 0.2)',
        },
      }}
    >
      <Button
        sx={{
          color: isActive ? '#ceab76' : '#977342',
          fontSize: { xs: '0.875rem', md: '1rem' },
          textTransform: 'none',
          '&:hover': {
            color: 'white', 
            backgroundColor: 'transparent'
          }
        }}
      >
        {label}
      </Button>
    </Box>
  );
};