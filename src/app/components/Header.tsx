"use client";

import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Image from 'next/image';
import SSHGoldLogo from '../assets/GoldLogo.png';

const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#000', height: '30vh', borderBottom: '8px solid #977342' }}>
      <Toolbar sx={{ flexDirection: 'column', alignItems: 'center' }}>
        <Link href="/" passHref>
          <Image src={SSHGoldLogo} alt="Logo" width={140} height={140} style={{ cursor: 'pointer' }} />
        </Link>
        <Typography variant="h4" component="div" sx={{ color: 'var(--primary-text)', fontFamily: 'Open Sans', fontWeight: '700', marginTop: '-20px' }}>
          Support Staffing Hub
        </Typography>
        <Box sx={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', gap: '10px' }}>
          <Link href="/register" passHref>
            <Button 
              sx={{ 
                color: '#977342',
                '&:hover': {
                  backgroundColor: '#CEAB76', // Light Beige background on hover
                  color: '#000', // Change text color to black on hover
                },
              }}
            >
              Register
            </Button>
          </Link>
          <Link href="/login" passHref>
            <Button 
              sx={{ 
                color: '#977342',
                '&:hover': {
                  backgroundColor: '#CEAB76', // Light Beige background on hover
                  color: '#000', // Change text color to black on hover
                },
              }}
            >
              Login
            </Button>
          </Link>
          <Link href="/contact" passHref>
            <Button 
              sx={{ 
                color: '#977342',
                '&:hover': {
                  backgroundColor: '#CEAB76', // Light Beige background on hover
                  color: '#000', // Change text color to black on hover
                },
              }}
            >
              Contact Us
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;