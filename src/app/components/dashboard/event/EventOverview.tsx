import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import { EventDetails } from "./EventDetails";
import { RoleCard } from "./RoleCard";
import EventDetailsSection from "./EventDetailsSection";
import useEventStore from "@/state/use-event-store";
import { useStore } from "zustand";

const EventOverview: React.FC = () => {

    const { setEventDetails, eventDetails } = useStore(useEventStore);

    const progressSteps = [
        { label: "Create Event", hasIcon: true },
        { label: "Create Role", hasIcon: true },
        { label: "Ready to Publish", hasIcon: false }
    ];

    React.useEffect(() => {
        console.log("Event Details:", eventDetails);
    }, [eventDetails]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                padding: 3,
                borderRadius: '8px',
                overflow: 'hidden',
                width: '80%'
            }}
        >
            <Box sx={{ paddingBottom: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#977342', textAlign: 'left' }}>
                    Event Overview
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white', borderRadius: '8px' }}>
                <EventDetailsSection
                    title="Dubai Fashion Week 2025"
                    description="Luxury fashion event showcasing international designers"
                    startDate="March 15, 2025"
                    endDate="March 20, 2025"
                    assistance="Meals, Transportation, Accommodation"
                />
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#977342' }}>
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
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000' }}>
                        Roles
                    </Typography>
                    <Button sx={{ color: '#977342', '&:hover':{
                        color: 'white'
                    } }}>+ Add Role</Button>
                </Box>
                <RoleCard
                    title="Fashion Model for Dubai Mall Campaign"
                    status="Active"
                    requirements="Female, 20-25 years, Height 170cm+"
                    location="Dubai"
                    postedTime="2 days ago"
                    salary="AED 2,500"
                />
            </Box>
        </Box>
    );
};

export default EventOverview;