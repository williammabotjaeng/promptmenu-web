import * as React from "react";
import SectionTabs from './SectionTabs';
import RoleRequirement from './RoleRequirement';
import { 
  Box, 
  Button, 
  Typography, 
  Card, 
  Divider, 
  Fade, 
  Stack,
  Chip 
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import PublishIcon from '@mui/icons-material/Publish';
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import OverviewHeaderWithProgressBar from "@/components/dashboard/event/OverviewHeaderWithProgressBar";
import RoleDetailsForm from "@/components/dashboard/event/RoleDetailsForm";
import EventOverview from "./EventOverview";
import { useStore } from "zustand";
import { useRouter } from "next/navigation";
import useEventStore from "@/state/use-event-store";
import { useEvent } from "@/providers/event-provider";
import { useCompany } from "@/providers/company-provider";
import { useCookies } from "react-cookie";
import { uploadFileToS3 } from "@/services/s3UploadUtils";
import CreatingEvent from "@/components/CreatingEvent";
import { useState, useEffect } from "react";

const EventManager: React.FC<PostEventStepProps> = ({ activeStep, setActiveStep }) => {
    const { 
      eventDetails, 
      clearEventDetails, 
      clearEventMedia, 
      eventMedia,
      setEventDetails
    } = useStore(useEventStore);
    
    const [loading, setLoading] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [cookies, removeCookie] = useCookies([
      'event_id', 'username', 
      'access', 'event_video',
      'event_photos','event_poster',
      'company_id', 'questions'
    ]);

    useEffect(() => {
      setAnimate(true);
    }, []);

    const router = useRouter();

    const eventID = cookies['event_id'];
    const userName = cookies['username'];
    const accessToken = cookies['access'];
    const eventPhotos = Array?.from(cookies['event_photos'] || []);
    const eventVideo = cookies['event_video'];
    const eventPoster = cookies['event_poster'];
    const companyID = cookies['company_id'];

    const { updateEvent } = useEvent();
    const { updateCompany, company, fetchCompany } = useCompany();

    const updateAllRolesWithPoster = (eventPosterName) => {
      if (!eventDetails.roles || eventDetails.roles.length === 0) return;
      
      // Map over existing roles and update each one with the eventPoster
      const updatedRoles = eventDetails.roles.map(role => ({
        ...role,
        eventPoster: eventPosterName
      }));
      
      // Update the store with the modified roles array
      setEventDetails({
        ...eventDetails,
        roles: updatedRoles
      });
    };

    const handlePublish = async () => {
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

          await updateAllRolesWithPoster(eventPosterName);
      
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
          setLoading(false);
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
        setLoading(false);
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
            
            <Fade in={animate} timeout={800}>
                <Card
                    elevation={3}
                    sx={{
                        borderRadius: "16px",
                        overflow: "hidden",
                        mb: 4,
                        background: "linear-gradient(to bottom, #ffffff, #f9f7f3)",
                        boxShadow: "0px 8px 25px rgba(151, 115, 66, 0.15)",
                    }}
                >
                    <Box sx={{ 
                        p: 3, 
                        backgroundColor: "#977342", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "space-between",
                        position: "relative",
                        overflow: "hidden"
                    }}>
                        <Box sx={{ zIndex: 1 }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    color: "white",
                                    fontWeight: "700",
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                <CheckCircleIcon sx={{ mr: 1.5 }} />
                                Final Review
                            </Typography>
                            
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "rgba(255, 255, 255, 0.9)",
                                    mt: 0.5,
                                    maxWidth: "80%"
                                }}
                            >
                                Review your event details before submission
                            </Typography>
                        </Box>
                        
                        <Chip 
                            label="Complete" 
                            color="success"
                            size="small"
                            sx={{ 
                                bgcolor: "rgba(76, 175, 80, 0.2)",
                                color: "white",
                                fontWeight: "medium",
                                border: "1px solid rgba(76, 175, 80, 0.3)",
                                zIndex: 1
                            }} 
                        />
                        
                        {/* Decorative background elements */}
                        <Box sx={{
                            position: "absolute",
                            top: "-50%",
                            right: "-10%",
                            width: "200px",
                            height: "200px",
                            borderRadius: "100px",
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            zIndex: 0
                        }} />
                        
                        <Box sx={{
                            position: "absolute",
                            bottom: "-60%",
                            right: "20%",
                            width: "150px",
                            height: "150px",
                            borderRadius: "75px",
                            backgroundColor: "rgba(255, 255, 255, 0.08)",
                            zIndex: 0
                        }} />
                    </Box>
                    
                    <Box sx={{ p: { xs: 2, md: 4 } }}>
                        <EventOverview activeStep={activeStep} setActiveStep={setActiveStep} />
                        
                        <Divider sx={{ my: 3 }} />
                        
                        <Box sx={{ 
                            p: 3, 
                            backgroundColor: "rgba(151, 115, 66, 0.08)", 
                            borderRadius: "12px",
                            border: "1px dashed rgba(151, 115, 66, 0.3)",
                            mb: 2
                        }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "600", color: "#977342", mb: 1 }}>
                                Ready for submission
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#555" }}>
                                Your event has been configured with {eventDetails?.roles?.length || 0} role(s) and is ready to be submitted. 
                                You can either submit it for immediate review or save it as a draft to continue editing later.
                            </Typography>
                        </Box>
                    </Box>
                </Card>
            </Fade>
            
            <Fade in={animate} timeout={1000}>
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={2}
                    justifyContent="flex-end"
                    sx={{ mt: 2 }}
                >
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={handleBack}
                        sx={{ 
                            color: '#977342',
                            borderColor: '#977342',
                            borderRadius: '8px',
                            py: 1.5,
                            px: 3,
                            fontWeight: "500",
                            order: { xs: 3, md: 1 },
                            '&:hover': { 
                                borderColor: '#CEAB76',
                                color: '#CEAB76',
                                backgroundColor: 'rgba(151, 115, 66, 0.04)'
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Go Back
                    </Button>
                    
                    <Button
                        variant="outlined"
                        startIcon={<SendIcon />}
                        onClick={handlePublish}
                        sx={{ 
                            color: '#977342',
                            borderColor: '#977342',
                            borderRadius: '8px',
                            py: 1.5,
                            px: 3,
                            fontWeight: "500",
                            order: { xs: 2, md: 2 },
                            '&:hover': { 
                                borderColor: '#CEAB76',
                                color: '#CEAB76',
                                backgroundColor: 'rgba(151, 115, 66, 0.04)'
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Save as Draft
                    </Button>
                    
                    <Button
                        variant="contained"
                        endIcon={<PublishIcon />}
                        onClick={handlePublish}
                        sx={{ 
                            backgroundColor: '#977342',
                            color: 'white',
                            borderRadius: '8px',
                            py: 1.5,
                            px: 3,
                            fontWeight: "500",
                            order: { xs: 1, md: 3 },
                            boxShadow: '0 4px 10px rgba(151, 115, 66, 0.3)',
                            '&:hover': { 
                                backgroundColor: '#CEAB76',
                                boxShadow: '0 6px 15px rgba(151, 115, 66, 0.4)'
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Submit for Review
                    </Button>
                </Stack>
            </Fade>
        </Box>
    );
};

export default EventManager;