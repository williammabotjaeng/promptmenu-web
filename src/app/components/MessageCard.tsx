"use client";

import React from "react";
import { Box, Typography, Paper, Chip, Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface MessageCardProps {
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export const MessageCard: React.FC<MessageCardProps> = ({
  sender,
  recipient,
  content,
  timestamp,
  isRead,
}) => {
  const router = useRouter();

  const handleReply = () => {
    // Navigate to a reply page or open a reply modal
    router.push(`/messages/reply`);
  };

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
              From: {sender}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#4B5563",
                fontSize: { xs: "1rem", md: "1.2rem" },
              }}
            >
              To: {recipient}
            </Typography>
          </Box>
          <Chip
            label={isRead ? "Read" : "Unread"}
            sx={{
              backgroundColor: isRead ? "#4CAF50" : "#F44336",
              color: "white",
              fontWeight: "bold",
            }}
          />
        </Box>

        {/* Message Content */}
        <Box mt={2}>
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
              backgroundColor: "#1976d2",
              color: "white",
              "&:hover": {
                backgroundColor: "#115293",
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