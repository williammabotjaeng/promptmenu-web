"use client";

import * as React from 'react';
import { DateTimePicker } from '@/components/dashboard/event/DateTimePicker';
import { CheckboxItem } from '@/components/dashboard/event/CheckBoxItem';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import SaveIcon from "@mui/icons-material/Save"; 
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { PostEventStepProps } from '@/types/Props/PostEventStepProps';
import useEventStore from '@/state/use-event-store';
import { useStore } from 'zustand';
import { useEffect, useState } from 'react';
import { EventDetailsProps } from '@/types/EventsPageData';

export const EventDetails: React.FC<EventDetailsProps> = ({
    eventTitle,
    setEventTitle,
    description,
    setDescription,
    location,
    setLocation,
    startDateTime,
    setStartDateTime,
    endDateTime,
    setEndDateTime,
    mealsProvided,
    setMealsProvided,
    transportProvided,
    setTransportProvided,
    accommodationProvided,
    setAccommodationProvided,
    error,
    handleContinue,
  }) => {

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
            Event Details
          </Typography>
          <TextField
            label="Event Title"
            variant="outlined"
            fullWidth
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
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
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
              onChange={(e) => setStartDateTime(e.target.value)}
            />
            <DateTimePicker
              label="End Date & Time"
              value={endDateTime}
              onChange={(e) => setEndDateTime(e.target.value)}
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <CheckboxItem onChange={(e) => setMealsProvided(e.target.checked)} value={mealsProvided} label="Meals Provided" />
            <CheckboxItem onChange={(e) => setTransportProvided(e.target.checked)} value={transportProvided} label="Transport Provided" />
            <CheckboxItem onChange={(e) => setAccommodationProvided(e.target.checked)} value={accommodationProvided} label="Accommodation Provided" />
          </Box>
          {error && (
            <Typography
              variant="body2"
              sx={{ color: 'red', marginBottom: 2, fontWeight: 'bold' }}
            >
              {error}
            </Typography>
          )}
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
            Save Section
            <SaveIcon sx={{ marginLeft: '8px' }} />
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};