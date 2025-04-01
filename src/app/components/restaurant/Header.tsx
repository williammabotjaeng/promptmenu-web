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
  Badge,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { useCookies } from "react-cookie";
import { useStore } from "zustand";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/state/use-auth-store";
import {
  Restaurant,
  MenuBook,
  Dashboard,
  Settings,
  Logout,
  NotificationsOutlined,
  AccountCircle,
  MenuOutlined,
  QrCode2,
  InsertChart,
  MonetizationOn,
  SupervisorAccount,
  VideoLibrary,
  AddCircleOutline,
  SettingsApplications,
  StarOutline,
  MessageOutlined,
  Help,
  ReceiptLong,
  TableBar,
  LocalOfferOutlined,
  NewReleases,
  AttachMoney
} from "@mui/icons-material";

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
    warning: "#FFB900",
  },
};

export const RestaurantDashboardHeader: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "access",
    "refresh",
    "user",
    "user_role",
    "username",
    "displayName",
    "company_name",
    "subscription_tier"
  ]);
  const router = useRouter();
  const { clearAuth } = useStore(useAuthStore);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [analyticsAnchorEl, setAnalyticsAnchorEl] = useState(null);

  // Get restaurant name from cookies
  const restaurantName = cookies.company_name || cookies.displayName || "My Restaurant";
  
  // Check if subscription tier is present (would be set during login or profile update)
  const subscriptionTier = cookies.subscription_tier || "basic";
  
  // Example notification count - this would come from your notification system
  const notificationCount = 3;

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleNotificationsClick = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleAnalyticsClick = (event) => {
    setAnalyticsAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setProfileAnchorEl(null);
    setNotificationsAnchorEl(null);
    setMenuAnchorEl(null);
    setAnalyticsAnchorEl(null);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    // Clear auth store state
    clearAuth();
    
    // Remove all auth-related cookies
    removeCookie("access", { path: "/" });
    removeCookie("refresh", { path: "/" });
    removeCookie("user", { path: "/" });
    removeCookie("user_role", { path: "/" });
    removeCookie("username", { path: "/" });
    removeCookie("displayName", { path: "/" });
    removeCookie("company_name", { path: "/" });
    removeCookie("subscription_tier", { path: "/" });
    
    // Redirect to login page
    router.push("/login");
  };

  // Render subscription badge based on tier
  const renderSubscriptionBadge = () => {
    switch(subscriptionTier) {
      case "premium":
        return (
          <Chip 
            size="small" 
            label="Premium" 
            sx={{ 
              bgcolor: theme.colors.primary,
              color: theme.colors.white,
              fontWeight: 600,
              fontSize: '0.7rem'
            }} 
          />
        );
      case "standard":
        return (
          <Chip 
            size="small" 
            label="Standard" 
            sx={{ 
              bgcolor: theme.colors.secondary,
              color: theme.colors.white,
              fontWeight: 600,
              fontSize: '0.7rem'
            }} 
          />
        );
      default:
        return (
          <Chip 
            size="small" 
            label="Basic" 
            sx={{ 
              bgcolor: theme.colors.lightText,
              color: theme.colors.white,
              fontWeight: 600,
              fontSize: '0.7rem'
            }} 
          />
        );
    }
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
        <Restaurant sx={{ color: theme.colors.primary, fontSize: 32, mr: 1 }} />
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
      
      {/* Restaurant profile summary */}
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
          {restaurantName.charAt(0).toUpperCase()}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {restaurantName}
            </Typography>
            {renderSubscriptionBadge()}
          </Box>
          <Typography variant="body2" sx={{ color: theme.colors.lightText }}>
            Restaurant Account
          </Typography>
        </Box>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      {/* Navigation items */}
      <Link href="/dashboard" style={{ textDecoration: 'none' }}>
        <Button
          fullWidth
          startIcon={<Dashboard />}
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
          Dashboard
        </Button>
      </Link>
      
      <Link href="/menus" style={{ textDecoration: 'none' }}>
        <Button
          fullWidth
          startIcon={<MenuBook />}
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
          Menus
        </Button>
      </Link>
      
      <Link href="/media" style={{ textDecoration: 'none' }}>
        <Button
          fullWidth
          startIcon={<VideoLibrary />}
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
          Media Library
        </Button>
      </Link>
      
      <Link href="/qrcodes" style={{ textDecoration: 'none' }}>
        <Button
          fullWidth
          startIcon={<QrCode2 />}
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
          QR Codes
        </Button>
      </Link>
      
      <Link href="/analytics" style={{ textDecoration: 'none' }}>
        <Button
          fullWidth
          startIcon={<InsertChart />}
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
          Analytics
        </Button>
      </Link>
      
      <Link href="/reviews" style={{ textDecoration: 'none' }}>
        <Button
          fullWidth
          startIcon={<StarOutline />}
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
          Reviews
        </Button>
      </Link>
      
      {subscriptionTier !== "basic" && (
        <Link href="/orders" style={{ textDecoration: 'none' }}>
          <Button
            fullWidth
            startIcon={<ReceiptLong />}
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
            Orders
          </Button>
        </Link>
      )}
      
      {subscriptionTier === "premium" && (
        <Link href="/reservations" style={{ textDecoration: 'none' }}>
          <Button
            fullWidth
            startIcon={<TableBar />}
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
            Reservations
          </Button>
        </Link>
      )}
      
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

      {subscriptionTier !== "premium" && (
        <Link href="/upgrade" style={{ textDecoration: 'none' }}>
          <Button
            fullWidth
            startIcon={<AttachMoney />}
            sx={{
              color: theme.colors.primary,
              justifyContent: "flex-start",
              py: 1,
              borderRadius: 2,
              "&:hover": {
                backgroundColor: `${theme.colors.primary}10`,
              },
            }}
          >
            Upgrade Plan
          </Button>
        </Link>
      )}
      
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
              <Restaurant 
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
            
            <Divider orientation="vertical" flexItem sx={{ mx: 2, display: { xs: 'none', md: 'block' } }} />
            
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {restaurantName}
              </Typography>
              {renderSubscriptionBadge()}
            </Box>
          </Box>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: { md: 0.5, lg: 1 }
            }}
          >
            <Link href="/dashboard" style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  color: theme.colors.text,
                  px: { md: 1, lg: 1.5 },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                Dashboard
              </Button>
            </Link>
            
            {/* Menu Management Dropdown */}
            <Button
              onClick={handleMenuClick}
              sx={{
                color: theme.colors.text,
                px: { md: 1, lg: 1.5 },
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
              endIcon={<Box sx={{ fontSize: 10 }}>▼</Box>}
            >
              Menus
            </Button>
            
            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: { width: 220, mt: 1.5 }
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link href="/menus" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', width: '100%', alignItems: 'center' }}>
                  <MenuBook sx={{ mr: 1.5, fontSize: 20 }} />
                  All Menus
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link href="/menus/create" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', width: '100%', alignItems: 'center' }}>
                  <AddCircleOutline sx={{ mr: 1.5, fontSize: 20 }} />
                  Create New Menu
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link href="/categories" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', width: '100%', alignItems: 'center' }}>
                  <MenuOutlined sx={{ mr: 1.5, fontSize: 20 }} />
                  Categories
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link href="/media" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', width: '100%', alignItems: 'center' }}>
                  <VideoLibrary sx={{ mr: 1.5, fontSize: 20 }} />
                  Media Library
                </Link>
              </MenuItem>
            </Menu>
            
            {/* Analytics Dropdown */}
            <Button
              onClick={handleAnalyticsClick}
              sx={{
                color: theme.colors.text,
                px: { md: 1, lg: 1.5 },
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
              endIcon={<Box sx={{ fontSize: 10 }}>▼</Box>}
            >
              Analytics
            </Button>
            
            <Menu
              anchorEl={analyticsAnchorEl}
              open={Boolean(analyticsAnchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: { width: 220, mt: 1.5 }
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link href="/analytics/overview" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', width: '100%', alignItems: 'center' }}>
                  <InsertChart sx={{ mr: 1.5, fontSize: 20 }} />
                  Overview
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link href="/analytics/menu-performance" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', width: '100%', alignItems: 'center' }}>
                  <MenuBook sx={{ mr: 1.5, fontSize: 20 }} />
                  Menu Performance
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link href="/analytics/visitor-insights" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', width: '100%', alignItems: 'center' }}>
                  <AccountCircle sx={{ mr: 1.5, fontSize: 20 }} />
                  Visitor Insights
                </Link>
              </MenuItem>
              {subscriptionTier !== "basic" && (
                <MenuItem onClick={handleClose}>
                  <Link href="/analytics/sales" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', width: '100%', alignItems: 'center' }}>
                    <AttachMoney sx={{ mr: 1.5, fontSize: 20 }} />
                    Sales Reports
                  </Link>
                </MenuItem>
              )}
            </Menu>
            
            <Link href="/qrcodes" style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  color: theme.colors.text,
                  px: { md: 1, lg: 1.5 },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                QR Codes
              </Button>
            </Link>
            
            <Link href="/reviews" style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  color: theme.colors.text,
                  px: { md: 1, lg: 1.5 },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                Reviews
              </Button>
            </Link>
            
            {subscriptionTier !== "basic" && (
              <Link href="/orders" style={{ textDecoration: 'none' }}>
                <Button
                  sx={{
                    color: theme.colors.text,
                    px: { md: 1, lg: 1.5 },
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  Orders
                </Button>
              </Link>
            )}
            
            {/* Notifications icon with badge */}
            <IconButton
              color="inherit"
              onClick={handleNotificationsClick}
              sx={{ color: theme.colors.text, ml: 1 }}
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
                    <StarOutline fontSize="small" sx={{ color: theme.colors.secondary, mr: 1 }} />
                    <Typography variant="body2" fontWeight={500}>New Review</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: theme.colors.lightText }}>
                    Someone left a 5-star review for "Grilled Salmon".
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.colors.lightText, mt: 0.5, display: 'block' }}>
                    5 minutes ago
                  </Typography>
                </Box>
              </MenuItem>
              
              <MenuItem sx={{ py: 1.5 }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <InsertChart fontSize="small" sx={{ color: theme.colors.primary, mr: 1 }} />
                    <Typography variant="body2" fontWeight={500}>Menu Performance</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: theme.colors.lightText }}>
                    Your "Pasta Carbonara" has seen a 15% increase in views.
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.colors.lightText, mt: 0.5, display: 'block' }}>
                    Yesterday
                  </Typography>
                </Box>
              </MenuItem>
              
              <MenuItem sx={{ py: 1.5 }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <NewReleases fontSize="small" sx={{ color: theme.colors.warning, mr: 1 }} />
                    <Typography variant="body2" fontWeight={500}>System Update</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: theme.colors.lightText }}>
                    New video features are available for your account.
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.colors.lightText, mt: 0.5, display: 'block' }}>
                    2 days ago
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
                  {restaurantName.charAt(0).toUpperCase()}
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
                  Account
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
                <Typography variant="subtitle2" fontWeight={600}>{restaurantName}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <Typography variant="body2" sx={{ color: theme.colors.lightText }}>
                    {subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1)} Plan
                  </Typography>
                  {subscriptionTier !== "premium" && (
                    <Link href="/upgrade" style={{ textDecoration: 'none' }}>
                      <Typography variant="caption" sx={{ color: theme.colors.primary, fontWeight: 500 }}>
                        Upgrade
                      </Typography>
                    </Link>
                  )}
                </Box>
              </Box>
              <Divider />
              <MenuItem onClick={handleClose}>
                <Link href="/profile" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', width: '100%', alignItems: 'center' }}>
                  <Restaurant sx={{ mr: 1.5, fontSize: 20 }} />
                  Restaurant Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link href="/settings" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', width: '100%', alignItems: 'center' }}>
                  <Settings sx={{ mr: 1.5, fontSize: 20 }} />
                  Settings
                </Link>
              </MenuItem>
              {subscriptionTier !== "basic" && (
                <MenuItem onClick={handleClose}>
                  <Link href="/team" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', width: '100%', alignItems: 'center' }}>
                    <SupervisorAccount sx={{ mr: 1.5, fontSize: 20 }} />
                    Team Management
                  </Link>
                </MenuItem>
              )}
              <MenuItem onClick={handleClose}>
                <Link href="/help" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', width: '100%', alignItems: 'center' }}>
                  <Help sx={{ mr: 1.5, fontSize: 20 }} />
                  Help & Support
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

export default RestaurantDashboardHeader;