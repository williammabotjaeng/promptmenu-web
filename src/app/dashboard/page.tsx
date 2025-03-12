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
import { useCompany } from "@/providers/company-provider";
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

  const { fetchCompany, company } = useCompany();

  const [statsData, setStatsData] = useState([
    {
      title: "Total Jobs",
      value: company?.total_jobs,
      icon: TotalJobsIcon?.src
    },
    {
      title: "Active Talents",
      value: 0,
      icon: ActiveTalentsIcon?.src
    },
    {
      title: "Applications",
      value: 0,
      icon: ApplicationsIcon?.src
    },
    {
      title: "Hired",
      value: 0,
      icon: HiredIcon?.src
    }
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
                                moment(job?.application_deadline).diff(moment())
                              )
                              .humanize()}`
                          : "No Deadline"
                      }
                      openings={job?.openings}
                      genders={job?.genders}
                      maxAge={job?.max_age}
                      minAge={job?.min_age}
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
    </Box>
  );
};

export default Dashboard;
