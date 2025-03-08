"use client";

import * as React from "react";
import { Box, Grid, Card, CardContent, TextField, Button, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useMessage } from "@/providers/message-provider"; 
import Header from "@/components/dashboard/Header";
import GreyFooter from "@/components/GreyFooter";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const CreateMessage = () => {
  const { sendMessage } = useMessage();  
  const [messageContent, setMessageContent] = useState(""); 
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSendMessage = async () => {
    if (messageContent?.trim() === "") {
      alert("Please select a recipient and enter a message.");
      return;
    }
    setLoading(true);

    try {
      await sendMessage({
        sender: "currentUser",
        recipient: "1",
        content: messageContent,
        sent: true,
        is_thread: false,
        thread: []
      });
      setMessageContent(""); 
      router.push('/message-success');
      setLoading(false);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  if (loading) return <Loading />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", backgroundColor: "white" }}>
      <Header />

      <Box sx={{ flexGrow: 1, padding: { xs: 2, md: 3 } }}>
        <Grid container spacing={3}>
          {/* Message Form */}
          <Grid item xs={12} md={8}>
            <Card sx={{ padding: 2, borderRadius: "12px", boxShadow: 1 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                  Create a New Message
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  placeholder="Type your message here..."
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#1976d2",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#115293",
                    },
                  }}
                  onClick={handleSendMessage}
                >
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* User List */}
          <Grid item xs={12} md={4}>
            <Card sx={{ padding: 2, borderRadius: "12px", boxShadow: 1 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                  Select a Recipient
                </Typography>
                <Typography>
                    <strong>Selected:</strong> Admin
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <GreyFooter />
    </Box>
  );
};

export default CreateMessage;