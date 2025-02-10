"use client";

import * as React from 'react';
import { Box, Button, Typography, Chip, Paper } from '@mui/material';
import { PortalJobCardProps } from '@/types/Props/PortalJobCardProps';

export const JobCard: React.FC<any> = ({ title, location, tags }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2, backgroundColor: 'white', borderRadius: '8px', marginBottom: 2 }}>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center">
          <Box display="flex" flexDirection="column" flexGrow={1}>
            <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold', fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#4B5563', marginTop: 1 }}>
              {location}
            </Typography>
          </Box>
          <Button variant="contained" sx={{ backgroundColor: 'black', color: 'white', marginTop: { xs: 2, md: 0 }, width: { xs: '100%', md: 'auto' } }}>
            Apply Now
          </Button>
        </Box>
        <Box display="flex" gap={1} mt={2} flexWrap="wrap">
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              sx={{
                backgroundColor: index === 0 ? '#CEAB76' : '#977342',
                color: 'white',
                margin: '2px', 
              }}
            />
          ))}
        </Box>
      </Box>
    </Paper>
  );
};