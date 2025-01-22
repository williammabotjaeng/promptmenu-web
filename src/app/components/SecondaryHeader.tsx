import * as React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const menuItems = (
    <Box sx={{ width: 250 }} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <Link href="/" passHref>
        <Button sx={{ textTransform: 'none', color: '#977342', fontSize: '16px', width: '100%' }}>Home</Button>
      </Link>
      <Link href="/messages" passHref>
        <Button sx={{ textTransform: 'none', color: '#977342', fontSize: '16px', width: '100%' }}>Messages</Button>
      </Link>
      <Link href="/auditions" passHref>
        <Button sx={{ textTransform: 'none', color: '#977342', fontSize: '16px', width: '100%' }}>Auditions</Button>
      </Link>
      <Link href="/settings" passHref>
        <Button sx={{ textTransform: 'none', color: '#977342', fontSize: '16px', width: '100%' }}>Settings</Button>
      </Link>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', borderBottom: '2px solid #D1D5DB' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '8px' }}>
        {/* Logo and Title Section */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ fontSize: '24px', fontWeight: 'bold', color: '#977342' }}>
            Staffing<br /> Solutions Hub
          </Box>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/5b94bb5bbafa47172ac9d071b32e3d505cde4e70fd24ac105bdfe6df97d51c1b?apiKey=7fae980a988640eea8add1e49a5d542e&"
            alt=""
            style={{ width: '74px', height: 'auto', marginLeft: '16px' }}
          />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, mb: 2 }}>
            <Link href="/" passHref>
              <Button sx={{ textTransform: 'none', color: '#977342', fontSize: '16px' }}>Home</Button>
            </Link>
            <Link href="/messages" passHref>
              <Button sx={{ textTransform: 'none', color: '#977342', fontSize: '16px' }}>Messages</Button>
            </Link>
            <Link href="/auditions" passHref>
              <Button sx={{ textTransform: 'none', color: '#977342', fontSize: '16px' }}>Auditions</Button>
            </Link>
            <Link href="/settings" passHref>
              <Button sx={{ textTransform: 'none', color: '#977342', fontSize: '16px' }}>Settings</Button>
            </Link>
          </Box>
        </Box>

        {/* Hamburger Menu Icon */}
        <IconButton
          size="large"
          edge="end"
          color="secondary"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: 'block', md: 'none' } }} 
        >
          <MenuIcon />
        </IconButton>

        {/* Drawer for mobile menu */}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          {menuItems}
        </Drawer>

        {/* Right-side Image */}
        <Box sx={{ alignItems: 'center', m: 4 }}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/b80eb30359b38c4c3f3c8f801f80278982fb5dd4cea914f8b8e7f5de660ea6d8?apiKey=7fae980a988640eea8add1e49a5d542e&"
            alt=""
            style={{ width: '89px' }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;