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
                paddingLeft: 32,
                paddingRight: 1,
                pb: { xs: 3, md: 4 },
            }}
        >

            <DeadlineHeaderWithProgressBar progressValue={85} />
            <Typography sx={{ color: '#977342', fontSize: '24px', fontWeight: 'bold' }}>Application Deadline</Typography>
            <br />
            <DeadlineForm onSubmit={null} />
            {/* Submit Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2, mr: 38 }}>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#977342', color: 'white', '&:hover': { backgroundColor: '#fff', border: '1px solid #977342', color: '#977342' } }}
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