import React, { useState } from 'react';
import { Box, Chip, Typography, Grid } from '@mui/material';

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

const SkillsSelection = ({ activeStep }) => {
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

    const handleSkillClick = (skill: string) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter((s) => s !== skill));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
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
        </Box>
    );
};

export default SkillsSelection;