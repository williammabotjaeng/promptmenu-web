"use client";

import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { BarChart, Restaurant, Translate } from '@mui/icons-material';

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

interface StatisticProps {
  value: string;
  label: string;
}

const StatisticsSection: React.FC<{ statistics: StatisticProps[] }> = ({ statistics }) => {
  return (
    <Box
      sx={{
        py: 10,
        position: 'relative',
        background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
        color: theme.colors.white,
        overflow: 'hidden',
      }}
    >
      {/* Decorative background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Headline */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            component="h2"
            sx={{ 
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: '2rem', md: '2.75rem' },
            }}
          >
            PromptMenu by the Numbers
          </Typography>
          
          <Typography 
            variant="h6" 
            component="p"
            sx={{ 
              opacity: 0.9,
              maxWidth: '700px',
              mx: 'auto',
            }}
          >
            Our digital menu platform is helping restaurants all over the world create extraordinary 
            dining experiences. Here's how we're <strong>TIP</strong>ping the scales in their favor.
          </Typography>
        </Box>

        {/* Statistics counters */}
        <Box 
          sx={{ 
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: { xs: 3, md: 5 },
            mb: 8,
          }}
        >
          {statistics.map((stat, index) => (
            <Paper
              key={index}
              elevation={0}
              className="stagger-item"
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 calc(33% - 20px)' },
                py: 5,
                px: 3,
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box 
                sx={{ 
                  position: 'absolute',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  top: '-75px',
                  right: '-75px',
                }}
              />
              
              <Typography 
                variant="h2" 
                component="p"
                sx={{ 
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  mb: 1,
                  background: 'linear-gradient(135deg, rgba(255,255,255,1), rgba(255,255,255,0.8))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  position: 'relative',
                }}
              >
                {stat.value}
              </Typography>
              
              <Typography 
                variant="h6" 
                component="p"
                sx={{ 
                  fontWeight: 500,
                  opacity: 0.9,
                  position: 'relative',
                }}
              >
                {stat.label}
              </Typography>
            </Paper>
          ))}
        </Box>

        {/* Additional metrics */}
        <Box 
          sx={{ 
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          <Box 
            sx={{ 
              flex: { xs: '1 1 100%', md: '1 1 calc(33% - 16px)' },
              display: 'flex',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: '50%',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BarChart sx={{ fontSize: 40 }} />
            </Box>
            <Box>
              <Typography 
                variant="h5" 
                component="p"
                sx={{ 
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                27% Increase
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                in average order value
              </Typography>
            </Box>
          </Box>
          
          <Box 
            sx={{ 
              flex: { xs: '1 1 100%', md: '1 1 calc(33% - 16px)' },
              display: 'flex',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: '50%',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Restaurant sx={{ fontSize: 40 }} />
            </Box>
            <Box>
              <Typography 
                variant="h5" 
                component="p"
                sx={{ 
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                42% of Diners
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                try new menu items
              </Typography>
            </Box>
          </Box>
          
          <Box 
            sx={{ 
              flex: { xs: '1 1 100%', md: '1 1 calc(33% - 16px)' },
              display: 'flex',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: '50%',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Translate sx={{ fontSize: 40 }} />
            </Box>
            <Box>
              <Typography 
                variant="h5" 
                component="p"
                sx={{ 
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                15+ Languages
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                with automatic translation
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default StatisticsSection;