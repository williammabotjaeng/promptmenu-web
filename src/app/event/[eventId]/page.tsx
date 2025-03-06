"use client";

import React, { useState, useEffect } from "react";
import { EventDetails } from "@/components/dashboard/event/page/EventDetails"; 
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { WhiteHeader } from "@/components/WhiteHeader";
import { Box, Button, Typography, Fab } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SaveIcon from "@mui/icons-material/Save"; 
import SwapHorizIcon from "@mui/icons-material/SwapHoriz"; 
import DeleteIcon from "@mui/icons-material/Delete"; 
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { EventMedia } from "@/components/dashboard/event/page/EventMedia";
import EventRoles from "@/components/dashboard/event/page/EventRoles";

const EditEventPage = () => {
  const router = useRouter();
  const [cookies] = useCookies(["current_event"]);

  const currentEvent = cookies?.current_event;

  const [event, setEvent] = useState(currentEvent || null);

  const [currentPage, setCurrentPage] = useState(0); 

  const handleDown = () => {
     if (currentPage >= 2)
     {
       setCurrentPage(0);
     }
     setCurrentPage(currentPage + 1);
  };

  const handleUp = () => {
    if (currentPage <= 0) {
      setCurrentPage(2);
    }
     setCurrentPage(currentPage - 1);
  };

  const [eventTitle, setEventTitle] = useState(cookies?.current_event?.title || "");
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
      console.log("Current Event:", currentEvent);
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
  }, [cookies, router, currentPage]);

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
          <Typography sx={{
            display: { xs: 'none', sm: 'flex', md: 'flex' },
            fontSize: { xs: null, sm: '10px', md: '14px' }
          }}>Save Event</Typography>
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
          <Typography sx={{
            display: { xs: 'none', sm: 'flex', md: 'flex' },
            fontSize: { xs: null, sm: '10px', md: '14px' }
          }}>Change Status</Typography>
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
          <Typography sx={{
            display: { xs: 'none', sm: 'flex', md: 'flex' },
            fontSize: { xs: null, sm: '10px', md: '14px' }
          }}>Delete Event</Typography>
        </Button>
        {/* Delete Event Button */}
        <Button
          variant="contained"
          startIcon={<CheckCircleIcon />}
          sx={{
            backgroundColor: "#1d8037", 
            color: "white",
            "&:hover": {
              backgroundColor: "#1d6037",
            },
          }}
        >
          <Typography sx={{
            display: { xs: 'none', sm: 'flex', md: 'flex' },
            fontSize: { xs: null, sm: '10px', md: '14px' }
          }}>Approve Event</Typography>
        </Button>
      </Box>
    </Box>
    {currentPage === 0 && <EventDetails
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
    />}
    {currentPage === 1 && <EventMedia />}
    {currentPage === 2 && <EventRoles event={event} />}

     {/* Floating Navigation Button */}
     {currentPage > 0 && <Fab
        color="primary"
        onClick={handleUp}
        sx={{
          position: "fixed",
          bottom: 96,
          right: 16,
          backgroundColor: "#CEAB76", 
          "&:hover": {
            color: "#fff",
            backgroundColor: "#977342",
          },
        }}
      >
        {<ArrowUpwardIcon />}
      </Fab>}
      {currentPage < 2 && <Fab
        color="primary"
        onClick={handleDown}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          backgroundColor: "#ceab76", 
          "&:hover": {
            color: "#fff",
            backgroundColor: "#977342",
          },
        }}
      >
        {<ArrowDownwardIcon />}
      </Fab>}
    </>
  );
};

export default EditEventPage;