import React from 'react';
import { Grid, TextField } from '@mui/material';

const SocialMediaLinks = ({ companySocials, setCompanySocials, activeStep }) => {
    const handleInputChange = (field) => (event) => {
        setCompanySocials((prev) => ({
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
                    value={setCompanySocials.website}
                    onChange={(e) => setCompanySocials({ ...companySocials, website: e.target.value })}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="twitter"
                    label="Twitter"
                    placeholder="Twitter URL"
                    variant="outlined"
                    fullWidth
                    value={companySocials.social_media_links.twitter || ''}
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
                    value={companySocials.social_media_links.facebook || ''}
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
                    value={companySocials.social_media_links.instagram || ''}
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
                    value={companySocials.social_media_links.linkedin || ''}
                    onChange={handleInputChange('linkedin')}
                />
            </Grid>
        </Grid>
    );
};

export default SocialMediaLinks;