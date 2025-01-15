"use client";

import React from 'react';
import { Box, TextField } from '@mui/material';
import useClientOnboardingStore from '@/state/use-client-onboarding-store'; 
import { useStore } from 'zustand';

const EventInfo = ({ activeStep }) => {
    const { eventInfo, setEventInfo } = useStore(useClientOnboardingStore);

    return (
        <>
            {activeStep === 0 && (
                <Box 
                    className="w-75 mx-auto" 
                    sx={{
                        background: 'linear-gradient(135deg, #977342 0%, #b89a5a 50%, #d1c1a0 100%)',
                        padding: '20px',
                        borderRadius: '8px'
                    }}
                >
                    <Box className="mb-4">
                        <TextField
                            fullWidth
                            label="Event Title"
                            placeholder="Event Title"
                            variant="outlined"
                            value={eventInfo?.title}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: 'black', 
                                    },
                                    "&:hover fieldset": {
                                        borderColor: 'black', 
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: 'black', 
                                    },
                                },
                                "& .MuiInputLabel-root": {
                                    color: 'black', 
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: 'black', 
                                },
                            }}
                            onChange={(e) => setEventInfo({ ...eventInfo, title: e.target.value })}
                        />
                    </Box>
                    <Box className="mb-4">
                        <TextField
                            fullWidth
                            label="Location"
                            placeholder="Location"
                            variant="outlined"
                            value={eventInfo?.location}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: 'black', 
                                    },
                                    "&:hover fieldset": {
                                        borderColor: 'black', 
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: 'black', 
                                    },
                                },
                                "& .MuiInputLabel-root": {
                                    color: 'black', 
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: 'black', 
                                },
                            }}
                            onChange={(e) => setEventInfo({ ...eventInfo, location: e.target.value })}
                        />
                    </Box>
                    <Box className="mb-4">
                        <TextField
                            fullWidth
                            label="Description"
                            placeholder="Description"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={eventInfo?.description}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: 'black', 
                                    },
                                    "&:hover fieldset": {
                                        borderColor: 'black', 
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: 'black', 
                                    },
                                },
                                "& .MuiInputLabel-root": {
                                    color: 'black', 
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: 'black', 
                                },
                            }}
                            onChange={(e) => setEventInfo({ ...eventInfo, description: e.target.value })}
                        />
                    </Box>
                </Box>
            )}
        </>
    );
};

export default EventInfo;