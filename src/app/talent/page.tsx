"use client";

import * as React from 'react';
import { WhiteHeader } from '@/components/WhiteHeader';
import SidebarProfileCard from '@/components/SidebarProfileCard';
import FilterForm from '@/components/FilterForm';
import Pagination from '@/components/Pagination';
import GreyFooter from '@/components/GreyFooter';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useTalentProfile } from '@/providers/talent-profile-provider';
import { useEffect, useState } from 'react';

// Default placeholder image for profiles without headshots
const DEFAULT_PROFILE_IMAGE = "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/cda574f70ccd49a7abc97a1663f275bd69d56bce15ee1463e97ba119b97f026d?apiKey=7fae980a988640eea8add1e49a5d542e&";

const Talent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<any[]>([]);
  
  const { fetchTalentProfiles, profileSignedUrls } = useTalentProfile();

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string): number => {
    if (!dateOfBirth) return 0;
    
    try {
      const dob = new Date(dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      
      return age;
    } catch (error) {
      console.error("Error calculating age:", error);
      return 0;
    }
  };

  // Fetch talent profiles and map them to the format needed by SidebarProfileCard
  useEffect(() => {
    setLoading(true);
    
    fetchTalentProfiles()
      .then((data) => {
        if (Array.isArray(data)) {
          // Transform the backend data to match the SidebarProfileCard props
          const formattedProfiles = data.map(profile => {
            // Process skills to ensure they're all strings
            const processedSkills = Array.isArray(profile.skills) 
              ? profile.skills.map(skill => 
                  typeof skill === 'object' && skill !== null 
                    ? (skill.name || String(skill)) 
                    : String(skill)
                )
              : [];
              
            return {
              id: profile.id,
              name: `${profile.firstname || ''} ${profile.lastname || ''}`.trim() || 'Unknown',
              location: profile.location || 'Not specified',
              age: calculateAge(profile.date_of_birth),
              skills: processedSkills,
              imageUrl: "", // Will be populated with signed URL
              headshot: profile.headshot || "",
              isFeatured: profile.is_featured || false,
              // Additional properties that might be useful
              gender: profile.gender,
              ethnicity: profile.ethnicity,
              height: profile.height,
              weight: profile.weight
            };
          });
          
          setProfiles(formattedProfiles);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch(err => {
        console.error("Error fetching talent profiles:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Update image URLs when profileSignedUrls changes
  useEffect(() => {
    if (profileSignedUrls && profiles.length > 0) {
      // Add signed URLs to profile objects
      const updatedProfiles = profiles.map(profile => {
        // If there's a signed URL for this profile, use it; otherwise use default
        const imageUrl = 
          (profileSignedUrls[profile.id] && profileSignedUrls[profile.id] !== "") 
            ? profileSignedUrls[profile.id] 
            : DEFAULT_PROFILE_IMAGE;
        
        return {
          ...profile,
          imageUrl
        };
      });
      
      setProfiles(updatedProfiles);
    }
  }, [profileSignedUrls]);

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
      <WhiteHeader />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'center',
          paddingX: 1,
          paddingY: 1,
          marginTop: 1,
          width: '100%',
          maxWidth: 'screen.xl',
        }}
      >
        <FilterForm />
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#977342' }} />
          </Box>
        ) : profiles.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No talent profiles found
            </Typography>
          </Box>
        ) : (
          <Box sx={{ paddingX: 1, paddingTop: 0.5, paddingBottom: 1, marginTop: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {profiles.map((profile) => (
                <SidebarProfileCard key={profile.id} profile={profile} />
              ))}
            </Box>
          </Box>
        )}
        
        {!loading && profiles.length > 0 && <Pagination />}
      </Box>
      <br />
      <GreyFooter />
    </Box>
  );
};

export default Talent;