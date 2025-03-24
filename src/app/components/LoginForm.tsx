"use client";

import * as React from 'react';
import { 
  Box, 
  Button, 
  Checkbox, 
  FormControlLabel, 
  Grid, 
  IconButton, 
  InputAdornment, 
  TextField, 
  Typography,
  Paper,
  Divider,
  Fade 
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Visibility, 
  VisibilityOff,
  KeyRounded,
  EmailRounded 
} from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/auth-providers';
import SSHGoldLogo from '@/assets/GoldLogo.png';
import LoginImage from '@/assets/login-img.png';
import Image from 'next/image';

// Enhanced Alert component
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const router = useRouter();
  
  // State management
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info'
  });

  // Helper functions
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  
  const showNotification = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
    // Clear errors when field is updated
    if (errors[name]) {
      setErrors(prev => {
        const updated = {...prev};
        delete updated[name];
        return updated;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await login(formData.email, formData.password);
      
      showNotification("Login successful! Redirecting...", "success");
      
      // Store in localStorage if remember me is checked
      if (remember) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      // Slight delay for better UX
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (error: any) {
      console.error("Login failed:", error);
      
      // Show appropriate error message
      const errorMessage = error?.message || "Login failed. Please check your credentials.";
      showNotification(errorMessage, "error");
      
      setIsSubmitting(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({...prev, open: false}));
  };
  
  // Load remembered email on component mount
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData(prev => ({...prev, email: rememberedEmail}));
      setRemember(true);
    }
  }, []);

  // Gold color variables
  const goldPrimary = '#977342';
  const goldLight = '#CEAB76';
  const goldDark = '#80612E';
  
  return (
    <Grid container sx={{ minHeight: '100vh', backgroundColor: 'black' }}>
      {/* Left Column - Login Form */}
      <Grid 
        item 
        xs={12} 
        md={6} 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center',
          padding: { xs: 2, sm: 4, md: 6 },
          position: 'relative'
        }}
      >
        {/* Logo */}
        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none' }, position: 'absolute', top: 20, left: 20 }}>
          <Link href="/">
            <Image 
              src={SSHGoldLogo} 
              alt="Staffing Solutions Hub" 
              width={150} 
              height={150} 
              style={{ opacity: 0.8, transition: 'opacity 0.3s' }} 
              className="hover:opacity-100"
            />
          </Link>
        </Box>
        
        {/* Login Form Container */}
        <Paper 
          elevation={10} 
          sx={{ 
            maxWidth: 480,
            width: '100%',
            mx: 'auto',
            mt: { xs: 10, md: 0 },
            backgroundColor: 'rgba(20, 20, 20, 0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            overflow: 'hidden',
            border: `1px solid ${goldPrimary}`,
            p: 0
          }}
        >
          {/* Form Header */}
          <Box sx={{ 
            p: 3, 
            background: `linear-gradient(135deg, ${goldDark}, ${goldPrimary})`,
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Typography variant="h4" sx={{ 
              fontWeight: 700, 
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mt: 1 }}>
              Sign in to your account to continue
            </Typography>
          </Box>
          
          {/* Form Body */}
          <Box sx={{ p: 4 }}>
            <form onSubmit={handleSubmit} method="POST">
              {/* Email Field */}
              <TextField
                label="Email Address"
                type="email"
                name="email"
                placeholder="name@company.com"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                InputLabelProps={{
                  sx: {
                    color: errors.email ? 'error.main' : 'rgba(255, 255, 255, 0.7)',
                    '&.Mui-focused': {
                      color: goldPrimary,
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: errors.email ? 'error.main' : 'rgba(255, 255, 255, 0.3)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: errors.email ? 'error.main' : goldLight,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: errors.email ? 'error.main' : goldPrimary,
                    },
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailRounded sx={{ color: errors.email ? 'error.main' : goldPrimary }} />
                    </InputAdornment>
                  ),
                }}
              />
              
              {/* Password Field */}
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                InputLabelProps={{
                  sx: {
                    color: errors.password ? 'error.main' : 'rgba(255, 255, 255, 0.7)',
                    '&.Mui-focused': {
                      color: goldPrimary,
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: errors.password ? 'error.main' : 'rgba(255, 255, 255, 0.3)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: errors.password ? 'error.main' : goldLight,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: errors.password ? 'error.main' : goldPrimary,
                    },
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyRounded sx={{ color: errors.password ? 'error.main' : goldPrimary }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton 
                        onClick={togglePasswordVisibility} 
                        edge="end"
                        sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              {/* Remember Me and Forgot Password */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mt: 2 
              }}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.5)',
                        '&.Mui-checked': {
                          color: goldPrimary,
                        }
                      }} 
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Remember me
                    </Typography>
                  }
                />
                <Link href="/forgot" style={{ textDecoration: 'none' }}>
                  <Typography 
                    variant="body2"
                    sx={{
                      color: goldLight,
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      '&:hover': {
                        color: 'white',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Forgot Password?
                  </Typography>
                </Link>
              </Box>
              
              {/* Sign In Button */}
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  mt: 4,
                  mb: 2,
                  py: 1.5,
                  backgroundColor: goldPrimary,
                  color: 'white',
                  width: '100%',
                  fontSize: '1rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(151, 115, 66, 0.4)',
                  '&:hover': {
                    backgroundColor: goldDark,
                    boxShadow: '0 6px 16px rgba(151, 115, 66, 0.6)',
                  },
                  '&:disabled': {
                    backgroundColor: 'rgba(151, 115, 66, 0.5)',
                    color: 'rgba(255, 255, 255, 0.7)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
              
              {/* Sign Up Links */}
              <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
              
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Don't have an account?
                </Typography>
                
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                  <Link href="/register/2" style={{ textDecoration: 'none' }}>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: goldPrimary,
                        color: goldPrimary,
                        '&:hover': {
                          backgroundColor: 'rgba(151, 115, 66, 0.1)',
                          borderColor: goldLight,
                          color: goldLight
                        },
                      }}
                    >
                      Register as Client
                    </Button>
                  </Link>
                  
                  <Link href="/register/1" style={{ textDecoration: 'none' }}>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: goldPrimary,
                        color: goldPrimary,
                        '&:hover': {
                          backgroundColor: 'rgba(151, 115, 66, 0.1)',
                          borderColor: goldLight,
                          color: goldLight
                        },
                      }}
                    >
                      Register as Talent
                    </Button>
                  </Link>
                </Box>
              </Box>
            </form>
          </Box>
        </Paper>
      </Grid>

      {/* Right Column - Image */}
      <Grid 
        item 
        xs={12} 
        md={6} 
        sx={{ 
          display: { xs: 'none', md: 'block' }, 
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${LoginImage.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.7)',
              transition: 'transform 10s ease',
              animation: 'slowZoom 20s infinite alternate'
            }
          }}
        />
        
        {/* Dark Gradient Overlay */}
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            background: 'linear-gradient(45deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)',
            zIndex: 1
          }}
        />
        
        {/* Gold Accent Line */}
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '4px', 
            height: '100%', 
            backgroundColor: goldPrimary,
            zIndex: 2
          }}
        />
        
        {/* Content */}
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 4,
            zIndex: 2
          }}
        >
          {/* Slogan */}
          <Fade in timeout={1000}>
            <Box sx={{ maxWidth: '80%' }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: 'white',
                  fontWeight: 700,
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  mb: 2
                }}
              >
                Staffing Your Success,
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: goldPrimary,
                  fontWeight: 700,
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  mb: 2
                }}
              >
                One Event at a Time.
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                  maxWidth: '400px',
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                }}
              >
                Connect with top brands and opportunities in the fashion industry.
                Elevate your career or find the perfect talent for your next big event.
              </Typography>
            </Box>
          </Fade>
          
          {/* Social Media Links */}
          <Box>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                mb: 2
              }}
            >
              Connect with us
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link href="https://web.facebook.com/people/Staffing-Solutions-Hub/61568735786489" target="_blank">
                <IconButton
                  sx={{
                    color: 'white',
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: goldPrimary,
                      border: `1px solid ${goldPrimary}`,
                      transform: 'translateY(-3px)'
                    },
                  }}
                >
                  <Facebook />
                </IconButton>
              </Link>
              
              <Link href="https://www.instagram.com/staffingsolutionshub" target="_blank">
                <IconButton
                  sx={{
                    color: 'white',
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: goldPrimary,
                      border: `1px solid ${goldPrimary}`,
                      transform: 'translateY(-3px)'
                    },
                  }}
                >
                  <Instagram />
                </IconButton>
              </Link>
              
              <Link href="https://x.com/staffinghub_ae" target="_blank">
                <IconButton
                  sx={{
                    color: 'white',
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: goldPrimary,
                      border: `1px solid ${goldPrimary}`,
                      transform: 'translateY(-3px)'
                    },
                  }}
                >
                  <Twitter />
                </IconButton>
              </Link>
              
              <Link href="https://www.tiktok.com/@staffingsolutionshub" target="_blank">
                <IconButton
                  sx={{
                    color: 'white',
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: goldPrimary,
                      border: `1px solid ${goldPrimary}`,
                      transform: 'translateY(-3px)'
                    },
                  }}
                >
                  <FontAwesomeIcon style={{ fontSize: '20px' }} icon={faTiktok} />
                </IconButton>
              </Link>
            </Box>
          </Box>
        </Box>
      </Grid>
      
      {/* Global Styles */}
      <style jsx global>{`
        @keyframes slowZoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }
      `}</style>
      
      {/* Enhanced Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={Fade}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          sx={{ 
            width: '100%',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            '& .MuiAlert-icon': {
              fontSize: '1.5rem'
            }
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};