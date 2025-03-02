import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Typography, Box, Drawer, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/auth-providers';
import SSHGoldLogo from '@/assets/GoldLogo.png';
import Image from 'next/image';
import ProfileDropdown from '@/components/dashboard/ProfileDropdown';
import NotificationDropdown from '@/components/dashboard/NotificationDropdown';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cookies] = useCookies(['access', 'ssh_session_id']);
  const { logout } = useAuth();

  const router = useRouter();

  const accessToken = cookies?.access;

  const sessionID = cookies?.ssh_session_id;

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleClick = (text: any) => {
    console.log("Handle Click Arg:", text);
    if (text === 'Post Event') {
      router.push('/post-event');
    } else {
      router.push(`/${text.toLowerCase()}`);
    }
  }

  const handleLogout = () => {
    console.log("Logout");
    logout();
  }

  const menuItems = (
    <Box sx={{ width: 250 }} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      {['Dashboard', 'Post Event', 'Events', 'Jobs', 'Talent', 'Messages'].map((text) => (
        <Button
          key={text}
          sx={{
            color: 'gray',
            width: '100%',
            '&:hover': { color: 'white' }
          }}
          onClick={() => handleClick(text)}
        >
          {text}
        </Button>
      ))}
      {sessionID && (
        <Button
          sx={{
            color: '#977342',
            '&:hover': { color: '#fff', backgroundColor: '#CEAB76' },
            width: '100%'
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      )}
    </Box>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        <Image src={SSHGoldLogo} alt="Logo" width={60} height={60} style={{ cursor: 'pointer' }} />
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#000' }}>SSH</Typography>

        <IconButton
          edge="start"
          color="secondary"
          aria-label="menu"
          sx={{ display: { xs: 'block', md: 'none' } }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        {/* Drawer for mobile menu */}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          {menuItems}
        </Drawer>

        {/* Flex container for menu items and right-side image */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <nav>
            {['Dashboard', 'Post Event', 'Events', 'Jobs', 'Talent', 'Messages'].map((text) => (
              <Button
                key={text}
                sx={{
                  color: 'gray',
                  '&:hover': { color: 'white' },
                  marginLeft: '16px'
                }}
                onClick={() => handleClick(text)}
              >
                {text}
              </Button>
            ))}
          </nav>
          {/* Right-side Image */}
          <Box sx={{ alignItems: 'center', marginLeft: '16px' }}>
          <Grid item xs={4} sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end'
              }}>
                <NotificationDropdown />
                <ProfileDropdown />
              </Grid>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;