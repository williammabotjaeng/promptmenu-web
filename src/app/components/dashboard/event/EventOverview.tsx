import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import { EventDetails } from "./EventDetails";
import { RoleCard } from "./RoleCard";
import EventDetailsSection from "./EventDetailsSection";

const EventOverview: React.FC = () => {
  const progressSteps = [
    { label: "Create Event", hasIcon: true },
    { label: "Create Role", hasIcon: true },
    { label: "Ready to Publish", hasIcon: false }
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 3,
        borderRadius: '8px',
        border: '2px solid #D1D5DB',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ paddingBottom: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4B5563', textAlign: 'center' }}>
          Event Overview
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          <Box sx={{ backgroundColor: '#E5E7EB', borderRadius: '50%', height: '8px', width: '100%' }}>
            <Box sx={{ height: '8px', width: '100%', backgroundColor: '#4B5563' }} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, backgroundColor: 'white', borderRadius: '8px', boxShadow: 1 }}>
        <EventDetailsSection
          title="Dubai Fashion Week 2025"
          description="Luxury fashion event showcasing international designers"
          startDate="March 15, 2025"
          endDate="March 20, 2025"
          assistance="Meals, Transportation, Accommodation"
        />
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4B5563' }}>
            Uploaded Media
          </Typography>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/4a807c2845d0f1dbd5c1f135ef03eb195cf92cd51d9bc1bc861ba3d9d2519db0?apiKey=7fae980a988640eea8add1e49a5d542e&"
            alt="Event media"
            style={{ width: '100%', borderRadius: '8px', marginTop: '16px' }}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000' }}>
          Roles
        </Typography>
        <RoleCard
          title="Fashion Model for Dubai Mall Campaign"
          status="Active"
          requirements="Female, 20-25 years, Height 170cm+"
          location="Dubai"
          postedTime="2 days ago"
          salary="AED 2,500"
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
        <Button
          variant="outlined"
          sx={{
            mr: 2,
            color: '#977342',
            border: '1px solid #977342',
            width: '120px',
            '&:hover': {
              color: '#CEAB76',
              border: '1px solid #CEAB76',
            }
          }}
          aria-label="Save for Later"
        >
          Save for Later
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#977342',
            width: '120px',
            '&:hover': {
              backgroundColor: '#CEAB76'
            }
          }}
          aria-label="Publish Event"
        >
          Publish Event
        </Button>
      </Box>
    </Box>
  );
};

export default EventOverview;