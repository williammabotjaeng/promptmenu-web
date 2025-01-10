import React, { useState } from 'react';
import { Box, TextField, RadioGroup, FormControlLabel, Radio, Typography, Grid } from '@mui/material';

const PaymentMethod = ({ activeStep, paymentMethods, setPaymentMethods }) => {
    const [paymentMethod, setPaymentMethod] = useState(paymentMethods.payment_method || 'creditCard');

    const handlePaymentMethodChange = (event) => {
        const selectedMethod = event.target.value;
        setPaymentMethod(selectedMethod);
        setPaymentMethods((prev) => ({ ...prev, payment_method: selectedMethod }));
    };

    const handleInputChange = (field) => (event) => {
        setPaymentMethods((prev) => ({ ...prev, [field]: event.target.value }));
    };

    return (
        <Box className="w-full max-w-2xl mx-auto">
            <Typography variant="h6" className="mb-4" style={{ color: 'black' }}>Preferred Payment Method</Typography>
            <RadioGroup
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                row
            >
                <FormControlLabel value="creditCard" control={<Radio />} label={<Typography style={{ color: 'black' }}>Credit Card</Typography>} />
                <FormControlLabel value="paypal" control={<Radio />} label={<Typography style={{ color: 'black' }}>PayPal</Typography>} />
                <FormControlLabel value="stripe" control={<Radio />} label={<Typography style={{ color: 'black' }}>Stripe</Typography>} />
            </RadioGroup>

            {paymentMethod === 'creditCard' && (
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="ccNumber"
                            label="Card Number"
                            placeholder="Card Number"
                            variant="outlined"
                            fullWidth
                            value={paymentMethods.ccNumber || ''}
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
                            value={paymentMethods.ccFirstName || ''}
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
                            value={paymentMethods.ccLastName || ''}
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
                            value={paymentMethods.ccExpiry || ''}
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
                            value={paymentMethods.ccCVC || ''}
                            onChange={handleInputChange('ccCVC')}
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
                    value={paymentMethods.paypalEmail || ''}
                    onChange={handleInputChange('paypalEmail')}
                    className="mb-2"
                    InputLabelProps={{ style: { color: 'black' } }} 
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
                    value={paymentMethods.stripeDetails || ''}
                    onChange={handleInputChange('stripeDetails')}
                    className="mb-2"
                    InputLabelProps={{ style: { color: 'black' } }}
                />
            )}
        </Box>
    );
};

export default PaymentMethod;