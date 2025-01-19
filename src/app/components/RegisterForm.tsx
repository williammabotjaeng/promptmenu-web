import * as React from "react";
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Avatar, Grid } from "@mui/material";

import SSHGoldLogo from '@/assets/GoldLogo.png';
import Image from 'next/image';

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
  return (
    <Box sx={{ padding: 4, backgroundColor: 'transparent' }}>
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', position: 'relative', mb: 2 }}>
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
    <form>
      <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="First Name"
            id="firstName"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
              sx: {
                color: '#977342', // Default label color
                '&.Mui-focused': {
                  color: '#977342', // Focused label color
                },
              },
            }}
            InputProps={{
              sx: {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#977342', // Border color
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#977342', // Border color on hover
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#977342', // Border color on focus
                },
              },
            }}
          />
          <TextField
            label="Last Name"
            id="lastName"
            variant="outlined"
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
        </Box>
        <TextField
          label="Email Address"
          type="email"
          id="email"
          variant="outlined"
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
          label="Phone Number"
          type="tel"
          id="phone"
          variant="outlined"
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
          id="password"
          variant="outlined"
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
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          variant="outlined"
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
        <FormControlLabel
          control={<Checkbox id="terms" />}
          label="I agree to the Terms of Service and Privacy Policy"
          sx={{ color: 'gray.400' }}
        />
      </Box>
      <Button variant="contained" sx={{ backgroundColor: '#977342', color: '#fff', padding: '16px', marginTop: 2 }}>
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
      <Box sx={{ textAlign: 'center', marginTop: 4, color: 'gray.400' }}>
        © 2025 Casting Dubai. All rights reserved.
      </Box>
    </Box>
  );
};