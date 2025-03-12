import * as React from "react";
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Avatar, Grid, InputAdornment, IconButton } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import SSHGoldLogo from '@/assets/GoldLogo.png';
import Image from 'next/image';
import { useState } from "react";

import { useAuth } from "@/providers/auth-providers";
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { useCookies } from "react-cookie";
import { redirect } from "next/navigation";
import Link from "next/link";

import CampaignIcon from '@mui/icons-material/Campaign';
import StarsIcon from '@mui/icons-material/Stars';
import LanguageIcon from '@mui/icons-material/Language';
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const features = [
  {
    text: "Access exclusive casting calls",
    alt: "Casting calls icon"
  },
  {
    text: "Professional portfolio management",
    alt: "Portfolio management icon"
  },
  {
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
    confirmPassword: ''
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const [cookies, setCookie] = useCookies(['username', 'email']);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("Name:", name);
    console.log("Value:", value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const { firstname, lastname, email, username, password, confirmPassword } = formData;

    const requirements = [
      {
        check: firstname && lastname && email && username && password && confirmPassword,
        message: "All fields are required.",
      },
      {
        check: password.length >= 8,
        message: "Password must be at least 8 characters long.",
      },
      {
        check: /[A-Z]/.test(password),
        message: "Password must contain at least one uppercase letter.",
      },
      {
        check: /[a-z]/.test(password),
        message: "Password must contain at least one lowercase letter.",
      },
      {
        check: /[0-9]/.test(password),
        message: "Password must contain at least one digit.",
      },
      {
        check: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        message: "Password must contain at least one special character.",
      },
      {
        check: !password.includes(username),
        message: "Password cannot contain the username.",
      },
      {
        check: password === confirmPassword,
        message: "Passwords must match.",
      },
    ];

    const unmetRequirements = requirements.filter((requirement) => !requirement.check);

    if (unmetRequirements.length > 0) {
      return unmetRequirements.map((req) => req.message);
    }

    return [];
  };

  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Form Data", formData);

    const errors = validateForm();

    if (errors.length > 0) {
      console.error("Validation Errors:", errors);
      setSnackbarMessage(errors.join("\n"));
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    setCookie("username", formData.username);

    try {
      await register(
        formData.username,
        formData.password,
        formData.email,
        formData.firstname,
        formData.lastname
      );

      setLoginSuccess(true);

      setSnackbarMessage('Registration successful! Redirecting to OTP Page...');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      setTimeout(() => {
        redirect('/otp');
      }, 2000);
    } catch (error: any) {
      console.error('Registration failed:', error);
      let errorMessage = 'Registration failed. Please try again.';
      
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);

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

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: 'transparent' }}>
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Box sx={{ display: { md: 'flex', xs: 'none' }, alignItems: 'flex-start', position: 'relative', mb: 2 }}>
              <Link href="/">
                <Image
                  src={SSHGoldLogo.src}
                  alt="Staffing Solutions Logo"
                  width={200}
                  height={204}
                  style={{ opacity: 0.5, overflow: 'hidden' }}
                />
              </Link>
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
                  {index === 0 && <StarsIcon sx={{ color: '#CEAB76', fontSize: 24 }} />}
                  {index === 1 && <CampaignIcon sx={{ color: '#CEAB76', fontSize: 24 }} />}
                  {index === 2 && <LanguageIcon sx={{ color: '#CEAB76', fontSize: 24 }} />}
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
            <form onSubmit={handleSubmit} method="POST">
              <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                  <TextField
                    label="First Name"
                    id="firstname"
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
                    id="lastname"
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
                {/* Password Field */}
                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
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
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility} edge="end">
                          {showPassword ? <VisibilityOff sx={{ color: '#977342' }} /> : <Visibility sx={{ color: '#977342' }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Confirm Password Field */}
                <TextField
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
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
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                          {showConfirmPassword ? <VisibilityOff sx={{ color: '#977342' }} /> : <Visibility sx={{ color: '#977342' }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControlLabel
                  control={<Checkbox sx={{ color: '#977342' }} id="terms" />}
                  label={
                    <Typography sx={{ fontSize: { xs: '12px' }, color: { md: '#fff', xs: '#ceab76' } }}>
                      I agree to the <Link target="_blank" href="/terms-of-service">Terms of Service</Link> and <Link target="_blank" href="/privacy-policy">Privacy Policy</Link>
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
                  <Link href="/login"><Button variant="text" sx={{
                    padding: 0, color: '#977342', '&:hover': {
                      color: '#CEAB76',
                      background: 'transparent'
                    }
                  }}>Sign in</Button></Link>
                </Typography>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: 'center', marginTop: 4, color: 'gray.400', fontSize: { xs: '12px' } }}>
        © 2025 Staffing Solutions Hub. All rights reserved.
      </Box>
      {/* Snackbar for notifications */}
      {!loginSuccess && (<Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            width: { xs: '90%', sm: '400px' },
            margin: '0 auto',
            backgroundColor: '#ffffff', // Set background to white
          },
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{
            width: '100%',
            backgroundColor: '#ffffff',
            color: '#333', 
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column', 
            alignItems: 'flex-start',
          }}
        >
          {/* Display the list of messages */}
          {snackbarMessage.split('\n').map((message, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: index !== snackbarMessage.split('\n').length - 1 ? '8px' : '0',
              }}
            >
              <span
                style={{
                  marginRight: '8px',
                  fontSize: '16px',
                }}
              >
                {message.startsWith('✅') ? '✅' : '❌'}
              </span>
              <span>{message.trim()}</span>
            </div>
          ))}
        </Alert>
      </Snackbar>)}
      {loginSuccess && (
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
      )}
    </Box>
  );
};