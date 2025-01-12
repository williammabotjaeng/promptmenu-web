import React from 'react';
import { Box, TextField } from '@mui/material';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store'; 
import { useStore } from 'zustand';

const PhysicalAttributes = ({ activeStep }) => {
    const { talentData, physicalAttributes, setPhysicalAttributes } = useStore(useTalentOnboardingStore);
    console.log("Talent Data", talentData);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPhysicalAttributes((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            {activeStep === 2 && (
                <Box>
                    <TextField
                        label="Height"
                        name="height"
                        value={physicalAttributes.height || ''}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Weight"
                        name="weight"
                        value={physicalAttributes.weight || ''}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Ethnicity"
                        name="ethnicity"
                        value={physicalAttributes.ethnicity || ''}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                    />
                </Box>
            )}
        </>
    );
};

export default PhysicalAttributes;