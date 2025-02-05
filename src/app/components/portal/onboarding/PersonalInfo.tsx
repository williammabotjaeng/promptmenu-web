import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useStore } from "zustand";
import { OnboardingStepProps } from "@/types/Props/OnboardingStepProps";
import useTalentOnboardingStore from "@/state/use-talent-onboarding-store";
import OnboardingHeader from "@/components/portal/onboarding/OnboardingHeader";
import { InputAdornment } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const InfluencerSteps = [
  { number: 1, title: "Headshot", isActive: false },
  { number: 2, title: "Personal Info", isActive: false },
  { number: 3, title: "Skills", isActive: true },
  { number: 4, title: "Payment", isActive: false },
  { number: 5, title: "Attributes", isActive: false },
  { number: 6, title: "Social", isActive: false },
  { number: 7, title: "ID", isActive: false },
  { number: 8, title: "Portfolio", isActive: false },
  { number: 9, title: "Review", isActive: false },
];

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

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSkip = () => {
    setActiveStep(activeStep + 1);
  };

  const onClose = () => {
    router.push("/portal");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#000",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <OnboardingHeader steps={InfluencerSteps} onClose={onClose} />
      <Typography
        variant="h6"
        sx={{ color: "#CEAB76", textAlign: "center", marginBottom: 2 }}
      >
        Personal Information
      </Typography>

      {/* Form Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          padding: 4,
          backgroundColor: "#000",
          border: "1px solid #CEAB76",
          borderRadius: "8px",
          margin: "auto",
          width: { xs: "100%", sm: "90%", md: "800px" },
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TextField
          fullWidth
          label="Legal Full Name"
          variant="outlined"
          value={personalInfo.legalFullName}
          onChange={handleInputChange("legalFullName")}
          sx={{
            backgroundColor: "black",
            color: "#977342",
            borderRadius: "8px",
            width: { sm: "100%" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#977342",
                color: "#977342",
              },
              "&:hover fieldset": {
                borderColor: "#CEAB76",
                color: "#977342",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              color: "#977342",
            },
          }}
          InputProps={{
            sx: {
              color: "#977342",
              "&::placeholder": {
                color: "#977342",
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
            backgroundColor: "black",
            color: "#977342",
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
          InputLabelProps={{
            sx: {
              color: "#977342",
            },
          }}
          InputProps={{
            sx: {
              color: "#977342",
              "&::placeholder": {
                color: "#977342",
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
          sx={{
            backgroundColor: "black",
            color: "#977342",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#977342",
              },
              "&:hover fieldset": {
                borderColor: "#CEAB76",
              },
            },
            "& input::-webkit-calendar-picker-indicator": {
              filter: "invert(56%) sepia(34%) saturate(746%) hue-rotate(0deg)", 
              cursor: "pointer", 
            },
          }}
          InputLabelProps={{
            shrink: true,
            sx: {
              color: "#977342", 
            },
          }}
          InputProps={{
            sx: {
              color: "#977342", 
              "&::placeholder": {
                color: "#977342", 
              },
            },
          }}
        />
      </Box>

      {/* Navigation Buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          marginTop: 2,
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Button
          sx={{
            color: "#977342",
            border: "2px solid #977342",
            "&:hover": { color: "#fff" },
            width: { xs: "100%", md: "auto" },
            marginBottom: { xs: 1, md: 0 },
          }}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          sx={{
            color: "#000",
            backgroundColor: "#CEAB76",
            width: { xs: "100%", md: "auto" },
          }}
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
      <Typography
        variant="caption"
        sx={{
          paddingX: 2,
          paddingY: 1,
          marginBottom: 0,
          color: "gray",
          textAlign: "center",
        }}
      >
        Step {activeStep + 1} of 8 - Headshot Upload
      </Typography>
      <br />
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
