import * as React from "react";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import { DeadlineForm } from "@/components/dashboard/event/DeadlineForm";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeadlineHeaderWithProgressBar from "@/components/dashboard/event/DeadlineHeaderWithProgressBar";
import { useStore } from "zustand";
import useEventStore, { EventRole } from "@/state/use-event-store";
import { useCookies } from "react-cookie";
import { useEvent } from "@/providers/event-provider";
import useCurrentEventStore from "@/state/use-current-event-store";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AddingRole from "../../AddingRole";

const EventDeadline: React.FC<PostEventStepProps> = ({
  activeStep,
  setActiveStep,
}) => {

  const { eventRole, eventDetails, setEventDetails, clearEventRole } = useStore(useEventStore);

  const { currentEvent } = useStore(useCurrentEventStore);

  const { updateEvent } = useEvent();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [cookies, removeCookie] = useCookies(['questions', 'event_id', 'current_event']);

  const eventID = cookies?.event_id;

  const thisEvent = cookies?.current_event;

  const handleSaveRole = async () => {
    
    setLoading(true);

    console.log("Current Event:", eventRole);

    const updatedEvent = {
      ...currentEvent,
      roles: [eventRole], 
    };

    console.log("Updated Event:", updatedEvent);

    clearEventRole();

    removeCookie("questions", { path: "/" });
    
    await updateEvent(eventID, updatedEvent);

    setLoading(false);
    setSnackbarMessage("Event Added Successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);

    router.push(`/event/${eventID}`);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) return <AddingRole />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        justifyContent: "center",
        padding: { xs: 2, md: 4 },
        pb: { xs: 9, md: 4 },
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <DeadlineHeaderWithProgressBar progressValue={85} indexValue={2 * 2} />
      <Typography
        sx={{
          color: "#977342",
          fontSize: { xs: "20px", md: "24px" },
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        Application Deadline
      </Typography>
      <br />
      <DeadlineForm />
      {/* Submit Button */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: "space-evenly",
          padding: 4,
          mt: 2,
          mr: { md: 26 },
        }}
      >
        <Button
          variant="contained"
          sx={{
            px: 4,
            py: 2,
            mr: { xs: null, sm: null, md: 4 },
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
            backgroundColor: "#977342",
            color: "white",
            mt: { xs: 2, sm: 2, md: 0 },
            "&:hover": {
              backgroundColor: "#fff",
              border: "1px solid #977342",
              color: "#977342",
            },
          }}
          onClick={handleSaveRole}
        >
          Save Role
          <ArrowForwardIcon sx={{ marginLeft: "8px" }} />
        </Button>
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

export default EventDeadline;
