"use client";

import * as React from "react";
import { TextField, InputAdornment } from "@mui/material";
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
  Language as OtherIcon
} from "@mui/icons-material";

import { SocialInputProps } from "@/types/Props/SocialInputProps";

export const SocialInput: React.FC<SocialInputProps> = ({
  icon,
  placeholder,
  alt,
  value,
  onChange,
}) => {
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
      case "website":
        return <WebIcon sx={{ fontSize: "18px", color: "#977342" }} />;
      case 'tiktok':
        return <FontAwesomeIcon icon={faTiktok} style={{ fontSize: "18px", color: "#977342" }} />;
      case "other":
        return <OtherIcon sx={{ fontSize: "18px", color: "#977342" }} />;
      default:
        return null;
    }
  };

  return (
    <TextField
      fullWidth
      placeholder={placeholder}
      aria-label={placeholder}
      variant="outlined"
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{renderIcon(icon)}</InputAdornment>
        ),
      }}
      sx={{
        bgcolor: "black",
        borderRadius: "8px",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#977342",
            color: "#CEAB76",
          },
          "&:hover fieldset": {
            borderColor: "#977342",
            color: "#CEAB76",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#977342",
            color: "#CEAB76",
          },
        },
        "& .MuiInputBase-input": {
          color: "#CEAB76",
        },
      }}
    />
  );
};
