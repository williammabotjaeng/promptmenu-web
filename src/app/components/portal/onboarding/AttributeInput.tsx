import * as React from 'react';
import { TextField, FormControl, FormLabel } from '@mui/material';
import { AttributeInputProps } from '@/types/Props/AttributeInputProps';

export const AttributeInput: React.FC<AttributeInputProps> = ({ label, placeholder, value, onChange }) => {
  return (
    <FormControl variant="outlined" sx={{ mb: 2 }}>
      <FormLabel htmlFor={`${label.toLowerCase()}-input`} sx={{ color: '#977342' }}>
        {label}
      </FormLabel>
      <TextField
        id={`${label.toLowerCase()}-input`}
        placeholder={placeholder}
        variant="outlined"
        value={value}
        type="number"
        onChange={onChange}
        sx={{
          bgcolor: 'black',
          borderRadius: '8px',
          color: '#CEAB76',
          width: { xs: '100%', md: '24vw' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#977342', 
              color: '#CEAB76',
            },
            '&:hover fieldset': {
              borderColor: '#977342',
              color: '#CEAB76', 
            },
            '&.Mui-focused fieldset': {
              borderColor: '#977342', 
              color: '#CEAB76',
            },
          },
          '& .MuiInputBase-input': {
            color: '#CEAB76',
          },
        }}
      />
    </FormControl>
  );
};