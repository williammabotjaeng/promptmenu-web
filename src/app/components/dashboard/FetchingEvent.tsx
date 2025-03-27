import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import EventIcon from "@mui/icons-material/Event";

const FetchingEvent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "white"
      }}
    >
      {/* Animated Envelope Icon */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }} // Bounce effect
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <EventIcon sx={{ fontSize: 80, color: "#977342" }} />
      </motion.div>

      {/* Loading Text */}
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Fetching Event...
      </Typography>
    </Box>
  );
};

export default FetchingEvent;