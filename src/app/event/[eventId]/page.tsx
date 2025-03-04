"use client";

import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { useCookies } from "react-cookie";
import useUserEventsStore from "@/state/use-user-events-store";
import Loading from "@/components/Loading";
import Header from "@/components/dashboard/Header";
import GreyFooter from "@/components/GreyFooter";

const EventPage = () => {
  const router = useRouter();
  const { userEvents } = useStore(useUserEventsStore); 
  const [event, setEvent] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(['current_event']);

  useEffect(() => {
    setLoading(false);
    console.log("Event Object:", Array.from(cookies?.current_event));
    setEvent(Array.from(cookies?.current_event));
  }, [])

  if (loading) return <Loading />;

  if (!event) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h4" color="error">
          Event not found
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/events")}
          sx={{ marginTop: 2 }}
        >
          Back to Events
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "white",
      }}
    >
      <Header />

      <Box sx={{ flexGrow: 1, padding: { xs: 2, md: 3 } }}>
        <Card sx={{ padding: 2, borderRadius: "12px", boxShadow: 1 }}>
          <CardContent>
            <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
              {event.title}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              {event.description}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Location:
                </Typography>
                <Typography variant="body2">{event.location}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Date & Time:
                </Typography>
                <Typography variant="body2">
                  {/* {formatDateTime(event.start_time)} - {formatDateTime(event.end_time)} */}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Organizer:
                </Typography>
                <Typography variant="body2">{event.organizer}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Status:
                </Typography>
                <Typography variant="body2">{event.event_status}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      <GreyFooter />
    </Box>
  );
};

// Helper function to format date and time
const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
};

export default EventPage;