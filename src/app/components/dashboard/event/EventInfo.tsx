"use client";

import React, { useState } from 'react';
import { Autocomplete, Box, Grid, TextField, Typography } from '@mui/material';
import useClientOnboardingStore from '@/state/use-client-onboarding-store';
import axios from 'axios';
import { useStore } from 'zustand';
import { useCookies } from 'react-cookie';

const inputStyles = {
    "& .MuiInputLabel-root.Mui-focused": {
      display: 'none'
    },
    "& .MuiInputLabel-root.Mui-shrink": {
      display: 'none',
    },
};

const EventInfo = ({ activeStep }) => {
    const [addressOptions, setAddressOptions] = useState([]);
    const [cookies, setCookie] = useCookies([
        'eventTitle', 'eventAddress', 'eventDescription'
    ]);
    const [addressInputValue, setAddressInputValue] = useState(cookies['eventAddress'] || '');
    const [eventTitle, setEventTitle] = useState(cookies['eventTitle'] || '');
    const [eventDescription, setEventDescription] = useState(cookies['eventDescription'] || '');

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target; 
        setCookie('eventAddress', value);
        setAddressInputValue(value); 
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target; 
        setCookie('eventTitle', value);
        setEventTitle(value); 
    };

    const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target; 
        setCookie('eventDescription', value);
        setEventDescription(value); 
    };
    
    const fetchAddressSuggestions = async (value) => {
        if (value.length > 2) {
          const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
            params: {
              q: value,
              format: 'json',
              addressdetails: 1,
              limit: 5,
            },
          });
          setAddressOptions(response.data);
        } else {
          setAddressOptions([]);
        }
      };

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
                            value={eventTitle}
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
                            onChange={handleTitleChange}
                        />
                    </Box>
                    {/* Address Field */}
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            freeSolo
                            options={addressOptions.map(option => option?.display_name)}
                            onInputChange={(event, newInputValue) => {
                                setAddressInputValue(newInputValue);
                                fetchAddressSuggestions(newInputValue);
                            }}
                            onChange={handleAddressChange}
                            sx={{
                                backgroundColor: 'transparent',
                                border: '1px solid black',
                                color: 'black'
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Enter your address"
                                    label={<Typography variant="body1">Address</Typography>}
                                    required
                                    fullWidth
                                    value={handleAddressChange}
                                    variant="outlined"
                                    className="custom-input"
                                    sx={inputStyles}
                                />
                            )}
                        />
                    </Grid>
                    <br />
                    <Box className="mb-4">
                        <TextField
                            fullWidth
                            label="Description"
                            placeholder="Description"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={eventDescription}
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
                            onChange={handleDescChange}
                        />
                    </Box>
                </Box>
            )}
        </>
    );
};

export default EventInfo;