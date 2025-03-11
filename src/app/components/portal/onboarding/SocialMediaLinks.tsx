"use client";

import * as React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Snackbar,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  DialogActions,
} from "@mui/material";
import { SocialInput } from "./SocialInput";
import OnboardingHeader from "@/components/portal/onboarding/OnboardingHeader";
import { useRouter } from "next/navigation";
import { OnboardingStepProps } from "@/types/Props/OnboardingStepProps";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import useTalentOnboardingStore from "@/state/use-talent-onboarding-store";
import { skillsRequiringPhysicalAttributes } from "./PaymentSection";
import { useStore } from "zustand";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Loading from "@/components/Loading";

const steps = [
  { number: 1, title: "Headshot", isActive: false },
  { number: 2, title: "Skills", isActive: false },
  { number: 3, title: "Payment", isActive: false },
  { number: 4, title: "Attributes", isActive: false },
  { number: 5, title: "Social", isActive: true },
  { number: 6, title: "ID", isActive: false },
  { number: 7, title: "Portfolio", isActive: false },
  { number: 8, title: "Review", isActive: false },
];

const InfluencerSteps = [
  // { number: 1, title: "Headshot", isActive: false },
  { number: 2, title: "Personal Info", isActive: false },
  { number: 3, title: "Skills", isActive: false },
  { number: 4, title: "Payment", isActive: false },
  { number: 5, title: "Attributes", isActive: false },
  { number: 6, title: "Social Accounts", isActive: true },
  { number: 7, title: "ID", isActive: false },
  { number: 8, title: "Portfolio", isActive: false },
  { number: 9, title: "Review", isActive: false },
];

const defaultSocialInputs = [
  {
    icon: "instagram",
    placeholder: "Instagram Username",
    alt: "Instagram icon",
  },
  { icon: "tiktok", placeholder: "TikTok Username", alt: "TikTok icon" },
  { icon: "website", placeholder: "Website URL", alt: "Website icon" },
];

const allSocialPlatforms = [
  { icon: "youtube", placeholder: "YouTube Channel URL" },
  { icon: "twitter", placeholder: "Twitter Username" },
  { icon: "facebook", placeholder: "Facebook Profile URL" },
  { icon: "linkedin", placeholder: "LinkedIn Profile URL" },
  { icon: "pinterest", placeholder: "Pinterest Profile URL" },
  // { icon: "other", placeholder: "Other Social Profile URL" },
];

interface SocialData {
  instagram: string;
  tiktok: string;
  website: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  // other?: string[]; 
}

export const SocialMediaLinks: React.FC<OnboardingStepProps> = ({
  activeStep,
  setActiveStep,
}) => {
  const router = useRouter();
  const { talentData, setTalentData } = useStore(useTalentOnboardingStore);
  const [cookies, setCookie] = useCookies(["user_role"]);
  const [socialData, setSocialData] = React.useState<SocialData>({
    instagram: "",
    tiktok: "",
    website: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    // other: [],
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [additionalInputs, setAdditionalInputs] = useState([]);

  const userRole = cookies["user_role"];

  const onClose = () => {
    router.push("/portal");
  };

  const handleContinue = () => {
    const areAllFieldsEmpty = Object.values(socialData).every(
      (value) => value === ""
    );

    console.log("Social Data:", socialData);

    setTalentData({
      ...talentData,
      social_media_links: socialData,
    });

    if (!areAllFieldsEmpty) {
      setActiveStep(activeStep + 1);
    } else {
      setSnackbarMessage("Add at least 1 Social Account.");
      setSnackbarOpen(true);
    }
  };

  const handleBack = () => {
    const hasPhysicalAttributeSkill = talentData.skills.some((skill) =>
      skillsRequiringPhysicalAttributes.includes(skill.name)
    );
    if (hasPhysicalAttributeSkill) {
      setActiveStep(activeStep - 1);
    } else {
      setActiveStep(activeStep - 2);
    }
  };

  const handleSkip = () => {
    setActiveStep(activeStep + 1);
  };

  // const handleOtherInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  
  //   setSocialData((prevData) => ({
  //     ...prevData,
  //     other: [...prevData?.other, value], 
  //   }));
  // };
  
  const handleStandardInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event?.target?.value;
  
      setSocialData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    };

  useEffect(() => {
    setSocialData({
      ...talentData?.social_media_links,
    });
  }, [talentData]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleAddPlatform = (platform: any) => {
    console.log("Platform instance:", platform);
    setAdditionalInputs((prev) => [...prev, platform]);
    setDialogOpen(false);
  };

  if (loading) return <Loading />;

  return (
    <Box
      sx={{
        display: "flex",
        overflow: "hidden",
        flexDirection: "column",
        backgroundColor: "black",
        paddingX: { xs: 2, md: 4 },
      }}
    >
      {/* Header Section */}
      <OnboardingHeader
        steps={userRole === "influencer" ? InfluencerSteps : steps}
        onClose={onClose}
      />

      {/* Social Media Links Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 4,
            borderRadius: "8px",
            backgroundColor: "rgba(75, 85, 99, 0.1)",
            width: { xs: "90%", md: "50%" },
            marginTop: 4,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              pt: 0.25,
              pb: 3,
              color: "#977342",
              textAlign: "center",
            }}
          >
            Social Media Accounts
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 3,
            }}
          >
            {[...defaultSocialInputs, ...additionalInputs].map(
              (input, index) => (
                <SocialInput
                  key={index}
                  {...input}
                  value={
                    socialData[input.icon as keyof typeof socialData] || ""
                  }
                  onChange={
                    handleStandardInputChange(input.icon)
                  }
                />
              )
            )}
          </Box>
          <IconButton
            sx={{
              color: "#977342",
              marginTop: 2,
              alignSelf: "center",
            }}
            onClick={handleDialogOpen}
          >
            <PersonAddAlt1Icon />
            <Typography sx={{ marginLeft: 1 }}>Add more</Typography>
          </IconButton>
        </Paper>
      </Box>

      {/* Dialog for Adding More Platforms */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Select a Social Media Platform</DialogTitle>
        <DialogContent>
          <List>
            {allSocialPlatforms
              .filter(
                (platform) =>
                  (!defaultSocialInputs.some(
                    (input) => input.icon === platform.icon
                  ) &&
                    !additionalInputs.some(
                      (input) => input.icon === platform.icon
                    ))
              )
              .map((platform, index) => (
                <ListItem
                  key={index}
                  component="div"
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      color: "white",
                      backgroundColor: "#977342",
                    },
                  }}
                  onClick={() => handleAddPlatform(platform)}
                >
                  <ListItemText primary={platform.placeholder} />
                </ListItem>
              ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Navigation Buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          paddingX: 2,
          marginTop: 4,
          marginLeft: { md: 40 },
          width: { xs: "100%", md: "52%" },
          alignItems: "center",
        }}
      >
        <Button
          sx={{
            color: "#977342",
            border: "2px solid #977342",
            "&:hover": { color: "#fff" },
            marginBottom: { xs: 1, md: 0 },
            width: { xs: "100%", md: "20%" },
          }}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          sx={{
            color: "#000",
            backgroundColor: "#CEAB76",
            width: { xs: "100%", md: "20%" },
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
        sx={{ paddingX: 2, color: "gray", textAlign: "center", marginTop: 2 }}
      >
        Step {activeStep + 1} of 8 - Socials
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
  );
};
