"use client";

import * as React from "react";
import { SidebarItem } from "@/components/portal/SidebarItem";
import { StatCard } from "@/components/portal/StatCard";
import { JobCard } from "@/components/JobCard";
import { AuditionCard } from "@/components/portal/AuditionCard";
import { ProfileTask } from "@/components/portal/ProfileTask";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  LinearProgress,
  IconButton,
  Drawer,
  Chip,
  Skeleton,
} from "@mui/material";
import Sticky from "react-sticky-el";
import { useEffect, useState } from "react";
import { useRouter, redirect } from "next/navigation";
import { useCookies } from "react-cookie";
import MenuIcon from "@mui/icons-material/Menu";
import Loading from "@/components/Loading";
import NotificationDropdown from "@/components/portal/NotificationDropdown";
import ProfileDropdown from "@/components/portal/ProfileDropdown";
import { useTalentProfile } from "@/providers/talent-profile-provider";
import moment from "moment";
import SSHGoldLogo from "@/assets/GoldLogo.png";
import { useEvent } from "@/providers/event-provider";
import useLocalRolesStore from "@/state/use-local-roles-store";
import { useStore } from "zustand";
import { useSettings } from "@/providers/settings-provider";
import { useAuth } from "@/providers/auth-providers";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Default placeholder image to use when no poster is available
const DEFAULT_JOB_IMAGE =
  "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/fbf9227c806ec79d0dbbdfafe208eba075157780299caaa1a8b6d38ae92d7bb2?apiKey=7fae980a988640eea8add1e49a5d542e&";

// Helper function to check if a deadline is urgent (within 5 days)
const isDeadlineUrgent = (deadlineStr) => {
  if (!deadlineStr) return false;

  try {
    const deadline = new Date(deadlineStr);
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 && diffDays <= 5;
  } catch (error) {
    return false;
  }
};

// Helper function to format date for display
const formatDeadline = (dateString) => {
  if (!dateString) return "No deadline";
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error("Date formatting error:", error);
    return dateString;
  }
};

const sidebarItems = [
  { icon: "dashboard", label: "Portal", href: "/portal" },
  { icon: "connect", label: "Connect Social", href: "/connect-social" },
  { icon: "work", label: "Jobs", href: "/jobs" },
  { icon: "theaters", label: "Auditions", href: "/auditions" },
  { icon: "person", label: "Profile", href: "/profile" },
  { icon: "portfolio", label: "Portfolio", href: "/portfolio" },
];

const profileTasks = [
  { icon: "done", label: "Basic Information", completed: true },
  { icon: "done", label: "Portfolio Images", completed: true },
  { icon: "done", label: "Skills & Experience", completed: true },
  { icon: "circle", label: "Video Introduction", completed: false },
];

const Portal = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [cookies, setCookie] = useCookies([
    "firstname",
    "onboarding_presented",
    "user_role",
    "has_settings",
    "username",
    "has_profile",
  ]);

  const firstName = cookies?.firstname || "User";
  const user_role = cookies?.user_role || "";
  const has_settings = cookies?.has_settings || false;
  const userName = cookies?.username || "";
  const hasProfile = cookies?.has_profile || false;
  const onboardingPresented = cookies?.onboarding_presented || false;

  const router = useRouter();
  const { fetchTalentProfile, talentProfile, signedUrls } = useTalentProfile();
  const { updateUser } = useAuth();
  const { getRoles, roleSignedUrls } = useEvent();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Initial data loading
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      setJobsLoading(true);

      try {
        // Fetch all roles
        const jobsData: any = await getRoles();

        if (jobsData && Array.isArray(jobsData)) {
          // Format the roles data similar to the Jobs page
          const formattedRoles = jobsData.map((role) => ({
            id: role.id,
            title: role.title || "Untitled Role",
            description: role.description || "No description available",
            location: role.location || "Remote",
            deadline:
              role.application_deadline ||
              role.hard_deadline ||
              role.soft_deadline,
            eventPoster: role.event_poster || "",
            isUrgent:
              role?.is_urgent ||
              isDeadlineUrgent(
                role.application_deadline ||
                  role.hard_deadline ||
                  role.soft_deadline
              ),
            imageUrl: "", // Will be populated with signed URL
            hourlyPay: role.hourly_pay,
            dailyPay: role.daily_pay,
            projectPay: role.project_pay,
            openings: role.openings,
            genders: role.genders,
            ethnicities: role.ethnicities,
            minAge: role.min_age,
            maxAge: role.max_age,
            skill: role.skill,
            event_id: role.event,
          }));

          setRoles(formattedRoles);
        }

        setJobsLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobsLoading(false);
      }

      // Fetch talent profile
      await fetchTalentProfile();

      // Check for onboarding redirect
      if (!onboardingPresented && !hasProfile) {
        if (user_role === "talent") {
          router.push("/talent-onboarding");
        } else if (user_role === "influencer") {
          router.push("/influencer-onboarding");
        }
      }

      setLoading(false);
    };

    initializeData();
  }, []);

  // Update image URLs when roleSignedUrls changes
  useEffect(() => {
    if (roleSignedUrls && roles.length > 0) {
      // Add signed URLs to role objects
      const updatedRoles = roles.map((role) => {
        // If there's a signed URL for this role, use it; otherwise keep existing or use default
        const imageUrl =
          roleSignedUrls[role.id] && roleSignedUrls[role.id] !== ""
            ? roleSignedUrls[role.id]
            : role.imageUrl && role.imageUrl !== ""
            ? role.imageUrl
            : DEFAULT_JOB_IMAGE;

        return {
          ...role,
          imageUrl,
        };
      });

      setRoles(updatedRoles);
    }
  }, [roleSignedUrls]);

  const stats = [
    {
      title: "Profile Views",
      value: talentProfile?.profile_views / 2 || 0,
      icon: "visibility",
      subtitle: "+12% this week",
      subtitleColor: "#22C55E",
    },
    {
      title: "Applied Jobs",
      value: talentProfile?.applied_jobs || 0,
      icon: "work",
      subtitle: "4 pending responses",
      subtitleColor: "#6B7280",
    },
    {
      title: "Upcoming Auditions",
      value: talentProfile?.upcoming_auditions || 0,
      icon: "theaters",
      subtitle: "Next: March 18",
      subtitleColor: "#CEAB76",
    },
    {
      title: "Hired Jobs",
      value: talentProfile?.hired_jobs || 0,
      icon: "mail",
      subtitle: "2 urgent",
      subtitleColor: "#EF4444",
    },
  ];

  if (loading) return <Loading />;

  return (
    <>
      <Box
        className=".boundary"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
          backgroundColor: "white",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            width: "100%",
          }}
        >
          <Sticky boundaryElement=".boundary">
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                width: "21vw",
                backgroundColor: "transparent",
                zIndex: 1000,
                height: "100vh",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: 2,
                  backgroundColor: "#000",
                }}
              >
                <img
                  loading="lazy"
                  src={SSHGoldLogo?.src}
                  alt="Logo"
                  style={{ width: "109px", marginBottom: "16px" }}
                />
                <Typography
                  variant="h6"
                  sx={{ color: "#977342", fontWeight: "bold" }}
                >
                  {user_role === "talent" ? "Talent" : "Influencer"} Portal
                </Typography>
                <Box sx={{ marginTop: 2 }}>
                  {sidebarItems &&
                    sidebarItems.map((item, index) => (
                      <SidebarItem key={index} {...item} />
                    ))}
                </Box>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/d9eb7e6d3539dd0941272b7c000796180c3cd2e7899fc4d9240ee53189aceeef?apiKey=7fae980a988640eea8add1e49a5d542e&"
                  alt="logo"
                  style={{ width: "100%", marginTop: "16px" }}
                />
              </Box>
            </Box>
          </Sticky>

          {!drawerOpen && (
            <IconButton
              onClick={toggleDrawer}
              sx={{
                color: "#977342",
                display: { xs: "block", md: "none" },
                position: "absolute",
                zIndex: "5000",
                top: 16,
                left: 16,
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
            <Box
              sx={{
                width: 250,
                padding: 2,
                backgroundColor: "#000",
                height: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#977342", fontWeight: "bold", marginBottom: 2 }}
              >
                {user_role === "talent" ? "Talent" : "Influencer"} Portal
              </Typography>
              {sidebarItems &&
                sidebarItems?.map((item, index) => (
                  <SidebarItem key={index} {...item} />
                ))}
            </Box>
          </Drawer>

          <Box
            sx={{
              width: { xs: "100%", md: "79%" },
              padding: 2,
              position: "sticky",
              left: "300px",
            }}
          >
            <Box sx={{ padding: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={8}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "16px", md: "24px" },
                      marginLeft: { xs: 4 },
                    }}
                  >
                    Welcome, {firstName}!
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "gray.600",
                      fontSize: { xs: "12px", md: "16px" },
                      marginLeft: { xs: 4 },
                    }}
                  >
                    Profile Updated:{" "}
                    <span style={{ color: "#6B7280" }}>
                      {talentProfile?.updated_at
                        ? moment(talentProfile.updated_at).fromNow()
                        : "N/A"}
                    </span>
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <NotificationDropdown
                    notifications={talentProfile?.notifications || null}
                  />
                  <ProfileDropdown
                    profilePicture={signedUrls?.headshot || ""}
                    placeholderLetter={firstName[0]?.toUpperCase() || ""}
                  />
                </Grid>
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginTop: 2,
                  padding: 2,
                }}
              >
                {stats.map((stat, index) => (
                  <StatCard key={index} {...stat} />
                ))}
              </Box>

              <Card
                sx={{
                  marginTop: 4,
                  padding: 2,
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": { boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)" },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#333" }}
                      >
                        Job Opportunities
                      </Typography>
                      <Chip
                        label={roles?.length || 0}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(151, 115, 66, 0.1)",
                          color: "#977342",
                          fontWeight: 600,
                          height: "22px",
                        }}
                      />
                    </Box>
                    <Button
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => router.push("/jobs")}
                      sx={{
                        color: "#977342",
                        fontWeight: 500,
                        "&:hover": {
                          backgroundColor: "rgba(151, 115, 66, 0.05)",
                        },
                      }}
                    >
                      View all
                    </Button>
                  </Box>

                  {jobsLoading ? (
                    // Show skeleton loaders while jobs are loading
                    Array(3)
                      .fill(0)
                      .map((_, index) => (
                        <Box
                          key={index}
                          sx={{
                            mb: 2,
                            borderRadius: "12px",
                            overflow: "hidden",
                          }}
                        >
                          <Skeleton variant="rectangular" height={140} />
                        </Box>
                      ))
                  ) : roles && roles.length > 0 ? (
                    // Display actual jobs when available
                    roles.slice(0, 3).map((role, index) => (
                      <Box
                        key={index}
                        sx={{
                          mb: 2,
                          transition: "transform 0.2s",
                          "&:hover": { transform: "translateY(-4px)" },
                        }}
                      >
                        <JobCard
                          imageUrl={role.imageUrl}
                          isUrgent={role.isUrgent}
                          title={role.title}
                          description={role.description}
                          location={role.location}
                          deadline={formatDeadline(role.deadline)}
                          // You can add more props as needed for JobCard component
                          hourlyPay={role.hourlyPay}
                          dailyPay={role.dailyPay}
                          projectPay={role.projectPay}
                          roleId={role.id}
                          role={role}
                        />
                      </Box>
                    ))
                  ) : (
                    // Show message when no jobs are available
                    <Box
                      sx={{
                        textAlign: "center",
                        py: 4,
                        backgroundColor: "rgba(0,0,0,0.02)",
                        borderRadius: "8px",
                      }}
                    >
                      <Typography variant="body1" color="text.secondary">
                        No job opportunities available at the moment
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>

              {talentProfile?.upcoming_auditions > 0 && (
                <Card
                  sx={{
                    marginTop: 4,
                    padding: 2,
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": { boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)" },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#333" }}
                      >
                        Upcoming Auditions
                      </Typography>
                      <Button
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => router.push("/auditions")}
                        sx={{
                          color: "#977342",
                          fontWeight: 500,
                          "&:hover": {
                            backgroundColor: "rgba(151, 115, 66, 0.05)",
                          },
                        }}
                      >
                        View all
                      </Button>
                    </Box>
                    <AuditionCard
                      month="MAR"
                      date="18"
                      title="Feature Film Audition"
                      time="10:00 AM"
                      location="Dubai Studio City"
                    />
                  </CardContent>
                </Card>
              )}

              <Card
                sx={{
                  marginTop: 4,
                  padding: 2,
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                  backgroundColor: "white",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": { boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)" },
                }}
              >
                <CardContent>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#333" }}
                    >
                      Profile Completion
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#977342", fontWeight: 600 }}
                    >
                      {Math.round(
                        Number(talentProfile?.profile_progress) * 100
                      )}
                      %
                    </Typography>
                  </Grid>
                  <Box sx={{ marginTop: 2, mb: 3 }}>
                    <LinearProgress
                      variant="determinate"
                      value={Number(talentProfile?.profile_progress) * 100}
                      sx={{
                        height: "8px",
                        borderRadius: "4px",
                        backgroundColor: "#E5E7EB",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#CEAB76",
                        },
                      }}
                    />
                  </Box>

                  <Button
                    variant="outlined"
                    onClick={() => router.push("/profile")}
                    sx={{
                      mt: 3,
                      borderColor: "#977342",
                      color: "#977342",
                      fontWeight: 500,
                      "&:hover": {
                        backgroundColor: "rgba(151, 115, 66, 0.05)",
                        borderColor: "#CEAB76",
                      },
                    }}
                  >
                    Complete Your Profile
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Portal;
