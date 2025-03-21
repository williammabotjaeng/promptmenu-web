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
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SaveIcon from "@mui/icons-material/Save";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { EventMedia } from "@/components/dashboard/event/page/EventMedia";
import EventRoles from "@/components/dashboard/event/page/EventRoles";
import useCurrentEventStore from "@/state/use-current-event-store";
import { useCookies } from "react-cookie";
import { useEvent } from "@/providers/event-provider";
import FetchingEvent from "@/components/dashboard/FetchingEvent";
import { UNSTABLE_REVALIDATE_RENAME_ERROR } from "next/dist/lib/constants";
import { uploadFileToS3 } from "@/services/s3UploadUtils";
import { useTalentProfile } from "@/providers/talent-profile-provider";

const EditEventPage = () => {
  const router = useRouter();

  const { currentEvent } = useStore(useCurrentEventStore);

  const [event, setEvent] = useState(currentEvent || null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);

  const { fetchEvent, updateEvent, signedUrls, clearSignedUrls } = useEvent();

  const { deleteFiles } = useTalentProfile();

  const [cookies, setCookie] = useCookies([
    "event_photos",
    "event_poster",
    "event_video",
    "event_id",
    "username",
    "access"
  ]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const eventID = cookies?.event_id;

  const userName = cookies?.username;

  const accessToken = cookies?.access;

  const handleDown = () => {
    if (currentPage >= 2) {
      setCurrentPage(0);
    }

    setCurrentPage(currentPage + 1);
  };

  const handleUp = () => {
    if (currentPage <= 0) {
      setCurrentPage(2);
    }
    setCurrentPage(currentPage - 1);
  };

  const [eventTitle, setEventTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [mealsProvided, setMealsProvided] = useState(false);
  const [transportProvided, setTransportProvided] = useState(false);
  const [accommodationProvided, setAccommodationProvided] = useState(false);
  const [eventStatus, setEventStatus] = useState("draft");
  const [localEventPhotos, setLocalEventPhotos] = useState(null);
  const [localEventPoster, setLocalEventPoster] = useState<string>(null);
  const [localEventVideo, setLocalEventVideo] = useState(null);
  const [error, setError] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [imagesToBeAdded, setImagesToBeAdded] = useState<string[]>([]);

  const handleImageUpload = (newImages: string[]) => {
    console.log("Image upload:", newImages);
    setImagesToBeAdded((prev) => [...prev, ...newImages]);
    if (localEventPhotos?.length > 0) {
      setLocalEventPhotos((prevImages) => [...prevImages, ...newImages]);
    } else {
      setLocalEventPhotos([...newImages]);
    }
  };

  const handlePosterUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    
    if (file) {
      console.log("Poster Upload:", file);
      
      // Create blob URL for preview
      const blobUrl = URL.createObjectURL(file);
      
      // Save both the file and the blob URL
      setLocalEventPoster(blobUrl);
    }
  };

  const handlePosterDelete = () => {
    setLocalEventPoster(null);
  };

  const handleVideoUpload = (video: string) => {
    setLocalEventVideo(video);
  };

  const handleVideoDelete = () => {
    setLocalEventVideo(null);
  };

  const handleDeleteImage = (image: string) => {
    setLocalEventPhotos((prevImages) =>
      prevImages.filter((img) => img !== image)
    );
    setImagesToDelete((prevImagesToDelete) => [...prevImagesToDelete, image]);
  };

  const extractFilePaths = (signedUrls: string[]) => {
    return signedUrls.map((url) => {
      const parsedUrl = new URL(url);
      return parsedUrl.pathname.substring(1);
    });
  };

  const extractFilePath = (signedUrl: string) => {
    const parsedUrl = new URL(signedUrl);
    return parsedUrl.pathname.substring(1);
  };

  const handleSaveEventMedia = async () => {

    if (!localEventPhotos && !localEventPoster && !localEventVideo)
    {
      setSnackbarMessage("No Event Media Uploaded!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
    // Step 1: Prepare files to delete (images, video, poster)
    const filePathsToDelete = extractFilePaths(imagesToDelete);

    // Add old video and poster to delete list if they are being replaced
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
      event_images: [
        ...event.eventPhotos.filter(
          (image) => !filePathsToDelete.includes(image)
        ),
        ...eventImagesNames,
      ],
      event_video: eventVideoFileName,
      event_poster: eventPosterFileName,
    };

    console.log("Updated Event:", updatedEvent);

    // Step 6: Update event in database
    await updateEvent(eventID, updatedEvent);

    // Step 7: Delete old files from S3
    if (filePathsToDelete?.length > 0) {
      await deleteFiles(filePathsToDelete);
    }

    // Step 8: Show success message
    setSnackbarMessage("Event media updated successfully");
    setSnackbarOpen(true);
  };

  useEffect(() => {
    setLoading(true);
    fetchEvent()
      .then((data) => {
        console.log("Fetch Event Response:", data);
        // console.log("Event Signed URLS:", signedUrls);
        setEvent(currentEvent);
        setEventTitle(currentEvent?.title || "");
        setDescription(currentEvent?.description || "");
        setLocation(currentEvent?.location || "");
        setStartDateTime(currentEvent?.startTime || null);
        setEndDateTime(currentEvent?.endTime || null);
        setMealsProvided(currentEvent?.mealsProvided || false);
        setTransportProvided(currentEvent?.transportProvided || false);
        setAccommodationProvided(currentEvent?.accommodationProvided || false);
      })
      .catch((err) => console.error("Error Fetching Event:", err));

    if (signedUrls) {
      setLocalEventPhotos(signedUrls?.eventPhotos);
      setLocalEventPoster(signedUrls?.eventPoster);
      setLocalEventVideo(signedUrls?.eventVideo);
      console.log("Signed URLs:", signedUrls);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [cookies, signedUrls?.eventPhotos]);

  const handleSaveDetails = async () => {
    const payload = {
      ...currentEvent,
      accommodation_provided: accommodationProvided,
      description: description,
      end_time: endDateTime,
      organizer: userName,
      // event_photos: {},
      // event_poster: "",
      // event_status: "",
      // event_video: "",
      location: location,
      meals_provided: mealsProvided,
      status: eventStatus,
      // roles: {},
      startDateTime: startDateTime,
      eventTitle: eventTitle,
      transport_provided: transportProvided,
      updated_at: new Date().toISOString(),
    };

    console.log("Event Payload:", payload);

    await updateEvent(eventID, payload);

    setSnackbarMessage("Event Details Saved Successfully");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const goBack = () => {
    clearSignedUrls();
    router.push(`/events`);
  };

  if (!event) return null;

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

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
        }}
      >
        <Header />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            padding: 4,
          }}
        >
          <IconButton
            onClick={goBack}
            sx={{
              fontFamily: "Inter",
              color: "#977342",
              "&:hover": {
                color: "#CEAB76",
              },
            }}
          >
            <ArrowBackIosNewIcon />
            <Typography
              sx={{
                fontSize: "12px",
                ml: 1,
              }}
            >
              Go Back
            </Typography>
          </IconButton>
          <Typography variant="h5">Event Management</Typography>
          <br />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
            }}
          >
            {/* Save Event Button */}
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{
                backgroundColor: "#000", // Default Material-UI blue
                color: "white",
                "&:hover": {
                  backgroundColor: "#111",
                },
              }}
            >
              <Typography
                sx={{
                  display: { xs: "none", sm: "flex", md: "flex" },
                  fontSize: { xs: null, sm: "10px", md: "14px" },
                }}
              >
                Save Event
              </Typography>
            </Button>

            {/* Change Status Button */}
            <Button
              variant="contained"
              startIcon={<SwapHorizIcon />}
              sx={{
                backgroundColor: "#808000",
                color: "white",
                "&:hover": {
                  backgroundColor: "#909000",
                },
              }}
            >
              <Typography
                sx={{
                  display: { xs: "none", sm: "flex", md: "flex" },
                  fontSize: { xs: null, sm: "10px", md: "14px" },
                }}
              >
                Change Status
              </Typography>
            </Button>

            {/* Delete Event Button */}
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              sx={{
                backgroundColor: "#982d28",
                color: "white",
                "&:hover": {
                  backgroundColor: "#d44a3b",
                },
              }}
            >
              <Typography
                sx={{
                  display: { xs: "none", sm: "flex", md: "flex" },
                  fontSize: { xs: null, sm: "10px", md: "14px" },
                }}
              >
                Delete Event
              </Typography>
            </Button>
            {/* Delete Event Button */}
            <Button
              variant="contained"
              startIcon={<CheckCircleIcon />}
              sx={{
                backgroundColor: "#1d8037",
                color: "white",
                "&:hover": {
                  backgroundColor: "#1d6037",
                },
              }}
            >
              <Typography
                sx={{
                  display: { xs: "none", sm: "flex", md: "flex" },
                  fontSize: { xs: null, sm: "10px", md: "14px" },
                }}
              >
                Approve Event
              </Typography>
            </Button>
          </Box>
        </Box>
        {currentPage === 0 && (
          <EventDetails
            eventTitle={eventTitle ? eventTitle : currentEvent?.title}
            setEventTitle={setEventTitle}
            description={description ? description : currentEvent?.description}
            setDescription={setDescription}
            location={location ? location : currentEvent?.location}
            setLocation={setLocation}
            startDateTime={
              startDateTime ? startDateTime : currentEvent?.startTime
            }
            setStartDateTime={setStartDateTime}
            endDateTime={endDateTime ? endDateTime : currentEvent?.endTime}
            setEndDateTime={setEndDateTime}
            mealsProvided={
              mealsProvided ? mealsProvided : currentEvent?.mealsProvided
            }
            setMealsProvided={setMealsProvided}
            transportProvided={
              transportProvided
                ? transportProvided
                : currentEvent?.transportProvided
            }
            setTransportProvided={setTransportProvided}
            accommodationProvided={
              accommodationProvided
                ? accommodationProvided
                : currentEvent?.accommodationProvided
            }
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
        {currentPage === 2 && <EventRoles event={event} />}

        {/* Floating Navigation Button */}
        {currentPage > 0 && (
          <Fab
            color="primary"
            onClick={handleUp}
            sx={{
              position: "fixed",
              bottom: 96,
              right: 16,
              backgroundColor: "#CEAB76",
              "&:hover": {
                color: "#fff",
                backgroundColor: "#977342",
              },
            }}
          >
            {<ArrowUpwardIcon />}
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
              backgroundColor: "#ceab76",
              "&:hover": {
                color: "#fff",
                backgroundColor: "#977342",
              },
            }}
          >
            {<ArrowDownwardIcon />}
          </Fab>
        )}
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
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default EditEventPage;
