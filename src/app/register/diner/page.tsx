"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAuth } from '@/providers/auth-providers'; 
import '@/styles/globals.css';
import { Box, Typography, Container, Paper, Button, TextField, Divider, Link as MuiLink, CircularProgress } from '@mui/material';
import { MenuBook, RestaurantMenu, VerifiedUser, Translate, Fastfood } from '@mui/icons-material';
import Link from 'next/link';
import Loading from '@/components/Loading';

const RegisterDiner: React.FC = () => {
  const { register, isLoading, error } = useAuth(); // Use the auth provider hook with register function
  const router = useRouter();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
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
    if (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Registration failed. Please try again.',
        severity: 'error',
      });
    }
  }, [error]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Validate form
    let hasErrors = false;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      hasErrors = true;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      hasErrors = true;
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
      hasErrors = true;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      hasErrors = true;
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      hasErrors = true;
    }
    
    setErrors(newErrors);
    
    if (!hasErrors) {
      try {
        // Format data for auth provider
        const registrationData = {
          displayName: formData.name,
          givenName: formData.name.split(' ')[0],
          surname: formData.name.split(' ').slice(1).join(' ') || '',
          email: formData.email,
          password: formData.password,
          user_type: 'customer', // Use customer as user_type for diners
        };

        // Call register from auth provider
        await register(registrationData);
        
        // Success message is handled by the auth provider,
        // which will automatically redirect after successful registration
        setLoading(false);
        
      } catch (err) {
        console.error('Registration error:', err);
        // Error handling is done via the useEffect watching the error state from auth provider
        setLoading(false);
      }
    }
  };

  const handleMicrosoftLogin = () => {
    try {
      // Build the Microsoft login URL
      const microsoftLoginUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/microsoft/login`;
      const params = new URLSearchParams({
        userType: 'customer'
      }).toString();
      
      // Redirect to Microsoft login page
      window.location.href = `${microsoftLoginUrl}?${params}`;
    } catch (error) {
      console.error('Microsoft login error:', error);
      setSnackbar({
        open: true,
        message: `Error redirecting to Microsoft login: ${error.message}`,
        severity: 'error',
      });
    }
  };

  if (loading) return <Loading />;

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
            gap: 4,
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          {/* Registration Form */}
          <Paper 
            elevation={2} 
            sx={{
              p: 4,
              borderRadius: 3,
              width: { xs: '100%', md: '50%' },
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 700, color: '#107C10' }}>
              Register as a Diner
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
              Create your diner account to access restaurant digital menus
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
              disabled={isLoading}
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
              Sign up with Microsoft
            </Button>
            
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ px: 1, color: 'text.secondary' }}>
                OR REGISTER WITH EMAIL
              </Typography>
            </Divider>
            
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                error={!!errors.name}
                helperText={errors.name || ''}
                sx={{ mb: 2 }}
                disabled={isLoading}
              />
              
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
                disabled={isLoading}
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
                sx={{ mb: 2 }}
                disabled={isLoading}
              />
              
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                margin="normal"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword || ''}
                sx={{ mb: 3 }}
                disabled={isLoading}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  backgroundColor: '#107C10',
                  '&:hover': {
                    backgroundColor: '#0b5e0b',
                  },
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
            
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Already have an account?{' '}
                <Link href="/login" passHref>
                  <MuiLink sx={{ color: '#0078D4', fontWeight: 500 }}>
                    Sign in
                  </MuiLink>
                </Link>
              </Typography>
              
              <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                Are you a restaurant owner?{' '}
                <Link href="/register/restaurant" passHref>
                  <MuiLink sx={{ color: '#0078D4', fontWeight: 500 }}>
                    Register your restaurant
                  </MuiLink>
                </Link>
              </Typography>
            </Box>
          </Paper>
          
          {/* Benefits Section */}
          <Box 
            sx={{ 
              width: { xs: '100%', md: '50%' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 4, 
                fontWeight: 700, 
                color: '#0078D4',
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              Discover the Benefits
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <Box 
                  sx={{ 
                    bgcolor: 'rgba(16, 124, 16, 0.1)',
                    p: 1.5,
                    borderRadius: 2,
                    color: '#107C10',
                  }}
                >
                  <Fastfood />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Explore Rich Menu Content
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Experience menus with videos, images, and detailed information about each dish.
                  </Typography>
                </Box>
              </Paper>
              
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <Box 
                  sx={{ 
                    bgcolor: 'rgba(0, 120, 212, 0.1)',
                    p: 1.5,
                    borderRadius: 2,
                    color: '#0078D4',
                  }}
                >
                  <Translate />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Multilingual Support
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    View menus in your preferred language with our AI-powered translation.
                  </Typography>
                </Box>
              </Paper>
              
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <Box 
                  sx={{ 
                    bgcolor: 'rgba(80, 230, 255, 0.1)',
                    p: 1.5,
                    borderRadius: 2,
                    color: '#0078D4',
                  }}
                >
                  <VerifiedUser />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Secure Microsoft Authentication
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Sign in quickly and securely with your Microsoft account for a seamless experience.
                  </Typography>
                </Box>
              </Paper>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  mt: 2, 
                  fontStyle: 'italic',
                  color: 'text.secondary',
                  textAlign: 'center'
                }}
              >
                Join PromptMenu today and <strong>TIP</strong> your dining experience to the next level!
              </Typography>
            </Box>
          </Box>
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
          severity={snackbar.severity === 'success' ? 'success' : 'error'} 
          elevation={6}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterDiner;