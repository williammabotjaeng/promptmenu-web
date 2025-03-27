import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import EngineeringIcon from "@mui/icons-material/Engineering";

const FetchingRole = () => {
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
      {/* Animated Engineering Icon */}
      <motion.div
        initial={{ rotate: -10 }}
        animate={{ rotate: [10, -10] }} // Tool-using motion
        transition={{
          duration: 1.2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <EngineeringIcon sx={{ fontSize: 80, color: "#977342" }} />
      </motion.div>
      
      {/* Loading Text */}
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Fetching Role...
      </Typography>
    </Box>
  );
};

export default FetchingRole;