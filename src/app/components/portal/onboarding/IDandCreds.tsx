import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography, Input } from '@mui/material';

const IDandCreds = ({ 
    activeStep,
    governmentID,
    setGovernmentID,
    bankDetails,
    setBankDetails
 }) => {
  
  const [fileName, setFileName] = useState(''); 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setGovernmentID(file);
    setFileName(file ? file.name : ''); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {activeStep === 3 && (
        <Box>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            inputProps={{ style: { display: 'none' } }} 
            id="government-id-upload"
          />
          <label htmlFor="government-id-upload">
            <Button variant="contained" component="span" style={{ margin: '20px 0' }}>
              Upload Government ID
            </Button>
          </label>
          {fileName && <Typography variant="body2" style={{ marginTop: '10px', color: 'black' }}>{fileName}</Typography>} 
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Account Holder's Name"
                name="accountHolderName"
                value={bankDetails.accountHolderName}
                onChange={handleChange}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Bank Name"
                name="bankName"
                value={bankDetails.bankName}
                onChange={handleChange}
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Account Number"
                name="accountNumber"
                value={bankDetails.accountNumber}
                onChange={handleChange}
                margin="normal"
                fullWidth
              />
              <TextField
                label="IBAN"
                name="iban"
                value={bankDetails.iban}
                onChange={handleChange}
                margin="normal"
                fullWidth
              />
            </Grid>
          </Grid>
          
        </Box>
      )}
    </>
  );
};

export default IDandCreds;