import * as React from "react";
import { Box, Typography, Paper, Button, Snackbar, Alert } from "@mui/material";
import { FileUpload } from "@/components/portal/profile/FileUpload";
import { useRouter } from "next/navigation";
import { useStore } from "zustand";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useTalentProfile } from "@/providers/talent-profile-provider";
import { uploadFileToS3 } from "@/services/s3UploadUtils";

const HeadshotUpload: React.FC = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [headshot, setHeadshot] = useState(null);

  const {
    fetchTalentProfile,
    signedUrls,
    deleteFiles,
    updateTalentProfile,
    talentProfile,
  } = useTalentProfile();

  const handleRemoveImage = () => {
    setHeadshot(null);
    setSnackbarMessage("Headshot Deleted Successfully");
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  };

  const [cookies] = useCookies(["user_role", "access", "username"]);

  const userName = cookies?.username || "";
  const accessToken = cookies?.access || "";

  const router = useRouter();

  const handleFileSelect = (file: File) => {
    console.log("Selected file:", file);
  };

  const handleFileChange = (event: React.ChangeEvent<any>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setHeadshot(objectUrl);
      setSnackbarMessage("Headshot Uploaded Successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    }
  };

  const onClose = () => {
    router.push("/portal");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const extractFilePath = (signedUrl: string) => {
    const parsedUrl = new URL(signedUrl);
    return parsedUrl.pathname.substring(1);
  };

  const handleSaveHeadshot = async () => {
    const headshotFileName = await uploadFileToS3(
      headshot,
      "headshot",
      userName,
      accessToken
    );

    const oldHeadshot = signedUrls?.headshot;

    const oldHeadshotName = extractFilePath(oldHeadshot);

    const updatedProfile = {
      ...talentProfile,
      username: userName,
      headshot: headshotFileName,
    };

    if (headshotFileName !== oldHeadshotName)
      await updateTalentProfile(userName, updatedProfile);
    await deleteFiles([oldHeadshotName]);

    fetchTalentProfile();

    setSnackbarMessage("Headshot Updated Successfully");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  useEffect(() => {
    fetchTalentProfile();
    setHeadshot(signedUrls?.headshot);
  }, [signedUrls]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          backgroundColor: "white",
        }}
      >
        {/* Upload Form Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: { xs: 2, md: 4 },
          }}
        >
          <Paper
            elevation={3}
            sx={{
              backgroundColor: "#fff",
              padding: { xs: 3, md: 4 },
              borderRadius: "8px",
              width: "100%",
              maxWidth: "800px",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#CEAB76", textAlign: "left", marginBottom: 2 }}
            >
              Upload Your Headshot
            </Typography>

            <FileUpload
              title=""
              supportedFormats="JPG, PNG"
              maxSize="5MB"
              onFileSelect={handleFileSelect}
              headshot={headshot}
              setHeadshot={setHeadshot}
              handleFileChange={handleFileChange}
              handleRemoveImage={handleRemoveImage}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                marginTop: 2,
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Button
                sx={{
                  color: "#000",
                  backgroundColor: "#CEAB76",
                  width: { xs: "100%", md: "auto" },
                  "&:hover": {
                    color: "white",
                  },
                }}
                onClick={handleSaveHeadshot}
              >
                Save Headshot
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
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
  );
};

export default HeadshotUpload;
