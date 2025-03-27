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
  SelectChangeEvent,
  alpha,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReactCountryFlag from "react-country-flag";
import { useStore } from "zustand";
import useTalentOnboardingStore from "@/state/use-talent-onboarding-store";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import countryList from 'react-select-country-list';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import OnboardingHeader from "./OnboardingHeader";

interface EthnicityNationalityProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
}

const steps = [
  { number: 3, title: "Attributes", isActive: false },
  { number: 4, title: "Ethnicity", isActive: true },
  { number: 5, title: "ID", isActive: false },
  { number: 6, title: "Social", isActive: false },
  { number: 7, title: "Portfolio", isActive: false },
  { number: 8, title: "Payment", isActive: false },
  { number: 9, title: "Review", isActive: false },
];

const EthnicityNationality: React.FC<EthnicityNationalityProps> = ({ 
  activeStep, 
  setActiveStep 
}) => {
  // Get data from talent onboarding store
  const { 
    talentData,
    setTalentData,
    physicalAttributes,
    setPhysicalAttributes,
    personalInfo,
    setPersonalInfo
  } = useStore(useTalentOnboardingStore);

  const router = useRouter();

  // Initialize state
  const [ethnicity, setEthnicity] = useState<string>(
    talentData?.ethnicity || ""
  );
  const [nationality, setNationality] = useState<string>(
    talentData?.nationality || ""
  );
  const [gender, setGender] = useState<string>(
    talentData?.gender || personalInfo?.gender || ""
  );
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(
    talentData?.date_of_birth ? new Date(talentData.date_of_birth) : 
    personalInfo?.date_of_birth ? new Date(personalInfo.date_of_birth) : null
  );
  const [countries, setCountries] = useState<{value: string, label: string}[]>([]);
  const [errors, setErrors] = useState({
    ethnicity: false,
    nationality: false,
    gender: false,
    date_of_birth: false
  });

  // Set up cookies
  const [cookies, setCookie] = useCookies(['ethnicity', 'nationality', 'gender', 'date_of_birth', 'user_role']);

  // Initialize country list on component mount
  useEffect(() => {
    setCountries(countryList().getData());
  }, []);

  const userRole = cookies?.user_role || "";

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

  // Update the gender state
  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setGender(value);
    
    // Update store
    setTalentData({
      ...talentData,
      gender: value
    });

    // Update personal info
    setPersonalInfo({
      ...personalInfo,
      gender: value
    });
    
    // Set cookie
    setCookie('gender', value);
    
    // Clear error if gender is selected
    if (value) {
      setErrors(prev => ({ ...prev, gender: false }));
    }
  };

  // Update the date of birth state
  const handleDateOfBirthChange = (date: Date | null) => {
    setDateOfBirth(date);
    
    if (date) {
      // Format date for API
      const formattedDate = date.toISOString().split('T')[0];
      
      // Update store
      setTalentData({
        ...talentData,
        date_of_birth: formattedDate
      });

      // Update personal info
      setPersonalInfo({
        ...personalInfo,
        date_of_birth: formattedDate
      });
      
      // Set cookie
      setCookie('date_of_birth', formattedDate);
      
      // Clear error
      setErrors(prev => ({ ...prev, date_of_birth: false }));
    }
  };

  // Validate form before proceeding
  const validateForm = (): boolean => {
    const newErrors = {
      ethnicity: !ethnicity,
      nationality: !nationality,
      gender: !gender,
      date_of_birth: !dateOfBirth
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

  const handleSkip = () => {
    setActiveStep(activeStep + 1);
  };

  // Calculate age
  const calculateAge = (dob: Date | null): number => {
    if (!dob) return 0;
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
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

  // Gender options
  const genderOptions = [
    "Male",
    "Female",
    "Non-binary",
    "Prefer not to say"
  ];

  const onClose = () => {
    router.push("/portal");
  };

  return (
    <Box 
      sx={{ 
        backgroundColor: 'black',
        color: '#977342',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        py: 5,
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Header Section */}
              <OnboardingHeader
                steps={steps}
                onClose={onClose}
              />
      <Container maxWidth="md">
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            backgroundColor: 'black',
            border: '1px solid rgba(151, 115, 66, 0.3)',
            boxShadow: '0 4px 20px rgba(151, 115, 66, 0.15)'
          }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ color: "#977342", mb: 3, fontWeight: 600 }}>
            Personal Information
          </Typography>
          
          <Typography variant="body1" align="center" paragraph sx={{ color: "#CEAB76", mb: 4 }}>
            Please provide your personal details. This information helps match you with relevant job opportunities.
          </Typography>
          
          <Divider sx={{ mb: 4, borderColor: 'rgba(151, 115, 66, 0.3)' }} />
          
          <Grid container spacing={4}>
            {/* Date of Birth Selector */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ color: "#977342" }}>
                Date of Birth
              </Typography>
              <Typography variant="body2" paragraph sx={{ color: "#CEAB76" }}>
                Select your date of birth.
              </Typography>
              
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Birth"
                  value={dateOfBirth}
                  onChange={handleDateOfBirthChange}
                  disableFuture
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: errors.date_of_birth,
                      helperText: errors.date_of_birth ? "Please select your date of birth" : 
                        dateOfBirth ? `Age: ${calculateAge(dateOfBirth)} years` : "",
                      sx: {
                        "& .MuiInputLabel-root": {
                          color: alpha('#977342', 0.8),
                        },
                        "& .MuiOutlinedInput-root": {
                          color: "#977342",
                          "& fieldset": {
                            borderColor: 'rgba(151, 115, 66, 0.5)',
                          },
                          "&:hover fieldset": {
                            borderColor: "#977342",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#977342",
                          }
                        },
                        "& .MuiFormHelperText-root": {
                          color: errors.date_of_birth ? "#FF6B6B" : "#CEAB76"
                        },
                        "& .MuiSvgIcon-root": {
                          color: "#977342"
                        },
                        backgroundColor: 'rgba(0, 0, 0, 0.6)'
                      }
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            
            {/* Gender Selector */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ color: "#977342" }}>
                Gender
              </Typography>
              <Typography variant="body2" paragraph sx={{ color: "#CEAB76" }}>
                Select your gender.
              </Typography>
              
              <FormControl 
                component="fieldset" 
                error={errors.gender}
                sx={{ 
                  width: '100%',
                  "& .MuiFormLabel-root": {
                    color: alpha('#977342', 0.8),
                  },
                  "& .MuiRadio-root": {
                    color: "#977342",
                  },
                  "& .MuiFormControlLabel-label": {
                    color: "#977342"
                  },
                  "& .MuiFormHelperText-root": {
                    color: "#FF6B6B"
                  },
                }}
              >
                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  value={gender}
                  onChange={handleGenderChange}
                  row
                >
                  {genderOptions.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
                {errors.gender && (
                  <FormHelperText>Please select your gender</FormHelperText>
                )}
              </FormControl>
            </Grid>
            
            {/* Ethnicity Selector */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ color: "#977342" }}>
                Ethnicity
              </Typography>
              <Typography variant="body2" paragraph sx={{ color: "#CEAB76" }}>
                Select your primary ethnicity from the dropdown.
              </Typography>
              
              <FormControl 
                fullWidth 
                error={errors.ethnicity}
                sx={{ 
                  "& .MuiInputLabel-root": {
                    color: alpha('#977342', 0.8),
                  },
                  "& .MuiOutlinedInput-root": {
                    color: "#977342",
                    "& fieldset": {
                      borderColor: 'rgba(151, 115, 66, 0.5)',
                    },
                    "&:hover fieldset": {
                      borderColor: "#977342",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#977342",
                    }
                  },
                  "& .MuiFormHelperText-root": {
                    color: "#FF6B6B"
                  },
                  "& .MuiSvgIcon-root": {
                    color: "#977342"
                  },
                  backgroundColor: 'rgba(0, 0, 0, 0.6)'
                }}
              >
                <InputLabel id="ethnicity-label">Select Your Ethnicity</InputLabel>
                <Select
                  labelId="ethnicity-label"
                  value={ethnicity}
                  onChange={handleEthnicityChange}
                  input={<OutlinedInput label="Select Your Ethnicity" />}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: '#121212',
                        color: '#977342',
                        '& .MuiMenuItem-root': {
                          color: '#977342',
                          '&:hover': {
                            bgcolor: 'rgba(151, 115, 66, 0.15)',
                          },
                          '&.Mui-selected': {
                            bgcolor: 'rgba(151, 115, 66, 0.3)',
                            '&:hover': {
                              bgcolor: 'rgba(151, 115, 66, 0.4)',
                            }
                          }
                        }
                      }
                    }
                  }}
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
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ color: "#977342" }}>
                Nationality
              </Typography>
              <Typography variant="body2" paragraph sx={{ color: "#CEAB76" }}>
                Select your nationality from the dropdown.
              </Typography>
              
              <FormControl 
                fullWidth 
                error={errors.nationality}
                sx={{ 
                  "& .MuiInputLabel-root": {
                    color: alpha('#977342', 0.8),
                  },
                  "& .MuiOutlinedInput-root": {
                    color: "#977342",
                    "& fieldset": {
                      borderColor: 'rgba(151, 115, 66, 0.5)',
                    },
                    "&:hover fieldset": {
                      borderColor: "#977342",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#977342",
                    }
                  },
                  "& .MuiFormHelperText-root": {
                    color: "#FF6B6B"
                  },
                  "& .MuiSvgIcon-root": {
                    color: "#977342"
                  },
                  backgroundColor: 'rgba(0, 0, 0, 0.6)'
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
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: '#121212',
                        color: '#977342',
                        maxHeight: 380,
                        '& .MuiMenuItem-root': {
                          color: '#977342',
                          '&:hover': {
                            bgcolor: 'rgba(151, 115, 66, 0.15)',
                          },
                          '&.Mui-selected': {
                            bgcolor: 'rgba(151, 115, 66, 0.3)',
                            '&:hover': {
                              bgcolor: 'rgba(151, 115, 66, 0.4)',
                            }
                          }
                        }
                      }
                    }
                  }}
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
                border: '1px solid',
                "&:hover": {
                  borderColor: "#CEAB76",
                  backgroundColor: "rgba(151, 115, 66, 0.08)",
                  color: "#CEAB76"
                },
              }}
              variant="outlined"
            >
              Back
            </Button>
            <Button
              endIcon={<ArrowForwardIcon />}
              onClick={handleSkip}
              sx={{
                backgroundColor: "#977342",
                color: "black",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#CEAB76",
                },
              }}
              variant="contained"
            >
              Skip for now
            </Button>
            <Button
              endIcon={<ArrowForwardIcon />}
              onClick={handleNext}
              sx={{
                backgroundColor: "#977342",
                color: "black",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#CEAB76",
                },
              }}
              variant="contained"
            >
              Next
            </Button>
          </Box>
          {/* Step Indicator Section */}
                <footer style={{ textAlign: "center", marginTop: "28px", color: "gray" }}>
                  <Typography variant="body2">
                    Step {activeStep + 1} of {userRole === "talent" ? 9 : 11} - Background
                  </Typography>
                </footer>
        </Paper>
      </Container>
    </Box>
  );
};

export default EthnicityNationality;