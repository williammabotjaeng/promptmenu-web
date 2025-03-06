"use client";

import * as React from "react";
import { Box, Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useMessage } from "@/providers/message-provider"; // Assuming you have a MessageProvider
import Header from "@/components/dashboard/Header";
import GreyFooter from "@/components/GreyFooter";
import FetchingMessage from "@/components/dashboard/FetchingMessage";
import { truncate } from "node:fs";

const SingleMessage = () => {
  const router = useRouter();
  const { messages, markAsRead, extendThread, fetchMessages } = useMessage(); // Fetch messages and actions from the provider
  const [replyContent, setReplyContent] = useState("");
  const [cookies, setCookie] = useCookies([
    'current_message', 'username'
  ]);
  // Find the specific message by ID
  const message = cookies?.current_message;
  const userName = cookies?.username;

  if (!message) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <FetchingMessage />
      </Box>
    );
  }

  const handleReply = async () => {
    if (replyContent.trim() === "") return;

    try {
      await extendThread( message?.id, {
        ...message,
        sender: "currentUser", 
        recipient: message.sender, 
        content: replyContent,
        sent: true,
        is_thread: true
      });
      setReplyContent(""); 
      alert("Reply sent successfully!");
    } catch (error) {
      console.error("Error sending reply:", error);
      alert("Failed to send reply. Please try again.");
    }
  };

  useEffect(() => {
    fetchMessages();
    console.log("Message ID:", message);
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", backgroundColor: "white" }}>
      <Header />

      <Box sx={{ flexGrow: 1, padding: { xs: 2, md: 3 } }}>
        <Card sx={{ padding: 2, borderRadius: "12px", boxShadow: 1 }}>
          <CardContent>
            {/* Message Details */}
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
              Message from {message.sent ? userName : "Admin"}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              <strong>To:</strong> {message?.sent ? "Admin" : userName}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2, color: "#4B5563" }}>
              <strong>Sent:</strong> {new Date(message.timestamp).toLocaleString()}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 4 }}>
              {message.content}
            </Typography>

            {/* Display Thread Messages */}
            {message?.thread && message?.thread?.length > 0 && (
              <Box sx={{ marginBottom: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                  Thread
                </Typography>
                {message.thread.map((threadMessage) => (
                  <Card key={threadMessage.id} sx={{ marginBottom: 2, padding: 1, borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
                    <CardContent>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {threadMessage.sender === message.sender ? "You" : "Admin"} - {new Date(threadMessage.timestamp).toLocaleString()}
                      </Typography>
                      <Typography variant="body1">
                        {threadMessage.content}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}

            {/* Reply Box */}
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
              Reply
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Type your reply here..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#977342",
                color: "white",
                "&:hover": {
                  backgroundColor: "#CEAB76",
                },
              }}
              onClick={handleReply}
            >
              Send Reply
            </Button>
          </CardContent>
        </Card>
      </Box>

      <GreyFooter />
    </Box>
  );
};

export default SingleMessage;