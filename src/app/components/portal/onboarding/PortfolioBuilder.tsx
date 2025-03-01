"use client";

import * as React from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { PortfolioUploadSection } from "@/components/portal/onboarding/PortfolioUploadSection";
import OnboardingHeader from "@/components/portal/onboarding/OnboardingHeader";
import { useRouter } from "next/navigation";
import { OnboardingStepProps } from "@/types/Props/OnboardingStepProps";
import PhotoGrid from "@/components/portal/onboarding/PhotoGrid";
import useTalentOnboardingStore from "@/state/use-talent-onboarding-store";
import { useStore } from "zustand";
import { useState } from "react";

const steps = [
  { number: 1, title: "Headshot", isActive: false },
  { number: 2, title: "Skills", isActive: false },
  { number: 3, title: "Payment", isActive: false },
  { number: 4, title: "Attributes", isActive: false },
  { number: 5, title: "Social", isActive: false },
  { number: 6, title: "ID", isActive: false },
  { number: 7, title: "Portfolio", isActive: true },
  { number: 8, title: "Review", isActive: false },
];

export const PortfolioBuilder: React.FC<OnboardingStepProps> = ({
  activeStep,
  setActiveStep,
}) => {
  const { talentData, setTalentData } = useStore(useTalentOnboardingStore);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const router = useRouter();

  const onClose = () => {
    router.push("/portal");
  };

  const handleContinue = () => {
    if (
      talentData?.additional_images ||
      talentData?.portfolio_pdf ||
      talentData?.portfolio_video
    ) {
      setActiveStep(activeStep + 1);
    } else {
      setSnackbarMessage("Add at least 1 Portfolio Item.");
      setSnackbarOpen(true);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSkip = () => {
    setActiveStep(activeStep + 1);
  };

  return (
    <Container maxWidth="lg" sx={{ backgroundColor: "black" }}>
      <Box sx={{ paddingBottom: "96px", backgroundColor: "transparent" }}>
        {/* Header Section */}
        <OnboardingHeader steps={steps} onClose={onClose} />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "16px",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              backgroundColor: "transparent",
              width: "100%",
              maxWidth: "768px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#977342",
                marginBottom: 2,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Portfolio
            </Typography>

            <Typography variant="h6" sx={{ color: "#977342", marginBottom: 1 }}>
              Images
            </Typography>

            <PhotoGrid />

            <PortfolioUploadSection
              title="Videos"
              description="Upload your showreel or video portfolio"
              buttonText="Upload Video"
            />

            <PortfolioUploadSection
              title="Resume/CV"
              description="Upload your CV in PDF format"
              buttonText="Upload PDF"
            />
          </Paper>
        </Box>

        {/* Navigation Buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            paddingX: 2,
            marginTop: 4,
            width: { xs: "100%", md: "66%" },
            marginLeft: { xs: 0, md: 24 },
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
        <Box sx={{ textAlign: "center", marginTop: "24px", color: "gray" }}>
          <Typography variant="body2">
            Step {activeStep + 1} of 8 - Portfolio
          </Typography>
        </Box>
      </Box>
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
