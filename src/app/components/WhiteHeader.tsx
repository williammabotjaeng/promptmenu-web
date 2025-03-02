import * as React from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  Divider,
} from "@mui/material";
import Image from "next/image";
import SSHGoldLogo from "@/assets/GoldLogo.png";
import { useCookies } from "react-cookie";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "@/providers/auth-providers";

export const WhiteHeader: React.FC = () => {
  const [cookies] = useCookies(["ssh_session_id", "username", "user_role"]);

  const sessionID = cookies["ssh_session_id"];
  const userName = cookies["username"];
  const userRole = cookies["user_role"];

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const { logout } = useAuth();

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        padding: { xs: "8px 16px", md: "10px 24px" }, // Responsive padding
        boxShadow: "none", // Remove default AppBar shadow
        borderBottom: "1px solid #e0e0e0", // Add subtle border for separation
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo and Title Section */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link href={sessionID ? (userRole === "client" ? "/dashboard" : "/portal") : "/"} passHref>
            <Image
              src={SSHGoldLogo}
              alt="Logo"
              width={60}
              height={60}
              style={{ cursor: "pointer" }}
            />
          </Link>
          <Typography
            variant="h6"
            sx={{
              color: "#977342",
              marginLeft: "10px",
              fontWeight: "bold",
              fontSize: { xs: "16px", md: "20px" }, // Responsive font size
            }}
          >
            Staffing Solutions Hub
          </Typography>
        </Box>

        {/* Hamburger Menu Icon for Mobile */}
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{
            display: { xs: "block", md: "none" }, // Show only on small screens
            color: "#977342",
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Navigation Menu for Larger Screens */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" }, // Hide on small screens
            gap: "20px",
            alignItems: "center",
          }}
        >
          {sessionID ? (
            // Logged-in menu items
            <>
              <Link href="/jobs" passHref>
                <Button
                  sx={{
                    color: "#4B5563",
                    textTransform: "none",
                    fontSize: "16px",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  Jobs
                </Button>
              </Link>
              <Link href="/dashboard" passHref>
                <Button
                  sx={{
                    color: "#4B5563",
                    textTransform: "none",
                    fontSize: "16px",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  Dashboard
                </Button>
              </Link>
              <Link href="/services" passHref>
                <Button
                  sx={{
                    color: "#977342",
                    textTransform: "none",
                    "&:hover": { color: "#fff", backgroundColor: "#CEAB76" },
                    fontSize: "16px",
                  }}
                >
                  {userName}
                </Button>
              </Link>
              {sessionID && (
                <Box
                  sx={{
                    color: "#977342",
                    "&:hover": { color: "#fff", backgroundColor: "#CEAB76" },
                    textAlign: "center",
                    cursor: "pointer",
                    borderRadius: "8px",
                    padding: '10px'
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Box>
              )}
            </>
          ) : (
            // Logged-out menu items
            <>
              <Link href="/" passHref>
                <Button
                  sx={{
                    color: "#4B5563",
                    textTransform: "none",
                    fontSize: "16px",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  Home
                </Button>
              </Link>
              <Link href="/jobs" passHref>
                <Button
                  sx={{
                    color: "#4B5563",
                    textTransform: "none",
                    fontSize: "16px",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  Jobs
                </Button>
              </Link>
              <Link href="/about" passHref>
                <Button
                  sx={{
                    color: "#4B5563",
                    textTransform: "none",
                    fontSize: "16px",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  About
                </Button>
              </Link>
              <Link href="/contact" passHref>
                <Button
                  sx={{
                    color: "#4B5563",
                    textTransform: "none",
                    fontSize: "16px",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  Contact
                </Button>
              </Link>
              <Link href="/login" passHref>
                <Button
                  sx={{
                    color: "#977342",
                    textTransform: "none",
                    fontSize: "16px",
                    "&:hover": {
                      backgroundColor: "#CEAB76",
                      color: "#fff",
                    },
                  }}
                >
                  Login
                </Button>
              </Link>
            </>
          )}
          {sessionID && (
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/b80eb30359b38c4c3f3c8f801f80278982fb5dd4cea914f8b8e7f5de660ea6d8?apiKey=7fae980a988640eea8add1e49a5d542e&"
              alt=""
              style={{ width: "89px", marginLeft: "16px" }}
            />
          )}
        </Box>
      </Toolbar>

      {/* Drawer for Mobile Menu */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 300, // Set drawer width
            padding: 2, // Add padding inside the drawer
          },
        }}
      >
        {sessionID ? (
          // Logged-in menu items
          <>
            <Link href="/jobs" passHref>
              <Button
                sx={{
                  color: "#4B5563",
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontSize: "16px",
                  padding: "10px 16px",
                  "&:hover": {
                    color: "white",
                  },
                }}
              >
                Jobs
              </Button>
            </Link>
            <Link href="/dashboard" passHref>
              <Button
                sx={{
                  color: "#4B5563",
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontSize: "16px",
                  padding: "10px 16px",
                  "&:hover": {
                    color: "white",
                  },
                }}
              >
                Dashboard
              </Button>
            </Link>
            <Link href="/services" passHref>
              <Button
                sx={{
                  color: "#977342",
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontSize: "16px",
                  padding: "10px 16px",
                  "&:hover": {
                    color: "white",
                  },
                }}
              >
                {userName}
              </Button>
              {sessionID && (
                <Button
                  sx={{
                    color: "#977342",
                    "&:hover": { color: "#fff", backgroundColor: "#CEAB76" },
                    width: "100%",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              )}
            </Link>
          </>
        ) : (
          // Logged-out menu items
          <>
            <Link href="/" passHref>
              <Button
                sx={{
                  color: "#4B5563",
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontSize: "16px",
                  padding: "10px 16px",
                  "&:hover": {
                    color: "white",
                  },
                }}
              >
                Home
              </Button>
            </Link>
            <Link href="/jobs" passHref>
              <Button
                sx={{
                  color: "#4B5563",
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontSize: "16px",
                  padding: "10px 16px",
                  "&:hover": {
                    color: "white",
                  },
                }}
              >
                Jobs
              </Button>
            </Link>
            <Link href="/about" passHref>
              <Button
                sx={{
                  color: "#4B5563",
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontSize: "16px",
                  padding: "10px 16px",
                  "&:hover": {
                    color: "white",
                  },
                }}
              >
                About
              </Button>
            </Link>
            <Link href="/contact" passHref>
              <Button
                sx={{
                  color: "#4B5563",
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontSize: "16px",
                  padding: "10px 16px",
                  "&:hover": {
                    color: "white",
                  },
                }}
              >
                Contact
              </Button>
            </Link>
            <Link href="/login" passHref>
              <Button
                sx={{
                  color: "#977342",
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontSize: "16px",
                  padding: "10px 16px",
                  "&:hover": {
                    backgroundColor: "#CEAB76",
                    color: "#fff",
                  },
                }}
              >
                Login
              </Button>
            </Link>
          </>
        )}
      </Drawer>
    </AppBar>
  );
};
