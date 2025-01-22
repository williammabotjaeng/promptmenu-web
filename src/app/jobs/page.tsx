"use client";

import * as React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { SearchSection } from '@/components/SearchSection';
import { JobCard } from '@/components/JobCard';
import PrimaryFooter from '@/components/PrimaryFooter';

const jobData = [
  {
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/fbf9227c806ec79d0dbbdfafe208eba075157780299caaa1a8b6d38ae92d7bb2?apiKey=7fae980a988640eea8add1e49a5d542e&",
    isUrgent: true,
    title: "Fashion Show Model",
    description: "Looking for male and female models for upcoming luxury brand fashion show",
    location: "Dubai Mall",
    deadline: "March 15, 2025"
  },
  {
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/6d4ea6afd27eeddebc5444567a15ad003cc941092ba50e084353ed1c4175d08b?apiKey=7fae980a988640eea8add1e49a5d542e&",
    title: "TV Commercial Actor",
    description: "Seeking actors aged 25-35 for a national bank commercial",
    location: "Business Bay",
    deadline: "March 20, 2025"
  },
  {
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/450d75a498d37b15e4c4012bf98de3efaa1a12b96b6bbb9c6192e3a6f12b41c4?apiKey=7fae980a988640eea8add1e49a5d542e&",
    title: "Professional Dancers",
    description: "Required dancers for upcoming music video shoot",
    location: "Dubai Media City",
    deadline: "March 25, 2025"
  }
];

const Header: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: 'white', borderBottom: '2px solid #D1D5DB' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Box sx={{ fontSize: '24px', fontWeight: 'bold', color: '#977342' }}>Staffing<br /> Solutions Hub</Box>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/5b94bb5bbafa47172ac9d071b32e3d505cde4e70fd24ac105bdfe6df97d51c1b?apiKey=7fae980a988640eea8add1e49a5d542e&"
          alt=""
          style={{ width: '74px', height: 'auto', marginLeft: '16px' }}
        />
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button sx={{ textTransform: 'none', color: '#977342', fontSize: '16px' }}>Home</Button>
          <Button sx={{ textTransform: 'none', color: '#977342', fontSize: '16px' }}>Messages</Button>
          <Button sx={{ textTransform: 'none', color: '#977342', fontSize: '16px' }}>Auditions</Button>
          <Button sx={{ textTransform: 'none', color: '#977342', fontSize: '16px' }}>Settings</Button>
        </Box>
      </Box>
      <Box sx={{ alignItems: 'center', m: 4 }}>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/b80eb30359b38c4c3f3c8f801f80278982fb5dd4cea914f8b8e7f5de660ea6d8?apiKey=7fae980a988640eea8add1e49a5d542e&"
          alt=""
          style={{ width: '89px' }}
        />
      </Box>
    </Box>
  );
};

const MainContent: React.FC = () => {
  return (
    <Box sx={{ padding: '24px', alignItems: 'center', justifyContent: 'center' }}>
      <SearchSection onSearch={null} />
      <Grid container spacing={5}>
        {jobData.map((job, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <JobCard {...job} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ justifyContent: 'center', alignItems: 'center', marginX: 70, marginY: 2}}>
        <Button
          variant="contained"
          sx={{
            alignSelf: 'center',
            padding: '12px 32px',
            marginTop: '8px',
            fontSize: '16px',
            color: 'white',
            backgroundColor: '#977342',
            borderRadius: '24px',
            textTransform: 'none',
            width: '240px'
          }}
        >
          Load More Jobs
        </Button>
      </Box>
    </Box>
  );
};



const Jobs: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: 2, border: '2px solid #D1D5DB', overflow: 'hidden' }}>
      <Header />
      <MainContent />
      <PrimaryFooter />
    </Box>
  );
};

export default Jobs;