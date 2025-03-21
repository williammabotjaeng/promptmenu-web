"use client";

import * as React from 'react';
import { WhiteHeader } from '@/components/WhiteHeader';
import SidebarProfileCard from '@/components/SidebarProfileCard';
import FilterForm from '@/components/FilterForm';
import Pagination from '@/components/Pagination';
import GreyFooter from '@/components/GreyFooter';
import { Box } from '@mui/material';
import { useTalentProfile } from '@/providers/talent-profile-provider';
import { useEffect } from 'react';

const Talent: React.FC = () => {
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

  const { fetchTalentProfiles } = useTalentProfile();

  useEffect(() => {
    fetchTalentProfiles()
    .then((data: any) => {
      console.log("Talent Data:", data);
    })
    .catch(err => console.log("Talent Data Error:", err));
  }, []);

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
        <Box sx={{ paddingX: 1, paddingTop: 0.5, paddingBottom: 1, marginTop: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {profiles.map((profile, index) => (
              <SidebarProfileCard key={index} profile={profile} />
            ))}
          </Box>
        </Box>
        <Pagination />
      </Box>
      <br />
      <GreyFooter />
    </Box>
  );
};

export default Talent;