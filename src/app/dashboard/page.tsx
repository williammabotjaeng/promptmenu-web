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
import {  recentActivities } from "@/data/index";
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
import { useTalentProfile } from "@/providers/talent-profile-provider";
import { useEvent } from "@/providers/event-provider";
import moment from "moment";
import ApplicationsIcon from "@/assets/applications-icon.svg";
import HiredIcon from "@/assets/hired-icon.svg";
import ActiveTalentsIcon from "@/assets/active-talents-icon.svg";
import TotalJobsIcon from "@/assets/total-jobs-icon.svg";

const Dashboard = () => {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [cookies, setCookie] = useCookies([
    "ssh_session_id",
    "user_role",
    "onboarding_presented",
    "firstname",
  ]);

  const [statsData, setStatsData] = useState([
    {
      title: "Total Jobs",
      value: "248",
      icon: TotalJobsIcon?.src
    },
    {
      title: "Active Talents",
      value: "1,842",
      icon: ActiveTalentsIcon?.src
    },
    {
      title: "Applications",
      value: "3,642",
      icon: ApplicationsIcon?.src
    },
    {
      title: "Hired",
      value: "892",
      icon: HiredIcon?.src
    }
  ]);

  let user_role = cookies["user_role"];

  const firstName = cookies["firstname"] || "User";

  const onboardingPresented = cookies["onboarding_presented"] || false;

  const [openModal, setOpenModal] = useState(true);
  const [loading, setLoading] = useState(false);

  const { roles } = useStore(useLocalRolesStore);

  const { signedUrls } = useTalentProfile();

  const { getRoles } = useEvent();

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOptionClick = (option: "client" | "talent" | "influencer") => {
    console.log("User selected:", option);
    handleCloseModal();
    updateUser({
      field: "user_role",
      value: option,
    });
    setCookie("user_role", option.toLowerCase());
  };

  useEffect(() => {
    console.log("User Role:", user_role);
    setLoading(true);
    getRoles();

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
  }, [user_role, router, cookies]);

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
              {statsData.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <StatCard {...stat} />
                </Grid>
              ))}
            </Grid>
          </Grid>

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
                    Recent Jobs
                  </Typography>
                  <Button sx={{ color: "gray" }}>View All</Button>
                </Box>
                <Box sx={{ marginTop: 2 }}>
                  {roles?.map((job, index) => (
                    <JobCard
                      key={index}
                      title={job?.role?.title}
                      location={job?.role?.location}
                      ethnicities={job?.role?.ethnicities}
                      hourlyPay={job?.role?.hourlyPay}
                      dailyPay={job?.role?.dailyPay}
                      skill={job?.role?.skill}
                      hardDeadline={
                        job.role.hardDeadline
                          ? `Closes in ${moment
                              .duration(
                                moment(job.role.hardDeadline).diff(moment())
                              )
                              .humanize()}`
                          : "No Deadline"
                      }
                      openings={job?.role?.openings}
                      genders={job?.role?.genders}
                      maxAge={job?.role?.maxAge}
                      minAge={job?.role?.minAge}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ padding: 2, borderRadius: "12px", boxShadow: 1 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Recent Activity
                </Typography>
                <Box sx={{ marginTop: 2 }}>
                  {recentActivities.map((activity, index) => (
                    <Box key={index} sx={{ marginTop: index > 0 ? 2 : 0 }}>
                      <ActivityItem {...activity} />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      {/* Modal for user options */}
      {user_role ? null : (
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: 2,
            maxWidth: "90%",
            margin: "auto",
          }}
        >
          <DialogTitle sx={{ textAlign: "center", padding: 2 }}>
            What are you looking for on SSH?
          </DialogTitle>
          <DialogContent>
            <Typography
              sx={{
                textAlign: "center",
              }}
              variant="body1"
            >
              Please select one of the options below:
            </Typography>
          </DialogContent>
          <DialogActions
            sx={{
              flexDirection: { xs: "column", md: "row" },
              justifyContent: { xs: "center", md: "space-evenly" },
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: 1,
              }}
            >
              <PersonAdd
                sx={{ fontSize: { xs: 30, md: 60 }, color: "#977342" }}
              />
              <Button
                onClick={() => handleOptionClick("client")}
                sx={{
                  color: "#fff",
                  backgroundColor: "#977342",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "#CEAB76",
                    border: "1px solid #CEAB76",
                  },
                }}
              >
                Hire Talent
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: 1,
              }}
            >
              <Work sx={{ fontSize: { xs: 30, md: 60 }, color: "#977342" }} />
              <Button
                onClick={() => handleOptionClick("talent")}
                sx={{
                  color: "#fff",
                  backgroundColor: "#977342",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "#CEAB76",
                    border: "1px solid #CEAB76",
                  },
                }}
              >
                Find Work
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: 1,
              }}
            >
              <Star sx={{ fontSize: { xs: 30, md: 60 }, color: "#977342" }} />
              <Button
                onClick={() => handleOptionClick("influencer")}
                sx={{
                  color: "#fff",
                  backgroundColor: "#977342",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "#CEAB76",
                    border: "1px solid #CEAB76",
                  },
                }}
              >
                I'm an Influencer
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default Dashboard;
