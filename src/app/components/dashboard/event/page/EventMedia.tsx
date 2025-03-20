import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { EventUploadSection } from '@/components/dashboard/event/page/EventUploadSection';
import { PostEventStepProps } from '@/types/Props/PostEventStepProps';
import EventIconOne from '@/assets/event_icon_one.svg';
import EventIconTwo from '@/assets/event_icon_two.svg';
import EventIconThree from '@/assets/event_icon_three.svg';
import { EventMediaType } from '@/state/use-event-store';
import { useCookies } from 'react-cookie';
import SaveIcon from "@mui/icons-material/Save"; 
import PhotoGrid from './PhotoGrid';

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

export const EventMedia: React.FC = () => {

    const [cookies] = useCookies([
        'event_video',
        'event_photos',
        'event_poster'
    ]);

    const titleMapping: Record<keyof EventMediaType, string> = {
        'eventPromoVideo': 'Promo Video',
        'eventPhotos': 'Event Photos',
        'eventPoster': 'Event Poster',
      };

    const handleSave = () => {

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
                paddingBottom: '40px',
                paddingX: { xs: 2, sm: 4 }, // Responsive horizontal padding
            }}
        >
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
             <PhotoGrid images={[]} onImageUpload={null} onDeleteImage={null} imagesToDelete={[]} />
            </Box>
        </Box>
    );
};