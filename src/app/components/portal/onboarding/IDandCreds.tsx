"use client";

import * as React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import { UploadSection } from "@/components/portal/onboarding/UploadSection";
import OnboardingHeader from "@/components/portal/onboarding/OnboardingHeader";
import { useRouter } from "next/navigation";
import { OnboardingStepProps } from "@/types/Props/OnboardingStepProps";
import useTalentOnboardingStore from "@/state/use-talent-onboarding-store";
import { useStore } from "zustand";
import { useState } from "react";
import { useCookies } from "react-cookie";

const steps = [
  // { number: 3, title: "Attributes", isActive: false },
  // { number: 4, title: "Ethnicity", isActive: false },
  { number: 5, title: "ID", isActive: true },
  { number: 6, title: "Social", isActive: false },
  { number: 7, title: "Portfolio", isActive: false },
  { number: 8, title: "Payment", isActive: false },
  { number: 9, title: "Review", isActive: false },
];

const InfluencerSteps = [
  // { number: 1, title: "Headshot", isActive: false },
  // { number: 2, title: "Personal Info", isActive: false },
  // { number: 3, title: "Skills", isActive: false },
  // { number: 4, title: "Payment", isActive: false },
  { number: 5, title: "Attributes", isActive: false },
  { number: 6, title: "Social Accounts", isActive: false },
  { number: 7, title: "Follower Count", isActive: false },
  { number: 8, title: "Engagement Rate", isActive: false },
  { number: 9, title: "Audience Demographics", isActive: false },
  { number: 10, title: "ID", isActive: true },
  { number: 11, title: "Portfolio", isActive: false },
  { number: 12, title: "Review", isActive: false },
];

export const IDandCreds: React.FC<OnboardingStepProps> = ({
  activeStep,
  setActiveStep,
}) => {
  const { talentData, setTalentData } = useStore(useTalentOnboardingStore);

  const [cookies] = useCookies(["user_role"]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const router = useRouter();

  const userRole = cookies?.user_role;

  const onClose = () => {
    router.push("/portal");
  };

  const handleContinue = () => {
    if (talentData?.government_id_front && talentData?.government_id_back) {
      setActiveStep(activeStep + 1);
    } else {
      setSnackbarMessage("Both Front and Back ID Images Required.");
      setSnackbarOpen(true);
    }
  };

  const handleSkip = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ backgroundColor: "black", opacity: 0.9, paddingBottom: "24px" }}
    >
      {/* Header Section */}
      <OnboardingHeader
        steps={userRole === "influencer" ? InfluencerSteps : steps}
        onClose={onClose}
      />

      <Paper
        elevation={3}
        sx={{
          padding: 4,
          marginTop: 4,
          backgroundColor: "rgba(151, 115, 66, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "#977342", marginBottom: 2, textAlign: "center" }}
        >
          ID Document
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
          }}
        >
          {/* Pass the side of the document to the UploadSection */}
          <UploadSection title="Front Side" />
          <UploadSection title="Back Side" />
        </Box>
      </Paper>

      {/* Navigation Buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          paddingX: 2,
          marginTop: 4,
        }}
      >
        <Button
          sx={{
            color: "#977342",
            border: "2px solid #977342",
            "&:hover": { color: "#fff" },
            marginBottom: { xs: 1, md: 0 },
          }}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          sx={{ color: "#000", backgroundColor: "#CEAB76" }}
          onClick={handleContinue}
        >
          Continue
        </Button>
        <Button
          sx={{
            color: "#977342",
            border: "2px solid #977342",
            "&:hover": { color: "#fff" },
            width: { xs: "100%", md: "auto" },
            marginBottom: { xs: 1, md: 0 },
            mt: { xs: 1 },
          }}
          onClick={handleSkip}
        >
          Skip for Now
        </Button>
      </Box>

      {/* Step Indicator Section */}
      <footer style={{ textAlign: "center", marginTop: "28px", color: "gray" }}>
        <Typography variant="body2">
          Step {activeStep + 1} of {userRole === "talent" ? 9 : 11} - ID
          Document
        </Typography>
      </footer>
      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={"error"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};
