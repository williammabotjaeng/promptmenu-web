"use client";

import * as React from 'react';
import { Box, Button, Grid, Typography, CircularProgress, Chip, Alert } from '@mui/material';
import { SearchSection } from '@/components/SearchSection';
import { JobCard } from '@/components/JobCard';
import PrimaryFooter from '@/components/PrimaryFooter';
import SecondaryHeader from '@/components/SecondaryHeader';
import MarketingBanner from '@/components/MarketingBanner';
import { useEvent } from '@/providers/event-provider';
import { useEffect, useState, useMemo } from 'react';
import { useStore } from 'zustand';
import useCurrentRoleStore from '@/state/use-current-role-store';
import { useCookies } from 'react-cookie';

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

// Helper function to check if a date is within a certain number of days
const isDateWithinDays = (dateString, days) => {
  if (!dateString) return false;
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 && diffDays <= days;
  } catch (error) {
    return false;
  }
};

// Default placeholder image to use when no poster is available
const DEFAULT_JOB_IMAGE = "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/fbf9227c806ec79d0dbbdfafe208eba075157780299caaa1a8b6d38ae92d7bb2?apiKey=7fae980a988640eea8add1e49a5d542e&";

const DEMO_JOB_IMAGES = [
  "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=500",
  "https://images.pexels.com/photos/8101622/pexels-photo-8101622.jpeg?auto=compress&cs=tinysrgb&w=500",
  "https://images.pexels.com/photos/6456303/pexels-photo-6456303.jpeg?auto=compress&cs=tinysrgb&w=500",
  "https://images.pexels.com/photos/6299068/pexels-photo-6299068.jpeg?auto=compress&cs=tinysrgb&w=500",
  "https://images.pexels.com/photos/7163731/pexels-photo-7163731.jpeg?auto=compress&cs=tinysrgb&w=500",
  "https://images.pexels.com/photos/8285483/pexels-photo-8285483.jpeg?auto=compress&cs=tinysrgb&w=500"
];

// Create demo job listings
const createDemoJobs = () => {
  return [
    {
      id: "demo-1",
      title: "Fashion Model for Spring Collection",
      description: "We are looking for models to showcase our new spring collection. Experience with runway and photoshoots required.",
      location: "New York",
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
      imageUrl: DEMO_JOB_IMAGES[0],
      isUrgent: true,
      hourlyPay: "$150-200",
      skill: "Fashion Modeling",
      openings: 4,
      genders: ["Female", "Male", "Non-binary"],
      minAge: 18,
      maxAge: 35
    },
    {
      id: "demo-2",
      title: "Commercial Actors for Tech Brand",
      description: "Tech company seeking diverse actors for a promotional commercial. Must be comfortable with technical jargon.",
      location: "San Francisco",
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
      imageUrl: DEMO_JOB_IMAGES[1],
      isUrgent: false,
      dailyPay: "$500",
      skill: "Acting",
      openings: 6,
      genders: ["All"],
      minAge: 25,
      maxAge: 45
    },
    {
      id: "demo-3",
      title: "Fitness Models for Sports Brand",
      description: "Athletic models needed for a sports apparel photoshoot. Must be fit and comfortable in activewear.",
      location: "Los Angeles",
      deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days from now
      imageUrl: DEMO_JOB_IMAGES[2],
      isUrgent: false,
      projectPay: "$1,500",
      skill: "Fitness Modeling",
      openings: 8,
      genders: ["Female", "Male"],
      minAge: 20,
      maxAge: 40
    },
    {
      id: "demo-4",
      title: "Event Hosts for Corporate Gala",
      description: "Seeking professional hosts for an upcoming corporate event. Previous experience with high-profile events preferred.",
      location: "London",
      deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
      imageUrl: DEMO_JOB_IMAGES[3],
      isUrgent: true,
      hourlyPay: "£45",
      skill: "Event Hosting",
      openings: 2,
      genders: ["All"],
      minAge: 22,
      maxAge: 50
    },
    {
      id: "demo-5",
      title: "Voice Actors for Animated Series",
      description: "Animated series looking for voice actors with range. Must be able to portray multiple character types.",
      location: "Remote",
      deadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(), // 18 days from now
      imageUrl: DEMO_JOB_IMAGES[4],
      isUrgent: false,
      projectPay: "$2,000-3,500",
      skill: "Voice Acting",
      openings: 5,
      genders: ["All"],
      minAge: 18,
      maxAge: 65
    },
    {
      id: "demo-6",
      title: "Child Models for Back-to-School Campaign",
      description: "Family-friendly clothing brand looking for child models for an upcoming back-to-school campaign.",
      location: "Miami",
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      imageUrl: DEMO_JOB_IMAGES[5],
      isUrgent: true,
      dailyPay: "$350",
      skill: "Child Modeling",
      openings: 10,
      genders: ["All"],
      minAge: 6,
      maxAge: 14
    }
  ];
};

const Jobs = () => {
  // State for jobs data
  const [roles, setRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies] = useCookies(['ssh_session_id', 'sessionID']);

  const { clearCurrentRole } = useStore(useCurrentRoleStore);
  
  // Filter states
  const [activeFilters, setActiveFilters] = useState({
    skills: [],
    location: [],
    deadline: []
  });
  
  // Active filter count
  const totalActiveFilters = useMemo(() => {
    return Object.values(activeFilters).reduce((count, filters) => count + filters.length, 0);
  }, [activeFilters]);
  
  // Get roles and roleSignedUrls from the event provider
  const { getRoles, roleSignedUrls } = useEvent();
  
  // Available skills and locations extracted from roles for filter options
  const [availableSkills, setAvailableSkills] = useState([]);
  const [availableLocations, setAvailableLocations] = useState([]);
  
  // Check if user is logged in
  useEffect(() => {
    const sessionId = cookies.ssh_session_id || cookies.sessionID;
    setIsLoggedIn(!!sessionId);
  }, [cookies]);

  // Initial data load - either fetch from API or use demo data
  useEffect(() => {
    setLoading(true);
    setError(null);
    clearCurrentRole();
    
    if (isLoggedIn) {
      // User is logged in, fetch real data from API
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
              isUrgent: role?.is_urgent,
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
              skill: role.skill,
              event_id: role.event
            }));
            
            // Extract unique skills and locations for filters
            const skills = new Set();
            const locations = new Set();
            
            formattedRoles.forEach(role => {
              if (role.skill) skills.add(role.skill);
              if (role.location) locations.add(role.location);
            });
            
            setAvailableSkills(Array.from(skills));
            setAvailableLocations(Array.from(locations));
            setRoles(formattedRoles);
            setFilteredRoles(formattedRoles);
          } else {
            console.error("Unexpected data format:", data);
            setError("Unexpected data format received from server");
            // Fallback to demo jobs if API call fails
            useDemoJobs();
          }
        })
        .catch(err => {
          console.error("Error fetching roles:", err);
          setError("Failed to load jobs. Showing demo jobs instead.");
          // Use demo jobs when API call fails
          useDemoJobs();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // User is not logged in, use demo jobs
      useDemoJobs();
      setLoading(false);
    }
  }, [isLoggedIn]);
  
  // Helper function to set up demo jobs
  const useDemoJobs = () => {
    console.log("Using demo jobs for display");
    const demoJobs = createDemoJobs();
    
    // Extract skills and locations from demo jobs
    const skills = new Set();
    const locations = new Set();
    
    demoJobs.forEach(job => {
      if (job.skill) skills.add(job.skill);
      if (job.location) locations.add(job.location);
    });
    
    setAvailableSkills(Array.from(skills));
    setAvailableLocations(Array.from(locations));
    setRoles(demoJobs);
    setFilteredRoles(demoJobs);
  };
  
  // Update image URLs when roleSignedUrls changes (only for logged in users)
  useEffect(() => {
    if (isLoggedIn && roleSignedUrls && roles.length > 0) {
      // Add signed URLs to role objects
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
      // Apply filters to updated roles
      applyFilters(updatedRoles);
    }
  }, [roleSignedUrls, isLoggedIn]);
  
  // Apply filters whenever activeFilters changes
  useEffect(() => {
    applyFilters(roles);
  }, [activeFilters, searchQuery]);
  
  // Apply all active filters to the roles
  const applyFilters = (rolesList) => {
    if (!rolesList || rolesList.length === 0) return;
    
    let result = [...rolesList];
    
    // Apply search query
    if (searchQuery) {
      result = result.filter(role => 
        (role.title && role.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (role.description && role.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (role.location && role.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (role.skill && role.skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply skill filters
    if (activeFilters.skills.length > 0) {
      result = result.filter(role => 
        role.skill && activeFilters.skills.includes(role.skill)
      );
    }
    
    // Apply location filters
    if (activeFilters.location.length > 0) {
      result = result.filter(role => 
        role.location && activeFilters.location.includes(role.location)
      );
    }
    
    // Apply deadline filters
    if (activeFilters.deadline.length > 0) {
      result = result.filter(role => {
        if (!role.deadline) return false;
        
        return activeFilters.deadline.some(deadline => {
          if (deadline === 'Urgent') {
            return role.isUrgent;
          } else if (deadline === 'Next 7 days') {
            return isDateWithinDays(role.deadline, 7);
          } else if (deadline === 'Next 30 days') {
            return isDateWithinDays(role.deadline, 30);
          }
          return false;
        });
      });
    }
    
    setFilteredRoles(result);
    
    // Analytics tracking for filter usage by non-logged in users
    if (!isLoggedIn && (searchQuery || totalActiveFilters > 0)) {
      console.log("Demo user applied filters:", { 
        search: searchQuery, 
        filters: activeFilters 
      });
    }
  };
  
  // Check if a deadline is urgent (within 5 days)
  const isDeadlineUrgent = (deadlineStr) => {
    return isDateWithinDays(deadlineStr, 5);
  };
  
  // Load more jobs
  const loadMoreJobs = () => {
    if (!isLoggedIn) {
      // For demo users, just show a message that they need to register
      setHasMore(false);
      return;
    }
    
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
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  
  // Handle filter changes
  const handleFilterChange = (filterType, selectedValues) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: selectedValues
    }));
  };
  
  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({
      skills: [],
      location: [],
      deadline: []
    });
    setSearchQuery("");
  };

  const MainContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress sx={{ color: '#977342' }} />
        </Box>
      );
    }
    
    if (error && isLoggedIn) {
      return (
        <Box sx={{ padding: 3 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Button 
            variant="outlined" 
            onClick={() => window.location.reload()}
            sx={{ 
              borderColor: '#977342', 
              color: '#977342',
              '&:hover': { borderColor: '#7D5F35', backgroundColor: 'rgba(151, 115, 66, 0.04)' }
            }}
          >
            Try Again
          </Button>
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
        <SearchSection 
          onSearch={handleSearch} 
          onFilterChange={handleFilterChange}
          skillOptions={availableSkills}
          locationOptions={availableLocations}
        />
        
        {/* Active filters display */}
        {totalActiveFilters > 0 && (
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1, 
            alignItems: 'center',
            width: '100%',
            mb: 2,
            px: 2
          }}>
            <Typography variant="body2" sx={{ color: '#666', mr: 1 }}>
              Active filters:
            </Typography>
            
            {Object.entries(activeFilters).map(([filterType, values]) => 
              values.map(value => (
                <Chip
                  key={`${filterType}-${value}`}
                  label={value}
                  onDelete={() => {
                    setActiveFilters(prev => ({
                      ...prev,
                      [filterType]: prev[filterType].filter(v => v !== value)
                    }));
                  }}
                  size="small"
                  sx={{ 
                    backgroundColor: 'rgba(151, 115, 66, 0.1)',
                    color: '#977342',
                    '& .MuiChip-deleteIcon': {
                      color: '#977342'
                    }
                  }}
                />
              ))
            )}
            
            <Button 
              variant="text" 
              size="small" 
              onClick={clearAllFilters}
              sx={{ 
                ml: 1, 
                color: '#977342', 
                fontSize: '0.75rem',
                textTransform: 'none'
              }}
            >
              Clear all
            </Button>
          </Box>
        )}
        
        {filteredRoles.length === 0 ? (
          <Box sx={{ my: 5, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#666', mb: 2 }}>
              No jobs found matching your search criteria
            </Typography>
            {(searchQuery || totalActiveFilters > 0) && (
              <Button
                variant="outlined"
                onClick={clearAllFilters}
                sx={{
                  borderColor: '#977342',
                  color: '#977342',
                  '&:hover': {
                    borderColor: '#7D5F35',
                    backgroundColor: 'rgba(151, 115, 66, 0.04)'
                  }
                }}
              >
                Clear Filters
              </Button>
            )}
          </Box>
        ) : (
          <>
            <Box sx={{ width: '100%', mb: 2, px: 2 }}>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Showing {filteredRoles.length} {filteredRoles.length === 1 ? 'job' : 'jobs'}
                {(searchQuery || totalActiveFilters > 0) ? ' matching your criteria' : ''}
                {!isLoggedIn && ' (sample listings)'}
              </Typography>
            </Box>
            
            <Grid container spacing={3}>
              {filteredRoles.map((role) => (
                <Grid item xs={12} sm={6} md={4} key={role.id}>
                  <JobCard 
                    imageUrl={role.imageUrl}
                    isUrgent={role.isUrgent}
                    title={role.title}
                    description={role.description}
                    location={role.location}
                    deadline={formatDeadline(role.deadline)}
                    hourlyPay={role.hourlyPay}
                    dailyPay={role.dailyPay}
                    projectPay={role.projectPay}
                    roleId={role.id}
                    role={role}
                    isDemo={!isLoggedIn}
                  />
                </Grid>
              ))}
            </Grid>
          </>
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
              {!isLoggedIn ? 'Sign Up to See More' : (loadingMore ? 'Loading...' : 'Load More Jobs')}
            </Button>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', overflow: 'hidden', minHeight: '100vh' }}>
      <SecondaryHeader />
      
      {!isLoggedIn && (
        <MarketingBanner 
          title="Explore Job Opportunities"
          subtitle="These are sample job listings. Sign up today to access all available roles and apply directly through our platform."
          primaryButtonText="Sign Up"
          secondaryButtonText="Sign In"
          primaryButtonUrl="/register/2"
          secondaryButtonUrl="/login"
        />
      )}
      
      <MainContent />
      <PrimaryFooter />
    </Box>
  );
};

export default Jobs;