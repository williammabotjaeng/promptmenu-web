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
  alertTitleClasses,
} from "@mui/material";
import { PortfolioUploadSection } from "@/components/portal/profile/PortfolioUploadSection";
import OnboardingHeader from "@/components/portal/onboarding/OnboardingHeader";
import { useRouter } from "next/navigation";
import { OnboardingStepProps } from "@/types/Props/OnboardingStepProps";
import PhotoGrid from "@/components/portal/profile/PhotoGrid";
import useTalentOnboardingStore from "@/state/use-talent-onboarding-store";
import { useStore } from "zustand";
import { useEffect, useState } from "react";
import { useTalentProfile } from "@/providers/talent-profile-provider";
import { useCookies } from "react-cookie";
import { uploadFileToS3 } from "@/services/s3UploadUtils";

export const PortfolioBuilder: React.FC = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [images, setImages] = useState<string[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [imagesToBeAdded, setImagesToBeAdded] = useState<string[]>([]);
  const [portfolioVideo, setPortfolioVideo] = useState<string>("");

  const [portfolioPDF, setPortfolioPDF] = useState<string>("");
  const [cookies, setCookie] = useCookies(["username", "access"]);

  const userName = cookies?.username || "";
  const accessToken = cookies?.access || "";

  const {
    fetchTalentProfile,
    signedUrls,
    deleteFiles,
    updateTalentProfile,
    talentProfile,
  } = useTalentProfile();

  const extractFilePaths = (signedUrls: string[]) => {
    return signedUrls.map((url) => {
      const parsedUrl = new URL(url);
      return parsedUrl.pathname.substring(1);
    });
  };

  const handleImageUpload = (newImages: string[]) => {
    console.log("Image upload:", newImages);
    setImagesToBeAdded((prev) => [...prev, ...newImages]);
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleDeleteImage = (image: string) => {
    setImages((prevImages) => prevImages.filter((img) => img !== image));
    setImagesToDelete((prevImagesToDelete) => [...prevImagesToDelete, image]);
  };

  const router = useRouter();

  const onClose = () => {
    router.push("/portal");
  };

  const handleSavePortfolio = async () => {
    const filePathsToDelete = extractFilePaths(imagesToDelete);

    const additionalImagesNames = await Promise.all(
      (imagesToBeAdded || []).map((image, index) =>
        uploadFileToS3(
          image,
          `additional_image_${index}`,
          userName,
          accessToken
        )
      )
    );

    const updatedProfile = {
      ...talentProfile,
      username: userName,
      additional_images: [
        ...talentProfile.additional_images.filter(
          (image) => !filePathsToDelete.includes(image)
        ),
        ...additionalImagesNames,
      ],
    };

    console.log("Updated Profile:", updatedProfile);

    await updateTalentProfile(userName, updatedProfile);
    
    if (filePathsToDelete?.length > 0)
      await deleteFiles(filePathsToDelete);

    alert("Files Deleted and Profile Updated");
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newFileData = {
        type: file.type,
        file: URL.createObjectURL(file), 
        fileName: file.name,
      };
      setPortfolioVideo(newFileData?.file); 
    }
  };
  
  const handlePDFUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newFileData = {
        type: file.type,
        file: URL.createObjectURL(file), 
        fileName: file.name,
      };
      setPortfolioPDF(newFileData?.file); 
    }
  };

  const handleFileDeleteVideo = () => {
      setPortfolioVideo(null);
  };

  const handleFileDeletePDF = () => {
      setPortfolioPDF(null);
  };

  useEffect(() => {
    const loadTalentProfile = async () => {
      await fetchTalentProfile();
      if (signedUrls?.additional_images) {
        setImages([...signedUrls?.additional_images]);
      }

      if (signedUrls?.portfolio_pdf) {
        setPortfolioPDF(signedUrls?.portfolio_pdf);
      }

      if (signedUrls?.portfolio_video) {
        setPortfolioVideo(signedUrls?.portfolio_video);
      }
    };

    loadTalentProfile();
  }, [signedUrls]);

  useEffect(() => {
    console.log("To Delete:", imagesToDelete);
  }, [imagesToDelete]);

  useEffect(() => {
    console.log("To Add:", imagesToBeAdded);
  }, [imagesToBeAdded]);

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

            <PhotoGrid
              images={images}
              onImageUpload={handleImageUpload}
              onDeleteImage={handleDeleteImage}
              imagesToDelete={imagesToDelete}
            />

            <PortfolioUploadSection
              title="Videos"
              description="Upload your showreel or video portfolio"
              buttonText="Upload Video"
              handleFileDelete={handleFileDeleteVideo}
              handleFileUpload={handleVideoUpload}
              portfolioFile={portfolioVideo}
            />

            <PortfolioUploadSection
              title="Resume/CV"
              description="Upload your CV in PDF format"
              buttonText="Upload PDF"
              handleFileDelete={handleFileDeletePDF}
              handleFileUpload={handlePDFUpload}
              portfolioFile={portfolioPDF}
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
            sx={{
              color: "#000",
              backgroundColor: "#CEAB76",
              "&:hover": {
                color: "#fff",
              },
            }}
            onClick={handleSavePortfolio}
          >
            Save Portfolio
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
