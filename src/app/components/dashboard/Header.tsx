import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Typography, Box, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

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
    </Box>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/f7a98b4005a2f1122fca47c9c2e20cca9902f81182f9787864a4383cb85fee36?apiKey=7fae980a988640eea8add1e49a5d542e&"
          alt=""
          style={{ width: '43px', marginRight: '16px' }}
        />
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

        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}>
          <nav>
            {['Dashboard', 'Events', 'Jobs', 'Talents', 'Messages'].map((text) => (
              <Button
                key={text}
                sx={{
                  color: 'gray',
                  '&:hover': { color: 'white' }
                }}
              >
                {text}
              </Button>
            ))}
          </nav>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;