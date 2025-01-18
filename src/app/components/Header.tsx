import * as React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Image from 'next/image';
import SSHGoldLogo from '@/assets/GoldLogo.png';
import { useCookies } from 'react-cookie';

export const Header: React.FC = () => {
  const [cookies] = useCookies(["access"]);
  const accessToken = cookies['access'];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000', padding: '10px 0' }}>
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo and Title Section */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link href={accessToken ? '/dashboard' : '/'} passHref>
            <Image src={SSHGoldLogo} alt="Logo" width={60} height={60} style={{ cursor: 'pointer' }} />
          </Link>
          <Typography variant="h6" sx={{ color: '#977342', marginLeft: '10px', fontWeight: 'bold' }}>
            Staffing Solutions Hub
          </Typography>
        </Box>

        {/* Navigation Menu */}
        <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link href="/" passHref>
            <Button sx={{ color: 'white' }}>Home</Button>
          </Link>
          <Link href="/about" passHref>
            <Button sx={{ color: 'white' }}>About</Button>
          </Link>
          <Link href="/services" passHref>
            <Button sx={{ color: 'white' }}>Services</Button>
          </Link>
          <Link href="/talents" passHref>
            <Button sx={{ color: 'white' }}>Talents</Button>
          </Link>
          <Link href="/contact" passHref>
            <Button sx={{ color: 'white' }}>Contact</Button>
          </Link>
          <Link href="/join" passHref>
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
    </AppBar>
  );
};