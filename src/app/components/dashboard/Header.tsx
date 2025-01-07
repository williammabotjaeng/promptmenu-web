"use client";

import Link from 'next/link';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import Image from 'next/image';
import SSHBlackLogo from '@/assets/SSHBlackLogo.png';
import { useCookies } from 'react-cookie';
import { useAuth } from '@/providers/auth-providers'; 
import { useRouter } from 'next/navigation';
import ProfileDropdown from './ProfileDropdown';
import NotificationDropdown from './NotificationDropdown';

const Header: React.FC = () => {
  const [cookies] = useCookies(["access"]);
  const accessToken = cookies['access'];
  const { logout } = useAuth(); 

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  }

  if (!accessToken)
  {
    router.push('/login');
  }



  return (
    <AppBar position="static" sx={{ backgroundColor: '#977342', borderBottom: '8px solid #000' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo on the left */}
        <Link href="/dashboard" passHref>
          <Image src={SSHBlackLogo} alt="Logo" width={88} height={100} style={{ cursor: 'pointer' }} />
        </Link>

        {/* Menu on the right */}
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <NotificationDropdown />
          <ProfileDropdown />
          <Link href="/post-job" passHref>
            <Button 
              sx={{ 
                color: 'black',
                backgroundColor: '#977342',
                '&:hover': {
                  backgroundColor: '#CEAB76', 
                  color: '#000', 
                  fontWeight: '700'
                },
              }}
            >
              Post a Job
            </Button>
          </Link>
          <Box sx={{
            borderLeft: '2px solid black'
          }}>
          <Link href="/find-talent" passHref>
            <Button 
              sx={{ 
                color: 'black',
                backgroundColor: '#977342',
                '&:hover': {
                  backgroundColor: '#CEAB76',
                  color: '#000',
                  fontWeight: '700'
                },
              }}
            >
              Find Talent
            </Button>
          </Link>
          </Box>
          <Box sx={{
            borderLeft: '2px solid black'
          }}>
          <Link href="/contact" passHref>
            <Button 
              sx={{ 
                color: '#000',
                '&:hover': {
                  backgroundColor: '#CEAB76', 
                  color: '#000',
                  fontWeight: '700'
                },
              }}
            >
              Contact Us
            </Button>
          </Link>
          </Box>
          {/* Log Out Button */}
          {accessToken && (
            <Button 
              onClick={handleLogout} 
              sx={{ 
                backgroundColor: 'black', 
                color: '#977342', 
                '&:hover': {
                  backgroundColor: '#CEAB76', 
                  color: '#000', 
                  fontWeight: '700'
                },
              }}
            >
              Log Out
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;