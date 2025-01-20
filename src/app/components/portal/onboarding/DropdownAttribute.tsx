import * as React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { DropdownAttributeProps } from '@/types/Props/DropdownAttributeProps';

export const DropdownAttribute: React.FC<DropdownAttributeProps> = ({ label, value }) => {
  return (
    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
      <InputLabel id={`${label.toLowerCase()}-select-label`} sx={{ color: 'orange' }}>
        {label}
      </InputLabel>
      <Select
        labelId={`${label.toLowerCase()}-select-label`}
        id={`${label.toLowerCase()}-select`}
        value={value}
        displayEmpty
        sx={{
          bgcolor: 'black',
          borderRadius: '8px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#4B5563',
            },
            '&:hover fieldset': {
              borderColor: 'orange', 
            },
            '&.Mui-focused fieldset': {
              borderColor: 'orange', 
            },
          },
          '& .MuiSelect-select': {
            color: 'gray.400',
            display: 'flex',
            alignItems: 'center',
          },
        }}
      >
        <MenuItem disabled value="">
          <em>Select an option</em>
        </MenuItem>
        {/* Add MenuItems here for options */}
      </Select>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/b1d9a2cf403e62064d02046da179765a4725882180fad294e23e0ca3dae71c06?apiKey=7fae980a988640eea8add1e49a5d542e&"
          alt=""
          style={{ objectFit: 'contain', width: '32px', height: '32px' }}
        />
      </Box>
    </FormControl>
  );
};