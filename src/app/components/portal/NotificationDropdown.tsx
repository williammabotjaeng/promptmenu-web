"use client";

import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications'; 
import { useRouter } from 'next/navigation';

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
            backgroundColor: '#977342', 
            color: 'black', 
            maxHeight: 48 * 4.5 + 8,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick('/notifications')}>
          <Typography style={{ color: 'black' }}>View All Notifications</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography style={{ color: 'black' }}>Notification 1</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography style={{ color: 'black' }}>Notification 2</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography style={{ color: 'black' }}>Notification 3</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default NotificationDropdown;