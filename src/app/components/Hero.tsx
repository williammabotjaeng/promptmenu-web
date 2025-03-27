"use client";

import React from 'react';
import { Box, Button, Typography, Container, Stack, Chip, useMediaQuery, useTheme } from '@mui/material';
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
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.between('sm', 'md'));

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: '100vh', md: '90vh' }, // Ensure full height on mobile
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: { xs: '70% center', md: 'center' }, // Better mobile positioning
        py: { xs: 10, md: 0 }, // Add vertical padding on mobile
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
          background: 'linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85))',
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
          py: { xs: 4, md: 5 },
          px: { xs: 2, sm: 3, md: 4 }, // Responsive padding
        }}
      >
        {/* TIP Chip */}
        <Chip
          label={isMobile ? "To Insure Promptness" : "To Insure Promptness in your menu experience"}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            color: theme.colors.white,
            backdropFilter: 'blur(4px)',
            mb: { xs: 3, md: 4 },
            fontWeight: 500,
            fontSize: { xs: '0.75rem', md: '0.9rem' },
            py: { xs: 0.75, md: 1 },
            borderRadius: 6,
            maxWidth: { xs: '90%', sm: 'none' }, // Prevent overflow on small screens
          }}
        />

        {/* Main Headline */}
        <Typography
          variant="h1"
          sx={{
            color: theme.colors.white,
            fontWeight: 800,
            fontSize: { xs: '2rem', sm: '3rem', md: '4rem', lg: '5rem' }, // Smaller sizes for mobile
            lineHeight: { xs: 1.2, md: 1.1 },
            mb: { xs: 1.5, md: 2 },
            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            '& .highlight': {
              color: theme.colors.accent,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: { xs: '-2px', md: '0px' },
                left: 0,
                width: '100%',
                height: { xs: '6px', md: '8px' },
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
            fontSize: { xs: '1rem', sm: '1.15rem', md: '1.5rem' }, // Responsive font sizes
            maxWidth: '800px',
            mx: 'auto',
            mb: { xs: 4, md: 6 },
            lineHeight: 1.5,
            px: { xs: 1, md: 0 }, // Add horizontal padding on mobile
          }}
        >
          Digital menus that <strong>TIP</strong> the scales in your favor — 
          multimedia-rich content that delights customers and <strong>Prompts</strong> higher engagement.
        </Typography>

        {/* Features */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} // Stack vertically on mobile, horizontally on tablet+
          spacing={{ xs: 1.5, md: 3 }} // Less spacing on mobile
          justifyContent="center"
          alignItems="center"
          sx={{ 
            mb: { xs: 4, md: 6 },
            width: '100%',
          }}
        >
          <Box sx={{
            bgcolor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            px: { xs: 2, md: 3 },
            py: { xs: 1.5, md: 2 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
            border: '1px solid rgba(255,255,255,0.1)',
            width: { xs: '100%', sm: 'auto' }, // Full width on mobile
            maxWidth: { xs: '100%', sm: '220px' }, // Limit width on tablet
          }}>
            <VideoCameraBack sx={{ color: theme.colors.accent, fontSize: { xs: 20, md: 24 } }} />
            <Typography color="white" fontWeight={500} fontSize={{ xs: '0.9rem', md: '1rem' }}>Rich Media Integration</Typography>
          </Box>
          
          <Box sx={{
            bgcolor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            px: { xs: 2, md: 3 },
            py: { xs: 1.5, md: 2 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
            border: '1px solid rgba(255,255,255,0.1)',
            width: { xs: '100%', sm: 'auto' }, // Full width on mobile
            maxWidth: { xs: '100%', sm: '220px' }, // Limit width on tablet
          }}>
            <Restaurant sx={{ color: theme.colors.primary, fontSize: { xs: 20, md: 24 } }} />
            <Typography color="white" fontWeight={500} fontSize={{ xs: '0.9rem', md: '1rem' }}>Elevated Dining Experience</Typography>
          </Box>
          
          <Box sx={{
            bgcolor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            px: { xs: 2, md: 3 },
            py: { xs: 1.5, md: 2 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
            border: '1px solid rgba(255,255,255,0.1)',
            width: { xs: '100%', sm: 'auto' }, // Full width on mobile
            maxWidth: { xs: '100%', sm: '220px' }, // Limit width on tablet
          }}>
            <MenuBook sx={{ color: theme.colors.secondary, fontSize: { xs: 20, md: 24 } }} />
            <Typography color="white" fontWeight={500} fontSize={{ xs: '0.9rem', md: '1rem' }}>Azure AI Translation</Typography>
          </Box>
        </Stack>

        {/* Buttons */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          gap: { xs: 1.5, md: 2 },
          justifyContent: 'center',
          alignItems: 'center',
          mt: { xs: 2, md: 4 },
          width: '100%', // Full width on mobile
        }}>
          <Link href="/register/restaurant" style={{ textDecoration: 'none', width: isMobile ? '100%' : 'auto' }}>
            <Button
              variant="contained"
              startIcon={<Restaurant />}
              size={isMobile ? "medium" : "large"}
              fullWidth={isMobile}
              sx={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.white,
                borderRadius: '50px',
                padding: { xs: '10px 20px', md: '12px 30px' },
                fontSize: { xs: '0.9rem', md: '1rem' },
                fontWeight: 600,
                width: isMobile ? '100%' : 'auto', // Full width on mobile
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

          <Link href="/register/diner" style={{ textDecoration: 'none', width: isMobile ? '100%' : 'auto' }}>
            <Button
              variant="outlined"
              startIcon={<MenuBook />}
              size={isMobile ? "medium" : "large"}
              fullWidth={isMobile}
              sx={{
                borderColor: theme.colors.white,
                color: theme.colors.white,
                borderRadius: '50px',
                padding: { xs: '10px 20px', md: '12px 30px' },
                fontSize: { xs: '0.9rem', md: '1rem' },
                fontWeight: 600,
                width: isMobile ? '100%' : 'auto', // Full width on mobile
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
            mt: { xs: 3, md: 5 },
            mb: { xs: 2, md: 0 }, // Add bottom margin on mobile
            fontStyle: 'italic',
            fontSize: { xs: '0.8rem', md: '0.875rem' }, // Smaller on mobile
            px: { xs: 1, md: 0 }, // Add padding on mobile
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
          bottom: { xs: '-50px', md: '-100px' },
          left: { xs: '-50px', md: '-100px' },
          width: { xs: '150px', md: '200px' },
          height: { xs: '150px', md: '200px' },
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
          top: { xs: '-50px', md: '-100px' },
          right: { xs: '-50px', md: '-100px' },
          width: { xs: '200px', md: '300px' },
          height: { xs: '200px', md: '300px' },
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