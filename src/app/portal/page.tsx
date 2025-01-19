"use client";

import * as React from 'react';
import { SidebarItem } from '@/components/portal/SidebarItem';
import { StatCard } from '@/components/portal/StatCard';
import { JobCard } from '@/components/portal/JobCard';
import { AuditionCard } from '@/components/portal/AuditionCard';
import { ProfileTask } from '@/components/portal/ProfileTask';
import { Box, Typography, Grid, Card, CardContent, Button, LinearProgress } from '@mui/material';
import Sticky from 'react-sticky-el';

import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import TheatersIcon from '@mui/icons-material/Theaters';
import PersonIcon from '@mui/icons-material/Person';
import PortfolioIcon from '@mui/icons-material/WorkOutline';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRef } from 'react';

const sidebarItems = [
  { icon: "dashboard", label: "Dashboard" },
  { icon: "work", label: "Jobs" },
  { icon: "theaters", label: "Auditions" },
  { icon: "person", label: "Profile" },
  { icon: "portfolio", label: "Portfolio" },
  { icon: "mail", label: "Messages" },
  { icon: "settings", label: "Settings" }
];

const stats = [
  { title: "Profile Views", value: "1,234", icon: "visibility", subtitle: "+12% this week", subtitleColor: "#22C55E" },
  { title: "Applied Jobs", value: "28", icon: "work", subtitle: "4 pending responses", subtitleColor: "#6B7280" },
  { title: "Upcoming Auditions", value: "3", icon: "theaters", subtitle: "Next: March 18", subtitleColor: "#CEAB76" },
  { title: "Unread Messages", value: "5", icon: "mail", subtitle: "2 urgent", subtitleColor: "#EF4444" }
];

const jobs = [
  {
    title: "TV Commercial - Leading Automotive Brand",
    location: "Dubai Media City",
    tags: ["Acting", "Commercial"]
  },
  {
    title: "Fashion Show Model - Luxury Brand",
    location: "Dubai Mall Fashion Avenue",
    tags: ["Modeling", "Fashion"]
  }
];

const profileTasks = [
  { icon: "done", label: "Basic Information", completed: true },
  { icon: "done", label: "Portfolio Images", completed: true },
  { icon: "done", label: "Skills & Experience", completed: true },
  { icon: "circle", label: "Video Introduction", completed: false }
];


const Portal = () => {

  

  return (
    <Box className=".boundary" sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', backgroundColor: 'white', position: 'relative' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <Sticky boundaryElement=".boundary">
          <Box  sx={{ width: '21vw', backgroundColor: 'transparent', zIndex: 1000, height: '100vh' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 2, backgroundColor: '#000' }}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/1557d19b22b0cfa5efbb3f91eee577159998e27e492dd95100a6ef5a73d76f46?apiKey=7fae980a988640eea8add1e49a5d542e&"
                alt="Logo"
                style={{ width: '109px', marginBottom: '16px' }}
              />
              <Typography variant="h6" sx={{ color: '#977342', fontWeight: 'bold' }}>Talent Portal</Typography>
              <Box sx={{ marginTop: 2 }}>
                {sidebarItems.map((item, index) => (
                  <SidebarItem key={index} {...item} />
                ))}
              </Box>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/d9eb7e6d3539dd0941272b7c000796180c3cd2e7899fc4d9240ee53189aceeef?apiKey=7fae980a988640eea8add1e49a5d542e&"
                alt=""
                style={{ width: '100%', marginTop: '16px' }}
              />
            </Box>
          </Box>
        </Sticky>

        <Box sx={{ width: '79%', padding: 2, position: 'sticky', left: '300px' }}>
          <Box sx={{ padding: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Welcome, Sarah!</Typography>
                <Typography variant="body1" sx={{ color: 'gray.600' }}>Last login: March 15, 2025</Typography>
              </Grid>
              <Grid item xs={4}>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/10a92cdbd711daa1009d26188fe2c49cae017807b8f06f38a295ba99fd05bcfa?apiKey=7fae980a988640eea8add1e49a5d542e&"
                  alt=""
                  style={{ width: '77px', float: 'right' }}
                />
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 2, padding: 2 }}>
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </Box>
           
            <Card sx={{ marginTop: 4, padding: 2, borderRadius: '12px', boxShadow: 1 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Recent Job Opportunities</Typography>
                <Box sx={{ marginTop: 2 }}>
                  {jobs.map((job, index) => (
                    <JobCard key={index} {...job} />
                  ))}
                </Box>
                <Button sx={{ marginTop: 2, backgroundColor: 'white', color: '#977342' }}>
                  View all opportunities
                </Button>
              </CardContent>
            </Card>
            
            <Card sx={{ marginTop: 4, padding: 2, borderRadius: '12px', boxShadow: 1 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Upcoming Auditions</Typography>
                <br />
                <AuditionCard
                  month="MAR"
                  date="18"
                  title="Feature Film Audition"
                  time="10:00 AM"
                  location="Dubai Studio City"
                />
              </CardContent>
            </Card>

            <Card sx={{ marginTop: 4, padding: 2, borderRadius: '12px', boxShadow: 1, backgroundColor: 'white' }}>
              <CardContent>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Profile Completion</Typography>
                  <Typography variant="body1" sx={{ color: '#977342' }}>85%</Typography>
                </Grid>
                <Box sx={{ marginTop: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={85}
                    sx={{
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: '#E5E7EB',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#CEAB76',
                      },
                    }}
                  />
                </Box>
                <Box sx={{ marginTop: 2 }}>
                  {profileTasks.map((task, index) => (
                    <ProfileTask key={index} {...task} />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Portal;