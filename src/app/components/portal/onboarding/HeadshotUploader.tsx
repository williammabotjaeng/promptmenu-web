import * as React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { FileUpload } from '@/components/portal/onboarding/FileUpload';
import OnboardingHeader from '@/components/portal/onboarding/OnboardingHeader';
import { useRouter } from 'next/navigation';
import { OnboardingStepProps } from '@/types/Props/OnboardingStepProps';

const steps = [
  { number: 1, title: 'Headshot', isActive: true },
  { number: 2, title: 'Skills', isActive: false },
  { number: 3, title: 'Payment', isActive: false },
  { number: 4, title: 'Attributes', isActive: false },
  { number: 5, title: 'Social', isActive: false },
  { number: 6, title: 'ID', isActive: false },
  { number: 7, title: 'Portfolio', isActive: false },
  { number: 8, title: 'Review', isActive: false }
];

const HeadshotUpload: React.FC<OnboardingStepProps> = ({ activeStep, setActiveStep }) => {
  
  const router = useRouter();
  
  const handleFileSelect = (file: File) => {
    console.log('Selected file:', file);
  };

  const handleContinue = () => {
    setActiveStep(activeStep + 1); 
  };
  
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1); 
    } else {
      router.push('/portal');
    }
  };

  const onClose = () => {
    router.push('/portal');
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: 'white', height: '100vh' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: 'black' }}>
        {/* Header Section */}
        <OnboardingHeader steps={steps} onClose={onClose} />

        {/* Upload Form Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', padding: { xs: 2, md: 4 } }}>
          <Paper
            elevation={3}
            sx={{
              backgroundColor: '#111111',
              padding: { xs: 3, md: 4 },
              borderRadius: '8px',
              width: '100%',
              maxWidth: '800px',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" sx={{ color: 'white', textAlign: 'left', marginBottom: 2 }}>
              Upload Your Headshot
            </Typography>

            <FileUpload
              title=""
              supportedFormats="JPG, PNG"
              maxSize="5MB"
              onFileSelect={handleFileSelect}
            />
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', marginTop: 2, width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
              <Button 
                sx={{ 
                  color: '#977342', 
                  border: '2px solid #977342', 
                  '&:hover': { color: '#fff' },
                  width: { xs: '100%', md: 'auto' }, // Full width on mobile
                  marginBottom: { xs: 1, md: 0 } // Margin for mobile
                }}
                onClick={handleBack} 
              >
                Back
              </Button>
              <Button 
                sx={{ 
                  color: '#000', 
                  backgroundColor: '#CEAB76', 
                  width: { xs: '100%', md: 'auto' } // Full width on mobile
                }} 
                onClick={handleContinue} 
              >
                Continue
              </Button>
            </Box>
          </Paper>
        </Box>

        {/* Step Indicator Section */}
        <Typography variant="caption" sx={{ paddingX: 2, paddingY: 1, marginBottom: 0, color: 'gray', textAlign: 'center' }}>
          Step {activeStep + 1} of 8 - Headshot Upload
        </Typography>
      </Box>
    </Box>
  );
};

export default HeadshotUpload;