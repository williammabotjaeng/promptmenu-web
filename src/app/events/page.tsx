"use client";

import * as React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { StatCard } from "@/components/dashboard/StatCard";
import { JobCard } from "@/components/dashboard/JobCard";
import { ActivityItem } from "@/components/dashboard/ActivityItem";
import { EventsData, statsData, recentActivities } from "@/data/index";
import { useAuth } from "@/providers/auth-providers";
import { useEvent } from "@/providers/event-provider";
import Header from "@/components/dashboard/Header";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import useAuthStore from "@/state/use-auth-store";
import { useRouter, redirect } from "next/navigation";
import { useCookies } from "react-cookie";
import { PersonAdd, Star } from "@mui/icons-material";
import Work from "@mui/icons-material/Work";
import Loading from "@/components/Loading";
import GreyFooter from "@/components/GreyFooter";
import SecondaryHeader from "@/components/SecondaryHeader";
import Footer from "@/components/Footer";
import EventCard from "@/components/dashboard/event/EventCard";
import useUserEventsStore from "@/state/use-user-events-store";
import useAllEventsStore from "@/state/use-all-events-store";

const Events = () => {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [cookies, setCookie] = useCookies([
    "ssh_session_id",
    "user_role",
    "onboarding_presented",
    "ssh_access"
  ]);

  const { getUserEvents } = useEvent();

  let user_role = cookies["user_role"];

  const user_roles = ["client", "talent", "influencer"];

  const onboardingPresented = cookies["onboarding_presented"] || false;
  const sshAccess = cookies?.ssh_access || "";

  const [openModal, setOpenModal] = useState(true);
  const [loading, setLoading] = useState(false);

  const { userEvents } = useStore(useUserEventsStore);
  const { allEvents } = useStore(useAllEventsStore);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCreateEvent = () => {
    router.push('/post-event')
  }

  useEffect(() => {
    console.log("User Role:", user_role);
    setLoading(true);
    getUserEvents();
    console.log("User Events for Page:", userEvents);
    if (user_role === "None") {
      console.log("User role:", typeof user_role);
      console.log("Check:", !user_role);
      setLoading(false);
      setOpenModal(true);
    } else {
      if (user_role === "client") {
        console.log("It's a client");
        if (!onboardingPresented) {
          router.push("/company-profile");
        }
        setTimeout(() => {
          setLoading(false);
        }, 500);
        // router.push('/dashboard');
      } else if (user_role === "talent" || user_role === "influencer") {
        console.log("It's talent");
        setLoading(false);
        redirect("/portal");
      }
    }

    setLoading(false);
  }, [user_role, router]);

  if (loading) return <Loading />;

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
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ padding: 2, borderRadius: "12px", boxShadow: 1 }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Your Events
                  </Typography>
                  {userEvents?.length <= 0 ? null : <Button
                    sx={{
                      color: "gray",
                      "&:hover": {
                        color: "white",
                      },
                    }}
                  >
                    View All
                  </Button>}
                </Box>
                {sshAccess === "admin" ? <Box sx={{ marginTop: 2 }}>
                  {allEvents && allEvents?.length > 0 ? (
                    allEvents?.map((event, index) => (
                      <Box key={index} sx={{ marginTop: index > 0 ? 2 : 0 }}>
                        <EventCard event={event} />
                      </Box>
                    ))
                  ) : (
                    <Box sx={{ textAlign: "center", marginTop: 4 }}>
                      <Typography variant="h6">You have no events.</Typography>
                      <Typography variant="body2" sx={{ marginBottom: 2 }}>
                        Create your first event to get started!
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={handleCreateEvent}
                        sx={{
                          "&:hover": {
                            color: 'white'
                          }
                        }}
                      >
                        Create Event
                      </Button>
                    </Box>
                  )}
                </Box> : null}
                {sshAccess !== "admin" ? <Box sx={{ marginTop: 2 }}>
                  {userEvents && userEvents.length > 0 ? (
                    userEvents.map((event, index) => (
                      <Box key={index} sx={{ marginTop: index > 0 ? 2 : 0 }}>
                        <EventCard event={event} />
                      </Box>
                    ))
                  ) : (
                    <Box sx={{ textAlign: "center", marginTop: 4 }}>
                      <Typography variant="h6">You have no events.</Typography>
                      <Typography variant="body2" sx={{ marginBottom: 2 }}>
                        Create your first event to get started!
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={handleCreateEvent}
                        sx={{
                          "&:hover": {
                            color: 'white'
                          }
                        }}
                      >
                        Create Event
                      </Button>
                    </Box>
                  )}
                </Box> : null}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <GreyFooter />
    </Box>
  );
};

export default Events;
