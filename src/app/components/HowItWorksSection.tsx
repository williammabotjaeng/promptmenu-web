"use client";

import React from 'react';
import { Box, Container, Typography, Button, Paper, Avatar } from '@mui/material';
import { 
  CloudUpload, 
  VideoLibrary, 
  Translate, 
  Launch,
  ArrowForward,
  QrCode,
  Analytics,
  RestaurantMenu
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

const HowItWorksSection: React.FC = () => {
  // Steps data
  const steps = [
    {
      title: "Create Your Digital Menu",
      description: "Upload your menu items with descriptions, prices, and photos. Our platform makes it easy to organize categories and highlight special items.",
      icon: <CloudUpload sx={{ fontSize: 30 }} />,
      color: theme.colors.primary
    },
    {
      title: "Add Rich Media Content",
      description: "Enhance your menu with videos showcasing preparation methods, chef introductions, and ingredient highlights to engage customers.",
      icon: <VideoLibrary sx={{ fontSize: 30 }} />,
      color: theme.colors.secondary
    },
    {
      title: "Enable AI Translation",
      description: "Break language barriers with automatic menu translation powered by Azure AI, making your menu accessible to international guests.",
      icon: <Translate sx={{ fontSize: 30 }} />,
      color: theme.colors.accent
    },
    {
      title: "Launch Your Digital Menu",
      description: "Generate QR codes for your tables and integrate with your website. Customers can access your interactive menu from any device.",
      icon: <Launch sx={{ fontSize: 30 }} />,
      color: theme.colors.primary
    }
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: theme.colors.white,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23107C10' fill-opacity='1'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 20.83l2.83-2.83 1.41 1.41L1.41 22.24H0v-1.41zM0 3.07l2.83-2.83 1.41 1.41L1.41 4.48H0V3.07zm20.76 35.52l2.83-2.83 1.41 1.41L22.17 40h-1.41v-1.41zm0-17.76l2.83-2.83 1.41 1.41-2.83 2.83h-1.41v-1.41zm0-17.76l2.83-2.83 1.41 1.41-2.83 2.83h-1.41V3.07zm-9.49 17.76l2.83-2.83 1.41 1.41-2.83 2.83h-1.41v-1.41zm0-17.76l2.83-2.83 1.41 1.41-2.83 2.83h-1.41V3.07zM20.76 20.83l2.83-2.83 1.41 1.41-2.83 2.83h-1.41v-1.41z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h6"
            component="p"
            sx={{
              color: theme.colors.primary,
              fontWeight: 600,
              mb: 2
            }}
          >
            HOW IT WORKS
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
            Four Simple Steps to <span style={{ color: theme.colors.primary }}>PROMPT</span> Digital Menu Success
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
            Get your interactive digital menu up and running in no time with our streamlined process.
            Our platform is designed to make implementation quick and hassle-free.
          </Typography>
        </Box>

        {/* Step Process Flow */}
        <Box sx={{ position: 'relative', mb: 10 }}>
          {/* Connecting Line */}
          <Box
            sx={{
              position: 'absolute',
              top: '100px',
              left: '10%',
              right: '10%',
              height: '4px',
              background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
              display: { xs: 'none', md: 'block' },
              zIndex: 0,
            }}
          />

          {/* Steps */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              gap: 4,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {steps.map((step, index) => (
              <Box
                key={index}
                className="stagger-item"
                sx={{
                  flex: '1 1 0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: { xs: 'flex-start', md: 'center' },
                  textAlign: { xs: 'left', md: 'center' },
                  position: 'relative',
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'white',
                    color: step.color,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    mb: 3,
                    border: `2px solid ${step.color}`,
                  }}
                >
                  {step.icon}
                </Avatar>

                <Box
                  sx={{
                    position: 'absolute',
                    top: 30,
                    right: { xs: 'auto', md: -30 },
                    left: { xs: 110, md: 'auto' },
                    transform: { xs: 'none', md: 'translateY(-50%)' },
                    display: { xs: index === steps.length - 1 ? 'none' : 'block', md: index === steps.length - 1 ? 'none' : 'block' },
                    color: theme.colors.primary,
                    zIndex: 2,
                  }}
                >
                  <ArrowForward sx={{ 
                    fontSize: 36, 
                    transform: { xs: 'rotate(90deg)', md: 'none' } 
                  }} />
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
                  {step.title}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: theme.colors.lightText,
                    lineHeight: 1.6,
                  }}
                >
                  {step.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Key Benefits */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 6,
            alignItems: 'center',
            mb: 6,
          }}
        >
          <Box
            sx={{
              flex: '1 1 50%',
              position: 'relative',
              borderRadius: 4,
              overflow: 'hidden',
              height: { xs: '300px', md: '400px' },
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            }}
          >
            <Box
              component="img"
              src="https://images.pexels.com/photos/4350110/pexels-photo-4350110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Customer scanning restaurant QR code menu"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>

          <Box sx={{ flex: '1 1 50%' }}>
            <Typography
              variant="h3"
              component="h3"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: theme.colors.text,
                fontSize: { xs: '1.75rem', md: '2.25rem' },
              }}
            >
              The Benefits of Going Digital with PromptMenu
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Avatar
                  sx={{
                    bgcolor: `${theme.colors.primary}15`,
                    color: theme.colors.primary,
                  }}
                >
                  <QrCode />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Contactless Ordering
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.colors.lightText }}>
                    QR codes make it easy for customers to view your menu on their devices,
                    reducing the need for physical menus and <strong>TIP</strong>ping the scales toward a safer experience.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 3 }}>
                <Avatar
                  sx={{
                    bgcolor: `${theme.colors.secondary}15`,
                    color: theme.colors.secondary,
                  }}
                >
                  <RestaurantMenu />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Instant Menu Updates
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.colors.lightText }}>
                    Make changes to your menu in real-time. Add seasonal items, update prices,
                    or highlight daily specials without printing new menus.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 3 }}>
                <Avatar
                  sx={{
                    bgcolor: `${theme.colors.accent}15`,
                    color: theme.colors.accent,
                  }}
                >
                  <Analytics />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Customer Insights
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.colors.lightText }}>
                    Track which menu items get the most views, collect feedback directly from customers,
                    and use data to optimize your offerings.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* CTA */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography
            variant="h5"
            component="p"
            sx={{
              color: theme.colors.text,
              fontWeight: 600,
              mb: 3,
            }}
          >
            Ready to transform your restaurant menu?
          </Typography>

          <Link href="/register/restaurant" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: theme.colors.primary,
                color: theme.colors.white,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                '&:hover': {
                  bgcolor: theme.colors.lightGreen,
                },
              }}
            >
              Get Started Today
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorksSection;