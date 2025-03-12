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
import { SocialInput } from "@/components/portal/onboarding/SocialInput";
import OnboardingHeader from "@/components/portal/onboarding/OnboardingHeader";
import { useRouter } from "next/navigation";
import { OnboardingStepProps } from "@/types/Props/OnboardingStepProps";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useTalentProfile } from "@/providers/talent-profile-provider";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Loading from "@/components/Loading";

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
  youtube: string;
  // other?: string[]; 
}

export const SocialMediaLinks: React.FC = () => {
  const router = useRouter();
  
  const [cookies, setCookie] = useCookies(["user_role", "username"]);
  const [socialData, setSocialData] = React.useState<SocialData>({
    instagram: "",
    tiktok: "",
    website: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: ""
    // other: [],
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [additionalInputs, setAdditionalInputs] = useState([]);

  const { fetchTalentProfile, talentProfile, updateTalentProfile } = useTalentProfile();

  const userRole = cookies["user_role"];
  const userName = cookies?.username;

  const onClose = () => {
    router.push("/portal");
  };

  const handleSaveSocialMedia = async () => {
      await updateTalentProfile(userName, {
        ...talentProfile,
        username: userName,
        social_media_links: socialData
      });

      fetchTalentProfile();

      setSnackbarMessage("Social Media Links Updated Successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
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

  useEffect(() => {
    const loadSocialMediaLinks = async () => {
      
      await fetchTalentProfile(); 

      setSocialData({
        instagram: talentProfile?.social_media_links?.instagram || "",
        tiktok: talentProfile?.social_media_links?.tiktok || "",
        website: talentProfile?.social_media_links?.website || "",
        twitter: talentProfile?.social_media_links?.twitter || "",
        facebook: talentProfile?.social_media_links?.facebook || "",
        linkedin: talentProfile?.social_media_links?.linkedin || "",
        youtube: talentProfile?.social_media_links?.youtube || ""
      });
    };

    loadSocialMediaLinks(); 
  }, [talentProfile]); 

  if (loading) return <Loading />;

  return (
    <Box
      sx={{
        display: "flex",
        overflow: "hidden",
        flexDirection: "column",
        backgroundColor: "white",
        paddingX: { xs: 2, md: 4 },
      }}
    >
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
            backgroundColor: "rgba(255, 255, 255, 0.87)",
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
          marginLeft: { md: 32 },
          width: { xs: "100%", md: "40%" },
          alignItems: "center",
        }}
      >
        <Button
          sx={{
            color: "#000",
            backgroundColor: "#CEAB76",
            width: { xs: "100%", md: "100%" },
            "&:hover": {
                color: "white"
            }
          }}
          onClick={handleSaveSocialMedia}
        >
          Save Social Links
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
          severity={snackbarSeverity === "success" ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
