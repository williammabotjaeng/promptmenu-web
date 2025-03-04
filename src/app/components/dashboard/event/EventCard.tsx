import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CardMedia,
  Box,
} from "@mui/material";

const EventCard = ({ event }) => {
  // Function to create a 30-character excerpt of the description
  const getExcerpt = (text, length = 300) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <Card
      sx={{
        display: "flex", // Horizontal layout
        width: "100%", // Full width
        margin: "16px 0",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        overflow: "hidden", // Prevent content overflow
      }}
    >
      {/* Event Poster */}
      {event?.event_poster && (
        <CardMedia
          component="img"
          sx={{ width: "200px", height: "auto" }} // Fixed width for the poster
          image={event.event_poster}
          alt={event.title}
        />
      )}

      {/* Event Details */}
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            {event?.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: "8px", textWrap: 'wrap' }}
          >
            {getExcerpt(event?.description)}
          </Typography>
        </CardContent>

        {/* Bottom Section: Start Time, Location, and Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between", // Push content to the edges
            alignItems: "center",
            padding: "16px",
          }}
        >
          {/* Start Time and Location */}
          <Box>
            <Typography variant="body2" color="text.secondary">
              <strong>Location:</strong> {event.location.city || "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Start Time:</strong> {event.start_time}
            </Typography>
          </Box>

          {/* Learn More Button */}
          <Button size="small" color="primary" variant="contained">
            Learn More
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default EventCard;