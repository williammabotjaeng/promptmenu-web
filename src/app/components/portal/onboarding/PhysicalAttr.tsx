import * as React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { AttributeInput } from './AttributeInput';
import { DropdownAttribute } from './DropdownAttribute';
import OnboardingHeader from '@/components/portal/onboarding/OnboardingHeader';
import { useRouter } from 'next/navigation';
import { OnboardingStepProps } from '@/types/Props/OnboardingStepProps';
import { useEffect, useState } from 'react';
import { useStore } from 'zustand';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store';
import { hairColorItems, eyeColorItems } from '@/types/Props/DropdownAttributeProps';

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

export const PhysicalAttributes: React.FC<OnboardingStepProps> = ({ activeStep, setActiveStep }) => {
  const router = useRouter();
  const { physicalAttributes, setPhysicalAttributes } = useStore(useTalentOnboardingStore);

  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    hairColor: '',
    eyeColor: ''
  });


  const onClose = () => {
    router.push('/portal');
  };

  const handleContinue = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleChange = (field: string) => (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value;

    console.log(`Field: ${field}, Value: ${value}`);

    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (physicalAttributes) {
      setFormData({
        height: physicalAttributes.height || '',
        weight: physicalAttributes.weight || '',
        eyeColor: physicalAttributes.eyeColor || '',
        hairColor: physicalAttributes.hairColor || '',
      });
    }
  }, [physicalAttributes]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'black', flexGrow: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: 'black', paddingBottom: '24px' }}>
        {/* Header Section */}
        <OnboardingHeader steps={steps} onClose={onClose} />

        {/* Physical Attributes Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingX: { xs: 2, md: 4 }, paddingTop: 4 }}>
          <Paper sx={{ display: 'flex', flexDirection: 'column', padding: 4, borderRadius: '8px', backgroundColor: 'rgba(75, 85, 99, 0.1)', width: '100%', maxWidth: '768px' }}>
            <Typography variant="h5" sx={{ color: '#977342', paddingBottom: 2, textAlign: 'center' }}>
              Physical Attributes
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 1, width: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap', gap: 2 }}>
                <AttributeInput label="Height" placeholder="cm" />
                <AttributeInput label="Weight" placeholder="kg" />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap', gap: 2, marginTop: 4, color: '#977342' }}>
                <DropdownAttribute onChange={handleChange} items={eyeColorItems} label="Eye Color" value="Brown" />
                <DropdownAttribute onChange={handleChange} items={hairColorItems} label="Hair Color" value="Black" />
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', paddingX: 2, marginLeft: { md: 36 }, marginTop: 4, width: { xs: '100%', md: '58%' } }}>
          <Button
            sx={{ color: '#977342', border: '2px solid #977342', '&:hover': { color: '#fff' }, marginBottom: { xs: 1, md: 0 } }}
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