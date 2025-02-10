import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import { DeadlineForm } from "@/components/dashboard/event/DeadlineForm";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeadlineHeaderWithProgressBar from "./DeadlineHeaderWithProgressBar";

const EventDeadline: React.FC<PostEventStepProps> = ({
  activeStep,
  setActiveStep,
}) => {
  const handleContinue = () => {
    setActiveStep(activeStep + 1);
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
      <DeadlineForm onSubmit={null} />
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
            backgroundColor: "#977342",
            color: "white",
            "&:hover": {
              backgroundColor: "#fff",
              border: "1px solid #977342",
              color: "#977342",
            },
          }}
          onClick={handleContinue}
        >
          Next Step
          <ArrowForwardIcon sx={{ marginLeft: "8px" }} />
        </Button>
      </Box>
    </Box>
  );
};

export default EventDeadline;
