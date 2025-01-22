import * as React from 'react';
import { TextField, Box, Typography } from '@mui/material';

export interface PaymentInputProps {
    label: string;
    id: string;
}

export const PaymentInput: React.FC<PaymentInputProps> = ({ label, id }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Typography 
        sx={{ paddingY: 1, bgcolor: 'transparent', fontWeight: 'bold', fontSize: { xs: '0.875rem', md: '1rem' } }} // Responsive font size
      >
        {label} (AED)
      </Typography>
      <TextField
        type="number"
        id={id}
        variant="outlined"
        sx={{
          marginTop: 2,
          bgcolor: 'white',
          borderRadius: '8px',
          height: '50px',
          width: { xs: '100%', md: 'auto' }, 
          '& .MuiOutlinedInput-root': {
            border: '1px solid',
            borderColor: 'grey.300',
          },
        }}
        inputProps={{
          'aria-label': `Enter ${label} amount in AED`,
        }}
      />
    </Box>
  );
};