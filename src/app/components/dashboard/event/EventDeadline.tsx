import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import { DeadlineForm } from "@/components/dashboard/event/DeadlineForm";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeadlineHeaderWithProgressBar from "./DeadlineHeaderWithProgressBar";

const EventDeadline: React.FC<PostEventStepProps> = ({ activeStep, setActiveStep }) => {

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
                padding: { xs: 2, md: 4 }, // Responsive padding
                pb: { xs: 3, md: 4 },
                width: '100%', // Full width
                maxWidth: '800px', // Max width for larger screens
                margin: '0 auto', // Center the box
            }}
        >
            <DeadlineHeaderWithProgressBar progressValue={85} indexValue={2 * 2} />
            <Typography sx={{ color: '#977342', fontSize: { xs: '20px', md: '24px' }, fontWeight: 'bold', textAlign: 'center' }}>
                Application Deadline
            </Typography>
            <br />
            <DeadlineForm onSubmit={null} />
            {/* Submit Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2, mt: 2, mr: { md: 26 } }}>
                <Button
                    variant="contained"
                    sx={{ 
                        backgroundColor: '#977342', 
                        color: 'white', 
                        '&:hover': { backgroundColor: '#fff', border: '1px solid #977342', color: '#977342' } 
                    }}
                    onClick={handleContinue}
                >
                    Next Step
                    <ArrowForwardIcon sx={{ marginLeft: '8px' }} />
                </Button>
            </Box>
        </Box>
    )
};

export default EventDeadline;