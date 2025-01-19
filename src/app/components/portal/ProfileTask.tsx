"use client";

import * as React from 'react';
import MailIcon from '@mui/icons-material/Mail';
import WorkIcon from '@mui/icons-material/Work';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TheatersIcon from '@mui/icons-material/Theaters';
import PersonIcon from '@mui/icons-material/Person';
import PortfolioIcon from '@mui/icons-material/AccountBox'; 
import SettingsIcon from '@mui/icons-material/Settings';
import DoneIcon from '@mui/icons-material/Done';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import { Box, Typography } from '@mui/material';
import { ProfileTaskProps } from '@/types/Props/ProfileTaskProps';

export const ProfileTask: React.FC<ProfileTaskProps> = ({ icon, label, completed }) => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'mail':
        return <MailIcon sx={{ fontSize: '18px', color: 'gray.500' }} />;
      case 'work':
        return <WorkIcon sx={{ fontSize: '18px', color: 'gray.500' }} />;
      case 'visibility':
        return <VisibilityIcon sx={{ fontSize: '18px', color: 'gray.500' }} />;
      case 'dashboard':
        return <DashboardIcon sx={{ fontSize: '18px', color: 'gray.500' }} />;
      case 'theaters':
        return <TheatersIcon sx={{ fontSize: '18px', color: 'gray.500' }} />;
      case 'person':
        return <PersonIcon sx={{ fontSize: '18px', color: 'gray.500' }} />;
      case 'portfolio':
        return <PortfolioIcon sx={{ fontSize: '18px', color: 'gray.500' }} />;
      case 'settings':
        return <SettingsIcon sx={{ fontSize: '18px', color: 'gray.500' }} />;
      case 'done':
        return <DoneIcon sx={{ fontSize: '18px', color: '#22C55E' }} />;
      case 'circle':
        return <PanoramaFishEyeIcon sx={{ fontSize: '18px', color: '#9CA3AF' }} />;
      default:
        return null; 
    }
  };

  return (
    <Box 
      display="flex" 
      alignItems="center" 
      sx={{ 
        padding: 1, 
        backgroundColor: 'white', 
        borderRadius: '4px', 
        width: '100%', 
        marginBottom: 1 
      }}
    >
      <Box display="flex" alignItems="center" sx={{ minHeight: '14px' }}>
        {renderIcon(icon)}
      </Box>
      <Typography 
        variant="body2" 
        sx={{ 
          flexGrow: 1, 
          marginLeft: 1, 
          color: label === 'Video Introduction' ? '#9CA3AF' : 'black' 
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};