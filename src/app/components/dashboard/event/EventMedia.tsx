"use client";

import React from 'react';
import { Box, Typography, Card, IconButton, Snackbar, Alert } from '@mui/material';
import { AddCircle, Delete } from '@mui/icons-material';

const EventMedia = ({ images, currentImageIndex, prevImage, nextImage, handleImageUpload, handleRemoveImage, snackbarOpen, handleSnackbarClose, snackbarSeverity, snackbarMessage }) => {
    return (
        <>
            <Typography color="black">Additional Images</Typography>
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                <Card sx={{
                    height: '80%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'transparent'
                }}>
                    {images.length > 0 ? (
                        <img src={images[currentImageIndex]} style={{ width: '60%', height: '100%', objectFit: 'cover' }} alt="Event" />
                    ) : (
                        <Typography sx={{ marginTop: '60px' }}>No Images uploaded</Typography>
                    )}
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

                    {images.length > 0 && (
                        <IconButton onClick={handleRemoveImage} sx={{ position: 'relative', left: 0, top: '50%', transform: 'translateY(-50%)', marginTop: '20px' }}>
                            <Delete color="error" />
                        </IconButton>
                    )}
                </Box>
            </Box>

            {/* PDF Upload Section */}
            <Box flex="1" display="flex" flexDirection="column" alignItems="center" sx={{
                border: '4px dotted black',
                margin: '4px',
                borderRadius: '12px',
                padding: '4px',
                height: '50vh'
            }}>
                <Typography color="black">Upload Event PDF</Typography>
                <IconButton color="primary" component="label" sx={{ marginTop: '10px' }}>
                    <AddCircle />
                    <input type="file" hidden accept="application/pdf" onChange={(e) => console.log(e.target.files[0])} />
                </IconButton>
            </Box>

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