"use client";

import * as React from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { PortfolioUploadSection } from "@/components/portal/onboarding/PortfolioUploadSection";
import OnboardingHeader from "@/components/portal/onboarding/OnboardingHeader";
import { useRouter } from "next/navigation";
import { OnboardingStepProps } from "@/types/Props/OnboardingStepProps";
import PhotoGrid from "@/components/portal/profile/PhotoGrid";
import useTalentOnboardingStore from "@/state/use-talent-onboarding-store";
import { useStore } from "zustand";
import { useEffect, useState } from "react";
import { useTalentProfile } from "@/providers/talent-profile-provider";

export const PortfolioBuilder: React.FC = () => {
  const { talentData, setTalentData } = useStore(useTalentOnboardingStore);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [images, setImages] = useState<string[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const imagesToBeAdded = []; 

  const { fetchTalentProfile, signedUrls } = useTalentProfile();

  const handleImageUpload = (newImages: string[]) => {
    setImages(prevImages => [...prevImages, ...newImages]);
    setTalentData({
      ...talentData,
      additional_images: [...imagesToBeAdded, ...newImages]
    });
  };

  const handleDeleteImage = (image: string) => {
    setImages(prevImages => prevImages.filter(img => img !== image));
    setImagesToDelete(prevImagesToDelete => [...prevImagesToDelete, image]);
  };

  const router = useRouter();

  const onClose = () => {
    router.push("/portal");
  };

  const handleContinue = () => {
    
  };

  useEffect(() => {
    const loadTalentProfile = async () => {
      await fetchTalentProfile();
      if (signedUrls?.additional_images) {
        setImages([...signedUrls?.additional_images]);
      }
    };
  
    loadTalentProfile();
  }, [fetchTalentProfile, signedUrls]);

  return (
    <Container maxWidth="lg" sx={{ backgroundColor: "white" }}>
      <Box sx={{ paddingBottom: "96px", backgroundColor: "transparent" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "16px",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              backgroundColor: "transparent",
              width: "100%",
              maxWidth: "768px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#977342",
                marginBottom: 2,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Portfolio
            </Typography>

            <Typography variant="h6" sx={{ color: "#977342", marginBottom: 1 }}>
              Images
            </Typography>

            <PhotoGrid images={images} onImageUpload={handleImageUpload} onDeleteImage={handleDeleteImage} imagesToDelete={imagesToDelete} />

            <PortfolioUploadSection
              title="Videos"
              description="Upload your showreel or video portfolio"
              buttonText="Upload Video"
            />

            <PortfolioUploadSection
              title="Resume/CV"
              description="Upload your CV in PDF format"
              buttonText="Upload PDF"
            />
          </Paper>
        </Box>

        {/* Navigation Buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            paddingX: 2,
            marginTop: 4,
            width: { xs: "100%", md: "66%" },
            marginLeft: { xs: 0, md: 24 },
          }}
        >
          <Button
            sx={{ color: "#000", backgroundColor: "#CEAB76", "&:hover": {
                color: "#fff"
            } }}
            onClick={handleContinue}
          >
            Save Portfolio
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
