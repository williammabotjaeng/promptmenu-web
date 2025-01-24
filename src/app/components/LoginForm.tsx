"use client";

import * as React from 'react';
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import { Facebook, Google, Twitter } from '@mui/icons-material';
import Link from 'next/link';

export const LoginForm: React.FC = () => {
  return (
    <Grid container sx={{ height: { xs: '100%', md: '125vh' }, backgroundColor: 'black' }}>
      {/* Left Column */}
      <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', padding: { xs: 1, md: 4 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: { xs: 1, md: 12 } }}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/c3fc10b45272c7c3f40000cb49e896f62fd831f2d1f6075f068d38a771d3152f?apiKey=7fae980a988640eea8add1e49a5d542e&"
            alt="Company logo"
            style={{ maxWidth: '204px', marginBottom: '20px', marginTop: '1px' }}
          />
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', mt: { xs: 0, md: 16 }, alignItems: { md: 'none', xs: 'center' } }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#977342', marginBottom: 2 }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" sx={{ color: 'gray', marginBottom: 4 }}>
              Sign in to your account to continue
            </Typography>
            <form>
              {/* Styled Input Fields */}
              <TextField
                label="Email Address"
                type="email"
                placeholder="name@company.com"
                fullWidth
                margin="normal"
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
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#977342',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#977342',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#977342',
                    },
                  },
                }}
              />
              <TextField
                label="Password"
                type="password"
                placeholder="Enter your password"
                fullWidth
                margin="normal"
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
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#977342',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#977342',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#977342',
                    },
                  },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Remember me"
                  sx={{ color: 'gray' }}
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
          src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/0ca397a6303443cf9ac61c117ae8a3d543e83d9bdce376c072ed0bd5eade2785?apiKey=7fae980a988640eea8add1e49a5d542e&"
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
              <Google />
            </Button>
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
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};