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
                paddingLeft: 12,
                paddingRight: 1,
                pb: { xs: 3, md: 4 },
                width: '100%'
            }}
        >
            <RoleHeaderWithProgressBar progressValue={14} />
            <Typography
                    variant="h4"
                    sx={{
                        alignSelf: 'flex-start',
                        mt: 2,
                        fontWeight: 'bold',
                        color: '#977342'
                    }}
                >
                    Add a Role
                </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    px: { xs: 1, md: 1 },
                    pt: 2,
                    pb: 5,
                    ml: 20,
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
                        py: 2,
                        mt: 2,
                        mr: { xs: 1, md: 38 },
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