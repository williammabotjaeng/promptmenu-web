"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useStore } from "zustand";
import useEventStore from "@/state/use-event-store";

const PhotoGrid: React.FC = () => {
  const { eventMedia } = useStore(useEventStore);

  const [poster, setPoster] = React.useState<string | null>(null);
  const [photos, setPhotos] = React.useState<string[]>([]);
  const [video, setVideo] = React.useState<string | null>(null);

  // Initialize media from eventMedia store
  React.useEffect(() => {
    console.log("Event Media:", {...eventMedia});
    if (eventMedia.eventPoster) {
      setPoster(URL.createObjectURL(eventMedia.eventPoster as File));
    }
    if (eventMedia.eventPhotos) {
      const photoUrls = (eventMedia.eventPhotos as File[]).map((file) =>
        URL.createObjectURL(file)
      );
      setPhotos(photoUrls);
    }
    if (eventMedia.eventPromoVideo) {
      setVideo(URL.createObjectURL(eventMedia.eventPromoVideo as File));
    }
  }, [eventMedia]);

  return (
    <Box>
      {/* Event Poster */}
      {poster && (
        <Box
          component="img"
          src={poster}
          alt="Event Poster"
          sx={{
            width: "100%",
            height: "auto",
            borderRadius: "4px",
            objectFit: "cover",
            marginBottom: 2,
          }}
        />
      )}

      {/* Event Photos */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
          gap: 1,
          border: "1px dotted #977342",
          padding: 1,
          marginBottom: 2,
        }}
      >
        {photos.map((photo, index) => (
          <Box
            key={index}
            component="img"
            src={photo}
            alt={`Event Photo ${index + 1}`}
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: "4px",
              objectFit: "cover",
            }}
          />
        ))}
      </Box>

      {/* Event Video */}
      {video && (
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
              src={video}
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
    </Box>
  );
};

export default PhotoGrid;