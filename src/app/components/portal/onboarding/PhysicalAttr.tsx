import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

const PhysicalAttributes = ({ physicalAttr, setPhysicalAttr, activeStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPhysicalAttr((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {activeStep === 2 && (
        <Box>
          <Box>
            <TextField
              label="Height"
              name="height"
              value={physicalAttr.height}
              onChange={handleChange}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Weight"
              name="weight"
              value={physicalAttr.weight}
              onChange={handleChange}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Ethnicity"
              name="ethnicity"
              value={physicalAttr.ethnicity}
              onChange={handleChange}
              margin="normal"
              fullWidth
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default PhysicalAttributes;