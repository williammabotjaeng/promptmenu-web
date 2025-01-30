import * as React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'; 
import { DropdownAttributeProps } from '@/types/Props/DropdownAttributeProps';

export const DropdownAttribute: React.FC<DropdownAttributeProps> = ({ label, value }) => {
  return (
    <FormControl variant="outlined" sx={{ mb: 2 }}>
      <Typography id={`${label.toLowerCase()}-select-label`} sx={{ color: '#977342' }}>
        {label}
      </Typography>
      <Select
        labelId={`${label.toLowerCase()}-select-label`}
        id={`${label.toLowerCase()}-select`}
        value={value}
        displayEmpty
        sx={{
          bgcolor: 'black',
          borderRadius: '8px',
          width: { xs: '100%', md: '24vw' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent', 
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent', 
            },
          },
          '& .MuiSelect-select': {
            color: 'transparent',
            display: 'flex',
            alignItems: 'center',
          },
        }}
        IconComponent={() => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <KeyboardArrowDownIcon sx={{ color: '#977342', marginRight: 1 }} />
          </Box>
        )}
      >
        <MenuItem disabled value="">
          <em>Select an option</em>
        </MenuItem>
        <MenuItem disabled value="black">
          <em>Black</em>
        </MenuItem>
        <MenuItem disabled value="brown">
          <em>Brown</em>
        </MenuItem>
        <MenuItem disabled value="blonde">
          <em>Blonde</em>
        </MenuItem>
        <MenuItem disabled value="brunette">
          <em>Brunette</em>
        </MenuItem>
      </Select>
    </FormControl>
  );
};