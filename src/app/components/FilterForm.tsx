import React from "react";
import { Box, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function FilterForm() {
  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }, // Column on small screens, row on medium and up
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingX: 2,
        paddingY: 1,
        marginTop: 3.5,
        marginLeft: { md: '20px' },
        width: '100%',
        maxWidth: '1000px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Column on small screens, row on medium and up
          justifyContent: 'center',
          padding: 3,
          width: '100%',
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        {/* Filter Controls */}
        {['Skill', 'Location', 'Ethnicity', 'Gender'].map((label, index) => (
          <FormControl variant="outlined" fullWidth sx={{ margin: { xs: '8px 0', md: '0 8px' }, width: { xs: '100%', md: '200px' } }} key={index}>
            <InputLabel id={`${label.toLowerCase()}-label`} sx={{ textAlign: 'center' }}>{`Select ${label}`}</InputLabel>
            <Select
              labelId={`${label.toLowerCase()}-label`}
              label={`Select ${label}`}
              sx={{ padding: '1px 16px', borderRadius: 2 }}
            >
              <MenuItem value="">
                <em>Select {label}</em>
              </MenuItem>
              {/* Add more menu items as needed */}
            </Select>
          </FormControl>
        ))}
        {/* Wider Experience Input */}
        <FormControl variant="outlined" fullWidth sx={{ margin: { xs: '8px 0', md: '0 8px' }, width: { xs: '100%', md: '250px' } }}>
          <InputLabel id="experience-label" sx={{ textAlign: 'center' }}>Experience</InputLabel>
          <Select
            labelId="experience-label"
            label="Experience"
            sx={{ padding: '1px 16px', borderRadius: 2 }}
          >
            <MenuItem value="">
              <em>Experience</em>
            </MenuItem>
            {/* Add more menu items as needed */}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: { xs: 2, md: 0 } }}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            padding: { xs: '12px 24px', md: '20px 24px' }, // Reduced padding for larger displays
            backgroundColor: '#977342',
            color: 'white',
            borderRadius: 2,
            alignSelf: 'flex-start',
            marginLeft: { md: '16px' },
            height: '100%', // Ensures button height matches input height
            width: { xs: '100%', md: '250px' }, // Wider button on larger screens
          }}
        >
          Apply Filters
        </Button>
      </Box>
    </Box>
  );
}

export default FilterForm;