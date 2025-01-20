import * as React from 'react';
import { DateTimePicker } from '@/components/dashboard/event/DateTimePicker';
import { CheckboxItem } from '@/components/dashboard/event/CheckBoxItem';
import { TextField, Button, Box, Typography, Paper, Link } from '@mui/material';
import { mt } from 'date-fns/locale';
import CloseIcon from '@mui/icons-material/Close';
import HeaderWithProgressBar from './HeaderWithProgressBar';

export const EventDetails: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#fff',
        paddingBottom: '40px'
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
            <DateTimePicker label="Start Date & Time" value="" />
            <DateTimePicker label="End Date & Time" value="" />
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
            sx={{ backgroundColor: '#4B5563', color: 'white', '&:hover': { backgroundColor: '#6B7280' } }}
          >
            Next Step
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/ec7cef34f158b960e31afe86385f36976cc9704ea33db3970e7ac38ddcc17d2c?apiKey=7fae980a988640eea8add1e49a5d542e&"
              alt=""
              style={{ width: '14px', marginLeft: '8px' }}
            />
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};