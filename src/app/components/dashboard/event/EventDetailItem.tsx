import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { EventDetailProps } from '@/types/Props/EventDetailProps';

export const EventDetailItem: React.FC<EventDetailProps> = ({ label, value }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', pb: 2.5 }}>
    <Typography 
      variant="body1" 
      sx={{ 
        pt: 0.5, 
        pb: 2.5, 
        fontWeight: 'medium', 
        color: 'black' 
      }}
    >
      {label}
    </Typography>
    <Typography 
      variant="body2" 
      sx={{ 
        mt: 2.5, 
        color: 'text.secondary' 
      }}
    >
      {value}
    </Typography>
  </Box>
);