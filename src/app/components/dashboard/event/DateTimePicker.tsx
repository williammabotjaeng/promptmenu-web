import * as React from 'react';
import { TextField, InputAdornment, Box, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { DateTimePickerProps } from '@/types/Props/DateTimePickerProps';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; 

export const DateTimePicker: React.FC<DateTimePickerProps> = ({ label }) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}> {/* Wrap with LocalizationProvider */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Typography 
          variant="body2" 
          sx={{ marginBottom: 1, fontWeight: 'medium', color: '#374151' }}
        >
          {label}
        </Typography>
        <DatePicker
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="mm/dd/yyyy"
              fullWidth
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarTodayIcon sx={{ color: '#977342' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ marginTop: 1 }}
            />
          )}
        />
      </Box>
    </LocalizationProvider>
  );
};