import * as React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Button, Box, IconButton, Drawer } from '@mui/material';
import { useCookies } from 'react-cookie';
import MenuIcon from '@mui/icons-material/Menu';

const SecondaryHeader: React.FC = () => {
  const [cookies] = useCookies(["ssh_session_id"]);
  const sessionID = cookies['ssh_session_id'];
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const loggedInMenuItems = (
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

  const loggedOutMenuItems = (
    <Box sx={{ width: 250 }} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <Link href="/jobs" passHref>
        <Button sx={{ textTransform: 'none', color: '#977342', fontSize: '16px', width: '100%', '&:hover': {
                      backgroundColor: '#CEAB76', 
                      color: '#fff'
                    } }}>Jobs</Button>
      </Link>
      <Link href="/talents" passHref>
        <Button sx={{ textTransform: 'none', color: '#977342', fontSize: '16px', width: '100%', '&:hover': {
                      backgroundColor: '#CEAB76', 
                      color: '#fff'
                    } }}>Talent</Button>
      </Link>
      <Link href="/about" passHref>
        <Button sx={{ textTransform: 'none', color: '#977342', fontSize: '16px', width: '100%', '&:hover': {
                      backgroundColor: '#CEAB76', 
                      color: '#fff'
                    } }}>About SSH</Button>
      </Link>
      <Link href="/contact" passHref>
        <Button sx={{ textTransform: 'none', color: '#977342', fontSize: '16px', width: '100%', '&:hover': {
                      backgroundColor: '#CEAB76', 
                      color: '#fff'
                    } }}>Contact Us</Button>
      </Link>
      <Link href="/login" passHref>
        <Button 
          sx={{ 
            textTransform: 'none', 
            color: '#977342', 
            fontSize: '16px', 
            width: '100%',
            '&:hover': {
              backgroundColor: '#CEAB76', 
              color: '#fff'
            }
          }}
        >
          Login
        </Button>
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
        </Box>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          {sessionID ? (
            <>
              <Link href="/" passHref>
                <Button sx={{ textTransform: 'none', color: '#977342', fontSize: '16px', '&:hover': {
                      backgroundColor: '#CEAB76', 
                      color: '#fff'
                    } }}>Home</Button>
              </Link>
              <Link href="/messages" passHref>
                <Button sx={{ textTransform: 'none', color: '#977342', fontSize: '16px', '&:hover': {
                      backgroundColor: '#CEAB76', 
                      color: '#fff'
                    } }}>Messages</Button>
              </Link>
              <Link href="/auditions" passHref>
                <Button sx={{ textTransform: 'none', color: '#977342', fontSize: '16px', '&:hover': {
                      backgroundColor: '#CEAB76', 
                      color: '#fff'
                    } }}>Auditions</Button>
              </Link>
              <Link href="/settings" passHref>
                <Button sx={{ textTransform: 'none', color: '#977342', fontSize: '16px', '&:hover': {
                      backgroundColor: '#CEAB76', 
                      color: '#fff'
                    } }}>Settings</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/jobs" passHref>
                <Button sx={{ textTransform: 'none', color: '#977342', fontSize: '16px', '&:hover': {
                      backgroundColor: '#CEAB76', 
                      color: '#fff'
                    } }}>Jobs</Button>
              </Link>
              <Link href="/talents" passHref>
                <Button sx={{ textTransform: 'none', color: '#977342', fontSize: '16px', '&:hover': {
                      backgroundColor: '#CEAB76', 
                      color: '#fff'
                    } }}>Talent</Button>
              </Link>
              <Link href="/about" passHref>
                <Button sx={{ textTransform: 'none', color: '#977342', fontSize: '16px', '&:hover': {
                      backgroundColor: '#CEAB76', 
                      color: '#fff'
                    } }}>About SSH</Button>
              </Link>
              <Link href="/contact" passHref>
                <Button sx={{ textTransform: 'none', color: '#977342', fontSize: '16px', '&:hover': {
                      backgroundColor: '#CEAB76', 
                      color: '#fff'
                    } }}>Contact Us</Button>
              </Link>
              <Link href="/login" passHref>
                <Button 
                  sx={{ 
                    textTransform: 'none', 
                    color: '#977342', 
                    fontSize: '16px',
                    '&:hover': {
                      backgroundColor: '#CEAB76', 
                      color: '#fff'
                    }
                  }}
                >
                  Login
                </Button>
              </Link>
            </>
          )}
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
          {sessionID ? loggedInMenuItems : loggedOutMenuItems}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default SecondaryHeader;