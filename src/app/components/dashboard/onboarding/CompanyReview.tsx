import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import useClientOnboardingStore from '@/state/use-client-onboarding-store'; 

const CompanyReview = () => {
    const { contactInfo, companyInfo, paymentMethod, socialMediaLinks } = useClientOnboardingStore.getState();

    const hasSocialMediaLinks = Object.values(socialMediaLinks?.social_media_links).some(link => link);
    const hasContactDetails = contactInfo.address || contactInfo.phone_number || contactInfo.whatsapp_number;

    // Create an excerpt of the description
    const descriptionExcerpt = companyInfo.description.length > 100 
        ? `${companyInfo.description.substring(0, 100)}...` 
        : companyInfo.description;

    return (
        <Box>
            <Typography variant="h5" style={{ color: 'black' }}>Review Your Information</Typography>
            <Grid container mt={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" style={{ color: 'black' }}>Payment Method:</Typography>
                    <Typography style={{ color: 'black' }}>{paymentMethod.payment_method || 'N/A'}</Typography>
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
                    <Typography style={{ color: 'black' }}>Name: {companyInfo.name || 'N/A'}</Typography>
                    <Typography style={{ color: 'black' }}>Slogan: {companyInfo.slogan || 'N/A'}</Typography>
                    <Typography style={{ color: 'black' }}>Description: {descriptionExcerpt}</Typography>
                    <Typography style={{ color: 'black' }}>Website: {socialMediaLinks.website || 'N/A'}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ marginTop: '-20px' }}>
                    <Typography variant="h6" style={{ color: 'black' }}>Contact Information:</Typography>
                    <Typography style={{ color: 'black' }}>Address: {contactInfo.address || 'N/A'}</Typography>
                    <Typography style={{ color: 'black' }}>Phone Number: {contactInfo.phone_number || 'N/A'}</Typography>
                    <Typography style={{ color: 'black' }}>WhatsApp Number: {contactInfo.whatsapp_number || 'N/A'}</Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CompanyReview;