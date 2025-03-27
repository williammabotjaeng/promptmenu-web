import * as React from 'react';
import { DateTimePicker } from '@/components/dashboard/event/DateTimePicker';
import { CheckboxItem } from '@/components/dashboard/event/CheckBoxItem';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Paper, 
  Alert, 
  Fade, 
  Divider,
  InputAdornment,
  Tooltip,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TitleIcon from '@mui/icons-material/Title';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HeaderWithProgressBar from './HeaderWithProgressBar';
import TimeSlotsField from './TimeSlotsField';
import { PostEventStepProps } from '@/types/Props/PostEventStepProps';
import useEventStore from '@/state/use-event-store';
import { useStore } from 'zustand';
import { useEffect, useState } from 'react';
import { Filter } from 'bad-words';

// Types for time slots
interface TimeSlot {
  startTime: Date | null;
  endTime: Date | null;
}

interface TimeSlots {
  monday: TimeSlot;
  tuesday: TimeSlot;
  wednesday: TimeSlot;
  thursday: TimeSlot;
  friday: TimeSlot;
  saturday: TimeSlot;
  sunday: TimeSlot;
}

interface TimeSlotsConfig {
  mode: 'universal' | 'perDay';
  universalTimeSlot: TimeSlot;
  dailyTimeSlots: TimeSlots;
}

// Day mapping for getting day names from date
const dayMapping: Record<number, string> = {
  0: 'sunday',
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
};

const defaultTimeSlot: TimeSlot = {
  startTime: new Date(new Date().setHours(9, 0, 0, 0)),
  endTime: new Date(new Date().setHours(17, 0, 0, 0)),
};

const createDefaultTimeSlots = (): TimeSlots => ({
  monday: { ...defaultTimeSlot },
  tuesday: { ...defaultTimeSlot },
  wednesday: { ...defaultTimeSlot },
  thursday: { ...defaultTimeSlot },
  friday: { ...defaultTimeSlot },
  saturday: { ...defaultTimeSlot },
  sunday: { ...defaultTimeSlot },
});

export const EventDetails: React.FC<PostEventStepProps> = ({ activeStep, setActiveStep }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { eventDetails, setEventDetails } = useStore(useEventStore);
  const profanityFilter = new Filter();
  const [fadeIn, setFadeIn] = useState(false);

  // Form state
  const [eventTitle, setEventTitle] = useState(eventDetails?.eventTitle || '');
  const [description, setDescription] = useState(eventDetails?.description || '');
  const [location, setLocation] = useState(eventDetails?.location || '');
  const [startDateTime, setStartDateTime] = useState(eventDetails?.startDateTime || '');
  const [endDateTime, setEndDateTime] = useState(eventDetails?.endDateTime || '');
  const [mealsProvided, setMealsProvided] = useState(eventDetails?.mealsProvided || false);
  const [transportProvided, setTransportProvided] = useState(eventDetails?.transportProvided || false);
  const [accommodationProvided, setAccommodationProvided] = useState(eventDetails?.accommodationProvided || false);
  
  // Time slots state
  const [timeSlotsConfig, setTimeSlotsConfig] = useState<TimeSlotsConfig>(
    eventDetails?.timeSlotsConfig || {
      mode: 'universal',
      universalTimeSlot: { ...defaultTimeSlot },
      dailyTimeSlots: createDefaultTimeSlots(),
    }
  );
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  // Validation state
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    location: '',
    dateTime: '',
    general: '',
  });

  // Update selected days based on start and end dates
  useEffect(() => {
    if (startDateTime && endDateTime) {
      try {
        const startDate = new Date(startDateTime);
        const endDate = new Date(endDateTime);
        
        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
          const days: string[] = [];
          let currentDate = new Date(startDate);
          
          while (currentDate <= endDate) {
            const dayName = dayMapping[currentDate.getDay()];
            if (!days.includes(dayName)) {
              days.push(dayName);
            }
            currentDate = new Date(currentDate);
            currentDate.setDate(currentDate.getDate() + 1);
          }
          
          setSelectedDays(days);
        }
      } catch (error) {
        console.error("Error calculating days:", error);
      }
    }
  }, [startDateTime, endDateTime]);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  // Check for profanity in text
  const hasProfanity = (text) => {
    if (!text) return false;
    return profanityFilter.isProfane(text);
  };

  // Validate time difference is at least one hour
  const validateTimeGap = (start, end) => {
    if (!start || !end) return true; // Skip validation if fields are empty
    
    try {
      const startDate = new Date(start);
      const endDate = new Date(end);
      
      // Check for valid dates
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return false;
      }
      
      // Calculate difference in milliseconds and check if >= 1 hour
      return (endDate.getTime() - startDate.getTime()) >= 3600000; // 3600000ms = 1 hour
    } catch (error) {
      console.error("Date validation error:", error);
      return false;
    }
  };

  // Validate all form fields
  const validateForm = () => {
    const newErrors = {
      title: '',
      description: '',
      location: '',
      dateTime: '',
      general: '',
    };
    
    let isValid = true;

    // Required fields check
    if (!eventTitle.trim()) {
      newErrors.title = 'Event title is required';
      isValid = false;
    } else if (hasProfanity(eventTitle)) {
      newErrors.title = 'Please use appropriate language in the title';
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = 'Event description is required';
      isValid = false;
    } else if (hasProfanity(description)) {
      newErrors.description = 'Please use appropriate language in the description';
      isValid = false;
    }

    if (!location.trim()) {
      newErrors.location = 'Location is required';
      isValid = false;
    }

    if (!startDateTime || !endDateTime) {
      newErrors.dateTime = 'Both start and end date/time are required';
      isValid = false;
    } else if (!validateTimeGap(startDateTime, endDateTime)) {
      newErrors.dateTime = 'Event must be at least one hour long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle time slots changes
  const handleTimeSlotsChange = (newTimeSlotsConfig: TimeSlotsConfig) => {
    setTimeSlotsConfig(newTimeSlotsConfig);
  };

  // Handle form submission
  const handleContinue = () => {
    if (validateForm()) {
      // Update store with validated data, including time slots
      setEventDetails({
        eventTitle,
        description,
        location,
        startDateTime,
        endDateTime,
        mealsProvided,
        transportProvided,
        accommodationProvided,
        timeSlotsConfig,
      });
      
      // Proceed to next step
      setActiveStep(activeStep + 1);
    }
  };

  // Load existing data when component mounts or eventDetails changes
  useEffect(() => {
    if (eventDetails) {
      setEventTitle(eventDetails.eventTitle || '');
      setDescription(eventDetails.description || '');
      setLocation(eventDetails.location || '');
      setStartDateTime(eventDetails.startDateTime || '');
      setEndDateTime(eventDetails.endDateTime || '');
      setMealsProvided(eventDetails.mealsProvided || false);
      setTransportProvided(eventDetails.transportProvided || false);
      setAccommodationProvided(eventDetails.accommodationProvided || false);
      
      // Load time slots if available
      if (eventDetails.timeSlotsConfig) {
        setTimeSlotsConfig(eventDetails.timeSlotsConfig);
      }
    }
  }, [eventDetails]);

  return (
    <Fade in={fadeIn} timeout={800}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100%',
          backgroundColor: '#fff',
          paddingBottom: '40px',
          width: '100%',
          paddingX: { xs: 2, sm: 4 },
        }}
      >
        {/* Header with Step Navigation */}
        <HeaderWithProgressBar progressValue={33} />
        
        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '16px',
            width: { xs: '100%', sm: '90%', md: '80%' },
            padding: { xs: 2, sm: 3, md: 4 },
            boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)',
            overflow: 'hidden',
            background: 'linear-gradient(to bottom, #ffffff, #f8f8f8)',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            '&:hover': {
              boxShadow: '0px 12px 28px rgba(149, 157, 165, 0.3)',
              transform: 'translateY(-5px)'
            }
          }}
        >
          {/* Form Content */}
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="h4"
              sx={{
                color: '#977342',
                marginBottom: 1,
                fontSize: { xs: '22px', sm: '26px', md: '30px' },
                fontWeight: 'bold',
                position: 'relative',
                display: 'inline-block',
                paddingBottom: '8px',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  width: '60px',
                  height: '3px',
                  bottom: 0,
                  left: 0,
                  backgroundColor: '#CEAB76',
                  borderRadius: '2px'
                }
              }}
            >
              Create New Event
            </Typography>

            <Typography variant="body1" sx={{ color: '#6B7280', mb: 4, mt: 1 }}>
              Fill in the details below to create your event. All fields marked with * are required.
            </Typography>

            {errors.general && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3, 
                  borderRadius: '8px',
                  '& .MuiAlert-icon': {
                    color: '#d32f2f'
                  }
                }}
              >
                {errors.general}
              </Alert>
            )}

            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#333', 
                  mb: 3,
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  '&:before': {
                    content: '""',
                    width: '4px',
                    height: '24px',
                    backgroundColor: '#977342',
                    marginRight: '12px',
                    borderRadius: '2px'
                  }
                }}
              >
                Basic Information
              </Typography>

              <TextField
                label="Event Title *"
                placeholder="Enter a descriptive title for your event"
                variant="outlined"
                fullWidth
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                onBlur={() => {
                  if (hasProfanity(eventTitle)) {
                    setErrors({...errors, title: 'Please use appropriate language in the title'});
                  } else if (!eventTitle.trim()) {
                    setErrors({...errors, title: 'Event title is required'});
                  } else {
                    setErrors({...errors, title: ''});
                  }
                }}
                error={!!errors.title}
                helperText={errors.title}
                sx={{ 
                  marginBottom: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&:hover fieldset': {
                      borderColor: '#977342',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#977342',
                    },
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TitleIcon sx={{ color: '#977342' }} />
                    </InputAdornment>
                  ),
                }}
              />
              
              <TextField
                label="Location *"
                placeholder="Where will your event take place?"
                variant="outlined"
                fullWidth
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onBlur={() => {
                  if (!location.trim()) {
                    setErrors({...errors, location: 'Location is required'});
                  } else {
                    setErrors({...errors, location: ''});
                  }
                }}
                error={!!errors.location}
                helperText={errors.location}
                sx={{ 
                  marginBottom: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&:hover fieldset': {
                      borderColor: '#977342',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#977342',
                    },
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon sx={{ color: '#977342' }} />
                    </InputAdornment>
                  ),
                }}
              />
              
              <Box sx={{ mb: 1 }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    marginBottom: 1, 
                    color: '#374151', 
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center' 
                  }}
                >
                  <DescriptionIcon sx={{ color: '#977342', mr: 1, fontSize: '20px' }} />
                  Description *
                </Typography>
              </Box>
              
              <TextField
                multiline
                rows={4}
                placeholder="Provide a detailed description of your event..."
                variant="outlined"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => {
                  if (hasProfanity(description)) {
                    setErrors({...errors, description: 'Please use appropriate language in the description'});
                  } else if (!description.trim()) {
                    setErrors({...errors, description: 'Event description is required'});
                  } else {
                    setErrors({...errors, description: ''});
                  }
                }}
                error={!!errors.description}
                helperText={errors.description}
                sx={{ 
                  marginBottom: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&:hover fieldset': {
                      borderColor: '#977342',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#977342',
                    },
                  }
                }}
              />
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#333', 
                  mb: 3,
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '&:before': {
                    content: '""',
                    width: '4px',
                    height: '24px',
                    backgroundColor: '#977342',
                    marginRight: '12px',
                    borderRadius: '2px'
                  }
                }}>
                  Date and Time
                </Box>
                
                <Tooltip title="Events must be at least one hour long" placement="top">
                  <IconButton size="small">
                    <HelpOutlineIcon sx={{ color: '#977342', fontSize: '18px' }} />
                  </IconButton>
                </Tooltip>
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: 2,
                  marginBottom: errors.dateTime ? 1 : 3,
                }}
              >
                <DateTimePicker
                  label="Start Date & Time *"
                  value={startDateTime}
                  onChange={(e) => {
                    setStartDateTime(e.target.value);
                    // Check time gap whenever either date changes
                    if (endDateTime) {
                      if (!validateTimeGap(e.target.value, endDateTime)) {
                        setErrors({...errors, dateTime: 'Event must be at least one hour long'});
                      } else {
                        setErrors({...errors, dateTime: ''});
                      }
                    }
                  }}
                />
                
                <DateTimePicker
                  label="End Date & Time *"
                  value={endDateTime}
                  onChange={(e) => {
                    setEndDateTime(e.target.value);
                    // Check time gap whenever either date changes
                    if (startDateTime) {
                      if (!validateTimeGap(startDateTime, e.target.value)) {
                        setErrors({...errors, dateTime: 'Event must be at least one hour long'});
                      } else {
                        setErrors({...errors, dateTime: ''});
                      }
                    }
                  }}
                />
              </Box>
              
              {errors.dateTime && (
                <Typography 
                  color="error" 
                  variant="caption" 
                  sx={{ 
                    mb: 3, 
                    display: 'block',
                    ml: 1 
                  }}
                >
                  {errors.dateTime}
                </Typography>
              )}
            </Box>
            
            {/* Working Hours Section */}
            {selectedDays?.length > 0 && (
              <>
                <Divider sx={{ my: 3 }} />
                
                <Box sx={{ mb: 4 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#333', 
                      mb: 3,
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      '&:before': {
                        content: '""',
                        width: '4px',
                        height: '24px',
                        backgroundColor: '#977342',
                        marginRight: '12px',
                        borderRadius: '2px'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTimeIcon sx={{ mr: 1, color: '#977342' }} />
                      Working Hours
                    </Box>
                  </Typography>
                  
                  <TimeSlotsField 
                    selectedDays={selectedDays}
                    value={timeSlotsConfig}
                    onChange={handleTimeSlotsChange}
                  />
                </Box>
              </>
            )}
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#333', 
                  mb: 3,
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  '&:before': {
                    content: '""',
                    width: '4px',
                    height: '24px',
                    backgroundColor: '#977342',
                    marginRight: '12px',
                    borderRadius: '2px'
                  }
                }}
              >
                Services Provided
              </Typography>

              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                gap: 2
              }}>
                <CheckboxItem 
                  onChange={(e) => setMealsProvided(e.target.checked)} 
                  value={mealsProvided} 
                  label="Meals Provided" 
                />
                <CheckboxItem 
                  onChange={(e) => setTransportProvided(e.target.checked)} 
                  value={transportProvided} 
                  label="Transport Provided" 
                />
                <CheckboxItem 
                  onChange={(e) => setAccommodationProvided(e.target.checked)} 
                  value={accommodationProvided} 
                  label="Accommodation Provided" 
                />
              </Box>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              mt: 4,
              pt: 3,
              borderTop: '1px solid #eee'
            }}>
              <Box sx={{ 
                backgroundColor: 'rgba(151, 115, 66, 0.08)', 
                borderRadius: '8px',
                p: 2,
                display: { xs: 'none', md: 'block' },
                flex: '1',
                mr: 4,
                border: '1px dashed rgba(151, 115, 66, 0.3)'
              }}>
                <Typography variant="body2" sx={{ color: '#977342', fontStyle: 'italic' }}>
                  Creating a detailed event helps attract the perfect candidates. Be specific about requirements and expectations for better matches.
                </Typography>
              </Box>
              
              <Button
                variant="contained"
                size={isMobile ? "medium" : "large"}
                sx={{
                  backgroundColor: '#977342',
                  color: 'white',
                  borderRadius: '8px',
                  padding: { xs: '10px 20px', md: '12px 24px' },
                  fontSize: { xs: '14px', md: '16px' },
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: '0 4px 12px rgba(151, 115, 66, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#CEAB76',
                    boxShadow: '0 6px 16px rgba(151, 115, 66, 0.3)',
                    transform: 'translateY(-2px)'
                  },
                }}
                onClick={handleContinue}
              >
                Next Step
                <ArrowForwardIcon sx={{ marginLeft: '8px' }} />
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
};

export default EventDetails;