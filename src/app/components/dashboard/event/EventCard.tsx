import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CardMedia,
  Box,
  Chip,
  Avatar,
  Divider,
  IconButton,
  Tooltip,
  alpha
} from "@mui/material";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import moment from "moment";
import { useStore } from "zustand";
import { 
  LocationOn,
  AccessTime,
  Person,
  CalendarToday,
  Groups,
  ArrowForward,
  EditOutlined,
  StarOutlined
} from "@mui/icons-material";
import useCurrentEventStore from "@/state/use-current-event-store";

const EventCard = ({ event }) => {
  // Function to create an excerpt of the description
  const getExcerpt = (text, length = 180) => {
    if (!text) return "No description available";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const [cookies, setCookie] = useCookies([
    'user_role',
    'current_event',
    'event_id',
    'event_status'
  ]);

  const userRole = cookies?.user_role;
  const router = useRouter();
  const { setCurrentEvent } = useStore(useCurrentEventStore);

  const formatDateTime = (dateTimeString) => {
    return moment(dateTimeString).format('MMMM D, YYYY [at] h:mm A');
  };

  const formatDateShort = (dateTimeString) => {
    return moment(dateTimeString).format('MMM D');
  };

  const getTimeRemaining = (dateTimeString) => {
    const eventDate = moment(dateTimeString);
    const now = moment();
    if (eventDate.isBefore(now)) return "Event passed";
    
    return eventDate.from(now);
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'live':
        return { bg: '#4caf5033', color: '#4CAF50' };
      case 'draft':
        return { bg: '#ff980033', color: '#FF9800' };
      case 'completed':
        return { bg: '#9e9e9e33', color: '#9E9E9E' };
      default:
        return { bg: '#9e9e9e33', color: '#9E9E9E' };
    }
  };

  const handleButton = (eventId) => {
    if (userRole === 'client') {
      console.log("Event Id:", eventId);
      setCookie("event_id", eventId);
      
      setCurrentEvent({
        ...event,
        mealsProvided: event?.meals_provided,
        accommodationProvided: event?.accomodation_provided,
        transportProvided: event?.transport_provided,
        startTime: event?.start_time,
        endTime: event?.end_time,
        roles: event?.roles
      });
      console.log("Event in Cookies:", cookies?.current_event);
      setCookie('current_event', JSON.stringify(event));
      setCookie('event_status', event?.status);
      router.push(`/event/${eventId}`);
    } else {
      // TODO: Handle enquiries
    }
  };

  const statusColor = getStatusColor(event?.status);
  
  // Get placeholder image if no event_poster is available
  const eventImage = event?.event_poster || 'https://via.placeholder.com/100?text=Event';
  
  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.12)",
        },
        position: "relative",
      }}
    >
      {/* Status indicator */}
      <Box 
        sx={{ 
          position: "absolute", 
          top: "12px", 
          right: "12px", 
          zIndex: 2 
        }}
      >
        <Chip 
          label={event?.status || "Draft"} 
          size="small"
          sx={{ 
            backgroundColor: statusColor.bg,
            color: statusColor.color,
            fontWeight: 600,
            fontSize: "0.7rem",
            textTransform: "capitalize"
          }}
        />
      </Box>

      {/* Left column - Date and Image */}
      <Box 
        sx={{ 
          width: { xs: '100px', sm: '120px' },
          bgcolor: '#977342',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%',
            backgroundImage: `url(${eventImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.25,
            zIndex: 0
          }} 
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            zIndex: 1,
            textAlign: 'center'
          }}
        >
          <CalendarToday fontSize="small" sx={{ mb: 1 }} />
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700, 
              lineHeight: 1.1, 
              fontSize: { xs: '1rem', sm: '1.25rem' } 
            }}
          >
            {formatDateShort(event?.start_time)}
          </Typography>
          <Typography variant="caption" sx={{ mt: 0.5, fontWeight: 500 }}>
            {getTimeRemaining(event?.start_time)}
          </Typography>
        </Box>
      </Box>

      {/* Event Details */}
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <CardContent sx={{ py: 3, px: 3, pb: 0 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ 
              fontWeight: "700",
              mb: 1,
              color: '#333',
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}
          >
            {event?.title}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Chip 
              icon={<LocationOn fontSize="small" />} 
              label={event?.location || "No location"} 
              size="small"
              sx={{ 
                bgcolor: 'rgba(0,0,0,0.05)', 
                height: '24px',
                '& .MuiChip-icon': { color: '#977342' }
              }}
            />
            {event?.roles && (
              <Chip 
                icon={<Groups fontSize="small" />} 
                label={`${event?.roles?.length || 0} role${event?.roles?.length !== 1 ? 's' : ''}`} 
                size="small"
                sx={{ 
                  bgcolor: 'rgba(0,0,0,0.05)', 
                  height: '24px',
                  '& .MuiChip-icon': { color: '#977342' }
                }}
              />
            )}
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, lineHeight: 1.6 }}
          >
            {getExcerpt(event?.description)}
          </Typography>
        </CardContent>

        <Box sx={{ flexGrow: 1 }} />

        <Divider />

        {/* Footer with action button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTime 
              fontSize="small" 
              sx={{ color: 'text.secondary', mr: 1 }} 
            />
            <Typography variant="body2" color="text.secondary">
              {formatDateTime(event?.start_time)}
            </Typography>
          </Box>

          <Button
            size="small"
            variant="contained"
            endIcon={userRole === 'client' ? <EditOutlined /> : <ArrowForward />}
            onClick={() => handleButton(event?.id)}
            sx={{
              bgcolor: "#977342",
              '&:hover': {
                bgcolor: "#CEAB76",
                color: 'white'
              },
              borderRadius: '8px',
              px: 2
            }}
          >
            {userRole === 'client' ? 'Manage Event' : 'Make Enquiry'}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default EventCard;