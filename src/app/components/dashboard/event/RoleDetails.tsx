import * as React from "react";
import SectionTabs from './SectionTabs';
import RoleRequirement from './RoleRequirement';
import { Box, Button, Typography } from "@mui/material";
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import RoleHeaderWithProgressBar from "@/components/dashboard/event/RoleHeaderWithProgressBar";
import RoleDetailsForm from "@/components/dashboard/event/RoleDetailsForm";

const RoleDetails: React.FC<PostEventStepProps> = ({ activeStep, setActiveStep }) => {

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
            <RoleHeaderWithProgressBar progressValue={14} />
            <RoleDetailsForm />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    px: { xs: 2, md: 2 },
                    pt: 2,
                    pb: 5,
                    ml: 20,
                    width: '100%',
                    backgroundColor: 'white',
                    maxWidth: '100%',
                }}
            >
                <Button
                    onClick={handleBack}
                    variant="contained"
                    sx={{
                        alignSelf: 'flex-end',
                        px: 4,
                        py: 2,
                        mt: 2,
                        mr: { xs: 1, md: 56 },
                        color: '#977342',
                        border: '1px solid #977342',
                        backgroundColor: 'white',
                        '&:hover': {
                            color: '#CEAB76',
                            border: '1px solid #CEAB76',
                            backgroundColor: 'white'
                        }
                    }}
                    aria-label="Next Step"
                >
                    Go Back
                </Button>
                <Button
                    onClick={handleContinue}
                    variant="contained"
                    sx={{
                        alignSelf: 'flex-end',
                        px: 4,
                        py: 2,
                        mt: 2,
                        mr: { xs: 1, md: 56 },
                        backgroundColor: '#977342',
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

export default RoleDetails;