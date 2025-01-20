"use client";

import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { SocialMediaLinkProps } from '@/types/Props/SocialMediaLinkProps';

export const SocialMediaLink: React.FC<SocialMediaLinkProps> = ({ icon, username }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', paddingY: 1, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '16px', marginRight: 2 }}>
        <img
          loading="lazy"
          src={icon}
          alt=""
          style={{ width: '14px', height: '14px', objectFit: 'contain' }}
        />
      </Box>
      <Typography variant="body1" sx={{ color: 'text.secondary', flexGrow: 1 }}>
        {username}
      </Typography>
    </Box>
  );
};