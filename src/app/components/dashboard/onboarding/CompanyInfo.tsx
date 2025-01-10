import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

const CompanyInfo = ({ activeStep, companyInfo, setCompanyInfo }) => {
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
                            value={companyInfo.name}
                            onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                        />
                    </Box>
                    <Box className="mb-4">
                        <TextField
                            fullWidth
                            label="Slogan"
                            placeholder="Slogan"
                            variant="outlined"
                            value={companyInfo.slogan}
                            onChange={(e) => setCompanyInfo({ ...companyInfo, slogan: e.target.value })}
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
                            value={companyInfo.description}
                            onChange={(e) => setCompanyInfo({ ...companyInfo, description: e.target.value })}
                        />
                    </Box>
                </Box>
            )}
        </>
    );
};

export default CompanyInfo;