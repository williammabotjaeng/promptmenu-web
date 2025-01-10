import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

const CompanyInfo = ({ activeStep, companyData, setCompanyData }) => {
    return (
        <>
            {activeStep === 0 && (
                <Box className="w-full mx-auto">
                    <Typography variant="h6" className="mb-4">Company Information</Typography>
                    <Box className="mb-4">
                        <TextField
                            fullWidth
                            label="Company Name"
                            placeholder="Company Name"
                            variant="outlined"
                            value={companyData.name}
                            onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                        />
                    </Box>
                    <Box className="mb-4">
                        <TextField
                            fullWidth
                            label="Slogan"
                            placeholder="Slogan"
                            variant="outlined"
                            value={companyData.slogan}
                            onChange={(e) => setCompanyData({ ...companyData, slogan: e.target.value })}
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
                            value={companyData.description}
                            onChange={(e) => setCompanyData({ ...companyData, description: e.target.value })}
                        />
                    </Box>
                </Box>
            )}
        </>
    );
};

export default CompanyInfo;