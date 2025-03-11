import * as React from 'react';
import { Box, Typography, Button, Input, IconButton, Avatar } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AddAPhoto } from '@mui/icons-material';
import { useStore } from 'zustand';
import { useCookies } from 'react-cookie';
import { Dispatch, useState } from 'react';
import useTalentOnboardingStore from '@/state/use-talent-onboarding-store';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';
import { TalentProfileData } from '@/types/TalentProfileData';

export interface FileUploadProps {
    title: string;
    supportedFormats: string;
    maxSize: string;
    onFileSelect: (file: File) => void;
    headshot: string;
    setHeadshot: Dispatch<any>;
    handleFileChange: (event: React.ChangeEvent<any>) => void;
    handleRemoveImage: () => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ 
    title, 
    supportedFormats, 
    maxSize, 
    onFileSelect, 
    headshot,
    setHeadshot,
    handleFileChange,
    handleRemoveImage
}) => {

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: { xs: 2, md: 3 },
                    width: '100%',
                    borderRadius: '16px',
                    backgroundColor: 'transparent',
                    paddingX: { xs: 2, md: 5 }
                }}
            >
                <Typography variant="h5" sx={{ pt: 1, pb: 2.5, color: 'white', textAlign: 'center' }}>
                    {title}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        px: { xs: 3, md: 5 },
                        py: { xs: 3, md: 4 },
                        borderColor: '#4B5563',
                        border: '2px dashed #CEAB76',
                        borderRadius: '8px',
                        backgroundColor: 'transparent',
                        width: '100%',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '36px', width: '45px' }}>
                        {!headshot ? (<CloudUploadIcon
                            sx={{
                                width: '45px',
                                height: 'auto',
                                objectFit: 'contain',
                                color: '#CEAB76'
                            }}
                            aria-label="Upload icon"
                        />) : (<PhotoCameraFrontIcon
                            sx={{
                                width: '45px',
                                height: 'auto',
                                objectFit: 'contain',
                                color: '#CEAB76'
                            }}
                            aria-label="Headshot icon"
                        />)}
                    </Box>
                    <Typography variant="body1" sx={{ color: 'white', textAlign: 'center' }}>
                        Drag and drop your headshot here or
                    </Typography>
                    {headshot && (<Box sx={{ flexDirection: 'column' }}>
                        <Avatar
                            src={headshot || ''}
                            sx={{ width: 150, height: 150, mt: 2 }}
                        />
                        <IconButton
                            onClick={handleRemoveImage}
                            sx={{
                                mt: 2,
                                backgroundColor: 'transparent',
                                color: 'red',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                },
                            }}
                        >
                            <DeleteIcon />
                        </IconButton></Box>
                    )}
                    {!headshot ? (<><IconButton color="primary" component="label">
                        <AddAPhoto sx={{ fontSize: '48px' }} />
                        <input type="file" hidden onChange={handleFileChange} />
                    </IconButton><Typography variant="caption" sx={{ mt: 2, color: 'gray', textAlign: 'center' }}>
                            {`Supported formats: ${supportedFormats} (Max size: ${maxSize})`}
                        </Typography></>) : null}
                </Box>
            </Box>
        </>
    );
};