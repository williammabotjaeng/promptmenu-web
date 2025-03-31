"use client";

import React from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { PlayArrow, Restaurant, Translate, Analytics } from '@mui/icons-material';
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

const FeatureShowcase: React.FC = () => {
  return (
    <Box 
      sx={{ 
        py: { xs: 8, md: 12 }, 
        bgcolor: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          right: -100,
          top: '20%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.colors.primary}10, transparent 70%)`,
          zIndex: 0,
        }}
      />
      
      <Container maxWidth="xl">
        {/* Headline */}
        <Box sx={{ mb: 8, position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h6" 
            component="p" 
            align="center"
            sx={{ 
              color: theme.colors.primary,
              fontWeight: 600,
              mb: 2 
            }}
          >
            TRANSFORM YOUR DINING EXPERIENCE
          </Typography>
          
          <Typography 
            variant="h2" 
            component="h2" 
            align="center"
            sx={{ 
              fontWeight: 700, 
              color: theme.colors.text,
              maxWidth: '800px',
              mx: 'auto',
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Bring Your Menu to Life with PromptMenu
          </Typography>
          
          <Typography 
            variant="h6" 
            component="p" 
            align="center"
            sx={{ 
              color: theme.colors.lightText,
              maxWidth: '800px',
              mx: 'auto',
              mb: 5 
            }}
          >
            Our platform helps restaurants create interactive, multimedia-rich digital menus that delight 
            customers and provide the <strong>PROMPT</strong> information they need to make confident choices.
          </Typography>
        </Box>

        {/* Main Feature Showcase */}
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4, 
            mb: 8,
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Video preview */}
          <Box 
            sx={{ 
              flex: { xs: '1 1 100%', md: '1 1 50%' },
              position: 'relative',
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              height: { xs: '250px', sm: '350px', md: '450px' }
            }}
          >
            <Box 
              component="img"
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Chef preparing food with menu video"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            
            {/* Play button overlay */}
            <Box 
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.3)',
              }}
            >
              <Button
                variant="contained"
                startIcon={<PlayArrow />}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.9)',
                  color: theme.colors.primary,
                  py: 1.5,
                  px: 3,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,1)',
                  },
                }}
              >
                Watch Demo
              </Button>
            </Box>
          </Box>
          
          {/* Feature description */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
            <Typography 
              variant="h3" 
              component="h3" 
              sx={{ 
                fontWeight: 700, 
                color: theme.colors.text,
                mb: 3,
                fontSize: { xs: '1.75rem', md: '2.25rem' },
              }}
            >
              Videos That <span style={{ color: theme.colors.primary }}>TIP</span> the Scales in Your Favor
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: theme.colors.lightText,
                mb: 4,
                fontSize: '1.1rem',
                lineHeight: 1.6
              }}
            >
              Show your customers exactly what they're ordering with embedded videos of dish preparation, 
              ingredient highlights, and chef introductions. Our research shows that menus with multimedia 
              elements increase order values by up to 27% and encourage diners to try new dishes.
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box 
                  sx={{ 
                    bgcolor: `${theme.colors.primary}15`, 
                    color: theme.colors.primary,
                    p: 1,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 0.5
                  }}
                >
                  <Restaurant />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: theme.colors.text, mb: 0.5 }}>
                    Visually Appetizing
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.colors.lightText }}>
                    Showcase your dishes in their best light with high-quality videos and images
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box 
                  sx={{ 
                    bgcolor: `${theme.colors.secondary}15`, 
                    color: theme.colors.secondary,
                    p: 1,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 0.5
                  }}
                >
                  <Translate />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: theme.colors.text, mb: 0.5 }}>
                    Multilingual Support
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.colors.lightText }}>
                    Azure AI automatically translates your menu into 15+ languages
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box 
                  sx={{ 
                    bgcolor: `${theme.colors.accent}15`, 
                    color: theme.colors.accent,
                    p: 1,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 0.5
                  }}
                >
                  <Analytics />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: theme.colors.text, mb: 0.5 }}>
                    Performance Insights
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.colors.lightText }}>
                    Track which menu items get the most views and engagement
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        
        {/* Call to action */}
        <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Link href="/features" style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: theme.colors.secondary,
                color: theme.colors.secondary,
                py: 1.5,
                px: 4,
                borderRadius: 2,
                '&:hover': {
                  borderColor: theme.colors.secondary,
                  backgroundColor: `${theme.colors.secondary}10`,
                },
              }}
            >
              Explore All Features
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default FeatureShowcase;