"use client";

import React from 'react';
import { Box, Typography } from '@mui/material';
import { Card, CardContent } from '@mui/material';
import { Avatar } from '@mui/material';

import { StatCardProps } from '@/types/Props/StatCardProps';

export function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 3, borderRadius: '12px', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)', width: '100%' }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body2" sx={{ color: 'gray' }}>
            {title}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black', marginTop: 1 }}>
            {value}
          </Typography>
        </Box>
        <Avatar
          alt=""
          src={icon}
          sx={{ width: 40, height: 40, borderRadius: '8px', objectFit: 'contain' }}
        />
      </CardContent>
    </Card>
  );
}