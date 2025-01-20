import * as React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { StepItem } from '@/components/portal/onboarding/StepItem';
import { SkillTag } from '@/components/portal/onboarding/SkillTag';
import OnboardingHeader from '@/components/portal/onboarding/OnboardingHeader';
import { useRouter } from 'next/navigation';
import { OnboardingHeaderProps } from '@/types/Props/OnboardingHeaderProps';

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

const SkillsSelection: React.FC<OnboardingHeaderProps> = ({ activeStep, setActiveStep }) => {
    
    const router = useRouter();

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
          <Typography variant="h5" sx={{ color: 'orange', paddingBottom: 3 }}>
            Professional Skills
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Add your skills..."
            sx={{
              backgroundColor: 'black',
              borderColor: '#4B5563', 
              color: 'gray',
              '& .MuiOutlinedInput-input': {
                padding: '16px 16px'
              }
            }}
          />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 2 }}>
            {skills.map((skill) => (
              <SkillTag key={skill.name} {...skill} />
            ))}
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