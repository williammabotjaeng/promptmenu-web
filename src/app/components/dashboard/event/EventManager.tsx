import * as React from "react";
import SectionTabs from './SectionTabs';
import RoleRequirement from './RoleRequirement';
import { Box, Button, Typography } from "@mui/material";
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import OverviewHeaderWithProgressBar from "@/components/dashboard/event/OverviewHeaderWithProgressBar";
import RoleDetailsForm from "@/components/dashboard/event/RoleDetailsForm";
import EventOverview from "./EventOverview";
import { useStore } from "zustand";
import { useRouter, redirect } from "next/navigation";
import useEventStore from "@/state/use-event-store";
import { useEvent } from "@/providers/event-provider";
import { useCookies } from "react-cookie";

const EventManager: React.FC<PostEventStepProps> = ({ activeStep, setActiveStep }) => {

    const { eventDetails, eventMedia } = useStore(useEventStore);
    const [cookies] = useCookies(['event_id', 'username']);
    const router = useRouter();

    const eventID = cookies['event_id'];
    const userName = cookies['username'];

    const { updateEvent } = useEvent();

    const handlePublish = async () => {
        const eventData = {
            ...eventDetails,
            ...eventMedia,
            organizer: userName,
            status: 'live'
        }
        await updateEvent(eventID, eventData);
        redirect('/event-success');
    }

    const handleSaveDraft = async () => {
        const eventData = {
            ...eventDetails,
            ...eventMedia,
            status: 'draft'
        }
        await updateEvent(eventID, eventData);
        redirect('/dashboard');
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                justifyContent: 'center',
                padding: { xs: 2, md: 4 }, 
                pb: { xs: 3, md: 4 },
                width: '100%', 
                maxWidth: '800px', 
                margin: '0 auto', 
            }}
        >
            <OverviewHeaderWithProgressBar progressValue={100} />
            <EventOverview />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    px: { xs: 2, md: 3 },
                    pt: 2,
                    pb: 5,
                    mt: 4,
                    backgroundColor: 'white',
                }}
            >
                <Button
                    variant="contained"
                    sx={{ 
                        backgroundColor: '#977342', 
                        color: 'white', 
                        '&:hover': { backgroundColor: '#fff', border: '1px solid #977342', color: '#977342' } 
                    }}
                    onClick={handleBack}
                >
                 Go Back
                </Button>
                <Button
                    onClick={handleSaveDraft}
                    variant="outlined" 
                    sx={{
                        mr: 2, 
                        ml: { xs: 2, sm: 2, md: 0 },
                        color: '#977342',
                        border: '1px solid #977342',
                        width: { xs: '120px', md: '160px' }, 
                        backgroundColor: 'white',
                        '&:hover': {
                            color: '#CEAB76',
                            border: '1px solid #CEAB76',
                            backgroundColor: 'white'
                        }
                    }}
                    aria-label="Go Back"
                >
                    Save for Later
                </Button>
                <Button
                    onClick={handlePublish}
                    variant="contained"
                    sx={{
                        backgroundColor: '#977342',
                        width: { xs: '120px', md: '160px' }, 
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#CEAB76'
                        }
                    }}
                    aria-label="Next Step"
                >
                    Publish Event
                </Button>
            </Box>
        </Box>
    )
};

export default EventManager;