import React, { useEffect, useState } from 'react';
import { Grid, TextField, Button, Snackbar, Alert } from '@mui/material';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store'; 
import { useStore } from 'zustand';

const SocialMediaLinks = ({ activeStep }) => {
    const { profileSocials, setProfileSocials } = useStore(useTalentOnboardingStore);
    
    // Local state for social media links
    const [localSocials, setLocalSocials] = useState({
        website: '',
        twitter: '',
        facebook: '',
        instagram: '',
        linkedin: '',
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        setLocalSocials({
            website: profileSocials?.website || '',
            twitter: profileSocials?.social_media_links?.twitter || '',
            facebook: profileSocials?.social_media_links?.facebook || '',
            instagram: profileSocials?.social_media_links?.instagram || '',
            linkedin: profileSocials?.social_media_links?.linkedin || '',
        });
    }, [profileSocials]);

    const handleInputChange = (field) => (event) => {
        setLocalSocials((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const handleSave = () => {
        try {
            setProfileSocials((prev) => ({
                ...prev,
                website: localSocials.website,
                social_media_links: {
                    twitter: localSocials.twitter,
                    facebook: localSocials.facebook,
                    instagram: localSocials.instagram,
                    linkedin: localSocials.linkedin,
                },
            }));
            setSnackbarMessage('Social Media Links Saved Successfully');
            setSnackbarSeverity('success');
        } catch (error) {
            setSnackbarMessage('Error Saving Social Media Links');
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
            {activeStep === 5 && ( 
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="website"
                            label="Website"
                            placeholder="Website"
                            variant="outlined"
                            fullWidth
                            value={localSocials.website}
                            onChange={handleInputChange('website')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="twitter"
                            label="Twitter"
                            placeholder="Twitter URL"
                            variant="outlined"
                            fullWidth
                            value={localSocials.twitter}
                            onChange={handleInputChange('twitter')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="facebook"
                            label="Facebook"
                            placeholder="Facebook URL"
                            variant="outlined"
                            fullWidth
                            value={localSocials.facebook}
                            onChange={handleInputChange('facebook')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="instagram"
                            label="Instagram"
                            placeholder="Instagram URL"
                            variant="outlined"
                            fullWidth
                            value={localSocials.instagram}
                            onChange={handleInputChange('instagram')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="linkedin"
                            label="LinkedIn"
                            placeholder="LinkedIn URL"
                            variant="outlined"
                            fullWidth
                            value={localSocials.linkedin}
                            onChange={handleInputChange('linkedin')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            onClick={handleSave}
                            sx={{ marginTop: 2, backgroundColor: '#000', color: '#977342', '&:hover': {
                                backgroundColor: '#CEAB76', 
                                color: '#000', 
                            }}}
                        >
                            Save this step
                        </Button>
                    </Grid>
                </Grid>
            )}

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%', backgroundColor: 'black', color: '#977342' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default SocialMediaLinks;