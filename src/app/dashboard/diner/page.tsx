"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import '@/styles/globals.css';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  IconButton,
  Tab,
  Tabs,
  TextField,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import { 
  MenuBook, 
  CloudUpload, 
  ReceiptLong, 
  ImageSearch,
  QuestionAnswer,
  Close,
  ArrowBack
} from '@mui/icons-material';
import DinerDashboardHeader from '@/components/diner/Header';

// Mock API service for demo
const mockApi = {
  processReceipt: async (file) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { 
      success: true,
      items: [
        { name: 'Grilled Salmon', price: 24.99, quantity: 2 },
        { name: 'Caesar Salad', price: 12.50, quantity: 1 },
        { name: 'Bruschetta', price: 9.99, quantity: 1 },
        { name: 'Sparkling Water', price: 3.50, quantity: 2 }
      ],
      total: 79.47,
      tax: 7.95,
      date: new Date().toLocaleDateString(),
      vendor: "Ocean Breeze Restaurant"
    };
  },
  
  analyzeMenu: async (file) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      success: true,
      items: [
        { 
          name: 'Margherita Pizza', 
          ingredients: ['Tomato sauce', 'Mozzarella', 'Fresh basil', 'Olive oil'],
          calories: 285,
          allergens: ['Dairy', 'Gluten'],
          price: 14.99,
          recommendation: 'Vegetarian favorite with simple, fresh ingredients'
        },
        { 
          name: 'Chicken Alfredo', 
          ingredients: ['Fettuccine pasta', 'Grilled chicken', 'Alfredo sauce', 'Parmesan cheese'],
          calories: 450,
          allergens: ['Dairy', 'Gluten'],
          price: 18.99,
          recommendation: 'Rich and creamy pasta dish, one of our most popular items'
        },
        { 
          name: 'Caesar Salad', 
          ingredients: ['Romaine lettuce', 'Croutons', 'Parmesan cheese', 'Caesar dressing'],
          calories: 220,
          allergens: ['Dairy', 'Gluten', 'Eggs'],
          price: 10.99,
          recommendation: 'Can be made gluten-free by removing croutons'
        }
      ]
    };
  },
  
  askFoodQuestion: async (question) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple mapping of questions to answers for demo
    const qaPairs = {
      "what are your vegetarian options": "We offer several vegetarian options including Margherita Pizza, Vegetable Stir Fry, Eggplant Parmesan, and our Garden Salad. We can also modify many dishes to be vegetarian upon request.",
      "do you have gluten-free options": "Yes! We offer gluten-free pasta substitutions, gluten-free pizza crust, and several naturally gluten-free dishes such as our Grilled Salmon and most of our salads (without croutons).",
      "what's in the house special sauce": "Our house special sauce is a proprietary blend of tomatoes, roasted red peppers, garlic, basil, and a hint of chili. It contains no artificial preservatives and is made fresh daily.",
      "what wine goes well with salmon": "We recommend pairing our Grilled Salmon with either our Pinot Noir or the Chardonnay. Both complement the rich flavor of the fish without overpowering it.",
      "how spicy is the curry": "Our curry is medium spicy by default, but we can adjust the spice level according to your preference. Just let your server know if you'd like it milder or spicier."
    };
    
    // Default response for questions not in our mapping
    let answer = "I don't have specific information about that. Would you like to ask our staff for more details?";
    
    // Simple matching - in a real implementation, would use NLP/AI
    for (const [q, a] of Object.entries(qaPairs)) {
      if (question.toLowerCase().includes(q)) {
        answer = a;
        break;
      }
    }
    
    return {
      success: true,
      answer: answer,
      relatedQuestions: [
        "What are your vegetarian options?",
        "Do you have gluten-free options?",
        "What wine goes well with salmon?"
      ]
    };
  }
};

const Dashboard = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeFeature, setActiveFeature] = useState(null);
  const [file, setFile] = useState(null);
  const [processingFile, setProcessingFile] = useState(false);
  const [results, setResults] = useState(null);
  const [question, setQuestion] = useState('');
  const [processingQuestion, setProcessingQuestion] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
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

  const handleFeatureSelect = (feature) => {
    setActiveFeature(feature);
    setFile(null);
    setResults(null);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      setSnackbar({
        open: true,
        message: 'Please select a file first',
        severity: 'warning',
      });
      return;
    }

    try {
      setProcessingFile(true);
      let response;

      if (activeFeature === 'receipts') {
        response = await mockApi.processReceipt(file);
      } else if (activeFeature === 'menu') {
        response = await mockApi.analyzeMenu(file);
      }

      setResults(response);
    } catch (error) {
      console.error('Error processing file:', error);
      setSnackbar({
        open: true,
        message: `Error processing file: ${error.message}`,
        severity: 'error',
      });
    } finally {
      setProcessingFile(false);
    }
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    
    if (!question.trim()) {
      return;
    }

    try {
      setProcessingQuestion(true);
      
      // Add user question to chat history
      setChatHistory(prev => [...prev, { type: 'user', text: question }]);
      
      const response = await mockApi.askFoodQuestion(question);
      
      // Add AI response to chat history
      setTimeout(() => {
        setChatHistory(prev => [...prev, { type: 'ai', text: response.answer }]);
        setProcessingQuestion(false);
      }, 500);
      
      setQuestion('');
    } catch (error) {
      console.error('Error processing question:', error);
      setChatHistory(prev => [...prev, { 
        type: 'ai', 
        text: 'Sorry, I encountered an error processing your question. Please try again.' 
      }]);
      setProcessingQuestion(false);
    }
  };

  const renderFeatureContent = () => {
    if (!activeFeature) return null;

    if (activeFeature === 'receipts') {
      return (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Receipt Processing Demo
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Upload a receipt image to automatically extract items, prices, and totals. Our AI can detect and catalog items for inventory management.
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUpload />}
              sx={{ mb: 2 }}
            >
              Select Receipt Image
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
              disabled={!file || processingFile}
              sx={{ 
                backgroundColor: '#107C10',
                '&:hover': { backgroundColor: '#0b5e0b' }
              }}
            >
              {processingFile ? <CircularProgress size={24} color="inherit" /> : 'Process Receipt'}
            </Button>
          </Box>
          
          {results && (
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Receipt Processing Results
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Vendor:</strong> {results.vendor}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Date:</strong> {results.date}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Items:
              </Typography>
              {results.items.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    {item.quantity}x {item.name}
                  </Typography>
                  <Typography variant="body2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">
                  <strong>Subtotal</strong>
                </Typography>
                <Typography variant="body2">
                  ${(results.total - results.tax).toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">
                  <strong>Tax</strong>
                </Typography>
                <Typography variant="body2">
                  ${results.tax.toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">
                  <strong>Total</strong>
                </Typography>
                <Typography variant="body2">
                  <strong>${results.total.toFixed(2)}</strong>
                </Typography>
              </Box>
            </Paper>
          )}
        </Box>
      );
    }
    
    if (activeFeature === 'menu') {
      return (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Menu Analysis Demo
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Upload a menu image to analyze dishes, identify ingredients, and get nutrition information. Our AI helps customers make informed food choices.
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
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
              disabled={!file || processingFile}
              sx={{ 
                backgroundColor: '#107C10',
                '&:hover': { backgroundColor: '#0b5e0b' }
              }}
            >
              {processingFile ? <CircularProgress size={24} color="inherit" /> : 'Analyze Menu'}
            </Button>
          </Box>
          
          {results && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Menu Analysis Results
              </Typography>
              <Grid container spacing={3}>
                {results.items.map((item, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Card elevation={2}>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          ${item.price.toFixed(2)} | {item.calories} calories
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Ingredients:</strong> {item.ingredients.join(', ')}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Allergens:</strong> {item.allergens.join(', ')}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
                          {item.recommendation}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      );
    }
    
    if (activeFeature === 'qna') {
      return (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Food & Menu Q&A Bot Demo
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Ask any question about our menu, ingredients, dietary restrictions, or recommendations. Our AI assistant provides detailed answers.
          </Typography>
          
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              mb: 3, 
              height: '400px', 
              display: 'flex', 
              flexDirection: 'column' 
            }}
          >
            <Box 
              sx={{ 
                flex: 1, 
                overflowY: 'auto', 
                mb: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}
            >
              {chatHistory.length === 0 ? (
                <Box sx={{ textAlign: 'center', color: 'text.secondary', mt: 10 }}>
                  <QuestionAnswer sx={{ fontSize: 48, opacity: 0.5, mb: 2 }} />
                  <Typography>
                    Ask a question to get started!
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Try: "What are your vegetarian options?" or "Do you have gluten-free dishes?"
                  </Typography>
                </Box>
              ) : (
                chatHistory.map((message, index) => (
                  <Box 
                    key={index}
                    sx={{
                      alignSelf: message.type === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '80%',
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: message.type === 'user' ? '#107C10' : '#f5f5f5',
                      color: message.type === 'user' ? 'white' : 'text.primary',
                    }}
                  >
                    <Typography variant="body2">
                      {message.text}
                    </Typography>
                  </Box>
                ))
              )}
              {processingQuestion && (
                <Box 
                  sx={{
                    alignSelf: 'flex-start',
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: '#f5f5f5',
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <CircularProgress size={16} />
                    <Typography variant="body2">Thinking...</Typography>
                  </Box>
                </Box>
              )}
            </Box>
            
            <Box 
              component="form" 
              onSubmit={handleQuestionSubmit}
              sx={{ 
                display: 'flex', 
                gap: 1 
              }}
            >
              <TextField
                fullWidth
                placeholder="Ask a question about our food or menu..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={processingQuestion}
                variant="outlined"
                size="small"
              />
              <Button 
                type="submit"
                variant="contained"
                disabled={!question.trim() || processingQuestion}
                sx={{ 
                  backgroundColor: '#107C10',
                  '&:hover': { backgroundColor: '#0b5e0b' }
                }}
              >
                Send
              </Button>
            </Box>
          </Paper>
        </Box>
      );
    }
    
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

      <DinerDashboardHeader />

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

          {/* Feature Navigation */}
          {activeFeature ? (
            <Box sx={{ mb: 3 }}>
              <Button
                startIcon={<ArrowBack />}
                onClick={() => setActiveFeature(null)}
                sx={{ mb: 2 }}
              >
                Back to Features
              </Button>
              {renderFeatureContent()}
            </Box>
          ) : (
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
                      onClick={() => handleFeatureSelect('receipts')}
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
                      onClick={() => handleFeatureSelect('menu')}
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
                      onClick={() => handleFeatureSelect('qna')}
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
          )}
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