"use client";

import * as React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
  Fade,
  Chip,
  Divider,
  Paper,
  Stack,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme
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
import { 
  PersonAdd, 
  Star, 
  Add as AddIcon,
  Event as EventIcon,
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
  CalendarMonth as CalendarIcon
} from "@mui/icons-material";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [cookies, setCookie] = useCookies([
    "ssh_session_id",
    "user_role",
    "onboarding_presented",
    "ssh_access",
    "firstname"
  ]);

  const { getUserEvents, getAllEvents } = useEvent();

  let user_role = cookies["user_role"];
  let firstName = cookies["firstname"] || "User";

  const user_roles = ["client", "talent", "influencer"];

  const onboardingPresented = cookies["onboarding_presented"] || false;
  const sshAccess = cookies?.ssh_access || "";

  const [openModal, setOpenModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const { userEvents } = useStore(useUserEventsStore);
  const { allEvents } = useStore(useAllEventsStore);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCreateEvent = () => {
    router.push('/post-event');
  };

  const handleRefresh = () => {
    setLoading(true);
    if (sshAccess === "admin") {
      getAllEvents();
    } else {
      getUserEvents();
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    console.log("User Role:", user_role);
    setLoading(true);
    if (sshAccess === "admin") {
      getAllEvents();
    } else {
      getUserEvents();
    }
    
    setTimeout(() => {
      setLoading(false);
      // Trigger fade-in animation after component mounts and data loads
      setFadeIn(true);
    }, 500);
  }, [user_role, router]);

  const events = sshAccess === "admin" ? allEvents : userEvents;
  const hasEvents = events && events.length > 0;

  if (loading) return <Loading />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Header />

      <Container maxWidth="xl" sx={{ flexGrow: 1, py: 4 }}>
        {/* Welcome Banner */}
        <Fade in={fadeIn} timeout={800}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: "16px",
              background: "linear-gradient(135deg, #977342 0%, #CEAB76 100%)",
              color: "white",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box sx={{ position: "relative", zIndex: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                {sshAccess === "admin" ? "All Events" : "Your Events"}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, maxWidth: "60%" }}>
                {sshAccess === "admin" 
                  ? "Manage and monitor all events across the platform." 
                  : "Create and manage your events, track attendance, and engage with participants."}
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleCreateEvent}
                sx={{
                  bgcolor: "white",
                  color: "#977342",
                  fontWeight: 500,
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.9)",
                  },
                }}
              >
                Create New Event
              </Button>
            </Box>
            
            {/* Decorative elements */}
            <Box
              sx={{
                position: "absolute",
                right: { xs: -100, md: 0 },
                bottom: { xs: -40, md: -20 },
                top: { xs: "auto", md: -20 },
                opacity: 0.15,
                transform: "rotate(-10deg)",
                zIndex: 1,
              }}
            >
              <svg width="300" height="300" viewBox="0 0 24 24">
                <path
                  fill="white"
                  d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z"
                />
              </svg>
            </Box>
          </Paper>
        </Fade>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Fade in={fadeIn} timeout={900}>
              <Card
                sx={{
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease",
                  height: "100%",
                  overflow: "visible",
                  "&:hover": {
                    boxShadow: "0 6px 25px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CalendarIcon sx={{ color: "#977342", mr: 1.5 }} />
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 600,
                          color: "#333",
                        }}
                      >
                        {sshAccess === "admin" ? "All Events" : "Your Events"}
                      </Typography>
                      {hasEvents && (
                        <Chip
                          label={events.length}
                          size="small"
                          sx={{ 
                            ml: 1, 
                            bgcolor: "rgba(151, 115, 66, 0.1)", 
                            color: "#977342",
                            fontWeight: 500
                          }}
                        />
                      )}
                    </Box>

                    {hasEvents && (
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Tooltip title="Refresh events">
                          <IconButton 
                            size="small" 
                            onClick={handleRefresh}
                            sx={{ 
                              color: "#977342",
                              "&:hover": { bgcolor: "rgba(151, 115, 66, 0.1)" }
                            }}
                          >
                            <RefreshIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Filter events">
                          <IconButton 
                            size="small"
                            sx={{ 
                              color: "#977342",
                              "&:hover": { bgcolor: "rgba(151, 115, 66, 0.1)" }
                            }}
                          >
                            <FilterListIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    )}
                  </Box>

                  <Divider sx={{ mb: 3 }} />

                  <Box>
                    {hasEvents ? (
                      <Stack spacing={2.5}>
                        {events.map((event, index) => (
                          <Fade 
                            in={fadeIn} 
                            timeout={900 + (index * 100)} 
                            key={index}
                          >
                            <Box>
                              <EventCard event={event} />
                            </Box>
                          </Fade>
                        ))}
                      </Stack>
                    ) : (
                      <Box sx={{ 
                        textAlign: "center", 
                        py: 6,
                        px: 3,
                        backgroundColor: "rgba(0,0,0,0.02)",
                        borderRadius: "12px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2
                      }}>
                        <EventIcon sx={{ fontSize: 60, color: "rgba(0,0,0,0.2)" }} />
                        <Typography variant="h5" color="text.secondary" fontWeight={500}>
                          No events yet
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "500px", mb: 2 }}>
                          {sshAccess === "admin" 
                            ? "There are no events in the system yet." 
                            : "Create your first event to get started and manage all aspects of your event in one place."}
                        </Typography>
                        <Button
                          variant="contained"
                          startIcon={<AddIcon />}
                          onClick={handleCreateEvent}
                          sx={{
                            backgroundColor: "#977342",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "#CEAB76",
                            },
                            px: 3,
                            py: 1,
                          }}
                        >
                          Create Event
                        </Button>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {/* Quick Info Card */}
              <Fade in={fadeIn} timeout={1000}>
                <Card
                  sx={{
                    borderRadius: "16px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    bgcolor: "#fff",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#333" }}>
                      Events Dashboard
                    </Typography>
                    
                    <Stack spacing={2}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: "10px",
                          bgcolor: "rgba(151, 115, 66, 0.05)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Total Events
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: "#977342" }}>
                          {events?.length || 0}
                        </Typography>
                      </Paper>
                      
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: "10px",
                          bgcolor: "rgba(76, 175, 80, 0.05)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Active Events
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: "#4CAF50" }}>
                          {events?.filter(e => e.event_status === 'live')?.length || 0}
                        </Typography>
                      </Paper>
                      
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: "10px", 
                          bgcolor: "rgba(255, 152, 0, 0.05)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Draft Events
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: "#FF9800" }}>
                          {events?.filter(e => e.event_status === 'draft')?.length || 0}
                        </Typography>
                      </Paper>
                    </Stack>
                    
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        mt: 3,
                        borderColor: "#977342",
                        color: "#977342",
                        "&:hover": {
                          borderColor: "#CEAB76",
                          bgcolor: "rgba(151, 115, 66, 0.05)",
                        },
                      }}
                      onClick={handleCreateEvent}
                    >
                      Create New Event
                    </Button>
                  </CardContent>
                </Card>
              </Fade>
              
              {/* Tips Card */}
              <Fade in={fadeIn} timeout={1100}>
                <Card
                  sx={{
                    borderRadius: "16px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    bgcolor: "rgba(151, 115, 66, 0.02)",
                    border: "1px solid rgba(151, 115, 66, 0.1)",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 2, 
                        fontWeight: 600, 
                        color: "#977342",
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <Star sx={{ mr: 1, fontSize: 20 }} />
                      Tips for Success
                    </Typography>
                    
                    <Stack spacing={2}>
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        • Add high-quality photos to make your event stand out
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        • Clearly define roles and responsibilities for better matches
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        • Set realistic deadlines to attract the right candidates
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        • Provide detailed event descriptions for better visibility
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Fade>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <GreyFooter />
    </Box>
  );
};

export default Events;