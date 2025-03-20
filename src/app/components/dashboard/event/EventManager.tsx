import * as React from "react";
import SectionTabs from './SectionTabs';
import RoleRequirement from './RoleRequirement';
import { Box, Button, Typography } from "@mui/material";
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import OverviewHeaderWithProgressBar from "@/components/dashboard/event/OverviewHeaderWithProgressBar";
import RoleDetailsForm from "@/components/dashboard/event/RoleDetailsForm";
import EventOverview from "./EventOverview";
import { useStore } from "zustand";
import { useRouter, redirect } from "next/navigation";
import useEventStore from "@/state/use-event-store";
import { useEvent } from "@/providers/event-provider";
import { useCompany } from "@/providers/company-provider";
import { useCookies } from "react-cookie";
import { uploadFileToS3 } from "@/services/s3UploadUtils";
import CreatingEvent from "@/components/CreatingEvent";
import { useState } from "react";

const EventManager: React.FC<PostEventStepProps> = ({ activeStep, setActiveStep }) => {

    const { eventDetails, clearEventDetails, clearEventMedia, eventMedia } = useStore(useEventStore);
    const [loading, setLoading] = useState(false);
    const [cookies, removeCookie] = useCookies([
      'event_id', 'username', 
      'access', 'event_video',
      'event_photos','event_poster',
      'company_id', 'questions'
    ]);

    const router = useRouter();

    const eventID = cookies['event_id'];
    const userName = cookies['username'];
    const accessToken = cookies['access'];
    const eventPhotos = Array?.from(cookies['event_photos']);
    const eventVideo = cookies['event_video'];
    const eventPoster = cookies['event_poster'];
    const companyID = cookies['company_id'];

    const { updateEvent } = useEvent();

    const { updateCompany, company, fetchCompany } = useCompany();

    const handlePublish = async () => {
        try {
          // Upload event photos
          const eventPhotosNames = await Promise.all(
            eventPhotos?.map((photo, index) =>
              uploadFileToS3(photo, `event_photo_${index}`, userName, accessToken)
            )
          );
      
          // Upload event poster
          const eventPosterName = await uploadFileToS3(
            eventPoster,
            "event_poster",
            userName,
            accessToken
          );
      
          // Upload event video
          const eventVideoName = await uploadFileToS3(
            eventVideo,
            "event_video",
            userName,
            accessToken
          );
      
          // Create the updated event data object
          const eventData = {
            ...eventDetails,
            event_photos: eventPhotosNames,
            event_poster: eventPosterName,
            event_video: eventVideoName,
            organizer: userName,
            status: "draft",
          };
      
          // Update the event
          await updateEvent(eventID, eventData);

          fetchCompany();

          const companyData = {
            ...company,
            total_jobs: eventDetails?.roles?.length,
            username: userName
          }

          await updateCompany(companyID, companyData);

          removeCookie("company_id", { path: "/" });
          removeCookie("event_poster", { path: "/" });
          removeCookie("event_id", { path: "/" });
          removeCookie("event_photos", { path: "/" });
          removeCookie("event_video", { path: "/" });
          removeCookie("questions", { path: "/" });
          
          clearEventDetails();

          clearEventMedia();
          setLoading(false);
      
          // Redirect to the success page
          router.push("/event-success");
        } catch (error) {
          console.error("Error during event publication:", error);
        }
      };
      
      const handleSaveDraft = async () => {
        setLoading(true);
        try {
          // Upload event photos
          const eventPhotosNames = await Promise.all(
            eventPhotos?.map((photo, index) =>
              uploadFileToS3(photo, `event_photo_${index}`, userName, accessToken)
            )
          );
      
          // Upload event poster
          const eventPosterName = await uploadFileToS3(
            eventPoster,
            "event_poster",
            userName,
            accessToken
          );
      
          // Upload event video
          const eventVideoName = await uploadFileToS3(
            eventVideo,
            "event_video",
            userName,
            accessToken
          );
    
          const eventData = {
            ...eventDetails,
            organizer: userName,
            event_photos: eventPhotosNames,
            event_poster: eventPosterName,
            event_video: eventVideoName,
            status: "draft",
          };
      
          await updateEvent(eventID, eventData);

          removeCookie("company_id", { path: "/" });
          removeCookie("event_poster", { path: "/" });
          removeCookie("event_id", { path: "/" });
          removeCookie("event_photos", { path: "/" });
          removeCookie("event_video", { path: "/" });
          removeCookie("questions", { path: "/" });
          
          clearEventDetails();

          clearEventMedia();
          setLoading(false);
          router.push("/event-success");
        } catch (error) {
          console.error("Error during event draft save:", error);
        }
      };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    }

    if (loading) return <CreatingEvent />;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                justifyContent: 'center',
                padding: { xs: 2, md: 4 }, 
                pb: { xs: 3, md: 4 },
                width: '100%', 
                maxWidth: '800px', 
                margin: '0 auto', 
            }}
        >
            <OverviewHeaderWithProgressBar progressValue={100} />
            <EventOverview activeStep={activeStep} setActiveStep={setActiveStep} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    px: { xs: 2, md: 3 },
                    pt: 2,
                    pb: 5,
                    mt: 4,
                    backgroundColor: 'white',
                }}
            >
                <Button
                    variant="contained"
                    sx={{ 
                        backgroundColor: '#977342', 
                        color: 'white', 
                        '&:hover': { backgroundColor: '#fff', border: '1px solid #977342', color: '#977342' } 
                    }}
                    onClick={handleBack}
                >
                 Go Back
                </Button>
                <Button
                    onClick={handlePublish}
                    variant="outlined" 
                    sx={{
                        mr: 2, 
                        ml: 2,
                        color: '#977342',
                        border: '1px solid #977342',
                        width: { xs: '120px', md: '160px' }, 
                        backgroundColor: 'white',
                        '&:hover': {
                            color: '#CEAB76',
                            border: '1px solid #CEAB76',
                            backgroundColor: 'white'
                        }
                    }}
                    aria-label="Go Back"
                >
                    Submit for Review
                </Button>
            </Box>
        </Box>
    )
};

export default EventManager;