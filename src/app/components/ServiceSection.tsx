"use client";

import React from 'react';
import { Box, Container, Typography, Paper, Icon } from '@mui/material';
import { RestaurantMenu, Videocam, Translate, Analytics } from '@mui/icons-material';

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

interface ServiceProps {
  icon: string;
  title: string;
  description: string;
}

const ServiceSection: React.FC<{ services: ServiceProps[] }> = ({ services }) => {
  // Map string icon names to MUI icon components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'menu_book':
        return <RestaurantMenu fontSize="large" />;
      case 'videocam':
        return <Videocam fontSize="large" />;
      case 'translate':
        return <Translate fontSize="large" />;
      case 'analytics':
        return <Analytics fontSize="large" />;
      default:
        return <RestaurantMenu fontSize="large" />;
    }
  };

  return (
    <Box 
      sx={{ 
        py: { xs: 8, md: 12 }, 
        bgcolor: theme.colors.background,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          left: -100,
          bottom: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.colors.primary}05, transparent 70%)`,
          zIndex: 0,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          right: -50,
          top: -50,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.colors.secondary}05, transparent 70%)`,
          zIndex: 0,
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography 
            variant="h6" 
            component="p"
            sx={{ 
              color: theme.colors.secondary,
              fontWeight: 600,
              mb: 2 
            }}
          >
            OUR SERVICES
          </Typography>
          
          <Typography 
            variant="h2" 
            component="h2"
            sx={{ 
              fontWeight: 700, 
              color: theme.colors.text,
              maxWidth: '800px',
              mx: 'auto',
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Everything You Need for Digital Menu Success
          </Typography>
          
          <Typography 
            variant="body1"
            sx={{ 
              color: theme.colors.lightText,
              maxWidth: '750px',
              mx: 'auto',
              fontSize: '1.1rem',
            }}
          >
            PromptMenu offers a complete suite of digital menu solutions to help you create 
            engaging experiences that <strong>TIP</strong> the scales in your favor.
          </Typography>
        </Box>
        
        {/* Services Grid */}
        <Box 
          sx={{ 
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'center',
          }}
        >
          {services.map((service, index) => (
            <Paper
              key={index}
              elevation={0}
              className="stagger-item"
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)', lg: '1 1 calc(25% - 18px)' },
                p: 4,
                borderRadius: 4,
                bgcolor: theme.colors.white,
                border: '1px solid rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                minHeight: '280px',
              }}
            >
              <Box 
                sx={{ 
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: index % 2 === 0 
                    ? `${theme.colors.primary}15` 
                    : `${theme.colors.secondary}15`,
                  color: index % 2 === 0 
                    ? theme.colors.primary 
                    : theme.colors.secondary,
                  mb: 3,
                }}
              >
                {getIconComponent(service.icon)}
              </Box>
              
              <Typography 
                variant="h5" 
                component="h3"
                sx={{ 
                  fontWeight: 600, 
                  mb: 2,
                  color: theme.colors.text,
                }}
              >
                {service.title}
              </Typography>
              
              <Typography 
                variant="body1"
                sx={{ 
                  color: theme.colors.lightText,
                  mb: 'auto',
                }}
              >
                {service.description}
              </Typography>
              
              <Typography 
                variant="body2"
                sx={{ 
                  color: index % 2 === 0 ? theme.colors.primary : theme.colors.secondary,
                  fontWeight: 600,
                  mt: 3,
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                Learn more
                <Box component="span" sx={{ fontSize: '1.2rem', ml: 0.5 }}>→</Box>
              </Typography>
            </Paper>
          ))}
        </Box>
        
        {/* Additional Feature Highlight */}
        <Paper
          elevation={0}
          sx={{
            mt: 8,
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            bgcolor: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Box sx={{ flex: { xs: '1 1 100%', md: '3 1 0%' } }}>
            <Typography 
              variant="h4" 
              component="h3"
              sx={{ 
                fontWeight: 700, 
                mb: 2,
                color: theme.colors.text,
                fontSize: { xs: '1.5rem', md: '2rem' },
              }}
            >
              Powered by Azure AI for the <span style={{ color: theme.colors.primary }}>PROMPT</span>est Results
            </Typography>
            
            <Typography 
              variant="body1"
              sx={{ 
                color: theme.colors.lightText,
                fontSize: '1.05rem',
                lineHeight: 1.6,
              }}
            >
              Our partnership with Microsoft provides cutting-edge AI capabilities that make your menus more 
              accessible, engaging, and effective. From automatic video transcription to real-time translation, 
              Azure AI helps your restaurant connect with more customers in meaningful ways.
            </Typography>
          </Box>
          
          <Box 
            sx={{ 
              flex: { xs: '1 1 100%', md: '2 1 0%' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              py: { xs: 2, md: 0 }
            }}
          >
            <Box 
              component="img"
              src="https://learn.microsoft.com/azure/ai-services/media/index/azure-machine-learning.svg"
              alt="Azure AI Services"
              sx={{
                width: { xs: '60%', sm: '50%', md: '70%' },
                maxWidth: '300px',
                filter: 'drop-shadow(0 10px 15px rgba(0,120,212,0.2))',
              }}
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ServiceSection;