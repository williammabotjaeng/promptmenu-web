import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { EventUploadSection } from '@/components/dashboard/event/EventUploadSection';
import HeaderWithProgressBar from '@/components/dashboard/event/HeaderWithProgressBar';
import { PostEventStepProps } from '@/types/Props/PostEventStepProps';
import EventIconOne from '@/assets/event_icon_one.svg';
import EventIconTwo from '@/assets/event_icon_two.svg';
import EventIconThree from '@/assets/event_icon_three.svg';
import { EventMediaType } from '@/state/use-event-store';

const uploadSections = [
    {
        title: 'Poster Upload',
        icon: EventIconThree?.src,
        buttonText: 'Browse Files',
        description: 'Drag and drop your poster here or'
    },
    {
        title: 'Photos Upload',
        icon: EventIconTwo?.src,
        buttonText: 'Select Photos',
        description: 'Upload multiple photos'
    },
    {
        title: 'Videos Upload',
        icon: EventIconOne?.src,
        buttonText: 'Select Videos',
        description: 'Upload multiple videos'
    }
];

export const EventMedia: React.FC<PostEventStepProps> = ({ activeStep, setActiveStep }) => {

    const handleContinue = () => {
        setActiveStep(activeStep + 1);
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    }

    const titleMapping: Record<keyof EventMediaType, string> = {
        eventPromoVideo: 'Promo Video',
        eventPhotos: 'Event Photos',
        eventPoster: 'Event Poster',
      };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                backgroundColor: '#fff',
                paddingBottom: '40px',
                paddingX: { xs: 2, sm: 4 }, // Responsive horizontal padding
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
                    width: { xs: '100%', sm: '80%', md: '60%' }, // Responsive width
                    margin: '0 auto', // Center the box
                }}
            >
                <Box sx={{ padding: 3, position: 'relative' }}>
                    <Typography
                        variant="h4"
                        sx={{
                            color: '#CEAB76',
                            marginBottom: 2,
                            textAlign: 'center', // Center the title
                        }}
                    >
                        Upload Media
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <EventUploadSection 
                            onProceed={null} 
                            type="single" 
                            mediaType="photo" 
                            title={"eventPoster"} 
                            icon={uploadSections[0]?.icon} 
                            buttonText={uploadSections[0]?.title} 
                            description={uploadSections[0]?.description}  
                        />
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                            <EventUploadSection 
                                onProceed={null} 
                                type="multiple" 
                                mediaType="photo" 
                                title={"eventPhotos"}
                                icon={uploadSections[1]?.icon}
                                buttonText={uploadSections[1]?.title}
                                description={uploadSections[1]?.description}
                             />
                            <EventUploadSection 
                                onProceed={null} 
                                type="single" 
                                mediaType="video" 
                                title={"eventPromoVideo"}
                                buttonText={uploadSections[2]?.title}
                                icon={uploadSections[2]?.icon}
                                description={uploadSections[2]?.description} 
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
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
                            onClick={handleBack}
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