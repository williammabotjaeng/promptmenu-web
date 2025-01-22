import * as React from 'react';
import { TextField, Box, Typography } from '@mui/material';

export const DateTimePicker: React.FC<{ label: string }> = ({ label }) => {
  const [selectedDate, setSelectedDate] = React.useState<string>('');

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Typography 
        variant="body2" 
        sx={{ marginBottom: 1, fontWeight: 'medium', color: '#374151' }}
      >
        {label}
      </Typography>
      <TextField
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
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