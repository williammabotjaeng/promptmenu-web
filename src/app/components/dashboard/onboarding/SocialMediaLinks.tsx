"use client";

import React, { useRef } from 'react';
import { Grid, TextField, Box, Button } from '@mui/material';
import useClientOnboardingStore from '@/state/use-client-onboarding-store'; 
import { useStore } from 'zustand';

const SocialMediaLinks = ({ activeStep }) => {
    const { socialMediaLinks, setSocialMediaLinks } = useStore(useClientOnboardingStore);

    // Create refs for each input
    const websiteRef = useRef();
    const twitterRef = useRef();
    const facebookRef = useRef();
    const instagramRef = useRef();
    const linkedinRef = useRef();

    const handleSave = () => {
        setSocialMediaLinks({
            ...socialMediaLinks,
            website: websiteRef.current.value,
            social_media_links: {
                twitter: twitterRef.current.value,
                facebook: facebookRef.current.value,
                instagram: instagramRef.current.value,
                linkedin: linkedinRef.current.value,
            },
        });
    };

    return (
        <Box className="w-full mx-auto">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="website"
                        label="Website"
                        placeholder="Website"
                        variant="outlined"
                        fullWidth
                        defaultValue={socialMediaLinks?.website}
                        inputRef={websiteRef}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="twitter"
                        label="Twitter"
                        placeholder="Twitter URL"
                        variant="outlined"
                        fullWidth
                        defaultValue={socialMediaLinks?.social_media_links?.twitter}
                        inputRef={twitterRef}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="facebook"
                        label="Facebook"
                        placeholder="Facebook URL"
                        variant="outlined"
                        fullWidth
                        defaultValue={socialMediaLinks?.social_media_links?.facebook}
                        inputRef={facebookRef}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="instagram"
                        label="Instagram"
                        placeholder="Instagram URL"
                        variant="outlined"
                        fullWidth
                        defaultValue={socialMediaLinks?.social_media_links?.instagram}
                        inputRef={instagramRef}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="linkedin"
                        label="LinkedIn"
                        placeholder="LinkedIn URL"
                        variant="outlined"
                        fullWidth
                        defaultValue={socialMediaLinks?.social_media_links?.linkedin}
                        inputRef={linkedinRef}
                    />
                </Grid>
            </Grid>
            <br />
            <Button onClick={handleSave}>Save</Button>
        </Box>
    );
};

export default SocialMediaLinks;