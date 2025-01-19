"use client";

import * as React from 'react';
import { Box, Button, Typography, Chip, Paper } from '@mui/material';
import { PortalJobCardProps } from '@/types/Props/PortalJobCardProps';

export const JobCard: React.FC<PortalJobCardProps> = ({ title, location, tags }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2, backgroundColor: 'white', borderRadius: '8px' }}>
      <Box display="flex" flexDirection="column" pb={4}>
        <Box display="flex" flexDirection="column">
          <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: '#4B5563', marginTop: 1 }}>
            {location}
          </Typography>
          <Box display="flex" gap={1} mt={2}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                sx={{
                  backgroundColor: index === 0 ? '#CEAB76' : '#977342',
                  color: 'white',
                }}
              />
            ))}
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="contained" sx={{ backgroundColor: '#CEAB76', color: 'white', marginRight: 1 }}>
            Apply Now
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};