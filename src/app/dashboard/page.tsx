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
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

const Dashboard = () => {

  const { user } = useAuth();
  const router = useRouter();
  const [cookies] = useCookies(['ssh_session_id', 'user_role']);

  const user_role = cookies['user_role'];

  const [openModal, setOpenModal] = useState(true); 

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOptionClick = (option) => {
    console.log("User selected:", option);
    handleCloseModal(); 
  };

  useEffect(() => {
      if ((!user_role || user_role === 'undefined')) {
        setOpenModal(true);
      }
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', backgroundColor: 'white' }}>
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
            <Card sx={{ padding: 2, borderRadius: '12px', boxShadow: 1 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Recent Jobs</Typography>
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

          <Grid item xs={12} md={4}>
            <Card sx={{ padding: 2, borderRadius: '12px', boxShadow: 1 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Recent Activity</Typography>
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
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>What are you looking for on SSH?</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Please select one of the options below:</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleOptionClick("Hire Talent")} sx={{
            color: '#977342',
            backgroundColor: 'black',
            '&:hover': {
              color: '#CEAB76',
              backgroundColor: '#fff',
              border: '1px solid #CEAB76'
            }
          }}>Hire Talent</Button>
          <Button onClick={() => handleOptionClick("Find Work")} sx={{
            color: '#977342',
            backgroundColor: 'black',
            '&:hover': {
              color: '#CEAB76',
              backgroundColor: '#fff',
              border: '1px solid #CEAB76'
            }
          }}>Find Work</Button>
          <Button onClick={() => handleOptionClick("I'm an Influencer")} sx={{
            color: '#977342',
            backgroundColor: 'black',
            '&:hover': {
              color: '#CEAB76',
              backgroundColor: '#fff',
              border: '1px solid #CEAB76'
            }
          }}>I'm an Influencer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;