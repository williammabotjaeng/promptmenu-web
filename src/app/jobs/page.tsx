"use client";

import * as React from 'react';
import { Box, Button, Grid, Typography, CircularProgress } from '@mui/material';
import { SearchSection } from '@/components/SearchSection';
import { JobCard } from '@/components/JobCard';
import PrimaryFooter from '@/components/PrimaryFooter';
import SecondaryHeader from '@/components/SecondaryHeader';
import { useEvent } from '@/providers/event-provider';
import { useEffect, useState } from 'react';

// Helper function to format date for display
const formatDeadline = (dateString) => {
  if (!dateString) return "No deadline";
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error("Date formatting error:", error);
    return dateString;
  }
};

// Default placeholder image to use when no poster is available
const DEFAULT_JOB_IMAGE = "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/fbf9227c806ec79d0dbbdfafe208eba075157780299caaa1a8b6d38ae92d7bb2?apiKey=7fae980a988640eea8add1e49a5d542e&";

const Jobs = () => {
  // State for jobs data
  const [roles, setRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // Get roles and roleSignedUrls from the event provider
  const { getRoles, roleSignedUrls } = useEvent();
  
  // Initial data load
  useEffect(() => {
    setLoading(true);
    getRoles()
      .then((data) => {
        if (Array.isArray(data)) {
          // Format the roles data for display
          const formattedRoles = data.map(role => ({
            id: role.id,
            title: role.title || "Untitled Role",
            description: role.description || "No description available",
            location: role.location || "Remote",
            deadline: role.application_deadline || role.hard_deadline || role.soft_deadline,
            eventPoster: role.event_poster || "",
            isUrgent: isDeadlineUrgent(role.application_deadline || role.hard_deadline),
            imageUrl: "", // Will be populated with signed URL
            // Additional data that might be useful
            hourlyPay: role.hourly_pay,
            dailyPay: role.daily_pay,
            projectPay: role.project_pay,
            openings: role.openings,
            genders: role.genders,
            ethnicities: role.ethnicities,
            minAge: role.min_age,
            maxAge: role.max_age,
            skill: role.skill
          }));
          
          setRoles(formattedRoles);
          setFilteredRoles(formattedRoles);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch(err => {
        console.error("Error fetching roles:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  
  // Update image URLs when roleSignedUrls changes
  useEffect(() => {
    if (roleSignedUrls && roles.length > 0) {
      // Add signed URLs to role objects
      console.log("Roles URLs:", roleSignedUrls);
      const updatedRoles = roles.map(role => {
        // If there's a signed URL for this role, use it; otherwise keep existing or use default
        const imageUrl = 
          (roleSignedUrls[role.id] && roleSignedUrls[role.id] !== "") 
            ? roleSignedUrls[role.id] 
            : (role.imageUrl && role.imageUrl !== "") 
              ? role.imageUrl 
              : DEFAULT_JOB_IMAGE;
        
        return {
          ...role,
          imageUrl
        };
      });
      
      setRoles(updatedRoles);
      // Apply search filtering if needed
      if (searchQuery) {
        handleSearch(searchQuery, updatedRoles);
      } else {
        setFilteredRoles(updatedRoles);
      }
    }
  }, [roleSignedUrls]);
  
  // Check if a deadline is urgent (within 5 days)
  const isDeadlineUrgent = (deadlineStr) => {
    if (!deadlineStr) return false;
    
    try {
      const deadline = new Date(deadlineStr);
      const now = new Date();
      const diffTime = deadline.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return diffDays > 0 && diffDays <= 5;
    } catch (error) {
      return false;
    }
  };
  
  // Load more jobs
  const loadMoreJobs = () => {
    setLoadingMore(true);
    
    // This is a placeholder for pagination
    // In a real implementation, you would call your API with the next page number
    // For now, we'll just simulate that we've reached the end of the data
    
    setTimeout(() => {
      setLoadingMore(false);
      
      // Mock: No more roles to load
      setHasMore(false);
    }, 1000);
  };
  
  // Handle search functionality
  const handleSearch = (query, rolesList = roles) => {
    setSearchQuery(query);
    
    if (!query) {
      setFilteredRoles(rolesList);
      return;
    }
    
    const filtered = rolesList.filter(role => 
      (role.title && role.title.toLowerCase().includes(query.toLowerCase())) ||
      (role.description && role.description.toLowerCase().includes(query.toLowerCase())) ||
      (role.location && role.location.toLowerCase().includes(query.toLowerCase())) ||
      (role.skill && role.skill.toLowerCase().includes(query.toLowerCase()))
    );
    
    setFilteredRoles(filtered);
  };

  const MainContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress sx={{ color: '#977342' }} />
        </Box>
      );
    }
    
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
        
        {filteredRoles.length === 0 ? (
          <Box sx={{ my: 5, textAlign: 'center' }}>
            <Typography variant="h6">No jobs found matching your search criteria</Typography>
          </Box>
        ) : (
          <Grid container spacing={5}>
            {filteredRoles.map((role) => (
              <Grid item xs={12} sm={6} md={4} key={role.id}>
                <JobCard 
                  imageUrl={role.imageUrl}
                  isUrgent={role.isUrgent}
                  title={role.title}
                  description={role.description}
                  location={role.location}
                  deadline={formatDeadline(role.deadline)}
                  // You can add more props as needed for JobCard component
                  hourlyPay={role.hourlyPay}
                  dailyPay={role.dailyPay}
                  projectPay={role.projectPay}
                  roleId={role.id}
                />
              </Grid>
            ))}
          </Grid>
        )}
        
        {filteredRoles.length > 0 && hasMore && (
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              marginY: 4 
            }}
          >
            <Button
              variant="contained"
              onClick={loadMoreJobs}
              disabled={loadingMore}
              sx={{
                padding: '12px 32px',
                fontSize: { xs: '14px', md: '16px' },
                color: 'white',
                backgroundColor: '#977342',
                '&:hover': {
                  backgroundColor: '#7D5F35',
                },
                '&.Mui-disabled': {
                  backgroundColor: '#ccc',
                  color: '#666',
                },
                borderRadius: '24px',
                textTransform: 'none',
                width: { xs: '100%', sm: '240px' } 
              }}
            >
              {loadingMore ? 'Loading...' : 'Load More Jobs'}
            </Button>
          </Box>
        )}
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