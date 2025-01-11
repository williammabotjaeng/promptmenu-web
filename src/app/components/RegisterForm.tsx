"use client";

import { RegistrationData } from '@/types/RegistrationData';
import Link from 'next/link';
import React, { useState } from 'react';
import { useAuth } from '@/providers/auth-providers';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { redirect } from 'next/navigation';
import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import useUserStore from "@/state/use-user-store";
import { useStore } from "zustand";
import '@/styles/register-form.css';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface RegisterFormProps {
  userRole: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ userRole }) => {
  const [formData, setFormData] = useState({
    user_role: userRole,
    email: '',
    firstname: '',
    lastname: '',
    date_of_birth: '',
    password: '',
    username: '',
    gender: 'male',
    phonenumber: '',
    nationality: ''
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [country, setCountry] = useState('');
  
    const handleCountryChange = (val: React.SetStateAction<string>) => {
      setCountry(val);
    };
  


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { register } = useAuth();

  const { setCurrentUser } = useStore(useUserStore);

  const [useWhatsApp, setUseWhatsApp] = useState(true); 

  const handleWhatsAppChange = (event: any) => {
    setUseWhatsApp(event.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      
      await register(
        formData.username,
        formData.password,
        formData.email,
        formData.date_of_birth,
        userRole,
        formData.firstname,
        formData.lastname,
        formData.gender,
        formData.phonenumber,
        country
      );

      setCurrentUser(formData.username, '');

      // Show success message and redirect to login
      setSnackbarMessage('Registration successful! Redirecting to OTP Page...');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      // Redirect after a short delay
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
    <Box className="container">
      <Typography variant="h1" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Username Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              label={<Typography variant="body1">Username</Typography>}
              name="username"
              placeholder="Enter your username"
              required
              fullWidth
              onChange={handleChange}
              className="custom-input"
            />
          </Grid>

          {/* Gender Field */}
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth required>
              <InputLabel id="gender-label">
                <Typography variant="body1">Gender</Typography>
              </InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                name="gender"
                onChange={handleChange}
                className="custom-input"
              >
                <MenuItem value="male">
                  <Typography variant="body1">Male</Typography>
                </MenuItem>
                <MenuItem value="female">
                  <Typography variant="body1">Female</Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Nationality Field */}
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth required>
              {/* <InputLabel id="nationality-label">
                <Typography variant="body1">Nationality</Typography>
              </InputLabel> */}
              <div className="country-dropdown-container">
                <CountryDropdown
                  value={country}
                  onChange={handleCountryChange}
                  className="custom-input country-dropdown"
                />
              </div>
            </FormControl>
          </Grid>

          {/* Email Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              label={<Typography variant="body1">Email</Typography>}
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              fullWidth
              onChange={handleChange}
              className="custom-input"
            />
          </Grid>

          {/* First Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label={<Typography variant="body1">First Name</Typography>}
              name="firstname"
              placeholder="Enter your first name"
              required
              fullWidth
              onChange={handleChange}
              className="custom-input"
            />
          </Grid>

          {/* Last Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label={<Typography variant="body1">Last Name</Typography>}
              name="lastname"
              placeholder="Enter your last name"
              required
              fullWidth
              onChange={handleChange}
              className="custom-input"
            />
          </Grid>

          {/* Date of Birth */}
          <Grid item xs={12} sm={6}>
            <TextField
              label={<Typography variant="body1">Date of Birth</Typography>}
              type="date"
              name="date_of_birth"
              required
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
              className="custom-input"
            />
          </Grid>

          {/* Phone Number */}
          <Grid item xs={12} sm={6}>
            <TextField
              label={<Typography variant="body1">Phone Number</Typography>}
              name="phonenumber"
              placeholder="Enter a Valid UAE Phone"
              required
              fullWidth
              inputProps={{
                pattern: "^(?:\\+971|00971|0)(?!2)((?:2|3|4|5|6|7|9|50|51|52|55|56)[0-9]{7,})$"
              }}
              onChange={handleChange}
              className="custom-input"
            />
            <FormControlLabel
              control={<Checkbox color="success" sx={{
                color: 'white'
              }} checked={useWhatsApp} onChange={handleWhatsAppChange} />}
              label={<Typography variant="body1">I use this number for WhatsApp?</Typography>}
            />
          </Grid>

          {/* WhatsApp Number Field (conditional) */}
          {!useWhatsApp && (
            <Grid item xs={12} sm={6}>
              <TextField
                label={<Typography variant="body1">WhatsApp Number</Typography>}
                name="whatsappNumber"
                placeholder="Enter your WhatsApp number"
                required
                fullWidth
                onChange={handleChange}
                className="custom-input"
              />
            </Grid>
          )}

          {/* Password */}
          <Grid item xs={12} sm={6}>
            <TextField
              label={<Typography variant="body1">Password</Typography>}
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              fullWidth
              onChange={handleChange}
              className="custom-input"
            />
          </Grid>

          {/* Confirm Password */}
          <Grid item xs={12} sm={6}>
            <TextField
              label={<Typography variant="body1">Confirm Password</Typography>}
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              required
              fullWidth
              onChange={handleChange}
              className="custom-input"
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
          <FormControlLabel
              control={<Checkbox color="success" sx={{
                color: 'white',
                display: 'block'
              }} required />}
              label={
                <Typography variant="h5">
                  Are you a Popular influencer?
                </Typography>
              }
            />
            <FormControlLabel
              control={<Checkbox color="success" sx={{
                color: 'white'
              }} required />}
              label={
                <Typography variant="body1">
                  By clicking here and going to the next step I declare that I have read and accept the <Link href="/">Ts & Cs</Link> of SSH.
                </Typography>
              }
            />
            <Button
              type="submit"
              variant="contained"
              color="success"
              style={{ display: 'block', marginTop: '20px', border: '1px solid #977342' }}
            >
              <Typography variant="body1">Register</Typography>
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbarSeverity} sx={{ width: '100%' }}>
          <Typography variant="body1">{snackbarMessage}</Typography>
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterForm;