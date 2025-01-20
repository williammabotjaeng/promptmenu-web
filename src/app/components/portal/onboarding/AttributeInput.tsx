import * as React from 'react';
import { TextField, FormControl, FormLabel } from '@mui/material';
import { AttributeInputProps } from '@/types/Props/AttributeInputProps';

export const AttributeInput: React.FC<AttributeInputProps> = ({ label, placeholder }) => {
  return (
    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
      <FormLabel htmlFor={`${label.toLowerCase()}-input`} sx={{ color: 'orange' }}>
        {label}
      </FormLabel>
      <TextField
        id={`${label.toLowerCase()}-input`}
        placeholder={placeholder}
        variant="outlined"
        sx={{
          bgcolor: 'black',
          borderRadius: '8px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#4B5563', // Stone-500
            },
            '&:hover fieldset': {
              borderColor: 'orange', // Change border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: 'orange', // Change border color when focused
            },
          },
          '& .MuiInputBase-input': {
            color: 'gray.400',
          },
        }}
      />
    </FormControl>
  );
};