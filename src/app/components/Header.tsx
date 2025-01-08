"use client";

import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Image from 'next/image';
import SSHGoldLogo from '@/assets/GoldLogo.png';
import { useCookies } from 'react-cookie';

const Header: React.FC = () => {
  const [cookies] = useCookies(["access"]);
  const accessToken = cookies['access'];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000', height: '30vh', borderBottom: '8px solid #977342' }}>
      <Toolbar sx={{ flexDirection: 'column', alignItems: 'center' }}>
        <Link href={accessToken ? '/dashboard' : '/'} passHref>
          <Image src={SSHGoldLogo} alt="Logo" width={140} height={140} style={{ cursor: 'pointer' }} />
        </Link>
        <Typography variant="h4" component="div" sx={{ color: 'var(--primary-text)', fontFamily: 'Open Sans', fontWeight: '700', marginTop: '-20px' }}>
          Staffing Solutions Hub
        </Typography>
        <Box sx={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', gap: '10px' }}>
          {!accessToken && (
            <>
              <Link href="/login" passHref>
                <Button 
                  sx={{ 
                    color: '#977342',
                    '&:hover': {
                      backgroundColor: '#CEAB76', 
                      color: '#000', 
                    },
                  }}
                >
                  Login
                </Button>
              </Link>
            </>
          )}
          <Link href="/contact" passHref>
            <Button 
              sx={{ 
                color: '#977342',
                '&:hover': {
                  backgroundColor: '#CEAB76', 
                  color: '#000', 
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