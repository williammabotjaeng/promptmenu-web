import React, { useState } from 'react';
import { Box, Chip, Typography, Grid, Button, Snackbar, Alert } from '@mui/material';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store'; 
import { useStore } from 'zustand';

const skills = [
    'Event coordinator',
    'Project manager',
    'Models',
    'Event executives',
    'Ushers',
    'Extras',
    'Freelancers',
    'Photographers',
    'Influencers',
    'Sports models',
    'Security',
    'Hostesses',
    'Videographer',
    'Event manager',
    'Organizer',
    'Site manager',
    'Journalist',
];

const SkillsSelection = () => {
    const { setTalentProfileData } = useStore(useTalentOnboardingStore);
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

    const handleSave = () => {
        try {
            setTalentProfileData((prev) => ({
                ...prev,
                skills: selectedSkills,
            }));
            setSnackbarMessage('Skills saved successfully!');
        } catch (error) {
            setSnackbarMessage('Error saving skills.');
        } finally {
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box classNames="w-full mx-auto" sx={{ padding: 2 }}>
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
                onClick={handleSave}
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
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%', backgroundColor: 'black', color: '#977342' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default SkillsSelection;