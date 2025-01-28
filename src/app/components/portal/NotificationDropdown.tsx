"use client";

import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications'; 
import { useRouter } from 'next/navigation';

const menuTextStyle = { color: '#977342', '&:hover': { color: 'white' } }

const menuAllTextStyle = { color: '#977342', textDecoration: 'underline', '&:hover': { color: 'white' } }

const menuItemStyle = {
  '&:hover': {
    color: 'white',
    backgroundColor: '#CEAB76'
  }
}

const NotificationDropdown: React.FC = () => {
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
      <IconButton onClick={handleClick} style={{ color: '#977342' }}>
        <NotificationsIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: '#fff',
            color: '#977342',
            border: '1px solid #CEAB76', 
            maxHeight: 48 * 4.5 + 8,
            width: '20ch',
          },
        }}
      >
        <MenuItem sx={menuItemStyle} onClick={handleClose}>
          <Typography sx={menuTextStyle}>Notification 1</Typography>
        </MenuItem>
        <MenuItem sx={menuItemStyle} onClick={handleClose}>
          <Typography sx={menuTextStyle}>Notification 2</Typography>
        </MenuItem>
        <MenuItem sx={menuItemStyle} onClick={handleClose}>
          <Typography sx={menuTextStyle}>Notification 3</Typography>
        </MenuItem>
        <MenuItem sx={menuItemStyle} onClick={() => handleMenuItemClick('/notifications')}>
          <Typography sx={menuAllTextStyle}>View All Notifications</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default NotificationDropdown;