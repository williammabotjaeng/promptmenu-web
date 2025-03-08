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

export const IDandCreds: React.FC = () => {
  const { talentData, setTalentData } = useStore(useTalentOnboardingStore);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const router = useRouter();

  const onClose = () => {
    router.push("/portal");
  };

  const handleContinue = () => {
   
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ backgroundColor: "white", opacity: 0.9, paddingBottom: "24px" }}
    >

      <Paper
        elevation={3}
        sx={{
          padding: 4,
          marginTop: 4,
          backgroundColor: "rgb(233, 228, 222)",
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
          sx={{ color: "#000", backgroundColor: "#CEAB76", "&:hover": {
            color: "white"
          } }}
          onClick={handleContinue}
        >
          Save ID Documents
        </Button>
      </Box>

    </Container>
  );
};
