import React from 'react';
import { Grid, TextField } from '@mui/material';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store';
import { useStore } from 'zustand';

const SocialMediaLinks = ({ activeStep }) => {
    const { profileSocials, setProfileSocials } = useStore(useTalentOnboardingStore);

    const handleInputChange = (field) => (event) => {
        setProfileSocials((prev) => ({
            ...prev,
            social_media_links: {
                ...prev.social_media_links,
                [field]: event.target.value,
            },
        }));
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="website"
                    label="Website"
                    placeholder="Website"
                    variant="outlined"
                    fullWidth
                    value={profileSocials.website || ''}
                    onChange={(e) => setProfileSocials({ ...profileSocials, website: e.target.value })}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="twitter"
                    label="Twitter"
                    placeholder="Twitter URL"
                    variant="outlined"
                    fullWidth
                    value={profileSocials.social_media_links.twitter || ''}
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
                    value={profileSocials.social_media_links.facebook || ''}
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
                    value={profileSocials.social_media_links.instagram || ''}
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
                    value={profileSocials.social_media_links.linkedin || ''}
                    onChange={handleInputChange('linkedin')}
                />
            </Grid>
        </Grid>
    );
};

export default SocialMediaLinks;