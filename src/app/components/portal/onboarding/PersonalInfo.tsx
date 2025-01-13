"use client";

import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button, Snackbar, Alert, Typography } from '@mui/material';
import { useStore } from 'zustand';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const PersonalInformation = ({ activeStep }) => {
    const { personalInfo, setPersonalInfo } = useStore(useTalentOnboardingStore);
    
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        phone_number: '',
        whatsapp_number: '',
        gender: '',
        date_of_birth: null,
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        if (personalInfo) {
            console.log("personal info", personalInfo);
            setFormData({
                firstname: personalInfo.firstname || '',
                lastname: personalInfo.lastname || '',
                phone_number: personalInfo.phone_number || '',
                whatsapp_number: personalInfo.whatsapp_number || '',
                gender: personalInfo.gender || '',
                date_of_birth: personalInfo.date_of_birth ? new Date(personalInfo.date_of_birth) : null,
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
        try {
            setPersonalInfo(formData);
            setSnackbarMessage('Personal Information Saved Successfully');
            setSnackbarSeverity('success');
        } catch (error) {
            setSnackbarMessage('Error Saving your Information');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            {activeStep === 0 && (
                <Box className="w-full mx-auto">
                    <Typography variant="h6" sx={{
                        color: 'black'
                    }}>Verify your Personal Information.</Typography>
                    <br />
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
                            '&:hover': {
                                backgroundColor: '#CEAB76', 
                                color: '#000', 
                            },
                        }}
                    >
                        Save this step
                    </Button>

                    {/* Snackbar for notifications */}
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={6000}
                        onClose={handleSnackbarClose}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%', color: '#977342', backgroundColor: 'black' }}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </Box>
            )}
        </>
    );
};

export default PersonalInformation;