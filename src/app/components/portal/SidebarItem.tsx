"use client";

import * as React from 'react';
import { Box, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import WorkIcon from '@mui/icons-material/Work';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TheatersIcon from '@mui/icons-material/Theaters';
import PersonIcon from '@mui/icons-material/Person';
import PortfolioIcon from '@mui/icons-material/AccountBox'; 
import SettingsIcon from '@mui/icons-material/Settings';

import { SidebarItemProps } from "@/types/Props/SidebarItemProps";

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label }) => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'mail':
        return <MailIcon sx={{ fontSize: '16px', color: '#fff' }} />;
      case 'work':
        return <WorkIcon sx={{ fontSize: '16px', color: '#fff' }} />;
      case 'visibility':
        return <VisibilityIcon sx={{ fontSize: '16px', color: '#fff' }} />;
      case 'dashboard':
        return <DashboardIcon sx={{ fontSize: '16px', color: '#fff' }} />;
      case 'theaters':
        return <TheatersIcon sx={{ fontSize: '16px', color: '#fff' }} />;
      case 'person':
        return <PersonIcon sx={{ fontSize: '16px', color: '#fff' }} />;
      case 'portfolio':
        return <PortfolioIcon sx={{ fontSize: '16px', color: '#fff' }} />;
      case 'settings':
        return <SettingsIcon sx={{ fontSize: '16px', color: '#fff' }} />;
      default:
        return null; 
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: '16px', width: '100%', backgroundColor: 'transparent' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '16px' }}>
        {renderIcon(icon)} 
      </Box>
      <Typography variant="body1" sx={{ marginLeft: 2, color: '#977342', flexGrow: 1 }}>
        {label}
      </Typography>
    </Box>
  );
};