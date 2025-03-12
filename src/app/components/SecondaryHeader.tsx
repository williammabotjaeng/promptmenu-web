import * as React from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
} from "@mui/material";
import { useCookies } from "react-cookie";
import MenuIcon from "@mui/icons-material/Menu";
import SSHGoldLogo from "@/assets/GoldLogo.png";
import { useAuth } from "@/providers/auth-providers";

const SecondaryHeader: React.FC = () => {

  const [cookies] = useCookies(["ssh_session_id", "user_role"]);

  const sessionID = cookies["ssh_session_id"];
  const userRole = cookies["user_role"];

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const { logout } = useAuth();

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    console.log("Logout");
    logout();
  };

  const loggedInMenuItems = (
    <Box
      sx={{ width: 250 }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Link href={userRole === "client" ? "/dashboard" : "/portal"} passHref>
        <Button
          sx={{
            textTransform: "none",
            "&:hover": { color: "#fff", backgroundColor: "#CEAB76" },
            color: "#977342",
            fontSize: "16px",
            width: "100%",
          }}
        >
          Home
        </Button>
      </Link>
      <Link href="/auditions" passHref>
        <Button
          sx={{
            textTransform: "none",
            "&:hover": { color: "#fff", backgroundColor: "#CEAB76" },
            color: "#977342",
            fontSize: "16px",
            width: "100%",
          }}
        >
          Auditions
        </Button>
      </Link>
      <Link href="/settings" passHref>
        <Button
          sx={{
            textTransform: "none",
            "&:hover": { color: "#fff", backgroundColor: "#CEAB76" },
            color: "#977342",
            fontSize: "16px",
            width: "100%",
          }}
        >
          Settings
        </Button>
      </Link>
      {sessionID && (
        <Button
          sx={{
            color: "#977342",
            "&:hover": {
              color: "#977342",
              backgroundColor: "#fff",
              borderBottom: "2px solid #977342",
            },
            width: "100%",
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      )}
    </Box>
  );

  const loggedOutMenuItems = (
    <Box
      sx={{ width: 250 }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Link href="/jobs" passHref>
        <Button
          sx={{
            textTransform: "none",
            color: "#977342",
            fontSize: "16px",
            width: "100%",
            "&:hover": {
              backgroundColor: "#CEAB76",
              color: "#fff",
            },
          }}
        >
          Jobs
        </Button>
      </Link>
      <Link href="/talent" passHref>
        <Button
          sx={{
            textTransform: "none",
            color: "#977342",
            fontSize: "16px",
            width: "100%",
            "&:hover": {
              backgroundColor: "#CEAB76",
              color: "#fff",
            },
          }}
        >
          Talent
        </Button>
      </Link>
      <Link href="/about" passHref>
        <Button
          sx={{
            textTransform: "none",
            color: "#977342",
            fontSize: "16px",
            width: "100%",
            "&:hover": {
              backgroundColor: "#CEAB76",
              color: "#fff",
            },
          }}
        >
          About SSH
        </Button>
      </Link>
      <Link href="/contact" passHref>
        <Button
          sx={{
            textTransform: "none",
            color: "#977342",
            fontSize: "16px",
            width: "100%",
            "&:hover": {
              backgroundColor: "#CEAB76",
              color: "#fff",
            },
          }}
        >
          Contact Us
        </Button>
      </Link>
      <Link href="/login" passHref>
        <Button
          sx={{
            textTransform: "none",
            color: "#977342",
            fontSize: "16px",
            width: "100%",
            "&:hover": {
              backgroundColor: "#CEAB76",
              color: "#fff",
            },
          }}
        >
          Login
        </Button>
      </Link>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", borderBottom: "2px solid #D1D5DB" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px",
        }}
      >
        {/* Logo and Title Section */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ fontSize: "24px", fontWeight: "bold", color: "#977342" }}>
            Staffing
            <br /> Solutions Hub
          </Box>
          <img
            loading="lazy"
            src={SSHGoldLogo?.src}
            alt=""
            style={{ width: "74px", height: "auto", marginLeft: "16px" }}
          />
        </Box>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {sessionID ? (
            <>
              <Link href={userRole === "client" ? "/dashboard" : "/portal"} passHref>
                <Button
                  sx={{
                    textTransform: "none",
                    color: "#977342",
                    fontSize: "16px",
                    "&:hover": {
                      backgroundColor: "#CEAB76",
                      color: "#fff",
                    },
                  }}
                >
                  Home
                </Button>
              </Link>
              <Link href="/auditions" passHref>
                <Button
                  sx={{
                    textTransform: "none",
                    color: "#977342",
                    fontSize: "16px",
                    "&:hover": {
                      backgroundColor: "#CEAB76",
                      color: "#fff",
                    },
                  }}
                >
                  Auditions
                </Button>
              </Link>
              <Link href="/settings" passHref>
                <Button
                  sx={{
                    textTransform: "none",
                    color: "#977342",
                    fontSize: "16px",
                    "&:hover": {
                      backgroundColor: "#CEAB76",
                      color: "#fff",
                    },
                  }}
                >
                  Settings
                </Button>
              </Link>
              {sessionID && (
                <Button
                  sx={{
                    color: "#977342",
                    "&:hover": { color: "#977342", backgroundColor: "#fff", borderBottom: '2px solid #977342' },
                    width: "100%",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              )}
            </>
          ) : (
            <>
              <Link href="/jobs" passHref>
                <Button
                  sx={{
                    textTransform: "none",
                    color: "#977342",
                    fontSize: "16px",
                    "&:hover": {
                      backgroundColor: "#CEAB76",
                      color: "#fff",
                    },
                  }}
                >
                  Jobs
                </Button>
              </Link>
              <Link href="/talents" passHref>
                <Button
                  sx={{
                    textTransform: "none",
                    color: "#977342",
                    fontSize: "16px",
                    "&:hover": {
                      backgroundColor: "#CEAB76",
                      color: "#fff",
                    },
                  }}
                >
                  Talent
                </Button>
              </Link>
              <Link href="/about" passHref>
                <Button
                  sx={{
                    textTransform: "none",
                    color: "#977342",
                    fontSize: "16px",
                    "&:hover": {
                      backgroundColor: "#CEAB76",
                      color: "#fff",
                    },
                  }}
                >
                  About SSH
                </Button>
              </Link>
              <Link href="/contact" passHref>
                <Button
                  sx={{
                    textTransform: "none",
                    color: "#977342",
                    fontSize: "16px",
                    "&:hover": {
                      backgroundColor: "#CEAB76",
                      color: "#fff",
                    },
                  }}
                >
                  Contact Us
                </Button>
              </Link>
              <Link href="/login" passHref>
                <Button
                  sx={{
                    textTransform: "none",
                    color: "#977342",
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
        </Box>

        {/* Hamburger Menu Icon */}
        <IconButton
          size="large"
          edge="end"
          color="secondary"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Drawer for mobile menu */}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          {sessionID ? loggedInMenuItems : loggedOutMenuItems}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default SecondaryHeader;
