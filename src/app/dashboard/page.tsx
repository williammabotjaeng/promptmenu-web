"use client";

import * as React from "react";
import { Box, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { StatCard } from "@/components/dashboard/StatCard";
import { JobCard } from "@/components/dashboard/JobCard";
import { ActivityItem } from "@/components/dashboard/ActivityItem";
import { recentJobs, statsData, recentActivities } from "@/data/index";
import { useAuth } from "@/providers/auth-providers";
import Header from "@/components/dashboard/Header"; 
import { useEffect } from "react";

const Dashboard = () => {

  const { user } = useAuth();

  useEffect(() => {
    console.log("Value of user:", user);
  }, [user]);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', backgroundColor: 'white' }}>
      <Header /> {/* Use the Header component */}

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
    </Box>
  );
};

export default Dashboard;