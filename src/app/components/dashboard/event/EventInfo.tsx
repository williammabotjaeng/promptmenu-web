"use client";

import React, { useState } from 'react';
import { Autocomplete, Box, Grid, TextField, Typography } from '@mui/material';
import useClientOnboardingStore from '@/state/use-client-onboarding-store';
import axios from 'axios';
import { useStore } from 'zustand';

const inputStyles = {
    "& .MuiInputLabel-root.Mui-focused": {
      display: 'none'
    },
    "& .MuiInputLabel-root.Mui-shrink": {
      display: 'none',
    },
};

const EventInfo = ({ activeStep }) => {
    const { eventInfo, setEventInfo } = useStore(useClientOnboardingStore);
    const [addressOptions, setAddressOptions] = useState([]);
    const [addressInputValue, setAddressInputValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
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
                    {/* Address Field */}
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            freeSolo
                            options={addressOptions.map(option => option?.display_name)}
                            onInputChange={(event, newInputValue) => {
                                setAddressInputValue(newInputValue);
                                fetchAddressSuggestions(newInputValue);
                            }}
                            onChange={(event, newValue) => {
                                setAddressInputValue(newValue);
                                handleChange({ target: { name: 'address', value: newValue } });
                            }}
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