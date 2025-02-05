"use client";

import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  Typography,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import InstagramIcon from "@mui/icons-material/Instagram";
import WebIcon from "@mui/icons-material/Web";
import {
  Group as GroupIcon,
  Wc as GenderIcon,
  Place as LocationIcon,
  Interests as InterestsIcon,
} from "@mui/icons-material";
import { OnboardingStepProps } from "@/types/Props/OnboardingStepProps";
import { useStore } from "zustand";
import { useRouter } from "next/navigation";
import useTalentOnboardingStore from "@/state/use-talent-onboarding-store";
import OnboardingHeader from "./OnboardingHeader";

const socialData = {
  youtube: "https://youtube.com/channel/xyz",
  twitter: "@example",
  facebook: "https://facebook.com/example",
  linkedin: "https://linkedin.com/in/example",
  pinterest: "https://pinterest.com/example",
  instagram: "https://instagram.com/example",
  tiktok: "https://tiktok.com/@example",
  other: "https://example.com",
};

const allSocialPlatforms = [
  { icon: "age", name: "Age Range" },
  { icon: "gender", name: "Dominant Gender" },
  { icon: "location", name: "Location" },
  { icon: "interests", name: "Interests/Hobbies" },
];

const InfluencerSteps = [
  // { number: 1, title: "Headshot", isActive: false },
  // { number: 2, title: "Personal Info", isActive: false },
  { number: 3, title: "Skills", isActive: false },
  { number: 4, title: "Payment", isActive: false },
  { number: 5, title: "Attributes", isActive: false },
  { number: 6, title: "Social Accounts", isActive: false },
  { number: 6, title: "Follower Count", isActive: true },
  { number: 7, title: "ID", isActive: false },
  { number: 8, title: "Portfolio", isActive: false },
  { number: 9, title: "Review", isActive: false },
];

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case "age":
      return <GroupIcon sx={{ fontSize: "18px", color: "#977342" }} />; 
    case "gender":
      return <GenderIcon sx={{ fontSize: "18px", color: "#977342" }} />; 
    case "location":
      return <LocationIcon sx={{ fontSize: "18px", color: "#977342" }} />; 
    case "interests":
      return <InterestsIcon sx={{ fontSize: "18px", color: "#977342" }} />; 
    default:
      return null;
  }
};

const AudienceDemographics: React.FC<OnboardingStepProps> = ({
  activeStep,
  setActiveStep,
}) => {
  const [engagementRates, setEngagementRates] = useState<{
    [key: string]: string;
  }>({});
  const { talentData } = useStore(useTalentOnboardingStore);

  const router = useRouter();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleAudienceDemographicsChange =
    (platform: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setEngagementRates({
        ...engagementRates,
        [platform]: event.target.value,
      });
    };

  const filledSocialPlatforms = allSocialPlatforms.filter(
    (platform) => socialData[platform.icon]
  );

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const onClose = () => {
    router.push("/portal");
  };

  const handleContinue = () => {
    setActiveStep(activeStep + 1);
  };

  const handleSkip = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    } else {
      router.push('/portal');
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          backgroundColor: "black",
        }}
      >
        {/* Header Section */}
        <OnboardingHeader steps={InfluencerSteps} onClose={onClose} />
        <Typography
          variant="h4"
          sx={{
            marginBottom: { md: 1, xs: 0 },
            textAlign: { xs: "center", md: "left" },
            color: "#977342",
            fontSize: { xs: "20px", md: "32px" },
            ml: { md: 10, xs: 0 },
            mt: { md: 4, xs: 0 }
          }}
        >
          Audience Demographics
        </Typography>
        <TableContainer sx={{ margin: { xs: 2 }, mr: { xs: 4, md: 0 }, p: { xs: 4 }}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ color: "#977342", fontWeight: "bold" }}
                ></TableCell>
                <TableCell sx={{ color: "#977342", fontWeight: "bold" }}>
                  Demographic
                </TableCell>
                <TableCell sx={{ color: "#977342", fontWeight: "bold" }}>
                  {`Value`}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allSocialPlatforms.map((platform) => (
                <TableRow key={platform.icon}>
                  <TableCell>{renderIcon(platform.icon)}</TableCell>
                  <TableCell sx={{ color: "#CEAB76" }}>
                    {platform.name}
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      placeholder={`Audience Demographic`}
                      variant="outlined"
                      value={engagementRates[platform.icon] || ""}
                      onChange={handleAudienceDemographicsChange(platform.icon)}
                      InputProps={{
                        sx: {
                          bgcolor: "black",
                          borderRadius: "8px",
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#977342",
                            },
                            "&:hover fieldset": {
                              borderColor: "#977342",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#977342",
                            },
                          },
                          "& .MuiInputBase-input": {
                            color: "#CEAB76",
                          },
                        },
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
              
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', marginTop: 2, width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
              <Button
                sx={{
                  color: '#977342',
                  border: '2px solid #977342',
                  '&:hover': { color: '#fff' },
                  width: { xs: '100%', md: 'auto' },
                  marginBottom: { xs: 1, md: 0 }
                }}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                sx={{
                  color: '#000',
                  backgroundColor: '#CEAB76',
                  width: { xs: '100%', md: 'auto' } 
                }}
                onClick={handleContinue}
              >
                Continue
              </Button>
              <Button
                sx={{
                  color: '#977342',
                  border: '2px solid #977342',
                  '&:hover': { color: '#fff' },
                  width: { xs: '100%', md: 'auto' },
                  marginBottom: { xs: 1, md: 0 },
                  mt: { xs: 1 }
                }}
                onClick={handleSkip}
              >
                Skip for Now
              </Button>
            </Box>

        {/* Step Indicator Section */}
        <Typography variant="caption" sx={{ paddingX: 2, paddingY: 1, marginBottom: 0, color: 'gray', textAlign: 'center' }}>
          Step {activeStep + 1} of 8 - Headshot Upload
        </Typography>

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
      </Box>
    </Box>
  );
};

export default AudienceDemographics;
