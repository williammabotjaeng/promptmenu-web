"use client";

import { useEffect, useState } from 'react';
import { LoginForm } from '@/components/LoginForm';
import { useAuth } from '@/providers/auth-providers';
import '@/styles/globals.css';
import { Box, Container, Fade, Typography } from '@mui/material';
import Image from 'next/image';
import SSHGoldLogo from '@/assets/GoldLogo.png';

export default function LoginPage() {
  const { login } = useAuth();
  const [loaded, setLoaded] = useState(false);

  // Animation effect when component mounts
  useEffect(() => {
    setLoaded(true);
    
    // Apply any additional animations to elements with specific classes
    const textElements = document.querySelectorAll('.slide-in-text');
    textElements.forEach(element => {
      element.classList.add('animate');
    });
    
    // Background animation setup
    const backgroundElement = document.getElementById('animated-background');
    if (backgroundElement) {
      backgroundElement.classList.add('active');
    }
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        position: 'relative',
        background: 'black',
      }}
    >
      {/* Animated background pattern */}
      <Box
        id="animated-background"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: 'radial-gradient(circle at 25px 25px, #977342 2%, transparent 0%), radial-gradient(circle at 75px 75px, #977342 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      
      {/* Decorative corner elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '200px',
          height: '200px',
          borderTop: '4px solid rgba(151, 115, 66, 0.3)',
          borderLeft: '4px solid rgba(151, 115, 66, 0.3)',
          zIndex: 1,
          display: { xs: 'none', md: 'block' }
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '200px',
          height: '200px',
          borderBottom: '4px solid rgba(151, 115, 66, 0.3)',
          borderRight: '4px solid rgba(151, 115, 66, 0.3)',
          zIndex: 1,
          display: { xs: 'none', md: 'block' }
        }}
      />
      
      {/* Main content */}
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Logo for desktop - positioned at top left */}
        <Fade in={loaded} timeout={1000}>
          <Box
            sx={{
              position: 'absolute',
              top: 40,
              left: 40,
              display: { xs: 'none', sm: 'none', md: 'none' },
              alignItems: 'center',
              gap: 2,
              zIndex: 10
            }}
          >
            <Image
              src={SSHGoldLogo}
              alt="Staffing Solutions Hub"
              width={60}
              height={60}
              style={{ opacity: 0.9 }}
            />
            <Typography
              variant="h6"
              sx={{
                color: '#977342',
                fontWeight: 600,
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                letterSpacing: '1px'
              }}
            >
              STAFFING SOLUTIONS HUB
            </Typography>
          </Box>
        </Fade>
        
        {/* Logo for mobile/tablet - positioned above the form */}
        <Fade in={loaded} timeout={1000}>
          <Box
            sx={{
              position: 'absolute',
              top: { xs: 20, sm: 40 },
              left: '50%',
              transform: 'translateX(-50%)',
              display: { xs: 'flex', md: 'none' },
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              zIndex: 10
            }}
          >
            <Image
              src={SSHGoldLogo}
              alt="Staffing Solutions Hub"
              width={80}
              height={80}
              style={{ opacity: 0.9 }}
            />
            <Typography
              variant="h6"
              sx={{
                color: '#977342',
                fontWeight: 600,
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                letterSpacing: '1px',
                textAlign: 'center'
              }}
            >
              STAFFING SOLUTIONS HUB
            </Typography>
          </Box>
        </Fade>
        
        {/* Login form */}
        <Fade in={loaded} timeout={800}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              width: '100%',
              paddingTop: { xs: '120px', sm: '140px', md: 0 } // Add padding on mobile/tablet to accommodate the logo
            }}
          >
            <LoginForm />
          </Box>
        </Fade>
      </Container>

      {/* Global styles for animations */}
      <style jsx global>{`
        #animated-background.active {
          animation: backgroundPulse 15s infinite alternate;
        }
        
        @keyframes backgroundPulse {
          0% {
            opacity: 0.03;
            transform: scale(1);
          }
          100% {
            opacity: 0.08;
            transform: scale(1.1);
          }
        }
        
        .slide-in-text.animate {
          animation: slideIn 0.8s forwards;
        }
        
        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
}