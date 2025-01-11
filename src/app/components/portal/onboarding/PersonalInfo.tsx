"use client";

import React from 'react';
import { Box, TextField, Typography, Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
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
                                value={personalInfo?.user}
                                onChange={(e) => setPersonalInfo((prev) => ({ ...prev, user: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Gender"
                                placeholder="Enter your gender"
                                variant="outlined"
                                value={personalInfo?.gender}
                                onChange={(e) => setPersonalInfo((prev) => ({ ...prev, gender: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                placeholder="Enter your phone number"
                                variant="outlined"
                                value={personalInfo?.phone_number}
                                onChange={(e) => setPersonalInfo((prev) => ({ ...prev, phone_number: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="WhatsApp Number"
                                placeholder="Enter your WhatsApp number"
                                variant="outlined"
                                value={personalInfo?.whatsapp_number}
                                onChange={(e) => setPersonalInfo((prev) => ({ ...prev, phone_number: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                                label="Date of Birth"
                                value={personalInfo?.date_of_birth ? new Date(personalInfo.date_of_birth) : null}
                                onChange={(newValue) => {
                                    setPersonalInfo((prev) => ({
                                        ...prev,
                                        date_of_birth: newValue ? newValue.toISOString().split('T')[0] : null, // Format to YYYY-MM-DD
                                    }));
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} fullWidth variant="outlined" />
                                )}
                            />
                        </LocalizationProvider>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </>
    );
};

export default PersonalInformation;