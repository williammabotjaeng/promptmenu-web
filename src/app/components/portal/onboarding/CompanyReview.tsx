import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const CompanyReview = ({ contactInfoData, dummyCompanyData, paymentMethods, companySocials }) => {
    const hasSocialMediaLinks = Object.values(companySocials.social_media_links).some(link => link);
    const hasContactDetails = contactInfoData.address || contactInfoData.phone_number || contactInfoData.whatsapp_number;

    // Create an excerpt of the description
    const descriptionExcerpt = dummyCompanyData.description.length > 100 
        ? `${dummyCompanyData.description.substring(0, 100)}...` 
        : dummyCompanyData.description;

    return (
        <Box>
            <Typography variant="h5" style={{ color: 'black' }}>Review Your Information</Typography>
            <Grid container mt={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" style={{ color: 'black' }}>Payment Method:</Typography>
                    <Typography style={{ color: 'black' }}>{paymentMethods.payment_method}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" style={{ color: 'black' }}>Social Media:</Typography>
                    <Typography style={{ color: 'black' }}>{hasSocialMediaLinks ? 'Yes' : 'No'}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" style={{ color: 'black' }}>Contact Details:</Typography>
                    <Typography style={{ color: 'black' }}>{hasContactDetails ? 'Yes' : 'No'}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" style={{ color: 'black' }}>Company Information:</Typography>
                    <Typography style={{ color: 'black' }}>Name: {dummyCompanyData.name || 'N/A'}</Typography>
                    <Typography style={{ color: 'black' }}>Slogan: {dummyCompanyData.slogan || 'N/A'}</Typography>
                    <Typography style={{ color: 'black' }}>Description: {descriptionExcerpt}</Typography>
                    <Typography style={{ color: 'black' }}>Website: {companySocials.website || 'N/A'}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ marginTop: '-20px' }}>
                    <Typography variant="h6" style={{ color: 'black' }}>Contact Information:</Typography>
                    <Typography style={{ color: 'black' }}>Address: {contactInfoData.address || 'N/A'}</Typography>
                    <Typography style={{ color: 'black' }}>Phone Number: {contactInfoData.phone_number || 'N/A'}</Typography>
                    <Typography style={{ color: 'black' }}>WhatsApp Number: {contactInfoData.whatsapp_number || 'N/A'}</Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CompanyReview;