"use client";

import React from 'react';
import { Box, Typography, Grid, Avatar } from '@mui/material';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store'; 
import { useCookies } from 'react-cookie';

const ProfileReview = () => {
    const { talentData, personalInfo, physicalAttributes, bankDetails } = useTalentOnboardingStore.getState();
    const [cookies] = useCookies([
        'headshotBlobUrl',
        'governmentIDName'
    ]);

    const headshotBlobUrl = cookies?.headshotBlobUrl;
    const governmentIDName = cookies?.governmentIDName;

    return (
        <Box>
            <Typography variant="h5" style={{ color: 'black' }}>Review Your Profile</Typography>
            <Grid container spacing={2} mt={2}>
                <Grid item xs={12} sm={4} container direction="column" alignItems="center">
                    <Avatar 
                        alt={personalInfo?.firstname || 'N/A'} 
                        src={headshotBlobUrl || ''} 
                        sx={{ width: 100, height: 100 }} 
                    />
                    <Typography variant="h6" style={{ color: 'black', marginTop: '10px' }}>
                        {personalInfo?.firstname || 'N/A'}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Typography variant="h6" style={{ color: 'black' }}>Personal Information:</Typography>
                    <Typography style={{ color: 'black' }}>Date of Birth: {personalInfo?.date_of_birth?.toLocaleString() || 'N/A'}</Typography>
                    <Typography style={{ color: 'black' }}>Gender: {personalInfo.gender || 'N/A'}</Typography>
                    <Typography style={{ color: 'black' }}>Phone Number: {personalInfo.phone_number || 'N/A'}</Typography>
                    <Typography style={{ color: 'black' }}>WhatsApp Number: {personalInfo.whatsapp_number || 'N/A'}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" style={{ color: 'black' }}>Physical Attributes:</Typography>
                    <Typography style={{ color: 'black' }}>Height: {physicalAttributes.height || 'N/A'}</Typography>
                    <Typography style={{ color: 'black' }}>Weight: {physicalAttributes.weight || 'N/A'}</Typography>
                    <Typography style={{ color: 'black' }}>Ethnicity: {physicalAttributes.ethnicity || 'N/A'}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" style={{ color: 'black' }}>Government ID:</Typography>
                    <Typography style={{ color: 'black' }}>{governmentIDName ? 'Uploaded' : 'Not Uploaded'}</Typography>
                    <Typography variant="h6" style={{ color: 'black' }}>Banking Details:</Typography>
                    <Typography style={{ color: 'black' }}>{bankDetails ? 'Provided' : 'Not Provided'}</Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProfileReview;