import * as React from 'react';
import { useState } from 'react';
import { 
  Box, 
  Typography, 
  FormControl, 
  FormControlLabel, 
  Radio, 
  RadioGroup, 
  TextField, 
  Grid, 
  Paper, 
  styled,
  Collapse
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Styled components
const TimeSlotCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  height: '100%',
  borderRadius: '8px',
  backgroundColor: '#f8f8f8',
  border: '1px solid #e0e0e0',
}));

// Type for time slots data
interface TimeSlot {
  startTime: Date | null;
  endTime: Date | null;
}

interface TimeSlots {
  monday: TimeSlot;
  tuesday: TimeSlot;
  wednesday: TimeSlot;
  thursday: TimeSlot;
  friday: TimeSlot;
  saturday: TimeSlot;
  sunday: TimeSlot;
}

interface TimeSlotsConfig {
  mode: 'universal' | 'perDay';
  universalTimeSlot: TimeSlot;
  dailyTimeSlots: TimeSlots;
}

interface TimeSlotsFieldProps {
  selectedDays: string[]; // Array of selected days e.g. ['monday', 'tuesday', 'friday']
  value: TimeSlotsConfig;
  onChange: (timeSlots: TimeSlotsConfig) => void;
}

const defaultTimeSlot: TimeSlot = {
  startTime: new Date(new Date().setHours(9, 0, 0, 0)),
  endTime: new Date(new Date().setHours(17, 0, 0, 0)),
};

const createDefaultTimeSlots = (): TimeSlots => ({
  monday: { ...defaultTimeSlot },
  tuesday: { ...defaultTimeSlot },
  wednesday: { ...defaultTimeSlot },
  thursday: { ...defaultTimeSlot },
  friday: { ...defaultTimeSlot },
  saturday: { ...defaultTimeSlot },
  sunday: { ...defaultTimeSlot },
});

const TimeSlotsField: React.FC<TimeSlotsFieldProps> = ({ selectedDays, value, onChange }) => {
  // If there's no value provided, initialize with defaults
  const timeSlots = value || {
    mode: 'universal',
    universalTimeSlot: { ...defaultTimeSlot },
    dailyTimeSlots: createDefaultTimeSlots(),
  };

  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMode = event.target.value as 'universal' | 'perDay';
    
    onChange({
      ...timeSlots,
      mode: newMode,
    });
  };

  const handleUniversalTimeChange = (type: 'startTime' | 'endTime', newTime: Date | null) => {
    onChange({
      ...timeSlots,
      universalTimeSlot: {
        ...timeSlots.universalTimeSlot,
        [type]: newTime,
      },
    });
  };

  const handleDayTimeChange = (day: string, type: 'startTime' | 'endTime', newTime: Date | null) => {
    onChange({
      ...timeSlots,
      dailyTimeSlots: {
        ...timeSlots.dailyTimeSlots,
        [day]: {
          ...timeSlots.dailyTimeSlots[day as keyof TimeSlots],
          [type]: newTime,
        },
      },
    });
  };

  const getDayLabel = (day: string): string => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="body1" 
          sx={{ 
            marginBottom: 2, 
            color: '#374151', 
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center' 
          }}
        >
          Working Hours
        </Typography>
        
        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <RadioGroup
            row
            name="timeSlotMode"
            value={timeSlots.mode}
            onChange={handleModeChange}
          >
            <FormControlLabel
              value="universal"
              control={<Radio sx={{ 
                '&.Mui-checked': {
                  color: '#977342',
                },
              }} />}
              label="Same hours for all days"
            />
            <FormControlLabel
              value="perDay"
              control={<Radio sx={{ 
                '&.Mui-checked': {
                  color: '#977342',
                },
              }} />}
              label="Set hours for each day"
            />
          </RadioGroup>
        </FormControl>

        <Collapse in={timeSlots.mode === 'universal'}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
            <TimePicker
              label="Start Time"
              value={timeSlots.universalTimeSlot.startTime}
              onChange={(newTime) => handleUniversalTimeChange('startTime', newTime)}
              ampm
              sx={{ 
                width: 140,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '&:hover fieldset': {
                    borderColor: '#977342',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#977342',
                  },
                }
              }}
            />
            <Typography variant="body1" sx={{ mx: 1 }}>to</Typography>
            <TimePicker
              label="End Time"
              value={timeSlots.universalTimeSlot.endTime}
              onChange={(newTime) => handleUniversalTimeChange('endTime', newTime)}
              ampm
              sx={{ 
                width: 140,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '&:hover fieldset': {
                    borderColor: '#977342',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#977342',
                  },
                }
              }}
            />
          </Box>
        </Collapse>

        <Collapse in={timeSlots.mode === 'perDay'}>
          <Grid container spacing={2}>
            {selectedDays.map((day) => (
              <Grid item xs={12} sm={6} md={4} key={day}>
                <TimeSlotCard elevation={0}>
                  <Typography variant="subtitle1" fontWeight={500}>
                    {getDayLabel(day)}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TimePicker
                      label="Start Time"
                      value={timeSlots.dailyTimeSlots[day as keyof TimeSlots].startTime}
                      onChange={(newTime) => handleDayTimeChange(day, 'startTime', newTime)}
                      ampm
                      slotProps={{ 
                        textField: { 
                          size: 'small', 
                          fullWidth: true,
                          sx: {
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                              '&:hover fieldset': {
                                borderColor: '#977342',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#977342',
                              },
                            }
                          }
                        } 
                      }}
                    />
                    <TimePicker
                      label="End Time"
                      value={timeSlots.dailyTimeSlots[day as keyof TimeSlots].endTime}
                      onChange={(newTime) => handleDayTimeChange(day, 'endTime', newTime)}
                      ampm
                      slotProps={{ 
                        textField: { 
                          size: 'small', 
                          fullWidth: true,
                          sx: {
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                              '&:hover fieldset': {
                                borderColor: '#977342',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#977342',
                              },
                            }
                          }
                        } 
                      }}
                    />
                  </Box>
                </TimeSlotCard>
              </Grid>
            ))}
          </Grid>
        </Collapse>
      </Box>
    </LocalizationProvider>
  );
};

export default TimeSlotsField;