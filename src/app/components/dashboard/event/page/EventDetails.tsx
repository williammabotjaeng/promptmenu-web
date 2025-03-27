"use client";

import * as React from "react";
import { DateTimePicker } from "@/components/dashboard/event/DateTimePicker";
import { CheckboxItem } from "@/components/dashboard/event/CheckBoxItem";
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Paper, 
  Checkbox, 
  FormControlLabel,
  Divider,
  Fade,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  Tooltip,
  IconButton
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HotelIcon from "@mui/icons-material/Hotel";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import useEventStore from "@/state/use-event-store";
import { useStore } from "zustand";
import { useEffect, useState } from "react";
import { EventDetailsProps } from "@/types/EventsPageData";

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
  handleSaveSection,
}) => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <Fade in={fadeIn} timeout={800}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          p: { xs: 1, sm: 2, md: 4 },
        }}
      >
        <Card
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: "900px",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          <Box 
            sx={{ 
              backgroundColor: "#f5f7fa", 
              p: 3,
              borderBottom: "1px solid rgba(0,0,0,0.08)"
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#333",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
              }}
            >
              <EventIcon 
                sx={{ 
                  color: "#977342", 
                  mr: 1,
                  fontSize: "1.8rem"
                }} 
              />
              Event Details
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Fill in the essential information about your event below
            </Typography>
          </Box>

          <CardContent sx={{ p: 0 }}>
            <Grid container spacing={0}>
              {/* Left side - Main form */}
              <Grid item xs={12} md={8} sx={{ p: 3 }}>
                <Box 
                  component="form" 
                  sx={{ 
                    display: "flex", 
                    flexDirection: "column",
                    gap: 3
                  }}
                >
                  <TextField
                    label="Event Title"
                    variant="outlined"
                    fullWidth
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="Enter a clear, descriptive title for your event"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TitleIcon sx={{ color: "#977342" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ 
                        mb: 1, 
                        color: "#374151",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <DescriptionIcon sx={{ color: "#977342", mr: 1, fontSize: "1.1rem" }} />
                      Description
                    </Typography>
                    <TextField
                      multiline
                      rows={5}
                      variant="outlined"
                      fullWidth
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your event in detail: what attendees can expect, any special features, etc."
                    />
                  </Box>
                  
                  <TextField
                    label="Location"
                    variant="outlined"
                    fullWidth
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Where will the event take place?"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnIcon sx={{ color: "#977342" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ 
                        mb: 1, 
                        color: "#374151",
                        fontWeight: 600
                      }}
                    >
                      Event Schedule
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <DateTimePicker
                          label="Start Date & Time"
                          value={startDateTime}
                          onChange={(e) => setStartDateTime(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <DateTimePicker
                          label="End Date & Time"
                          value={endDateTime}
                          onChange={(e) => setEndDateTime(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
              
              {/* Right side - Amenities */}
              <Grid item xs={12} md={4} sx={{ 
                borderLeft: { xs: "none", md: "1px solid rgba(0,0,0,0.08)" },
                backgroundColor: { xs: "#f5f7fa", md: "rgba(151, 115, 66, 0.03)" },
                p: 3
              }}>
                <Typography
                  variant="subtitle1"
                  sx={{ 
                    mb: 2,
                    color: "#374151",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <span>Amenities Provided</span>
                  <Tooltip title="Check what will be provided to participants">
                    <InfoOutlinedIcon sx={{ color: "text.secondary", fontSize: "1rem" }} />
                  </Tooltip>
                </Typography>
                
                <Box 
                  sx={{ 
                    display: "flex", 
                    flexDirection: "column",
                    gap: 1.5
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{ 
                          color: "#977342",
                          '&.Mui-checked': {
                            color: "#977342",
                          },
                        }}
                        checked={mealsProvided}
                        onChange={(e) => setMealsProvided(e.target.checked)}
                        icon={<RestaurantIcon sx={{ opacity: 0.5 }} />}
                        checkedIcon={<RestaurantIcon />}
                      />
                    }
                    label={
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="body2" fontWeight={500}>
                          Meals Provided
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Food and beverages for participants
                        </Typography>
                      </Box>
                    }
                  />
                  
                  <Divider sx={{ my: 0.5 }} />
                  
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{ 
                          color: "#977342",
                          '&.Mui-checked': {
                            color: "#977342",
                          },
                        }}
                        checked={transportProvided}
                        onChange={(e) => setTransportProvided(e.target.checked)}
                        icon={<DirectionsCarIcon sx={{ opacity: 0.5 }} />}
                        checkedIcon={<DirectionsCarIcon />}
                      />
                    }
                    label={
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="body2" fontWeight={500}>
                          Transport Provided
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Transportation to or from the venue
                        </Typography>
                      </Box>
                    }
                  />
                  
                  <Divider sx={{ my: 0.5 }} />
                  
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{ 
                          color: "#977342",
                          '&.Mui-checked': {
                            color: "#977342",
                          },
                        }}
                        checked={accommodationProvided}
                        onChange={(e) => setAccommodationProvided(e.target.checked)}
                        icon={<HotelIcon sx={{ opacity: 0.5 }} />}
                        checkedIcon={<HotelIcon />}
                      />
                    }
                    label={
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="body2" fontWeight={500}>
                          Accommodation Provided
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Lodging arrangements for participants
                        </Typography>
                      </Box>
                    }
                  />
                </Box>
                
                <Box sx={{ mt: 4 }}>
                  <Typography
                    variant="body2"
                    sx={{ 
                      p: 2,
                      borderRadius: "8px",
                      backgroundColor: "rgba(151, 115, 66, 0.08)",
                      color: "#977342",
                      border: "1px dashed rgba(151, 115, 66, 0.3)"
                    }}
                  >
                    <strong>Tip:</strong> Being clear about amenities helps attract the right talent and sets proper expectations.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            
            {/* Error message */}
            {error && (
              <Box sx={{ px: 3, pb: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ 
                    color: "#d32f2f", 
                    fontWeight: "medium",
                    p: 1.5,
                    borderRadius: "4px",
                    backgroundColor: "rgba(211, 47, 47, 0.08)"
                  }}
                >
                  {error}
                </Typography>
              </Box>
            )}

            {/* Submit Button */}
            <Box 
              sx={{ 
                display: "flex", 
                justifyContent: "flex-end", 
                p: 3,
                borderTop: "1px solid rgba(0,0,0,0.08)",
                backgroundColor: "#f5f7fa"
              }}
            >
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveSection}
                sx={{
                  backgroundColor: "#977342",
                  color: "white",
                  px: 3,
                  py: 1.5,
                  boxShadow: "0 4px 12px rgba(151, 115, 66, 0.2)",
                  "&:hover": {
                    backgroundColor: "#CEAB76",
                  },
                }}
              >
                Save Details
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
};