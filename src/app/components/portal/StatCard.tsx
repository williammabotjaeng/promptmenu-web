"use client";

import * as React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import WorkIcon from '@mui/icons-material/Work';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TheatersIcon from '@mui/icons-material/Theaters';
import PersonIcon from '@mui/icons-material/Person';
import PortfolioIcon from '@mui/icons-material/AccountBox'; 
import SettingsIcon from '@mui/icons-material/Settings';

import { PortalStatCardProps } from '@/types/Props/PortalStatCardProps';

export const StatCard: React.FC<PortalStatCardProps> = ({ title, value, icon, subtitle, subtitleColor }) => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'mail':
        return <MailIcon sx={{ fontSize: '18px', color: '#977342' }} />;
      case 'work':
        return <WorkIcon sx={{ fontSize: '18px', color: '#977342' }} />;
      case 'visibility':
        return <VisibilityIcon sx={{ fontSize: '18px', color: '#977342' }} />;
      case 'dashboard':
        return <DashboardIcon sx={{ fontSize: '18px', color: '#977342' }} />;
      case 'theaters':
        return <TheatersIcon sx={{ fontSize: '18px', color: '#977342' }} />;
      case 'person':
        return <PersonIcon sx={{ fontSize: '18px', color: '#977342' }} />;
      case 'portfolio':
        return <PortfolioIcon sx={{ fontSize: '18px', color: '#977342' }} />;
      case 'settings':
        return <SettingsIcon sx={{ fontSize: '18px', color: '#977342' }} />;
      default:
        return null; 
    }
  };

  return (
    <Card sx={{ padding: 1, margin: '8px', width: '60%', borderRadius: '12px', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ color: 'gray.500', fontSize: '16px' }}>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '12px' }}>
            {renderIcon(icon)} {/* Call the renderIcon function */}
          </Box>
        </Box>
        <Typography variant="h4" sx={{ marginTop: 2, fontWeight: 'bold', color: 'black', fontSize: '24px' }}>
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