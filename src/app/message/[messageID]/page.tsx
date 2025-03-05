"use client";

import * as React from "react";
import { Box, Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMessage } from "@/providers/message-provider"; // Assuming you have a MessageProvider
import Header from "@/components/dashboard/Header";
import GreyFooter from "@/components/GreyFooter";

const SingleMessage = ({ messageId }: { messageId: string }) => {
  const router = useRouter();
  const { messages, markAsRead, sendMessage } = useMessage(); // Fetch messages and actions from the provider
  const [replyContent, setReplyContent] = useState("");

  // Find the specific message by ID
  const message = messages?.find((msg) => msg.id === messageId);

  if (!message) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography variant="h6">Message not found</Typography>
      </Box>
    );
  }

  const handleReply = async () => {
    if (replyContent.trim() === "") return;

    try {
      await sendMessage({
        sender: "currentUser", // Replace with the actual sender (e.g., from auth context)
        recipient: message.sender, // Reply to the original sender
        content: replyContent,
        sent: true
      });
      setReplyContent(""); // Clear the reply box
      alert("Reply sent successfully!");
    } catch (error) {
      console.error("Error sending reply:", error);
      alert("Failed to send reply. Please try again.");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", backgroundColor: "white" }}>
      <Header />

      <Box sx={{ flexGrow: 1, padding: { xs: 2, md: 3 } }}>
        <Card sx={{ padding: 2, borderRadius: "12px", boxShadow: 1 }}>
          <CardContent>
            {/* Message Details */}
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
              Message from {message.sender}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              <strong>To:</strong> {message.recipient}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2, color: "#4B5563" }}>
              <strong>Sent:</strong> {new Date(message.timestamp).toLocaleString()}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 4 }}>
              {message.content}
            </Typography>

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
                backgroundColor: "#1976d2",
                color: "white",
                "&:hover": {
                  backgroundColor: "#115293",
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