"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/globals.css';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Button,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  Divider,
  Chip
} from '@mui/material';
import { 
  MenuBook, 
  QuestionAnswer,
  ArrowBack,
  Send,
  InfoOutlined,
  RestaurantMenu,
  LocalOffer,
  Favorite
} from '@mui/icons-material';
import { useAI } from '@/providers/ai-provider';

// Sample suggested questions
const suggestedQuestions = [
  "What is PromptMenu?",
  "Who created PromptMenu?",
  "What problem does PromptMenu solve?",
  "How is PromptMenu different from other digital menu solutions?",
  "What are the main features of PromptMenu?",
  "Can customers see videos of food preparation?",
  "Does PromptMenu support multiple languages?",
  "Can PromptMenu handle customer reviews?",
  "Is PromptMenu mobile-friendly?",
  "What is video indexing in PromptMenu?",
  "Can PromptMenu process digital receipts?"
];

const QnAAssistant = () => {
  const router = useRouter();
  const { askQuestion, isAssistantLoading, assistantResponse, assistantError, resetAssistantResponse } = useAI();
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{
    type: string;
    text: string;
    isDefaultAnswer?: boolean;
    isError?: boolean;
  }>>([
    { 
      type: 'ai', 
      text: "👋 Hi there! I'm your PromptMenu assistant. Ask me any questions about our menu, ingredients, dietary restrictions, or recommendations!" 
    }
  ]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  
  // Ref for chat container to auto-scroll to bottom
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Add animation effect on mount
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Auto-scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Effect to handle assistant responses
  useEffect(() => {
    if (assistantResponse) {
      // Add AI response to chat history
      setChatHistory(prev => [...prev, { 
        type: 'ai', 
        text: assistantResponse.answer || "I'm sorry, I don't have information about that yet.",
        isDefaultAnswer: assistantResponse.is_default_answer
      }]);
      
      // If it was a default answer, show a notification
      if (assistantResponse.is_default_answer) {
        setSnackbar({
          open: true,
          message: "I don't have specific information about that yet. I've provided a general response.",
          severity: 'info',
        });
      }
      
      // Reset the response after processing
      resetAssistantResponse();
    }
  }, [assistantResponse, resetAssistantResponse]);

  // Effect to handle assistant errors
  useEffect(() => {
    if (assistantError) {
      // Add error message to chat
      setChatHistory(prev => [...prev, { 
        type: 'ai', 
        text: "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment.",
        isError: true
      }]);
      
      setSnackbar({
        open: true,
        message: `Error: ${assistantError.response?.data?.error || assistantError.message}`,
        severity: 'error',
      });
    }
  }, [assistantError]);

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    
    if (!question.trim()) {
      return;
    }

    try {
      // Add user question to chat history
      setChatHistory(prev => [...prev, { type: 'user', text: question }]);
      
      // Store the question before clearing the input
      const currentQuestion = question;
      setQuestion('');
      
      // Call the AI assistant through the context
      await askQuestion({ question: currentQuestion });
      
    } catch (error) {
      console.error('Error with help bot:', error);
    }
  };
  
  const handleSuggestedQuestion = (questionText) => {
    setQuestion(questionText);
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
            Menu Q&A Assistant
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 4 }}>
            Ask any questions about our menu, ingredients, dietary options, or get personalized recommendations.
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            {/* Main Chat Interface */}
            <Box sx={{ flex: 1 }}>
              <Paper 
                elevation={3} 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  height: '600px',
                  borderRadius: 2,
                  overflow: 'hidden'
                }}
              >
                {/* Chat Header */}
                <Box 
                  sx={{ 
                    p: 2, 
                    backgroundColor: '#107C10',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <QuestionAnswer />
                  <Typography variant="h6">
                    PromptMenu Assistant
                  </Typography>
                </Box>
                
                {/* Chat Messages */}
                <Box 
                  ref={chatContainerRef}
                  sx={{ 
                    flex: 1, 
                    p: 2, 
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    backgroundColor: '#f9f9f9'
                  }}
                >
                  {chatHistory.map((message, index) => (
                    <Box 
                      key={index}
                      sx={{
                        alignSelf: message.type === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '70%',
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: message.type === 'user' 
                          ? '#107C10' 
                          : message.isError 
                            ? '#ffebee' 
                            : message.isDefaultAnswer
                              ? '#fff8e1'
                              : 'white',
                        color: message.type === 'user' ? 'white' : 'text.primary',
                        boxShadow: 1,
                      }}
                    >
                      {message.isDefaultAnswer && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'warning.main' }}>
                          <InfoOutlined fontSize="small" sx={{ mr: 0.5 }} />
                          <Typography variant="caption">General information</Typography>
                        </Box>
                      )}
                      <Typography variant="body1">
                        {message.text}
                      </Typography>
                    </Box>
                  ))}
                  
                  {/* Typing indicator */}
                  {isAssistantLoading && (
                    <Box 
                      sx={{
                        alignSelf: 'flex-start',
                        maxWidth: '70%',
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: 'white',
                        boxShadow: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <CircularProgress size={16} thickness={6} />
                      <Typography variant="body2" color="text.secondary">
                        Thinking...
                      </Typography>
                    </Box>
                  )}
                </Box>
                
                {/* Question Input */}
                <Box 
                  component="form" 
                  onSubmit={handleQuestionSubmit}
                  sx={{ 
                    p: 2, 
                    backgroundColor: 'white',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    gap: 1,
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder="Ask about menu items, ingredients, or dietary options..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    disabled={isAssistantLoading}
                    variant="outlined"
                    size="medium"
                    InputProps={{
                      sx: { borderRadius: 3 }
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!question.trim() || isAssistantLoading}
                    sx={{
                      borderRadius: 3,
                      minWidth: '50px',
                      backgroundColor: '#107C10',
                      '&:hover': { backgroundColor: '#0b5e0b' }
                    }}
                  >
                    <Send />
                  </Button>
                </Box>
              </Paper>
            </Box>
            
            {/* Sidebar */}
            <Box sx={{ width: { xs: '100%', md: '300px' } }}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3,
                  borderRadius: 2,
                  mb: 3,
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <RestaurantMenu sx={{ color: '#107C10' }} />
                  Quick Questions
                </Typography>
                
                <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                  Try these example questions:
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {suggestedQuestions.map((q, idx) => (
                    <Button 
                      key={idx} 
                      variant="outlined"
                      size="small"
                      onClick={() => handleSuggestedQuestion(q)}
                      sx={{ 
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        borderColor: 'rgba(0, 0, 0, 0.12)',
                        '&:hover': {
                          borderColor: '#107C10',
                          backgroundColor: 'rgba(16, 124, 16, 0.04)',
                        }
                      }}
                    >
                      {q}
                    </Button>
                  ))}
                </Box>
              </Paper>
              
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalOffer sx={{ color: '#107C10' }} />
                  Popular Categories
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Chip label="Vegetarian" onClick={() => handleSuggestedQuestion("What vegetarian options do you have?")} />
                  <Chip label="Gluten-Free" onClick={() => handleSuggestedQuestion("What gluten-free options do you have?")} />
                  <Chip label="Specials" onClick={() => handleSuggestedQuestion("What are today's specials?")} />
                  <Chip label="Allergens" onClick={() => handleSuggestedQuestion("What dishes contain nuts?")} />
                  <Chip label="Desserts" onClick={() => handleSuggestedQuestion("What desserts do you recommend?")} />
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Favorite sx={{ color: '#107C10' }} />
                  Staff Picks
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button 
                    variant="text"
                    size="small"
                    onClick={() => handleSuggestedQuestion("What's your signature dish?")}
                    sx={{ 
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      color: '#107C10',
                    }}
                  >
                    What's your signature dish?
                  </Button>
                  <Button 
                    variant="text"
                    size="small"
                    onClick={() => handleSuggestedQuestion("What wine goes well with your steak?")}
                    sx={{ 
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      color: '#107C10',
                    }}
                  >
                    Wine pairings for steak?
                  </Button>
                </Box>
              </Paper>
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

export default QnAAssistant;