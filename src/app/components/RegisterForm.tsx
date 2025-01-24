import * as React from "react";
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Avatar, Grid } from "@mui/material";

import SSHGoldLogo from '@/assets/GoldLogo.png';
import Image from 'next/image';
import { useState } from "react";

import { useAuth } from "@/providers/auth-providers";

import { useCookies } from "react-cookie";
import { redirect } from "next/navigation";

const features = [
  {
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/5c5bfd1ec12c04f279f21f2648c74866d0b0282e771fabdd8fe37da008bc7b31?apiKey=7fae980a988640eea8add1e49a5d542e&",
    text: "Access exclusive casting calls",
    alt: "Casting calls icon"
  },
  {
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/c5defcacc66dabe2be6ffd54da4ea88231a7030e6df7a6e3e05df7ad124aaedb?apiKey=7fae980a988640eea8add1e49a5d542e&",
    text: "Professional portfolio management",
    alt: "Portfolio management icon"
  },
  {
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/0cd76d0fce7ef8ee48c4c02ce39a649bf4d2e533f796c4f3db98c8e90fbc7062?apiKey=7fae980a988640eea8add1e49a5d542e&",
    text: "International opportunities",
    alt: "International opportunities icon"
  }
];

export const RegisterForm: React.FC = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const [cookies, setCookie] = useCookies(['username', 'email']);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("Name:", name);
    console.log("Value:", value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Form Data", formData);
    
    setCookie("username", formData.username);

    try {

      await register(
        formData.username,
        formData.password,
        formData.email,
        formData.firstname,
        formData.lastname,
      );


      
      setSnackbarMessage('Registration successful! Redirecting to OTP Page...');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      
      setTimeout(() => {
        redirect('/otp')
      }, 2000);

    } catch (error: any) {
      console.error('Registration failed:', error);
      let errorMessage = 'Registration failed. Please try again.';

      // Handle specific error messages
      if (error?.response) {
        if (error?.response.data.message.includes('unique constraint')) {
          errorMessage = 'Email or username already exists.';
        }
      }

      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: 'transparent' }}>
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Box sx={{ display: { md: 'flex', xs: 'none' }, alignItems: 'flex-start', position: 'relative', mb: 2 }}>
            <Image
              src={SSHGoldLogo.src}
              alt="Staffing Solutions Logo"
              width={200} 
              height={204} 
              style={{ opacity: 0.5, overflow: 'hidden' }}
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: '#977342',
                fontSize: '20px',
                opacity: 0.3,
                position: 'absolute',
                left: '155%',
                top: '36%', 
                transform: 'translate(-50%, -100%)',
                width: '150%'
              }}
            >
              Staffing Solutions Hub
            </Typography>
          </Box>
            <Typography variant="h1" sx={{ fontWeight: 'bold', color: '#fff', fontSize: '48px', mb: 2 }}>
              Join the Winning <span style={{ display: 'block', color: '#977342' }}>Talent Network</span>
            </Typography>
            <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
              Connect with top casting directors, agencies, and <span style={{ display: 'block' }}>productions across the Middle East</span>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
              {features.map((feature, index) => (
                <Box key={index} display="flex" alignItems="center" gap={1} sx={{ marginBottom: 2 }}>
                  <Avatar src={feature.iconSrc} alt={feature.alt} sx={{ width: 24, height: 24 }} />
                  <Typography variant="body2" color="white">{feature.text}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

       {/* Right Column */}
<Grid item xs={12} md={6}>
  <Box sx={{ backgroundColor: '#ffffff1a', padding: 4, borderRadius: 2 }}>
    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#977342', mb: 2 }}>
      Create Your Account
    </Typography>
    <form  onSubmit={handleSubmit} method="POST">
      <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
          <TextField
            label="First Name"
            id="firstName"
            name="firstname"
            variant="outlined"
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
            label="Last Name"
            id="lastName"
            name="lastname"
            variant="outlined"
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
        </Box>
        <TextField
          label="Email Address"
          type="email"
          id="email"
          name="email"
          variant="outlined"
          onChange={handleChange}
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
              color: '#977342',
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
          label="Username"
          type="texr"
          id="username"
          name="username"
          variant="outlined"
          onChange={handleChange}
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
              color: '#977342',
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
          id="password"
          name="password"
          variant="outlined"
          fullWidth
          onChange={handleChange}
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
              color: '#977342',
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
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          variant="outlined"
          fullWidth
          onChange={handleChange}
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
              color: '#977342',
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
        <FormControlLabel
          control={<Checkbox sx={{ color: '#977342' }} id="terms" />}
          label={
            <Typography sx={{ fontSize: { xs: '12px' }, color: { md: '#fff', xs: '#ceab76' } }}> 
              I agree to the Terms of Service and Privacy Policy
            </Typography>
          }
          sx={{ fontSize: { xs: '10px' } }}
        />
      </Box>
      <Button type="submit" variant="contained" sx={{ backgroundColor: '#977342', color: '#fff', padding: '16px', marginTop: 2 }}>
        Create Account
      </Button>
      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
        <Typography variant="body2" color="white">
          Already have an account? 
          <Button variant="text" sx={{ padding: 0, color: '#977342' }}> Sign in</Button>
        </Typography>
      </Box>
    </form>
  </Box>
</Grid>
      </Grid>
      <Box sx={{ textAlign: 'center', marginTop: 4, color: 'gray.400', fontSize: { xs: '12px' } }}>
        © 2025 Staffing Solutions Hub. All rights reserved.
      </Box>
    </Box>
  );
};