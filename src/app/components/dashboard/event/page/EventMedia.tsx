import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import { EventUploadSection } from "@/components/dashboard/event/page/EventUploadSection";
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import EventIconOne from "@/assets/event_icon_one.svg";
import EventIconTwo from "@/assets/event_icon_two.svg";
import EventIconThree from "@/assets/event_icon_three.svg";
import { EventMediaType } from "@/state/use-event-store";
import { useCookies } from "react-cookie";
import SaveIcon from "@mui/icons-material/Save";
import PhotoGrid from "./PhotoGrid";
import SingleVideo from "./SingleVideo";
import SingleImage from "./SingleImage";
import { useState } from "react";

interface EventMediaProps {
  eventPhotos: string[];
  eventPoster: string;
  eventVideo: string;
  onImageUpload: (newImages: string[]) => void;
  onImageDelete: (image: string) => void;
  onPosterUpload: (newImage: string) => void;
  onPosterDelete: () => void;
  onVideoUpload: (video: string) => void;
  onVideoDelete: () => void;
  onSaveEventMedia: () => void;
}

export const EventMedia: React.FC<EventMediaProps> = ({
  eventPhotos,
  eventPoster,
  eventVideo,
  onImageUpload,
  onImageDelete,
  onPosterUpload,
  onPosterDelete,
  onVideoUpload,
  onVideoDelete,
  onSaveEventMedia,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: "#fff",
        paddingBottom: "40px",
        paddingX: { xs: 2, sm: 4 }, // Responsive horizontal padding
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
          borderRadius: 2,
          width: { xs: "100%", sm: "80%", md: "60%" },
          margin: "0 auto",
        }}
      >
        <Typography>Event Photos</Typography>
        <br />
        <PhotoGrid
          images={eventPhotos}
          onImageUpload={onImageUpload}
          onDeleteImage={onImageDelete}
          imagesToDelete={[]}
        />
        <Typography>Event Poster</Typography>
        <SingleImage
          image={eventPoster}
          onImageUpload={onPosterUpload}
          onDeleteImage={onPosterDelete}
        />
        <br />
        <Typography>Event Video</Typography>
        <SingleVideo
          video={eventVideo}
          onVideoUpload={onVideoUpload}
          onDeleteVideo={onVideoDelete}
        />
        <br />
      </Box>
      {/* Submit Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#977342",
            color: "white",
            "&:hover": {
              backgroundColor: "#fff",
              border: "1px solid #977342",
              color: "#977342",
            },
          }}
          onClick={onSaveEventMedia}
        >
          Save Section
          <SaveIcon sx={{ marginLeft: "8px" }} />
        </Button>
      </Box>
    </Box>
  );
};
