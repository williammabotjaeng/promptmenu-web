import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        paddingX: 2, 
        paddingY: 3, 
        width: '100%', 
        backgroundColor: 'black' 
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          width: '100%', 
          opacity: 1 
        }}
      >
        <Grid 
          container 
          spacing={2} 
          sx={{ 
            maxWidth: '1248px', 
            margin: '0 auto', 
            flexWrap: { xs: 'wrap', md: 'nowrap' } 
          }}
        >
          <Grid item xs={12} sm={4}>
            <Box sx={{ paddingBottom: 5 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  paddingBottom: 1, 
                  fontWeight: 'bold', 
                  color: '#977342', 
                  fontSize: '24px' 
                }}
              >
                Staffing Solutions Hub
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  marginTop: 2, 
                  color: 'white', 
                  fontSize: '14px' 
                }}
              >
                Staffing Your Success, One Event at a Time.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ paddingBottom: 5 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: 'white', 
                  fontSize: '16px' 
                }}
              >
                Quick Links
              </Typography>
              <Box sx={{ marginTop: 2 }}>
                <Typography 
                  component="div" 
                  sx={{ color: '#9CA3AF', marginTop: 1, fontSize: '16px' }}
                >
                  Link 1
                </Typography>
                <Typography 
                  component="div" 
                  sx={{ color: '#9CA3AF', marginTop: 1, fontSize: '16px' }}
                >
                  Link 2
                </Typography>
                <Typography 
                  component="div" 
                  sx={{ color: '#9CA3AF', marginTop: 1, fontSize: '16px' }}
                >
                  Link 3
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ paddingBottom: 5 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#fff', 
                  fontSize: '16px' 
                }}
              >
                Contact
              </Typography>
              <Box sx={{ marginTop: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'white', marginTop: 1 }}>
                  <LocationOnIcon sx={{ color: '#977342', marginRight: '8px' }} />
                  <Typography variant="body2" sx={{ color: '#9CA3AF', fontSize: '16px' }}>
                    Dubai Media City, UAE
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'white', marginTop: 1 }}>
                  <PhoneIcon sx={{ color: '#977342', marginRight: '8px' }} />
                  <Typography variant="body2" sx={{ color: '#9CA3AF', fontSize: '16px' }}>
                    +971 4 123 4567
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'white', marginTop: 1 }}>
                  <EmailIcon sx={{ color: '#977342', marginRight: '8px' }} />
                  <Typography variant="body2" sx={{ color: '#9CA3AF', fontSize: '16px' }}>
                    info@solutionsstaffinghub.com
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ paddingBottom: 5 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: 'white', 
                  fontSize: '16px' 
                }}
              >
                Follow Us
              </Typography>
              <Box sx={{ marginTop: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FacebookIcon sx={{ color: '#977342', fontSize: '24px', marginRight: '10px' }} />
                  <TwitterIcon sx={{ color: '#977342', fontSize: '24px', marginRight: '10px' }} />
                  <InstagramIcon sx={{ color: '#977342', fontSize: '24px' }} />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Typography 
          variant="body2" 
          sx={{ 
            paddingTop: 3, 
            textAlign: 'center', 
            color: '#9CA3AF' 
          }}
        >
          © 2025 Staffing Solutions Hub. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;