import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import { DeadlineForm } from "@/components/dashboard/event/DeadlineForm";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeadlineHeaderWithProgressBar from "@/components/dashboard/event/DeadlineHeaderWithProgressBar";
import { useStore } from "zustand";
import useEventStore, { EventRole } from "@/state/use-event-store";
import { useCookies } from "react-cookie";
import { useEvent } from "@/providers/event-provider";
import useCurrentEventStore from "@/state/use-current-event-store";

const EventDeadline: React.FC<PostEventStepProps> = ({
  activeStep,
  setActiveStep,
}) => {

  const { eventRole, eventDetails, setEventDetails, clearEventRole } = useStore(useEventStore);

  const { currentEvent } = useStore(useCurrentEventStore);

  const { updateEvent } = useEvent();

  const [cookies, removeCookie] = useCookies(['questions', 'event_id']);

  const eventID = cookies?.event_id;

  const handleSaveRole = async () => {

    const updatedEvent = {
      ...currentEvent,
      roles: [...currentEvent.roles, eventRole], 
    };

    clearEventRole();

    removeCookie("questions", { path: "/" });
    
    await updateEvent(eventID, updatedEvent);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

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
    </Box>
  );
};

export default EventDeadline;
