import * as React from 'react';
import TextField from '@mui/material/TextField';
import { FormInputProps } from '@/types/Props/FormInputProps';

export const FormInput: React.FC<FormInputProps> = ({ label, type = "text", id }) => {
  return (
    <div className="flex flex-col mt-4">
      <TextField
        id={id}
        label={label}
        type={type}
        variant="outlined"
        fullWidth
        InputProps={{
          style: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
          },
        }}
        InputLabelProps={{
          style: {
            color: 'white', 
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.5)', 
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.7)', 
            },
            '&.Mui-focused fieldset': {
              borderColor: 'rgba(255, 255, 255, 1)', 
            },
          },
        }}
      />
    </div>
  );
};