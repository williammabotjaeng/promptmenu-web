"use client";

import * as React from 'react';
import { Box, Button, Typography, Chip, Paper } from '@mui/material';
import { PortalJobCardProps } from '@/types/Props/PortalJobCardProps';

export const JobCard: React.FC<PortalJobCardProps> = ({ title, location, tags }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2, backgroundColor: 'white', borderRadius: '8px', marginBottom: 2 }}>
      <Box display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" flexDirection="column">
            <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold' }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#4B5563', marginTop: 1 }}>
              {location}
            </Typography>
          </Box>
          <Button variant="contained" sx={{ backgroundColor: 'black', color: 'white' }}>
            Apply Now
          </Button>
        </Box>
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
    </Paper>
  );
};