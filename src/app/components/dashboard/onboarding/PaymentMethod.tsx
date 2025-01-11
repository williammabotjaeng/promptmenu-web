"use client";

import React, { useState, useEffect } from 'react';
import { Box, TextField, RadioGroup, FormControlLabel, Radio, Typography, Grid, Button, Snackbar } from '@mui/material';
import useClientOnboardingStore from '@/state/use-client-onboarding-store'; 
import { useStore } from 'zustand';

const PaymentMethod = () => {
    const { paymentMethod, setPaymentMethod } = useStore(useClientOnboardingStore);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    
    // Local state for the selected payment method tab
    const [paymentMethodTab, setPaymentMethodTab] = useState(paymentMethod?.payment_method || "creditCard");
    const [paymentDetails, setPaymentDetails] = useState({
        ccNumber: paymentMethod?.ccNumber || '',
        ccFirstName: paymentMethod?.ccFirstName || '',
        ccLastName: paymentMethod?.ccLastName || '',
        ccExpiry: paymentMethod?.ccExpiry || '',
        ccCVC: paymentMethod?.ccCVC || '',
        paypalEmail: paymentMethod?.paypalEmail || '',
        stripeDetails: paymentMethod?.stripeDetails || ''
    });

    useEffect(() => {
        // Update local state if paymentMethod from the store changes
        if (paymentMethod) {
            setPaymentMethodTab(paymentMethod.payment_method);
            setPaymentDetails({
                ccNumber: paymentMethod.ccNumber || '',
                ccFirstName: paymentMethod.ccFirstName || '',
                ccLastName: paymentMethod.ccLastName || '',
                ccExpiry: paymentMethod.ccExpiry || '',
                ccCVC: paymentMethod.ccCVC || '',
                paypalEmail: paymentMethod.paypalEmail || '',
                stripeDetails: paymentMethod.stripeDetails || ''
            });
        }
    }, [paymentMethod]);

    const handlePaymentMethodChange = (event) => {
        setPaymentMethodTab(event.target.value); 
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false); 
    };

    const handleInputChange = (field) => (event) => {
        setPaymentDetails((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const handleUpdatePayments = () => {
        setPaymentMethod({ payment_method: paymentMethodTab, ...paymentDetails });
        setSnackbarOpen(true);
    };

    return (
        <Box className="w-full max-w-2xl mx-auto">
            <Typography variant="h6" className="mb-4" style={{ color: 'black' }}>Preferred Payment Method</Typography>
            <RadioGroup
                value={paymentMethodTab}
                onChange={handlePaymentMethodChange}
                row
            >
                <FormControlLabel value="creditCard" control={<Radio />} label={<Typography style={{ color: 'black' }}>Credit Card</Typography>} />
                <FormControlLabel value="paypal" control={<Radio />} label={<Typography style={{ color: 'black' }}>PayPal</Typography>} />
                <FormControlLabel value="stripe" control={<Radio />} label={<Typography style={{ color: 'black' }}>Stripe</Typography>} />
            </RadioGroup>

            {paymentMethodTab === 'creditCard' && (
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="ccNumber"
                            label="Card Number"
                            placeholder="Card Number"
                            variant="outlined"
                            fullWidth
                            value={paymentDetails.ccNumber}
                            onChange={handleInputChange('ccNumber')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="ccFirstName"
                            label="Card Holder's First Name"
                            placeholder="First Name"
                            variant="outlined"
                            fullWidth
                            value={paymentDetails.ccFirstName}
                            onChange={handleInputChange('ccFirstName')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="ccLastName"
                            label="Card Holder's Last Name"
                            placeholder="Last Name"
                            variant="outlined"
                            fullWidth
                            value={paymentDetails.ccLastName}
                            onChange={handleInputChange('ccLastName')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="ccExpiry"
                            label="Expiry Date (MM/YY)"
                            placeholder="MM/YY"
                            variant="outlined"
                            fullWidth
                            value={paymentDetails.ccExpiry}
                            onChange={handleInputChange('ccExpiry')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="ccCVC"
                            label="CVC"
                            placeholder="CVC"
                            variant="outlined"
                            fullWidth
                            value={paymentDetails.ccCVC}
                            onChange={handleInputChange('ccCVC')}
                        />
                    </Grid>
                </Grid>
            )}

            {paymentMethodTab === 'paypal' && (
                <TextField
                    id="paypalEmail"
                    label="PayPal Email"
                    placeholder="PayPal Email"
                    variant="outlined"
                    fullWidth
                    value={paymentDetails.paypalEmail}
                    onChange={handleInputChange('paypalEmail')}
                    className="mb-2"
                    InputLabelProps={{ style: { color: 'black' } }} 
                />
            )}

            {paymentMethodTab === 'stripe' && (
                <TextField
                    id="stripeDetails"
                    label="Stripe Payment Details"
                    placeholder="Stripe Payment Details"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={paymentDetails.stripeDetails}
                    onChange={handleInputChange('stripeDetails')}
                    className="mb-2"
                    InputLabelProps={{ style: { color: 'black' } }}
                />
            )}

            <Button variant="contained" color="primary" onClick={handleUpdatePayments} className="mt-4">
                Update Payment Details
            </Button>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Payment details updated successfully!"
                action={
                    <Button color="inherit" onClick={handleCloseSnackbar}>
                        Close
                    </Button>
                }
            />
        </Box>
    );
};

export default PaymentMethod;