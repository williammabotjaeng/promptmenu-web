"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/globals.css';
import Grid from '@mui/material/GridLegacy';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Button,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  Chip
} from '@mui/material';
import { 
  MenuBook, 
  CloudUpload, 
  ImageSearch,
  ArrowBack,
  Check,
  Restaurant,
  LocalDining,
  LocalFireDepartment,
  Warning
} from '@mui/icons-material';

// Import the useAI hook from our AIProvider
import { useAI } from '@/providers/ai-provider';

const MenuAnalysis = () => {
  const router = useRouter();
  // Get the AI methods and states from our context
  const { analyzeMenuImage, isMenuAnalysisLoading, menuAnalysisResponse, menuAnalysisError, resetMenuAnalysisResponse } = useAI();
  
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    // Add animation effect on mount
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Update local state when the response from AI provider changes
  useEffect(() => {
    if (menuAnalysisResponse) {
      setAnalysisResults(menuAnalysisResponse);
      
      setSnackbar({
        open: true,
        message: 'Menu analysis complete!',
        severity: 'success',
      });
    }
  }, [menuAnalysisResponse]);

  // Handle errors from the AI provider
  useEffect(() => {
    if (menuAnalysisError) {
      setSnackbar({
        open: true,
        message: `Error analyzing menu: ${menuAnalysisError.response?.data?.error || menuAnalysisError.message}`,
        severity: 'error',
      });
    }
  }, [menuAnalysisError]);

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Create a preview URL for image files
      if (selectedFile.type.startsWith('image/')) {
        const fileUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(fileUrl);
      } else {
        setPreviewUrl('');
      }
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      setSnackbar({
        open: true,
        message: 'Please select a menu image first',
        severity: 'warning',
      });
      return;
    }

    try {
      // Reset previous analysis results when starting a new one
      resetMenuAnalysisResponse();
      
      // User details (in a real app, these might come from authentication)
      const userDetails = {
        userId: 'demo-user-123',
        displayName: 'Demo User',
        restaurant: 'Demo Restaurant',
        email: 'demo@example.com'
      };
      
      // Get dietary restrictions and health conditions from localStorage
      const dietaryRestrictions = localStorage.getItem('dietary_restrictions');
      const healthConditions = localStorage.getItem('health_conditions');
      
      // Create the params object for the analysis call
      const analysisParams: any = {
        file: file,
        ...userDetails
      };

      // Add dietary restrictions and health conditions if available
      if (dietaryRestrictions) {
        analysisParams.dietary_restrictions = dietaryRestrictions;
      }
      
      if (healthConditions) {
        analysisParams.health_conditions = healthConditions;
      }
      
      // Call our AI provider's menu analysis function
      await analyzeMenuImage(analysisParams);
      
    } catch (error) {
      console.error('Error analyzing menu:', error);
      setSnackbar({
        open: true,
        message: `Error analyzing menu: ${error.message}`,
        severity: 'error',
      });
    }
  };

  const renderAnalysisResults = () => {
    if (!analysisResults) return null;
    
    const analysis = analysisResults.analysis || {};
    
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Menu Analysis Results
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#107C10' }}>
                <Restaurant sx={{ mr: 1, verticalAlign: 'bottom' }} />
                Dish Information
              </Typography>
              
              <Typography variant="h5" sx={{ mb: 2 }}>
                {analysisResults.dish_name || analysis.dish_analyzed || 'Unnamed Dish'}
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 3 }}>
                {analysis.description || 'No description available.'}
              </Typography>
              
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                Ingredients:
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                {analysis.ingredients && analysis.ingredients.length > 0 ? (
                  <Grid container spacing={1}>
                    {analysis.ingredients.map((ingredient, index) => (
                      <Grid item key={index}>
                        <Chip 
                          label={ingredient} 
                          variant="outlined" 
                          size="small"
                          sx={{ mb: 1 }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No ingredient information available.
                  </Typography>
                )}
              </Box>
              
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                Dietary Information:
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                {analysis.dietary_info || 'No dietary information available.'}
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#107C10' }}>
                <LocalFireDepartment sx={{ mr: 1, verticalAlign: 'bottom' }} />
                Nutritional Information
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                  Calories:
                </Typography>
                <Typography variant="body1">
                  {analysis.calories || 'Not available'}
                </Typography>
              </Box>
              
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                Nutrition:
              </Typography>
              
              {analysis.nutrition ? (
                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="Protein" 
                      secondary={analysis.nutrition.protein || 'Not available'} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Carbohydrates" 
                      secondary={analysis.nutrition.carbs || 'Not available'} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Fat" 
                      secondary={analysis.nutrition.fat || 'Not available'} 
                    />
                  </ListItem>
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No detailed nutritional information available.
                </Typography>
              )}
              
              <Divider sx={{ my: 2 }} />
              
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: analysis.health_warnings ? '#d32f2f' : '#107C10' }}>
                  <Warning sx={{ mr: 1, verticalAlign: 'bottom', color: analysis.health_warnings ? '#d32f2f' : '#107C10' }} />
                  Health Considerations:
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {analysis.health_warnings || 'No specific health warnings for this dish.'}
                </Typography>
                
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                  <Check sx={{ mr: 1, verticalAlign: 'bottom' }} />
                  Recommendations:
                </Typography>
                <Typography variant="body2">
                  {analysis.recommendations || 'No specific recommendations available.'}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
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
          <Button
            startIcon={<ArrowBack />}
            onClick={() => router.push('/dashboard')}
            sx={{ mb: 3 }}
          >
            Back to Dashboard
          </Button>
          
          <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
            Menu Analysis
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 4 }}>
            Upload a dish image to get detailed nutritional information, ingredients analysis, and dietary advice.
          </Typography>
          
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              <ImageSearch sx={{ mr: 1, verticalAlign: 'bottom' }} />
              Analyze Menu Item
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Our AI can analyze food images to identify ingredients, estimate nutritional content, and provide dietary advice. Simply upload a clear image of a dish to get started.
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', mb: 3 }}>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUpload />}
                    sx={{ mb: 2 }}
                  >
                    Select Menu Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </Button>
                  
                  {file && (
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Selected file: {file.name}
                    </Typography>
                  )}
                  
                  <Button
                    variant="contained"
                    onClick={handleFileUpload}
                    disabled={!file || isMenuAnalysisLoading}
                    sx={{ 
                      backgroundColor: '#107C10',
                      '&:hover': { backgroundColor: '#0b5e0b' }
                    }}
                  >
                    {isMenuAnalysisLoading ? <CircularProgress size={24} color="inherit" /> : 'Analyze Menu Item'}
                  </Button>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {previewUrl ? (
                  <Box 
                    component="img"
                    src={previewUrl}
                    alt="Image preview"
                    sx={{ 
                      maxWidth: '100%', 
                      maxHeight: '250px',
                      borderRadius: 2,
                      boxShadow: 3
                    }}
                  />
                ) : (
                  <Box 
                    sx={{ 
                      width: '100%',
                      height: '250px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f5f5f5',
                      borderRadius: 2,
                      border: '2px dashed #ccc'
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Image preview will appear here
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Paper>
          
          {isMenuAnalysisLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <CircularProgress size={60} sx={{ mb: 2, color: '#107C10' }} />
                <Typography variant="h6">
                  Analyzing menu item...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Our AI is identifying ingredients and nutritional information.
                </Typography>
              </Box>
            </Box>
          )}
          
          {/* Analysis Results */}
          {renderAnalysisResults()}
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
          severity={snackbar.severity as any}
          elevation={6}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MenuAnalysis;