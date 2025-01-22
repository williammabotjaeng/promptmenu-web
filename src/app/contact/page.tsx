"use client";

import * as React from 'react';
import { WhiteHeader } from '@/components/WhiteHeader';
import SidebarProfileCard from '@/components/SidebarProfileCard';
import FilterForm from '@/components/FilterForm';
import Pagination from '@/components/Pagination';
import GreyFooter from '@/components/GreyFooter';
import { Box, Typography, TextField, Button } from '@mui/material';

const Contact: React.FC = () => {
  const profiles = [
    {
      name: "James Chen",
      location: "Abu Dhabi, UAE",
      age: 28,
      skills: ["Dancing", "Acting"],
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/cda574f70ccd49a7abc97a1663f275bd69d56bce15ee1463e97ba119b97f026d?apiKey=7fae980a988640eea8add1e49a5d542e&",
      isFeatured: true,
    },
    {
      name: "Emma Wilson",
      location: "Dubai, UAE",
      age: 23,
      skills: ["Modeling", "Dancing"],
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/d31168e927ea3b0e37f3c305f3be16dd15743353e5088e166d1e3ac7f06b24b5?apiKey=7fae980a988640eea8add1e49a5d542e&",
    },
    {
      name: "Karim Hassan",
      location: "Sharjah, UAE",
      age: 30,
      skills: ["Acting", "Voice Over"],
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/ec0426e44f2a3052c334fe65d200d6d4e116fb261bf898b202eadb67d91bdf5d?apiKey=7fae980a988640eea8add1e49a5d542e&",
    }
  ];

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
          Find Your Perfect Talent
        </Typography>
        
        {/* Contact Form Section */}
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>Contact Us</Typography>
          <TextField
            fullWidth
            label="Your Name"
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Your Email"
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" sx={{ backgroundColor: '#977342', color: 'white' }}>
            Send Message
          </Button>
        </Box>

        {/* Email Contact Options */}
        <Box sx={{ marginTop: 4, textAlign: 'center' }}>
          <Typography variant="h6">For Talent Inquiries:</Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            <a href="mailto:talent@example.com">talent@example.com</a>
          </Typography>
          <Typography variant="h6">For Companies:</Typography>
          <Typography variant="body1">
            <a href="mailto:companies@example.com">companies@example.com</a>
          </Typography>
        </Box>

        {/* Map Section */}
        <Box sx={{ marginTop: 4, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>Our Location</Typography>
          {/* Placeholder for Map */}
          <Box sx={{ width: '100%', height: '300px', backgroundColor: '#e0e0e0', borderRadius: 1 }}>
            {/* You can integrate a map component here, e.g., Google Maps */}
            <Typography variant="body2" sx={{ padding: 2 }}>Map Placeholder</Typography>
          </Box>
        </Box>
      </Box>
      <GreyFooter />
    </Box>
  );
};

export default Contact;