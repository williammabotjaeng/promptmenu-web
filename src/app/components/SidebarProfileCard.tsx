import React from "react";
import { Box, Button, Typography } from "@mui/material";

type Profile = {
  name: string;
  location: string;
  age: number;
  skills: string[];
  imageUrl: string;
  isFeatured?: boolean;
};

type SidebarProfileCardProps = {
  profile: Profile;
};

function SidebarProfileCard({ profile }: SidebarProfileCardProps) {
  return (
    <Box sx={{ width: { xs: '100%', md: '25%' }, margin: '0 auto' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'relative', textAlign: 'center' }}>
          <img
            loading="lazy"
            src={profile.imageUrl}
            alt={`${profile.name}'s profile`}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
             //  paddingBottom: profile.isFeatured ? '60%' : '0', // Adjust padding for featured
            }}
          />
          {profile.isFeatured && (
            <Box sx={{ position: 'absolute', top: 10, right: 10, backgroundColor: '#977342', borderRadius: 1, padding: '4px 8px' }}>
              <Typography variant="body2" color="white">Featured</Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" color="black">{profile.name}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/00d8c0366647edaf309fbc6974b0415521723df62b004f5d787448d6853367f2?apiKey=7fae980a988640eea8add1e49a5d542e&"
              alt=""
              style={{ width: '16px', height: '16px', marginRight: 1 }}
            />
            <Typography variant="body2" color="gray">{profile.location}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/35205be8a661dbef8a095fbb155b2227a0c74a1ebee5b9540a40b165942278c1?apiKey=7fae980a988640eea8add1e49a5d542e&"
              alt=""
              style={{ width: '16px', height: '16px', marginRight: 1 }}
            />
            <Typography variant="body2" color="gray">Age: {profile.age}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 2 }}>
            {profile.skills.map((skill, index) => (
              <Box key={index} sx={{ padding: '4px 8px', backgroundColor: '#f0f0f0', borderRadius: 1 }}>
                {skill}
              </Box>
            ))}
          </Box>
          <Button
            variant="contained"
            sx={{
              marginTop: 2,
              backgroundColor: '#977342',
              color: 'white',
              width: '100%',
              borderRadius: 1,
            }}
          >
            View Profile
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SidebarProfileCard;