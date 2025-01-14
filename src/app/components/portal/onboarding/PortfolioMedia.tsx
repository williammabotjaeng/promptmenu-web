"use client";

import React, { useState } from 'react';
import { Box, Avatar, IconButton, Snackbar, Alert, Button, Typography } from '@mui/material';
import { AddAPhoto, AddCircle, Close, Delete, PictureAsPdf } from '@mui/icons-material';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store';
import { TalentProfileData } from '@/types/TalentProfileData';
import { useStore } from 'zustand';
import { useCookies } from 'react-cookie';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Document, Page } from 'react-pdf';
import ReactPlayer from 'react-player';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const PortfolioMedia = ({ activeStep }) => {
    const { talentData, setTalentData } = useStore(useTalentOnboardingStore);
    const [images, setImages] = useState<string[]>([]);
    const [pdf, setPdf] = useState<string | null>(null);
    const [video, setVideo] = useState<string | null>(null);
    const [cookies, setCookie] = useCookies(['portfolioBlobUrl', 'portfolioVideo', 'portfolioImages', 'portfolioPdf']);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            const newImages = files.map(file => URL.createObjectURL(file));
            setImages(prev => [...prev, ...newImages]);
            setCookie('portfolioImages', [...images, ...newImages]);
            setSnackbarMessage('Images Uploaded Successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        }
    };

    const handleRemoveImage = () => {
        const updatedImages = images.filter((_, i) => i !== currentImageIndex);
        setImages(updatedImages);
        setCookie('portfolioImages', updatedImages);
        setSnackbarMessage('Image Deleted Successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      };

    const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const objectUrl = URL.createObjectURL(file);
            setPdf(objectUrl);
            setCookie('portfolioPdf', objectUrl);
            setSnackbarMessage('PDF Uploaded Successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        }
    };

    const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const objectUrl = URL.createObjectURL(file);
            setVideo(objectUrl);
            setCookie('portfolioVideo', objectUrl);
            setSnackbarMessage('Video Uploaded Successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        }
    };

    const handleRemovePdf = () => {
        setPdf(null);
        setCookie('portfolioPdf', null);
    };

    const handleRemoveVideo = () => {
        setVideo(null);
        setCookie('portfolioVideo', null);
    };

    const handleSave = async () => {
        setTalentData((prev: TalentProfileData) => ({
            ...prev,
            portfolioImages: images,
            portfolioPdf: pdf,
            portfolioVideo: video,
        }));
        setSnackbarMessage('Portfolio Saved Successfully');
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
            {activeStep === 6 && (
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
                        <Typography color="black">Additional Images</Typography>
                        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                            <Card sx={{
                                height: '80%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                {images.length > 0 ? (
                                    <img src={images[currentImageIndex]} style={{ width: '60%', height: '100%', objectFit: 'cover' }} />
                                ) : <Typography sx={{ marginTop: '60px' }}>No Images uploaded</Typography>}
                            </Card>
                            <IconButton onClick={prevImage} sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}>
                                <AddCircle />
                            </IconButton>
                            <IconButton onClick={nextImage} sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
                                <AddCircle />
                            </IconButton>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                                <IconButton color="primary" component="label" sx={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', marginTop: '10px' }}>
                                    <AddCircle />
                                    <input type="file" hidden accept="image/*" multiple onChange={handleImageUpload} />
                                </IconButton>

                                {images?.length > 0 && (<IconButton onClick={handleRemoveImage} sx={{ position: 'relative', left: 0, top: '50%', transform: 'translateY(-50%)', marginTop: '20px' }}>
                                    <Delete color="error" />
                                </IconButton>)}
                            </Box>
                        </Box>
                    </Box>

                    {/* PDF Column */}
                    <Box flex="1" display="flex" flexDirection="column" alignItems="center" sx={{
                        border: '4px dotted black',
                        margin: '4px',
                        borderRadius: '12px',
                        padding: '4px',
                        height: '50vh'
                    }}>
                        <Typography color="black">PDF Portfolio</Typography>
                        {pdf ? (
                            <Box display="flex" alignItems="center">
                                <PictureAsPdf sx={{ fontSize: 50, color: 'red' }} />
                                <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>{cookies['portfolioPdf']?.split('/').pop()}</Typography>
                                <IconButton color="error" onClick={handleRemovePdf}>
                                    <Close />
                                </IconButton>
                            </Box>
                        ) : (
                            <IconButton color="primary" component="label" sx={{ marginTop: 2 }}>
                                <AddAPhoto />
                                <input type="file" hidden accept="application/pdf" onChange={handlePdfUpload} />
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
                        <Typography color="black">Promo Video</Typography>
                        {video ? (
                            <Box>
                                <ReactPlayer url={video} controls width="100%" height="auto" />
                                <Typography variant="subtitle1">{cookies['portfolioVideo']?.split('/').pop()}</Typography>
                                <IconButton color="error" onClick={handleRemoveVideo}>
                                    <Close />
                                </IconButton>
                            </Box>
                        ) : (
                            <IconButton color="primary" component="label" sx={{ marginTop: 2 }}>
                                <AddAPhoto />
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

export default PortfolioMedia;