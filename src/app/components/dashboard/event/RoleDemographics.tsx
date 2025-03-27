import * as React from "react";
import RoleRequirement from './RoleRequirement';
import { Box, Button } from "@mui/material";
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import RoleHeaderWithProgressBar from "@/components/dashboard/event/RoleHeaderWithProgressBar";
import DemographicsForm from "@/components/dashboard/event/DemographicsForm";

const RoleDemographics: React.FC<PostEventStepProps> = ({ activeStep, setActiveStep }) => {

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
                padding: { xs: 2, md: 4 }, 
                pb: { xs: 3, md: 4 },
            }}
        >
            <RoleHeaderWithProgressBar progressValue={42} indexValue={2} />
            <DemographicsForm />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' }, 
                    justifyContent: 'flex-end',
                    px: { xs: 2, md: 3 },
                    pt: 2,
                    pb: 5,
                    mt: 4,
                    mr: { md: 27 }
                }}
            >
                <Button
                    onClick={handleBack}
                    variant="outlined" 
                    sx={{
                        mb: { xs: 2, md: 0 }, 
                        mr: { xs: 0, md: 2 }, 
                        color: '#977342',
                        border: '1px solid #977342',
                        width: { md: '120px', xs: '100%' }, 
                        backgroundColor: 'white',
                        '&:hover': {
                            color: '#CEAB76',
                            border: '1px solid #CEAB76',
                            backgroundColor: 'white'
                        }
                    }}
                    aria-label="Go Back"
                >
                    Go Back
                </Button>
                <Button
                    onClick={handleContinue}
                    variant="contained"
                    sx={{
                        backgroundColor: '#977342',
                        width: { md: '120px', xs: '100%' }, 
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#CEAB76'
                        }
                    }}
                    aria-label="Next Step"
                >
                    Next Step
                </Button>
            </Box>
        </Box>
    )
};

export default RoleDemographics;