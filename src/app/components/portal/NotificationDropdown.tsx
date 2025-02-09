"use client";

import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useRouter } from "next/navigation";

const menuTextStyle = { color: "#977342", "&:hover": { color: "white" } };

const menuAllTextStyle = {
  color: "#977342",
  textDecoration: "underline",
  "&:hover": { color: "white" },
};

const menuItemStyle = {
  "&:hover": {
    color: "white",
    backgroundColor: "#CEAB76",
  },
};

export interface NotificationContent {
  body: string;
  action_item: string;
}

export interface UserNotification {
  id: number;
  label: string;
  contents: NotificationContent;
}

interface NotificationDropdownProps {
  notifications: UserNotification[];
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
}) => {
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
    <div style={{ display: "flex", alignItems: "center" }}>
      <IconButton onClick={handleClick} style={{ color: "#977342" }}>
        <NotificationsIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: "#fff",
            color: "#977342",
            border: "1px solid #CEAB76",
            maxHeight: 48 * 4.5 + 8,
            width: "20ch",
          },
        }}
      >
        <>
          {notifications?.length > 0 ? (
            notifications?.map((notification) => (
              <MenuItem
                key={notification.id}
                sx={menuItemStyle}
                onClick={handleClose}
              >
                <Typography sx={menuTextStyle}>{notification.label}</Typography>
              </MenuItem>
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 2,
              }}
            >
              <DeleteForeverOutlinedIcon
                sx={{ fontSize: 24, color: "red", marginBottom: 1 }}
              />
              <Typography sx={{ color: "gray", fontSize: "12px" }}>
                No notifications available
              </Typography>
            </Box>
          )}
          {notifications?.length > 0 && (
            <MenuItem
              sx={menuItemStyle}
              onClick={() => handleMenuItemClick("/notifications")}
            >
              <Typography sx={menuAllTextStyle}>
                View All Notifications
              </Typography>
            </MenuItem>
          )}
        </>
      </Menu>
    </div>
  );
};

export default NotificationDropdown;
