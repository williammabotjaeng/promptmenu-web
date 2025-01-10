import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

const AddressAndContactInfo = ({ activeStep, contactInfoData, setContactInfoData }) => {
    return (
        <>
            {activeStep === 1 && (
                <Box className="w-full max-w-md mx-auto">
                    <Typography variant="h6" className="mb-4">Address and Contact Information</Typography>
                    <Box className="mb-4">
                        <TextField
                            fullWidth
                            label="Address"
                            placeholder="Address"
                            variant="outlined"
                            value={contactInfoData.address}
                            onChange={(e) => setContactInfoData({ ...contactInfoData, address: e.target.value })}
                        />
                    </Box>
                    <Box className="mb-4">
                        <TextField
                            fullWidth
                            label="Phone Number"
                            placeholder="Phone Number"
                            variant="outlined"
                            value={contactInfoData.phone_number}
                            onChange={(e) => setCompanyData({ ...contactInfoData, phone_number: e.target.value })}
                        />
                    </Box>
                    <Box className="mb-4">
                        <TextField
                            fullWidth
                            label="WhatsApp Number"
                            placeholder="WhatsApp Number"
                            variant="outlined"
                            value={contactInfoData.whatsapp_number}
                            onChange={(e) => setContactInfoData({ ...contactInfoData, whatsapp_number: e.target.value })}
                        />
                    </Box>
                </Box>
            )}
        </>
    );
};

export default AddressAndContactInfo;