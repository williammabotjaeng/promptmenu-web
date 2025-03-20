"use client";

import React, { useState, useEffect } from "react";
import { EventDetails } from "@/components/dashboard/event/page/EventDetails";
import { useRouter } from "next/navigation";
import { useStore } from "zustand";
import Header from "@/components/dashboard/Header";
import { Box, Button, Typography, Fab, IconButton } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SaveIcon from "@mui/icons-material/Save";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { EventMedia } from "@/components/dashboard/event/page/EventMedia";
import EventRoles from "@/components/dashboard/event/page/EventRoles";
import useCurrentEventStore from "@/state/use-current-event-store";
import { useCookies } from 'react-cookie';
import { useEvent } from "@/providers/event-provider";
import FetchingEvent from "@/components/dashboard/FetchingEvent";

const EditEventPage = () => {
  const router = useRouter();

  const { currentEvent } = useStore(useCurrentEventStore);

  const [event, setEvent] = useState(currentEvent || null);
  
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);

  const { fetchEvent } = useEvent();

  const [cookies, setCookie] = useCookies([
    "event_photos", "event_poster", "event_video", "event_id"
  ]);

  const handleDown = () => {
    if (currentPage >= 2) {
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
    setLoading(true);
    fetchEvent()
    .then((data) => {
    console.log("Fetch Event Response:", data);
    setEvent(currentEvent);
    setEventTitle(currentEvent?.title || "");
    setDescription(currentEvent?.description || "");
    setLocation(currentEvent?.location || "");
    setStartDateTime(currentEvent?.startTime || null);
    setEndDateTime(currentEvent?.endTime || null);
    setMealsProvided(currentEvent?.mealsProvided || false);
    setTransportProvided(currentEvent?.transportProvided || false);
    setAccommodationProvided(currentEvent?.accommodationProvided || false);
  })
  .catch((err) => console.error("Error Fetching Event:", err));

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  }, [cookies]);

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

  const goBack = () => {
    router.push(`/events`);
  }

  if (!event) return null;

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "white" }}>
        <FetchingEvent />
      </Box>
    );
  }

  return (
    <>
    <Box sx={{
      backgroundColor: 'white'
    }}>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          padding: 4,
        }}
      >
        <IconButton
          onClick={goBack}
          sx={{
            fontFamily: "Inter",
            color: "#977342",
            "&:hover": {
              color: "#CEAB76",
            },
          }}
        >
          <ArrowBackIosNewIcon />
          <Typography
            sx={{
              fontSize: "12px",
              ml: 1,
            }}
          >
            Go Back
          </Typography>
        </IconButton>
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
            <Typography
              sx={{
                display: { xs: "none", sm: "flex", md: "flex" },
                fontSize: { xs: null, sm: "10px", md: "14px" },
              }}
            >
              Save Event
            </Typography>
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
            <Typography
              sx={{
                display: { xs: "none", sm: "flex", md: "flex" },
                fontSize: { xs: null, sm: "10px", md: "14px" },
              }}
            >
              Change Status
            </Typography>
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
            <Typography
              sx={{
                display: { xs: "none", sm: "flex", md: "flex" },
                fontSize: { xs: null, sm: "10px", md: "14px" },
              }}
            >
              Delete Event
            </Typography>
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
            <Typography
              sx={{
                display: { xs: "none", sm: "flex", md: "flex" },
                fontSize: { xs: null, sm: "10px", md: "14px" },
              }}
            >
              Approve Event
            </Typography>
          </Button>
        </Box>
      </Box>
      {currentPage === 0 && (
        <EventDetails
          eventTitle={eventTitle ? eventTitle : currentEvent?.title}
          setEventTitle={setEventTitle}
          description={description ? description : currentEvent?.description}
          setDescription={setDescription}
          location={location ? location : currentEvent?.location}
          setLocation={setLocation}
          startDateTime={
            startDateTime ? startDateTime : currentEvent?.startTime
          }
          setStartDateTime={setStartDateTime}
          endDateTime={endDateTime ? endDateTime : currentEvent?.endTime}
          setEndDateTime={setEndDateTime}
          mealsProvided={
            mealsProvided ? mealsProvided : currentEvent?.mealsProvided
          }
          setMealsProvided={setMealsProvided}
          transportProvided={
            transportProvided
              ? transportProvided
              : currentEvent?.transportProvided
          }
          setTransportProvided={setTransportProvided}
          accommodationProvided={
            accommodationProvided
              ? accommodationProvided
              : currentEvent?.accommodationProvided
          }
          setAccommodationProvided={setAccommodationProvided}
          error={error}
          handleContinue={handleContinue}
        />
      )}
      {currentPage === 1 && <EventMedia />}
      {currentPage === 2 && <EventRoles event={event} />}

      {/* Floating Navigation Button */}
      {currentPage > 0 && (
        <Fab
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
        </Fab>
      )}
      {currentPage < 2 && (
        <Fab
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
        </Fab>
      )}
      </Box>
    </>
  );
};

export default EditEventPage;
