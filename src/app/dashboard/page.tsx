"use client";

import * as React from "react";
import { Box, Typography, AppBar, Toolbar, Button, Grid, Card, CardContent } from "@mui/material";
import { StatCard } from "@/components/dashboard/StatCard";
import { JobCard } from "@/components/dashboard/JobCard";
import { ActivityItem } from "@/components/dashboard/ActivityItem";
import { recentJobs, statsData, recentActivities } from "@/data/index";

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', backgroundColor: 'white' }}>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/f7a98b4005a2f1122fca47c9c2e20cca9902f81182f9787864a4383cb85fee36?apiKey=7fae980a988640eea8add1e49a5d542e&"
            alt=""
            style={{ width: '43px', marginRight: '16px' }}
          />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#000' }}>SSH</Typography>
          <nav>
            <Button
              sx={{
                color: 'gray',
                '&:hover': { color: 'white' }
              }}
            >
              Dashboard
            </Button>
            <Button
              sx={{
                color: 'gray',
                '&:hover': { color: 'white' }
              }}
            >
              Events
            </Button>
            <Button
              sx={{
                color: 'gray',
                '&:hover': { color: 'white' }
              }}
            >
              Jobs
            </Button>
            <Button
              sx={{
                color: 'gray',
                '&:hover': { color: 'white' }
              }}
            >
              Talents
            </Button>
            <Button
              sx={{
                color: 'gray',
                '&:hover': { color: 'white' }
              }}
            >
              Messages
            </Button>
          </nav>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/b80eb30359b38c4c3f3c8f801f80278982fb5dd4cea914f8b8e7f5de660ea6d8?apiKey=7fae980a988640eea8add1e49a5d542e&"
            alt=""
            style={{ width: '89px', marginLeft: '16px' }}
          />
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1, padding: 3 }}>
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