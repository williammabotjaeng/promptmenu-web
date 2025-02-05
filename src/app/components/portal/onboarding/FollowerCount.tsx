"use client";

import React, { useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, InputAdornment, Typography } from "@mui/material";
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
      return <FontAwesomeIcon icon={faTiktok} style={{ fontSize: "18px", color: "#977342" }} />;
    case "other":
      return <OtherIcon sx={{ fontSize: "18px", color: "#977342" }} />;
    default:
      return null;
  }
};

const FollowerCount: React.FC<OnboardingStepProps> = ({ activeStep, setActiveStep }) => {

  const [followerCounts, setFollowerCounts] = useState<{ [key: string]: string }>({});
  const { talentData } = useStore(useTalentOnboardingStore);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleFollowerCountChange = (platform: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFollowerCounts({
      ...followerCounts,
      [platform]: event.target.value,
    });
  };

  const filledSocialPlatforms = allSocialPlatforms.filter((platform) => socialData[platform.icon]);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 3, color: "#977342" }}>
        Follower Count
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#977342", fontWeight: "bold" }}>Icon</TableCell>
              <TableCell sx={{ color: "#977342", fontWeight: "bold" }}>Platform</TableCell>
              <TableCell sx={{ color: "#977342", fontWeight: "bold" }}>No. of Followers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filledSocialPlatforms.map((platform) => (
              <TableRow key={platform.icon}>
                <TableCell>{renderIcon(platform.icon)}</TableCell>
                <TableCell sx={{ color: "#CEAB76" }}>{platform.name}</TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    placeholder="No. of Followers"
                    variant="outlined"
                    value={followerCounts[platform.icon] || ""}
                    onChange={handleFollowerCountChange(platform.icon)}
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
    </Box>
  );
};

export default FollowerCount;