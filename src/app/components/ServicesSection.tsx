import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { ServiceCard } from '@/components/ServiceCard'; 

const ServicesSection = ({ services }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        paddingX: { xs: 2, md: 5 }, 
        paddingTop: { xs: 2, md: 5 }, 
        marginTop: { xs: 2, md: 3 }, 
        width: '100%', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        maxWidth: '100%', 
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          paddingX: 1, 
          paddingBottom: 1, 
          width: '100%', 
          backgroundColor: 'transparent' 
        }}
      >
        <Box sx={{ zIndex: 10, textAlign: 'center' }}>
          <Typography variant="h4" component="span" sx={{ fontWeight: 'bold', color: 'white', fontSize: { xs: '24px', md: '36px' } }}>
            Our
          </Typography>&nbsp;&nbsp;
          <Typography variant="h4" component="span" sx={{ fontWeight: 'bold', color: 'stone.500', fontSize: { xs: '24px', md: '36px' } }}>
            Services
          </Typography>
        </Box>

        <Box sx={{ marginTop: { xs: 2, md: 5 }, backgroundColor: 'transparent' }}>
          <Grid container spacing={2} sx={{ marginTop: { xs: 2, md: 5 } }}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ServiceCard {...service} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <br />
      <br />
    </Box>
  );
};

export default ServicesSection;