"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAuth } from '@/providers/auth-providers'; 
import '@/styles/globals.css';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Button, 
  TextField, 
  Divider, 
  Link as MuiLink,
  Stepper,
  Step,
  StepLabel,
  CircularProgress
} from '@mui/material';

import { MenuBook, ReceiptLong, ImageSearch, Fastfood, QuestionAnswer } from '@mui/icons-material';
import Link from 'next/link';
import Loading from '@/components/Loading';

// Environment variables
const ENV = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_HELP_BOT_URL: process.env.NEXT_PUBLIC_HELP_BOT_URL
};

const RegisterRestaurant = () => {
  const { register, isLoading, error, registerIsLoading } = useAuth(); // Use auth hook functions
  const router = useRouter();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Restaurant info
    restaurantName: '',
    businessEmail: '',
    phoneNumber: '',
    address: '',
    // Owner info
    ownerName: '',
    ownerEmail: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    restaurantName: '',
    businessEmail: '',
    phoneNumber: '',
    address: '',
    ownerName: '',
    ownerEmail: '',
    password: '',
    confirmPassword: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const steps = ['Restaurant Information', 'Account Details'];

  useEffect(() => {
    // Add animation effect on mount
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Show snackbar for auth errors
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
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const validateRestaurantInfo = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!formData.restaurantName.trim()) {
      newErrors.restaurantName = 'Restaurant name is required';
      isValid = false;
    }

    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = 'Business email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.businessEmail)) {
      newErrors.businessEmail = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateAccountDetails = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!formData.ownerName.trim()) {
      newErrors.ownerName = 'Name is required';
      isValid = false;
    }

    if (!formData.ownerEmail.trim()) {
      newErrors.ownerEmail = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.ownerEmail)) {
      newErrors.ownerEmail = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (activeStep === 0 && validateRestaurantInfo()) {
      setActiveStep(1);
    }
  };

  const handleBack = () => {
    setActiveStep(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    
    if (!validateAccountDetails()) {
      return;
    }

    try {
      // Create formatted registration data for auth provider
      const registrationData = {
        displayName: formData.ownerName,
        givenName: formData.ownerName.split(' ')[0],
        surname: formData.ownerName.split(' ').slice(1).join(' '),
        email: formData.ownerEmail,
        password: formData.password,
        user_type: 'owner',
        mobile_number: formData.phoneNumber,
        company_name: formData.restaurantName,
        business_address: formData.address
      };

      // Use the register function from auth provider
      await register(registrationData);
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Registration successful! Redirecting to Dashboard...',
        severity: 'success',
      });

      setLoading(false);
      
      // Note: no need to manually redirect - the auth provider will handle this
    } catch (err) {
      // Error handling is now done via the useEffect watching the error state
      console.error('Registration error:', err);
      setLoading(false);
    }
  };

  const handleMicrosoftLogin = () => {
    try {
      // Build the Microsoft login URL
      const microsoftLoginUrl = `${ENV.NEXT_PUBLIC_API_URL}/auth/microsoft/login`;
      const params = new URLSearchParams({
        userType: 'owner'
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

  const handleHome = () => {
    router.replace("/");
  }

  // Render form based on active step
  const renderForm = () => {
    if (activeStep === 0) {
      return (
        <form>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Tell us about your restaurant
          </Typography>
          
          <TextField
            fullWidth
            label="Restaurant Name"
            name="restaurantName"
            value={formData.restaurantName}
            onChange={handleChange}
            margin="normal"
            error={!!errors.restaurantName}
            helperText={errors.restaurantName || ''}
            sx={{ mb: 2 }}
            disabled={isLoading}
          />
          
          <TextField
            fullWidth
            label="Business Email"
            name="businessEmail"
            type="email"
            value={formData.businessEmail}
            onChange={handleChange}
            margin="normal"
            error={!!errors.businessEmail}
            helperText={errors.businessEmail || ''}
            sx={{ mb: 2 }}
            disabled={isLoading}
          />
          
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            margin="normal"
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber || ''}
            sx={{ mb: 2 }}
            disabled={isLoading}
          />
          
          <TextField
            fullWidth
            label="Restaurant Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={2}
            error={!!errors.address}
            helperText={errors.address || ''}
            sx={{ mb: 3 }}
            disabled={isLoading}
          />
          
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={isLoading}
            sx={{
              py: 1.5,
              px: 4,
              backgroundColor: '#107C10',
              '&:hover': {
                backgroundColor: '#0b5e0b',
              },
            }}
          >
            Continue
          </Button>
        </form>
      );
    } else {
      return (
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Create your account
          </Typography>
          
          <TextField
            fullWidth
            label="Owner/Manager Name"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            margin="normal"
            error={!!errors.ownerName}
            helperText={errors.ownerName || ''}
            sx={{ mb: 2 }}
            disabled={isLoading}
          />
          
          <TextField
            fullWidth
            label="Owner/Manager Email"
            name="ownerEmail"
            type="email"
            value={formData.ownerEmail}
            onChange={handleChange}
            margin="normal"
            error={!!errors.ownerEmail}
            helperText={errors.ownerEmail || ''}
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
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={isLoading}
              sx={{
                py: 1.5,
                px: 3,
                borderColor: '#0078D4',
                color: '#0078D4',
              }}
            >
              Back
            </Button>
            
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                py: 1.5,
                px: 4,
                backgroundColor: '#107C10',
                '&:hover': {
                  backgroundColor: '#0b5e0b',
                },
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Register Restaurant'
              )}
            </Button>
          </Box>
        </form>
      );
    }
  };

  if (registerIsLoading) return <Loading />;

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
            onClick={handleHome}
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
              width: { xs: '100%', md: '60%' },
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 700, color: '#107C10' }}>
              Register Your Restaurant
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
              Join PromptMenu to enhance operations with AI-powered receipt processing, menu analysis, and customer assistance
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
              Register with Microsoft
            </Button>
            
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ px: 1, color: 'text.secondary' }}>
                OR REGISTER MANUALLY
              </Typography>
            </Divider>
            
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            
            {/* Render the appropriate form based on active step */}
            {renderForm()}
            
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Already have an account?{' '}
                <Link href="/login" passHref>
                  <MuiLink sx={{ color: '#0078D4', fontWeight: 500 }}>
                    Sign in
                  </MuiLink>
                </Link>
              </Typography>
              
              <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                Are you a diner?{' '}
                <Link href="/register/diner" passHref>
                  <MuiLink sx={{ color: '#0078D4', fontWeight: 500 }}>
                    Register as a diner
                  </MuiLink>
                </Link>
              </Typography>
            </Box>
          </Paper>
          
          {/* Benefits Section */}
          <Box 
            sx={{ 
              width: { xs: '100%', md: '40%' },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Paper
              elevation={2}
              sx={{
                p: 4,
                borderRadius: 3,
                mb: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#0078D4' }}>
                Our AI-Powered Solutions
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <ReceiptLong sx={{ color: '#107C10', mt: 0.5 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Intelligent Receipt & Invoice Processing
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Automatically scan and process incoming invoices and receipts to streamline receiving and accounting.
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <ImageSearch sx={{ color: '#107C10', mt: 0.5 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Menu Image Analysis
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      AI-powered visual menu interpretation helps customers understand dishes better with detailed ingredient analysis.
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Fastfood sx={{ color: '#107C10', mt: 0.5 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Informed Food Choice Assistant
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Help customers make dietary-appropriate choices with nutritional insights and allergen information.
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <QuestionAnswer sx={{ color: '#107C10', mt: 0.5 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Interactive Q&A Bot
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Comprehensive AI assistant that answers any customer questions about menu items, ingredients, or preparation methods.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
            
            <Paper
              elevation={2}
              sx={{
                p: 4,
                borderRadius: 3,
                backgroundColor: 'rgba(16, 124, 16, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(16, 124, 16, 0.1)',
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#107C10' }}>
                How PromptMenu Works
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box 
                    sx={{ 
                      width: 30, 
                      height: 30, 
                      borderRadius: '50%', 
                      bgcolor: '#107C10', 
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      flexShrink: 0,
                    }}
                  >
                    1
                  </Box>
                  <Typography variant="body1">
                    <strong>Upload your receipts and invoices</strong> to automate processing and inventory management
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box 
                    sx={{ 
                      width: 30, 
                      height: 30, 
                      borderRadius: '50%', 
                      bgcolor: '#107C10', 
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      flexShrink: 0,
                    }}
                  >
                    2
                  </Box>
                  <Typography variant="body1">
                    <strong>Create an AI-enhanced digital menu</strong> with detailed dish information and visual analysis
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box 
                    sx={{ 
                      width: 30, 
                      height: 30, 
                      borderRadius: '50%', 
                      bgcolor: '#107C10', 
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      flexShrink: 0,
                    }}
                  >
                    3
                  </Box>
                  <Typography variant="body1">
                    <strong>Enable the interactive Q&A assistant</strong> for personalized customer support and food recommendations
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box 
                    sx={{ 
                      width: 30, 
                      height: 30, 
                      borderRadius: '50%', 
                      bgcolor: '#107C10', 
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      flexShrink: 0,
                    }}
                  >
                    4
                  </Box>
                  <Typography variant="body1">
                    <strong>Track customer engagement</strong> with detailed analytics on how users interact with your menu
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontStyle: 'italic',
                    fontWeight: 500
                  }}
                >
                  Join today and transform your restaurant operations with our intelligent AI solutions!
                </Typography>
              </Box>
            </Paper>
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
          © {new Date().getFullYear()} PromptMenu — AI-powered solutions for modern restaurant management
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

export default RegisterRestaurant;