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
  Chip,
  Divider,
  Fade,
} from "@mui/material";
import { StatCard } from "@/components/dashboard/StatCard";
import { JobCard } from "@/components/dashboard/JobCard";
import { ActivityItem } from "@/components/dashboard/ActivityItem";
import { recentActivities } from "@/data/index";
import { useAuth } from "@/providers/auth-providers";
import Header from "@/components/dashboard/Header";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import useAuthStore from "@/state/use-auth-store";
import { useRouter, redirect } from "next/navigation";
import { useCookies } from "react-cookie";
import { PersonAdd, Star } from "@mui/icons-material";
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Dashboard = () => {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [cookies, setCookie] = useCookies([
    "ssh_session_id",
    "user_role",
    "onboarding_presented",
    "firstname",
  ]);

  const { fetchCompany, company } = useCompany();

  const [showAllJobs, setShowAllJobs] = useState(false);

  const [statsData, setStatsData] = useState([
    {
      title: "Total Jobs",
      value: company?.total_jobs,
      icon: TotalJobsIcon?.src,
    },
    {
      title: "Active Talents",
      value: 0,
      icon: ActiveTalentsIcon?.src,
    },
    {
      title: "Applications",
      value: 0,
      icon: ApplicationsIcon?.src,
    },
    {
      title: "Hired",
      value: 0,
      icon: HiredIcon?.src,
    },
  ]);

  let user_role = cookies["user_role"];

  const firstName = cookies["firstname"] || "User";

  const onboardingPresented = cookies["onboarding_presented"] || false;

  const [openModal, setOpenModal] = useState(true);
  const [loading, setLoading] = useState(false);

  const { roles } = useStore(useLocalRolesStore);

  const { getRoles } = useEvent();

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    console.log("User Role:", user_role);
    setLoading(true);
    getRoles();
    fetchCompany();

    console.log("Company:", company);

    if (company) {
      console.log("Company:", company);

      setStatsData((prevStats) =>
        prevStats.map((stat) =>
          stat.title === "Total Jobs"
            ? { ...stat, value: company.total_jobs || 0 }
            : stat
        )
      );
    }

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

    setLoading(false);
  }, [user_role, router, cookies, company]);

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
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {statsData?.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <StatCard {...stat} />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card
              sx={{
                padding: 2,
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 6px 25px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2.5,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        background: "linear-gradient(45deg, #977342, #CEAB76)",
                        backgroundClip: "text",
                        textFillColor: "transparent",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Recent Jobs
                    </Typography>
                    <Chip
                      label={roles?.length || 0}
                      size="small"
                      sx={{ ml: 1, bgcolor: "#977342", color: "#fff" }}
                    />
                  </Box>

                  {roles?.length > 3 && (
                    <Button
                      variant="text"
                      startIcon={
                        showAllJobs ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )
                      }
                      sx={{
                        color: "#977342",
                        fontWeight: 500,
                        "&:hover": {
                          backgroundColor: "rgba(25, 118, 210, 0.04)",
                        },
                      }}
                      onClick={() => setShowAllJobs(!showAllJobs)}
                    >
                      {showAllJobs ? "Show Less" : "View All"}
                    </Button>
                  )}
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ mt: 2 }}>
                  {(showAllJobs ? roles : roles?.slice(0, 3))?.map(
                    (job, index) => (
                      <Fade in={true} key={index} timeout={300 + index * 100}>
                        <Box mb={2}>
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
                          />
                        </Box>
                      </Fade>
                    )
                  )}

                  {roles?.length === 0 && (
                    <Box
                      sx={{
                        py: 4,
                        textAlign: "center",
                        color: "text.secondary",
                        backgroundColor: "rgba(0,0,0,0.02)",
                        borderRadius: "8px",
                      }}
                    >
                      <Typography variant="body1">
                        No recent jobs available
                      </Typography>
                    </Box>
                  )}
                </Box>

                {roles?.length > 3 && showAllJobs && (
                  <Box sx={{ mt: 2, textAlign: "center" }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<KeyboardArrowUpIcon />}
                      onClick={() => setShowAllJobs(false)}
                      sx={{ borderRadius: "20px" }}
                    >
                      Collapse
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
