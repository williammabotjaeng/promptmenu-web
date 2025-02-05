import React, { useState } from "react";
import { Box, Typography, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useRouter } from "next/router";
import { useStore } from "zustand";
import { OnboardingStepProps } from "@/types/Props/OnboardingStepProps";
import useTalentOnboardingStore from "@/state/use-talent-onboarding-store";

const PersonalInfo: React.FC<OnboardingStepProps> = ({
  activeStep,
  setActiveStep,
}) => {
  const { talentData, setTalentData } = useStore(useTalentOnboardingStore);

  const [personalInfo, setPersonalInfo] = useState({
    legalFullName: talentData?.legalFullName || "",
    stageName: talentData?.stageName || "",
    date_of_birth: talentData?.date_of_birth || "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const router = useRouter();

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({ ...personalInfo, [field]: event.target.value });
  };

  const handleContinue = () => {
    const { legalFullName, stageName, date_of_birth } = personalInfo;

    if (!legalFullName || !stageName || !date_of_birth) {
      setSnackbarMessage("Please fill out all fields.");
      setSnackbarOpen(true);
      return;
    }

    setTalentData({
      ...talentData,
      legalFullName,
      stageName,
      date_of_birth,
    });

    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    } else {
      router.push("/portal");
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        padding: 4,
      }}
    >
      {/* Header Section */}
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          color: "#ceab76",
          marginBottom: 4,
        }}
      >
        Personal Information
      </Typography>

      {/* Form Fields */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <TextField
          fullWidth
          label="Legal Full Name"
          variant="outlined"
          value={personalInfo.legalFullName}
          onChange={handleInputChange("legalFullName")}
          sx={{
            backgroundColor: "white",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#977342",
              },
              "&:hover fieldset": {
                borderColor: "#CEAB76",
              },
            },
          }}
        />
        <TextField
          fullWidth
          label="Stage Name"
          variant="outlined"
          value={personalInfo.stageName}
          onChange={handleInputChange("stageName")}
          sx={{
            backgroundColor: "white",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#977342",
              },
              "&:hover fieldset": {
                borderColor: "#CEAB76",
              },
            },
          }}
        />
        <TextField
          fullWidth
          label="Date of Birth"
          type="date"
          variant="outlined"
          value={personalInfo.date_of_birth}
          onChange={handleInputChange("date_of_birth")}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            backgroundColor: "white",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#977342",
              },
              "&:hover fieldset": {
                borderColor: "#CEAB76",
              },
            },
          }}
        />
      </Box>

      {/* Navigation Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 4,
        }}
      >
        <Button
          sx={{
            color: "#977342",
            border: "2px solid #977342",
            "&:hover": { color: "#fff" },
          }}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          sx={{
            color: "#000",
            backgroundColor: "#CEAB76",
          }}
          onClick={handleContinue}
        >
          Continue
        </Button>
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
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PersonalInfo;