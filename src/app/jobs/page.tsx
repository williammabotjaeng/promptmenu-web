"use client";

import * as React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { SearchSection } from '@/components/SearchSection';
import { JobCard } from '@/components/JobCard';
import PrimaryFooter from '@/components/PrimaryFooter';
import SecondaryHeader from '@/components/SecondaryHeader';
import { useEvent } from '@/providers/event-provider';
import { useEffect } from 'react';

const Jobs = () => {
  const [jobs, setJobs] = React.useState([
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
  ]);
  
  const [loading, setLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredJobs, setFilteredJobs] = React.useState(jobs);

  const { getRoles } = useEvent();
  
  // Mock function to simulate loading more jobs
  const loadMoreJobs = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newJobs = [
        {
          imageUrl: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/fbf9227c806ec79d0dbbdfafe208eba075157780299caaa1a8b6d38ae92d7bb2?apiKey=7fae980a988640eea8add1e49a5d542e&",
          title: "Photoshoot Model",
          description: "Models needed for jewelry brand photoshoot",
          location: "Jumeirah Beach",
          deadline: "April 2, 2025"
        },
        {
          imageUrl: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/6d4ea6afd27eeddebc5444567a15ad003cc941092ba50e084353ed1c4175d08b?apiKey=7fae980a988640eea8add1e49a5d542e&",
          isUrgent: true,
          title: "Voice Actor",
          description: "Voice actors needed for animated commercial",
          location: "Dubai Studio City",
          deadline: "March 30, 2025"
        },
        {
          imageUrl: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/450d75a498d37b15e4c4012bf98de3efaa1a12b96b6bbb9c6192e3a6f12b41c4?apiKey=7fae980a988640eea8add1e49a5d542e&",
          title: "Child Actor",
          description: "Looking for children aged 7-10 for family TV show",
          location: "Al Quoz",
          deadline: "April 5, 2025"
        }
      ];
      
      setJobs([...jobs, ...newJobs]);
      setFilteredJobs([...filteredJobs, ...newJobs]);
      setLoading(false);
    }, 1000);
  };
  
  // Handle search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (!query) {
      setFilteredJobs(jobs);
      return;
    }
    
    const filtered = jobs.filter(job => 
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.description.toLowerCase().includes(query.toLowerCase()) ||
      job.location.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredJobs(filtered);
  };
  
  // Update filtered jobs when jobs state changes
  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      setFilteredJobs(jobs);
    }
  }, [jobs]);

  useEffect(() => {
    getRoles()
    .then((data: any) => {
      console.log("Roles Data", data);
    })
    .catch(err => console.log("Roles Error:", err));
  }, []);  

  const MainContent = () => {
    return (
      <Box 
        sx={{ 
          padding: { xs: '16px', md: '24px' }, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        <SearchSection onSearch={handleSearch} />
        
        {filteredJobs.length === 0 ? (
          <Box sx={{ my: 5, textAlign: 'center' }}>
            <Typography variant="h6">No jobs found matching your search criteria</Typography>
          </Box>
        ) : (
          <Grid container spacing={5}>
            {filteredJobs.map((job, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <JobCard {...job} />
              </Grid>
            ))}
          </Grid>
        )}
        
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            marginY: 2 
          }}
        >
          <Button
            variant="contained"
            onClick={loadMoreJobs}
            disabled={loading}
            sx={{
              padding: '12px 32px',
              marginTop: '8px',
              fontSize: { xs: '14px', md: '16px' },
              color: 'white',
              backgroundColor: '#977342',
              '&:hover': {
                backgroundColor: '#7D5F35',
              },
              borderRadius: '24px',
              textTransform: 'none',
              width: { xs: '100%', sm: '240px' } 
            }}
          >
            {loading ? 'Loading...' : 'Load More Jobs'}
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', overflow: 'hidden', minHeight: '100vh' }}>
      <SecondaryHeader />
      <MainContent />
      <PrimaryFooter />
    </Box>
  );
};

export default Jobs;