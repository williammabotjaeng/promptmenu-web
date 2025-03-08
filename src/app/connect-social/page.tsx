"use client";

import * as React from 'react';
import { SidebarItem } from '@/components/portal/SidebarItem';
import { StatCard } from '@/components/portal/StatCard';
import { JobCard } from '@/components/portal/JobCard';
import { AuditionCard } from '@/components/portal/AuditionCard';
import { ProfileTask } from '@/components/portal/ProfileTask';
import { Box, Typography, Grid, Card, CardContent, Button, LinearProgress, IconButton, Drawer } from '@mui/material';
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
import SocialMediaIntegration from '@/components/portal/SocialIntegration';

const sidebarItems = [
  { icon: "dashboard", label: "Portal", href: '/portal' },
  { icon: "connect", label: "Connect Social", href: '/connect-social' },
  { icon: "work", label: "Jobs", href: '/dashboard' },
  { icon: "theaters", label: "Auditions", href: '/dashboard' },
  { icon: "person", label: "Profile", href: '/talent-onboarding' },
  { icon: "portfolio", label: "Portfolio", href: '/dashboard' },
  { icon: "mail", label: "Messages", href: '/dashboard' },
  { icon: "settings", label: "Settings", href: '/dashboard' }
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

const Portal: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(['firstname', 'onboarding_presented', 'user_role']);

  const firstName = cookies['firstname'] || 'User';

  const user_role = cookies['user_role'] || '';

  const onboardingPresented = cookies['onboarding_presented'] || false;

  const { roles } = useStore(useLocalRolesStore);

  const router = useRouter();

  const { fetchTalentProfile, talentProfile, signedUrls } = useTalentProfile();

  const { getRoles } = useEvent();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
      setLoading(true);
      fetchTalentProfile();
      // getRoles();
      if (!onboardingPresented) {
        console.log("Inside the condition, UserRole:", user_role);
        console.log("Check result:", user_role === 'talent');
        if (user_role === 'talent') {
          console.log("About to redirect");
          redirect('/talent-onboarding');
        } else if (user_role === 'influencer') {
          redirect('/influencer-onboarding')
        }
      }
      console.log("Outside the check, UserRole:", user_role);
      console.log("Signed URLS:", signedUrls);
      setTimeout(() => {
        setLoading(false)
      }, 500);
  }, [cookies]);

  const stats = [
    { title: "Profile Views", value: talentProfile?.profile_views, icon: "visibility", subtitle: "+12% this week", subtitleColor: "#22C55E" },
    { title: "Applied Jobs", value: talentProfile?.profile_views, icon: "work", subtitle: "4 pending responses", subtitleColor: "#6B7280" },
    { title: "Upcoming Auditions", value: talentProfile?.profile_views, icon: "theaters", subtitle: "Next: March 18", subtitleColor: "#CEAB76" },
    { title: "Unread Messages", value: talentProfile?.profile_views, icon: "mail", subtitle: "2 urgent", subtitleColor: "#EF4444" }
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

        {!drawerOpen && (<IconButton onClick={toggleDrawer} sx={{ color: '#977342', display: { xs: 'block', md: 'none' }, position: 'absolute', zIndex: '5000', top: 16, left: 16 }}>
            <MenuIcon />
        </IconButton>)}

        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
          <Box sx={{ width: 250, padding: 2, backgroundColor: '#000', height: '100%' }}>
            <Typography variant="h6" sx={{ color: '#977342', fontWeight: 'bold', marginBottom: 2 }}>{user_role === 'talent' ? 'Talent' : 'Influencer'} Portal</Typography>
            {sidebarItems.map((item, index) => (
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
                <ProfileDropdown profilePicture={signedUrls?.headshot} placeholderLetter={firstName[0]?.toUpperCase()} />
              </Grid>
            </Grid>

            <SocialMediaIntegration />
          </Box>
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default Portal;