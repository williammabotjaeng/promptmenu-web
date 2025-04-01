"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAuth } from '@/providers/auth-providers';
import '@/styles/globals.css';
import { Box, Typography, Container, Paper, TextField, Button, Link as MuiLink, CircularProgress, Divider } from '@mui/material';
import { MenuBook, Email, Lock, Login as LoginIcon } from '@mui/icons-material';
import Link from 'next/link';

const Login: React.FC = () => {
  const { login, loginIsLoading, loginError } = useAuth();
  const router = useRouter();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  useEffect(() => {
    // Add animation effect on mount
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Watch for errors from auth provider
  useEffect(() => {
    if (loginError) {
      setSnackbar({
        open: true,
        message: loginError.message || 'Login failed. Please try again.',
        severity: 'error',
      });
    }
  }, [loginError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
    };
    let isValid = true;
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Login with email and password using auth provider
      await login({
        email: formData.email,
        password: formData.password
      });
      
      // Show success message (though auth provider will redirect)
      setSnackbar({
        open: true,
        message: 'Login successful! Redirecting...',
        severity: 'success',
      });
    } catch (err) {
      // Error handling is done via the useEffect watching loginError
      console.error('Login submission error:', err);
    }
  };

  const handleMicrosoftLogin = () => {
    try {
      // This would call the microsoftLogin method from your auth provider
      // For now, we'll just show a message
      setSnackbar({
        open: true,
        message: 'Microsoft login is not implemented yet',
        severity: 'error',
      });
    } catch (error) {
      console.error('Microsoft login error:', error);
      setSnackbar({
        open: true,
        message: `Error with Microsoft login: ${error.message}`,
        severity: 'error',
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e0f2f1 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,124,16,0.05) 0%, rgba(0,120,212,0.05) 100%)',
          top: '-25vw',
          right: '-25vw',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '30vw',
          height: '30vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,124,16,0.05) 0%, rgba(0,120,212,0.05) 100%)',
          bottom: '-15vw',
          left: '-15vw',
          zIndex: 0,
        }}
      />

      {/* Header Bar */}
      <Box 
        sx={{
          py: 2, 
          px: 4, 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255,255,255,0.8)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          position: 'relative',
          zIndex: 5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MenuBook sx={{ color: '#107C10', fontSize: 32 }} />
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700, 
              background: 'linear-gradient(90deg, #107C10, #0078D4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              cursor: 'pointer'
            }}
            onClick={() => router.push('/')}
          >
            PromptMenu
          </Typography>
        </Box>
        <Box>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#555', 
              display: 'flex', 
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
              <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
              <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
              <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
            </svg>
            Powered by Azure AI
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Container 
        maxWidth="xl" 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          py: 4,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box 
          sx={{
            width: '100%',
            opacity: isPageLoading ? 0 : 1,
            transform: isPageLoading ? 'translateY(20px)' : 'translateY(0)',
            transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {/* Login Form */}
          <Paper 
            elevation={2} 
            sx={{
              p: 4,
              borderRadius: 3,
              width: { xs: '100%', sm: '450px' },
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 700, color: '#107C10', textAlign: 'center' }}>
              Sign In
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', textAlign: 'center' }}>
              Welcome back to PromptMenu
            </Typography>
            
            <Button
              fullWidth
              variant="outlined"
              startIcon={
                <svg width="20" height="20" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
                  <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
                  <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
                  <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
                </svg>
              }
              onClick={handleMicrosoftLogin}
              disabled={loginIsLoading}
              sx={{
                py: 1.5,
                mb: 3,
                borderColor: '#0078D4',
                color: '#0078D4',
                '&:hover': {
                  borderColor: '#0078D4',
                  backgroundColor: 'rgba(0, 120, 212, 0.1)',
                },
              }}
            >
              Sign in with Microsoft
            </Button>
            
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ px: 1, color: 'text.secondary' }}>
                OR SIGN IN WITH EMAIL
              </Typography>
            </Divider>
            
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                error={!!errors.email}
                helperText={errors.email || ''}
                sx={{ mb: 2 }}
                disabled={loginIsLoading}
                InputProps={{
                  startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} fontSize="small" />,
                }}
              />
              
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                error={!!errors.password}
                helperText={errors.password || ''}
                sx={{ mb: 3 }}
                disabled={loginIsLoading}
                InputProps={{
                  startAdornment: <Lock sx={{ mr: 1, color: 'text.secondary' }} fontSize="small" />,
                }}
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                <Link href="/forgot-password" passHref>
                  <MuiLink sx={{ color: '#0078D4', fontWeight: 500, fontSize: '0.875rem' }}>
                    Forgot password?
                  </MuiLink>
                </Link>
              </Box>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loginIsLoading}
                startIcon={<LoginIcon />}
                sx={{
                  py: 1.5,
                  backgroundColor: '#107C10',
                  '&:hover': {
                    backgroundColor: '#0b5e0b',
                  },
                }}
              >
                {loginIsLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
            
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Don't have an account yet?{' '}
                <Link href="/register" passHref>
                  <MuiLink sx={{ color: '#0078D4', fontWeight: 500 }}>
                    Sign up
                  </MuiLink>
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>

      {/* Footer */}
      <Box 
        sx={{ 
          py: 2, 
          textAlign: 'center', 
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255,255,255,0.8)',
          position: 'relative',
          zIndex: 5,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} PromptMenu — Transform your restaurant experience with digital menus
        </Typography>
      </Box>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          elevation={6}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;