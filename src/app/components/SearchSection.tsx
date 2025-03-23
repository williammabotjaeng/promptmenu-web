"use client";

import * as React from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Menu,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Divider,
  IconButton,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import DownArrow from "@/assets/down-arrow.svg";
import { useState, useRef } from 'react';

interface FilterButtonProps {
  label: string;
  options?: string[];
  onApplyFilter: (filterType: string, selectedValues: string[]) => void;
}

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange?: (filterType: string, values: string[]) => void;
  skillOptions?: string[];
  locationOptions?: string[];
}

const FilterButton: React.FC<FilterButtonProps> = ({ 
  label, 
  options = [], 
  onApplyFilter 
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const filterType = label.split(' ')[2]; // "Filter by skills" -> "skills"
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApply = () => {
    onApplyFilter(filterType, selectedOptions);
    handleClose();
  };

  const handleReset = () => {
    setSelectedOptions([]);
    onApplyFilter(filterType, []);
    handleClose();
  };

  const handleOptionChange = (option: string) => {
    setSelectedOptions(prev => {
      if (prev.includes(option)) {
        return prev.filter(item => item !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClick}
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1, 
          padding: '8px 16px', 
          borderColor: '#ccc',
          backgroundColor: selectedOptions.length > 0 ? 'rgba(151, 115, 66, 0.08)' : 'transparent',
          '&:hover': {
            borderColor: '#977342',
            backgroundColor: 'rgba(151, 115, 66, 0.04)'
          }
        }}
        aria-label={`Filter by ${filterType.toLowerCase()}`}
      >
        <Typography 
          variant="body2" 
          sx={{ 
            textTransform: 'none', 
            color: selectedOptions.length > 0 ? '#977342' : '#000', 
            fontSize: '16px',
            fontWeight: selectedOptions.length > 0 ? 500 : 400
          }}
        >
          {label} {selectedOptions.length > 0 && `(${selectedOptions.length})`}
        </Typography>
        <img
          loading="lazy"
          src={DownArrow?.src}
          alt=""
          style={{ width: '26px', height: '26px' }}
        />
      </Button>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{ 
          '& .MuiPaper-root': { 
            width: 250,
            maxHeight: 300,
            padding: 1,
            borderRadius: 2
          }
        }}
      >
        <Typography variant="subtitle2" sx={{ px: 2, py: 1, fontWeight: 600 }}>
          {label}
        </Typography>
        <Divider sx={{ mb: 1 }} />
        
        {options.length > 0 ? (
          <>
            <Box sx={{ maxHeight: 200, overflowY: 'auto', px: 1 }}>
              {options.map((option) => (
                <MenuItem key={option} dense sx={{ px: 1 }}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={selectedOptions.includes(option)}
                        onChange={() => handleOptionChange(option)}
                        size="small"
                        sx={{ 
                          color: '#977342',
                          '&.Mui-checked': {
                            color: '#977342',
                          }
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2">
                        {option}
                      </Typography>
                    }
                    sx={{ width: '100%' }}
                  />
                </MenuItem>
              ))}
            </Box>
            
            <Divider sx={{ my: 1 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1, pt: 1 }}>
              <Button 
                onClick={handleReset}
                variant="text"
                size="small"
                sx={{ 
                  textTransform: 'none',
                  color: '#666'
                }}
              >
                Reset
              </Button>
              <Button 
                onClick={handleApply}
                variant="contained"
                size="small"
                sx={{ 
                  textTransform: 'none',
                  backgroundColor: '#977342',
                  '&:hover': {
                    backgroundColor: '#7D5F35',
                  }
                }}
              >
                Apply Filters
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant="body2" sx={{ px: 2, py: 1, color: '#666', fontStyle: 'italic' }}>
            No options available
          </Typography>
        )}
      </Menu>
    </>
  );
};

export const SearchSection: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onFilterChange,
  skillOptions = [
    "Acting", "Dancing", "Modeling", "Photography",
    "Videography", "Event Management", "Hosting",
    "Security Management", "Event Coordination",
    "Journalism", "Project Management"
  ],
  locationOptions = [
    "Dubai", "Abu Dhabi", "Sharjah", "Ajman", 
    "Ras Al Khaimah", "Fujairah", "Umm Al Quwain",
    "Remote"
  ]
}) => {
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    // Perform search as user types
    onSearch(value);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    onSearch('');
    // Focus back on the search input
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(searchValue);
    }
  };

  const handleFilterChange = (filterType: string, selectedValues: string[]) => {
    if (onFilterChange) {
      onFilterChange(filterType, selectedValues);
    }
  };

  return (
    <Box sx={{ 
      padding: 2, 
      display: 'flex', 
      flexDirection: 'column', 
      mb: 2, 
      width: '100%' 
    }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        padding: 3, 
        backgroundColor: 'white', 
        borderRadius: 2, 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
      }}>
        <TextField
          inputRef={searchInputRef}
          variant="outlined"
          placeholder="Search jobs by title, description, location or skill..."
          value={searchValue}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#666' }} />
              </InputAdornment>
            ),
            endAdornment: searchValue && (
              <InputAdornment position="end">
                <IconButton 
                  aria-label="clear search" 
                  onClick={handleClearSearch}
                  edge="end"
                  size="small"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            )
          }}
          aria-label="Search jobs"
          sx={{ 
            flexGrow: 1, 
            width: { xs: '100%', md: '620px' }, 
            mb: { xs: 2, md: 0 }, 
            mr: { md: 2 },
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#977342',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#977342',
              },
            },
          }}
        />
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 1,
          alignItems: 'center',
          justifyContent: { xs: 'space-between', sm: 'flex-start' }
        }}>
          <FilterButton 
            label="Filter by skills" 
            options={skillOptions}
            onApplyFilter={handleFilterChange} 
          />
          <FilterButton 
            label="Filter by location" 
            options={locationOptions}
            onApplyFilter={handleFilterChange} 
          />
          <FilterButton 
            label="Filter by deadline" 
            options={["Next 7 days", "Next 30 days", "Urgent"]}
            onApplyFilter={handleFilterChange} 
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SearchSection;