"use client";

import React from 'react';
import { Box, Typography, Grid, Avatar, Card, IconButton } from '@mui/material';
import { useCookies } from 'react-cookie';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ReactPlayer from 'react-player';

const EventReview = () => {
    const [cookies] = useCookies([
        'eventTitle',
        'eventAddress',
        'eventDescription',
        'eventImages',
        'posterImage',
        'eventVideo',
    ]);

    const eventTitle = cookies?.eventTitle || 'N/A';
    const eventAddress = cookies?.eventAddress || 'N/A';
    const eventDescription = cookies?.eventDescription || 'N/A';
    const eventImages = cookies?.eventImages ? Array.from(cookies.eventImages) : [];
    const posterImage = cookies?.posterImage || '';
    const eventVideo = cookies?.eventVideo || '';

    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % eventImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + eventImages.length) % eventImages.length);
    };

    return (
        <Box sx={{ padding: { xs: 2, sm: 3, md: 4 }, bgcolor: 'background.default' }}>
            <Typography variant="h5" sx={{ color: 'black', marginBottom: 2 }}>
                Review Your Event
            </Typography>
            <Grid container spacing={2}>
                {/* Event Info Section */}
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" sx={{ color: 'black' }}>Event Information:</Typography>
                    <Typography sx={{ color: 'black' }}>Title: {eventTitle}</Typography>
                    <Typography sx={{ color: 'black' }}>Address: {eventAddress}</Typography>
                    <Typography sx={{ color: 'black' }}>Description: {eventDescription}</Typography>
                </Grid>

                {/* Poster Image Section */}
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" sx={{ color: 'black' }}>Event Poster:</Typography>
                    {posterImage ? (
                        <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 1 }}>
                            <img
                                src={posterImage}
                                alt="Event Poster"
                                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                            />
                        </Card>
                    ) : (
                        <Typography sx={{ color: 'black' }}>No Poster Uploaded</Typography>
                    )}
                </Grid>

                {/* Event Images Section */}
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ color: 'black' }}>Event Images:</Typography>
                    <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {eventImages.length > 0 ? (
                            <>
                                <Card sx={{ width: { xs: '100%', sm: '80%', md: '60%' }, height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img
                                        src={String(eventImages[currentImageIndex])}
                                        alt={`Event Image ${currentImageIndex + 1}`}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                    />
                                </Card>
                                <IconButton
                                    onClick={prevImage}
                                    sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', color: 'black' }}
                                >
                                    <ArrowCircleLeftIcon />
                                </IconButton>
                                <IconButton
                                    onClick={nextImage}
                                    sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: 'black' }}
                                >
                                    <ArrowCircleRightIcon />
                                </IconButton>
                            </>
                        ) : (
                            <Typography sx={{ color: 'black' }}>No Images Uploaded</Typography>
                        )}
                    </Box>
                </Grid>

                {/* Event Video Section */}
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ color: 'black' }}>Event Video:</Typography>
                    {eventVideo ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
                            <ReactPlayer
                                url={eventVideo}
                                controls
                                width="100%"
                                height="400px"
                                style={{ borderRadius: '8px', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)' }}
                            />
                        </Box>
                    ) : (
                        <Typography sx={{ color: 'black' }}>No Video Uploaded</Typography>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default EventReview;