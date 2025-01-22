import * as React from "react";
import { Box, Button } from "@mui/material";
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import RoleHeaderWithProgressBar from "@/components/dashboard/event/RoleHeaderWithProgressBar";
import FormSection from "@/components/dashboard/event/FormSection";

const Questions: React.FC<PostEventStepProps> = ({ activeStep, setActiveStep }) => {

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
                alignItems: 'center', 
                paddingLeft: 2,
                paddingRight: 2,
                pb: { xs: 3, md: 4 },
                minHeight: '100vh', 
            }}
        >
            <RoleHeaderWithProgressBar progressValue={90} indexValue={4} />
            <FormSection />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    px: { xs: 1, md: 1 },
                    pt: 2,
                    pb: 5,
                    mt: 4,
                    width: '100%', 
                    maxWidth: '768px', 
                }}
            >
                <Button
                    onClick={handleBack}
                    variant="outlined" 
                    sx={{
                        mr: 2, 
                        color: '#977342',
                        border: '1px solid #977342',
                        width: '120px', 
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
                        width: '120px',
                        color: '#fff', 
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

export default Questions;