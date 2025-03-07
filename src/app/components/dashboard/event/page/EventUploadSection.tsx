import * as React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import useEventStore, { EventMediaType } from "@/state/use-event-store";
import { useCookies } from "react-cookie";

interface EventUploadSectionProps {
  title: keyof EventMediaType;
  icon: string;
  buttonText: string;
  description: string;
  type: "single" | "multiple";
  mediaType: "photo" | "video";
  onSave: () => void;
}

export const EventUploadSection: React.FC<EventUploadSectionProps> = ({
  title,
  icon,
  buttonText,
  description,
  type,
  mediaType,
  onSave,
}) => {
  const { eventMedia, setEventMedia } = useEventStore();
  const [selectedFiles, setSelectedFiles] = React.useState<any[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [cookies, setCookie] = useCookies([
    "event_poster",
    "event_photos",
    "event_video",
  ]);

  const titleMapping: Record<keyof EventMediaType, string> = {
          'eventPromoVideo': 'Promo Video',
          'eventPhotos': 'Event Photos',
          'eventPoster': 'Event Poster',
  };

  // Define a mapping from EventMediaType keys to cookie names
const titleToCookieMap: Record<keyof EventMediaType, 'event_poster' | 'event_photos' | 'event_video'> = {
  eventPoster: 'event_poster',
  eventPhotos: 'event_photos',
  eventPromoVideo: 'event_video',
};

  // Trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Use useRef to trigger the file input
  };

  // Handle proceed action
  const handleProceed = () => {
    onSave();
  };

  // Initialize selected files from the store or cookies
  React.useEffect(() => {
    const cookieKey = titleToCookieMap[title];
    const storedMedia = eventMedia[title];

    if (storedMedia) {
      // Initialize from the store
      if (type === "single" && storedMedia instanceof File) {
        setSelectedFiles([storedMedia]);
      } else if (type === "multiple" && Array.isArray(storedMedia)) {
        setSelectedFiles(storedMedia);
      }
    } else if (cookies[cookieKey]) {
      // Initialize from cookies
      if (type === "single") {
        const blobUrl = cookies[cookieKey];
        const file = new File([], "file_from_cookie", { type: "application/octet-stream" }); // Placeholder file
        setSelectedFiles([file]);
        setEventMedia(title, file);
      } else if (type === "multiple") {
        const blobUrls = JSON.parse(cookies[cookieKey]);
        const files = blobUrls.map(
          (url: string) => new File([], "file_from_cookie", { type: "application/octet-stream" }) 
        );
        setSelectedFiles(files);
        setEventMedia(title, files);
      }
    }
  }, [title, type, eventMedia, cookies, setEventMedia]);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);

      // Map the title to the corresponding cookie name
      const cookieKey = titleToCookieMap[title];

      if (type === "single") {
        const file = filesArray[0];
        setSelectedFiles([file]);
        setEventMedia(title, file);

        // Convert file to a blob URL and set it as a cookie
        const blobUrl = URL.createObjectURL(file);
        setCookie(cookieKey, blobUrl, { path: "/" });
      } else {
        setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
        setEventMedia(title, [...(eventMedia[title] as File[]), ...filesArray]);

        // Convert files to blob URLs and set them as a cookie (array of URLs)
        const blobUrls = filesArray.map((file) => URL.createObjectURL(file));
        setCookie(cookieKey, JSON.stringify(blobUrls), { path: "/" });
      }
    }
  };

  function handleDeleteFile(index: number): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: { xs: 2, sm: 3 },
        borderRadius: 2,
        backgroundColor: "rgba(151, 115, 66, 0.1)",
        width: { xs: "100%", sm: "80%", md: "60%" },
        margin: "0 auto",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          paddingBottom: 1,
          color: "#977342",
          textAlign: "center",
        }}
      >
        {titleMapping[title]}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
          marginTop: 2,
          border: "2px dashed",
          borderColor: "rgba(151, 115, 66, 0.5)",
          borderRadius: 2,
          backgroundColor: "transparent",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "300px", // Larger poster preview
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100px",
              minHeight: "80px",
            }}
          >
            <img
              loading="lazy"
              src={icon}
              alt={title}
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
              }}
            />
          </Box>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "#CEAB76",
              marginTop: 1,
            }}
          >
            {description}
          </Typography>
          <Button
            variant="contained"
            onClick={handleButtonClick}
            sx={{
              marginTop: 2,
              backgroundColor: "#977342",
              color: "white",
              "&:hover": {
                backgroundColor: "#CEAB76",
              },
              width: "100%",
            }}
          >
            {buttonText}
          </Button>
          {/* Hidden file input */}
          <input
            ref={fileInputRef} // Attach useRef to the file input
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
            multiple={type === "multiple"} // Allow multiple file selection if type is 'multiple'
          />
        </Box>
        {/* Display uploaded files */}
        <Box sx={{ marginTop: 3, width: "100%" }}>
          {type === "single" && selectedFiles.length > 0 && (
            <Box sx={{ textAlign: "center" }}>
              {mediaType === "photo" ? (
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <img
                    src={URL.createObjectURL(selectedFiles[0])}
                    alt="Uploaded"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "500px", // Larger preview
                      borderRadius: "8px",
                    }}
                  />
                  <Button
                    onClick={() => handleDeleteFile(0)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: "rgba(255, 0, 0, 0.8)",
                      color: "white",
                      borderRadius: "50%",
                      minWidth: "32px",
                      minHeight: "32px",
                      "&:hover": {
                        backgroundColor: "rgba(255, 0, 0, 1)",
                      },
                    }}
                  >
                    🗑️
                  </Button>
                </Box>
              ) : (
                <video
                  controls
                  style={{
                    width: "100%",
                    height: "100vh", // Full height of the viewport
                    borderRadius: "8px",
                  }}
                >
                  <source
                    src={URL.createObjectURL(selectedFiles[0])}
                    type={selectedFiles[0].type}
                  />
                  Your browser does not support the video tag.
                </video>
              )}
            </Box>
          )}
          {type === "multiple" && selectedFiles.length > 0 && (
            <Grid container spacing={2}>
              {selectedFiles.map((file, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box sx={{ position: "relative" }}>
                    {mediaType === "photo" ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Uploaded ${index}`}
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "8px",
                        }}
                      />
                    ) : (
                      <video
                        controls
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "8px",
                        }}
                      >
                        <source
                          src={URL.createObjectURL(file)}
                          type={file.type}
                        />
                        Your browser does not support the video tag.
                      </video>
                    )}
                    <Button
                      onClick={() => handleDeleteFile(index)}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        backgroundColor: "rgba(255, 0, 0, 0.8)",
                        color: "white",
                        borderRadius: "50%",
                        minWidth: "32px",
                        minHeight: "32px",
                        "&:hover": {
                          backgroundColor: "rgba(255, 0, 0, 1)",
                        },
                      }}
                    >
                      🗑️
                    </Button>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
};
