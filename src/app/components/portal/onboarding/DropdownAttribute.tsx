import * as React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'; 
import { DropdownAttributeProps } from '@/types/Props/DropdownAttributeProps';

export const DropdownAttribute: React.FC<DropdownAttributeProps> = ({ label, value }) => {
  return (
    <FormControl variant="outlined" sx={{ mb: 2 }}>
      <InputLabel id={`${label.toLowerCase()}-select-label`} sx={{ color: '#977342' }}>
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
          width: '24vw',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#4B5563',
            },
            '&:hover fieldset': {
              borderColor: '#977342', 
            },
            '&.Mui-focused fieldset': {
              borderColor: '#977342', 
            },
          },
          '& .MuiSelect-select': {
            color: 'gray.400',
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
        {/* Add MenuItems here for options */}
      </Select>
    </FormControl>
  );
};