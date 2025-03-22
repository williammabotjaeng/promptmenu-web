import * as React from 'react';
import { DateTimePicker } from '@/components/dashboard/event/DateTimePicker';
import { CheckboxItem } from '@/components/dashboard/event/CheckBoxItem';
import { TextField, Button, Box, Typography, Paper, Alert } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HeaderWithProgressBar from './HeaderWithProgressBar';
import { PostEventStepProps } from '@/types/Props/PostEventStepProps';
import useEventStore from '@/state/use-event-store';
import { useStore } from 'zustand';
import { useEffect, useState } from 'react';
import { Filter } from 'bad-words';

export const EventDetails: React.FC<PostEventStepProps> = ({ activeStep, setActiveStep }) => {
  const { eventDetails, setEventDetails } = useStore(useEventStore);
  const profanityFilter = new Filter();

  // Form state
  const [eventTitle, setEventTitle] = useState(eventDetails?.eventTitle || '');
  const [description, setDescription] = useState(eventDetails?.description || '');
  const [location, setLocation] = useState(eventDetails?.location || '');
  const [startDateTime, setStartDateTime] = useState(eventDetails?.startDateTime || '');
  const [endDateTime, setEndDateTime] = useState(eventDetails?.endDateTime || '');
  const [mealsProvided, setMealsProvided] = useState(eventDetails?.mealsProvided || false);
  const [transportProvided, setTransportProvided] = useState(eventDetails?.transportProvided || false);
  const [accommodationProvided, setAccommodationProvided] = useState(eventDetails?.accommodationProvided || false);

  // Validation state
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    location: '',
    dateTime: '',
    general: '',
  });

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

  // Handle form submission
  const handleContinue = () => {
    if (validateForm()) {
      // Update store with validated data
      setEventDetails({
        eventTitle,
        description,
        location,
        startDateTime,
        endDateTime,
        mealsProvided,
        transportProvided,
        accommodationProvided,
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
    }
  }, [eventDetails]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#fff',
        paddingBottom: '40px',
        width: '100%',
        paddingX: { xs: 2, sm: 4 },
      }}
    >
      {/* Header with Step Navigation */}
      <HeaderWithProgressBar progressValue={33} />
      
      <Paper
        elevation={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '8px',
          width: { xs: '100%', sm: '80%' },
          padding: 2,
          boxShadow: '0px 4px 10px rgba(156, 163, 175, 0.5)',
        }}
      >
        {/* Form Content */}
        <Box sx={{ padding: 2, width: '100%' }}>
          <Typography
            variant="h5"
            sx={{
              color: '#977342',
              marginBottom: 2,
              fontSize: { xs: '20px', sm: '24px' },
              fontWeight: 'bold',
            }}
          >
            Create New Event
          </Typography>

          {errors.general && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.general}
            </Alert>
          )}

          <TextField
            label="Event Title"
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
            sx={{ marginBottom: 2 }}
          />
          
          <Typography variant="body1" sx={{ marginBottom: 1, color: '#374151' }}>
            Description
          </Typography>
          
          <TextField
            multiline
            rows={4}
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
            sx={{ marginBottom: 2 }}
          />
          
          <TextField
            label="Location"
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
            sx={{ marginBottom: 2 }}
          />
          
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'column', md: 'row' },
              gap: 1,
              marginBottom: 2,
            }}
          >
            <DateTimePicker
              label="Start Date & Time"
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
              label="End Date & Time"
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
            <Typography color="error" variant="caption" sx={{ mt: -1, mb: 2, display: 'block' }}>
              {errors.dateTime}
            </Typography>
          )}
          
          <Box sx={{ marginBottom: 2 }}>
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

        {/* Submit Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#977342',
              color: 'white',
              '&:hover': {
                backgroundColor: '#fff',
                border: '1px solid #977342',
                color: '#977342',
              },
            }}
            onClick={handleContinue}
          >
            Next Step
            <ArrowForwardIcon sx={{ marginLeft: '8px' }} />
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default EventDetails;