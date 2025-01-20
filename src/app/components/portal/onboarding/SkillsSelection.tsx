import * as React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { StepItem } from '@/components/portal/onboarding/StepItem';
import { SkillTag } from '@/components/portal/onboarding/SkillTag';
import OnboardingHeader from '@/components/portal/onboarding/OnboardingHeader';
import { useRouter } from 'next/navigation';
import { OnboardingStepProps } from '@/types/Props/OnboardingStepProps';

const steps = [
    { number: 1, title: 'Headshot', isActive: false },
    { number: 2, title: 'Skills', isActive: true },
    { number: 3, title: 'Payment', isActive: false },
    { number: 4, title: 'Attributes', isActive: false },
    { number: 5, title: 'Social', isActive: false },
    { number: 6, title: 'ID', isActive: false },
    { number: 7, title: 'Portfolio', isActive: false },
    { number: 8, title: 'Review', isActive: false }
];

const skills = [
    { name: 'Acting' },
    { name: 'Modeling' },
    { name: 'Dancing' }
];

const SkillsSelection: React.FC<OnboardingStepProps> = ({ activeStep, setActiveStep }) => {

    const router = useRouter();

    const handleContinue = () => {
        setActiveStep(activeStep + 1);
    };
    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        } else {
            router.push('/portal')
        }
    };

    const onClose = () => {
        router.push('/portal');
    }

    return (
        <Box sx={{ display: 'flex', overflow: 'hidden', flexDirection: 'column', backgroundColor: 'white' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: 'black', paddingBottom: '24px' }}>
                {/* Header Section */}
                <OnboardingHeader steps={steps} onClose={onClose} />

                {/* Skills Section */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingX: 4, paddingTop: 4 }}>
                    <Typography variant="h5" sx={{ textAlign: 'left', color: '#ceab76', paddingBottom: 3 }}>
                        Professional Skills
                    </Typography>
                    <TextField
                        variant="outlined"
                        placeholder="Click a Skill to added here..."
                        sx={{
                            backgroundColor: 'black',
                            border: '2px solid #CEAB76',
                            borderRadius: '12px',
                            color: '#fff',
                            width: '80vh',
                            '& .MuiOutlinedInput-input': {
                                padding: '12px 12px'
                            },
                            '& .MuiInputBase-input::placeholder': {
                                color: '#fff', 
                            },
                            '& .MuiInputBase-input': {
                                color: '#fff', 
                            },
                        }}
                    />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 2 }}>
                        {skills.map((skill) => (
                            <SkillTag key={skill.name} {...skill} />
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, marginLeft: 5, width: '50%', backgroundColor: 'black' }}>
                        <Button
                            sx={{
                                color: '#977342',
                                border: '2px solid #977342',
                                '&:hover': { color: '#fff' }
                            }}
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                        <Button
                            sx={{ color: '#000', backgroundColor: '#CEAB76' }}
                            onClick={handleContinue}
                        >
                            Continue
                        </Button>
                    </Box>
                </Box>


                {/* Step Indicator Section */}
                <Typography variant="caption" sx={{ paddingX: 2, paddingY: 1, marginTop: 4, color: 'gray', textAlign: 'center' }}>
                    Step {activeStep + 1} of 8 - Skills
                </Typography>
            </Box>

        </Box>
    );
};

export default SkillsSelection;