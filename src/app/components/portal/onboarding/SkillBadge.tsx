"use client";

import * as React from 'react';
import { Chip } from '@mui/material';
import { SkillBadgeProps } from '@/types/Props/SkillBadgeProps';

export const SkillBadge: React.FC<SkillBadgeProps> = ({ name }) => {
  return (
    <Chip 
      label={name} 
      sx={{ backgroundColor: '#E0E7FF', borderRadius: '20px', paddingX: 2, paddingY: 1 }}
    />
  );
};