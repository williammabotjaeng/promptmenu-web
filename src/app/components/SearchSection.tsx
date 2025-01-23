"use client";

import * as React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { SearchBarProps } from '@/types/Props/pages/SearchBarProps';
import { FilterButtonProps } from '@/types/Props/pages/FilterButtonProps';

const FilterButton: React.FC<FilterButtonProps> = ({ label, onClick }) => (
  <Button
    variant="outlined"
    onClick={onClick}
    sx={{ display: 'flex', alignItems: 'center', gap: 1, padding: '8px 16px', borderColor: '#ccc' }}
    aria-label={`Filter by ${label.toLowerCase()}`}
  >
    <Typography variant="body2" sx={{ textTransform: 'none', color: '#000', fontSize: '16px' }}>{label}</Typography>
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/e289c2de16c80c983332433cba33a0a8b54eac4d0f8a09844283b2d95e9bcd6a?apiKey=7fae980a988640eea8add1e49a5d542e&"
      alt=""
      style={{ width: '26px', height: '26px' }}
    />
  </Button>
);

export const SearchSection: React.FC<SearchBarProps> = () => {
  const handleSearch = (value: string) => {
    // Search implementation
  };

  return (
    <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', mb: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, padding: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 1 }}>
        <TextField
          variant="outlined"
          placeholder="Search jobs..."
          aria-label="Search jobs"
          sx={{ flexGrow: 1, width: { xs: '100%', md: '620px' }, mb: { xs: 2, md: 0 }, mr: { md: 2 } }} // Responsive width and margin
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <FilterButton label="Filter by skills" onClick={() => {}} />
          <FilterButton label="Filter by location" onClick={() => {}} />
          <FilterButton label="Filter by deadline" onClick={() => {}} />
        </Box>
      </Box>
    </Box>
  );
};