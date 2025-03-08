"use client";

import * as React from "react";
import { Box, Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { LinearProgress } from "@mui/material";

const SocialMediaIntegration = () => {
  const [accounts, setAccounts] = useState({
    tiktok: null,
    instagram: null,
    facebook: null,
    snapchat: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch account info from APIs
    const fetchAccountInfo = async () => {
      // Simulated API calls
      const tiktokData = await fetchTikTokAccount();
      const instagramData = await fetchInstagramAccount();
      const facebookData = await fetchFacebookAccount();
      const snapchatData = await fetchSnapchatAccount();

      setAccounts({
        tiktok: tiktokData,
        instagram: instagramData,
        facebook: facebookData,
        snapchat: snapchatData,
      });
      setLoading(false);
    };

    fetchAccountInfo();
  }, []);

  const fetchTikTokAccount = async () => {
    // Replace with actual API call
    return { username: "tiktok_user", followers: 1200 };
  };

  const fetchInstagramAccount = async () => {
    // Replace with actual API call
    return { username: "instagram_user", followers: 1500 };
  };

  const fetchFacebookAccount = async () => {
    // Replace with actual API call
    return { username: "facebook_user", followers: 800 };
  };

  const fetchSnapchatAccount = async () => {
    // Replace with actual API call
    return { username: "snapchat_user", followers: 600 };
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 4 }}>
        Social Media Integration
      </Typography>

      {loading ? (
        <LinearProgress />
      ) : (
        <Grid container spacing={3}>
          {/* TikTok Integration */}
          <Grid item xs={12} md={6}>
            <Card sx={{ padding: 2, borderRadius: '12px', boxShadow: 1 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>TikTok Account</Typography>
                <Typography variant="body1">Username: {accounts.tiktok.username}</Typography>
                <Typography variant="body1">Followers: {accounts.tiktok.followers}</Typography>
                <Button variant="contained" sx={{ marginTop: 2 }}>Connect TikTok</Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Instagram Integration */}
          <Grid item xs={12} md={6}>
            <Card sx={{ padding: 2, borderRadius: '12px', boxShadow: 1 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Instagram Account</Typography>
                <Typography variant="body1">Username: {accounts.instagram.username}</Typography>
                <Typography variant="body1">Followers: {accounts.instagram.followers}</Typography>
                <Button variant="contained" sx={{ marginTop: 2 }}>Connect Instagram</Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Facebook Integration */}
          <Grid item xs={12} md={6}>
            <Card sx={{ padding: 2, borderRadius: '12px', boxShadow: 1 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Facebook Account</Typography>
                <Typography variant="body1">Username: {accounts.facebook.username}</Typography>
                <Typography variant="body1">Followers: {accounts.facebook.followers}</Typography>
                <Button variant="contained" sx={{ marginTop: 2 }}>Connect Facebook</Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Snapchat Integration */}
          <Grid item xs={12} md={6}>
            <Card sx={{ padding: 2, borderRadius: '12px', boxShadow: 1 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Snapchat Account</Typography>
                <Typography variant="body1">Username: {accounts.snapchat.username}</Typography>
                <Typography variant="body1">Followers: {accounts.snapchat.followers}</Typography>
                <Button variant="contained" sx={{ marginTop: 2 }}>Connect Snapchat</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default SocialMediaIntegration;