import * as React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useStore } from "zustand";
import useEventStore from "@/state/use-event-store";

type AgeSelectorProps = {
  label: string;
};

const AgeSelector: React.FC<AgeSelectorProps> = ({ label }) => {
  const { eventRole, setEventRole } = useStore(useEventStore); 
  const [age, setAge] = React.useState<number | string>(
    label === "Minimum Age" ? eventRole.minAge || "" : eventRole.maxAge || ""
  ); 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAge = event.target.value === "" ? "" : parseInt(event.target.value, 10);
    setAge(newAge); 

    // Update Zustand store based on label
    if (label === "Minimum Age") {
      setEventRole({ ...eventRole, minAge: Number(newAge) });
    } else if (label === "Maximum Age") {
      setEventRole({ ...eventRole, maxAge: Number(newAge) });
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1, width: "fit-content" }}>
      <Typography
        variant="body2"
        sx={{ paddingY: 1, color: "black", fontWeight: "bold" }}
      >
        {label}
      </Typography>
      <TextField
        type="number"
        value={age}
        onChange={handleChange}
        variant="outlined"
        sx={{
          marginTop: 2,
          bgcolor: "white",
          borderRadius: "8px",
          height: "50px",
          "& .MuiOutlinedInput-root": {
            border: "1px solid",
            borderColor: "grey.300",
          },
        }}
        inputProps={{
          "aria-label": label,
        }}
      />
    </Box>
  );
};

export default AgeSelector;