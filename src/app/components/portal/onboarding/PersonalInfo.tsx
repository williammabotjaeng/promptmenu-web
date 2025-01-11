import React from 'react';
import { Box, TextField, Typography, Grid } from '@mui/material';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store';
import { useStore } from 'zustand';

const PersonalInformation = ({ activeStep }) => {
    const { personalInfo, setPersonalInfo } = useStore(useTalentOnboardingStore);

    return (
        <>
            {activeStep === 0 && (
                <Box className="w-full mx-auto">
                    <Typography variant="h6" className="mb-4">Personal Information</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Name"
                                placeholder="Enter your name"
                                variant="outlined"
                                value={personalInfo?.user || ''}
                                onChange={(e) => setPersonalInfo((prev) => ({ ...prev, user: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Date of Birth"
                                placeholder="YYYY-MM-DD"
                                variant="outlined"
                                value={personalInfo?.date_of_birth || ''}
                                onChange={(e) => setPersonalInfo((prev) => ({ ...prev, date_of_birth: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Gender"
                                placeholder="Enter your gender"
                                variant="outlined"
                                value={personalInfo?.gender || ''}
                                onChange={(e) => setPersonalInfo((prev) => ({ ...prev, gender: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                placeholder="Enter your phone number"
                                variant="outlined"
                                value={personalInfo?.phone_number || ''}
                                onChange={(e) => setPersonalInfo((prev) => ({ ...prev, phone_number: e.target.value }))}
                            />
                        </Grid>
                    </Grid>
                </Box>
            )}
        </>
    );
};

export default PersonalInformation;