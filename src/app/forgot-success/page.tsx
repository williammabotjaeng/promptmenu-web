"use client";

import { useEffect } from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import MailLockIcon from '@mui/icons-material/MailLock';

const SupportMessageSuccess: React.FC = () => {
  const router = useRouter();
  const [cookies] = useCookies(["user_role"]);

  const userRole = cookies?.user_role;

  // Use media queries to detect screen size
  const isTabletOrMobile = useMediaQuery("(max-width: 768px)");

  const handleNavigateToLogin = () => {
    router.push("/login");
  };

  return (
    <>
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
        {/* Animated Gears/Construction Icon */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: 2, ease: "linear" }}
        >
          <MailLockIcon
            sx={{ fontSize: 100, color: "#977342", marginBottom: 2 }}
          />
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Typography
            variant="h4"
            sx={{ fontSize: isTabletOrMobile ? "22px" : null }}
            fontWeight="bold"
            gutterBottom
          >
            Your Reset Email Has Been Sent to your Email!
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: isTabletOrMobile ? "12px" : null }}
            color="textSecondary"
          >
            Please Check your inbox for the Reset Email.
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
            onClick={handleNavigateToLogin}
            sx={{ marginTop: 4 }}
          >
            Back to Login
          </Button>
        </motion.div>
      </Box>
    </>
  );
};

export default SupportMessageSuccess;