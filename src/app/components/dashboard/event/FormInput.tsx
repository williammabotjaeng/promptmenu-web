import * as React from 'react';
import { TextField, Box, Typography } from '@mui/material';
import { FormInputProps } from '@/types/Props/FormInputProps';

export const FormInput: React.FC<FormInputProps> = ({ label, type = "text" }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: 2 }}>
      <Typography 
        variant="body2" 
        sx={{ marginBottom: 1, fontWeight: 'medium', color: '#4B5563' }}
      >
        {label}
      </Typography>
      <TextField
        type={type}
        id={label.toLowerCase().replace(/\s/g, '-')}
        variant="outlined"
        fullWidth
        sx={{ 
          '& .MuiOutlinedInput-root': {
            borderRadius: '4px',
          },
        }}
        aria-label={label}
      />
    </Box>
  );
};