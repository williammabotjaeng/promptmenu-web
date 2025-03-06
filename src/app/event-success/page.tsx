"use client";

import { useEffect } from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

const EventSuccess: React.FC = () => {
  const { width, height } = useWindowSize();
  const router = useRouter();
  const [cookies] = useCookies(["user_role"]);

  const userRole = cookies?.user_role;

  // Use media queries to detect screen size
  const isTabletOrMobile = useMediaQuery("(max-width: 768px)");

  const handleNavigateToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <>
      {/* Confetti Animation */}
      <Confetti
        width={isTabletOrMobile ? width : 1300} 
        height={isTabletOrMobile ? height : 590} 
      />

      {/* Centered Content */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        textAlign="center"
        bgcolor="#f5f5f5"
      >
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <CheckCircleIcon
            sx={{ fontSize: 100, color: "green", marginBottom: 2 }}
          />
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Typography variant="h4" sx={{ fontSize: isTabletOrMobile ? "22px" : null}} fontWeight="bold" gutterBottom>
            You have Successfully Created your Event!
          </Typography>
          <Typography variant="body1" sx={{ fontSize: isTabletOrMobile ? "12px" : null}} color="textSecondary">
            Thank you for casting on SSH. Our Team will review and Approve your Event. 
          </Typography>
        </motion.div>

        {/* Proceed to Dashboard Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleNavigateToDashboard}
            sx={{ marginTop: 4 }}
          >
            Proceed to Dashboard
          </Button>
        </motion.div>
      </Box>
    </>
  );
};

export default EventSuccess;