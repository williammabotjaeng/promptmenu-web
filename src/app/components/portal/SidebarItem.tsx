"use client";

import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { SidebarItemProps } from "@/types/Props/SidebarItemProps";

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: '16px', width: '100%', backgroundColor: 'transparent' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '16px' }}>
        <Icon sx={{ fontSize: '16px', color: 'gray.300' }} />
      </Box>
      <Typography variant="body1" sx={{ marginLeft: 2, color: 'gray.300', flexGrow: 1 }}>
        {label}
      </Typography>
    </Box>
  );
};