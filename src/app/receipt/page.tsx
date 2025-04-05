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
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { 
  MenuBook, 
  CloudUpload, 
  ReceiptLong,
  ArrowBack,
  PictureAsPdf,
  Image,
  AttachFile
} from '@mui/icons-material';

// Import the AI provider hook
import { useAI } from '@/providers/ai-provider';

const ReceiptProcessing = () => {
  const router = useRouter();
  
  // Use our AI provider hooks
  const { 
    analyzeReceipt, 
    isReceiptAnalysisLoading, 
    receiptAnalysisResponse, 
    receiptAnalysisError,
    resetReceiptAnalysisResponse
  } = useAI();
  
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [detailedResults, setDetailedResults] = useState(null);
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
  
  // Handle responses from the API
  useEffect(() => {
    if (receiptAnalysisResponse) {
      // When receipt analysis is complete, update the detailed results
      setDetailedResults(receiptAnalysisResponse);

      console.log("Receipt Response: ", receiptAnalysisResponse);
      
      setSnackbar({
        open: true,
        message: 'Receipt processed successfully!',
        severity: 'success',
      });
    }
  }, [receiptAnalysisResponse]);
  
  // Handle errors from the API
  useEffect(() => {
    if (receiptAnalysisError) {
      setSnackbar({
        open: true,
        message: `Error processing receipt: ${receiptAnalysisError.response?.data?.error || receiptAnalysisError.message}`,
        severity: 'error',
      });
    }
  }, [receiptAnalysisError]);
  
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
        message: 'Please select a receipt or invoice first',
        severity: 'warning',
      });
      return;
    }

    try {
      // Reset previous analysis
      resetReceiptAnalysisResponse();
      setDetailedResults(null);
      
      // Prepare user data
      const userData = {
        userId: 'demo-user-123',
        displayName: 'Demo User',
        restaurant: 'Demo Restaurant',
        email: 'demo@example.com'
      };
      
      // Process the receipt using our AIProvider
      await analyzeReceipt({
        file,
        ...userData
      });
      
      setSnackbar({
        open: true,
        message: 'Receipt uploaded successfully! Analyzing document...',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error processing receipt:', error);
      setSnackbar({
        open: true,
        message: `Error processing receipt: ${error.message}`,
        severity: 'error',
      });
    }
  };

  // Update the renderReceiptResults function in your ReceiptProcessing component:

const renderReceiptResults = () => {
  // Display loading state during processing
  if (isReceiptAnalysisLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', py: 4 }}>
        <CircularProgress size={40} sx={{ mb: 2 }} />
        <Typography>Processing your receipt...</Typography>
      </Box>
    );
  }
  
  // Display detailed receipt results once available
  if (detailedResults) {
    // Extract data from the API response
    let displayData = {
      merchant: 'Unknown Merchant',
      date: 'Unknown Date',
      items: [],
      subtotal: 0,
      tax: 0,
      total: 0
    };
    
    // Check if extracted_data is available
    if (detailedResults.extracted_data) {
      const extractedData = detailedResults.extracted_data;
      
      // Set merchant name
      if (extractedData.merchant) {
        displayData.merchant = extractedData.merchant;
      }
      
      // Set date
      if (extractedData.date) {
        displayData.date = extractedData.date;
      }
      
      // Set items
      if (extractedData.items && Array.isArray(extractedData.items)) {
        displayData.items = extractedData.items;
      }
      
      // Set totals
      if (extractedData.subtotal !== undefined) {
        displayData.subtotal = extractedData.subtotal;
      }
      
      if (extractedData.tax !== undefined) {
        displayData.tax = extractedData.tax;
      }
      
      if (extractedData.total !== undefined) {
        displayData.total = extractedData.total;
      }
    }
    
    return (
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Receipt Analysis Results
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Merchant:</strong> {displayData.merchant}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Date:</strong> {displayData.date}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Document Type:</strong> {detailedResults.receipt_type || 'Receipt'}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Document ID:</strong> {detailedResults.document_id || detailedResults.id}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            {previewUrl && (
              <Box 
                component="img"
                src={previewUrl}
                alt="Receipt preview"
                sx={{ 
                  maxWidth: '100%', 
                  maxHeight: '120px',
                  borderRadius: 1,
                  float: 'right'
                }}
              />
            )}
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Items:
        </Typography>
        
        {displayData.items && displayData.items.length > 0 ? (
          <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell><strong>Item</strong></TableCell>
                  <TableCell align="right"><strong>Quantity</strong></TableCell>
                  <TableCell align="right"><strong>Price</strong></TableCell>
                  <TableCell align="right"><strong>Total</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayData.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">
                      ${typeof item.price === 'number' ? (item.price / item.quantity).toFixed(2) : item.price}
                    </TableCell>
                    <TableCell align="right">
                      ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 2 }}>
            No detailed item information available
          </Typography>
        )}
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '200px', mb: 1 }}>
            <Typography variant="body2">
              <strong>Subtotal</strong>
            </Typography>
            <Typography variant="body2">
              ${typeof displayData.subtotal === 'number' ? displayData.subtotal.toFixed(2) : displayData.subtotal}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '200px', mb: 1 }}>
            <Typography variant="body2">
              <strong>Tax</strong>
            </Typography>
            <Typography variant="body2">
              ${typeof displayData.tax === 'number' ? displayData.tax.toFixed(2) : displayData.tax}
            </Typography>
          </Box>
          
          <Divider sx={{ width: '200px', my: 1 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '200px', mb: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              <strong>Total</strong>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              <strong>${typeof displayData.total === 'number' ? displayData.total.toFixed(2) : displayData.total}</strong>
            </Typography>
          </Box>
        </Box>
        
        {/* View original receipt button */}
        {detailedResults.blob_url && (
          <Box sx={{ mt: 3 }}>
            <Button 
              variant="outlined" 
              href={detailedResults.blob_url} 
              target="_blank" 
              rel="noopener noreferrer"
              startIcon={<Image />}
            >
              View Original Receipt
            </Button>
          </Box>
        )}
      </Paper>
    );
  }
  
  // If no results yet, return null
  return null;
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
      
          
          <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
            Receipt Processing
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 4 }}>
            Upload receipts and invoices to automatically extract items, prices, and totals.
          </Typography>
          
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              <ReceiptLong sx={{ mr: 1, verticalAlign: 'bottom' }} />
              Upload Receipt or Invoice
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Our AI-powered receipt processing extracts key information like merchant, date, items purchased, prices, and totals. Works with receipts and invoices.
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', mb: 3 }}>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUpload />}
                    sx={{ mb: 2 }}
                  >
                    Select Receipt File
                    <input
                      type="file"
                      hidden
                      accept="image/*,application/pdf"
                      onChange={handleFileChange}
                    />
                  </Button>
                  
                  {file && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {file.type.includes('pdf') ? 
                        <PictureAsPdf color="error" sx={{ mr: 1 }} /> : 
                        file.type.includes('image') ? 
                          <Image color="primary" sx={{ mr: 1 }} /> : 
                          <AttachFile sx={{ mr: 1 }} />
                      }
                      <Typography variant="body2">
                        Selected file: {file.name}
                      </Typography>
                    </Box>
                  )}
                  
                  <Button
                    variant="contained"
                    onClick={handleFileUpload}
                    disabled={!file || isReceiptAnalysisLoading}
                    sx={{ 
                      backgroundColor: '#107C10',
                      '&:hover': { backgroundColor: '#0b5e0b' }
                    }}
                  >
                    {isReceiptAnalysisLoading ? 
                      <CircularProgress size={24} color="inherit" /> : 
                      'Process Receipt'
                    }
                  </Button>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {previewUrl ? (
                  <Box 
                    component="img"
                    src={previewUrl}
                    alt="Receipt preview"
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
                      Receipt preview will appear here
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Paper>
          
          {/* Receipt Results */}
          {renderReceiptResults()}
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

export default ReceiptProcessing;