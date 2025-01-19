"use client";

import * as React from 'react';
import { Box, Typography, Link } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import WorkIcon from '@mui/icons-material/Work';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TheatersIcon from '@mui/icons-material/Theaters';
import PersonIcon from '@mui/icons-material/Person';
import PortfolioIcon from '@mui/icons-material/AccountBox'; 
import SettingsIcon from '@mui/icons-material/Settings';

import { SidebarItemProps } from "@/types/Props/SidebarItemProps";

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, href }) => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'mail':
        return <MailIcon sx={{ fontSize: '16px', color: '#D1D5DB' }} />;
      case 'work':
        return <WorkIcon sx={{ fontSize: '16px', color: '#D1D5DB' }} />;
      case 'visibility':
        return <VisibilityIcon sx={{ fontSize: '16px', color: '#D1D5DB' }} />;
      case 'dashboard':
        return <DashboardIcon sx={{ fontSize: '16px', color: '#D1D5DB' }} />;
      case 'theaters':
        return <TheatersIcon sx={{ fontSize: '16px', color: '#D1D5DB' }} />;
      case 'person':
        return <PersonIcon sx={{ fontSize: '16px', color: '#D1D5DB' }} />;
      case 'portfolio':
        return <PortfolioIcon sx={{ fontSize: '16px', color: '#D1D5DB' }} />;
      case 'settings':
        return <SettingsIcon sx={{ fontSize: '16px', color: '#D1D5DB' }} />;
      default:
        return null; 
    }
  };

  return (
    <Link 
      href={href} 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '16px', 
        width: '100%', 
        backgroundColor: 'transparent', 
        textDecoration: 'none', 
        color: '#D1D5DB',
        '&:hover': {
          backgroundColor: '#977342',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '12px'
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '16px' }}>
        {renderIcon(icon)} 
      </Box>
      <Typography variant="body1" sx={{ marginLeft: 2, flexGrow: 1 }}>
        {label}
      </Typography>
    </Link>
  );
};