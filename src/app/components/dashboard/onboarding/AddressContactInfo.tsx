import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import useClientOnboardingStore from '@/state/use-client-onboarding-store'; 

const AddressAndContactInfo = ({ activeStep }) => {
    const { contactInfo, setContactInfo } = useClientOnboardingStore();

    return (
        <>
            {activeStep === 1 && (
                <Box className="w-full max-w-md mx-auto">
                    <Box className="mb-4">
                        <TextField
                            fullWidth
                            label="Address"
                            placeholder="Address"
                            variant="outlined"
                            value={contactInfo?.address}
                            onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                        />
                    </Box>
                    <Box className="mb-4">
                        <TextField
                            fullWidth
                            label="Phone Number"
                            placeholder="Phone Number"
                            variant="outlined"
                            value={contactInfo?.phone_number}
                            onChange={(e) => setContactInfo({ ...contactInfo, phone_number: e.target.value })}
                        />
                    </Box>
                    <Box className="mb-4">
                        <TextField
                            fullWidth
                            label="WhatsApp Number"
                            placeholder="WhatsApp Number"
                            variant="outlined"
                            value={contactInfo?.whatsapp_number}
                            onChange={(e) => setContactInfo({ ...contactInfo, whatsapp_number: e.target.value })}
                        />
                    </Box>
                </Box>
            )}
        </>
    );
};

export default AddressAndContactInfo;