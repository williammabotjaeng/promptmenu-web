"use client";

import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { useStore } from 'zustand';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const PersonalInformation = ({ activeStep }) => {
    const { personalInfo, setPersonalInfo } = useStore(useTalentOnboardingStore);
    
    // Local state to manage form inputs
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        phone_number: '',
        whatsapp_number: '',
        gender: '',
        date_of_birth: null,
    });

    // Effect to initialize form data from the store
    useEffect(() => {
        if (personalInfo) {
            setFormData({
                firstname: personalInfo.firstname || '',
                lastname: personalInfo.lastname || '',
                phone_number: personalInfo.phone_number || '',
                whatsapp_number: personalInfo.whatsapp_number || '',
                gender: personalInfo.gender || '',
                date_of_birth: personalInfo.date_of_birth ? new Date(personalInfo.date_of_birth) : new Date(),
            });
        }
    }, [personalInfo]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (newValue) => {
        setFormData((prev) => ({
            ...prev,
            date_of_birth: newValue,
        }));
    };

    const handleSave = () => {
        setPersonalInfo(formData);
    };

    return (
        <>
            {activeStep === 0 && (
                <Box className="w-full mx-auto">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Firstname"
                                placeholder="Enter your Firstname"
                                variant="outlined"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Lastname"
                                placeholder="Enter your Lastname"
                                variant="outlined"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                placeholder="Enter your phone number"
                                variant="outlined"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="WhatsApp Number"
                                placeholder="Enter your WhatsApp number"
                                variant="outlined"
                                name="whatsapp_number"
                                value={formData.whatsapp_number}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        {/* Gender Field */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="gender-label">Gender</InputLabel>
                                <Select
                                    labelId="gender-label"
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Date of Birth"
                                    value={formData.date_of_birth}
                                    onChange={handleDateChange}
                                    renderInput={(params) => (
                                        <TextField {...params} fullWidth variant="outlined" />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        sx={{
                            backgroundColor: 'black',
                            color: '#977342',
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                        }}
                    >
                        Save this step
                    </Button>
                </Box>
            )}
        </>
    );
};

export default PersonalInformation;