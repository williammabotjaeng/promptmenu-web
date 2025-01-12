"use client";

import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, TextField, Typography, Input, Snackbar, Alert } from '@mui/material';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store'; 
import { useCookies } from 'react-cookie';
import { useStore } from 'zustand';

const IDandCreds = ({ activeStep }) => {
    const { physicalAttributes, governmentID, setGovernmentID, bankDetails, setBankDetails } = useStore(useTalentOnboardingStore);
    
    const [formData, setFormData] = useState({
        accountHolderName: '',
        bankName: '',
        accountNumber: '',
        iban: '',
        swift: '',
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [fileName, setFileName] = useState('');
    const [cookies, setCookie] = useCookies(['governmentIDUrl']);

    useEffect(() => {
        if (bankDetails) {
            setFormData({
                accountHolderName: bankDetails.accountHolderName || '',
                bankName: bankDetails.bankName || '',
                accountNumber: bankDetails.accountNumber || '',
                iban: bankDetails.iban || '',
                swift: bankDetails.swift || '',
            });
        }

        if (cookies.governmentIDUrl) {
            setFileName(cookies?.governmentIDUrl);
        }
    }, [bankDetails, cookies?.governmentIDUrl]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setGovernmentID(file);
        setFileName(file ? file.name : '');
        setCookie('governmentIDUrl', fileURL, { path: '/' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        try {
            setBankDetails(formData);
            setSnackbarMessage('Government ID and Bank Details Saved Successfully');
        } catch (error) {
            setSnackbarMessage('Error Saving Government ID and Bank Details');
        } finally {
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            {activeStep === 4 && (
                <Box className="w-full">
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 'auto 0px'
                    }}>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        inputProps={{ style: { display: 'none' } }} 
                        id="government-id-upload"
                    />
                    <label htmlFor="government-id-upload">
                        <Button variant="contained" component="span" style={{ 
                                margin: '20px 0',
                                backgroundColor: 'black',
                                color: '#977342'
                            }}>
                            Upload Government ID
                        </Button>
                    </label>
                    {fileName && <Typography variant="body2" style={{ marginTop: '10px', marginLeft: '10px', color: 'black' }}>{fileName}</Typography>} 
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        sx={{ margin: '20px 0', marginLeft: '20px', backgroundColor: '#000', color: '#977342', '&:hover': {
                            backgroundColor: '#CEAB76', 
                            color: '#000', 
                            },  
                        }}
                    >
                        Save this step
                    </Button>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Account Holder's Name"
                                name="accountHolderName"
                                value={formData.accountHolderName}
                                onChange={handleChange}
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                label="Account Number"
                                name="accountNumber"
                                value={formData.accountNumber}
                                onChange={handleChange}
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Bank Name"
                                name="bankName"
                                value={formData.bankName}
                                onChange={handleChange}
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                label="SWIFT CODE"
                                name="swift"
                                value={formData.swift}
                                onChange={handleChange}
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sx={{
                            marginTop: '-20px',
                            marginBottom: '-20px'
                        }}>
                            <TextField
                                label="IBAN"
                                name="iban"
                                value={formData.iban}
                                onChange={handleChange}
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                    </Grid>

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

export default IDandCreds;