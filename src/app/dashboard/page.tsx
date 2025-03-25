"use client";

import * as React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Divider,
  Fade,
  Paper,
  Avatar,
  IconButton,
  Stack,
  Tooltip,
  Container
} from "@mui/material";
import { JobCard } from "@/components/dashboard/JobCard";
import { useAuth } from "@/providers/auth-providers";
import Header from "@/components/dashboard/Header";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { useRouter, redirect } from "next/navigation";
import { useCookies } from "react-cookie";
import { 
  Add as AddIcon,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Refresh as RefreshIcon
} from "@mui/icons-material";
import Work from "@mui/icons-material/Work";
import Loading from "@/components/Loading";
import useLocalRolesStore from "@/state/use-local-roles-store";
import { useCompany } from "@/providers/company-provider";
import { useEvent } from "@/providers/event-provider";
import moment from "moment";
import ApplicationsIcon from "@/assets/applications-icon.svg";
import HiredIcon from "@/assets/hired-icon.svg";
import ActiveTalentsIcon from "@/assets/active-talents-icon.svg";
import TotalJobsIcon from "@/assets/total-jobs-icon.svg";
import VisibilityIcon from '@mui/icons-material/Visibility';
import GreyFooter from "@/components/GreyFooter";

const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [cookies] = useCookies([
    "ssh_session_id",
    "user_role",
    "ssh_access",
    "onboarding_presented",
    "firstname",
  ]);

  const { fetchCompany, company } = useCompany();

  const [showAllJobs, setShowAllJobs] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const [statsData, setStatsData] = useState([
    {
      title: "Total Jobs",
      value: company?.total_jobs || 0,
      icon: TotalJobsIcon?.src,
      color: "#4CAF50",
      bgColor: "rgba(76, 175, 80, 0.1)"
    },
    {
      title: "Applications",
      value: company?.applications || 0,
      icon: ApplicationsIcon?.src,
      color: "#FF9800",
      bgColor: "rgba(255, 152, 0, 0.1)"
    },
    {
      title: "Hired",
      value: company?.hired || 0,
      icon: HiredIcon?.src,
      color: "#9C27B0",
      bgColor: "rgba(156, 39, 176, 0.1)"
    },
  ]);

  const userRole = cookies["user_role"];
  const sshAccess = cookies["ssh_access"];
  const firstName = cookies["firstname"] || "User";
  const onboardingPresented = cookies["onboarding_presented"] || false;

  const [loading, setLoading] = useState(false);

  const { roles } = useStore(useLocalRolesStore);
  const { getRoles, getUserRoles } = useEvent();

  useEffect(() => {
    console.log("User Role:", userRole);
    console.log("SSH Access:", sshAccess);
    setLoading(true);
    
    // Determine which roles to fetch based on user role and access level
    const fetchAppropriateRoles = async () => {
      if (userRole === 'client') {
        if (sshAccess === 'admin') {
          console.log("Fetching all roles (admin view)");
          await getRoles();
        } else {
          console.log("Fetching user-specific roles");
          await getUserRoles();
        }
      } else {
        console.log("Fetching standard roles");
        await getRoles();
      }
    };
    
    fetchAppropriateRoles();
    fetchCompany();

    console.log("Company:", company);

    if (company) {
      console.log("Company:", company);

      setStatsData((prevStats) =>
        prevStats.map((stat) =>
          stat.title === "Total Jobs"
            ? { ...stat, value: company.total_jobs || 0 }
            : stat.title === "Applications"
            ? { ...stat, value: company.applications || 0 }
            : stat
        )
      );
    }

    if (userRole === "client") {
      console.log("It's a client");
      if (!onboardingPresented) {
        router.push("/company-profile");
      }
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } else if (userRole === "talent" || userRole === "influencer") {
      console.log("It's talent");
      setLoading(false);
      redirect("/portal");
    }

    setLoading(false);
    
    // Trigger fade-in animation after components mount
    setTimeout(() => {
      setFadeIn(true);
    }, 100);
  }, [userRole, sshAccess, router, cookies, company]);

  const handleCreateNewJob = () => {
    router.push("/post-event");
  };

  const handleRefreshRoles = async () => {
    // Use the same conditional logic to refresh roles
    if (userRole === 'client') {
      if (sshAccess === 'admin') {
        await getRoles();
      } else {
        await getUserRoles();
      }
    } else {
      await getRoles();
    }
  };

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
                Welcome back, {firstName}!
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, maxWidth: "60%" }}>
                Your dashboard is ready. Track your jobs, manage applications, and find the perfect talent for your events.
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleCreateNewJob}
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
                  d="M20,6H16V4H20V6M13,4H11V6H13V4M8,4H4V6H8V4M20,9H18V11H20V9M17,9H15V11H17V9M14,9H12V11H14V9M11,9H9V11H11V9M8,9H6V11H8V9M5,9H3V11H5V9M8,13H6V15H8V13M5,13H3V15H5V13M11,13H9V15H11V13M14,13H12V15H14V13M17,13H15V15H17V13M20,13H18V15H20V13M20,16H16V18H20V16M13,16H11V18H13V16M8,16H4V18H8V16Z"
                />
              </svg>
            </Box>
          </Paper>
        </Fade>

        {/* Stats Row */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statsData.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Fade in={fadeIn} timeout={800 + index * 100}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: "16px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    },
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                      <Typography variant="h6" color="text.secondary" sx={{ fontSize: "0.9rem" }}>
                        {stat.title}
                      </Typography>
                      <Avatar
                        src={stat.icon}
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: stat.bgColor,
                        }}
                      />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
                      {stat.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Recent Jobs */}
          <Grid item xs={12} md={8}>
            <Fade in={fadeIn} timeout={1000}>
              <Card
                sx={{
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease",
                  height: "100%",
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
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 600,
                          color: "#977342",
                        }}
                      >
                        {sshAccess === 'admin' ? 'All Jobs' : 'Your Jobs'}
                      </Typography>
                      <Chip
                        label={roles?.length || 0}
                        size="small"
                        sx={{ 
                          ml: 1, 
                          bgcolor: "rgba(151, 115, 66, 0.1)", 
                          color: "#977342",
                          fontWeight: 500
                        }}
                      />
                    </Box>

                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Tooltip title="Refresh jobs">
                        <IconButton 
                          size="small" 
                          onClick={handleRefreshRoles}
                          sx={{ 
                            color: "#977342",
                            "&:hover": { bgcolor: "rgba(151, 115, 66, 0.1)" }
                          }}
                        >
                          <RefreshIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      {roles?.length > 3 && (
                        <Button
                          variant="text"
                          endIcon={
                            showAllJobs ? (
                              <KeyboardArrowUp />
                            ) : (
                              <KeyboardArrowDown />
                            )
                          }
                          sx={{
                            color: "#977342",
                            fontWeight: 500,
                            "&:hover": {
                              backgroundColor: "rgba(151, 115, 66, 0.05)",
                            },
                          }}
                          onClick={() => setShowAllJobs(!showAllJobs)}
                        >
                          {showAllJobs ? "Show Less" : "View All"}
                        </Button>
                      )}
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 3 }} />

                  <Box>
                    {(showAllJobs ? roles : roles?.slice(0, 3))?.map(
                      (job, index) => (
                        <Fade in={true} key={index} timeout={300 + index * 100}>
                          <Box mb={2.5}>
                            <JobCard
                              roleId={job?.id}
                              title={job?.title}
                              location={job?.location}
                              ethnicities={job?.ethnicities}
                              hourlyPay={job?.hourly_pay}
                              dailyPay={job?.daily_pay}
                              skill={job?.skill}
                              hardDeadline={
                                job?.application_deadline
                                  ? `Closes in ${moment
                                      .duration(
                                        moment(job?.application_deadline).diff(
                                          moment()
                                        )
                                      )
                                      .humanize()}`
                                  : "No Deadline"
                              }
                              openings={job?.openings}
                              genders={job?.genders}
                              maxAge={job?.max_age}
                              minAge={job?.min_age}
                              role={job}
                            />
                          </Box>
                        </Fade>
                      )
                    )}

                    {roles?.length === 0 && (
                      <Box
                        sx={{
                          py: 6,
                          px: 3,
                          textAlign: "center",
                          color: "text.secondary",
                          backgroundColor: "rgba(0,0,0,0.02)",
                          borderRadius: "12px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 2
                        }}
                      >
                        <Work sx={{ fontSize: 48, color: "rgba(0,0,0,0.2)" }} />
                        <Typography variant="h6" color="text.secondary">
                          No jobs available
                        </Typography>
                        <Button
                          variant="outlined"
                          startIcon={<AddIcon />}
                          onClick={handleCreateNewJob}
                          sx={{
                            mt: 1,
                            color: "#977342",
                            borderColor: "#977342",
                            "&:hover": {
                              borderColor: "#CEAB76",
                              backgroundColor: "rgba(151, 115, 66, 0.05)",
                            },
                          }}
                        >
                          Create Your First Event
                        </Button>
                      </Box>
                    )}
                  </Box>

                  {roles?.length > 3 && showAllJobs && (
                    <Box sx={{ mt: 2, textAlign: "center" }}>
                      <Button
                        variant="outlined"
                        size="small"
                        endIcon={<KeyboardArrowUp />}
                        onClick={() => setShowAllJobs(false)}
                        sx={{ 
                          borderRadius: "20px",
                          borderColor: "#977342",
                          color: "#977342",
                          "&:hover": {
                            borderColor: "#CEAB76",
                            backgroundColor: "rgba(151, 115, 66, 0.05)",
                          },
                        }}
                      >
                        Collapse
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          {/* Right Sidebar */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {/* Quick Actions */}
              <Fade in={fadeIn} timeout={1100}>
                <Card
                  sx={{
                    borderRadius: "16px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#333" }}>
                      Quick Actions
                    </Typography>
                    <Grid container spacing={2}>
                      {[
                        { icon: <AddIcon />, label: "New Event", action: handleCreateNewJob, color: "#4CAF50" },
                        { icon: <VisibilityIcon />, label: "View Talents", action: () => {
                          router.push('/talent')
                        }, color: "#2196F3" },
                      ].map((action, index) => (
                        <Grid item xs={6} key={index}>
                          <Button
                            variant="outlined"
                            startIcon={action.icon}
                            onClick={action.action}
                            fullWidth
                            sx={{
                              py: 1.5,
                              borderColor: "rgba(0,0,0,0.1)",
                              color: action.color,
                              justifyContent: "flex-start",
                              "&:hover": {
                                borderColor: action.color,
                                bgcolor: `${action.color}10`,
                              },
                            }}
                          >
                            {action.label}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
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

export default Dashboard;