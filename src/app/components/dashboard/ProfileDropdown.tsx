"use client";

import React, { useState } from 'react';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';

const ProfileDropdown: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (route: string) => {
    handleClose();
    router.push(route); 
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar 
        alt="Profile Picture" 
        src="/path/to/profile/picture.jpg" 
        onClick={handleClick} 
        style={{ cursor: 'pointer', marginRight: '10px', backgroundColor: 'black', color: '#977342' }} 
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5 + 8,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick('/account')}>Account</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('/payments')}>Payments</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('/settings')}>Settings</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('/support')}>Support</MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileDropdown;