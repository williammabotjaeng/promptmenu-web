"use item";

import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { ActivityItemProps } from '@/types/Props/ActivityItemProps';

export function ActivityItem({ avatar, name, action, target, timeAgo }: ActivityItemProps) {
  return (
    <Box sx={{ display: 'flex', gap: 2, paddingRight: 3, backgroundColor: 'rgba(0, 0, 0, 0)', width: '100%' }}>
      <Avatar
        alt=""
        src={avatar}
        sx={{ width: 40, height: 40 }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Typography variant="body1" sx={{ color: 'black' }}>
          <span style={{ fontWeight: 'bold' }}>{name}</span>
          <span style={{ color: 'gray' }}> {action}</span>
          {target && <span style={{ color: '#6B7280' }}> {target}</span>}
        </Typography>
        <Typography variant="body2" sx={{ color: 'gray', marginTop: 1 }}>
          {timeAgo}
        </Typography>
      </Box>
    </Box>
  );
}