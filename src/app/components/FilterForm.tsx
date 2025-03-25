import React, { useState, useEffect } from "react";
import { 
  Box, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Chip,
  Stack,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress
} from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearIcon from '@mui/icons-material/Clear';

interface FilterFormProps {
  onFilterChange: (filters: FilterValues) => void;
  skillOptions: string[];
  locationOptions: string[];
  ethnicityOptions: string[];
  genderOptions: string[];
  isLoading: boolean;
}

export interface FilterValues {
  skill: string;
  location: string;
  ethnicity: string;
  gender: string;
}

const FilterForm: React.FC<FilterFormProps> = ({
  onFilterChange,
  skillOptions = [],
  locationOptions = [],
  ethnicityOptions = [],
  genderOptions = [],
  isLoading = false
}) => {
  // State for filter values
  const [filters, setFilters] = useState<FilterValues>({
    skill: '',
    location: '',
    ethnicity: '',
    gender: ''
  });

  // Track whether filters have been applied
  const [filtersApplied, setFiltersApplied] = useState(false);

  // Count active filters
  const activeFiltersCount = Object.values(filters).filter(value => value !== '').length;

  // Handle filter change
  const handleFilterChange = (filterName: keyof FilterValues) => (event: any) => {
    const newValue = event.target.value;
    setFilters(prev => ({
      ...prev,
      [filterName]: newValue
    }));
  };

  // Apply filters
  const handleApplyFilters = () => {
    onFilterChange(filters);
    setFiltersApplied(true);
  };

  // Clear all filters
  const handleClearFilters = () => {
    const clearedFilters = {
      skill: '',
      location: '',
      ethnicity: '',
      gender: '',
      experience: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
    setFiltersApplied(false);
  };

  // Clear a single filter
  const handleClearSingleFilter = (filterName: keyof FilterValues) => {
    setFilters(prev => {
      const updated = { ...prev, [filterName]: '' };
      onFilterChange(updated);
      return updated;
    });
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleApplyFilters();
      }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        mb: 4,
      }}
    >
      {/* Filter Controls */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
          padding: 3,
          width: '100%',
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            flexWrap: 'wrap',
            gap: 2,
            width: '100%',
          }}
        >
          {/* Filter Select Controls */}
          <FormControl 
            variant="outlined" 
            sx={{ minWidth: { xs: '100%', sm: '48%', md: '180px' }, flex: 1 }}
          >
            <InputLabel id="skill-label">Skill</InputLabel>
            <Select
              labelId="skill-label"
              value={filters.skill}
              onChange={handleFilterChange('skill')}
              label="Skill"
              disabled={isLoading}
              sx={{ 
                borderRadius: 1,
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#977342"
                }
              }}
              endAdornment={
                filters.skill ? (
                  <IconButton 
                    size="small" 
                    sx={{ mr: 2 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearSingleFilter('skill');
                    }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                ) : null
              }
            >
              <MenuItem value="">
                <em>Any Skill</em>
              </MenuItem>
              {skillOptions.map((skill) => (
                <MenuItem key={skill} value={skill}>
                  {skill}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl 
            variant="outlined" 
            sx={{ minWidth: { xs: '100%', sm: '48%', md: '180px' }, flex: 1 }}
          >
            <InputLabel id="location-label">Location</InputLabel>
            <Select
              labelId="location-label"
              value={filters.location}
              onChange={handleFilterChange('location')}
              label="Location"
              disabled={isLoading}
              sx={{ 
                borderRadius: 1,
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#977342"
                }
              }}
              endAdornment={
                filters.location ? (
                  <IconButton 
                    size="small" 
                    sx={{ mr: 2 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearSingleFilter('location');
                    }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                ) : null
              }
            >
              <MenuItem value="">
                <em>Any Location</em>
              </MenuItem>
              {locationOptions.map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl 
            variant="outlined" 
            sx={{ minWidth: { xs: '100%', sm: '48%', md: '180px' }, flex: 1 }}
          >
            <InputLabel id="ethnicity-label">Ethnicity</InputLabel>
            <Select
              labelId="ethnicity-label"
              value={filters.ethnicity}
              onChange={handleFilterChange('ethnicity')}
              label="Ethnicity"
              disabled={isLoading}
              sx={{ 
                borderRadius: 1,
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#977342"
                }
              }}
              endAdornment={
                filters.ethnicity ? (
                  <IconButton 
                    size="small" 
                    sx={{ mr: 2 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearSingleFilter('ethnicity');
                    }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                ) : null
              }
            >
              <MenuItem value="">
                <em>Any Ethnicity</em>
              </MenuItem>
              {ethnicityOptions.map((ethnicity) => (
                <MenuItem key={ethnicity} value={ethnicity}>
                  {ethnicity}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl 
            variant="outlined" 
            sx={{ minWidth: { xs: '100%', sm: '48%', md: '180px' }, flex: 1 }}
          >
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              value={filters.gender}
              onChange={handleFilterChange('gender')}
              label="Gender"
              disabled={isLoading}
              sx={{ 
                borderRadius: 1,
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#977342"
                }
              }}
              endAdornment={
                filters.gender ? (
                  <IconButton 
                    size="small" 
                    sx={{ mr: 2 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearSingleFilter('gender');
                    }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                ) : null
              }
            >
              <MenuItem value="">
                <em>Any Gender</em>
              </MenuItem>
              {genderOptions.map((gender) => (
                <MenuItem key={gender} value={gender}>
                  {gender}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Apply Filter Button */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          mt: { xs: 3, md: 0 },
          ml: { md: 2 },
          minWidth: { xs: '100%', md: '150px' }
        }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <FilterAltIcon />}
            disabled={isLoading}
            sx={{
              py: 1.5,
              px: 3,
              backgroundColor: '#977342',
              color: 'white',
              borderRadius: 1,
              width: { xs: '100%', md: 'auto' },
              whiteSpace: 'nowrap',
              '&:hover': {
                backgroundColor: '#7d5f35',
              },
            }}
          >
            {isLoading ? 'Loading...' : (
              activeFiltersCount > 0 ? `Apply Filters (${activeFiltersCount})` : 'Apply Filters'
            )}
          </Button>
        </Box>
      </Box>

      {/* Active Filters Display */}
      {filtersApplied && activeFiltersCount > 0 && (
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 1, 
          mt: 2, 
          width: '100%',
          alignItems: 'center'
        }}>
          <Typography variant="body2" sx={{ color: '#666', mr: 1 }}>
            Active filters:
          </Typography>
          
          {Object.entries(filters).map(([key, value]) => 
            value ? (
              <Chip
                key={key}
                label={`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
                onDelete={() => handleClearSingleFilter(key as keyof FilterValues)}
                size="small"
                sx={{ 
                  backgroundColor: 'rgba(151, 115, 66, 0.1)',
                  color: '#977342',
                  '& .MuiChip-deleteIcon': {
                    color: '#977342'
                  }
                }}
              />
            ) : null
          )}
          
          <Button 
            variant="text" 
            size="small" 
            onClick={handleClearFilters}
            sx={{ 
              ml: 1, 
              color: '#977342', 
              fontSize: '0.75rem',
              textTransform: 'none'
            }}
          >
            Clear all
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FilterForm;