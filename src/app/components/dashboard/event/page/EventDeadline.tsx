import * as React from "react";
import { 
  Alert, 
  Box, 
  Button, 
  Snackbar, 
  Typography, 
  Paper, 
  Divider,
  Card,
  CardContent,
  Fade,
  CircularProgress,
  Tooltip,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import { DeadlineForm } from "@/components/dashboard/event/DeadlineForm";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DeadlineHeaderWithProgressBar from "@/components/dashboard/event/DeadlineHeaderWithProgressBar";
import { useStore } from "zustand";
import useEventStore from "@/state/use-event-store";
import { useCookies } from "react-cookie";
import { useEvent } from "@/providers/event-provider";
import useCurrentEventStore from "@/state/use-current-event-store";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddingRole from "../../AddingRole";

const EventDeadline: React.FC<PostEventStepProps> = ({
  activeStep,
  setActiveStep,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { eventDetails, eventRole, clearEventRole, setEventRole } = useStore(useEventStore);
 // const { setCurrentEvent, currentEvent } = useStore(useCurrentEventStore);
  const { updateEvent } = useEvent();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [cookies, removeCookie] = useCookies(['questions', 'event_id', 'current_event']);
  const eventID = cookies?.event_id;
  const currentEvent = cookies?.current_event;
  
  // New state for deadline validation
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isDeadlinesValid, setIsDeadlinesValid] = useState(true);

  // Get the event's start and end dates from the store
  const eventStartDateTime = currentEvent?.start_time || eventDetails?.startDateTime;
  const eventEndDateTime = currentEvent?.end_time || eventDetails?.endDateTime;

  // Validate deadlines whenever the role or event details change
  useEffect(() => {
    validateDeadlines();
  }, [eventRole, eventStartDateTime, eventEndDateTime]);

  // Function to validate deadlines
  const validateDeadlines = () => {
    if (!eventStartDateTime) {
      setValidationError("Event start date is missing. Please set it first.");
      setIsDeadlinesValid(false);
      return;
    }

    const eventStart = new Date(eventStartDateTime);
    const eventEnd = eventEndDateTime ? new Date(eventEndDateTime) : null;
    
    // Calculate minimum deadline (24 hours before event start)
    const minDeadline = new Date(eventStart);
    minDeadline.setHours(minDeadline.getHours() - 24);
    
    const softDeadline = eventRole.softDeadline ? new Date(eventRole.softDeadline) : null;
    const hardDeadline = eventRole.hardDeadline ? new Date(eventRole.hardDeadline) : null;
    const applicationDeadline = eventRole.application_deadline ? new Date(eventRole.application_deadline) : null;
    
    let error = null;

    // Check if any deadline is after the event start
    if (softDeadline && softDeadline >= eventStart) {
      error = "Soft deadline must be at least 24 hours before the event starts.";
    } else if (hardDeadline && hardDeadline >= eventStart) {
      error = "Hard deadline must be at least 24 hours before the event starts.";
    } else if (applicationDeadline && applicationDeadline >= eventStart) {
      error = "Application deadline must be at least 24 hours before the event starts.";
    }
    
    // Check if any deadline is before the minimum deadline
    else if (softDeadline && softDeadline < minDeadline) {
      // This is actually valid, so we don't set an error
    } else if (hardDeadline && hardDeadline < minDeadline) {
      // This is actually valid, so we don't set an error
    } else if (applicationDeadline && applicationDeadline < minDeadline) {
      // This is actually valid, so we don't set an error
    }
    
    // Check if deadlines are in logical order (if all exist)
    else if (softDeadline && hardDeadline && applicationDeadline) {
      if (softDeadline > hardDeadline) {
        error = "Soft deadline should be before hard deadline.";
      } else if (applicationDeadline > softDeadline) {
        error = "Application deadline should be before soft deadline.";
      }
    }
    // Check pairs of deadlines
    else if (softDeadline && hardDeadline && softDeadline > hardDeadline) {
      error = "Soft deadline should be before hard deadline.";
    } else if (applicationDeadline && softDeadline && applicationDeadline > softDeadline) {
      error = "Application deadline should be before soft deadline.";
    } else if (applicationDeadline && hardDeadline && applicationDeadline > hardDeadline) {
      error = "Application deadline should be before hard deadline.";
    }
    
    // Set validation state
    setValidationError(error);
    setIsDeadlinesValid(!error);
  };

  const handleSaveRole = async () => {
    // Validate deadlines before saving
    validateDeadlines();
    
    if (!isDeadlinesValid) {
      setSnackbarMessage(validationError || "Please fix deadline validation errors before saving.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    
    setLoading(true);

    try {
      console.log("Current Event:", eventRole);

      setEventRole({
        ...eventRole,
        eventPoster: currentEvent?.event_poster
      });

      const updatedEvent = {
        ...currentEvent,
        roles: [eventRole], 
      };

      console.log("Updated Event:", updatedEvent);

      clearEventRole();
      removeCookie("questions", { path: "/" });
      
      await updateEvent(eventID, updatedEvent);

      setSnackbarMessage("Role added successfully! Redirecting to event page...");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Give the user time to see the success message
      setTimeout(() => {
        router.push(`/event/${eventID}`);
      }, 2000);
    } catch (error) {
      console.error("Error saving role:", error);
      setSnackbarMessage("There was an error saving the role. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
      console.log("Current Event:", currentEvent);

     // setCurrentEvent(cookies?.current_event);
  }, [cookies])

  if (loading) return <AddingRole />;

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Fade in={true} timeout={500}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          width: "100%",
          maxWidth: "950px",
          margin: "0 auto",
          pb: 6,
        }}
      >
        {/* Header Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 2, md: 3 }, 
            mb: 3, 
            borderRadius: "12px",
            bgcolor: "#fbfaf8",
            border: "1px solid #eee8e1"
          }}
        >
          <DeadlineHeaderWithProgressBar progressValue={85} indexValue={2 * 2} />
          
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <CalendarTodayIcon sx={{ color: "#977342", mr: 1.5, fontSize: 28 }} />
            <Typography
              variant="h5"
              sx={{
                color: "#977342",
                fontWeight: "600",
                lineHeight: 1.3,
              }}
            >
              Set Your Application Deadline
            </Typography>
          </Box>
          
          <Typography
            variant="body1"
            sx={{
              color: "#666",
              mt: 1,
              ml: { xs: 0, sm: 5 },
              pl: { xs: 0, sm: 0.5 },
            }}
          >
            Define when applications for this role will close. A clear deadline helps applicants plan accordingly.
          </Typography>

          {/* Event dates information */}
          <Box 
            sx={{ 
              mt: 3,
              p: 2, 
              bgcolor: 'rgba(151, 115, 66, 0.05)', 
              borderRadius: 1.5,
              border: '1px solid rgba(151, 115, 66, 0.2)'
            }}
          >
            <Typography variant="subtitle2" sx={{ color: '#977342', mb: 1 }}>
              Event Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
              <Typography variant="body2" sx={{ color: '#666' }}>
                <strong>Event Start:</strong> {formatDate(eventStartDateTime)}
              </Typography>
              {eventEndDateTime && (
                <Typography variant="body2" sx={{ color: '#666' }}>
                  <strong>Event End:</strong> {formatDate(eventEndDateTime)}
                </Typography>
              )}
            </Box>
            <Typography variant="caption" sx={{ display: 'block', color: '#977342', mt: 1 }}>
              All deadlines must be at least 24 hours before the event start time.
            </Typography>
          </Box>
        </Paper>

        {/* Validation Error Alert */}
        {validationError && (
          <Alert 
            severity="warning"
            variant="outlined"
            icon={<WarningAmberIcon />}
            sx={{ 
              mb: 3,
              mx: { xs: 2, md: 0 },
              alignItems: 'flex-start'
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {validationError}
            </Typography>
          </Alert>
        )}

        {/* Main Form Section */}
        <Card
          elevation={2}
          sx={{
            borderRadius: "12px",
            overflow: "visible",
            mb: 4,
            border: validationError ? '1px solid #f0ad4e' : 'none'
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 4 } }}>
            <DeadlineForm />
            
            <Box sx={{ mt: 3, pt: 3, borderTop: "1px solid #eee8e1" }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  color: "#977342", 
                  mb: 2 
                }}
              >
                <HelpOutlineIcon sx={{ fontSize: 18, mr: 1 }} />
                Setting a clear deadline helps manage applicant expectations and your recruitment timeline.
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: "space-between",
            px: { xs: 2, md: 4 },
            mt: 2,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderColor: "#977342",
              color: "#977342",
              borderRadius: "8px",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "rgba(151, 115, 66, 0.04)",
                borderColor: "#CEAB76",
              },
              order: { xs: 2, md: 1 },
              mt: { xs: 2, md: 0 },
            }}
            onClick={handleBack}
          >
            Previous Step
          </Button>
          
          <Button
            variant="contained"
            disableElevation
            endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CheckCircleOutlineIcon />}
            disabled={loading || !isDeadlinesValid}
            sx={{
              px: 4,
              py: 1.5,
              backgroundColor: !isDeadlinesValid ? "#ccc" : "#977342",
              color: "white",
              borderRadius: "8px",
              transition: "all 0.3s",
              order: { xs: 1, md: 2 },
              "&:hover": {
                backgroundColor: !isDeadlinesValid ? "#ccc" : "#CEAB76",
                boxShadow: !isDeadlinesValid ? "none" : "0 4px 12px rgba(151, 115, 66, 0.2)",
              },
            }}
            onClick={handleSaveRole}
          >
            {loading ? "Saving Role..." : "Complete & Save Role"}
          </Button>
        </Box>

        {/* Alternative approach suggestion */}
        <Fade in={true} timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mt: 4,
              mx: { xs: 2, md: 4 },
              borderRadius: "8px",
              bgcolor: "rgba(151, 115, 66, 0.05)",
              border: "1px dashed #d5c4a9",
              display: "flex",
              alignItems: "center",
            }}
          >
            <HelpOutlineIcon sx={{ color: "#977342", mr: 2, fontSize: 20 }} />
            <Typography variant="body2" color="text.secondary">
              Need more time to finalize details? You can save this role as a draft and come back to it later from your dashboard.
            </Typography>
          </Paper>
        </Fade>

        {/* Snackbar for feedback */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity === "success" ? "success" : "error"}
            variant="filled"
            sx={{ 
              width: "100%", 
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)" 
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Fade>
  );
};

export default EventDeadline;