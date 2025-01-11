import React from 'react';
import { Box, Typography, Grid, Avatar } from '@mui/material';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store'; 

const ProfileReview = () => {
    const { talentData, personalInfo, physicalAttributes } = useTalentOnboardingStore.getState();

    return (
        <Box>
            <Typography variant="h5" style={{ color: 'black' }}>Review Your Profile</Typography>
            <Grid container spacing={2} mt={2}>
                <Grid item xs={12} sm={4} container direction="column" alignItems="center">
                    <Avatar 
                        alt={talentData.user || 'N/A'} 
                        src={talentData.headshot || ''} 
                        sx={{ width: 100, height: 100 }} 
                    />
                    <Typography variant="h6" style={{ color: 'black', marginTop: '10px' }}>
                        {talentData.user || 'N/A'}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Typography variant="h6" style={{ color: 'black' }}>Personal Information:</Typography>
                    <Typography style={{ color: 'black' }}>Date of Birth: {personalInfo.date_of_birth || 'N/A'}</Typography>
                    <Typography style={{ color: 'black' }}>Gender: {personalInfo.gender || 'N/A'}</Typography>
                    <Typography style={{ color: 'black' }}>Phone Number: {personalInfo.phone_number || 'N/A'}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" style={{ color: 'black' }}>Physical Attributes:</Typography>
                    <Typography style={{ color: 'black' }}>Height: {physicalAttributes.height || 'N/A'}</Typography>
                    <Typography style={{ color: 'black' }}>Weight: {physicalAttributes.weight || 'N/A'}</Typography>
                    <Typography style={{ color: 'black' }}>Ethnicity: {physicalAttributes.ethnicity || 'N/A'}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" style={{ color: 'black' }}>Government ID:</Typography>
                    <Typography style={{ color: 'black' }}>{talentData.government_id ? 'Uploaded' : 'Not Uploaded'}</Typography>
                    <Typography variant="h6" style={{ color: 'black' }}>Banking Details:</Typography>
                    <Typography style={{ color: 'black' }}>{talentData.banking_details ? 'Provided' : 'Not Provided'}</Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProfileReview;