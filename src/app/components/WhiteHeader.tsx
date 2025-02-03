import * as React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer } from '@mui/material';
import Image from 'next/image';
import SSHGoldLogo from '@/assets/GoldLogo.png';
import { useCookies } from 'react-cookie';
import MenuIcon from '@mui/icons-material/Menu';

export const WhiteHeader: React.FC = () => {
  const [cookies] = useCookies(["ssh_session_id"]);
  const sessionID = cookies['ssh_session_id'];
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const menuItems = (
    <Box sx={{ width: 250 }} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <Link href="/talents" passHref>
        <Button sx={{ color: '#4B5563', width: '100%', textTransform: 'none' }}>Talents</Button>
      </Link>
      <Link href="/dashboard" passHref>
        <Button sx={{ color: '#4B5563', width: '100%', textTransform: 'none' }}>Dashboard</Button>
      </Link>
      <Link href="/portal" passHref>
        <Button sx={{ color: '#977342', width: '100%', textTransform: 'none' }}>Jane Doe</Button>
      </Link>
      <Link href="/register" passHref>
        <Button className="px-6 rounded primary" sx={{ backgroundColor: '#977342', color: '#ffffff', width: '100%' }}>
          Join Now
        </Button>
      </Link>
      {!sessionID && (
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
    <AppBar position="static" sx={{ backgroundColor: '#fff', padding: '10px 0' }}>
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo and Title Section */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link href={sessionID ? '/dashboard' : '/'} passHref>
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
          sx={{ display: { xs: 'block', md: 'none' } }} 
        >
          <MenuIcon />
        </IconButton>

        {/* Navigation Menu for larger screens */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '20px', alignItems: 'center' }}>
          <Link href="/talents" passHref>
            <Button sx={{ color: '#4B5563', mb: 2, textTransform: 'none' }}>Talents</Button>
          </Link>
          <Link href="/dashboard" passHref>
            <Button sx={{ color: '#4B5563', mb: 2, mr: 4, textTransform: 'none' }}>Dashboard</Button>
          </Link>
          <Link href="/services" passHref>
            <Button sx={{ color: '#977342', textTransform: 'none' }}>Jane Doe</Button>
          </Link>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/b80eb30359b38c4c3f3c8f801f80278982fb5dd4cea914f8b8e7f5de660ea6d8?apiKey=7fae980a988640eea8add1e49a5d542e&"
            alt=""
            style={{ width: '89px', marginLeft: '16px' }}
          />
        </Box>
      </Toolbar>

      {/* Drawer for mobile menu */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {menuItems}
      </Drawer>
    </AppBar>
  );
};