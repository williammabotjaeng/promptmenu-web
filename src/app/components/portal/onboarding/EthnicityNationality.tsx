"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Button,
  Container,
  Paper,
  Grid,
  Divider,
  OutlinedInput,
  FormHelperText,
  SelectChangeEvent
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReactCountryFlag from "react-country-flag";
import { useStore } from "zustand";
import useTalentOnboardingStore from "@/state/use-talent-onboarding-store";
import { useCookies } from "react-cookie";
import countryList from 'react-select-country-list';

interface EthnicityNationalityProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
}

const EthnicityNationality: React.FC<EthnicityNationalityProps> = ({ 
  activeStep, 
  setActiveStep 
}) => {
  // Get data from talent onboarding store
  const { 
    talentData,
    setTalentData,
    physicalAttributes,
    setPhysicalAttributes
  } = useStore(useTalentOnboardingStore);

  // Initialize state
  const [ethnicity, setEthnicity] = useState<string>(
    talentData?.ethnicity || ""
  );
  const [nationality, setNationality] = useState<string>(
    talentData?.nationality || ""
  );
  const [countries, setCountries] = useState<{value: string, label: string}[]>([]);
  const [errors, setErrors] = useState({
    ethnicity: false,
    nationality: false
  });

  // Set up cookies
  const [cookies, setCookie] = useCookies(['ethnicity', 'nationality']);

  // Initialize country list on component mount
  useEffect(() => {
    setCountries(countryList().getData());
  }, []);

  // Update the ethnicity state
  const handleEthnicityChange = (event: SelectChangeEvent) => {
    const selectedEthnicity = event.target.value;
    setEthnicity(selectedEthnicity);
    
    // Update store
    setTalentData({
      ...talentData,
      ethnicity: selectedEthnicity
    });
    
    // Update physical attributes
    setPhysicalAttributes({
      ...physicalAttributes,
      ethnicity: selectedEthnicity
    });
    
    // Set cookie
    setCookie('ethnicity', selectedEthnicity);
    
    // Clear error if ethnicity is selected
    if (selectedEthnicity) {
      setErrors(prev => ({ ...prev, ethnicity: false }));
    }
  };

  // Update the nationality state
  const handleNationalityChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setNationality(value);
    
    // Update store
    setTalentData({
      ...talentData,
      nationality: value
    });
    
    // Set cookie
    setCookie('nationality', value);
    
    // Clear error if nationality is selected
    if (value) {
      setErrors(prev => ({ ...prev, nationality: false }));
    }
  };

  // Validate form before proceeding
  const validateForm = (): boolean => {
    const newErrors = {
      ethnicity: !ethnicity,
      nationality: !nationality
    };
    
    setErrors(newErrors);
    
    return !Object.values(newErrors).some(error => error);
  };

  // Handle next button click
  const handleNext = () => {
    if (validateForm()) {
      setActiveStep(activeStep + 1);
    }
  };

  // Handle back button click
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  // Common ethnicities in the UAE
  const ethnicitiesList = [
    "Emirati",
    "Indian",
    "Pakistani",
    "Bangladeshi",
    "Filipino",
    "Egyptian",
    "Jordanian",
    "Syrian",
    "Lebanese",
    "Sudanese",
    "Nigerian",
    "South African",
    "Kenyan",
    "British",
    "American",
    "Australian",
    "Chinese",
    "Korean",
    "Japanese",
    "Russian",
    "Other",
  ];

  return (
    <Container maxWidth="md" sx={{ py: 5, my: 2 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2,
          background: "linear-gradient(to bottom, #ffffff, #f8f8f8)",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ color: "#333", mb: 3, fontWeight: 600 }}>
          Ethnicity & Nationality
        </Typography>
        
        <Typography variant="body1" align="center" paragraph sx={{ color: "#666", mb: 4 }}>
          Please select your ethnicity and nationality. This information helps match you with relevant job opportunities.
        </Typography>
        
        <Divider sx={{ mb: 4 }} />
        
        <Grid container spacing={4}>
          {/* Ethnicity Selector */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ color: "#333" }}>
              Ethnicity
            </Typography>
            <Typography variant="body2" paragraph sx={{ color: "#666" }}>
              Select your primary ethnicity from the dropdown.
            </Typography>
            
            <FormControl 
              fullWidth 
              error={errors.ethnicity}
              sx={{ 
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#977342",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#977342",
                  },
                }
              }}
            >
              <InputLabel id="ethnicity-label">Select Your Ethnicity</InputLabel>
              <Select
                labelId="ethnicity-label"
                value={ethnicity}
                onChange={handleEthnicityChange}
                input={<OutlinedInput label="Select Your Ethnicity" />}
              >
                <MenuItem value="">
                  <em>Select an ethnicity</em>
                </MenuItem>
                {ethnicitiesList.map((ethnicityOption) => (
                  <MenuItem key={ethnicityOption} value={ethnicityOption}>
                    {ethnicityOption}
                  </MenuItem>
                ))}
              </Select>
              {errors.ethnicity && (
                <FormHelperText>Please select your ethnicity</FormHelperText>
              )}
            </FormControl>
          </Grid>
          
          {/* Nationality Selector */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ color: "#333" }}>
              Nationality
            </Typography>
            <Typography variant="body2" paragraph sx={{ color: "#666" }}>
              Select your nationality from the dropdown.
            </Typography>
            
            <FormControl 
              fullWidth 
              error={errors.nationality}
              sx={{ 
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#977342",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#977342",
                  },
                }
              }}
            >
              <InputLabel id="nationality-label">Select Your Nationality</InputLabel>
              <Select
                labelId="nationality-label"
                value={nationality}
                onChange={handleNationalityChange}
                input={<OutlinedInput label="Select Your Nationality" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ReactCountryFlag
                      countryCode={selected as string}
                      svg
                      style={{
                        width: '1.5em',
                        height: '1.5em',
                        marginRight: '0.5em',
                      }}
                    />
                    {countries.find(country => country.value === selected)?.label || selected}
                  </Box>
                )}
              >
                <MenuItem value="">
                  <em>Select a nationality</em>
                </MenuItem>
                {countries.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <ReactCountryFlag
                        countryCode={value}
                        svg
                        style={{
                          width: '1.5em',
                          height: '1.5em',
                          marginRight: '0.5em',
                        }}
                      />
                      {label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
              {errors.nationality && (
                <FormHelperText>Please select your nationality</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 5, display: "flex", justifyContent: "space-between" }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{
              color: "#977342",
              borderColor: "#977342",
              "&:hover": {
                borderColor: "#7D5F35",
                backgroundColor: "rgba(151, 115, 66, 0.04)",
              },
            }}
            variant="outlined"
          >
            Back
          </Button>
          <Button
            endIcon={<ArrowForwardIcon />}
            onClick={handleNext}
            sx={{
              backgroundColor: "#977342",
              color: "white",
              "&:hover": {
                backgroundColor: "#7D5F35",
              },
            }}
            variant="contained"
          >
            Next
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EthnicityNationality;