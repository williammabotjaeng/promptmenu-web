import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const FetchingMessage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
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
        <MailOutlineIcon sx={{ fontSize: 80, color: "#977342" }} />
      </motion.div>

      {/* Loading Text */}
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Fetching Message...
      </Typography>
    </Box>
  );
};

export default FetchingMessage;