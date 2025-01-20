"use client";

import * as React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { DocumentItemProps } from '@/types/Props/DocumentItemProps';

export const DocumentItem: React.FC<DocumentItemProps> = ({ icon, title, date }) => {
  return (
    <Paper 
      elevation={1} 
      sx={{ display: 'flex', alignItems: 'center', padding: 2, backgroundColor: '#F9FAFB', borderRadius: '8px', marginBottom: 2 }}
    >
      <img
        loading="lazy"
        src={icon}
        alt=""
        style={{ width: '24px', height: '24px', marginRight: '16px' }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body1" sx={{ fontWeight: 'medium', color: 'black' }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ marginTop: 1, color: 'gray' }}>
          {date}
        </Typography>
      </Box>
    </Paper>
  );
};