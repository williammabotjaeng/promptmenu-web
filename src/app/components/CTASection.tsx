"use client";

import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { Restaurant, MenuBook } from '@mui/icons-material';
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

const CTASection: React.FC = () => {
  return (
    <Box 
      sx={{
        py: 12,
        position: 'relative',
        background: `linear-gradient(135deg, ${theme.colors.primary}05, ${theme.colors.secondary}05)`,
        overflow: 'hidden'
      }}
    >
      {/* Decorative elements */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: '10%',
          width: 600,
          height: 600,
          background: `radial-gradient(circle, ${theme.colors.primary}10, transparent 70%)`,
          transform: 'translateY(-50%)',
          borderRadius: '50%',
        }}
      />
      
      <Box 
        sx={{
          position: 'absolute',
          bottom: 0,
          right: '10%',
          width: 500,
          height: 500,
          background: `radial-gradient(circle, ${theme.colors.secondary}10, transparent 70%)`,
          transform: 'translateY(50%)',
          borderRadius: '50%',
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 4, 
          alignItems: 'center'
        }}>
          {/* Left Content */}
          <Box 
            className="stagger-item" 
            sx={{ 
              flex: { xs: '1 1 100%', md: '1 1 calc(58% - 16px)' },
              order: { xs: 1, md: 0 }
            }}
          >
            <Typography 
              variant="h2" 
              component="h2" 
              sx={{ 
                fontWeight: 700, 
                mb: 2,
                color: theme.colors.text,
                fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
              }}
            >
              Ready to <span style={{ color: theme.colors.primary }}>PROMPT</span> your menu 
              into the digital age?
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                color: theme.colors.lightText,
                mb: 4,
                maxWidth: 600
              }}
            >
              Join the hundreds of restaurants that are using PromptMenu to create extraordinary 
              dining experiences. It's time to <strong>TIP</strong> the scales in your favor.
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Link href="/register/restaurant" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Restaurant />}
                  sx={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.white,
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: theme.colors.lightGreen,
                    },
                  }}
                >
                  Register as Restaurant
                </Button>
              </Link>
              
              <Link href="/register/diner" style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<MenuBook />}
                  sx={{
                    borderColor: theme.colors.secondary,
                    color: theme.colors.secondary,
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                    '&:hover': {
                      borderColor: theme.colors.secondary,
                      backgroundColor: `${theme.colors.secondary}10`,
                    },
                  }}
                >
                  Register as Diner
                </Button>
              </Link>
            </Box>
          </Box>
          
          {/* Right Content */}
          <Box 
            className="stagger-item" 
            sx={{ 
              flex: { xs: '1 1 100%', md: '1 1 calc(42% - 16px)' },
              order: { xs: 0, md: 1 }
            }}
          >
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                borderRadius: 4,
                bgcolor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0,0,0,0.05)',
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: theme.colors.text, mb: 1 }}>
                  Why Restaurants Love PromptMenu
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Our digital menu solution delivers real results
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box 
                    component="span" 
                    sx={{ 
                      display: 'inline-block',
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      bgcolor: theme.colors.primary,
                      color: 'white',
                      textAlign: 'center',
                      lineHeight: '20px',
                      fontSize: '0.8rem',
                      mr: 2,
                      fontWeight: 'bold'
                    }}
                  >
                    ✓
                  </Box>
                  <strong>27% increase</strong> in average order value
                </Typography>
                
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box 
                    component="span" 
                    sx={{ 
                      display: 'inline-block',
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      bgcolor: theme.colors.primary,
                      color: 'white',
                      textAlign: 'center',
                      lineHeight: '20px',
                      fontSize: '0.8rem',
                      mr: 2,
                      fontWeight: 'bold'
                    }}
                  >
                    ✓
                  </Box>
                  <strong>42% of diners</strong> try new menu items
                </Typography>
                
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box 
                    component="span" 
                    sx={{ 
                      display: 'inline-block',
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      bgcolor: theme.colors.primary,
                      color: 'white',
                      textAlign: 'center',
                      lineHeight: '20px',
                      fontSize: '0.8rem',
                      mr: 2,
                      fontWeight: 'bold'
                    }}
                  >
                    ✓
                  </Box>
                  <strong>18% reduction</strong> in menu printing costs
                </Typography>
                
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box 
                    component="span" 
                    sx={{ 
                      display: 'inline-block',
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      bgcolor: theme.colors.primary,
                      color: 'white',
                      textAlign: 'center',
                      lineHeight: '20px',
                      fontSize: '0.8rem',
                      mr: 2,
                      fontWeight: 'bold'
                    }}
                  >
                    ✓
                  </Box>
                  <strong>4.8/5 average</strong> customer satisfaction
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Link href="/pricing" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="text"
                    sx={{
                      color: theme.colors.secondary,
                      '&:hover': {
                        backgroundColor: 'transparent',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    View pricing plans →
                  </Button>
                </Link>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CTASection;