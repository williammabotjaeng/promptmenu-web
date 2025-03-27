import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { EventDetailProps } from '@/types/Props/EventDetailProps';

export const EventDetailItem: React.FC<EventDetailProps> = ({ label, value }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', pb: 2.5, width: '100%' }}>
    <Typography 
      variant="body1" 
      sx={{ 
        pt: 0.5, 
        pb: 1,
        fontWeight: 'medium', 
        color: 'black',
        textAlign: { xs: 'center', sm: 'left' }, 
      }}
    >
      {label}
    </Typography>
    <Typography 
      variant="body2" 
      sx={{ 
        mt: 0.5, 
        color: '#977342',
        textAlign: { xs: 'center', sm: 'left' }, 
      }}
    >
      {value}
    </Typography>
  </Box>
);