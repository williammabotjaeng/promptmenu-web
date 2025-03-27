"use client";

import React from 'react';
import { Box, Button, Typography, Container, Stack, Chip } from '@mui/material';
import Link from 'next/link';
import { Restaurant, MenuBook, VideoCameraBack } from '@mui/icons-material';

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

// High-quality restaurant image
const heroImage = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80";

const Hero: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '90vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8))',
          zIndex: 1,
        }}
      />

      {/* Content Container */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 2,
          textAlign: 'center',
          py: 5
        }}
      >
        {/* TIP Chip */}
        <Chip
          label="To Insure Promptness in your menu experience"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            color: theme.colors.white,
            backdropFilter: 'blur(4px)',
            mb: 4,
            fontWeight: 500,
            fontSize: '0.9rem',
            py: 1,
            borderRadius: 6
          }}
        />

        {/* Main Headline */}
        <Typography
          variant="h1"
          sx={{
            color: theme.colors.white,
            fontWeight: 800,
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5rem' },
            lineHeight: 1.1,
            mb: 2,
            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            '& .highlight': {
              color: theme.colors.accent,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '0px',
                left: 0,
                width: '100%',
                height: '8px',
                background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                borderRadius: '4px',
                opacity: 0.7,
                zIndex: -1,
              }
            }
          }}
        >
          Transform Your <span className="highlight">Menu</span> Experience
        </Typography>

        {/* Subheadline */}
        <Typography 
          variant="h5" 
          sx={{ 
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 400,
            maxWidth: '800px',
            mx: 'auto',
            mb: 6,
            lineHeight: 1.5
          }}
        >
          Digital menus that <strong>TIP</strong> the scales in your favor — 
          multimedia-rich content that delights customers and <strong>Prompts</strong> higher engagement.
        </Typography>

        {/* Features */}
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={3} 
          justifyContent="center"
          sx={{ mb: 6 }}
        >
          <Box sx={{
            bgcolor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            px: 3,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <VideoCameraBack sx={{ color: theme.colors.accent }} />
            <Typography color="white" fontWeight={500}>Rich Media Integration</Typography>
          </Box>
          
          <Box sx={{
            bgcolor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            px: 3,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <Restaurant sx={{ color: theme.colors.primary }} />
            <Typography color="white" fontWeight={500}>Elevated Dining Experience</Typography>
          </Box>
          
          <Box sx={{
            bgcolor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            px: 3,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <MenuBook sx={{ color: theme.colors.secondary }} />
            <Typography color="white" fontWeight={500}>Azure AI Translation</Typography>
          </Box>
        </Stack>

        {/* Buttons */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          gap: 2,
          justifyContent: 'center',
          alignItems: 'center',
          mt: 4
        }}>
          <Link href="/register/restaurant" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              startIcon={<Restaurant />}
              size="large"
              sx={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.white,
                borderRadius: '50px',
                padding: '12px 30px',
                fontSize: '1rem',
                fontWeight: 600,
                boxShadow: '0 4px 20px rgba(16, 124, 16, 0.25)',
                '&:hover': {
                  backgroundColor: theme.colors.lightGreen,
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(16, 124, 16, 0.3)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Register as Restaurant
            </Button>
          </Link>

          <Link href="/register/diner" style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              startIcon={<MenuBook />}
              size="large"
              sx={{
                borderColor: theme.colors.white,
                color: theme.colors.white,
                borderRadius: '50px',
                padding: '12px 30px',
                fontSize: '1rem',
                fontWeight: 600,
                '&:hover': {
                  borderColor: theme.colors.accent,
                  backgroundColor: 'rgba(80, 230, 255, 0.1)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Register as Diner
            </Button>
          </Link>
        </Box>

        {/* Prompt Message */}
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '650px',
            mx: 'auto',
            mt: 5,
            fontStyle: 'italic'
          }}
        >
          Your menu experience deserves a <strong>PROMPT</strong> upgrade — because first impressions matter.
          Join PromptMenu today and <strong>TIP</strong> your restaurant into the digital age.
        </Typography>
      </Container>

      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -100,
          left: -100,
          width: 200,
          height: 200,
          backgroundColor: theme.colors.primary,
          borderRadius: '50%',
          opacity: 0.1,
          filter: 'blur(100px)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          backgroundColor: theme.colors.secondary,
          borderRadius: '50%',
          opacity: 0.12,
          filter: 'blur(120px)',
          zIndex: 0,
        }}
      />
    </Box>
  );
};

export default Hero;