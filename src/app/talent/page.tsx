"use client";

import * as React from 'react';
import Header from "@/components/dashboard/Header";
import SidebarProfileCard from '@/components/SidebarProfileCard';
import FilterForm, { FilterValues } from '@/components/FilterForm';
import Pagination from '@/components/Pagination';
import GreyFooter from '@/components/GreyFooter';
import MarketingBanner from '@/components/MarketingBanner';
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Alert, 
  Button,
  Chip
} from '@mui/material';
import { useTalentProfile } from '@/providers/talent-profile-provider';
import { useEffect, useState, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import moment from 'moment';

// Default placeholder image for profiles without headshots
const DEFAULT_PROFILE_IMAGE = "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/cda574f70ccd49a7abc97a1663f275bd69d56bce15ee1463e97ba119b97f026d?apiKey=7fae980a988640eea8add1e49a5d542e&";

// Demo profile images
const DEMO_PROFILE_IMAGES = [
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500&auto=format&fit=crop"
];

// Create demo profiles
const createDemoProfiles = () => {
  return [
    {
      id: "demo-1",
      name: "Jordan Taylor",
      location: "US",
      nationality: "US",
      date_of_birth: "1995-05-15",
      age: 29,
      gender: "Male",
      ethnicity: "Caucasian",
      height: "183",
      weight: "75",
      skills: ["Acting", "Modeling", "Voice Over"],
      imageUrl: DEMO_PROFILE_IMAGES[0],
      isFeatured: true,
      experience: "Intermediate"
    },
    {
      id: "demo-2",
      name: "Emma Rodriguez",
      location: "ES",
      nationality: "ES",
      date_of_birth: "1998-11-23",
      age: 26,
      gender: "Female",
      ethnicity: "Hispanic",
      height: "168",
      weight: "58",
      skills: ["Fashion Modeling", "Commercial", "Dancing"],
      imageUrl: DEMO_PROFILE_IMAGES[1],
      isFeatured: false,
      experience: "Advanced"
    },
    {
      id: "demo-3",
      name: "Michael Chen",
      location: "SG",
      nationality: "SG",
      date_of_birth: "1992-03-10",
      age: 33,
      gender: "Male",
      ethnicity: "Asian",
      height: "175",
      weight: "68",
      skills: ["Commercial Modeling", "Photography", "Influencer"],
      imageUrl: DEMO_PROFILE_IMAGES[2],
      isFeatured: false,
      experience: "Expert"
    },
    {
      id: "demo-4",
      name: "Sophia Williams",
      location: "ZA",
      nationality: "ZA",
      date_of_birth: "1996-09-18",
      age: 28,
      gender: "Female",
      ethnicity: "Black",
      height: "175",
      weight: "62",
      skills: ["Runway", "Print Modeling", "Event Hosting"],
      imageUrl: DEMO_PROFILE_IMAGES[3],
      isFeatured: true,
      experience: "Advanced"
    },
    {
      id: "demo-5",
      name: "Amir Hassan",
      location: "AE",
      nationality: "AE",
      date_of_birth: "1997-06-30",
      age: 27,
      gender: "Male",
      ethnicity: "Middle Eastern",
      height: "180",
      weight: "73",
      skills: ["Commercial", "Print Modeling", "Sports Modeling"],
      imageUrl: DEMO_PROFILE_IMAGES[4],
      isFeatured: false,
      experience: "Intermediate"
    },
    {
      id: "demo-6",
      name: "Daniel Parker",
      location: "AU",
      nationality: "AU",
      date_of_birth: "1994-01-12",
      age: 31,
      gender: "Male",
      ethnicity: "Caucasian",
      height: "185",
      weight: "82",
      skills: ["Fitness Modeling", "Acting", "Commercial"],
      imageUrl: DEMO_PROFILE_IMAGES[5],
      isFeatured: true,
      experience: "Advanced"
    }
  ];
};

const Talent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allProfiles, setAllProfiles] = useState<any[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<any[]>([]);
  const [activeFilters, setActiveFilters] = useState<FilterValues>({
    skill: '',
    location: '',
    ethnicity: '',
    gender: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Store filter options derived from the data
  const [filterOptions, setFilterOptions] = useState({
    skills: [] as string[],
    locations: [] as string[],
    ethnicities: [] as string[],
    genders: [] as string[]
  });
  
  const { fetchTalentProfiles, profileSignedUrls } = useTalentProfile();
  const [cookies] = useCookies(['ssh_session_id', 'sessionID']);

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string): number => {
    if (!dateOfBirth) return 0;
    
    try {
      return moment().diff(moment(dateOfBirth), 'years');
    } catch (error) {
      console.error("Error calculating age:", error);
      return 0;
    }
  };

  // Process profiles coming from the API
  const processProfiles = (data: any[]): any[] => {
    // Extract unique values for filter options
    const skillsSet = new Set<string>();
    const locationsSet = new Set<string>();
    const ethnicitiesSet = new Set<string>();
    const gendersSet = new Set<string>();
    
    // Transform the backend data to match the SidebarProfileCard props
    const formattedProfiles = data.map(profile => {
      // Process skills to ensure they're all strings
      const processedSkills = Array.isArray(profile.skills) 
        ? profile.skills.map((skill: any) => 
            typeof skill === 'object' && skill !== null 
              ? (skill.name || String(skill)) 
              : String(skill)
          )
        : [];
      
      // Add values to the filter option sets
      processedSkills.forEach(skill => skillsSet.add(skill));
      if (profile.location) locationsSet.add(profile.location);
      if (profile.ethnicity) ethnicitiesSet.add(profile.ethnicity);
      if (profile.gender) gendersSet.add(profile.gender);
      
      // Store the user ID for easier access
      const userId = profile.user?.id || profile.id;
      
      // Calculate age from date_of_birth
      const age = calculateAge(profile.date_of_birth);
        
      return {
        id: userId,  // Use the user ID as the profile ID
        name: `${profile.firstname || ''} ${profile.lastname || ''}`.trim() || 'Unknown',
        location: profile.nationality || profile.location || 'Not specified',
        nationality: profile.nationality || '',
        age: age,
        date_of_birth: profile.date_of_birth,
        skills: processedSkills,
        imageUrl: "",  // This will be updated when signed URLs are available
        headshot: profile.headshot || "",
        isFeatured: profile.is_featured || false,
        // Additional properties that might be useful
        gender: profile.gender,
        ethnicity: profile.ethnicity,
        height: profile.height,
        weight: profile.weight,
        experience: profile.experience_level || "Beginner",
        // Keep original data for debugging
        _original: profile
      };
    });
    
    // Update filter options
    setFilterOptions({
      skills: Array.from(skillsSet),
      locations: Array.from(locationsSet),
      ethnicities: Array.from(ethnicitiesSet),
      genders: Array.from(gendersSet)
    });
    
    return formattedProfiles;
  };

  // Check if user is logged in
  useEffect(() => {
    const sessionId = cookies.ssh_session_id || cookies.sessionID;
    setIsLoggedIn(!!sessionId);
  }, [cookies]);

  // Fetch talent profiles or use demo profiles based on login status
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    if (isLoggedIn) {
      fetchTalentProfiles()
        .then((data) => {
          if (Array.isArray(data)) {
            console.log("Fetched talent profiles:", data);
            const processedData = processProfiles(data);
            console.log("Processed profiles:", processedData);
            setAllProfiles(processedData);
            setFilteredProfiles(processedData);
          } else {
            console.error("Unexpected data format:", data);
            setError("Received unexpected data format from server");
            // Fallback to demo profiles if API call fails
            const demoProfiles = createDemoProfiles();
            setAllProfiles(demoProfiles);
            setFilteredProfiles(demoProfiles);
          }
        })
        .catch(err => {
          console.error("Error fetching talent profiles:", err);
          setError("Failed to load talent profiles. Showing demo profiles instead.");
          // Use demo profiles when API call fails
          const demoProfiles = createDemoProfiles();
          setAllProfiles(demoProfiles);
          setFilteredProfiles(demoProfiles);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // Use demo profiles for logged out users
      console.log("User not logged in, using demo profiles");
      const demoProfiles = createDemoProfiles();
      setAllProfiles(demoProfiles);
      setFilteredProfiles(demoProfiles);
      setLoading(false);
      
      // Update filter options from demo profiles
      const skillsSet = new Set<string>();
      const locationsSet = new Set<string>();
      const ethnicitiesSet = new Set<string>();
      const gendersSet = new Set<string>();
      
      demoProfiles.forEach(profile => {
        profile.skills.forEach(skill => skillsSet.add(skill));
        if (profile.location) locationsSet.add(profile.location);
        if (profile.ethnicity) ethnicitiesSet.add(profile.ethnicity);
        if (profile.gender) gendersSet.add(profile.gender);
      });
      
      setFilterOptions({
        skills: Array.from(skillsSet),
        locations: Array.from(locationsSet),
        ethnicities: Array.from(ethnicitiesSet),
        genders: Array.from(gendersSet)
      });
    }
  }, [isLoggedIn]);

  // Update image URLs when profileSignedUrls changes (only for logged in users)
  useEffect(() => {
    if (isLoggedIn && profileSignedUrls && Object.keys(profileSignedUrls).length > 0) {
      console.log("Received profile signed URLs:", profileSignedUrls);
      
      // Add signed URLs to profile objects
      const updatedProfiles = allProfiles.map(profile => {
        // First try to get URL by user ID
        let imageUrl = DEFAULT_PROFILE_IMAGE;
        const profileId = profile.id;
        
        if (profileId && profileSignedUrls[profileId]) {
          console.log(`Found signed URL for profile ${profileId}`);
          imageUrl = profileSignedUrls[profileId];
        } 
        // If no URL found by profile ID, keep existing or use default
        else if (profile.imageUrl && profile.imageUrl !== "") {
          imageUrl = profile.imageUrl;
        }
        
        return {
          ...profile,
          imageUrl
        };
      });
      
      console.log("Updated profiles with signed URLs:", updatedProfiles);
      setAllProfiles(updatedProfiles);
      
      // Apply active filters to the updated profiles
      applyFilters(updatedProfiles, activeFilters);
    }
  }, [profileSignedUrls, isLoggedIn]);

  // Apply filters when they change
  const applyFilters = (profiles: any[], filters: FilterValues) => {
    let result = [...profiles];
    
    // Filter by skill
    if (filters.skill) {
      result = result.filter(profile => 
        profile.skills && profile.skills.includes(filters.skill)
      );
    }
    
    // Filter by location
    if (filters.location) {
      result = result.filter(profile => 
        profile.location === filters.location
      );
    }
    
    // Filter by ethnicity
    if (filters.ethnicity) {
      result = result.filter(profile => 
        profile.ethnicity === filters.ethnicity
      );
    }
    
    // Filter by gender
    if (filters.gender) {
      result = result.filter(profile => 
        profile.gender === filters.gender
      );
    }
    
    setFilteredProfiles(result);
  };

  // Handle filter changes
  const handleFilterChange = (filters: FilterValues) => {
    setActiveFilters(filters);
    applyFilters(allProfiles, filters);
    
    // Analytics tracking for filter usage (if implemented)
    if (!isLoggedIn) {
      // Track filter usage for non-logged in users to understand what they're interested in
      console.log("Demo user applied filters:", filters);
    }
  };

  // Reset filters
  const resetFilters = () => {
    const emptyFilters = {
      skill: '',
      location: '',
      ethnicity: '',
      gender: '',
      experience: ''
    };
    setActiveFilters(emptyFilters);
    setFilteredProfiles(allProfiles);
  };

  // Memoized profile count message
  const profileCountMessage = useMemo(() => {
    const totalCount = allProfiles.length;
    const filteredCount = filteredProfiles.length;
    
    if (totalCount === 0) {
      return "";
    }
    
    if (filteredCount === totalCount) {
      return `Showing all ${totalCount} talent profiles`;
    }
    
    return `Showing ${filteredCount} of ${totalCount} talent profiles`;
  }, [allProfiles.length, filteredProfiles.length]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 2,
        border: '2px solid #D1D5DB',
        overflow: 'hidden',
      }}
    >
      <Header />
      
      {!isLoggedIn && (
        <MarketingBanner 
          title="Discover Amazing Talent"
          subtitle="These are sample profiles. Sign up today to access our full database of professional talent from around the world."
          primaryButtonText="Sign Up"
          secondaryButtonText="Sign In"
          primaryButtonUrl="/register/2"
          secondaryButtonUrl="/login"
        />
      )}
      
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'center',
          padding: { xs: 2, md: 3 },
          width: '100%',
          maxWidth: '1200px',
        }}
      >
        <FilterForm 
          onFilterChange={handleFilterChange}
          skillOptions={filterOptions.skills}
          locationOptions={filterOptions.locations}
          ethnicityOptions={filterOptions.ethnicities}
          genderOptions={filterOptions.genders}
          isLoading={loading}
        />
        
        {/* Profile count display */}
        {!loading && allProfiles.length > 0 && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
            px: 1
          }}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              {profileCountMessage}
            </Typography>
          </Box>
        )}
        
        {error && isLoggedIn ? (
          <Alert 
            severity="error" 
            sx={{ mb: 3 }}
            action={
              <Button 
                color="inherit" 
                size="small" 
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        ) : loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#977342' }} />
          </Box>
        ) : filteredProfiles.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8, 
            backgroundColor: '#f9f9f9',
            borderRadius: 2,
            border: '1px dashed #ddd'
          }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              No talent profiles match your filter criteria
            </Typography>
            
            {Object.values(activeFilters).some(value => value !== '') && (
              <Button 
                variant="outlined" 
                onClick={resetFilters}
                sx={{ 
                  borderColor: '#977342', 
                  color: '#977342',
                  '&:hover': { 
                    borderColor: '#7d5f35',
                    backgroundColor: 'rgba(151, 115, 66, 0.04)'
                  }
                }}
              >
                Clear All Filters
              </Button>
            )}
          </Box>
        ) : (
          <Box sx={{ 
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)'
            }
          }}>
            {filteredProfiles.map((profile) => (
              <SidebarProfileCard key={profile.id} profile={profile} />
            ))}
          </Box>
        )}
        
        {!loading && filteredProfiles.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Pagination />
          </Box>
        )}
      </Box>
      <Box sx={{ mt: 'auto' }}>
        <GreyFooter />
      </Box>
    </Box>
  );
};

export default Talent;