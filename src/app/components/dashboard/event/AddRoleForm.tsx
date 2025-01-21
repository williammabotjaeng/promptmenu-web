import * as React from "react";
import SectionTabs from './SectionTabs';
import RoleRequirement from './RoleRequirement';
import { Box, Button, Typography } from "@mui/material";
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import HeaderWithProgressBar from "./HeaderWithProgressBar";

const AddRoleForm: React.FC<PostEventStepProps> = ({ activeStep, setActiveStep }) => {

    const handleContinue = () => {
        setActiveStep(activeStep + 1);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'transparent',
                pb: { xs: 3, md: 72 },
            }}
        >
            <HeaderWithProgressBar progressValue={14} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    px: { xs: 2, md: 5 },
                    pt: 2,
                    pb: 9,
                    width: '100%',
                    backgroundColor: 'white',
                    maxWidth: '100%',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        width: '100%',
                        maxWidth: '1188px'
                    }}
                >
                    <SectionTabs sections={["Requirements", "Details", "Demographics", "Payment"]} />
                </Box>
                <Typography
                    variant="h4"
                    sx={{
                        alignSelf: 'flex-start',
                        mt: 2,
                        fontWeight: 'bold',
                        color: 'text.secondary'
                    }}
                >
                    Add a Role
                </Typography>
                <RoleRequirement />
                <Button
                    onClick={handleContinue}
                    variant="contained"
                    sx={{
                        alignSelf: 'flex-end',
                        px: 4,
                        py: 2,
                        mt: 2,
                        mr: { xs: 1, md: 6 },
                        backgroundColor: 'stone.500',
                        '&:hover': {
                            backgroundColor: 'stone.600'
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