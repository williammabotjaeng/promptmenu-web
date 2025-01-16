"use client";

import React, { useEffect, useState } from 'react';
import { Box, Avatar, IconButton, Snackbar, Alert, Button, Typography, ImageListItem, ImageList } from '@mui/material';
import { AddAPhoto, AddCircle, Close, Delete, PictureAsPdf } from '@mui/icons-material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store';
import { TalentProfileData } from '@/types/TalentProfileData';
import { useStore } from 'zustand';
import { useCookies } from 'react-cookie';
import Card from '@mui/material/Card';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { Document, Page } from 'react-pdf';
import ReactPlayer from 'react-player';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const EventMedia = ({ activeStep }) => {
    const { talentData, setTalentData } = useStore(useTalentOnboardingStore);
    
    const [cookies, setCookie] = useCookies(['eventVideo', 'eventImages', 'posterImage']);

    const [images, setImages] = useState<string[]>(cookies['eventImages'] ? Array.from(cookies?.eventImages) : ['']);
    const [posterImage, setPosterImage] = useState(cookies['posterImage'] || '');
    const [video, setVideo] = useState(cookies?.eventVideo || '');
    

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            const newImages = files.map(file => URL.createObjectURL(file));
            setImages(prev => [...prev, ...newImages]);
            setCookie('eventImages', [...images, ...newImages]);
            setSnackbarMessage('Images Uploaded Successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        }
    };

    const handlePosterImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setPosterImage(imageUrl);
            setCookie('posterImage', imageUrl); 
            setSnackbarMessage('Image Uploaded Successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        }
    };

    const handleRemovePosterImage = () => {
        setPosterImage(null);
        setCookie('posterImage', '');
    };

    const handleRemoveImage = () => {
        const updatedImages = images.filter((_, i) => i !== currentImageIndex);
        setImages(updatedImages);
        setCookie('eventImages', updatedImages);
        setSnackbarMessage('Image Deleted Successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
    };

    const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const objectUrl = URL.createObjectURL(file);
            setVideo(objectUrl);
            setCookie('eventVideo', objectUrl);
            setSnackbarMessage('Video Uploaded Successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        }
    };

    const handleRemoveVideo = () => {
        setVideo(null);
        setCookie('eventVideo', null);
    };

    const handleSave = async () => {
        setTalentData((prev: TalentProfileData) => ({
            ...prev,
            portfolioImages: images,
            portfolioPdf: pdf,
            portfolioVideo: video,
        }));
        setSnackbarMessage('Event Saved Successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // Custom image slider state
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    
    return (
        <>
            {activeStep === 1 && (
                <Box className="w-full mx-auto" display="flex" justifyContent="space-between" alignItems="flex-start" sx={{
                    height: '50vh',
                    width: '90vw'
                }}>
                    {/* Images Column */}
                    <Box flex="1" display="flex" flexDirection="column" alignItems="center" sx={{
                        border: '4px dotted black',
                        margin: '4px',
                        borderRadius: '12px',
                        padding: '4px',
                        height: '50vh'
                    }}>
                        <Typography color="white" sx={{
                            backgroundColor: 'black',
                            width: '100%'
                        }}>Event Images</Typography>
                        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                            <Card sx={{
                                height: '80%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'transparent'
                            }}>
                                {(images.length > 0 && images[currentImageIndex]  !== '') ? (
                                    <img src={images[currentImageIndex]} style={{ width: '60%', height: '100%', objectFit: 'cover' }} />
                                ) : images.length > 0 ?  (<Typography sx={{ marginTop: '60px' }}>Saved Images Loaded</Typography>) : (<Typography sx={{ marginTop: '60px' }}>No Images uploaded</Typography>)}
                            </Card>
                            <IconButton onClick={prevImage} sx={{ color: 'black', position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}>
                                <ArrowCircleLeftIcon />
                            </IconButton>
                            <IconButton onClick={nextImage} sx={{ color: 'black', position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
                                <ArrowCircleRightIcon />
                            </IconButton>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                                <IconButton component="label" sx={{ color: 'black', position: 'absolute', bottom: 15, left: '50%', transform: 'translateX(-50%)' }}>
                                    <AddCircle />
                                    <input type="file" hidden accept="image/*" multiple onChange={handleImageUpload} />
                                </IconButton>

                                {images?.length > 0 && (<IconButton onClick={handleRemoveImage} sx={{ position: 'relative', left: 0, top: '50%', transform: 'translateY(-50%)', marginTop: '20px' }}>
                                    <Delete color="error" />
                                </IconButton>)}
                            </Box>
                        </Box>
                    </Box>

                    {/* Event Poster */}
                    <Box flex="1" display="flex" flexDirection="column" alignItems="center" sx={{
                        border: '4px dotted black',
                        margin: '4px',
                        borderRadius: '12px',
                        padding: '4px',
                        height: '50vh'
                    }}>
                        <Typography color="white" sx={{
                            backgroundColor: 'black',
                            width: '100%'
                        }}>Event Poster</Typography>
                        {posterImage ? (
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <ImageList sx={{ width: '80%', height: '60%', overflow: 'hidden' }} cols={1}>
                                    <ImageListItem>
                                        <img
                                            src={posterImage}
                                            alt="Uploaded"
                                            style={{ borderRadius: '8px', objectFit: 'cover', height: '100%', width: '100%' }}
                                        />
                                    </ImageListItem>
                                </ImageList>
                                <IconButton color="error" sx={{
                                    marginTop: '-10px'
                                }} onClick={handleRemovePosterImage}>
                                    <Close />
                                </IconButton>
                            </Box>
                        ) : (
                            <IconButton color="primary" component="label" sx={{ marginTop: 4 }}>
                                <AddAPhotoIcon
                                    sx={{
                                        height: '20vh',
                                        width: '20vh',
                                        fontSize: '80px',
                                        color: 'black',
                                        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
                                        borderRadius: '8px',
                                        backgroundColor: 'transparent',
                                        transition: 'transform 0.3s',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                        },
                                    }}
                                />
                                <input type="file" hidden accept="image/jpeg, image/png, image/gif" onChange={handlePosterImageUpload} />
                            </IconButton>
                        )}
                    </Box>

                    {/* Video Column */}
                    <Box flex="1" display="flex" flexDirection="column" alignItems="center" sx={{
                        border: '4px dotted black',
                        margin: '4px',
                        borderRadius: '12px',
                        padding: '4px',
                        height: '50vh'
                    }}>
                        <Typography color="white" sx={{
                            backgroundColor: 'black',
                            width: '100%'
                        }}>Promo Video</Typography>
                        {video ? (
                            <Box sx={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '12px',
                            }}>
                                <ReactPlayer url={video} style={{
                                    borderRadius: '32px',
                                    boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.3)',
                                    marginTop: '10px'
                                }} controls width="100%" height="80%" />
                                <IconButton color="error" onClick={handleRemoveVideo}>
                                    <Close />
                                </IconButton>
                            </Box>
                        ) : (
                            <IconButton color="primary" component="label" sx={{ marginTop: 4 }}>
                                <VideoCallIcon
                                    sx={{
                                        height: '20vh',
                                        width: '20vh',
                                        fontSize: '80px',
                                        color: 'black',
                                        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
                                        borderRadius: '8px',
                                        backgroundColor: 'transparent',
                                        transition: 'transform 0.3s',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                        },
                                    }}
                                />
                                <input type="file" hidden accept="video/mp4" onChange={handleVideoUpload} />
                            </IconButton>
                        )}
                    </Box>
                </Box>
            )}

            <Button
                variant="contained"
                onClick={handleSave}
                sx={{
                    marginTop: 2, backgroundColor: '#000', color: '#977342', position: 'absolute',
                    top: '16px',
                    right: '16px',
                    '&:hover': {
                        backgroundColor: '#CEAB76',
                        color: '#000',
                    },
                }}
            >
                Save Portfolio
            </Button>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%', color: '#977342', backgroundColor: 'black' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default EventMedia;