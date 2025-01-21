import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { EventUploadSection } from '@/components/dashboard/event/EventUploadSection';
import HeaderWithProgressBar from '@/components/dashboard/event/HeaderWithProgressBar';
import { PostEventStepProps } from '@/types/Props/PostEventStepProps';

const uploadSections = [
    {
        title: 'Poster Upload',
        icon: 'https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/c9cb08ccc0f6963f31697d1404addcab98b49964ba926f8a04f7413c67d2ef41?apiKey=7fae980a988640eea8add1e49a5d542e&',
        buttonText: 'Browse Files',
        description: 'Drag and drop your poster here or'
    },
    {
        title: 'Photos Upload',
        icon: 'https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/fa434d1823f81b8237ab966a891f147ddb96b8f1d4ebf7abd46a991f5e05d778?apiKey=7fae980a988640eea8add1e49a5d542e&',
        buttonText: 'Select Photos',
        description: 'Upload multiple photos'
    },
    {
        title: 'Videos Upload',
        icon: 'https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/4c05f86ba7f3ad0c21eef05c91b75187359070c929b36c59ae07108db1cc9c04?apiKey=7fae980a988640eea8add1e49a5d542e&',
        buttonText: 'Select Videos',
        description: 'Upload multiple videos'
    }
];

export const EventMedia: React.FC<PostEventStepProps> = ({ activeStep, setActiveStep }) => {

    const handleContinue = () => {
        setActiveStep(activeStep + 1);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                backgroundColor: '#fff',
                paddingBottom: '40px'
            }}
        >
            {/* Header with Step Navigation */}
            <HeaderWithProgressBar progressValue={66} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    borderRadius: 2,
                    marginRight: 18
                }}
            >
                <Box sx={{ padding: 3, position: 'relative' }}>
                    <Typography
                        variant="h4"
                        sx={{
                            color: '#CEAB76',
                            marginBottom: 2
                        }}
                    >
                        Upload Media
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: '50%',
                            padding: 1
                        }}>
                            <Box sx={{ marginTop: 4 }}>
                                <Box sx={{ width: '79%' }}>
                                    <EventUploadSection {...uploadSections[0]} />
                                </Box>
                                <Box sx={{ display: 'flex', gap: 20, marginTop: 2 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <EventUploadSection {...uploadSections[1]} />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <EventUploadSection {...uploadSections[2]} />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2, marginRight: '-132px' }}>
                        <Button
                            variant="outlined"
                            sx={{
                                marginRight: 2,
                                borderColor: '#977342',
                                color: '#977342',
                                '&:hover': {
                                    color: '#fff',
                                }
                            }}
                        >
                            Go Back
                        </Button>
                        <Button
                            onClick={handleContinue}
                            variant="contained"
                            sx={{
                                backgroundColor: '#977342',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#CEAB76',
                                }
                            }}
                        >
                            Final Step
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};