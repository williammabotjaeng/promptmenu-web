"use client";

import Link from 'next/link';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import Image from 'next/image';
import SSHGoldLogo from '../assets/GoldLogo.png';

const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#000', height: '30vh', fontFamily: 'Open Sans' }}>
      <Toolbar sx={{ flexDirection: 'column', alignItems: 'center' }}>
        <Image src={SSHGoldLogo} alt="Logo" width={140} height={140} />
        <Typography variant="h4" component="div" sx={{ color: 'var(--primary-text)' }}>
          Support Staffing Hub
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;