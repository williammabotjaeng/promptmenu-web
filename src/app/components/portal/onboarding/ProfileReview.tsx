"use client";

import * as React from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Button,
  backdropClasses,
} from "@mui/material";
import { StepItem } from "@/components/portal/onboarding/StepItem";
import { DocumentItem } from "@/components/portal/onboarding/DocumentItem";
import { SocialMediaLink } from "@/components/portal/onboarding/SocialMediaLink";
import { AttributeCard } from "@/components/portal/onboarding/AttributeCard";
import { SkillBadge } from "@/components/portal/onboarding/SkillBadge";
import OnboardingHeader from "@/components/portal/onboarding/OnboardingHeader";
import { useRouter } from "next/navigation";
import { OnboardingStepProps } from "@/types/Props/OnboardingStepProps";
import Image from "next/image";
import Headshot from "@/assets/headshot.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import RevImageOne from "@/assets/review_image_one.png";
import RevImageTwo from "@/assets/review_image_two.png";
import RevImageThree from "@/assets/review_image_three.png";
import { useStore } from "zustand";
import useTalentOnboardingStore from "@/state/use-talent-onboarding-store";
import { useEffect, useState } from "react";
import { skillsRequiringPhysicalAttributes } from "./PaymentSection";
import moment from "moment";
import { useCookies } from "react-cookie";
import { uploadFileToS3 } from "@/services/s3UploadUtils";
import { useOnboarding } from "@/providers/onboarding-providers";
import { redirect } from "next/navigation";
import AudienceDemographics from "./AudienceDemographics";
import Creating from "@/components/Creating";
import PublicIcon from '@mui/icons-material/Public';
import FlagIcon from '@mui/icons-material/Flag';

const steps = [
  { number: 1, title: "Headshot", isActive: false },
  { number: 2, title: "Skills", isActive: false },
  { number: 3, title: "Payment", isActive: false },
  { number: 4, title: "Attributes", isActive: false },
  { number: 5, title: "Ethnicity", isActive: false },
  { number: 6, title: "Social", isActive: false },
  { number: 7, title: "ID", isActive: false },
  { number: 8, title: "Portfolio", isActive: false },
  { number: 9, title: "Review", isActive: true },
];

export const ProfileReview: React.FC<OnboardingStepProps> = ({
  activeStep,
  setActiveStep,
}) => {
  const { talentData, paymentMethods, physicalAttributes } = useStore(
    useTalentOnboardingStore
  );

  const { createTalentProfile } = useOnboarding();

  const [loading, setLoading] = useState(false);

  const [cookies, setCookie] = useCookies([
    "username", "access", 
    "has_profile", "ethnicity", 
    "nationality", "user_role"
  ]);

  const userName = cookies["username"];
  const accessToken = cookies["access"];
  const ethnicity = cookies["ethnicity"] || talentData?.ethnicity || "";
  const nationality = cookies["nationality"] || talentData?.nationality || "";
  const userRole = cookies?.user_role || "";

  const router = useRouter();

  const onClose = () => {
    router.push("/portal");
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const hasPhysicalAttributeSkill = talentData.skills.some((skill) =>
    skillsRequiringPhysicalAttributes.includes(skill.name)
  );

  const handleSkip = () => {
    router.push("/portal");
  };

  const submitProfile = async (e) => {
    e.preventDefault();

    setLoading(true);
  
    try {
      // Upload headshot
      const headshotFileName = await uploadFileToS3(
        talentData?.headshot,
        "headshot",
        userName,
        accessToken
      );
  
      // Upload government ID front
      const frontIDFileName = await uploadFileToS3(
        talentData?.government_id_front,
        "front_id",
        userName,
        accessToken
      );
  
      // Upload government ID back
      const backIDFileName = await uploadFileToS3(
        talentData?.government_id_back,
        "back_id",
        userName,
        accessToken
      );
  
      // Upload portfolio PDF and assign file name to fileName property
      if (talentData?.portfolio_pdf?.file) {
        const portfolioPDFFileName = await uploadFileToS3(
          talentData.portfolio_pdf.file,
          "portfolio_pdf",
          userName,
          accessToken
        );
        talentData.portfolio_pdf.fileName = portfolioPDFFileName; // Assign file name
      }

      
  
      // Upload portfolio video and assign file name to fileName property
      if (talentData?.portfolio_video?.file) {
        const portfolioVideoFileName = await uploadFileToS3(
          talentData.portfolio_video.file,
          "portfolio_video",
          userName,
          accessToken
        );
        talentData.portfolio_video.fileName = portfolioVideoFileName; // Assign file name
      }
  
      // Upload additional images
      const additionalImagesNames = await Promise.all(
        (talentData?.additional_images || []).map((image, index) =>
          uploadFileToS3(image, `additional_image_${index}`, userName, accessToken)
        )
      );
  
      // Create user talent data object
      const userTalentData = {
        ...talentData,
        username: userName,
        headshot: headshotFileName,
        government_id_front: frontIDFileName,
        government_id_back: backIDFileName,
        additional_images: additionalImagesNames,
        portfolio_pdf: talentData?.portfolio_pdf?.fileName,
        portfolio_video: talentData?.portfolio_video?.fileName,
        date_of_birth: talentData?.date_of_birth,
        gender: talentData?.gender,
        payment_methods: paymentMethods,
        social_media_links: talentData?.social_media_links,
        followerCounts: talentData?.followerCounts,
        engagementRates: talentData?.engagementRates,
        audienceDemographics: talentData?.audienceDemographics,
        eye_color: physicalAttributes?.eyeColor,
        hair_color: physicalAttributes?.hairColor,
        weight: physicalAttributes?.weight,
        height: physicalAttributes?.height,
        ethnicity: ethnicity,
        nationality: nationality
      };
  
      console.log("User Talent Data:", userTalentData);
  
      // Submit the talent profile
      await createTalentProfile(userTalentData);
      setLoading(false);
      setCookie("has_profile", true);
      // Redirect to success page
      console.log("Has Profile", cookies?.has_profile);
      redirect("/talent-success");
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  if (loading) return <Creating />;

  return (
    <Box
      sx={{
        backgroundColor: "black",
        justifyContent: "center",
        overflow: "hidden",
        alignItems: "center",
        color: "#CEAB76",
        width: "100%",
        paddingX: { xs: 2, md: 4 },
        boxSizing: "border-box",
      }}
    >
      {/* Header Section */}
      <OnboardingHeader steps={steps} onClose={onClose} />
      <Typography
        sx={{
          fontSize: "30px",
          color: "#977342",
          fontWeight: "bold",
          textAlign: "center",
          width: "100%",
        }}
      >
        Review Your Profile
      </Typography>

      <Box sx={{ padding: { xs: 1, md: 4 } }}>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "semi-bold",
            mb: 1,
            textAlign: { xs: "center" },
          }}
        >
          Headshot
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "center" },
            justifyContent: { xs: "center" },
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Image
            src={talentData?.headshot || ""}
            width={200}
            height={210}
            alt="headshot-example"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: { xs: 1, md: 4 },
            }}
          >
            <Typography sx={{ fontSize: "16px", color: "#4B5563" }}>
              Primary Headshot
            </Typography>
          </Box>
        </Box>
      </Box>

      {userRole === "influencer" && (<Box sx={{
            display: 'flex',
            flexDirection: 'column'
      }}>
          <Typography variant="h5">
              {`Legal Full Name: ${talentData?.legalFullName}`}
          </Typography>
          <br />
          <Typography variant="h6">
              {`Stage Name: ${talentData?.stageName}`}
          </Typography>
          <br />
          <Typography variant="h6">
              {`Date of Birth: ${talentData?.date_of_birth}`}
          </Typography>
      </Box>)}

      <Box sx={{ padding: 4 }}>
        <Typography
          variant="h6"
          sx={{
            marginBottom: 2,
            fontSize: { xs: "18px", md: "20px" },
            fontWeight: "semi-bold",
          }}
        >
          Skills
        </Typography>
        <Box
          sx={{ display: "flex", gap: 1, flexWrap: "wrap", marginBottom: 2 }}
        >
          {talentData?.skills.map((skill) => (
            <SkillBadge key={skill?.name} name={skill?.name} />
          ))}
        </Box>

        {/* Ethnicity & Nationality Section */}
        <Typography
          variant="h6"
          sx={{
            marginBottom: 2,
            fontSize: { xs: "18px", md: "20px" },
            fontWeight: "semi-bold",
          }}
        >
          Ethnicity & Nationality
        </Typography>
        <Box
          sx={{ 
            display: "flex", 
            gap: 2, 
            flexWrap: { xs: "wrap", md: "nowrap" },
            marginBottom: 3,
          }}
        >
          <Box
            sx={{
              bgcolor: "white",
              padding: { xs: 2, md: 3 },
              borderRadius: "4px",
              boxShadow: 1,
              flex: 1,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              mb: 1,
              color: "#977342"
            }}>
              <PublicIcon sx={{ mr: 1 }} />
              <Typography
                sx={{ fontWeight: "600", color: "#6B7280", fontSize: { xs: "16px", md: "18px" } }}
              >
                Ethnicity
              </Typography>
            </Box>
            <Typography
              sx={{ color: "#333", fontSize: { xs: "16px", md: "18px" }, fontWeight: "500" }}
            >
              {ethnicity || "Not specified"}
            </Typography>
          </Box>
          
          <Box
            sx={{
              bgcolor: "white",
              padding: { xs: 2, md: 3 },
              borderRadius: "4px",
              boxShadow: 1,
              flex: 1,
              display: "flex",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              mb: 1,
              color: "#977342"
            }}>
              <FlagIcon sx={{ mr: 1 }} />
              <Typography
                sx={{ fontWeight: "600", color: "#6B7280", fontSize: { xs: "16px", md: "18px" } }}
              >
                Nationality
              </Typography>
            </Box>
            <Typography
              sx={{ color: "#333", fontSize: { xs: "16px", md: "18px" }, fontWeight: "500" }}
            >
              {nationality || "Not specified"}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="h6"
          sx={{
            marginBottom: 2,
            fontSize: { xs: "18px", md: "20px" },
            color: "#977342",
            fontWeight: "semi-bold",
          }}
        >
          Payment Details
        </Typography>
        {paymentMethods?.ccNumber && (
          <Box
            sx={{
              bgcolor: "white",
              padding: { xs: 2, md: 3 },
              borderRadius: "4px",
              marginBottom: 2,
              boxShadow: 1,
            }}
          >
            <Typography
              sx={{ color: "#6B7280", fontSize: { xs: "14px", md: "16px" } }}
            >
              Credit Card: **** **** **** {paymentMethods?.ccNumber?.slice(-4)}
            </Typography>
            <Typography
              sx={{ color: "#6B7280", fontSize: { xs: "14px", md: "16px" } }}
            >
              Expires: {paymentMethods?.ccExpiry}
            </Typography>
          </Box>
        )}

        {paymentMethods?.paypalEmail && (
          <Box
            sx={{
              bgcolor: "white",
              padding: { xs: 2, md: 3 },
              borderRadius: "4px",
              marginBottom: 2,
              boxShadow: 1,
            }}
          >
            <Typography
              sx={{ color: "#6B7280", fontSize: { xs: "14px", md: "16px" } }}
            >
              Paypal Email:
            </Typography>
            <Typography
              sx={{ color: "#6B7280", fontSize: { xs: "14px", md: "16px" } }}
            >
              Expires: {paymentMethods?.paypalEmail}
            </Typography>
          </Box>
        )}

        {paymentMethods?.accountNumber && (
          <Box
            sx={{
              bgcolor: "white",
              padding: { xs: 2, md: 3 },
              borderRadius: "4px",
              marginBottom: 2,
              boxShadow: 1,
            }}
          >
            <Typography
              sx={{ color: "#6B7280", fontSize: { xs: "14px", md: "16px" } }}
            >
              Banking Details:{" "}
            </Typography>
            <Typography
              sx={{ color: "#6B7280", fontSize: { xs: "14px", md: "16px" } }}
            >
              Account No.: {paymentMethods?.accountNumber}
            </Typography>
            <Typography
              sx={{ color: "#6B7280", fontSize: { xs: "14px", md: "16px" } }}
            >
              Bank Name: {paymentMethods?.bankName}
            </Typography>
          </Box>
        )}

        {hasPhysicalAttributeSkill && (
          <>
            <Typography
              variant="h6"
              sx={{
                marginBottom: 2,
                fontSize: { xs: "18px", md: "20px" },
                fontWeight: "semi-bold",
              }}
            >
              Attributes
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                marginBottom: 2,
                width: { xs: "100%" },
              }}
            >
              <AttributeCard
                key={"Height"}
                label={"Height"}
                value={String(physicalAttributes?.height)}
              />
              <AttributeCard
                key={"Weight"}
                label={"Weight"}
                value={String(physicalAttributes?.weight)}
              />
              <AttributeCard
                key={"Eye Color"}
                label={"Eye Color"}
                value={physicalAttributes?.eyeColor}
              />
              <AttributeCard
                key={"Hair Color"}
                label={"Hair Color"}
                value={physicalAttributes?.hairColor}
              />
            </Box>
          </>
        )}

        {talentData?.government_id_front && (
          <>
            <Typography
              variant="h6"
              sx={{
                marginBottom: 2,
                fontSize: "20px",
                fontWeight: "semi-bold",
              }}
            >
              ID Document
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: "column",
                marginBottom: 2,
              }}
            >
              {talentData?.government_id_front && (
                <DocumentItem
                  title={"ID Document Front"}
                  date={moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a")}
                />
              )}
              {talentData?.government_id_back && (
                <DocumentItem
                  title={"ID Document Back"}
                  date={moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a")}
                />
              )}
            </Box>
          </>
        )}

        {(cookies["tiktok"] || cookies["instagram"] || cookies["website"]) && (
          <>
            <Typography
              variant="h6"
              sx={{
                marginBottom: 2,
                fontSize: "20px",
                fontWeight: "semi-bold",
                textAlign: { xs: "center" },
              }}
            >
              Social Media Links
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: "column",
                marginBottom: 2,
              }}
            >
              {cookies["instagram"] && (
                <SocialMediaLink
                  icon={"instagram"}
                  username={cookies["instagram"]}
                />
              )}
              {cookies["tiktok"] && (
                <SocialMediaLink icon={"tiktok"} username={cookies["tiktok"]} />
              )}
              {cookies["website"] && (
                <SocialMediaLink
                  icon={"website"}
                  username={cookies["website"]}
                />
              )}
            </Box>
          </>
        )}

        {talentData?.additional_images && (
          <>
            <Typography
              variant="h6"
              sx={{
                marginBottom: 2,
                fontSize: "20px",
                fontWeight: "semi-bold",
                textAlign: { xs: "center" },
              }}
            >
              Photos
            </Typography>
            <Box
              sx={{
                display: { xs: "flex", md: "flex" },
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
                marginBottom: 2,
                justifyContent: { xs: "center" },
                alignItems: { xs: "center" },
              }}
            >
              <Image
                src={talentData?.additional_images[0]}
                width={250}
                height={250}
                alt="Photo 1"
              />
              <Image
                src={talentData?.additional_images[1]}
                width={250}
                height={250}
                alt="Photo 2"
              />
              <Image
                src={talentData?.additional_images[2]}
                width={250}
                height={250}
                alt="Photo 3"
              />
            </Box>
          </>
        )}

        {talentData?.portfolio_video?.file && (
          <>
            <Typography
              variant="h6"
              sx={{
                marginBottom: 2,
                fontSize: "20px",
                fontWeight: "semi-bold",
                textAlign: { xs: "center" },
              }}
            >
              Video Showreel
            </Typography>
            <Box
              sx={{
                position: "relative",
                borderRadius: "4px",
                height: { xs: "200px", md: "400px" },
                marginBottom: 2,
                overflow: "hidden",
              }}
            >
              {/* Video Background */}
              <video
                src={String(talentData?.portfolio_video?.file)}
                autoPlay
                loop
                muted
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1,
                }}
              ></video>

              {/* Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  zIndex: 2,
                }}
              ></Box>

              {/* Play Icon */}
              <PlayCircleOutlineIcon
                sx={{
                  color: "#977342",
                  fontSize: { xs: "150px", md: "50px" },
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 3,
                }}
              />
            </Box>
          </>
        )}

        {talentData?.portfolio_pdf && (
          <>
            <Typography
              variant="h6"
              sx={{
                marginBottom: 2,
                fontSize: "20px",
                fontWeight: "semi-bold",
              }}
            >
              Documents
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: "column",
                marginBottom: 2,
              }}
            >
              {talentData?.portfolio_pdf && (
                <DocumentItem
                  title={talentData?.portfolio_pdf?.fileName}
                  date={moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a")}
                />
              )}
            </Box>
          </>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          marginTop: { md: 4 },
          width: "95%",
          ml: { md: 4 },
        }}
      >
        <Button
          sx={{
            color: "#977342",
            border: "1px solid #977342",
            backgroundColor: "#000",
            mt: { xs: 2 },
            "&:hover": { color: "white" },
          }}
          onClick={handleBack}
        >
          Go Back
        </Button>
        <Button
          sx={{
            color: "#fff",
            backgroundColor: "#977342",
            mt: { xs: 1 },
            mb: { xs: 2 },
          }}
          onClick={submitProfile}
        >
          Submit for Review
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
          Discard
        </Button>
      </Box>
    </Box>
  );
};