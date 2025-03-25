"use client";

import * as React from 'react';
import { SidebarItem } from '@/components/portal/SidebarItem';
import { StatCard } from '@/components/portal/StatCard';
import { JobCard } from '@/components/portal/JobCard';
import { AuditionCard } from '@/components/portal/AuditionCard';
import { ProfileTask } from '@/components/portal/ProfileTask';
import { Box, Typography, Grid, Card, CardContent, Button, LinearProgress, IconButton, Drawer, Chip, Skeleton } from '@mui/material';
import Sticky from 'react-sticky-el';
import { useEffect, useState } from 'react';
import { useRouter, redirect } from 'next/navigation';
import { useCookies } from 'react-cookie';
import MenuIcon from '@mui/icons-material/Menu';
import Loading from '@/components/Loading';
import NotificationDropdown from '@/components/portal/NotificationDropdown';
import ProfileDropdown from '@/components/portal/ProfileDropdown';
import { useTalentProfile } from '@/providers/talent-profile-provider';
import moment from 'moment';
import SSHGoldLogo from '@/assets/GoldLogo.png';
import { useEvent } from '@/providers/event-provider';
import useLocalRolesStore from '@/state/use-local-roles-store';
import { useStore } from 'zustand';
import { useSettings } from '@/providers/settings-provider';
import { useAuth } from '@/providers/auth-providers';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const sidebarItems = [
  { icon: "dashboard", label: "Portal", href: '/portal' },
  { icon: "connect", label: "Connect Social", href: '/connect-social' },
  { icon: "work", label: "Jobs", href: '/jobs' },
  { icon: "theaters", label: "Auditions", href: '/auditions' },
  { icon: "person", label: "Profile", href: '/profile' },
  { icon: "portfolio", label: "Portfolio", href: '/portfolio' }
];

const profileTasks = [
  { icon: "done", label: "Basic Information", completed: true },
  { icon: "done", label: "Portfolio Images", completed: true },
  { icon: "done", label: "Skills & Experience", completed: true },
  { icon: "circle", label: "Video Introduction", completed: false }
];

const Portal: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [loadedJobs, setLoadedJobs] = useState([]);
  const [cookies, setCookie] = useCookies([
    'firstname', 
    'onboarding_presented', 
    'user_role', 
    'has_settings', 
    'username',
    'has_profile'
  ]);

  const firstName = cookies?.firstname || 'User';
  const user_role = cookies?.user_role || '';
  const has_settings = cookies?.has_settings || false;
  const userName = cookies?.username || '';
  const hasProfile = cookies?.has_profile || false;
  const onboardingPresented = cookies?.onboarding_presented || false;

  const router = useRouter();
  const { fetchTalentProfile, talentProfile, signedUrls } = useTalentProfile();
  const { updateUser } = useAuth();
  const { getRoles } = useEvent();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      setJobsLoading(true);

      // Fetch all available jobs without any checks
      try {
        const jobsData: any = await getRoles();
        if (jobsData && Array.isArray(jobsData)) {
          setLoadedJobs(jobsData);
        }
        setJobsLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobsLoading(false);
      }

      // Fetch talent profile
      await fetchTalentProfile();

      // Check for onboarding redirect
      if (!onboardingPresented) {
        if (user_role === 'talent') {
          router.push('/talent-onboarding');
        } else if (user_role === 'influencer') {
          router.push('/influencer-onboarding');
        }
      }

      setLoading(false);
    };

    initializeData();
  }, []);

  const stats = [
    { title: "Profile Views", value: talentProfile?.profile_views || 0, icon: "visibility", subtitle: "+12% this week", subtitleColor: "#22C55E" },
    { title: "Applied Jobs", value: talentProfile?.applications?.length || 0, icon: "work", subtitle: "4 pending responses", subtitleColor: "#6B7280" },
    { title: "Upcoming Auditions", value: talentProfile?.upcoming_auditions || 0, icon: "theaters", subtitle: "Next: March 18", subtitleColor: "#CEAB76" },
    { title: "Unread Messages", value: talentProfile?.unread_messages || 0, icon: "mail", subtitle: "2 urgent", subtitleColor: "#EF4444" }
  ];

  if (loading) return <Loading />;

  return (
    <>
    <Box className=".boundary" sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', backgroundColor: 'white', position: 'relative' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '100%' }}>
        <Sticky boundaryElement=".boundary">
          <Box sx={{ display: { xs: 'none', md: 'block' }, width: '21vw', backgroundColor: 'transparent', zIndex: 1000, height: '100vh' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 2, backgroundColor: '#000' }}>
              <img
                loading="lazy"
                src={SSHGoldLogo?.src}
                alt="Logo"
                style={{ width: '109px', marginBottom: '16px' }}
              />
              <Typography variant="h6" sx={{ color: '#977342', fontWeight: 'bold' }}>{user_role === 'talent' ? 'Talent' : 'Influencer'} Portal</Typography>
              <Box sx={{ marginTop: 2 }}>
                {sidebarItems && sidebarItems.map((item, index) => (
                  <SidebarItem key={index} {...item} />
                ))}
              </Box>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/d9eb7e6d3539dd0941272b7c000796180c3cd2e7899fc4d9240ee53189aceeef?apiKey=7fae980a988640eea8add1e49a5d542e&"
                alt="logo"
                style={{ width: '100%', marginTop: '16px' }}
              />
            </Box>
          </Box>
          
        </Sticky>

        {!drawerOpen && (<IconButton onClick={toggleDrawer} sx={{ color: '#977342', display: { xs: 'block', md: 'none' }, position: 'absolute', zIndex: '5000', top: 16, left: 16 }}>
            <MenuIcon />
        </IconButton>)}

        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
          <Box sx={{ width: 250, padding: 2, backgroundColor: '#000', height: '100%' }}>
            <Typography variant="h6" sx={{ color: '#977342', fontWeight: 'bold', marginBottom: 2 }}>{user_role === 'talent' ? 'Talent' : 'Influencer'} Portal</Typography>
            {sidebarItems && sidebarItems?.map((item, index) => (
              <SidebarItem key={index} {...item} />
            ))}
          </Box>
        </Drawer>

        <Box sx={{ width: { xs: '100%', md: '79%' }, padding: 2, position: 'sticky', left: '300px' }}>
          <Box sx={{ padding: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: { xs: '16px', md: '24px' }, marginLeft: { xs: 4 } }}>Welcome, {firstName}!</Typography>
                <Typography variant="body1" sx={{ color: 'gray.600', fontSize: { xs: '12px', md: '16px'}, marginLeft: { xs: 4 }  }}>Profile Updated: <span style={{ color: '#6B7280' }}>{talentProfile?.updated_at ? moment(talentProfile.updated_at).fromNow() : 'N/A'}</span></Typography>
              </Grid>
              <Grid item xs={4} sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end'
              }}>
                <NotificationDropdown notifications={talentProfile?.notifications || null} />
                <ProfileDropdown profilePicture={signedUrls?.headshot || ""} placeholderLetter={firstName[0]?.toUpperCase() || ""} />
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: 2, padding: 2 }}>
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </Box>

            <Card sx={{ marginTop: 4, padding: 2, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)' } }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>Job Opportunities</Typography>
                    <Chip 
                      label={loadedJobs?.length || 0} 
                      size="small" 
                      sx={{ 
                        backgroundColor: 'rgba(151, 115, 66, 0.1)', 
                        color: '#977342',
                        fontWeight: 600,
                        height: '22px'
                      }} 
                    />
                  </Box>
                  <Button 
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => router.push('/jobs')}
                    sx={{ 
                      color: '#977342',
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: 'rgba(151, 115, 66, 0.05)'
                      }
                    }}
                  >
                    View all
                  </Button>
                </Box>
                
                {jobsLoading ? (
                  // Show skeleton loaders while jobs are loading
                  Array(3).fill(0).map((_, index) => (
                    <Box key={index} sx={{ mb: 2, borderRadius: '12px', overflow: 'hidden' }}>
                      <Skeleton variant="rectangular" height={140} />
                    </Box>
                  ))
                ) : loadedJobs && loadedJobs.length > 0 ? (
                  // Display actual jobs when available
                  loadedJobs.slice(0, 3).map((job, index) => (
                    <Box 
                      key={index} 
                      sx={{ 
                        mb: 2,
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'translateY(-4px)' }
                      }}
                    >
                      <JobCard 
                        roleId={job?.id}
                        title={job?.title} 
                        location={job?.location} 
                        ethnicities={job?.ethnicities}
                        hourlyPay={job?.hourly_pay}
                        dailyPay={job?.daily_pay}
                        skill={job?.skill}
                        hardDeadline={
                          job?.application_deadline || job?.hard_deadline
                            ? `Closes in ${moment.duration(moment(job?.application_deadline || job?.hard_deadline).diff(moment())).humanize()}`
                            : "No Deadline"
                        }
                        openings={job?.openings}
                        genders={job?.genders}
                        maxAge={job?.max_age}
                        minAge={job?.min_age}
                      />
                    </Box>
                  ))
                ) : (
                  // Show message when no jobs are available
                  <Box sx={{ textAlign: 'center', py: 4, backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: '8px' }}>
                    <Typography variant="body1" color="text.secondary">No job opportunities available at the moment</Typography>
                  </Box>
                )}
              </CardContent>
            </Card>

            {talentProfile?.upcoming_auditions > 0 && (
              <Card sx={{ marginTop: 4, padding: 2, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)' } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>Upcoming Auditions</Typography>
                    <Button 
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => router.push('/auditions')}
                      sx={{ 
                        color: '#977342',
                        fontWeight: 500,
                        '&:hover': {
                          backgroundColor: 'rgba(151, 115, 66, 0.05)'
                        }
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

            <Card sx={{ marginTop: 4, padding: 2, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', backgroundColor: 'white', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)' } }}>
              <CardContent>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>Profile Completion</Typography>
                  <Typography variant="body1" sx={{ color: '#977342', fontWeight: 600 }}>{Math.round((Number(talentProfile?.profile_progress) * 100))}%</Typography>
                </Grid>
                <Box sx={{ marginTop: 2, mb: 3 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(Number(talentProfile?.profile_progress) * 100)}
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
                
                <Button 
                  variant="outlined"
                  onClick={() => router.push('/profile')}
                  sx={{ 
                    mt: 3,
                    borderColor: '#977342',
                    color: '#977342',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: 'rgba(151, 115, 66, 0.05)',
                      borderColor: '#CEAB76'
                    }
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