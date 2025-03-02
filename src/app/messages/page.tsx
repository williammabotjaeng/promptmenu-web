"use client";

import * as React from "react";
import { Box, Grid, Card, CardContent, Typography, Button, DialogTitle, Dialog, DialogContent, DialogActions } from "@mui/material";
import { StatCard } from "@/components/dashboard/StatCard";
import { JobCard } from "@/components/dashboard/JobCard";
import { ActivityItem } from "@/components/dashboard/ActivityItem";
import { recentJobs, statsData, recentActivities } from "@/data/index";
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
import GreyFooter from "@/components/GreyFooter";
import SecondaryHeader from "@/components/SecondaryHeader";
import Footer from "@/components/Footer";

const Messages = () => {

  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['ssh_session_id', 'user_role', 'onboarding_presented']);

  let user_role = cookies['user_role'];

  const user_roles = ['client', 'talent', 'influencer'];

  const onboardingPresented = cookies['onboarding_presented'] || false;

  const [openModal, setOpenModal] = useState(true); 
  const [loading, setLoading] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOptionClick = (option: 'client' | 'talent' | 'influencer') => {
    console.log("User selected:", option);
    handleCloseModal(); 
    updateUser(
      { 
        field: 'user_role',
        value: option
      }
    )
    setCookie('user_role', option.toLowerCase());
  };

  useEffect(() => {
    console.log("User Role:", user_role);
    setLoading(true);

    if (user_role === "None") {
        console.log("User role:", typeof(user_role));
        console.log("Check:", !user_role);
        setLoading(false);
        setOpenModal(true);
    } else {
        if (user_role === 'client') {
            console.log("It's a client");
            if (!onboardingPresented) {
                router.push('/company-profile');
              }
            setTimeout(() => {
              setLoading(false)
            }, 500);
            // router.push('/dashboard');
        } else if (user_role === 'talent' || user_role === 'influencer') {
            console.log("It's talent");
            setLoading(false);
            redirect('/portal');
        }
    }

    setLoading(false);
}, [user_role, router]);

  if (loading) return <Loading />;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', backgroundColor: 'white' }}>
      <Header /> 

      <Box sx={{ flexGrow: 1, padding: { xs: 2, md: 3 } }}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={8}>
            <Card sx={{ padding: 2, borderRadius: '12px', boxShadow: 1 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Your Messages</Typography>
                  <Button sx={{ color: 'gray' }}>View All</Button>
                </Box>
                <Box sx={{ marginTop: 2 }}>
                  {recentJobs.map((job, index) => (
                    <Box key={index} sx={{ marginTop: index > 0 ? 2 : 0 }}>
                      <JobCard {...job} />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>


        </Grid>
      </Box>
      <GreyFooter />
    </Box>
  );
};

export default Messages;