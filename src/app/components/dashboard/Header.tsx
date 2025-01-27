import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Typography, Box, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useCookies } from 'react-cookie';
import { useAuth } from '@/providers/auth-providers';
import SSHGoldLogo from '@/assets/GoldLogo.png';
import Image from 'next/image';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cookies] = useCookies(['access']);
  const { logout } = useAuth();
  const accessToken = cookies?.access;

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    console.log("Logout");
    logout();
  }

  const menuItems = (
    <Box sx={{ width: 250 }} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      {['Dashboard', 'Events', 'Jobs', 'Talents', 'Messages'].map((text) => (
        <Button
          key={text}
          sx={{
            color: 'gray',
            width: '100%',
            '&:hover': { color: 'white' }
          }}
        >
          {text}
        </Button>
      ))}
      {accessToken && (
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
            {['Dashboard', 'Events', 'Jobs', 'Talents', 'Messages'].map((text) => (
              <Button
                key={text}
                sx={{
                  color: 'gray',
                  '&:hover': { color: 'white' },
                  marginLeft: '16px'
                }}
              >
                {text}
              </Button>
            ))}
          </nav>
          {/* Right-side Image */}
          <Box sx={{ alignItems: 'center', marginLeft: '16px' }}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/b80eb30359b38c4c3f3c8f801f80278982fb5dd4cea914f8b8e7f5de660ea6d8?apiKey=7fae980a988640eea8add1e49a5d542e&"
              alt=""
              style={{ width: '89px' }}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;