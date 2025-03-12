import * as React from "react";
import { Box, Typography, Paper, Button, Snackbar, Alert } from "@mui/material";
import { AttributeInput } from "@/components/portal/onboarding/AttributeInput";
import { DropdownAttribute } from "@/components/portal/onboarding/DropdownAttribute";
import OnboardingHeader from "@/components/portal/onboarding/OnboardingHeader";
import { useRouter } from "next/navigation";
import { OnboardingStepProps } from "@/types/Props/OnboardingStepProps";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useTalentProfile } from "@/providers/talent-profile-provider";
import {
  hairColorItems,
  eyeColorItems,
} from "@/types/Props/DropdownAttributeProps";


export const PhysicalAttributes: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    hairColor: "",
    eyeColor: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [cookies] = useCookies(["user_role", "username"]);

  const userRole = cookies["user_role"];
  const userName = cookies?.username;

  const onClose = () => {
    router.push("/portal");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const { talentProfile, fetchTalentProfile, updateTalentProfile } = useTalentProfile();

  const handleSavePhysicalAttributes = async () => {
     await updateTalentProfile(userName, {
        ...talentProfile,
        username: userName,
        height: formData?.height,
        weight: formData?.weight,
        eye_color: formData?.eyeColor,
        hair_color: formData?.hairColor
     });

     fetchTalentProfile();

     setSnackbarMessage("Physical Attributes Updated Successfully");
     setSnackbarSeverity("success");
     setSnackbarOpen(true);
  };

  const handleHeightChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;

    setFormData((prevData) => ({
      ...prevData,
      height: value,
    }));
  };

  const handleWeightChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;

    setFormData((prevData) => ({
      ...prevData,
      weight: value,
    }));
  };

  const handleEyeColorChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = event.target.value as string;

    setFormData((prevData) => ({
      ...prevData,
      eyeColor: value,
    }));
  };

  const handleHairColorChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = event.target.value as string;

    console.log(`Hair Color Selected: ${value}`);

    setFormData((prevData) => ({
      ...prevData,
      hairColor: value,
    }));
  };

  useEffect(() => {
    const loadPhysicalAttributes = async () => {

      await fetchTalentProfile(); 

      setFormData({
        height: talentProfile?.height || 0,
        weight: talentProfile?.weight || 0,
        eyeColor: talentProfile?.eye_color || 0,
        hairColor: talentProfile?.hair_color || 0,
      });
    };

    loadPhysicalAttributes(); 
  }, [talentProfile]); 

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        flexGrow: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          backgroundColor: "white",
          paddingBottom: "2px",
        }}
      >
        {/* Physical Attributes Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingX: { xs: 2, md: 4 },
            mt: 4
          }}
        >
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 4,
              borderRadius: "8px",
              backgroundColor: "rgba(75, 85, 99, 0.1)",
              width: "100%",
              maxWidth: "768px",
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: "#977342", paddingBottom: 2, textAlign: "center" }}
            >
              Physical Attributes
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: 1,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <AttributeInput
                  value={Number(formData.height)}
                  onChange={handleHeightChange}
                  label="Height"
                  placeholder="cm"
                />
                <AttributeInput
                  value={Number(formData.weight)}
                  onChange={handleWeightChange}
                  label="Weight"
                  placeholder="kg"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  flexWrap: "wrap",
                  gap: 2,
                  marginTop: 4,
                  color: "#977342",
                }}
              >
                <DropdownAttribute
                  onChange={handleEyeColorChange}
                  items={eyeColorItems}
                  label="Eye Color"
                  value={formData?.eyeColor}
                />
                <DropdownAttribute
                  onChange={handleHairColorChange}
                  items={hairColorItems}
                  label="Hair Color"
                  value={formData?.hairColor}
                />
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Navigation Buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            paddingX: 2,
            marginLeft: { md: 36 },
            marginTop: 4,
            width: { xs: "100%", md: "58%" },
          }}
        >
          <Button
            sx={{ color: "#000", backgroundColor: "#CEAB76", "&:hover": {
                color: "#fff"
            } }}
            onClick={handleSavePhysicalAttributes}
          >
            Save Physical Attributes
          </Button>
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
