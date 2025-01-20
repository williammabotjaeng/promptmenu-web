import * as React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { StepItem } from '@/components/portal/onboarding/StepItem';
import { FileUpload } from '@/components/portal/onboarding/FileUpload';
import OnboardingHeader from '@/components/portal/onboarding/OnboardingHeader';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import SSHGoldLogo from '@/assets/GoldLogo.png';
import { useRouter } from 'next/navigation';

const steps = [
  { number: 1, title: 'Headshot', isActive: true },
  { number: 2, title: 'Skills' },
  { number: 3, title: 'Payment' },
  { number: 4, title: 'Attributes' },
  { number: 5, title: 'Social' },
  { number: 6, title: 'ID' },
  { number: 7, title: 'Portfolio' },
  { number: 8, title: 'Review' }
];

const HeadshotUpload: React.FC<{ activeStep: number; setActiveStep: (step: number) => void; }> = ({ activeStep, setActiveStep }) => {
  
  const router = useRouter();
  
  const handleFileSelect = (file: File) => {
    console.log('Selected file:', file);
  };

  const handleContinue = () => {
    setActiveStep(activeStep + 1); 
  };

  const onClose = () => {
    router.push('/portal');
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: 'white', borderRadius: '8px', border: '2px solid gray' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: 'black' }}>
        {/* Header Section */}
        <OnboardingHeader steps={steps} oncClose={onClose} />

        {/* Upload Form Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <Paper
            elevation={3}
            sx={{
              backgroundColor: '#111111',
              padding: 4,
              borderRadius: '8px',
              width: '100%',
              maxWidth: '800px',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" sx={{ color: 'white', textAlign: 'left', marginLeft: 5, marginBottom: '-18px' }}>
              Upload Your Headshot
            </Typography>

            <FileUpload
              title=""
              supportedFormats="JPG, PNG"
              maxSize="5MB"
              onFileSelect={handleFileSelect}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1, marginLeft: 5, width: '90%' }}>
              <Button 
                sx={{ 
                  color: '#977342', 
                  border: '2px solid #977342', 
                  '&:hover': { color: '#fff' } 
                }}
                onClick={() => setActiveStep(activeStep - 1)} 
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