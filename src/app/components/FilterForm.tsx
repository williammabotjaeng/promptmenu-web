import React from "react";
import { Box, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function FilterForm() {
  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        paddingX: 2,
        paddingY: 1,
        marginTop: 3.5,
        width: '100%',
        maxWidth: '600px', 
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 3,
          width: '100%',
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="skill-label" sx={{ textAlign: 'center' }}>Select Skill</InputLabel>
            <Select
              labelId="skill-label"
              label="Select Skill"
              sx={{ padding: '1px 16px', borderRadius: 2 }}
            >
              <MenuItem value="">
                <em>Select Skill</em>
              </MenuItem>
              {/* Add more menu items as needed */}
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="location-label" sx={{ textAlign: 'center' }}>Location</InputLabel>
            <Select
              labelId="location-label"
              label="Location"
              sx={{ padding: '1px 16px', borderRadius: 2 }}
            >
              <MenuItem value="">
                <em>Location</em>
              </MenuItem>
              {/* Add more menu items as needed */}
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="ethnicity-label" sx={{ textAlign: 'center' }}>Ethnicity</InputLabel>
            <Select
              labelId="ethnicity-label"
              label="Ethnicity"
              sx={{ padding: '1px 16px', borderRadius: 2 }}
            >
              <MenuItem value="">
                <em>Ethnicity</em>
              </MenuItem>
              {/* Add more menu items as needed */}
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="gender-label" sx={{ textAlign: 'center' }}>Gender</InputLabel>
            <Select
              labelId="gender-label"
              label="Gender"
              sx={{ padding: '1px 16px', borderRadius: 2 }}
            >
              <MenuItem value="">
                <em>Gender</em>
              </MenuItem>
              {/* Add more menu items as needed */}
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth>
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
          <Button
            type="submit"
            variant="contained"
            sx={{
              padding: '16px 48px',
              backgroundColor: '#977342',
              color: 'white',
              borderRadius: 2,
              alignSelf: 'flex-start',
              marginTop: 2, 
            }}
          >
            Apply Filters
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default FilterForm;