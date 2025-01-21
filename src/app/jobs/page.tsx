"use client";

import * as React from 'react';
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { SearchSection } from '@/components/SearchSection';
import { JobCard } from '@/components/JobCard';

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

const Jobs: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: 2, border: '2px solid #D1D5DB', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', paddingBottom: '72px', width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: 0, width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingY: 1, marginRight: 4, marginLeft: 3 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'space-between', alignItems: 'start', paddingTop: 4, paddingBottom: 7 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 1 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', flexGrow: 1, gap: 10, alignItems: 'start' }}>
                  <Box sx={{ display: 'flex', marginTop: 0, fontSize: '24px', fontWeight: 'bold', lineHeight: '24px' }}>
                    <Box sx={{ my: 'auto', marginRight: 0 }}>Staffing Solutions Hub</Box>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/5b94bb5bbafa47172ac9d071b32e3d505cde4e70fd24ac105bdfe6df97d51c1b?apiKey=7fae980a988640eea8add1e49a5d542e&"
                      alt=""
                      style={{ width: '74px', height: 'auto' }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', flexGrow: 1, gap: 7, paddingY: 1.5, marginTop: 1, fontSize: '16px', lineHeight: '16px', whiteSpace: 'nowrap' }}>
                    <Button>Home</Button>
                    <Button>Messages</Button>
                    <Button>Auditions</Button>
                  </Box>
                </Box>
                <Button sx={{ alignSelf: 'start', fontSize: '16px', lineHeight: '16px' }}>Settings</Button>
              </Box>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/41411c5661a4517619d2a13eb89b93cbf391d41252f3282f3fe21ff9726bae81?apiKey=7fae980a988640eea8add1e49a5d542e&"
                alt=""
                style={{ width: '73px', height: 'auto' }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', padding: '16px', paddingBottom: '12px', width: '100%' }}>
            <SearchSection />
            
            <Box sx={{ padding: '24px', paddingBottom: '6px', width: '100%' }}>
              <Grid container spacing={5}>
                {jobData.map((job, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <JobCard {...job} />
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Button
              variant="contained"
              sx={{
                alignSelf: 'center',
                padding: '12px 32px',
                marginTop: '8px',
                fontSize: '16px',
                color: 'white',
                backgroundColor: '#977342',
                borderRadius: '24px'
              }}
            >
              Load More Jobs
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '48px 80px',
            width: '100%',
            backgroundColor: '#977342'
          }}
        >
          {/* Footer content remains the same as in original code */}
        </Box>
      </Box>
    </Box>
  );
};

export default Jobs;