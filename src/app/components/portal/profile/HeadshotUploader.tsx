import * as React from 'react';
import { Box, Typography, Paper, Button, Snackbar, Alert } from '@mui/material';
import { FileUpload } from '@/components/portal/onboarding/FileUpload';
import OnboardingHeader from '@/components/portal/onboarding/OnboardingHeader';
import { useRouter } from 'next/navigation';
import { OnboardingStepProps } from '@/types/Props/OnboardingStepProps';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store';
import { useStore } from 'zustand';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

const HeadshotUpload: React.FC = () => {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [cookies] = useCookies(['user_role']);

  const userRole = cookies['user_role'];

  const router = useRouter();

  const handleFileSelect = (file: File) => {
    console.log('Selected file:', file);
  };

  const onClose = () => {
    router.push('/portal');
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  }

    function handleContinue(event: any): void {
        throw new Error('Function not implemented.');
    }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: 'white', height: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: 'white' }}>

        {/* Upload Form Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', padding: { xs: 2, md: 4 } }}>
          <Paper
            elevation={3}
            sx={{
              backgroundColor: '#fff',
              padding: { xs: 3, md: 4 },
              borderRadius: '8px',
              width: '100%',
              maxWidth: '800px',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" sx={{ color: '#CEAB76', textAlign: 'left', marginBottom: 2 }}>
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
                  color: '#000',
                  backgroundColor: '#CEAB76',
                  width: { xs: '100%', md: 'auto' },
                  "&:hover": {
                    color: "white"
                  }
                }}
                onClick={handleContinue}
              >
                Save Headshot
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default HeadshotUpload;