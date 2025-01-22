import * as React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { AuditionCardProps } from '@/types/Props/AuditionCardProps';
import { useMediaQuery } from '@mui/material';

export const AuditionCard: React.FC<AuditionCardProps> = ({ date, month, title, time, location }) => {
  // Use media query to determine if the screen size is small
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  // Set image size based on screen size
  const imageSize = isSmallScreen ? '16px' : '20px';

  return (
    <Paper elevation={3} sx={{ padding: { xs: 2, md: 6 }, backgroundColor: 'white', borderRadius: '8px', marginBottom: 2 }}>
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={2}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: '40px', md: '60px' },
              height: { xs: '40px', md: '60px' },
              backgroundColor: '#CEAB76',
              borderRadius: '8px 0 0 8px',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', md: '1rem' } }}>{month}</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.5rem' } }}>{date}</Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold', fontSize: { xs: '1.2rem', md: '1.5rem' } }}>{title}</Typography>
            <Typography variant="body2" sx={{ color: '#4B5563', marginTop: 1, fontSize: { xs: '0.875rem', md: '1rem' } }}>
              {time} - {location}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="outlined"
          sx={{
            borderColor: 'black',
            color: 'black',
            padding: { xs: '4px 8px', md: '6px 12px' },
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            marginTop: { xs: 2, md: 0 },
            width: { xs: '100%', md: 'auto' },
          }}
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/ab9e7a566eabf63df0e6c7c8db5e520f82558167d52e8921b069188a8c1a1df7?apiKey=7fae980a988640eea8add1e49a5d542e&"
            alt="Add to Calendar"
            style={{ width: imageSize, marginRight: '8px' }}
          />
          Add to Calendar
        </Button>
      </Box>
    </Paper>
  );
};