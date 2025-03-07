import * as React from "react";
import GenderSelector from "@/components/dashboard/event/GenderSelector";
import AgeSelector from "@/components/dashboard/event/AgeSelector";
import EthnicitySelector from "@/components/dashboard/event/EthnicitySelector";
import { Box, Typography } from "@mui/material";
import { useStore } from "zustand";
import useEventStore from "@/state/use-event-store";

const DemographicsForm = () => {
  const [minAge, setMinAge] = React.useState<number | string>("");
  const [maxAge, setMaxAge] = React.useState<number | string>("");
  const [minAgeError, setMinAgeError] = React.useState<string>("");
  const [maxAgeError, setMaxAgeError] = React.useState<string>("");

  const { eventRole, setEventRole } = useStore(useEventStore);

  const validateAges = (
    newMinAge: number | string,
    newMaxAge: number | string
  ) => {
    let minError = "";
    let maxError = "";

    if (
      newMinAge !== "" &&
      (Number(newMinAge) < 0 || Number(newMinAge) > 100)
    ) {
      minError = "Minimum age must be between 0 and 100.";
    }

    if (
      newMaxAge !== "" &&
      (Number(newMaxAge) < 0 || Number(newMaxAge) > 100)
    ) {
      maxError = "Maximum age must be between 0 and 100.";
    }

    if (
      newMinAge !== "" &&
      newMaxAge !== "" &&
      Number(newMinAge) >= Number(newMaxAge)
    ) {
      minError = "Minimum age must be less than maximum age.";
      maxError = "Maximum age must be greater than minimum age.";
    }

    if (
      newMinAge !== "" &&
      newMaxAge !== "" &&
      Number(newMinAge) === Number(newMaxAge)
    ) {
      minError = "Minimum and maximum ages cannot be equal.";
      maxError = "Minimum and maximum ages cannot be equal.";
    }

    setMinAgeError(minError);
    setMaxAgeError(maxError);

    return !minError && !maxError;
  };

  const handleMinAgeChange = (newMinAge: number | string) => {
    setMinAge(newMinAge);
    validateAges(newMinAge, maxAge);
    setEventRole({
      ...eventRole,
      minAge: newMinAge
    });
  };

  const handleMaxAgeChange = (newMaxAge: number | string) => {
    setMaxAge(newMaxAge);
    validateAges(minAge, newMaxAge);
    setEventRole({
      ...eventRole,
      maxAge: newMaxAge
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        padding: { xs: 2, md: 4 },
        marginTop: 3,
        marginLeft: { xs: 0, md: 4 },
        width: { xs: "100%", sm: "100%", md: "100vw" },
        bgcolor: "white",
        borderRadius: "16px",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)"
      }}
    >
      <Typography
        variant="h4"
        sx={{ paddingBottom: 1.5, color: "#977342", fontWeight: "bold" }}
      >
        Demographics
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: 2,
          width: "100%",
          color: "black",
        }}
      >
        <GenderSelector label={"Gender Preference"} />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            marginTop: 2,
            fontSize: { xs: "0.75rem", md: "0.875rem" },
            fontWeight: "medium",
          }}
        >
          <AgeSelector
            label="Minimum Age"
            value={minAge}
            onChange={handleMinAgeChange}
            error={minAgeError}
          />
          <AgeSelector
            label="Maximum Age"
            value={maxAge}
            onChange={handleMaxAgeChange}
            error={maxAgeError}
          />
        </Box>
        <EthnicitySelector label={"Preferred Ethnicities"} />
      </Box>
    </Box>
  );
};

export default DemographicsForm;
