import * as React from 'react';
import { DateTimePicker } from '@/components/dashboard/event/DateTimePicker';
import { CheckboxItem } from '@/components/dashboard/event/CheckBoxItem';
import { TextField, Button, Box, Typography, Paper, Link } from '@mui/material';
import { mt } from 'date-fns/locale';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HeaderWithProgressBar from './HeaderWithProgressBar';
import { PostEventStepProps } from '@/types/Props/PostEventStepProps';

export const EventDetails: React.FC<PostEventStepProps> = ({ activeStep, setActiveStep}) => {

  const handleContinue = () => {
    setActiveStep(activeStep + 1);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#fff',
        paddingBottom: '40px',
        width: '100%'
      }}
    >
      {/* Header with Step Navigation */}
      <HeaderWithProgressBar progressValue={33} />
      <Paper
        elevation={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '8px',
          width: '60%',
          padding: 2,
          boxShadow: '0px 4px 10px rgba(156, 163, 175, 0.5)',
        }}
      >


        {/* Form Content */}
        <Box sx={{ padding: 2 }}>
          <Typography variant="h5" sx={{ color: '#977342', marginBottom: 2, fontSize: '24px', fontWeight: 'bold' }}>Create New Event</Typography>
          <Typography variant="body1" sx={{ marginBottom: 1, mt: 2, color: '#374151' }}>Event Title</Typography>
          <TextField
            label="Event Title"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Typography variant="body1" sx={{ marginBottom: 1, color: '#374151' }}>Description</Typography>
          <TextField
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Typography variant="body1" sx={{ marginBottom: 1, color: '#374151' }}>Location</Typography>
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
            <DateTimePicker label="Start Date & Time" />
            <DateTimePicker label="End Date & Time" />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <CheckboxItem label="Meals Provided" />
            <CheckboxItem label="Transport Provided" />
            <CheckboxItem label="Accommodation Provided" />
          </Box>
        </Box>

        {/* Submit Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
      <Button
        variant="contained"
        sx={{ backgroundColor: '#977342', color: 'white', '&:hover': { backgroundColor: '#fff', border: '1px solid #977342', color: '#977342' } }}
        onClick={handleContinue}
      >
        Next Step
        <ArrowForwardIcon sx={{ marginLeft: '8px' }} />
      </Button>
    </Box>
      </Paper>
    </Box>
  );
};