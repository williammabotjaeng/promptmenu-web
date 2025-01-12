"use client";

import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Snackbar, Alert } from '@mui/material';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store'; 
import { useStore } from 'zustand';

const PhysicalAttributes = ({ activeStep }) => {
    const { talentData, physicalAttributes, setPhysicalAttributes } = useStore(useTalentOnboardingStore);
    
    // Local state for form data
    const [formData, setFormData] = useState({
        height: '',
        weight: '',
        ethnicity: '',
    });

    // Snackbar state
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    // Effect to initialize local state from the store
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
            setSnackbarSeverity('success');
        } catch (error) {
            setSnackbarMessage('Error Saving Physical Attributes');
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
            {activeStep === 2 && (
                <Box className="w-full mx-auto">
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        sx={{ position: 'absolute', top: 16, right: 16, backgroundColor: '#000', color: '#977342' }}
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
                        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </Box>
            )}
        </>
    );
};

export default PhysicalAttributes;