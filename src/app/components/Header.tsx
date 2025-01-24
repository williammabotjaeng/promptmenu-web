"use client";

import * as React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer } from '@mui/material';
import Image from 'next/image';
import SSHGoldLogo from '@/assets/GoldLogo.png';
import { useCookies } from 'react-cookie';
import MenuIcon from '@mui/icons-material/Menu';

export const Header: React.FC = () => {
  const [cookies] = useCookies(["access"]);
  const accessToken = cookies['access'];
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const menuItems = (
    <Box sx={{ width: 250 }} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <Link href="/" passHref>
        <Button sx={{ color: 'black', width: '100%' }}>Home</Button>
      </Link>
      <Link href="/about" passHref>
        <Button sx={{ color: 'black', width: '100%' }}>About</Button>
      </Link>
      <Link href="/talents" passHref>
        <Button sx={{ color: 'black', width: '100%' }}>Talents</Button>
      </Link>
      <Link href="/contact" passHref>
        <Button sx={{ color: 'black', width: '100%' }}>Contact</Button>
      </Link>
      <Link href="/join" passHref>
        <Button className="px-6 rounded primary" sx={{ backgroundColor: '#977342', color: '#ffffff', width: '100%' }}>
          Join Now
        </Button>
      </Link>
      {!accessToken && (
        <Link href="/login" passHref>
          <Button 
            sx={{ 
              color: '#977342',
              width: '100%',
              '&:hover': {
                backgroundColor: '#CEAB76', 
                color: '#fff', 
              },
            }}
          >
            Login
          </Button>
        </Link>
      )}
    </Box>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000', padding: '10px 0' }}>
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Logo and Title Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Link href={accessToken ? '/dashboard' : '/'} passHref>
            <Image src={SSHGoldLogo} alt="Logo" width={60} height={60} style={{ cursor: 'pointer' }} />
          </Link>
          <Typography variant="h6" sx={{ color: '#977342', marginLeft: '10px', fontWeight: 'bold' }}>
            Staffing Solutions Hub
          </Typography>
        </Box>

        {/* Hamburger Menu Icon */}
        <IconButton
          size="large"
          edge="end"
          color="secondary"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: 'block', md: 'none' } }} // Show only on mobile
        >
          <MenuIcon />
        </IconButton>

        {/* Navigation Menu for larger screens */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '20px', alignItems: 'center' }}>
          <Link href="/" passHref>
            <Button sx={{ color: 'white' }}>Home</Button>
          </Link>
          <Link href="/about" passHref>
            <Button sx={{ color: 'white' }}>About</Button>
          </Link>
          <Link href="/talent" passHref>
            <Button sx={{ color: 'white' }}>Talents</Button>
          </Link>
          <Link href="/contact" passHref>
            <Button sx={{ color: 'white' }}>Contact</Button>
          </Link>
          <Link href="/register" passHref>
            <Button className="px-6 rounded primary" sx={{ backgroundColor: '#977342', color: '#ffffff' }}>
              Join Now
            </Button>
          </Link>
          {!accessToken && (
            <Link href="/login" passHref>
              <Button 
                sx={{ 
                  color: '#977342',
                  '&:hover': {
                    backgroundColor: '#CEAB76', 
                    color: '#fff', 
                  },
                }}
              >
                Login
              </Button>
            </Link>
          )}
        </Box>
      </Toolbar>

      {/* Drawer for mobile menu */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {menuItems}
      </Drawer>
    </AppBar>
  );
};