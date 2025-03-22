"use client";

import React, { useState, useEffect } from "react";
import { EventDetails } from "@/components/dashboard/event/page/EventDetails";
import { useRouter } from "next/navigation";
import { useStore } from "zustand";
import Header from "@/components/dashboard/Header";
import {
  Box,
  Button,
  Typography,
  Fab,
  IconButton,
  Snackbar,
  Alert,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepButton,
  Divider,
  Chip,
  Card,
  CardContent,
  Tooltip,
  Fade,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { EventMedia } from "@/components/dashboard/event/page/EventMedia";
import EventRoles from "@/components/dashboard/event/page/EventRoles";
import useCurrentEventStore from "@/state/use-current-event-store";
import { useCookies } from "react-cookie";
import { useEvent } from "@/providers/event-provider";
import FetchingEvent from "@/components/dashboard/FetchingEvent";
import { uploadFileToS3 } from "@/services/s3UploadUtils";
import { useTalentProfile } from "@/providers/talent-profile-provider";
import UpdatingEventMedia from "@/components/dashboard/UpdatingEventMedia";
import DeleteEventDialog from "@/components/dashboard/event/page/DeleteEventDialog";
import PublishEventDialog from "@/components/dashboard/event/page/PublishEventDialog";

const EditEventPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { currentEvent } = useStore(useCurrentEventStore);
  const [event, setEvent] = useState(currentEvent || null);

  // Notification system
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Loading states
  const [loading, setLoading] = useState(false);
  const [eventMediaLoading, setEventMediaLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  // Navigation state
  const [currentPage, setCurrentPage] = useState(0);

  // Page steps
  const steps = [
    { label: 'Event Details' },
    { label: 'Event Media' },
    { label: 'Event Roles' }
  ];

  const { fetchEvent, updateEvent, signedUrls, clearSignedUrls, deleteEvent } = useEvent();
  const { deleteFiles } = useTalentProfile();

  const [cookies, setCookie] = useCookies([
    "event_photos",
    "event_poster",
    "event_video",
    "event_id",
    "username",
    "access",
    "event_status",
    "current_event"
  ]);

  const eventID = cookies?.event_id;
  const userName = cookies?.username;
  const accessToken = cookies?.access;
  const currentEventStatus = cookies?.current_event?.event_status;

  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);

  // Event form state
  const [eventTitle, setEventTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [mealsProvided, setMealsProvided] = useState(false);
  const [transportProvided, setTransportProvided] = useState(false);
  const [accommodationProvided, setAccommodationProvided] = useState(false);
  const [eventStatus, setEventStatus] = useState(cookies?.current_event?.event_status || "draft");
  const [error, setError] = useState("");

  // Media state
  const [localEventPhotos, setLocalEventPhotos] = useState(null);
  const [localEventPoster, setLocalEventPoster] = useState(null);
  const [localEventVideo, setLocalEventVideo] = useState(null);
  const [images, setImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [imagesToBeAdded, setImagesToBeAdded] = useState([]);

  // Handle up/down navigation
  const handleDown = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, 2));
  };

  const handleUp = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  // Handle snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Show success notification
  const showSuccess = (message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  // Show error notification
  const showError = (message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  };

  // Dialog handlers
  const handleOpenPublishDialog = () => {
    setPublishDialogOpen(true);
  };

  const handleClosePublishDialog = () => {
    setPublishDialogOpen(false);
  };

  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  // Confirm deletion
  const handleConfirmDelete = async () => {
    try {
      await deleteEvent();
      showSuccess("Event Deleted Successfully");
      setDeleteDialogOpen(false);
      router.push("/events");
    } catch (error) {
      showError("Failed to delete event. Please try again.");
      console.error("Error deleting event:", error);
    }
  };

  // Image handlers
  const handleImageUpload = (newImages) => {
    console.log("Image upload:", newImages);
    setImagesToBeAdded((prev) => [...prev, ...newImages]);
    if (localEventPhotos?.length > 0) {
      setLocalEventPhotos((prevImages) => [...prevImages, ...newImages]);
    } else {
      setLocalEventPhotos([...newImages]);
    }
  };

  const handlePosterUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      console.log("Poster Upload:", file);
      const blobUrl = URL.createObjectURL(file);
      setLocalEventPoster(blobUrl);
    }
  };

  const handlePosterDelete = () => {
    setLocalEventPoster(null);
  };

  const handleVideoUpload = (video) => {
    setLocalEventVideo(video);
  };

  const handleVideoDelete = () => {
    setLocalEventVideo(null);
  };

  const handleDeleteImage = (image) => {
    setLocalEventPhotos((prevImages) =>
      prevImages.filter((img) => img !== image)
    );
    setImagesToDelete((prevImagesToDelete) => [...prevImagesToDelete, image]);
  };

  // File path extraction
  const extractFilePaths = (signedUrls) => {
    return signedUrls.map((url) => {
      const parsedUrl = new URL(url);
      return parsedUrl.pathname.substring(1);
    });
  };

  const extractFilePath = (signedUrl) => {
    const parsedUrl = new URL(signedUrl);
    return parsedUrl.pathname.substring(1);
  };

  // Save handlers
  const handleSaveEvent = () => {
    showSuccess("Event Saved Successfully.");
  };

  // Publish/unpublish event
  const handleConfirmPublishToggle = async () => {
    try {
      const newStatus = currentEventStatus === 'live' ? 'draft' : 'live';
      
      setEventStatus(newStatus);
      setCookie("event_status", newStatus);
      
      const updatedEvent = {
        status: newStatus
      };
      
      await updateEvent(eventID, updatedEvent);
      
      const successMessage = newStatus === 'live'
        ? "Event Published Successfully"
        : "Event Unpublished Successfully";
      
      showSuccess(successMessage);
      setPublishDialogOpen(false);
    } catch (error) {
      const errorMessage = currentEventStatus === 'live'
        ? "Failed to unpublish event. Please try again."
        : "Failed to publish event. Please try again.";
      
      setEventStatus(currentEventStatus);
      setCookie("event_status", currentEventStatus);
      
      showError(errorMessage);
      console.error("Error toggling event status:", error);
    }
  };

  // Save event media
  const handleSaveEventMedia = async () => {
    setEventMediaLoading(true);
    
    try {
      if (!localEventPhotos && !localEventPoster && !localEventVideo) {
        showError("No Event Media Uploaded!");
        setEventMediaLoading(false);
        return;
      }
      
      // Step 1: Prepare files to delete
      const filePathsToDelete = extractFilePaths(imagesToDelete);
      
      if (localEventVideo !== signedUrls?.eventVideo && event.eventVideo) {
        filePathsToDelete.push(event.eventVideo);
      }
      
      if (localEventPoster !== signedUrls?.eventPoster && event.eventPoster) {
        filePathsToDelete.push(event.eventPoster);
      }
      
      // Step 2: Upload new event images
      const eventImagesNames = await Promise.all(
        (imagesToBeAdded || []).map((image, index) =>
          uploadFileToS3(image, `event_image_${index}`, eventID, accessToken)
        )
      );
      
      // Step 3: Upload new event video if exists
      let eventVideoFileName = event.eventVideo;
      if (localEventVideo !== signedUrls?.eventVideo) {
        eventVideoFileName = await uploadFileToS3(
          localEventVideo,
          "event_video",
          eventID,
          accessToken
        );
      }
      
      // Step 4: Upload new event poster if exists
      let eventPosterFileName = event.eventPoster;
      if (localEventPoster !== signedUrls?.event_poster) {
        eventPosterFileName = await uploadFileToS3(
          localEventPoster,
          "event_poster",
          eventID,
          accessToken
        );
      }
      
      // Step 5: Create updated event object
      const updatedEvent = {
        ...event,
        event_id: eventID,
        event_photos: [
          ...(event.eventPhotos
            ? event.eventPhotos.filter(
                (image) => !filePathsToDelete.includes(image)
              )
            : []),
          ...eventImagesNames,
        ],
        event_video: eventVideoFileName,
        event_poster: eventPosterFileName,
        status: eventStatus,
      };
      
      // Step 6: Update event in database
      await updateEvent(eventID, updatedEvent);
      
      // Step 7: Delete old files from S3
      if (filePathsToDelete?.length > 0) {
        await deleteFiles(filePathsToDelete);
      }
      
      showSuccess("Event media updated successfully");
    } catch (error) {
      showError("Failed to update event media. Please try again.");
      console.error("Error updating event media:", error);
    } finally {
      setEventMediaLoading(false);
    }
  };
  
  // Save event details
  const handleSaveDetails = async () => {
    try {
      const payload = {
        ...currentEvent,
        accommodation_provided: accommodationProvided,
        description: description,
        end_time: endDateTime,
        organizer: userName,
        location: location,
        meals_provided: mealsProvided,
        status: eventStatus,
        startDateTime: startDateTime,
        eventTitle: eventTitle,
        transport_provided: transportProvided,
        updated_at: new Date().toISOString(),
      };
  
      await updateEvent(eventID, payload);
      showSuccess("Event Details Saved Successfully");
    } catch (error) {
      showError("Failed to save event details. Please try again.");
      console.error("Error saving event details:", error);
    }
  };

  // Navigate back to events page
  const goBack = () => {
    clearSignedUrls();
    router.push(`/events`);
  };

  // Load event data
  useEffect(() => {
    setLoading(true);

    fetchEvent()
      .then((data: any) => {
        console.log("Fetch Event Response:", data);

        // Use the data returned from fetchEvent directly
        if (data) {
          setEvent(data);
          setEventTitle(data?.title || "");
          setDescription(data?.description || "");
          setLocation(data?.location || "");
          setStartDateTime(data?.startTime || null);
          setEndDateTime(data?.endTime || null);
          setMealsProvided(data?.mealsProvided || false);
          setTransportProvided(data?.transportProvided || false);
          setAccommodationProvided(data?.accommodationProvided || false);
          setEventStatus(data?.event_status);
          setCookie("event_status", cookies?.current_event?.event_status);
        } else {
          // Fall back to the store data if needed
          setEvent(currentEvent);
          setEventTitle(currentEvent?.title || "");
          setDescription(currentEvent?.description || "");
          setLocation(currentEvent?.location || "");
          setStartDateTime(currentEvent?.startTime || null);
          setEndDateTime(currentEvent?.endTime || null);
          setMealsProvided(currentEvent?.mealsProvided || false);
          setTransportProvided(currentEvent?.transportProvided || false);
          setAccommodationProvided(currentEvent?.accommodationProvided || false);
        }
      })
      .catch((err) => {
        console.error("Error Fetching Event:", err);
        setError("Failed to load event data");
      });

    if (signedUrls) {
      setLocalEventPhotos(signedUrls?.eventPhotos || []);
      setLocalEventPoster(signedUrls?.eventPoster || null);
      setLocalEventVideo(signedUrls?.eventVideo || null);
    }

    setTimeout(() => {
      setLoading(false);
      setFadeIn(true);
    }, 1000);
  }, [cookies, signedUrls?.eventPhotos]);

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "white",
        }}
      >
        <FetchingEvent />
      </Box>
    );
  }

  // Media loading state
  if (eventMediaLoading) return <UpdatingEventMedia />;

  // No event data
  if (!event) return null;

  return (
    <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh", pb: 10 }}>
      <Header />

      {/* Event Header */}
      <Box sx={{ backgroundColor: "#977342", py: 3, mb: 4 }}>
        <Container maxWidth="lg">
          <Fade in={fadeIn} timeout={800}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <IconButton
                  onClick={goBack}
                  sx={{
                    color: "white",
                    mr: 1,
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.8)",
                    cursor: "pointer",
                    "&:hover": { color: "white" },
                  }}
                  onClick={goBack}
                >
                  Back to Events
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <CalendarTodayIcon sx={{ color: "white", mr: 1.5, fontSize: "1.2rem" }} />
                    <Typography variant="h5" sx={{ color: "white", fontWeight: 600 }}>
                      {eventTitle || "Untitled Event"}
                    </Typography>
                  </Box>
                  <Chip
                    label={currentEventStatus === "live" ? "Published" : "Draft"}
                    size="small"
                    sx={{
                      backgroundColor: currentEventStatus === "live" ? "#4caf5033" : "#ff980033",
                      color: currentEventStatus === "live" ? "#4CAF50" : "#FF9800",
                      fontWeight: 600,
                      "& .MuiChip-label": { px: 1 },
                    }}
                  />
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveEvent}
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      color: "#977342",
                      borderColor: "transparent",
                      display: { xs: "none", sm: "flex" },
                      "&:hover": {
                        backgroundColor: "white",
                        borderColor: "transparent",
                      },
                    }}
                  >
                    Save Event
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={handleOpenDeleteDialog}
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.1)",
                      color: "white",
                      borderColor: "rgba(255,255,255,0.3)",
                      display: { xs: "none", sm: "flex" },
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.2)",
                        borderColor: "rgba(255,255,255,0.5)",
                      },
                    }}
                  >
                    Delete
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<CheckCircleIcon />}
                    onClick={handleOpenPublishDialog}
                    sx={{
                      backgroundColor: currentEventStatus === "draft" ? "#4CAF50" : "#FF9800",
                      color: "white",
                      "&:hover": {
                        backgroundColor: currentEventStatus === "draft" ? "#3b9c45" : "#e88c00",
                      },
                    }}
                  >
                    {currentEventStatus === "draft" ? "Publish" : "Unpublish"}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Fade in={fadeIn} timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: "16px",
              mb: 4,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              overflow: "visible",
              position: "relative",
            }}
          >
            {/* Section Navigation Indicator */}
            <Box
              sx={{
                p: 3,
                backgroundColor: "#f5f5f5",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 4,
                  justifyContent: "center",
                }}
              >
                {steps.map((step, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      opacity: currentPage === index ? 1 : 0.5,
                      transition: "opacity 0.3s",
                    }}
                  >
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: currentPage === index ? "#977342" : "rgba(0,0,0,0.1)",
                        color: currentPage === index ? "white" : "text.secondary",
                        mb: 1,
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: currentPage === index ? 600 : 400,
                        color: currentPage === index ? "#977342" : "text.secondary",
                      }}
                    >
                      {step.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Content Area */}
            <Box sx={{ p: { xs: 0, sm: 2 } }}>
              {currentPage === 0 && (
                <EventDetails
                  eventTitle={eventTitle || currentEvent?.title}
                  setEventTitle={setEventTitle}
                  description={description || currentEvent?.description}
                  setDescription={setDescription}
                  location={location || currentEvent?.location}
                  setLocation={setLocation}
                  startDateTime={startDateTime || currentEvent?.startTime}
                  setStartDateTime={setStartDateTime}
                  endDateTime={endDateTime || currentEvent?.endTime}
                  setEndDateTime={setEndDateTime}
                  mealsProvided={mealsProvided || currentEvent?.mealsProvided}
                  setMealsProvided={setMealsProvided}
                  transportProvided={transportProvided || currentEvent?.transportProvided}
                  setTransportProvided={setTransportProvided}
                  accommodationProvided={accommodationProvided || currentEvent?.accommodationProvided}
                  setAccommodationProvided={setAccommodationProvided}
                  error={error}
                  handleSaveSection={handleSaveDetails}
                />
              )}

              {currentPage === 1 && (
                <EventMedia
                  eventPhotos={localEventPhotos || []}
                  eventPoster={localEventPoster || ""}
                  eventVideo={localEventVideo || ""}
                  onImageDelete={handleDeleteImage}
                  onImageUpload={handleImageUpload}
                  onPosterDelete={handlePosterDelete}
                  onPosterUpload={handlePosterUpload}
                  onVideoDelete={handleVideoDelete}
                  onVideoUpload={handleVideoUpload}
                  onSaveEventMedia={handleSaveEventMedia}
                  imagesToBeAdded={imagesToBeAdded}
                  imagesToDelete={imagesToDelete}
                />
              )}

              {currentPage === 2 && (
                <EventRoles event={event} />
              )}
            </Box>
          </Paper>
        </Fade>
      </Container>

      {/* Keep original vertical navigation buttons */}
      {currentPage > 0 && (
        <Fab
          color="primary"
          onClick={handleUp}
          sx={{
            position: "fixed",
            bottom: 96,
            right: 16,
            backgroundColor: "white",
            color: "#977342",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <ArrowUpwardIcon />
        </Fab>
      )}
      
      {currentPage < 2 && (
        <Fab
          color="primary"
          onClick={handleDown}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            backgroundColor: "#977342",
            color: "white",
            boxShadow: "0 4px 12px rgba(151, 115, 66, 0.3)",
            "&:hover": {
              backgroundColor: "#CEAB76",
            },
          }}
        >
          <ArrowDownwardIcon />
        </Fab>
      )}

      {/* Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity === "success" ? "success" : "error"}
          sx={{ 
            width: "100%",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Dialogs */}
      <DeleteEventDialog
        open={deleteDialogOpen}
        eventTitle={eventTitle}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
      
      <PublishEventDialog
        open={publishDialogOpen}
        eventTitle={eventTitle}
        isCurrentlyPublished={currentEventStatus === "live"}
        onClose={handleClosePublishDialog}
        onConfirm={handleConfirmPublishToggle}
      />
    </Box>
  );
};

export default EditEventPage;