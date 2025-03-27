import * as React from 'react';
import { TextField } from '@mui/material';
import { CardInputProps } from '@/types/Props/CardInputProps';

export const CardInput: React.FC<CardInputProps> = ({ placeholder, type = "text", id, ariaLabel }) => {
  return (
    <TextField
      id={id}
      type={type}
      placeholder={placeholder}
      aria-label={ariaLabel}
      variant="outlined"
      fullWidth
      InputProps={{
        sx: {
          bgcolor: 'black',
          borderRadius: '8px',
          border: '1px solid #977342', 
          color: 'gray.400',
          '&:hover': {
            borderColor: '#977342', 
          },
          '&.Mui-focused': {
            borderColor: '#977342', 
          },
        },
      }}
      InputLabelProps={{
        shrink: true, 
        sx: {
          color: 'gray.400',
        },
      }}
      sx={{
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
      }}
    />
  );
};