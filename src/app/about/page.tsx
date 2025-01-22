"use client";

import * as React from 'react';
import { WhiteHeader } from '@/components/WhiteHeader';
import GreyFooter from '@/components/GreyFooter';
import { Box, Typography } from '@mui/material';

const About: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f9f9f9',
        overflow: 'hidden',
      }}
    >
      <WhiteHeader />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'center',
          paddingX: 2,
          paddingY: 1,
          marginTop: 1,
          width: '100%',
          maxWidth: 'screen.xl',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2, textAlign: 'center' }}>
          About Staffing Solutions Hub
        </Typography>
        
        <Typography variant="body1" sx={{ marginBottom: 2, textAlign: 'justify' }}>
          Welcome to Staffing Solutions Hub, your premier casting agency located in the heart of Dubai. 
          We specialize in connecting talented individuals with leading companies in the entertainment and 
          media industries. Our mission is to provide exceptional staffing solutions that cater to the 
          unique needs of our clients while ensuring that our talent receives the best opportunities to shine.
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: 2, textAlign: 'justify' }}>
          At Staffing Solutions Hub, we understand the dynamic nature of the casting industry. Our team 
          of experienced professionals works tirelessly to identify and recruit the best talent, from 
          actors and models to voice-over artists and production crew. We pride ourselves on our extensive 
          network and our ability to match the right talent with the right projects.
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: 2, textAlign: 'justify' }}>
          Our commitment to excellence is reflected in our personalized approach. We take the time to 
          understand the specific requirements of each client and project, ensuring that we deliver 
          tailored solutions that exceed expectations. Whether you are a production company looking for 
          skilled professionals or a talent seeking your next big break, Staffing Solutions Hub is here 
          to help you succeed.
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: 2, textAlign: 'justify' }}>
          Join us at Staffing Solutions Hub and discover the difference that dedicated staffing solutions 
          can make. Together, we can create unforgettable experiences in the world of entertainment.
        </Typography>
      </Box>
      <GreyFooter />
    </Box>
  );
};

export default About;