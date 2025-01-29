import * as React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { SkillTag } from '@/components/portal/onboarding/SkillTag';
import OnboardingHeader from '@/components/portal/onboarding/OnboardingHeader';
import { useRouter } from 'next/navigation';
import { OnboardingStepProps } from '@/types/Props/OnboardingStepProps';
import { SkillType } from '@/types/Props/SkillTagProps';
import { useState } from 'react';

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

const skills: SkillType[] = [
    { name: 'Event Coordination' },
    { name: 'Project Management' },
    { name: 'Modeling' },
    { name: 'Event Executive' },
    { name: 'Ushering' },
    { name: 'Freelancing' },
    { name: 'Photography' },
    { name: 'Influencer Marketing' },
    { name: 'Sports Modeling' },
    { name: 'Security Management' },
    { name: 'Hosting' },
    { name: 'Videography' },
    { name: 'Event Management' },
    { name: 'Event Organization' },
    { name: 'Site Management' },
    { name: 'Journalism' },
];

const SkillsSelection: React.FC<OnboardingStepProps> = ({ activeStep, setActiveStep }) => {
    
    const [selectedSkills, setSelectedSkills] = useState<SkillType[]>([]);

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

    function handleSkillClick(skill: SkillType): void {
        throw new Error('Function not implemented.');
    }

    return (
        <Box sx={{ display: 'flex', overflow: 'hidden', flexDirection: 'column', backgroundColor: 'white' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: 'black', paddingBottom: '24px' }}>
                {/* Header Section */}
                <OnboardingHeader steps={steps} onClose={onClose} />

                {/* Skills Section */}
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', paddingX: { xs: 2, md: 4 }, paddingTop: 4 }}>
                    <Typography 
                        variant="h5" 
                        sx={{ 
                            textAlign: { xs: 'left', md: 'center' }, 
                            color: '#ceab76', 
                            paddingBottom: 1, 
                            marginRight: { xs: 0, md: 50 } 
                        }}
                    >
                        Professional Skills
                    </Typography>
                    <TextField
                        variant="outlined"
                        placeholder="Your skills will show here..."
                        sx={{
                            backgroundColor: 'black',
                            border: '1px solid #CEAB76',
                            color: '#fff',
                            width: '100%', 
                            maxWidth: '600px', 
                            borderRadius: '8px',
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
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 2, justifyContent: 'center' }}>
                        {skills.map((skill) => (
                            <SkillTag key={skill.name} skill={skill} selectedSkills={selectedSkills} handleSkillClick={handleSkillClick}/>
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', marginTop: 8, width: { xs: '100%', md: '50%' }, backgroundColor: 'black' }}>
                        <Button
                            sx={{
                                color: '#977342',
                                border: '2px solid #977342',
                                '&:hover': { color: '#fff' },
                                marginBottom: { xs: 1, md: 0 } // Margin for mobile
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