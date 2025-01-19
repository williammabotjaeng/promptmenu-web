"use client";

import * as React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { PortalStatCardProps } from '@/types/Props/PortalStatCardProps';

export const StatCard: React.FC<PortalStatCardProps> = ({ title, value, icon, subtitle, subtitleColor }) => {
  return (
    <Card sx={{ padding: 3, margin: 'auto', width: '100%', borderRadius: '12px', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ color: 'gray.500' }}>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '16px' }}>
            <img loading="lazy" src={icon} alt="" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
          </Box>
        </Box>
        <Typography variant="h4" sx={{ marginTop: 2, fontWeight: 'bold', color: 'black' }}>
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="caption" sx={{ marginTop: 2, color: subtitleColor || 'gray.500' }}>
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};