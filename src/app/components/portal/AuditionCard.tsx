import * as React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { AuditionCardProps } from '@/types/Props/AuditionCardProps';

export const AuditionCard: React.FC<AuditionCardProps> = ({ date, month, title, time, location }) => {
  return (
    <Paper elevation={3} sx={{ padding: 6, backgroundColor: 'white', borderRadius: '8px', marginBottom: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={2}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '60px',
              height: '60px',
              backgroundColor: '#CEAB76',
              borderRadius: '8px 0 0 8px',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <Typography variant="body2">{month}</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{date}</Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold' }}>{title}</Typography>
            <Typography variant="body2" sx={{ color: '#4B5563', marginTop: 1 }}>
              {time} - {location}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="outlined"
          sx={{
            borderColor: 'black',
            color: 'black',
            padding: '6px 12px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/ab9e7a566eabf63df0e6c7c8db5e520f82558167d52e8921b069188a8c1a1df7?apiKey=7fae980a988640eea8add1e49a5d542e&"
            alt="Add to Calendar"
            style={{ width: '20px', marginRight: '8px' }}
          />
          Add to Calendar
        </Button>
      </Box>
    </Paper>
  );
};