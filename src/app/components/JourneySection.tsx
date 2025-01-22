import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const JourneySection = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: { xs: 4, md: 12 }, // Responsive padding
        marginTop: { xs: 2, md: 3 }, // Responsive margin
        width: '100%', 
        textAlign: 'center', 
        color: 'white', 
        backgroundColor: 'rgba(151, 115, 66, 0.1)',
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          paddingX: 1 
        }}
      >
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            zIndex: 10, 
            fontWeight: 'bold', 
            fontSize: { xs: '28px', md: '36px' }, // Responsive font size
            color: 'white', 
            maxWidth: '100%' 
          }}
        >
          Ready to Start Your Journey?
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            marginTop: 3, 
            fontSize: { xs: '16px', md: '20px' }, // Responsive font size
            color: 'white', 
            maxWidth: '100%' 
          }}
        >
          Join us to find Success, One Event at a Time.
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            width: '100%', 
            marginTop: 2 
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              gap: 2, 
              maxWidth: '332px', 
              width: '100%', 
              flexDirection: { xs: 'column', sm: 'row' }, // Stack buttons on small screens
            }}
          >
            <Button 
              variant="contained" 
              sx={{ 
                paddingX: 4, 
                paddingY: 2, 
                borderRadius: '50px', 
                backgroundColor: '#977342', 
                color: 'white', 
                border: '1px solid white', 
                fontSize: '16px', 
                textTransform: 'none', 
                '&:hover': { backgroundColor: '#8a6535' } 
              }}
            >
              Register Now
            </Button>
            <Button 
              variant="outlined" 
              sx={{ 
                paddingX: 4, 
                paddingY: 2, 
                borderRadius: '50px', 
                borderColor: '#977342', 
                color: 'white', 
                backgroundColor: 'transparent', 
                textTransform: 'none', 
                '&:hover': { borderColor: '#8a6535', color: 'white' } 
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default JourneySection;