import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UpdatingEventMedia = () => {
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
      {/* Animated Upload Icon */}
      <motion.div
        initial={{ y: 0, opacity: 0.8 }}
        animate={{ y: [-10, 0], opacity: [0.8, 1] }} // Upload motion effect
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <CloudUploadIcon sx={{ fontSize: 80, color: "#977342" }} />
      </motion.div>
      
      {/* Progress indicator */}
      <CircularProgress 
        size={30}
        thickness={4}
        sx={{ 
          color: "#977342", 
          marginTop: 2 
        }} 
      />
      
      {/* Loading Text */}
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Updating Event Media, please wait...
      </Typography>
    </Box>
  );
};

export default UpdatingEventMedia;