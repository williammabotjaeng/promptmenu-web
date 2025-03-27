import * as React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";
import { SkillTag } from "@/components/portal/onboarding/SkillTag";
import OnboardingHeader from "@/components/portal/onboarding/OnboardingHeader";
import { useRouter } from "next/navigation";
import { OnboardingStepProps } from "@/types/Props/OnboardingStepProps";
import { NicheType, SkillType } from "@/types/Props/SkillTagProps";
import { useState } from "react";
import { useCookies } from "react-cookie";
import useTalentOnboardingStore from "@/state/use-talent-onboarding-store";
import { useStore } from "zustand";
import { truncate } from "node:fs";

const steps = [
  { number: 1, title: "Headshot", isActive: false },
  { number: 2, title: "Skills", isActive: true },
  { number: 3, title: "Payment", isActive: false },
  { number: 4, title: "Attributes", isActive: false },
  { number: 5, title: "Social", isActive: false },
  { number: 6, title: "ID", isActive: false },
  { number: 7, title: "Portfolio", isActive: false },
  { number: 8, title: "Review", isActive: false },
];

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

const niches: NicheType[] = [
  { name: "Beauty/Fashion" },
  { name: "Fitness/Health" },
  { name: "Food/Cooking" },
  { name: "Technology" },
  { name: "Gaming" },
  { name: "Travel" },
  { name: "Lifestyle" },
  { name: "Education/Tutorials" },
  { name: "Business/Entrepreneurship" },
  { name: "Other" },
];

const NicheSelection: React.FC<OnboardingStepProps> = ({
  activeStep,
  setActiveStep,
}) => {
  const { talentData, setTalentData } = useStore(useTalentOnboardingStore);

  const [cookies, setCookie] = useCookies(["niches", "user_role"]);

  const [selectedNiches, setSelectedNiches] = useState<NicheType[]>(
    talentData?.niches || []
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const router = useRouter();

  const userRole = cookies["user_role"];

  const handleContinue = () => {
    setTalentData({
      ...talentData,
      niches: selectedNiches, // Update to use niches instead of skills
    });
  
    if (selectedNiches && selectedNiches.length > 0) {
      setActiveStep(activeStep + 1);
    } else {
      setSnackbarMessage("Please select a niche.");
      setSnackbarOpen(true);
    }
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

  const handleNicheClick = (niche: NicheType) => {
    const isNicheSelected = selectedNiches.some(
      (selectedNiche) => selectedNiche.name === niche.name
    );
  
    if (isNicheSelected) {
      setSelectedNiches(
        selectedNiches.filter(
          (selectedNiche) => selectedNiche.name !== niche.name
        )
      );
    } else {
      setSelectedNiches([...selectedNiches, niche]);
    }
  
    setCookie("niches", JSON.stringify(selectedNiches));
  
    setTalentData({
      ...talentData,
      niches: selectedNiches,
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        overflow: "hidden",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          backgroundColor: "black",
          paddingBottom: "24px",
        }}
      >
        {/* Header Section */}
        <OnboardingHeader
          steps={userRole === "influencer" ? InfluencerSteps : steps}
          onClose={onClose}
        />

        {/* Skills Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingX: { xs: 2, md: 4 },
            paddingTop: 4,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: { xs: "left", md: "center" },
              color: "#ceab76",
              paddingBottom: 1,
              marginRight: { xs: 0, md: 50 },
            }}
          >
            {userRole === "talent"
              ? `Professional Skills`
              : `Any relevant certifications or special skills?`}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              marginTop: 2,
              justifyContent: "center",
            }}
          >
            {niches.map((niche) => (
              <SkillTag
                key={niche.name}
                skill={niche} 
                selectedSkills={selectedNiches} 
                handleSkillClick={handleNicheClick}
              />
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              marginTop: 8,
              width: { xs: "100%", md: "50%" },
              backgroundColor: "black",
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
        </Box>

        {/* Step Indicator Section */}
        <Typography
          variant="caption"
          sx={{
            paddingX: 2,
            paddingY: 1,
            marginTop: 4,
            color: "gray",
            textAlign: "center",
          }}
        >
          Step {activeStep + 1} of 8 - Skills
        </Typography>
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
    </Box>
  );
};

export default NicheSelection;
