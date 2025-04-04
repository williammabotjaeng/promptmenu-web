"use client";

import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link,
  Box,
  IconButton,
  Drawer,
  MenuItem,
  Menu,
  Container,
  Chip,
  Divider,
  Avatar,
  Badge
} from "@mui/material";
import { useCookies } from "react-cookie";
import { useStore } from "zustand";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/state/use-auth-store";
import {
  MenuBook,
  Restaurant,
  Search,
  Favorite,
  Settings,
  Logout,
  NotificationsOutlined,
  AccountCircle,
  Home,
  History,
  Star,
  MenuOutlined,
  LocalOfferOutlined
} from "@mui/icons-material";
import { useAuth } from "@/providers/auth-providers";
import LogoutLoading from "../CleanUpLoading";

// Microsoft-inspired color scheme
const theme = {
  colors: {
    primary: "#107C10", // Microsoft green
    secondary: "#0078D4", // Microsoft blue
    accent: "#50E6FF", // Azure blue
    text: "#323130",
    lightText: "#605E5C",
    white: "#FFFFFF",
    background: "#f5f5f5",
    error: "#d13438",
  },
};

export const DinerDashboardHeader: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "access",
    "refresh",
    "user",
    "user_role",
    "username",
    "displayName"
  ]);
  const router = useRouter();
  const { clearAuth } = useStore(useAuthStore);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);

  const { logout } = useAuth();

  // Get user display name from cookies
  const userDisplayName = cookies.displayName || cookies.username || "Diner";
  
  // Example notification count - this would come from your notification system
  const notificationCount = 2;

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleNotificationsClick = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setProfileAnchorEl(null);
    setNotificationsAnchorEl(null);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
     setLoading(true);
     logout();
     setLoading(false);
  };

  // Drawer content for mobile view
  const menuItems = (
    <Box
      sx={{ 
        width: 280,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1
      }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {/* Logo and title */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <MenuBook sx={{ color: theme.colors.primary, fontSize: 32, mr: 1 }} />
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700,
            background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          PromptMenu
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      {/* User profile summary */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar 
          sx={{ 
            bgcolor: theme.colors.primary,
            color: theme.colors.white,
            width: 40,
            height: 40,
            mr: 2
          }}
        >
          {userDisplayName.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {userDisplayName}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.colors.lightText }}>
            Diner Account
          </Typography>
        </Box>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      {/* Navigation items */}
      <Link href="/dashboard" style={{ textDecoration: 'none' }}>
        <Button
          fullWidth
          startIcon={<Home />}
          sx={{
            color: theme.colors.text,
            justifyContent: "flex-start",
            py: 1,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: `${theme.colors.primary}10`,
            },
          }}
        >
          Home
        </Button>
      </Link>
      
      <Link href="/restaurants" style={{ textDecoration: 'none' }}>
        <Button
          fullWidth
          startIcon={<Restaurant />}
          sx={{
            color: theme.colors.text,
            justifyContent: "flex-start",
            py: 1,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: `${theme.colors.primary}10`,
            },
          }}
        >
          Restaurants
        </Button>
      </Link>
      
      <Link href="/search" style={{ textDecoration: 'none' }}>
        <Button
          fullWidth
          startIcon={<Search />}
          sx={{
            color: theme.colors.text,
            justifyContent: "flex-start",
            py: 1,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: `${theme.colors.primary}10`,
            },
          }}
        >
          Search Menus
        </Button>
      </Link>
      
      <Link href="/favorites" style={{ textDecoration: 'none' }}>
        <Button
          fullWidth
          startIcon={<Favorite />}
          sx={{
            color: theme.colors.text,
            justifyContent: "flex-start",
            py: 1,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: `${theme.colors.primary}10`,
            },
          }}
        >
          Favorites
        </Button>
      </Link>
      
      <Link href="/history" style={{ textDecoration: 'none' }}>
        <Button
          fullWidth
          startIcon={<History />}
          sx={{
            color: theme.colors.text,
            justifyContent: "flex-start",
            py: 1,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: `${theme.colors.primary}10`,
            },
          }}
        >
          Recently Viewed
        </Button>
      </Link>
      
      <Link href="/reviews" style={{ textDecoration: 'none' }}>
        <Button
          fullWidth
          startIcon={<Star />}
          sx={{
            color: theme.colors.text,
            justifyContent: "flex-start",
            py: 1,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: `${theme.colors.primary}10`,
            },
          }}
        >
          My Reviews
        </Button>
      </Link>
      
      <Divider sx={{ my: 2 }} />
      
      <Link href="/settings" style={{ textDecoration: 'none' }}>
        <Button
          fullWidth
          startIcon={<Settings />}
          sx={{
            color: theme.colors.text,
            justifyContent: "flex-start",
            py: 1,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: `${theme.colors.primary}10`,
            },
          }}
        >
          Settings
        </Button>
      </Link>
      
      <Button
        fullWidth
        startIcon={<Logout />}
        onClick={handleLogout}
        sx={{
          color: theme.colors.error,
          justifyContent: "flex-start",
          py: 1,
          borderRadius: 2,
          "&:hover": {
            backgroundColor: `${theme.colors.error}10`,
          },
        }}
      >
        Sign Out
      </Button>
    </Box>
  );

  if (loading) return <LogoutLoading />;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{ 
        backgroundColor: "rgba(255, 255, 255, 0.95)", 
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            padding: { xs: "8px 0", md: "12px 0" },
          }}
          disableGutters
        >
          {/* Logo and Title Section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link href="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <MenuBook 
                sx={{ 
                  color: theme.colors.primary, 
                  fontSize: { xs: 30, md: 34 },
                  mr: 1 
                }} 
              />
              <Typography
                variant="h6"
                sx={{ 
                  fontWeight: 700,
                  display: { xs: 'none', sm: 'block' },
                  background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                PromptMenu
              </Typography>
            </Link>
          </Box>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: { md: 1, lg: 2 }
            }}
          >
            <Link href="/dashboard" style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  color: theme.colors.text,
                  px: { md: 1, lg: 2 },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                Home
              </Button>
            </Link>
            
            <Link href="/restaurants" style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  color: theme.colors.text,
                  px: { md: 1, lg: 2 },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                Restaurants
              </Button>
            </Link>
            
            <Link href="/search" style={{ textDecoration: 'none' }}>
              <Button
                startIcon={<Search />}
                sx={{
                  color: theme.colors.text,
                  px: { md: 1, lg: 2 },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                Search
              </Button>
            </Link>
            
            <Link href="/favorites" style={{ textDecoration: 'none' }}>
              <Button
                startIcon={<Favorite />}
                sx={{
                  color: theme.colors.text,
                  px: { md: 1, lg: 2 },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                Favorites
              </Button>
            </Link>
            
            {/* Notifications icon with badge */}
            <IconButton
              color="inherit"
              onClick={handleNotificationsClick}
              sx={{ color: theme.colors.text }}
            >
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsOutlined />
              </Badge>
            </IconButton>
            
            {/* Notifications Menu */}
            <Menu
              anchorEl={notificationsAnchorEl}
              open={Boolean(notificationsAnchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: { 
                  width: 320,
                  maxHeight: 400,
                  overflowY: 'auto',
                  mt: 1.5
                }
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle1" fontWeight={600}>Notifications</Typography>
              </Box>
              <Divider />
              
              {/* Example notification items - replace with your actual notifications */}
              <MenuItem sx={{ py: 1.5 }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <LocalOfferOutlined fontSize="small" sx={{ color: theme.colors.primary, mr: 1 }} />
                    <Typography variant="body2" fontWeight={500}>New Promotion Available</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: theme.colors.lightText }}>
                    Harbor Seafood has a new weekend special.
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.colors.lightText, mt: 0.5, display: 'block' }}>
                    2 hours ago
                  </Typography>
                </Box>
              </MenuItem>
              
              <MenuItem sx={{ py: 1.5 }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Restaurant fontSize="small" sx={{ color: theme.colors.secondary, mr: 1 }} />
                    <Typography variant="body2" fontWeight={500}>Menu Update</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: theme.colors.lightText }}>
                    Milano Bistro has updated their dinner menu.
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.colors.lightText, mt: 0.5, display: 'block' }}>
                    Yesterday
                  </Typography>
                </Box>
              </MenuItem>
              
              <Divider />
              <MenuItem sx={{ justifyContent: 'center', py: 1 }}>
                <Typography variant="body2" color={theme.colors.secondary}>
                  View All Notifications
                </Typography>
              </MenuItem>
            </Menu>
            
            {/* Profile Menu Button */}
            <Button
              onClick={handleProfileClick}
              startIcon={
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32,
                    bgcolor: theme.colors.primary,
                    color: theme.colors.white,
                    fontSize: 16
                  }}
                >
                  {userDisplayName.charAt(0).toUpperCase()}
                </Avatar>
              }
              endIcon={<Box sx={{ fontSize: 10 }}>▼</Box>}
              sx={{
                textTransform: 'none',
                color: theme.colors.text,
                ml: 1,
                pl: 0.5,
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <Box sx={{ textAlign: 'left', ml: 0.5, display: { xs: 'none', lg: 'block' } }}>
                <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.2 }}>
                  {userDisplayName}
                </Typography>
                <Typography variant="caption" sx={{ color: theme.colors.lightText, lineHeight: 1.2 }}>
                  Diner Account
                </Typography>
              </Box>
            </Button>
            
            {/* Profile Menu */}
            <Menu
              anchorEl={profileAnchorEl}
              open={Boolean(profileAnchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: { width: 220, mt: 1.5 }
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle2" fontWeight={600}>{userDisplayName}</Typography>
                <Typography variant="body2" sx={{ color: theme.colors.lightText }}>
                  Diner Account
                </Typography>
              </Box>
              <Divider />
              <MenuItem onClick={handleClose}>
                <Link href="/profile" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', width: '100%', alignItems: 'center' }}>
                  <AccountCircle sx={{ mr: 1.5, fontSize: 20 }} />
                  My Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link href="/settings" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', width: '100%', alignItems: 'center' }}>
                  <Settings sx={{ mr: 1.5, fontSize: 20 }} />
                  Settings
                </Link>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => { handleClose(); handleLogout(); }} sx={{ color: theme.colors.error }}>
                <Logout sx={{ mr: 1.5, fontSize: 20 }} />
                Sign Out
              </MenuItem>
            </Menu>
          </Box>

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: 'center' }}>
            <IconButton
              color="inherit"
              onClick={handleNotificationsClick}
              sx={{ color: theme.colors.text, mr: 1 }}
            >
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsOutlined />
              </Badge>
            </IconButton>
            
            <IconButton
              edge="end"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ 
                color: theme.colors.text
              }}
            >
              <MenuOutlined />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer 
        anchor="right" 
        open={drawerOpen} 
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
          }
        }}
      >
        {menuItems}
      </Drawer>
    </AppBar>
  );
};

export default DinerDashboardHeader;