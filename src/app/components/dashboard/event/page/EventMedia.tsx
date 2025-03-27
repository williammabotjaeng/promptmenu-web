"use client";

import * as React from "react";
import { 
  Box, 
  Button, 
  Typography, 
  Card, 
  CardContent, 
  Divider, 
  Paper, 
  Grid, 
  IconButton, 
  Tooltip, 
  Fade, 
  alpha,
  Container
} from "@mui/material";
import { EventUploadSection } from "@/components/dashboard/event/page/EventUploadSection";
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import EventIconOne from "@/assets/event_icon_one.svg";
import EventIconTwo from "@/assets/event_icon_two.svg";
import EventIconThree from "@/assets/event_icon_three.svg";
import { EventMediaType } from "@/state/use-event-store";
import { useCookies } from "react-cookie";
import SaveIcon from "@mui/icons-material/Save";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PhotoGrid from "./PhotoGrid";
import SingleVideo from "./SingleVideo";
import SingleImage from "./ImageUploader";
import { useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";
import FetchingEventMedia from "../../FetchingEventMedia";

interface EventMediaProps {
  eventPhotos: string[];
  eventPoster: string;
  eventVideo: string;
  imagesToDelete: string[];
  imagesToBeAdded: string[];
  onImageUpload: (newImages: string[]) => void;
  onImageDelete: (image: string) => void;
  onPosterUpload: (event: React.ChangeEvent<any>) => void;
  onPosterDelete: () => void;
  onVideoUpload: (video: string) => void;
  onVideoDelete: () => void;
  onSaveEventMedia: () => void;
}

export const EventMedia: React.FC<EventMediaProps> = ({
  eventPhotos,
  eventPoster,
  eventVideo,
  imagesToDelete,
  imagesToBeAdded,
  onImageUpload,
  onImageDelete,
  onPosterUpload,
  onPosterDelete,
  onVideoUpload,
  onVideoDelete,
  onSaveEventMedia,
}) => {
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      setFadeIn(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <FetchingEventMedia />;

  return (
    <Box
      sx={{
        backgroundColor: "#f8f9fa",
        padding: { xs: 2, sm: 3, md: 4 },
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Fade in={fadeIn} timeout={800}>
          <Box>
            {/* Header */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: "12px",
                backgroundColor: "#977342",
                color: "white",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box sx={{ position: "relative", zIndex: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  Event Media Assets
                </Typography>
                <Typography variant="body2" sx={{ maxWidth: "70%", opacity: 0.9 }}>
                  Upload high-quality images and video to showcase your event. Quality media helps attract better talent.
                </Typography>
              </Box>
              
              {/* Decorative background element */}
              <Box
                sx={{
                  position: "absolute",
                  right: { xs: -80, md: 0 },
                  top: { xs: -20, md: -40 },
                  opacity: 0.15,
                  transform: "rotate(-10deg)",
                  zIndex: 1,
                }}
              >
                <PhotoLibraryIcon sx={{ fontSize: 180 }} />
              </Box>
            </Paper>

            <Grid container spacing={3}>
              {/* Event Photos Section */}
              <Grid item xs={12} md={8}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "#f5f7fa",
                      borderBottom: "1px solid rgba(0,0,0,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <PhotoLibraryIcon sx={{ color: "#977342", mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Event Photos
                      </Typography>
                    </Box>
                    <Tooltip title="Upload multiple photos to showcase your event">
                      <InfoOutlinedIcon sx={{ color: "text.secondary", fontSize: "1rem" }} />
                    </Tooltip>
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <PhotoGrid
                      images={eventPhotos}
                      onImageUpload={onImageUpload}
                      onDeleteImage={onImageDelete}
                      imagesToDelete={[]}
                    />
                  </CardContent>
                </Card>
              </Grid>

              {/* Poster and Video Section */}
              <Grid item xs={12} md={4}>
                <Grid container spacing={3} direction="column">
                  {/* Event Poster */}
                  <Grid item>
                    <Card
                      elevation={0}
                      sx={{
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: "#f5f7fa",
                          borderBottom: "1px solid rgba(0,0,0,0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <ImageIcon sx={{ color: "#977342", mr: 1 }} />
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Event Poster
                          </Typography>
                        </Box>
                        <Tooltip title="Upload a main promotional image">
                          <InfoOutlinedIcon sx={{ color: "text.secondary", fontSize: "1rem" }} />
                        </Tooltip>
                      </Box>
                      <CardContent sx={{ p: 3 }}>
                        <ImageUploader
                          image={eventPoster}
                          onImageUpload={onPosterUpload}
                          onDeleteImage={onPosterDelete}
                        />
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Event Video */}
                  <Grid item>
                    <Card
                      elevation={0}
                      sx={{
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: "#f5f7fa",
                          borderBottom: "1px solid rgba(0,0,0,0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <VideocamIcon sx={{ color: "#977342", mr: 1 }} />
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Event Video
                          </Typography>
                        </Box>
                        <Tooltip title="Upload a promotional video clip">
                          <InfoOutlinedIcon sx={{ color: "text.secondary", fontSize: "1rem" }} />
                        </Tooltip>
                      </Box>
                      <CardContent sx={{ p: 3 }}>
                        <SingleVideo
                          video={eventVideo}
                          onVideoUpload={onVideoUpload}
                          onDeleteVideo={onVideoDelete}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* Submit Button and Help Text */}
            <br />
            <br />
            <br />
            <br />
            <br />
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "stretch", md: "center" },
                mt: 4,
                pt: 3,
                borderTop: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: "8px",
                  bgcolor: alpha("#977342", 0.08),
                  border: `1px dashed ${alpha("#977342", 0.3)}`,
                  maxWidth: { xs: "100%", md: "60%" },
                  mb: { xs: 2, md: 0 },
                }}
              >
                <Typography variant="body2" sx={{ color: "#977342" }}>
                  <strong>Pro tip:</strong> High-quality visuals significantly increase interest from potential talent. 
                  Optimal poster dimensions are 800×1200px for best display across platforms.
                </Typography>
              </Paper>

              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={onSaveEventMedia}
                sx={{
                  backgroundColor: "#977342",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  borderRadius: "8px",
                  fontWeight: 500,
                  boxShadow: "0 4px 12px rgba(151, 115, 66, 0.2)",
                  "&:hover": {
                    backgroundColor: "#CEAB76",
                  },
                }}
              >
                Save Media
              </Button>
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};