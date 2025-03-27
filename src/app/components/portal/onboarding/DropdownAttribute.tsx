import * as React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'; 
import { DropdownAttributeProps } from '@/types/Props/DropdownAttributeProps';

export const DropdownAttribute: React.FC<DropdownAttributeProps> = ({ items, label, value, onChange }) => {
  return (
    <FormControl variant="outlined" sx={{ mb: 2 }}>
      {/* Label */}
      <Typography id={`${label.toLowerCase()}-select-label`} sx={{ color: '#977342', mb: 1 }}>
        {label}
      </Typography>

      {/* Dropdown */}
      <Select
        labelId={`${label.toLowerCase()}-select-label`}
        id={`${label.toLowerCase()}-select`}
        value={value}
        onChange={onChange}
        displayEmpty
        sx={{
          bgcolor: 'black',
          borderRadius: '8px',
          width: { xs: '100%', md: '24vw' },
          color: '#CEAB76',
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
            color: value ? '#CEAB76' : '#977342', 
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
        {/* Placeholder */}
        <MenuItem disabled value="">
          <em>Select an option</em>
        </MenuItem>

        {/* Dynamically Render Items */}
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};