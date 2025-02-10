import React from "react";
import { Box, Typography } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useStore } from "zustand";
import useEventStore from "@/state/use-event-store";

const MediaGrid: React.FC = () => {
  const { eventDetails, eventMedia } = useStore(useEventStore);

  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#977342" }}>
        Uploaded Media
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", 
          gridTemplateRows: "repeat(2, 1fr)", 
          gap: 2, 
          marginTop: 2,
        }}
      >
        {/* Top-left: Event Poster */}
        <Box
          sx={{
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
            height: "100%",
          }}
        >
          <img
            src={eventMedia?.eventPoster as string}
            alt="Event Poster"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Top-middle: Event Promo Video */}
        <Box
          sx={{
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
            height: "100%",
          }}
        >
          {/* Video Background */}
          <video
            src={eventMedia?.eventPromoVideo as string}
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
              fontSize: { xs: "50px", md: "100px" },
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 3,
            }}
          />
        </Box>

        {/* Remaining Squares: Event Photos */}
        {eventMedia?.eventPhotos?.slice(0, 4).map((photo, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              borderRadius: "8px",
              overflow: "hidden",
              height: "100%",
            }}
          >
            <img
              src={photo as string}
              alt={`Event Photo ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MediaGrid;