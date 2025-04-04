"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/globals.css';
import { 
  Box, 
  Typography, 
  Container, 
  Card,
  CardContent,
  CardActions,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import { 
  ReceiptLong, 
  ImageSearch,
  QuestionAnswer
} from '@mui/icons-material';
import RestaurantDashboardHeader from '@/components/restaurant/Header';

const Dashboard = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    // Add animation effect on mount
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Navigate to feature-specific pages
  const navigateToFeature = (feature) => {
    switch(feature) {
      case 'receipts':
        router.push('/receipt');
        break;
      case 'menu':
        router.push('/menu-analysis');
        break;
      case 'qna':
        router.push('/assistant');
        break;
      default:
        console.error('Unknown feature:', feature);
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
        mt: { xs: 6, sm: 8, md: 12 }
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

      <RestaurantDashboardHeader />

      {/* Main Content */}
      <Container 
        maxWidth="xl" 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          py: 4,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box 
          sx={{
            width: '100%',
            opacity: isLoading ? 0 : 1,
            transform: isLoading ? 'translateY(20px)' : 'translateY(0)',
            transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
          }}
        >
          {/* Dashboard Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Welcome to your PromptMenu dashboard. Explore our AI-powered features below.
            </Typography>
          </Box>

          {/* Feature Cards */}
          <Grid container spacing={3}>
            {/* Receipt Processing Feature Card */}
            <Grid item xs={12} md={4}>
              <Card 
                elevation={3}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <ReceiptLong sx={{ fontSize: 60, color: '#107C10' }} />
                  </Box>
                  <Typography variant="h5" component="div" align="center" sx={{ mb: 2 }}>
                    Receipt Processing
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Automatically scan and process invoices and receipts to streamline receiving and accounting. 
                    Extract item prices, quantities, taxes, and totals with our advanced AI.
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button 
                    fullWidth 
                    variant="contained"
                    onClick={() => navigateToFeature('receipts')}
                    sx={{ 
                      backgroundColor: '#107C10',
                      '&:hover': { backgroundColor: '#0b5e0b' }
                    }}
                  >
                    Try Demo
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* Menu Analysis Feature Card */}
            <Grid item xs={12} md={4}>
              <Card 
                elevation={3}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <ImageSearch sx={{ fontSize: 60, color: '#107C10' }} />
                  </Box>
                  <Typography variant="h5" component="div" align="center" sx={{ mb: 2 }}>
                    Menu Analysis
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    AI-powered visual menu interpretation helps customers understand dishes better with 
                    detailed ingredient analysis, nutritional information, and allergen detection.
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button 
                    fullWidth 
                    variant="contained"
                    onClick={() => navigateToFeature('menu')}
                    sx={{ 
                      backgroundColor: '#107C10',
                      '&:hover': { backgroundColor: '#0b5e0b' }
                    }}
                  >
                    Try Demo
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* Q&A Bot Feature Card */}
            <Grid item xs={12} md={4}>
              <Card 
                elevation={3}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <QuestionAnswer sx={{ fontSize: 60, color: '#107C10' }} />
                  </Box>
                  <Typography variant="h5" component="div" align="center" sx={{ mb: 2 }}>
                    Q&A Assistant
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Comprehensive AI assistant that answers customer questions about menu items, 
                    ingredients, or preparation methods. Enhance customer experience with instant information.
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button 
                    fullWidth 
                    variant="contained"
                    onClick={() => navigateToFeature('qna')}
                    sx={{ 
                      backgroundColor: '#107C10',
                      '&:hover': { backgroundColor: '#0b5e0b' }
                    }}
                  >
                    Try Demo
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
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
          severity={snackbar.severity === "success" ? "success" : "error"} 
          elevation={6}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;