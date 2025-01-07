"use client";

import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Image from 'next/image';
import SSHBlackLogo from '@/assets/SSHBlackLogo.png';
import { useCookies } from 'react-cookie';

const Header: React.FC = () => {
  const [cookies] = useCookies(["access"]);
  const accessToken = cookies['access'];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#977342', borderBottom: '8px solid #000' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo on the left */}
        <Link href="/dashboard" passHref>
          <Image src={SSHBlackLogo} alt="Logo" width={88} height={100} style={{ cursor: 'pointer' }} />
        </Link>

        {/* Menu on the right */}
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Link href="/post-job" passHref>
            <Button 
              sx={{ 
                color: 'black',
                backgroundColor: '#977342',
                '&:hover': {
                  backgroundColor: '#CEAB76', 
                  color: '#000', 
                },
              }}
            >
              Post a Job
            </Button>
          </Link>
          <Link href="/find-talent" passHref>
            <Button 
              sx={{ 
                color: 'black',
                backgroundColor: '#977342',
                '&:hover': {
                  backgroundColor: '#CEAB76',
                  color: '#000',
                },
              }}
            >
              Find Talent
            </Button>
          </Link>
          <Link href="/contact" passHref>
            <Button 
              sx={{ 
                color: '#000',
                '&:hover': {
                  backgroundColor: '#CEAB76', 
                  color: '#000',
                },
              }}
            >
              Contact Us
            </Button>
          </Link>
          {!accessToken && (
            <>
              <Link href="/register" passHref>
                <Button 
                  sx={{ 
                    color: '#977342',
                    '&:hover': {
                      backgroundColor: '#CEAB76', 
                      color: '#000', 
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;