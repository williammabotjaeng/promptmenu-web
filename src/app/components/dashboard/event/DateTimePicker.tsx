import * as React from 'react';
import { TextField, Box, Typography } from '@mui/material';

interface DateTimePickerProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({ label, value, onChange }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Typography 
        variant="body2" 
        sx={{ marginBottom: 1, fontWeight: 'medium', color: '#374151' }}
      >
        {label}
      </Typography>
      <TextField
        type="datetime-local"
        value={value}
        onChange={onChange}
        variant="outlined"
        fullWidth
        sx={{ marginTop: 1 }}
        InputLabelProps={{
          shrink: true, 
        }}
      />
    </Box>
  );
};