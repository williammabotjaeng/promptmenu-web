"use client";

import React from "react";
import { Box, Typography, Paper, Chip, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { setCookie } from "cookies-next";

interface MessageCardProps {
  id: string | number;
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  sent: boolean;
  thread: any[];
}

export const MessageCard: React.FC<MessageCardProps> = ({
  id,
  sender,
  recipient,
  content,
  timestamp,
  isRead,
  sent,
  thread
}) => {
  const router = useRouter();

  const [cookies] = useCookies([
    'username',
    'current_message'
  ]);

  const userName = cookies?.username;

  const message = {
    id: id,
    sender: sender,
    recipient: recipient,
    content: content,
    timestamp: timestamp,
    isRead: isRead,
    sent: sent,
    thread: thread
  };

  const handleReply = () => {
    // Navigate to a reply page or open a reply modal
    setCookie('current_message', message);
    router.push(`/message/${id}`)
  };

  const handleReadMessage = () => {
    setCookie('current_message', message);
    console.log("Reading Content:", content);
    router.push(`/message/${id}`)
  }

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        backgroundColor: "white",
        borderRadius: "8px",
        marginBottom: 2,
      }}
    >
      <Box display="flex" flexDirection="column">
        {/* Sender and Recipient */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" flexDirection="column" flexGrow={1}>
            <Typography
              variant="h6"
              sx={{
                color: "black",
                fontWeight: "bold",
                fontSize: { xs: "1.2rem", md: "1.5rem" },
              }}
            >
              From: {sent ? userName : "Admin"}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#4B5563",
                fontSize: { xs: "1rem", md: "1.2rem" },
              }}
            >
              To: {sent ? "Admin" : userName}
            </Typography>
          </Box>
          <Chip
            label={isRead ? "Read" : "Unread"}
            sx={{
              backgroundColor: isRead ? "#248f34" : "#c9582c",
              color: "white",
              fontWeight: "bold",
            }}
          />
        </Box>

        {/* Message Content */}
        <Box onClick={handleReadMessage} sx={{
            cursor: 'pointer'
        }} mt={2}>
          <Typography variant="body2" sx={{ color: "#4B5563" }}>
            {content}
          </Typography>
        </Box>

        {/* Timestamp */}
        <Box mt={2}>
          <Typography variant="body2" sx={{ color: "#4B5563" }}>
            <strong>Sent:</strong> {new Date(timestamp).toLocaleString()}
          </Typography>
        </Box>

        {/* Reply Button */}
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#969fed",
              color: "white",
              "&:hover": {
                backgroundColor: "#161fed",
              },
            }}
            onClick={handleReply}
          >
            Reply
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};