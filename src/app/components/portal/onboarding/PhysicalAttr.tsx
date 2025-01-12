"use client";

import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Snackbar, Alert } from '@mui/material';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store'; 
import { useStore } from 'zustand';

const PhysicalAttributes = ({ activeStep }) => {
    const { talentData, physicalAttributes, setPhysicalAttributes } = useStore(useTalentOnboardingStore);
    
    const [formData, setFormData] = useState({
        height: '',
        weight: '',
        ethnicity: '',
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        if (physicalAttributes) {
            setFormData({
                height: physicalAttributes.height || '',
                weight: physicalAttributes.weight || '',
                ethnicity: physicalAttributes.ethnicity || '',
            });
        }
    }, [physicalAttributes]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        try {
            setPhysicalAttributes(formData);
            setSnackbarMessage('Physical Attributes Saved Successfully');
        } catch (error) {
            setSnackbarMessage('Error Saving Physical Attributes');
        } finally {
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            {activeStep === 3 && (
                <Box className="w-full mx-auto">
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        sx={{ position: 'absolute', top: 16, right: 16, backgroundColor: '#000', color: '#977342', '&:hover': {
                            backgroundColor: '#CEAB76', 
                            color: '#000', 
                            },  
                        }}
                    >
                        Save this step
                    </Button>
                    <TextField
                        label="Height"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Ethnicity"
                        name="ethnicity"
                        value={formData.ethnicity}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                    />

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

export default PhysicalAttributes;