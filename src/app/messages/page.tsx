"use client";

import * as React from "react";
import { Box, Grid, Card, CardContent, Typography, Button, DialogTitle, Dialog, DialogContent, DialogActions } from "@mui/material";
import { StatCard } from "@/components/dashboard/StatCard";
import { MessageCard } from "@/components/MessageCard";
import { ActivityItem } from "@/components/dashboard/ActivityItem";
import { recentJobs, dummyMessages } from "@/data/index";
import { useAuth } from "@/providers/auth-providers";
import Header from "@/components/dashboard/Header"; 
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import useAuthStore from "@/state/use-auth-store";
import { useRouter, redirect } from "next/navigation";
import { useCookies } from "react-cookie";
import { PersonAdd, Star } from "@mui/icons-material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Work from "@mui/icons-material/Work";
import Loading from "@/components/Loading";
import GreyFooter from "@/components/GreyFooter";
import SecondaryHeader from "@/components/SecondaryHeader";
import Footer from "@/components/Footer";
import { useMessage } from "@/providers/message-provider";

const Messages = () => {

  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['ssh_session_id', 'user_role', 'onboarding_presented']);

  let user_role = cookies?.user_role;

  const onboardingPresented = cookies?.onboarding_presented;

  const { messages, fetchMessages } = useMessage();

  const [openModal, setOpenModal] = useState(true); 
  const [loading, setLoading] = useState(false);

  const handleCreateMessage = () => {
   // router.push(`/create-message`);
  }

  useEffect(() => {
    console.log("User Role:", user_role);
    setLoading(true);
    fetchMessages();

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
                  <Button onClick={handleCreateMessage} sx={{ 
                    color: 'gray',
                    '&:hover': {
                      color: 'white'
                    }
                  }}>Create Message</Button>
                </Box>
                {(messages && messages?.length > 0) ? <Box sx={{ marginTop: 2 }}>
                  {messages?.map((message, index) => (
                    <Box key={index} sx={{ marginTop: index > 0 ? 2 : 0 }}>
                      {!message?.is_thread && <MessageCard {...message} />}
                    </Box>
                  ))}
                </Box> : <Box sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 5
                }}>
                      <Typography variant="h6">No Messages Yet</Typography><DeleteForeverIcon sx={{
                        fontSize: '32px',
                        color: '#982d28'
                      }} />
                      <br />

                  </Box>}
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