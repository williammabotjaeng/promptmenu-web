"use client";

import { RegistrationData } from '@/types/RegistrationData';
import Link from 'next/link';
import React, { useState } from 'react';
import { useAuth } from '@/providers/auth-providers';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { redirect } from 'next/navigation';
import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import useUserStore from "@/state/use-user-store";
import { useStore } from "zustand";
import { useCookies } from 'react-cookie';
import moment from 'moment';
import '@/styles/register-form.css';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface RegisterFormProps {
  userRole: string;
}

const inputStyles = {
  "& .MuiInputLabel-root.Mui-focused": {
    display: 'none'
  },
};

const RegisterForm: React.FC<RegisterFormProps> = ({ userRole }) => {

  const [isInfluencer, setIsInfluencer] = useState('no');
  const [nationality, setNationality] = useState('');
  const [hasAccepted, setHasAccepted] = useState(false);
  const [cookies, setCookie] = useCookies(['nationality']);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    date_of_birth: '',
    user_role: userRole,
    firstname: '',
    lastname: '',
    gender: 'male',
    phonenumber: '',
    nationality: '',
    has_accepted: hasAccepted,
    is_influencer: isInfluencer,
    whatsapp_number: ''

  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleInfluencerChange = (event) => {
    setIsInfluencer(event.target.value);
  };

  const handleCountryChange = (val: React.SetStateAction<string>) => {
    setNationality(val);
  };

  const handleAcceptance = (val: React.SetStateAction<boolean>) => {
    setHasAccepted(!hasAccepted);
  }

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

  const formatDateToYYYYMMDD = (date: string) => {
    return moment(date).format('YYYY-MM-DD');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedDate = formatDateToYYYYMMDD(formData?.date_of_birth);
    console.log("Form Data", formData);
    try {

      await register(
        formData.username,
        formData.password,
        formData.email,
        formattedDate,
        userRole,
        formData.firstname,
        formData.lastname,
        formData.gender,
        formData.phonenumber,
        nationality,
        String(hasAccepted),
        isInfluencer,
        formData.whatsapp_number,

      );

      setCurrentUser(formData.username, '');
      setCookie('nationality', nationality);

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
              sx={inputStyles}
            />
          </Grid>

          {/* Gender Field */}
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth required sx={inputStyles}>
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
                  value={nationality}
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
              sx={inputStyles}
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
              sx={inputStyles}
            />
          </Grid>

          {/* Last Name */}
          <Grid item xs={12} sm={6}>
          <Typography sx={{
              fontSize: '12px',
              color: 'transparent',
            }}>Last Name</Typography>
            <TextField
              label={<Typography variant="body1">Last Name</Typography>}
              name="lastname"
              placeholder="Enter your last name"
              required
              fullWidth
              onChange={handleChange}
              className="custom-input"
              sx={inputStyles}
            />
          </Grid>

          {/* Date of Birth */}
          <Grid item xs={12} sm={6}>
            <Typography sx={{
              fontSize: '12px',
              color: 'white'
            }}>Date of Birth</Typography>
            <TextField
              type="date"
              name="date_of_birth"
              required
              placeholder="Date of Birth"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
              className="custom-input"
              sx={{
                '& input': {
                  color: '#999', 
                },
                '&::placeholder': {
                  color: '#999', 
                },
              }}
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
              sx={inputStyles}
            />
            <FormControlLabel
              control={<Checkbox color="success" sx={{
                color: 'white'
              }} checked={useWhatsApp} onChange={handleWhatsAppChange} />}
              label={<Typography variant="body1">I use this number for WhatsApp?</Typography>}
            />
          </Grid>

          {/* WhatsApp Number Field (conditional) */}
            <Grid item xs={12} sm={6}>
              <TextField
                label={<Typography variant="body1">WhatsApp Number</Typography>}
                name="whatsapp_number"
                placeholder="Enter your WhatsApp number"
                required
                fullWidth
                onChange={handleChange}
                inputProps={{
                  pattern: "^(?:\\+971|00971|0)(?!2)((?:2|3|4|5|6|7|9|50|51|52|55|56)[0-9]{7,})$"
                }}
                sx={{
                  display: useWhatsApp ? 'none' : 'inline-block'
                }}
                className="custom-input"
              />
            </Grid>

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
              sx={inputStyles}
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
              sx={inputStyles}
            />
          </Grid>

          {/* Influencer Question */}
          {userRole === 'talent' && (<Grid item xs={12}>
            <Typography variant="h5">
              Are you a Popular influencer?
            </Typography>
            <RadioGroup row value={isInfluencer} onChange={handleInfluencerChange}>
              <FormControlLabel
                control={<Radio sx={{
                  color: 'white'
                }} color="success" />}
                label="Yes"
                value="yes"
              />
              <FormControlLabel
                control={<Radio sx={{
                  color: 'white'
                }} color="success" />}
                label="No"
                value="no"
              />
            </RadioGroup>
          </Grid>)}

          {/* Submit Button */}
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value={hasAccepted} onChange={handleAcceptance} color="success" sx={{
                color: 'white'
              }} className="custom-input" />}
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