"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import {
  Box,
} from "@mui/material";
import { PhysicalAttributes } from "@/components/portal/onboarding/PhysicalAttr";
import { IDandCreds } from "@/components/portal/onboarding/IDandCreds";
import { ProfileReview } from "@/components/portal/onboarding/ProfileReview";
import { SocialMediaLinks } from "@/components/portal/onboarding/SocialMediaLinks";
import HeadshotUploader from "@/components/portal/onboarding/HeadshotUploader";
import SkillsSelection from "@/components/portal/onboarding/SkillsSelection";
import { useOnboarding } from "@/providers/onboarding-providers";
import { restCall } from "@/services/restCall";
import axios from "axios";
import { PaymentSection } from "@/components/portal/onboarding/PaymentSection";
import { PortfolioBuilder } from "@/components/portal/onboarding/PortfolioBuilder";
import { useAuth } from "@/providers/auth-providers";
import PersonalInfo from "@/components/portal/onboarding/PersonalInfo";
import FollowerCount from "@/components/portal/onboarding/FollowerCount";
import EngagementRate from "@/components/portal/onboarding/EngagementRate";
import AudienceDemographics from "@/components/portal/onboarding/AudienceDemographics";

const InfluencerOnboarding: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { createTalentProfile } = useOnboarding();
  const [cookies, setCookie] = useCookies([
    "headshotBlobUrl",
    "username",
    "access",
    "governmentIDUrl",
    "portfolioVideo",
    "portfolioImages",
    "portfolioPdf",
    "onboarding_presented",
  ]);

  const { updateUser } = useAuth();

  const accessToken = cookies?.access;

  const onboardingPresented = cookies["onboarding_presented"] || false;






  const fileTypeMapping = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "application/pdf": "pdf",
    "image/gif": "gif",
    "video/mp4": "mp4",
  };

  const getFileExtension = (blob) => {
    return fileTypeMapping[blob.type] || "bin";
  };

  const handleOnboardingStatus = () => {
    updateUser({
      field: "onboarding_presented",
      value: true,
    });
    setCookie("onboarding_presented", true);
  };

  const saveFileMetadata = async (fileName, s3Url) => {
    try {
      const response = await restCall(
        "/portal/save-file-metadata/",
        "POST",
        {
          file_name: fileName,
          s3_url: s3Url,
        },
        accessToken
      );

      if (response.status === 201) {
        console.log("File metadata saved:", response.data);
      } else {
        console.error("Failed to save file metadata:", response);
      }
    } catch (error) {
      console.error("Error saving file metadata:", error);
    }
  };

  const uploadToS3 = async (blob, fileName) => {
    const fileType = blob.type;
    try {
      const response = await restCall(
        `/portal/generate-presigned-url/?file_name=${fileName}&file_type=${fileType}`,
        "GET",
        {},
        accessToken
      );

      const { url } = response;

      if (url) {
        const uploadResponse = await axios.put(url, blob, {
          headers: {
            "Content-Type": fileType,
          },
        });

        if (uploadResponse.status === 200) {
          console.log("Upload successful!");
          const s3Url = url.split("?")[0];
          await saveFileMetadata(fileName, s3Url);
        } else {
          console.error("Upload failed:", uploadResponse.statusText);
        }
      } else {
        console.error("Failed to get presigned URL");
      }
    } catch (error) {
      console.error("Error during upload:", error);
    }
  };

  const uploadFiles = async (blobUrls, filePrefix) => {
    if (!blobUrls || blobUrls.length === 0) {
      console.error(`No ${filePrefix} blob URLs found.`);
      return;
    }

    try {
      for (const blobUrl of blobUrls) {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        const fileExtension = getFileExtension(blob);
        const fileName = `${filePrefix}_${
          cookies["username"]
        }_${Date.now()}.${fileExtension}`;

        console.log("Blob:", blob);
        console.log("Filename:", fileName);

        await uploadToS3(blob, fileName);
      }
    } catch (error) {
      console.error(`Error uploading ${filePrefix}:`, error);
    }
  };


  useEffect(() => {
    if (!onboardingPresented) handleOnboardingStatus();
  }, []);

  return (
    <Box sx={{ width: "100%", backgroundColor: "black", border: "none" }}>
      {activeStep === 0 && (
        <HeadshotUploader
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}

      {activeStep === 1 && (
        <PersonalInfo activeStep={activeStep} setActiveStep={setActiveStep} />
      )}

      {activeStep === 2 && (
        <SkillsSelection
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}

      {activeStep === 3 && (
        <PaymentSection activeStep={activeStep} setActiveStep={setActiveStep} />
      )}

      {activeStep === 4 && (
        <PhysicalAttributes
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}

      {activeStep === 5 && (
        <SocialMediaLinks
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}

      {activeStep === 6 && (
        <FollowerCount activeStep={activeStep} setActiveStep={setActiveStep} />
      )}

      {activeStep === 7 && (
        <EngagementRate activeStep={activeStep} setActiveStep={setActiveStep} />
      )}

      {activeStep === 8 && (
        <AudienceDemographics activeStep={activeStep} setActiveStep={setActiveStep} />
      )}

      {activeStep === 9 && (
        <IDandCreds activeStep={activeStep} setActiveStep={setActiveStep} />
      )}

      {activeStep === 10 && (
        <PortfolioBuilder
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}

      {activeStep === 11 && (
        <ProfileReview activeStep={activeStep} setActiveStep={setActiveStep} />
      )}
    </Box>
  );
};

export default InfluencerOnboarding;
