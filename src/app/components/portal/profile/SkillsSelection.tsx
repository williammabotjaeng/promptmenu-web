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
import { SkillType } from "@/types/Props/SkillTagProps";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import useTalentOnboardingStore from "@/state/use-talent-onboarding-store";
import { useStore } from "zustand";
import { useTalentProfile } from "@/providers/talent-profile-provider";

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

const skills: SkillType[] = [
  { name: "Event Coordination" },
  { name: "Project Management" },
  { name: "Modeling" },
  { name: "Event Executive" },
  { name: "Ushering" },
  { name: "Freelancing" },
  { name: "Photography" },
  { name: "Influencer Marketing" },
  { name: "Sports Modeling" },
  { name: "Security Management" },
  { name: "Hosting" },
  { name: "Videography" },
  { name: "Event Management" },
  { name: "Event Organization" },
  { name: "Site Management" },
  { name: "Journalism" },
];

const SkillsSelection: React.FC = () => {
  const [cookies, setCookie] = useCookies(["user_role", "username"]);

  const [selectedSkills, setSelectedSkills] = useState<SkillType[]>([]);

  const [skillsToDelete, setSkillsToDelete] = useState<SkillType[]>([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const router = useRouter();

  const userRole = cookies["user_role"];

  const userName = cookies?.username;

  const { talentProfile, fetchTalentProfile, updateTalentProfile } =
    useTalentProfile();

  const onClose = () => {
    router.push("/portal");
  };

  const handleSkillClick = (skill: SkillType) => {
    const isSkillSelected = selectedSkills.some(
      (selectedSkill) => selectedSkill.name === skill.name
    );

    if (isSkillSelected) {
      setSelectedSkills(
        selectedSkills.filter(
          (selectedSkill) => selectedSkill.name !== skill.name
        )
      );
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSaveSkills = async () => {
    updateTalentProfile(userName, {
      ...talentProfile,
      username: userName,
      skills: selectedSkills,
    });
    await fetchTalentProfile();
    setSnackbarMessage("Skills Updated Successfully");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  useEffect(() => {
    const loadSkills = async () => {
      await fetchTalentProfile();
      if (talentProfile?.skills) {
        setSelectedSkills(talentProfile?.skills);
      }
    };

    loadSkills();
  }, [talentProfile]);

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
          backgroundColor: "white",
          paddingBottom: "24px",
        }}
      >
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
            {skills?.map((skill) => (
              <SkillTag
                key={skill?.name}
                skill={skill}
                selectedSkills={selectedSkills}
                handleSkillClick={handleSkillClick}
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
              backgroundColor: "white",
            }}
          >
            <Button
              sx={{
                color: "#000",
                backgroundColor: "#CEAB76",
                "&:hover": {
                  color: "white",
                },
              }}
              onClick={handleSaveSkills}
            >
              Save Skills
            </Button>
          </Box>
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
          severity={snackbarSeverity === "success" ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SkillsSelection;
