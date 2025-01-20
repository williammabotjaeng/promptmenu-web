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
          border: '1px solid #4B5563', 
          color: 'gray.400',
          '&:hover': {
            borderColor: 'orange', 
          },
          '&.Mui-focused': {
            borderColor: 'orange', 
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
            borderColor: '#4B5563', 
          },
          '&:hover fieldset': {
            borderColor: 'orange', 
          },
          '&.Mui-focused fieldset': {
            borderColor: 'orange', 
          },
        },
      }}
    />
  );
};