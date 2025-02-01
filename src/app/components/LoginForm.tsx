"use client";

import * as React from 'react';
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter, redirect } from 'next/navigation';
import { useAuth } from '@/providers/auth-providers';
import SSHGoldLogo from '@/assets/GoldLogo.png';
import LoginImage from '@/assets/login-img.png';
import Image from 'next/image';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const LoginForm: React.FC = () => {

  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("Field:", name);
    console.log("Value:", value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    const newErrors: { [key: string]: string } = {};
    if (!formData.email) newErrors.email = "Username or Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const cleanEmail = formData.email.trim();
        const cleanPass = formData.password.trim();
        console.log("Clean Email", cleanEmail.length);
        console.log("Clean Pass", cleanPass.length);
        await login(cleanEmail, cleanPass);

        setSnackbarMessage("Login successful! Redirecting...");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        
        router.push('/dashboard');
        
      } catch (error) {
        console.error("Login failed:", error);
        setSnackbarMessage("Login failed. Please check your credentials.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = (event: React.SyntheticEvent<any> | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Grid container sx={{ height: { xs: '100%', md: '125vh' }, backgroundColor: 'black' }}>
      {/* Left Column */}
      <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', padding: { xs: 1, md: 4 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: { xs: 1, md: 12 } }}>
          <Link href="/">
          <Image src={SSHGoldLogo} alt="Logo" width={200} height={200} style={{ cursor: 'pointer', opacity: .3 }} />
          </Link>
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', mt: { xs: 0, md: 16 }, alignItems: { md: 'none', xs: 'center' } }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#977342', marginBottom: 2 }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" sx={{ color: 'gray', marginBottom: 4 }}>
              Sign in to your account to continue
            </Typography>
            <form onSubmit={handleSubmit} method="POST">
              {/* Styled Input Fields */}
              <TextField
                label="Email Address"
                type="email"
                name="email"
                placeholder="name@company.com"
                fullWidth
                margin="normal"
                onChange={handleChange}
                InputLabelProps={{
                  sx: {
                    color: '#977342',
                    '&.Mui-focused': {
                      color: '#977342',
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    color: '#977342',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#977342',
                      color: '#977342'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#977342',
                      color: '#977342'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#977342',
                      color: '#977342'
                    },
                  },
                }}
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your password"
                fullWidth
                margin="normal"
                onChange={handleChange}
                InputLabelProps={{
                  sx: {
                    color: '#977342',
                    '&.Mui-focused': {
                      color: '#977342',
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    color: '#977342',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#977342',
                      color: '#977342'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#977342',
                      color: '#977342'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#977342',
                      color: '#977342'
                    },
                  },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                <FormControlLabel
                  control={<Checkbox sx={{ color: '#977342' }} />}
                  label="Remember me"
                />
                <Link href="/forgot">
                  <Button
                    variant="text"
                    sx={{
                      color: '#977342',
                      '&:hover': {
                        color: '#CEAB76',
                        backgroundColor: 'transparent'
                      },
                    }}
                  >
                    Forgot Password?
                  </Button>
                </Link>
              </Box>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  marginTop: 3,
                  backgroundColor: '#977342',
                  color: 'white',
                  padding: '10px 20px',
                  width: '100%',
                  '&:hover': {
                    backgroundColor: '#977342',
                    color: 'white',
                  },
                }}
              >
                Sign In
              </Button>
              <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                <Typography variant="body2" sx={{ color: 'gray' }}>
                  Don't have an account?{' '}
                  <Link href="/register">
                    <Button
                      variant="text"
                      sx={{
                        color: '#977342',
                        '&:hover': {
                          color: '#CEAB76',
                          background: 'transparent'
                        },
                      }}
                    >
                      Sign up
                    </Button>
                  </Link>
                </Typography>
              </Box>
            </form>
          </Box>
        </Box>
      </Grid>

      {/* Right Column */}
      <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'flex' }, position: 'relative' }}>
        <img
          loading="lazy"
          src={LoginImage.src}
          alt="Background fashion event"
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', top: 0, left: 0 }}
        />
        {/* Black Overlay */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          {/* Slogan */}
          <Box sx={{ position: 'absolute', top: 16, left: 16, color: 'white' }}>
            <Typography variant="h6">
              Staffing Your Success, One Event at a Time.
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', marginTop: 1, opacity: 0.6 }}>
              Connect with top brands and opportunities in the fashion industry.
            </Typography>
          </Box>
          {/* Social Icons */}
          <Box sx={{ position: 'absolute', bottom: 16, left: 16, display: 'flex', gap: 2 }}>
            <Link href="https://web.facebook.com/people/Staffing-Solutions-Hub/61568735786489" target="_blank">
              <Button
                variant="outlined"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#977342',
                    color: 'white',
                  },
                }}
              >
                <Facebook />
              </Button>
            </Link>
            <Link href="https://www.instagram.com/staffingsolutionshub" target="_blank">
              <Button
                variant="outlined"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#977342',
                    color: 'white',
                  },
                }}
              >
                <Instagram />
              </Button>
            </Link>
            <Link href="https://x.com/staffinghub_ae" target="_blank">
              <Button
                variant="outlined"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#977342',
                    color: 'white',
                  },
                }}
              >
                <Twitter />
              </Button>
            </Link>
            <Link href="https://www.tiktok.com/@staffingsolutionshub" target="_blank">
              <Button
                variant="outlined"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#977342',
                    color: 'white',
                  },
                }}
              >
                <FontAwesomeIcon style={{ fontSize: '24px' }} icon={faTiktok} />
              </Button>
            </Link>
          </Box>
        </Box>
      </Grid>
      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};