"use client";

import React, { useEffect } from 'react';
import { Box, TextField, Button, Snackbar, Alert } from '@mui/material';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store'; 
import { useStore } from 'zustand';

const PhysicalAttributes = ({ activeStep }) => {
    const { talentData, physicalAttributes, setPhysicalAttributes } = useStore(useTalentOnboardingStore);
    
    // Snackbar state
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPhysicalAttributes((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        try {
            setPhysicalAttributes(physicalAttributes);
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
                    
                    <TextField
                        label="Height"
                        name="height"
                        value={physicalAttributes.height || ''}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Weight"
                        name="weight"
                        value={physicalAttributes.weight || ''}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Ethnicity"
                        name="ethnicity"
                        value={physicalAttributes.ethnicity || ''}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        sx={{ position: 'absolute', top: 16, right: 16, backgroundColor: '#000', color: '#977342' }}
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