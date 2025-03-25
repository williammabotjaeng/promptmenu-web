import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/navigation';

interface MarketingBannerProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonUrl?: string;
}

const MarketingBanner: React.FC<MarketingBannerProps> = ({
  title = "Discover Amazing Talent",
  subtitle = "Connect with professional talent from around the world. Sign up to access our full database.",
  primaryButtonText = "Sign Up",
  secondaryButtonText = "Learn More",
  primaryButtonUrl = "/register/2",
  secondaryButtonUrl = "/about"
}) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        backgroundColor: '#f8f4e8',
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url("/images/talent-banner-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderBottom: '1px solid #e5d9c1',
        py: { xs: 4, md: 5 },
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              color: '#7d5f35', 
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' }
            }}
          >
            {title}
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              maxWidth: '600px', 
              mx: 'auto', 
              mb: 4,
              fontSize: { xs: '1rem', md: '1.1rem' },
              color: '#5f4b2a'
            }}
          >
            {subtitle}
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 3 },
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => router.push(primaryButtonUrl)}
              sx={{ 
                backgroundColor: '#977342',
                fontWeight: 500,
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                '&:hover': { backgroundColor: '#7d5f35' }
              }}
            >
              {primaryButtonText}
            </Button>
            
            <Button 
              variant="outlined" 
              size="large"
              onClick={() => router.push(secondaryButtonUrl)}
              sx={{ 
                borderColor: '#977342', 
                color: '#977342',
                fontWeight: 500,
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                '&:hover': { 
                  borderColor: '#7d5f35', 
                  color: '#7d5f35',
                  backgroundColor: 'rgba(151, 115, 66, 0.04)'
                }
              }}
            >
              {secondaryButtonText}
            </Button>
          </Box>
        </Box>
      </Container>
      
      {/* Decorative elements */}
      <Box 
        sx={{ 
          position: 'absolute',
          top: -30,
          right: -30,
          width: 150,
          height: 150,
          borderRadius: '50%',
          backgroundColor: 'rgba(151, 115, 66, 0.1)',
          zIndex: 1
        }} 
      />
      
      <Box 
        sx={{ 
          position: 'absolute',
          bottom: -40,
          left: -40,
          width: 200,
          height: 200,
          borderRadius: '50%',
          backgroundColor: 'rgba(151, 115, 66, 0.08)',
          zIndex: 1
        }} 
      />
    </Box>
  );
};

export default MarketingBanner;