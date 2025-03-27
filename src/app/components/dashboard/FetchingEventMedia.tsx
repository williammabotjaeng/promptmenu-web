import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import MovieIcon from "@mui/icons-material/Movie";

const FetchingEventMedia = () => {
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
      {/* Animated Film Reel Icon */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }} // Spinning effect like a film reel
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <MovieIcon sx={{ fontSize: 80, color: "#977342" }} />
      </motion.div>
      
      {/* Loading Text */}
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Loading Event Media...
      </Typography>
    </Box>
  );
};

export default FetchingEventMedia;