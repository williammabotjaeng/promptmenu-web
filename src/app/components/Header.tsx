"use client";

import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
            <strong>SSH | Staffing Supply Hub</strong>
          </Link>
        </Typography>
        <Button color="inherit" onClick={handleMenuClose}>
          <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        </Button>
        <Button color="inherit" onClick={handleMenuClose}>
          <Link href="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
        </Button>
        <Button color="inherit" onClick={handleMenuClick}>
          Services
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <Link href="/services/talent-casting" style={{ textDecoration: 'none' }}>Talent Casting</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link href="/services/audition-management" style={{ textDecoration: 'none' }}>Audition Management</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link href="/services/portfolio-development" style={{ textDecoration: 'none' }}>Portfolio Development</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link href="/services/career-guidance" style={{ textDecoration: 'none' }}>Career Guidance</Link>
          </MenuItem>
        </Menu>
        <Button color="inherit" onClick={handleMenuClose}>
          <Link href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;