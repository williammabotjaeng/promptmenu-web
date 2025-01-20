import * as React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { StepItem } from './StepItem';
import { AttributeInput } from './AttributeInput';
import { DropdownAttribute } from './DropdownAttribute';
import OnboardingHeader from '@/components/portal/onboarding/OnboardingHeader';
import { useRouter } from 'next/navigation';

const steps = [
  { number: 1, title: 'Headshot', isActive: false },
  { number: 2, title: 'Skills', isActive: false },
  { number: 3, title: 'Payment', isActive: false },
  { number: 4, title: 'Attributes', isActive: true },
  { number: 5, title: 'Social', isActive: false },
  { number: 6, title: 'ID', isActive: false },
  { number: 7, title: 'Portfolio', isActive: false },
  { number: 8, title: 'Review', isActive: false }
];

export const PhysicalAttributes: React.FC<{ activeStep: number; setActiveStep: (step: number) => void; }> = ({ activeStep, setActiveStep }) => {
  const router = useRouter();

  const onClose = () => {
    router.push('/portal');
  };

  const handleContinue = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'black', backgroundOpacity: 0 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: 'black', paddingBottom: '24px' }}>
        {/* Header Section */}
        <OnboardingHeader steps={steps} onClose={onClose} />

        {/* Physical Attributes Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingX: 4, paddingTop: 4 }}>
          <Paper sx={{ display: 'flex', flexDirection: 'column', padding: 4, borderRadius: '8px', backgroundColor: 'rgba(75, 85, 99, 0.1)', width: '100%', maxWidth: '768px' }}>
            <Typography variant="h5" sx={{ color: 'orange', paddingBottom: 2 }}>
              Physical Attributes
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 4, width: '100%' }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                <AttributeInput label="Height" placeholder="cm" />
                <AttributeInput label="Weight" placeholder="kg" />
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4, color: 'orange' }}>
                <DropdownAttribute label="Eye Color" value="Brown" />
                <DropdownAttribute label="Hair Color" value="Black" />
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingX: 4, marginTop: 4 }}>
          <Button 
            sx={{ color: '#977342', border: '2px solid #977342', '&:hover': { color: '#fff' } }} 
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

        {/* Step Indicator Section */}
        <Typography variant="caption" sx={{ paddingX: 2, paddingY: 1, marginTop: 4, color: 'gray', textAlign: 'center' }}>
          Step {activeStep + 1} of 8 - Physical Attributes
        </Typography>
      </Box>
    </Box>
  );
};