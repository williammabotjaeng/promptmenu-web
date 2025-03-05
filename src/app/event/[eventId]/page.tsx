"use client";

import React, { useState, useEffect } from "react";
import { EventDetails } from "@/components/dashboard/event/page/EventDetails"; 
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { WhiteHeader } from "@/components/WhiteHeader";
import { Box, Button, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save"; 
import SwapHorizIcon from "@mui/icons-material/SwapHoriz"; 
import DeleteIcon from "@mui/icons-material/Delete"; 

const EditEventPage = () => {
  const router = useRouter();
  const [cookies] = useCookies(["current_event"]);
  const [event, setEvent] = useState(null);

  // Form state
  const [eventTitle, setEventTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [mealsProvided, setMealsProvided] = useState(false);
  const [transportProvided, setTransportProvided] = useState(false);
  const [accommodationProvided, setAccommodationProvided] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cookies?.current_event) {
      const currentEvent = cookies.current_event;
      setEvent(currentEvent);
      setEventTitle(currentEvent.title || "");
      setDescription(currentEvent.description || "");
      setLocation(currentEvent.location || "");
      setStartDateTime(currentEvent.start_time || null);
      setEndDateTime(currentEvent.end_time || null);
      setMealsProvided(currentEvent.meals_provided || false);
      setTransportProvided(currentEvent.transport_provided || false);
      setAccommodationProvided(currentEvent.accommodation_provided || false);
    } else {
      router.push("/events");
    }
  }, [cookies, router]);

  const handleContinue = () => {
    if (!eventTitle || !description || !location) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    console.log("Event Details Saved:", {
      eventTitle,
      description,
      location,
      startDateTime,
      endDateTime,
      mealsProvided,
      transportProvided,
      accommodationProvided,
    });
    // Proceed to the next step
  };

  if (!event) return null;

  return (
    <>
    <WhiteHeader />
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
      padding: 4
    }}>
      <Typography variant="h5">Event Management</Typography>
      <br />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2, 
        }}
      >
        {/* Save Event Button */}
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          sx={{
            backgroundColor: "#000", // Default Material-UI blue
            color: "white",
            "&:hover": {
              backgroundColor: "#111",
            },
          }}
        >
          Save Event
        </Button>

        {/* Change Status Button */}
        <Button
          variant="contained"
          startIcon={<SwapHorizIcon />}
          sx={{
            backgroundColor: "#808000",
            color: "white",
            "&:hover": {
              backgroundColor: "#909000",
            },
          }}
        >
          Change Status
        </Button>

        {/* Delete Event Button */}
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          sx={{
            backgroundColor: "#982d28", 
            color: "white",
            "&:hover": {
              backgroundColor: "#d44a3b",
            },
          }}
        >
          Delete Event
        </Button>
      </Box>
    </Box>
    <EventDetails
      eventTitle={eventTitle}
      setEventTitle={setEventTitle}
      description={description}
      setDescription={setDescription}
      location={location}
      setLocation={setLocation}
      startDateTime={startDateTime}
      setStartDateTime={setStartDateTime}
      endDateTime={endDateTime}
      setEndDateTime={setEndDateTime}
      mealsProvided={mealsProvided}
      setMealsProvided={setMealsProvided}
      transportProvided={transportProvided}
      setTransportProvided={setTransportProvided}
      accommodationProvided={accommodationProvided}
      setAccommodationProvided={setAccommodationProvided}
      error={error}
      handleContinue={handleContinue}
    />
    </>
  );
};

export default EditEventPage;