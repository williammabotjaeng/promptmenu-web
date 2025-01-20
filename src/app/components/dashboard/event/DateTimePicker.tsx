import * as React from 'react';
import { TextField, InputAdornment, Box, Typography } from '@mui/material';
import { DateTimePickerProps } from '@/types/Props/DateTimePickerProps';

export const DateTimePicker: React.FC<DateTimePickerProps> = ({ label }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Typography 
        variant="body2" 
        sx={{ marginBottom: 1, fontWeight: 'medium', color: '#4B5563' }}
      >
        {label}
      </Typography>
      <TextField
        id={label.toLowerCase().replace(/\s/g, '-')}
        variant="outlined"
        placeholder="mm/dd/yyyy --:-- --"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/9b771fe55e6d938374c86cc92ec04456d2b4a9492fac4b6381949cd18e43a66d?apiKey=7fae980a988640eea8add1e49a5d542e&"
                alt=""
                style={{ width: '24px', height: '24px' }}
              />
            </InputAdornment>
          ),
        }}
        sx={{ marginTop: 1 }}
      />
    </Box>
  );
};