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
import { useTalentProfile } from '@/providers/talent-profile-provider';

const Header: React.FC = () => {
  const [cookies] = useCookies(["access", "firstname", "lastname"]);
  const accessToken = cookies['access'];
  const firstName = cookies['firstname'] || 'User';
  const { logout } = useAuth(); 

  const { signedUrls } = useTalentProfile();

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
        <Link href="/portal" passHref>
          <Image src={SSHBlackLogo} alt="Logo" width={88} height={100} style={{ cursor: 'pointer' }} />
        </Link>

        {/* Menu on the right */}
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <NotificationDropdown notifications={null} />
          <ProfileDropdown profilePicture={signedUrls?.headshot} placeholderLetter={firstName[0]?.toUpperCase()} />
          <Link href="/browse-jobs" passHref>
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
              Browse Jobs
            </Button>
          </Link>
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