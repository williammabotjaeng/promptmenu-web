import * as React from "react";
import SectionTabs from './SectionTabs';
import RoleRequirement from './RoleRequirement';
import { Box, Button, Typography } from "@mui/material";
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import RoleHeaderWithProgressBar from "@/components/dashboard/event/RoleHeaderWithProgressBar";
import RoleDetailsForm from "@/components/dashboard/event/RoleDetailsForm";
import EventOverview from "./EventOverview";

const EventManager: React.FC<PostEventStepProps> = ({ activeStep, setActiveStep }) => {

    const handleContinue = () => {
        setActiveStep(activeStep + 1);
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
                paddingLeft: 12,
                paddingRight: 1,
                pb: { xs: 3, md: 4 },
            }}
        >
            <RoleHeaderWithProgressBar progressValue={28} />
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
                    mr: 32,
                    backgroundColor: 'white',
                }}
            >
                <Button
                    onClick={handleBack}
                    variant="outlined" 
                    sx={{
                        mr: 2, 
                        color: '#977342',
                        border: '1px solid #977342',
                        width: '160px', 
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
                    onClick={handleContinue}
                    variant="contained"
                    sx={{
                        backgroundColor: '#977342',
                        width: '160px', 
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