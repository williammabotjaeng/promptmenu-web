import * as React from "react";
import SectionTabs from './SectionTabs';
import RoleRequirement from './RoleRequirement';
import { Box, Button, Typography } from "@mui/material";
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import RoleHeaderWithProgressBar from "@/components/dashboard/event/RoleHeaderWithProgressBar";

const AddRoleForm: React.FC<PostEventStepProps> = ({ activeStep, setActiveStep }) => {

    const handleContinue = () => {
        setActiveStep(activeStep + 1);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                justifyContent: 'center',
                padding: { xs: 2, md: 4 }, 
                pb: {xs: 0, md: 4},
                width: '100%', 
                height: '100%'
            }}
        >
            <RoleHeaderWithProgressBar progressValue={14} indexValue={0} />
            <Typography
                variant="h4"
                sx={{
                    alignSelf: 'flex-start',
                    mt: 2,
                    fontWeight: 'bold',
                    color: '#977342',
                    fontSize: '24px' // Consistent font size across all screens
                }}
            >
                Add a Role
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    px: 2, // Consistent padding for all screen sizes
                    pt: 2,
                    pb: { xs: 24, md: 5 },
                    mx: 'auto', // Center the box
                    backgroundColor: 'white',
                    maxWidth: '90%',
                }}
            >
                <RoleRequirement />
                <Button
                    onClick={handleContinue}
                    variant="contained"
                    sx={{
                        alignSelf: 'flex-end',
                        px: 4,
                        py: { xs: 0, md: 2 },
                        mt: {xs: 6, md:2 },
                        mr: 2, 
                        color: 'white',
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

export default AddRoleForm;