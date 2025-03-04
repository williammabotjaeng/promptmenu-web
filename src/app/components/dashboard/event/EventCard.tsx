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
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import moment from "moment";
import { ConstructionOutlined } from "@mui/icons-material";

const EventCard = ({ event }) => {
  // Function to create a 30-character excerpt of the description
  const getExcerpt = (text, length = 300) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const [cookies, setCookie] = useCookies([
    'user_role',
    'current_event'
  ]);

  const userRole = cookies?.user_role;

  const router = useRouter();

  const formatDateTime = (dateTimeString) => {
    return moment(dateTimeString).format('MMMM D, YYYY [at] h:mm A');
  };

  const handleButton = (eventId: string) => {
    if (userRole === 'client')
    {
      console.log("Event Id:", eventId);
      setCookie('current_event', JSON.stringify(event));
      router.push(`/event/${eventId}`);
    } else {
      // TODO: Handle enquiries
    }
  }

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
          image={event?.event_poster}
          alt={event?.title}
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
              <strong>Location:</strong> {event?.location.city || "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Start Time:</strong> {formatDateTime(event?.start_time)}
            </Typography>
          </Box>

          {/* Learn More Button */}
          <Button size="small" color="primary" variant="contained" sx={{
            '&:hover': {
              color: 'white'
            }
          }}
          onClick={() => handleButton(event?.id)}
          >
            {userRole === 'client' ? 'Manage Event' : 'Make Enquiry'}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default EventCard;