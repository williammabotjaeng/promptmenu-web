import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import { EventDetailItem } from "@/components/dashboard/event/EventDetailItem";
import HeaderWithProgressBar from "@/components/dashboard/event/HeaderWithProgressBar";
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import { useStore } from "zustand";
import useEventStore from "@/state/use-event-store";
import PhotoGrid from "@/components/dashboard/event/PhotoGrid";
import { useEvent } from "@/providers/event-provider";
import { useCookies } from "react-cookie";
import { uploadFileToS3 } from "@/services/s3UploadUtils";

export const EventReview: React.FC<PostEventStepProps> = ({
  activeStep,
  setActiveStep,
}) => {
  const { eventMedia, eventDetails } = useStore(useEventStore);

  const { createEvent } = useEvent();

  const [cookies] = useCookies(["username", "access"]);

  const userName = cookies["username"];

  const accessToken = cookies["access"];

  const uploadPhotosToS3 = async (photosArray, userName, accessToken) => {
    try {
      const uploadedPhotos = await Promise.all(
        photosArray.map((photo) =>
          uploadFileToS3(photo, "event_photos", userName, accessToken)
        )
      );
      return uploadedPhotos;
    } catch (error) {
      console.error("Error uploading event photos:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    const eventPosterS3 = uploadFileToS3(
      eventMedia?.eventPoster,
      "event_poster",
      userName,
      accessToken
    );
    const eventVideoS3 = uploadFileToS3(
      eventMedia?.eventPromoVideo,
      "event_video",
      userName,
      accessToken
    );

    const photosArray = [...eventMedia?.eventPhotos];

    const eventPhotosS3 = uploadPhotosToS3(photosArray, userName, accessToken);
    const localSlug = eventDetails?.eventTitle
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .split(/\s+/)
      .join("-");

    await createEvent({
      organizer: userName,
      capacity: 0,
      title: eventDetails?.eventTitle,
      description: eventDetails?.description,
      location: eventDetails?.location,
      start_time: eventDetails?.startDateTime,
      slug: localSlug,
      end_time: eventDetails?.endDateTime,
      accomodation_provided: eventDetails?.accommodationProvided,
      transport_provided: eventDetails?.transportProvided,
      meals_provided: eventDetails?.mealsProvided,
      event_poster: eventPosterS3,
      event_photos: eventPhotosS3,
      event_video: eventVideoS3,
    });

    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  React.useEffect(() => {
    console.log("Event Media:", eventMedia);
    console.log("Event Details:", eventDetails);
  }, []);

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
      }}
    >
      <HeaderWithProgressBar progressValue={100} />
      {/* Heading placed above the form */}
      <Typography
        variant="h4"
        sx={{
          mt: 4,
          mb: 2,
          textAlign: "center",
          fontWeight: "bold",
          color: "black",
        }}
      >
        Event Review
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          pb: { xs: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            px: { xs: 2, md: 4 },
            py: 2,
            mb: 0,
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              width: "100%",
              maxWidth: "1134px",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      grow: 1,
                      pb: 2,
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        p: 4,
                        mt: 4,
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0px 8px 10px rgba(0,0,0,0.1)",
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              pb: 2,
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                color: "#977342",
                                fontWeight: "bold",
                              }}
                            >
                              Event Details
                            </Typography>
                            <Box sx={{ mt: 2 }}>
                              <EventDetailItem
                                label="Event Title"
                                value={eventDetails?.eventTitle || ""}
                              />
                              <EventDetailItem
                                label="Description"
                                value={eventDetails?.description || ""}
                              />
                              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                                <EventDetailItem
                                  label="Start Date"
                                  value={eventDetails?.startDateTime || ""}
                                />
                                <EventDetailItem
                                  label="End Date"
                                  value={eventDetails?.endDateTime || ""}
                                />
                              </Box>
                              <EventDetailItem
                                label="Assistance Provided"
                                value={`Meals: ${
                                  eventDetails?.mealsProvided ? "Yes" : "No"
                                }, Transportation ${
                                  eventDetails?.transportProvided ? "Yes" : "No"
                                }, Accommodation: ${
                                  eventDetails?.accommodationProvided
                                    ? "Yes"
                                    : "No"
                                }`}
                              />
                            </Box>
                          </Box>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              py: 1,
                              textAlign: "left",
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                color: "#977342",
                                fontWeight: "bold",
                              }}
                            >
                              Uploaded Media
                            </Typography>
                            <PhotoGrid />
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mt: 4,
                        }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            px: 4,
                            py: 2,
                            mr: 4,
                            color: "#977342",
                            backgroundColor: "#fff",
                            "&:hover": {
                              backgroundColor: "#fff",
                              color: "#CEAB76",
                            },
                          }}
                          onClick={handleBack}
                        >
                          Go Back
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            px: 4,
                            py: 2,
                            backgroundColor: "#977342",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "#CEAB76",
                            },
                          }}
                          onClick={handleSubmit}
                        >
                          Submit Event
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
