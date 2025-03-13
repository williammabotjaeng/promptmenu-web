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
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  YouTube as YouTubeIcon,
  Pinterest as PinterestIcon,
  Language as OtherIcon,
} from "@mui/icons-material";
import { OnboardingStepProps } from "@/types/Props/OnboardingStepProps";
import { useStore } from "zustand";
import { useRouter } from "next/navigation";
import useTalentOnboardingStore from "@/state/use-talent-onboarding-store";
import OnboardingHeader from "./OnboardingHeader";
import { useCookies } from "react-cookie";

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
  { icon: "youtube", name: "YouTube" },
  { icon: "twitter", name: "Twitter" },
  { icon: "facebook", name: "Facebook" },
  { icon: "linkedin", name: "LinkedIn" },
  { icon: "pinterest", name: "Pinterest" },
  { icon: "instagram", name: "Instagram" },
  { icon: "tiktok", name: "TikTok" },
  { icon: "other", name: "Other" },
];

const InfluencerSteps = [
  // { number: 1, title: "Headshot", isActive: false },
  // { number: 2, title: "Personal Info", isActive: false },
  // { number: 3, title: "Skills", isActive: false },
  { number: 4, title: "Payment", isActive: false },
  { number: 5, title: "Attributes", isActive: false },
  { number: 6, title: "Social Accounts", isActive: false },
  { number: 7, title: "Follower Count", isActive: false},
  { number: 8, title: "Engagement Rate", isActive: true },
  { number: 9, title: "Audience Demographics", isActive: false },
  { number: 10, title: "ID", isActive: false },
  { number: 11, title: "Portfolio", isActive: false },
];

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case "facebook":
      return <FacebookIcon sx={{ fontSize: "18px", color: "#977342" }} />;
    case "twitter":
      return <TwitterIcon sx={{ fontSize: "18px", color: "#977342" }} />;
    case "instagram":
      return <InstagramIcon sx={{ fontSize: "18px", color: "#977342" }} />;
    case "linkedin":
      return <LinkedInIcon sx={{ fontSize: "18px", color: "#977342" }} />;
    case "youtube":
      return <YouTubeIcon sx={{ fontSize: "18px", color: "#977342" }} />;
    case "pinterest":
      return <PinterestIcon sx={{ fontSize: "18px", color: "#977342" }} />;
    case "tiktok":
      return (
        <FontAwesomeIcon
          icon={faTiktok}
          style={{ fontSize: "18px", color: "#977342" }}
        />
      );
    case "other":
      return <OtherIcon sx={{ fontSize: "18px", color: "#977342" }} />;
    default:
      return null;
  }
};

const EngagementRate: React.FC<OnboardingStepProps> = ({
  activeStep,
  setActiveStep,
}) => {
  const [engagementRates, setEngagementRates] = useState<{
    [key: string]: string;
  }>({});
  const { talentData } = useStore(useTalentOnboardingStore);

  const [cookies] = useCookies(['user_role']);

  const userRole = cookies?.user_role;

  const router = useRouter();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleEngagementRateChange =
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
          Engagement Rate (%)
        </Typography>
        <TableContainer sx={{ margin: { xs: 2 }, mr: { xs: 4, md: 0 }, p: { xs: 4 }}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ color: "#977342", fontWeight: "bold" }}
                ></TableCell>
                <TableCell sx={{ color: "#977342", fontWeight: "bold" }}>
                  Platform
                </TableCell>
                <TableCell sx={{ color: "#977342", fontWeight: "bold" }}>
                  {`Engagement Rate (%)`}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filledSocialPlatforms.map((platform) => (
                <TableRow key={platform.icon}>
                  <TableCell>{renderIcon(platform.icon)}</TableCell>
                  <TableCell sx={{ color: "#CEAB76" }}>
                    {platform.name}
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      placeholder={`Average Engagement Rate (%)`}
                      variant="outlined"
                      value={engagementRates[platform.icon] || ""}
                      onChange={handleEngagementRateChange(platform.icon)}
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
          Step {activeStep + 1} of {userRole === 'talent' ? 8 : 11} - Headshot Upload
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

export default EngagementRate;
