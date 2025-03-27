"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  TextField, 
  Button,  
  Card, 
  CardContent, 
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  InputAdornment,
  Drawer,
  Fab,
  useMediaQuery,
  useTheme as useMuiTheme,
  CircularProgress,
  Avatar
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import { 
  Search, 
  RestaurantMenu, 
  VideoLibrary, 
  Translate, 
  QrCode, 
  Settings, 
  LiveHelp, 
  ContactSupport,
  Article,
  MenuBook,
  Mail,
  Launch,
  Phone,
  ArrowForward,
  Forum,
  School,
  QuestionAnswer,
  Close,
  Send
} from '@mui/icons-material';
import Link from 'next/link';

// Microsoft-inspired color scheme
const theme = {
  colors: {
    primary: "#107C10", // Microsoft green
    secondary: "#0078D4", // Microsoft blue
    accent: "#50E6FF", // Azure blue
    lightGreen: "#84c680",
    background: "#f5f5f5",
    text: "#323130",
    lightText: "#605E5C",
    white: "#FFFFFF",
  },
};

// Azure Function URL - Replace with your actual function URL
const AZURE_BOT_FUNCTION_URL = "https://your-function-app.azurewebsites.net/api/BotFunction";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`help-tabpanel-${index}`}
      aria-labelledby={`help-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `help-tab-${index}`,
    'aria-controls': `help-tabpanel-${index}`,
  };
}

// Message interface
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Help categories and popular articles
const helpCategories = [
  { 
    title: "Getting Started", 
    icon: <RestaurantMenu />, 
    description: "Learn the basics of setting up your digital menu",
    articles: [
      "Creating your first digital menu",
      "Restaurant profile setup guide",
      "Understanding the dashboard",
      "Menu categories best practices"
    ],
    link: "/help/getting-started"
  },
  { 
    title: "QR Codes", 
    icon: <QrCode />, 
    description: "Generate and manage QR codes for your tables",
    articles: [
      "Generating QR codes",
      "Printing guidelines",
      "Custom QR code designs",
      "Tracking QR code scans"
    ],
    link: "/help/qr-codes"
  },
  { 
    title: "Multimedia", 
    icon: <VideoLibrary />, 
    description: "Add videos and images to your menu items",
    articles: [
      "Video upload guidelines",
      "Chef introduction videos",
      "Food photography tips",
      "Media compression guide"
    ],
    link: "/help/multimedia"
  },
  { 
    title: "Translation", 
    icon: <Translate />, 
    description: "Translate your menus for international guests",
    articles: [
      "Setting up automatic translation",
      "Supported languages",
      "Custom translation overrides",
      "Regional dialect settings"
    ],
    link: "/help/translation"
  },
  { 
    title: "Account & Billing", 
    icon: <Settings />, 
    description: "Manage your account settings and billing",
    articles: [
      "Updating payment methods",
      "Plan upgrades and downgrades",
      "Adding team members",
      "Billing history and receipts"
    ],
    link: "/help/account-billing"
  },
  { 
    title: "Troubleshooting", 
    icon: <LiveHelp />, 
    description: "Solve common issues with your digital menu",
    articles: [
      "QR code scanning issues",
      "Video playback problems",
      "Menu not displaying correctly",
      "Translation accuracy concerns"
    ],
    link: "/help/troubleshooting"
  },
];

const popularArticles = [
  {
    title: "How to create your first digital menu in 5 minutes",
    link: "/help/getting-started/create-first-menu"
  },
  {
    title: "Adding videos to showcase your signature dishes",
    link: "/help/multimedia/showcase-videos"
  },
  {
    title: "Setting up automatic translation for international guests",
    link: "/help/translation/automatic-translation"
  },
  {
    title: "Designing effective QR code table displays",
    link: "/help/qr-codes/table-displays"
  },
  {
    title: "Tracking menu performance with analytics",
    link: "/help/advanced/analytics"
  },
  {
    title: "Upgrading from Free to Standard plan",
    link: "/help/account-billing/upgrading"
  }
];

const supportOptions = [
  {
    title: "Email Support",
    description: "Get help via email from our support team",
    icon: <Mail fontSize="large" sx={{ color: theme.colors.secondary }} />,
    action: "Email Us",
    actionLink: "mailto:support@promptmenu.com"
  },
  {
    title: "Knowledge Base",
    description: "Browse our extensive documentation",
    icon: <Article fontSize="large" sx={{ color: theme.colors.primary }} />,
    action: "View Articles",
    actionLink: "/help/articles"
  },
  {
    title: "Community Forum",
    description: "Connect with other PromptMenu users",
    icon: <Forum fontSize="large" sx={{ color: theme.colors.secondary }} />,
    action: "Join Discussion",
    actionLink: "/community"
  },
  {
    title: "Video Tutorials",
    description: "Learn with step-by-step video guides",
    icon: <School fontSize="large" sx={{ color: theme.colors.primary }} />,
    action: "Watch Now",
    actionLink: "/help/tutorials"
  }
];

// Azure Bot Integration Component
const AzureBotChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hi there! I'm MenuAssist, your PromptMenu help bot. How can I assist you today? You can ask me questions about creating menus, QR codes, translations, and more!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [conversationId, setConversationId] = useState('');
  
  useEffect(() => {
    // Generate a unique conversation ID when component mounts
    setConversationId(`conv_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);
  }, []);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);
    
    try {
      // Call Azure Function that connects to Bot Framework
      const response = await fetch(AZURE_BOT_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: newMessage,
          conversationId: conversationId,
          sessionId: `session_${Date.now()}`,
          language: 'en-us'
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response from bot');
      }
      
      const data = await response.json();
      
      // Add bot response to messages
      const botMessage: Message = {
        id: `bot_${Date.now()}`,
        text: data.message || "I'm sorry, I couldn't process your request. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error('Error communicating with bot:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        text: "I'm having trouble connecting right now. Please try again later or contact support.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Messages area */}
      <Box sx={{ 
        flexGrow: 1, 
        overflow: 'auto', 
        px: 2, 
        py: 2,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              mb: 2
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-end'
              }}
            >
              {msg.sender === 'bot' && (
                <Avatar sx={{ bgcolor: theme.colors.primary, width: 32, height: 32, mr: 1 }}>
                  <ContactSupport fontSize="small" />
                </Avatar>
              )}
              
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  maxWidth: '80%',
                  bgcolor: msg.sender === 'user' ? theme.colors.secondary : theme.colors.white,
                  color: msg.sender === 'user' ? theme.colors.white : theme.colors.text,
                  borderRadius: 2,
                  ml: msg.sender === 'user' ? 1 : 0
                }}
              >
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {msg.text}
                </Typography>
                <Typography variant="caption" sx={{ 
                  display: 'block', 
                  textAlign: msg.sender === 'user' ? 'right' : 'left',
                  color: msg.sender === 'user' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)',
                  mt: 0.5
                }}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </Paper>
            </Box>
          </Box>
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, mb: 2 }}>
            <Avatar sx={{ bgcolor: theme.colors.primary, width: 32, height: 32, mr: 1 }}>
              <ContactSupport fontSize="small" />
            </Avatar>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <CircularProgress size={16} sx={{ mr: 1 }} />
              <Typography variant="body2">Thinking...</Typography>
            </Paper>
          </Box>
        )}
        
        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </Box>
      
      {/* Input area */}
      <Box 
        component="form" 
        onSubmit={handleSendMessage}
        sx={{ 
          p: 2, 
          borderTop: 1, 
          borderColor: 'divider',
          bgcolor: theme.colors.white
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <TextField
            fullWidth
            placeholder="Type your question here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            variant="outlined"
            size="small"
            autoComplete="off"
            disabled={isLoading}
            sx={{ mr: 1 }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading || !newMessage.trim()}
            sx={{
              bgcolor: theme.colors.primary,
              '&:hover': { bgcolor: theme.colors.lightGreen },
              minWidth: 'fit-content'
            }}
          >
            <Send />
          </Button>
        </Box>
        <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary', textAlign: 'center' }}>
          This chat is powered by Azure AI. Your conversations help us improve our support.
        </Typography>
      </Box>
    </Box>
  );
};

const HelpPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }
    
    // Simple mock search function
    const results: string[] = [];
    const query = searchQuery.toLowerCase();
    
    // Search in popular articles
    popularArticles.forEach(article => {
      if (article.title.toLowerCase().includes(query)) {
        results.push(article.title);
      }
    });
    
    // Search in categories
    helpCategories.forEach(category => {
      category.articles.forEach(article => {
        if (article.toLowerCase().includes(query)) {
          results.push(article);
        }
      });
    });
    
    setSearchResults(results);
    setHasSearched(true);
  };

  const toggleChatDrawer = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <Box sx={{ bgcolor: theme.colors.background, minHeight: '100vh', position: 'relative' }}>
      {/* Header section */}
      <Box sx={{ 
        py: { xs: 6, md: 10 }, 
        background: `linear-gradient(135deg, ${theme.colors.primary}20, ${theme.colors.secondary}30)`,
        textAlign: 'center',
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 2, color: theme.colors.text }}>
            How can we help you?
          </Typography>
          <Typography variant="h6" component="p" sx={{ mb: 4, color: theme.colors.lightText }}>
            Find answers to all your questions about PromptMenu
          </Typography>
          
          <Paper 
            component="form" 
            elevation={2} 
            sx={{ 
              p: 1, 
              display: 'flex', 
              alignItems: 'center',
              maxWidth: 600,
              mx: 'auto',
              borderRadius: 2,
            }}
            onSubmit={handleSearch}
          >
            <TextField
              fullWidth
              placeholder="Search for help articles, tutorials, and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="standard"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ px: 1 }}
            />
            <Button 
              type="submit"
              variant="contained"
              sx={{ 
                bgcolor: theme.colors.primary,
                '&:hover': { bgcolor: theme.colors.lightGreen }
              }}
            >
              Search
            </Button>
          </Paper>
          
          {hasSearched && (
            <Paper sx={{ mt: 2, p: 2, maxWidth: 600, mx: 'auto', textAlign: 'left' }}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                {searchResults.length} results found
              </Typography>
              
              {searchResults.length > 0 ? (
                <List>
                  {searchResults.map((result, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Article fontSize="small" color="action" />
                      </ListItemIcon>
                      <ListItemText primary={result} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No results found. Try a different search term or browse our help categories below.
                </Typography>
              )}
            </Paper>
          )}
        </Container>
      </Box>
      
      {/* Main content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 4, color: theme.colors.text }}>
            Browse Help Categories
          </Typography>
          
          <Grid container spacing={3}>
            {helpCategories.map((category, index) => (
              <Grid xs={12} sm={6} md={4} key={index}>
                <Link href={category.link} style={{ textDecoration: 'none' }}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box 
                        sx={{ 
                          bgcolor: `${theme.colors.secondary}10`, 
                          color: theme.colors.secondary,
                          width: 50,
                          height: 50,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 2,
                          mb: 2
                        }}
                      >
                        {category.icon}
                      </Box>
                      
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1, color: theme.colors.text }}>
                        {category.title}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ color: theme.colors.lightText, mb: 2 }}>
                        {category.description}
                      </Typography>
                      
                      <Box sx={{ mt: 'auto' }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: theme.colors.secondary,
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          View articles <ArrowForward fontSize="small" sx={{ ml: 0.5, fontSize: 16 }} />
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        <Divider sx={{ my: 6 }} />
        
        {/* Tabs section */}
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="help center tabs"
              textColor="primary"
              indicatorColor="primary"
              sx={{ 
                '& .MuiTab-root': { 
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem'
                } 
              }}
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons={isMobile ? "auto" : undefined}
            >
              <Tab label="Popular Articles" {...a11yProps(0)} />
              <Tab label="Support Options" {...a11yProps(1)} />
              <Tab label="For Restaurant Owners" {...a11yProps(2)} />
              <Tab label="For Diners" {...a11yProps(3)} />
            </Tabs>
          </Box>
          
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={2}>
              {popularArticles.map((article, index) => (
                <Grid xs={12} sm={6} key={index}>
                  <Link href={article.link} style={{ textDecoration: 'none' }}>
                    <Paper
                      elevation={1}
                      sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'flex-start',
                        transition: 'background-color 0.2s',
                        '&:hover': {
                          bgcolor: `${theme.colors.primary}05`
                        }
                      }}
                    >
                      <Article sx={{ mr: 1.5, color: theme.colors.primary }} />
                      <Typography variant="body1" color="text.primary">
                        {article.title}
                      </Typography>
                    </Paper>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
              {supportOptions.map((option, index) => (
                <Grid xs={12} sm={6} md={3} key={index}>
                  <Paper 
                    elevation={1} 
                    sx={{ 
                      p: 3, 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      {option.icon}
                    </Box>
                    
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                      {option.title}
                    </Typography>
                    
                    <Typography variant="body2" sx={{ color: theme.colors.lightText, mb: 3 }}>
                      {option.description}
                    </Typography>
                    
                    <Button
                      variant="outlined"
                      component={Link}
                      href={option.actionLink}
                      sx={{ 
                        mt: 'auto',
                        color: theme.colors.secondary,
                        borderColor: theme.colors.secondary,
                        '&:hover': {
                          borderColor: theme.colors.secondary,
                          backgroundColor: `${theme.colors.secondary}10`
                        }
                      }}
                      endIcon={<Launch />}
                    >
                      {option.action}
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
          
          <TabPanel value={tabValue} index={2}>
            <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 3 }}>
              Restaurant Owner Resources
            </Typography>
            
            <Grid container spacing={3}>
              <Grid xs={12} md={8}>
                <Paper elevation={1} sx={{ p: 3 }}>
                  <Typography variant="h6" component="h4" sx={{ fontWeight: 600, mb: 2 }}>
                    Getting the Most From Your Digital Menu
                  </Typography>
                  
                  <Typography variant="body1" paragraph>
                    As a restaurant owner, PromptMenu gives you powerful tools to showcase your offerings and enhance the dining experience for your customers. Here are some resources to help you maximize the benefits:
                  </Typography>
                  
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <MenuBook sx={{ color: theme.colors.primary }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Restaurant Success Guide" 
                        secondary="Learn best practices from successful restaurants using digital menus"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <VideoLibrary sx={{ color: theme.colors.primary }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Video Content Creation Guide" 
                        secondary="Learn how to create engaging videos for your menu items"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <QrCode sx={{ color: theme.colors.primary }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="QR Code Strategy Guide" 
                        secondary="Optimize your QR code placement and design for maximum engagement"
                      />
                    </ListItem>
                  </List>
                  
                  <Button 
                    variant="contained" 
                    sx={{ 
                      mt: 2, 
                      bgcolor: theme.colors.primary,
                      '&:hover': { bgcolor: theme.colors.lightGreen }
                    }}
                  >
                    View Restaurant Resources
                  </Button>
                </Paper>
              </Grid>
              
              <Grid xs={12} md={4}>
                <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" component="h4" sx={{ fontWeight: 600, mb: 2 }}>
                    Need Personalized Help?
                  </Typography>
                  
                  <Typography variant="body1" paragraph>
                    Schedule a 30-minute consultation with our restaurant success team to get personalized guidance for your business.
                  </Typography>
                  
                  <Button 
                    variant="outlined" 
                    fullWidth
                    sx={{ 
                      mt: 2,
                      color: theme.colors.secondary,
                      borderColor: theme.colors.secondary,
                      '&:hover': {
                        borderColor: theme.colors.secondary,
                        backgroundColor: `${theme.colors.secondary}10`
                      }
                    }}
                    startIcon={<Phone />}
                  >
                    Book Consultation
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
          
          <TabPanel value={tabValue} index={3}>
            <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 3 }}>
              Information for Diners
            </Typography>
            
            <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" component="h4" sx={{ fontWeight: 600, mb: 2 }}>
                Using Digital Menus as a Diner
              </Typography>
              
              <Typography variant="body1" paragraph>
                Digital menus enhance your dining experience by providing rich visuals, detailed information, and easy navigation. Here's how to get the most out of them:
              </Typography>
              
              <Grid container spacing={3}>
                <Grid xs={12} md={4}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: theme.colors.primary }}>
                      Scanning QR Codes
                    </Typography>
                    <Typography variant="body2" paragraph>
                      Simply open your phone's camera and point it at the QR code on your table. Tap the notification that appears to open the digital menu instantly.
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid xs={12} md={4}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: theme.colors.primary }}>
                      Viewing Multimedia
                    </Typography>
                    <Typography variant="body2" paragraph>
                      Look for play buttons on menu items to watch videos of dishes being prepared or presentation highlights. Tap images to enlarge them.
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={12} md={4}>
  <Box>
    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: theme.colors.primary }}>
      Changing Languages
    </Typography>
    <Typography variant="body2" paragraph>
      Look for a language selector icon, usually at the top of the menu. Select your preferred language to translate the entire menu instantly.
    </Typography>
  </Box>
</Grid>
              </Grid>
            </Paper>
            
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" component="h4" sx={{ fontWeight: 600, mb: 2 }}>
                Frequently Asked Questions
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <QuestionAnswer sx={{ color: theme.colors.secondary }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Do I need to download an app to view the menu?" 
                    secondary="No, PromptMenu works directly in your phone's web browser without needing any app installation."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <QuestionAnswer sx={{ color: theme.colors.secondary }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Is my data safe when I use a digital menu?" 
                    secondary="Yes, PromptMenu doesn't collect any personal information from diners who view menus."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <QuestionAnswer sx={{ color: theme.colors.secondary }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="What if I can't scan the QR code?" 
                    secondary="Most restaurants also provide a short URL beneath the QR code that you can type into your browser."
                  />
                </ListItem>
              </List>
            </Paper>
          </TabPanel>
        </Box>
      </Container>
      
      {/* Azure Bot Integration */}
      <Fab
        color="primary"
        aria-label="chat with help assistant"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          bgcolor: theme.colors.secondary,
          '&:hover': {
            bgcolor: theme.colors.primary,
          },
        }}
        onClick={toggleChatDrawer}
      >
        <QuestionAnswer />
      </Fab>
      
      <Drawer
        anchor="right"
        open={isChatOpen}
        onClose={toggleChatDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 400 },
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
            <ContactSupport sx={{ mr: 1, color: theme.colors.primary }} />
            Ask Our Azure AI Assistant
          </Typography>
          <Button
            onClick={toggleChatDrawer}
            sx={{ minWidth: 'auto', p: 1 }}
          >
            <Close />
          </Button>
        </Box>
        
        <Box sx={{ height: 'calc(100% - 60px)', overflow: 'hidden' }}>
          <AzureBotChat />
        </Box>
      </Drawer>
      
      {/* Footer */}
      <Box 
        component="footer"
        sx={{ 
          py: 4, 
          bgcolor: theme.colors.text,
          color: theme.colors.white,
          mt: 6
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                PromptMenu Help Center
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Our support team is here to help you get the most out of your digital menu experience.
              </Typography>
            </Grid>
            
            <Grid xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Contact Us
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1, display: 'flex', alignItems: 'center' }}>
                <Mail fontSize="small" sx={{ mr: 1 }} /> support@promptmenu.com
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center' }}>
                <Phone fontSize="small" sx={{ mr: 1 }} /> +1 (800) 123-4567
              </Typography>
            </Grid>
            
            <Grid xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Resources
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Link href="/help/getting-started" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                    Getting Started Guide
                  </Typography>
                </Link>
                <Link href="/help/multimedia" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                    Multimedia Tips
                  </Typography>
                </Link>
                <Link href="/help/qr-codes" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                    QR Code Best Practices
                  </Typography>
                </Link>
                <Link href="/blog" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Digital Menu Blog
                  </Typography>
                </Link>
              </Box>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 3, bgcolor: 'rgba(255,255,255,0.1)' }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              © {new Date().getFullYear()} PromptMenu. All rights reserved.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link href="/terms" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                  Terms of Service
                </Typography>
              </Link>
              <Link href="/privacy" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                  Privacy Policy
                </Typography>
              </Link>
              <Link href="/accessibility" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                  Accessibility
                </Typography>
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HelpPage;