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
  Divider
} from "@mui/material";
import Image from "next/image";
import { useCookies } from "react-cookie";
import { useStore } from "zustand";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Restaurant,
  MenuBook,
  VideoLibrary,
  Translate,
  Dashboard,
  Login as LoginIcon,
  HelpOutline,
  Assignment
} from "@mui/icons-material";
import useAuthStore from "@/state/use-auth-store";
import { useState } from "react";
import { useAuth } from "@/providers/auth-providers";

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
  },
};

export const Header: React.FC = () => {
  const [cookies] = useCookies(["access"]);
  const isLoggedIn = !!cookies["access"];
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [solutionsAnchorEl, setSolutionsAnchorEl] = useState(null);
  const [registerAnchorEl, setRegisterAnchorEl] = useState(null);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  }

  const handleSolutionsClick = (event) => {
    setSolutionsAnchorEl(event.currentTarget);
  };

  const handleRegisterClick = (event) => {
    setRegisterAnchorEl(event.currentTarget);
  };

  const handleAccountClick = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setSolutionsAnchorEl(null);
    setRegisterAnchorEl(null);
    setAccountAnchorEl(null);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

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
      
      <Link href="/" style={{ textDecoration: 'none' }}>
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
          Home
        </Button>
      </Link>
      
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
        Solutions
      </Button>
      
      <Link href="#features" style={{ textDecoration: 'none' }}>
        <Button
          fullWidth
          startIcon={<VideoLibrary />}
          sx={{
            color: theme.colors.text,
            justifyContent: "flex-start",
            py: 1,
            borderRadius: 2,
            pl: 4,
            "&:hover": {
              backgroundColor: `${theme.colors.primary}10`,
            },
          }}
        >
          Multimedia Menus
        </Button>
      </Link>
      
      <Link href="#service" style={{ textDecoration: 'none' }}>
        <Button
          fullWidth
          startIcon={<Translate />}
          sx={{
            color: theme.colors.text,
            justifyContent: "flex-start",
            py: 1,
            borderRadius: 2,
            pl: 4,
            "&:hover": {
              backgroundColor: `${theme.colors.primary}10`,
            },
          }}
        >
          AI Translation
        </Button>
      </Link>
      
      <Link href="#howitworks" style={{ textDecoration: 'none' }}>
        <Button
          fullWidth
          startIcon={<Assignment />}
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
          How it Works
        </Button>
      </Link>
      
      <Link href="/help" style={{ textDecoration: 'none' }}>
        <Button
          fullWidth
          startIcon={<HelpOutline />}
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
          Help Center
        </Button>
      </Link>
      
      <Divider sx={{ my: 2 }} />
      
      {!isLoggedIn ? (
        <>
          <Button
            fullWidth
            variant="contained"
            onClick={handleRegisterClick}
            sx={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.white,
              py: 1.5,
              borderRadius: 2,
              mb: 1,
              "&:hover": {
                backgroundColor: "#0b5e0b",
              },
            }}
          >
            Register
          </Button>
          
          <Menu
            anchorEl={registerAnchorEl}
            open={Boolean(registerAnchorEl)}
            onClose={handleClose}
            elevation={3}
            sx={{ mt: 1.5 }}
          >
            <MenuItem 
              sx={{ 
                textDecoration: "none", 
                color: theme.colors.primary, 
                backgroundColor: theme.colors.white, 
                width: "100%", 
                "&:hover": {
                  textDecoration: "none",
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.white
                }
              }} 
              onClick={handleClose}
            >
              <Link 
                href="/register/restaurant" 
                sx={{ 
                  color: theme.colors.primary, 
                  textDecoration: "none", 
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  "&:hover": {
                    color: theme.colors.white,
                    textDecoration: "none"
                  }
                }}
              >
                <Restaurant sx={{ mr: 1.5 }} />
                Register as Restaurant
              </Link>
            </MenuItem>
            <MenuItem 
              sx={{ 
                textDecoration: "none", 
                color: theme.colors.secondary, 
                backgroundColor: theme.colors.white, 
                width: "100%", 
                "&:hover": {
                  textDecoration: "none",
                  backgroundColor: theme.colors.secondary,
                  color: theme.colors.white
                }
              }} 
              onClick={handleClose}
            >
              <Link 
                href="/register/diner" 
                sx={{ 
                  color: theme.colors.secondary, 
                  textDecoration: "none", 
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  "&:hover": {
                    color: theme.colors.white,
                    textDecoration: "none"
                  }
                }}
              >
                <MenuBook sx={{ mr: 1.5 }} />
                Register as Diner
              </Link>
            </MenuItem>
          </Menu>
          
          <Link href="/login" style={{ textDecoration: 'none' }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<LoginIcon />}
              sx={{
                borderColor: theme.colors.secondary,
                color: theme.colors.secondary,
                py: 1.5,
                borderRadius: 2,
                "&:hover": {
                  borderColor: theme.colors.secondary,
                  backgroundColor: `${theme.colors.secondary}10`,
                },
              }}
            >
              Sign In
            </Button>
          </Link>
        </>
      ) : (
        <Link href="/dashboard" style={{ textDecoration: 'none' }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: theme.colors.secondary,
              color: theme.colors.white,
              py: 1.5,
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#00619a",
              },
            }}
          >
            My Dashboard
          </Button>
        </Link>
      )}
    </Box>
  );

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ 
        backgroundColor: "rgba(255, 255, 255, 0.95)", 
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.05)"
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
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <MenuBook 
                sx={{ 
                  color: theme.colors.primary, 
                  fontSize: { xs: 34, md: 38 },
                  mr: 1 
                }} 
              />
              <Typography
                variant="h5"
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

          {/* Navigation Menu for larger screens */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: { md: 1, lg: 2 }
            }}
          >
            <Link href="/" style={{ textDecoration: 'none' }}>
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
            
            <Button
              sx={{
                color: theme.colors.text,
                px: { md: 1, lg: 2 },
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
              onClick={handleSolutionsClick}
              endIcon={<Box sx={{ fontSize: 10 }}>▼</Box>}
            >
              Solutions
            </Button>
            
            <Menu
              anchorEl={solutionsAnchorEl}
              open={Boolean(solutionsAnchorEl)}
              onClose={handleClose}
              elevation={3}
              sx={{ mt: 1.5 }}
              transformOrigin={{ horizontal: 'center', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose} sx={{ minWidth: 220 }}>
                <Link href="#features" style={{ 
                  textDecoration: 'none', 
                  color: theme.colors.text,
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%'
                }}>
                  <VideoLibrary sx={{ mr: 1.5, color: theme.colors.primary }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>Multimedia Menus</Typography>
                    <Typography variant="caption" sx={{ color: theme.colors.lightText }}>
                      Rich content for menu items
                    </Typography>
                  </Box>
                </Link>
              </MenuItem>
              
              <MenuItem onClick={handleClose}>
                <Link href="#service" style={{ 
                  textDecoration: 'none', 
                  color: theme.colors.text,
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%'
                }}>
                  <Translate sx={{ mr: 1.5, color: theme.colors.secondary }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>AI Translation</Typography>
                    <Typography variant="caption" sx={{ color: theme.colors.lightText }}>
                      Multilingual menu support
                    </Typography>
                  </Box>
                </Link>
              </MenuItem>
              
              <MenuItem onClick={handleClose}>
                <Link href="#howitworks" style={{ 
                  textDecoration: 'none', 
                  color: theme.colors.text,
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%'
                }}>
                  <Dashboard sx={{ mr: 1.5, color: theme.colors.accent }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>Customer Insights</Typography>
                    <Typography variant="caption" sx={{ color: theme.colors.lightText }}>
                      Analytics and feedback
                    </Typography>
                  </Box>
                </Link>
              </MenuItem>
            </Menu>
            
            <Link href="/pricing" style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  color: theme.colors.text,
                  px: { md: 1, lg: 2 },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                Pricing
              </Button>
            </Link>
            
            <Link href="/help" style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  color: theme.colors.text,
                  px: { md: 1, lg: 2 },
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                Help
              </Button>
            </Link>
            
            {!isLoggedIn ? (
              <>
                <Button
                  variant="contained"
                  onClick={handleRegisterClick}
                  sx={{
                  ml: { md: 1, lg: 2 },
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.white,
                  px: { md: 2, lg: 3 },
                  "&:hover": {
                    backgroundColor: "#0b5e0b",
                  },
                  }}
                >
                  Register
                </Button>

                <Menu
                  anchorEl={registerAnchorEl}
                  open={Boolean(registerAnchorEl)}
                  onClose={handleClose}
                  elevation={3}
                  sx={{ mt: 1.5 }}
                >
                  <MenuItem onClick={handleClose}>
                  <Link
                    href="/register/restaurant"
                    style={{
                    textDecoration: "none",
                    color: theme.colors.text,
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    }}
                  >
                    <Restaurant sx={{ mr: 1.5, color: theme.colors.primary }} />
                    Register as Restaurant
                  </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                  <Link
                    href="/register/diner"
                    style={{
                    textDecoration: "none",
                    color: theme.colors.text,
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    }}
                  >
                    <MenuBook sx={{ mr: 1.5, color: theme.colors.secondary }} />
                    Register as Diner
                  </Link>
                  </MenuItem>
                </Menu>
                
                <Link href="/login" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="outlined"
                    startIcon={<LoginIcon />}
                    sx={{
                      ml: 1,
                      borderColor: theme.colors.secondary,
                      color: theme.colors.secondary,
                      "&:hover": {
                        borderColor: theme.colors.secondary,
                        backgroundColor: `${theme.colors.secondary}10`,
                      },
                    }}
                  >
                    Sign In
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button
                  sx={{
                    ml: 2,
                    color: theme.colors.text,
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                  onClick={handleAccountClick}
                  endIcon={<Box sx={{ fontSize: 10 }}>▼</Box>}
                >
                  My Account
                </Button>
                
                <Menu
                  anchorEl={accountAnchorEl}
                  open={Boolean(accountAnchorEl)}
                  onClose={handleClose}
                  elevation={3}
                  sx={{ mt: 1.5 }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link href="/dashboard" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', width: '100%' }}>
                      Dashboard
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link href="/settings" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', width: '100%' }}>
                      Settings
                    </Link>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <Link onClick={handleLogout} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', width: '100%' }}>
                      Sign Out
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>

          {/* Hamburger Menu Icon */}
          <IconButton
            edge="end"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ 
              display: { xs: "flex", md: "none" },
              color: theme.colors.text
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Drawer for mobile menu */}
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