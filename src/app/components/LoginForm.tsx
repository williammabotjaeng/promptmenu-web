"use client";

import * as React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Paper,
  Container,
  Stack,
  Divider,
  Card,
  CardMedia,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import {
  Visibility,
  VisibilityOff,
  Restaurant,
  MenuBook,
  VideoLibrary,
  Translate,
  Analytics,
} from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-providers";
import Image from "next/image";

// Create a theme-consistent alert component
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Microsoft-inspired color scheme for PromptMenu
const theme = {
  colors: {
    primary: "#107C10", // Microsoft green
    secondary: "#0078D4", // Microsoft blue
    accent: "#50E6FF", // Azure blue
    lightGreen: "#84c680",
    background: "#f8f9fa",
    text: "#323130",
    lightText: "#605E5C",
    white: "#FFFFFF",
    cardBg: "#f0f3f5",
    microsoftBlue: "#0078D4",
  },
};

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"restaurant" | "customer">("restaurant");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await login(formData.email, formData.password);

        setSnackbarMessage("Login successful! Redirecting to your dashboard...");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);

        router.push("/dashboard");
      } catch (error) {
        setSnackbarMessage("Login failed. Please check your credentials.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Mock images for the feature cards
  const featureImageUrls = {
    multimedia: "https://placehold.co/600x400/107C10/FFFFFF?text=Multimedia+Menus",
    translate: "https://placehold.co/600x400/0078D4/FFFFFF?text=AI+Translation",
    analytics: "https://placehold.co/600x400/50E6FF/333333?text=Restaurant+Analytics"
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        backgroundImage: "linear-gradient(to bottom right, #f8f9fa, #e9ecef)",
        padding: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg" sx={{ my: "auto" }}>
        <Paper
          elevation={4}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
          }}
        >
          {/* Left Panel - Login Form */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 3, md: 6 },
              display: "flex",
              flexDirection: "column",
              backgroundColor: theme.colors.white
            }}
          >
            <Box
              sx={{
                mb: 5,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h3"
                component="div"
                sx={{
                  fontWeight: 700,
                  background: `linear-gradient(90deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <MenuBook sx={{ fontSize: 40, color: theme.colors.primary }} />
                PromptMenu
              </Typography>
            </Box>

            <Typography
              variant="h5"
              sx={{
                mb: 1,
                fontWeight: 600,
                color: theme.colors.text,
                textAlign: "center"
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: theme.colors.lightText, mb: 4, textAlign: "center" }}
            >
              Your digital menu platform powered by Azure AI
            </Typography>

            {/* User type selection */}
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                mb: 4,
                borderRadius: 3,
                overflow: "hidden",
                border: `1px solid ${theme.colors.cardBg}`
              }}
            >
              <Button
                fullWidth
                variant="contained"
                disableElevation
                onClick={() => setUserType("restaurant")}
                sx={{
                  py: 1.5,
                  borderRadius: 0,
                  bgcolor: userType === "restaurant" ? theme.colors.primary : theme.colors.cardBg,
                  color: userType === "restaurant" ? theme.colors.white : theme.colors.text,
                  "&:hover": {
                    bgcolor: userType === "restaurant" ? theme.colors.lightGreen : theme.colors.cardBg,
                  },
                }}
                startIcon={<Restaurant />}
              >
                Restaurant Owner
              </Button>
              <Button
                fullWidth
                variant="contained"
                disableElevation
                onClick={() => setUserType("customer")}
                sx={{
                  py: 1.5,
                  borderRadius: 0,
                  bgcolor: userType === "customer" ? theme.colors.secondary : theme.colors.cardBg,
                  color: userType === "customer" ? theme.colors.white : theme.colors.text,
                  "&:hover": {
                    bgcolor: userType === "customer" ? theme.colors.accent : theme.colors.cardBg,
                  },
                }}
                startIcon={<MenuBook />}
              >
                Customer
              </Button>
            </Paper>

            <form onSubmit={handleSubmit} method="POST">
              <TextField
                label="Email Address"
                type="email"
                name="email"
                placeholder={userType === "restaurant" ? "restaurant@example.com" : "customer@example.com"}
                fullWidth
                variant="outlined"
                margin="normal"
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                InputLabelProps={{
                  sx: {
                    color: theme.colors.lightText,
                    "&.Mui-focused": {
                      color: userType === "restaurant" ? theme.colors.primary : theme.colors.secondary,
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    borderRadius: 2,
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: userType === "restaurant" ? theme.colors.primary : theme.colors.secondary,
                    },
                  },
                }}
                sx={{ mb: 2 }}
              />

              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                fullWidth
                variant="outlined"
                margin="normal"
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                InputLabelProps={{
                  sx: {
                    color: theme.colors.lightText,
                    "&.Mui-focused": {
                      color: userType === "restaurant" ? theme.colors.primary : theme.colors.secondary,
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    borderRadius: 2,
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: userType === "restaurant" ? theme.colors.primary : theme.colors.secondary,
                    },
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? (
                          <VisibilityOff color="action" />
                        ) : (
                          <Visibility color="action" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: userType === "restaurant" ? theme.colors.primary : theme.colors.secondary,
                        "&.Mui-checked": {
                          color: userType === "restaurant" ? theme.colors.primary : theme.colors.secondary,
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      sx={{ color: theme.colors.text }}
                    >
                      Remember me
                    </Typography>
                  }
                />
                <Link href="/forgot" passHref style={{ textDecoration: "none" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: userType === "restaurant" ? theme.colors.primary : theme.colors.secondary,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                      fontWeight: 500,
                    }}
                  >
                    Forgot Password?
                  </Typography>
                </Link>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 4,
                  mb: 3,
                  bgcolor: userType === "restaurant" ? theme.colors.primary : theme.colors.secondary,
                  color: theme.colors.white,
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: 2,
                  boxShadow: `0 4px 14px 0 ${userType === "restaurant" 
                    ? "rgba(16, 124, 16, 0.4)" 
                    : "rgba(0, 120, 212, 0.4)"}`,
                  "&:hover": {
                    bgcolor: userType === "restaurant" ? theme.colors.lightGreen : theme.colors.accent,
                    boxShadow: `0 6px 20px 0 ${userType === "restaurant" 
                      ? "rgba(16, 124, 16, 0.6)" 
                      : "rgba(0, 120, 212, 0.6)"}`,
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {userType === "restaurant" ? "Login to Restaurant Dashboard" : "Login as Customer"}
              </Button>

              <Divider sx={{ my: 3 }}>
                <Typography
                  variant="body2"
                  sx={{ color: theme.colors.lightText, px: 2 }}
                >
                  OR
                </Typography>
              </Divider>

              <Button
                fullWidth
                variant="outlined"
                sx={{
                  mb: 3,
                  py: 1.5,
                  color: theme.colors.microsoftBlue,
                  borderColor: theme.colors.microsoftBlue,
                  borderRadius: 2,
                  "&:hover": {
                    bgcolor: "rgba(0, 120, 212, 0.1)",
                    borderColor: theme.colors.microsoftBlue,
                  },
                  display: "flex",
                  gap: 1,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
                  <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
                  <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
                  <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
                </svg>
                Sign in with Microsoft
              </Button>

              <Typography
                variant="body2"
                align="center"
                sx={{ color: theme.colors.lightText }}
              >
                Don't have an account?{" "}
                <Link href="/register" passHref style={{ textDecoration: "none" }}>
                  <Typography
                    component="span"
                    sx={{
                      color: userType === "restaurant" ? theme.colors.primary : theme.colors.secondary,
                      fontWeight: 500,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {userType === "restaurant" ? "Register your restaurant" : "Create an account"}
                  </Typography>
                </Link>
              </Typography>
            </form>
          </Box>

          {/* Right Panel - Feature Showcase */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flex: 1,
              bgcolor: theme.colors.secondary,
              color: theme.colors.white,
              flexDirection: "column",
              justifyContent: "space-between",
              p: 6,
              position: "relative",
              overflow: "hidden",
              backgroundImage: `linear-gradient(135deg, ${theme.colors.secondary} 0%, #005a9e 100%)`,
            }}
          >
            {/* Decorative elements */}
            <Box
              sx={{
                position: "absolute",
                width: 300,
                height: 300,
                borderRadius: "50%",
                background: `linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.accent})`,
                opacity: 0.2,
                top: -100,
                right: -100,
                filter: "blur(40px)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: `linear-gradient(45deg, ${theme.colors.accent}, ${theme.colors.primary})`,
                opacity: 0.15,
                bottom: -50,
                left: -50,
                filter: "blur(30px)",
              }}
            />

            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Typography variant="h4" component="div" sx={{ mb: 2, fontWeight: 700 }}>
                Transform Your Restaurant Experience
              </Typography>
              <Typography variant="body1" sx={{ mb: 5, opacity: 0.9, fontSize: "1.1rem" }}>
                PromptMenu reimagines traditional menus with engaging multimedia content.
                Powered by Azure AI, we help restaurants connect with customers in new ways.
              </Typography>
              
              <Stack spacing={3}>
                <Box sx={{ 
                  p: 3, 
                  bgcolor: "rgba(255,255,255,0.1)", 
                  borderRadius: 3,
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                }}>
                  <VideoLibrary sx={{ fontSize: 28 }} />
                  <Box>
                    <Typography variant="h6" component="div" sx={{ mb: 0.5, fontWeight: 600 }}>
                      Multimedia-Rich Digital Menus
                    </Typography>
                    <Typography variant="body2">
                      Showcase preparation videos, chef introductions, and ingredient stories
                      that bring your dishes to life
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ 
                  p: 3, 
                  bgcolor: "rgba(255,255,255,0.1)", 
                  borderRadius: 3,
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                }}>
                  <Translate sx={{ fontSize: 28 }} />
                  <Box>
                    <Typography variant="h6" component="div" sx={{ mb: 0.5, fontWeight: 600 }}>
                      AI-Powered Translation
                    </Typography>
                    <Typography variant="body2">
                      Break language barriers with automatic menu translation to serve
                      international customers with confidence
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ 
                  p: 3, 
                  bgcolor: "rgba(255,255,255,0.1)", 
                  borderRadius: 3,
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                }}>
                  <Analytics sx={{ fontSize: 28 }} />
                  <Box>
                    <Typography variant="h6" component="div" sx={{ mb: 0.5, fontWeight: 600 }}>
                      Customer Insights Dashboard
                    </Typography>
                    <Typography variant="body2">
                      Collect meaningful feedback and analyze customer preferences to optimize
                      your menu and boost satisfaction
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>

            <Box sx={{ position: "relative", zIndex: 1, textAlign: "center", mt: 6 }}>
              <Box sx={{ 
                display: "inline-flex", 
                alignItems: "center", 
                gap: 1,
                bgcolor: "rgba(255,255,255,0.1)",
                borderRadius: 5,
                py: 1,
                px: 2.5,
              }}>
                <svg width="16" height="16" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
                  <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
                  <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
                  <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
                </svg>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Powered by Azure AI
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};