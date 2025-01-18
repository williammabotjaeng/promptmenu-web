"use client";

import React, { useState, useEffect } from 'react';
import { Box, Chip, Typography, Grid, Button, Snackbar, Alert } from '@mui/material';
import { useCookies } from 'react-cookie';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store'; 
import { useStore } from 'zustand';

const skills = [
    'Event Coordination',
    'Project Management',
    'Modeling',
    'Event Executive',
    'Ushering',
    'Freelancing',
    'Photography',
    'Influencer Marketing',
    'Sports Modeling',
    'Security Management',
    'Hosting',
    'Videography',
    'Event Management',
    'Event Organization',
    'Site Management',
    'Journalism',
];

const SkillsSelection = ({ activeStep }) => {
    const { talentData, setTalentData } = useStore(useTalentOnboardingStore);
    const [cookies, setCookie] = useCookies(['skills']);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleSkillClick = (skill: string) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter((s) => s !== skill));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box className="w-full mx-auto" sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
                Select Your Skills
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 2 }}>
                {selectedSkills.map((skill) => (
                    <Chip key={skill} label={skill} onDelete={() => handleSkillClick(skill)} />
                ))}
            </Box>
            <Grid container spacing={1}>
                {skills.map((skill) => (
                    <Grid item key={skill} xs={6} sm={4} md={3}>
                        <Chip
                            label={skill}
                            onClick={() => handleSkillClick(skill)}
                            variant={selectedSkills.includes(skill) ? 'filled' : 'outlined'}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: selectedSkills.includes(skill) ? '#000' : 'transparent',
                                color: selectedSkills.includes(skill) ? '#fff' : '#000',
                                '&:hover': {
                                    backgroundColor: selectedSkills.includes(skill) ? '#333' : '#f0f0f0',
                                },
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
            <Button
                variant="contained"
                onClick={() => console.log("upload")}
                sx={{
                    backgroundColor: 'black',
                    color: '#977342',
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    '&:hover': {
                        backgroundColor: '#CEAB76', 
                        color: '#000', 
                    },
                }}
            >
                Save this step
            </Button>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose}  sx={{ width: '100%', backgroundColor: 'black', color: '#977342' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default SkillsSelection;