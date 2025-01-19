import * as React from 'react';
import { SidebarItem } from '@/components/portal/SidebarItem';
import { StatCard } from '@/components/portal/StatCard';
import { JobCard } from '@/components/portal/JobCard';
import { AuditionCard } from '@/components/portal/AuditionCard';
import { ProfileTask } from '@/components/portal/ProfileTask';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import TheatersIcon from '@mui/icons-material/Theaters';
import PersonIcon from '@mui/icons-material/Person';
import PortfolioIcon from '@mui/icons-material/WorkOutline'; 
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';

const sidebarItems = [
  { icon: DashboardIcon, label: "Dashboard" },
  { icon: WorkIcon, label: "Jobs" },
  { icon: TheatersIcon, label: "Auditions" },
  { icon: PersonIcon, label: "Profile" },
  { icon: PortfolioIcon, label: "Portfolio" },
  { icon: MessageIcon, label: "Messages" },
  { icon: SettingsIcon, label: "Settings" }
];
const stats = [
  { title: "Profile Views", value: "1,234", icon: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/4af4641f7ffd625ea8eb55544a449e62226f00e94c58c3b1deeee0d9093a3b7c?apiKey=7fae980a988640eea8add1e49a5d542e&", subtitle: "+12% this week", subtitleColor: "text-green-500" },
  { title: "Applied Jobs", value: "28", icon: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/c44f8d9d0d4af872564a3a66beac9531b98dc600542dee1bce8b4cf440d416f6?apiKey=7fae980a988640eea8add1e49a5d542e&", subtitle: "4 pending responses" },
  { title: "Upcoming Auditions", value: "3", icon: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/e414d5392638964fb2b9ea5eb9fbebe5f532b890bfc11efe478fbad69219bcc4?apiKey=7fae980a988640eea8add1e49a5d542e&", subtitle: "Next: March 18", subtitleColor: "text-orange-300" },
  { title: "Unread Messages", value: "5", icon: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/d36b076078d35eaaa214dff9c61497e930479bd22adb723a0616e7beca9bb734?apiKey=7fae980a988640eea8add1e49a5d542e&", subtitle: "2 urgent", subtitleColor: "text-red-500" }
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
  { icon: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/e6708e72ba898792aa8d97b89693d8df01ed5b882ad0b2f4c04b92d62e0d28c6?apiKey=7fae980a988640eea8add1e49a5d542e&", label: "Basic Information", completed: true },
  { icon: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/56a6952eabdec6249b6be2017563cc6c03410d2bb01f5157fba143462cb8f184?apiKey=7fae980a988640eea8add1e49a5d542e&", label: "Portfolio Images", completed: true },
  { icon: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/79b861cf8d48e76759d4dc60edd95784f65332d58455e41e197ded115b10f2cd?apiKey=7fae980a988640eea8add1e49a5d542e&", label: "Skills & Experience", completed: true },
  { icon: "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/213094dda2ee946d84f746463516418bc58c28a705b03066612d2f12ff370928?apiKey=7fae980a988640eea8add1e49a5d542e&", label: "Video Introduction", completed: false }
];


const Portal = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', backgroundColor: 'white' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <Box sx={{ width: '21%', backgroundColor: 'transparent' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 2, backgroundColor: '#000'}}>
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

        <Box sx={{ width: '79%', padding: 2 }}>
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

            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              {stats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <StatCard {...stat} />
                </Grid>
              ))}
            </Grid>

            <Card sx={{ marginTop: 4, padding: 2, borderRadius: '12px', boxShadow: 1 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Recent Job Opportunities</Typography>
                <Box sx={{ marginTop: 2 }}>
                  {jobs.map((job, index) => (
                    <JobCard key={index} {...job} />
                  ))}
                </Box>
                <Button variant="outlined" sx={{ marginTop: 2 }}>
                  View all opportunities
                </Button>
              </CardContent>
            </Card>

            <Card sx={{ marginTop: 4, padding: 2, borderRadius: '12px', boxShadow: 1 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Upcoming Auditions</Typography>
                <AuditionCard
                  month="MAR"
                  date="18"
                  title="Feature Film Audition"
                  time="10:00 AM"
                  location="Dubai Studio City"
                />
              </CardContent>
            </Card>

            <Card sx={{ marginTop: 4, padding: 2, borderRadius: '12px', boxShadow: 1 }}>
              <CardContent>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Profile Completion</Typography>
                  <Typography variant="body1" sx={{ color: 'gray.500' }}>85%</Typography>
                </Grid>
                <Box sx={{ marginTop: 2, backgroundColor: 'gray.200', borderRadius: '50%', height: '8px', width: '100%' }}>
                  <Box sx={{ width: '85%', height: '100%', backgroundColor: 'stone.500', borderRadius: '50%' }} />
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