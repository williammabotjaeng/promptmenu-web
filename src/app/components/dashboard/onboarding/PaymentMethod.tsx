import React, { useState } from 'react';
import { Box, TextField, RadioGroup, FormControlLabel, Radio, Typography, Grid } from '@mui/material';

const PaymentMethod = () => {
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [companyData, setCompanyData] = useState({
        payment_method: 'Credit Card',
        ccNumber: '',
        ccExpiry: '',
        ccCVC: '',
        ccFirstName: '',
        ccLastName: '',
        paypalEmail: '',
        stripeDetails: '',
    });

    return (
        <Box className="w-full max-w-2xl mx-auto">
            <Typography variant="h6" className="mb-4">Preferred Payment Method</Typography>
            <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                row
            >
                <FormControlLabel value="creditCard" control={<Radio />} label="Credit Card" />
                <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                <FormControlLabel value="stripe" control={<Radio />} label="Stripe" />
            </RadioGroup>

            {paymentMethod === 'creditCard' && (
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="ccNumber"
                            label="Card Number"
                            placeholder="Card Number"
                            variant="outlined"
                            fullWidth
                            value={companyData.ccNumber}
                            onChange={(e) => setCompanyData({ ...companyData, ccNumber: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="ccFirstName"
                            label="Card Holder's First Name"
                            placeholder="First Name"
                            variant="outlined"
                            fullWidth
                            value={companyData.ccFirstName}
                            onChange={(e) => setCompanyData({ ...companyData, ccFirstName: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="ccLastName"
                            label="Card Holder's Last Name"
                            placeholder="Last Name"
                            variant="outlined"
                            fullWidth
                            value={companyData.ccLastName}
                            onChange={(e) => setCompanyData({ ...companyData, ccLastName: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="ccExpiry"
                            label="Expiry Date (MM/YY)"
                            placeholder="MM/YY"
                            variant="outlined"
                            fullWidth
                            value={companyData.ccExpiry}
                            onChange={(e) => setCompanyData({ ...companyData, ccExpiry: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="ccCVC"
                            label="CVC"
                            placeholder="CVC"
                            variant="outlined"
                            fullWidth
                            value={companyData.ccCVC}
                            onChange={(e) => setCompanyData({ ...companyData, ccCVC: e.target.value })}
                        />
                    </Grid>
                </Grid>
            )}

            {paymentMethod === 'paypal' && (
                <TextField
                    id="paypalEmail"
                    label="PayPal Email"
                    placeholder="PayPal Email"
                    variant="outlined"
                    fullWidth
                    value={companyData.paypalEmail}
                    onChange={(e) => setCompanyData({ ...companyData, paypalEmail: e.target.value })}
                    className="mb-2"
                />
            )}

            {paymentMethod === 'stripe' && (
                <TextField
                    id="stripeDetails"
                    label="Stripe Payment Details"
                    placeholder="Stripe Payment Details"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={companyData.stripeDetails}
                    onChange={(e) => setCompanyData({ ...companyData, stripeDetails: e.target.value })}
                    className="mb-2"
                />
            )}
            <br />
            <br />
        </Box>
    );
};

export default PaymentMethod;