"use client";

import * as React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { AttributeCardProps } from '@/types/Props/AttributeCardProps';

export const AttributeCard: React.FC<AttributeCardProps> = ({ label, value }) => {
  return (
    <Paper 
      elevation={1} 
      sx={{ 
        padding: { xs: 1.5, md: 2 }, 
        backgroundColor: '#F9FAFB', 
        borderRadius: '8px', 
        width: { xs: '100%', sm: '284px' }, 
        boxShadow: 2 
      }}
    >
      <Typography variant="caption" sx={{ color: 'gray', marginBottom: 0.5 }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ color: 'black', fontWeight: 'medium' }}>
        {value}
      </Typography>
    </Paper>
  );
};