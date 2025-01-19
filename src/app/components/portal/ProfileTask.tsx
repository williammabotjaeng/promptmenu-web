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
      default:
        return null; 
    }
  };

  return (
    <div className="flex flex-wrap gap-2 py-0.5 w-full bg-black bg-opacity-0 max-md:max-w-full">
      <div className="flex overflow-hidden justify-center items-center self-start min-h-[14px]">
        {renderIcon(icon)}
      </div>
      <div className={`flex-auto text-sm leading-none ${completed ? 'text-black' : 'text-gray-400'} w-[1050px] max-md:max-w-full`}>
        {label}
      </div>
    </div>
  );
};