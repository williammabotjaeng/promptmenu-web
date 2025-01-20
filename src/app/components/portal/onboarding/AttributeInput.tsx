import * as React from 'react';
import { TextField, FormControl, FormLabel } from '@mui/material';
import { AttributeInputProps } from '@/types/Props/AttributeInputProps';

export const AttributeInput: React.FC<AttributeInputProps> = ({ label, placeholder }) => {
  return (
    <FormControl variant="outlined" sx={{ mb: 2 }}>
      <FormLabel htmlFor={`${label.toLowerCase()}-input`} sx={{ color: '#977342' }}>
        {label}
      </FormLabel>
      <TextField
        id={`${label.toLowerCase()}-input`}
        placeholder={placeholder}
        variant="outlined"
        sx={{
          bgcolor: 'black',
          borderRadius: '8px',
          width: '24vw',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#977342', 
            },
            '&:hover fieldset': {
              borderColor: '#977342', 
            },
            '&.Mui-focused fieldset': {
              borderColor: '#977342', 
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