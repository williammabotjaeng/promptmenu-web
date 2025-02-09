import * as React from "react";
import { Box, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useState } from "react";
import { useStore } from "zustand";
import useEventStore from "@/state/use-event-store";

type GenderSelectorProps = {
  label: string;
};

const GenderSelector: React.FC<GenderSelectorProps> = ({
  label,
}) => {
  
  const { eventRole, setEventRole } = useStore(useEventStore);

  const [gender, setGender] = useState("male");
  
  const handleChange = (event: React.ChangeEvent<any>) => {
    setGender(event.target.value as string); 
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", bgcolor: "transparent" }}>
      {/* Label */}
      <Typography
        variant="body2"
        sx={{ paddingTop: "1px", paddingBottom: "10px", fontWeight: "bold", color: "black" }}
      >
        {label}
      </Typography>

      {/* Select Dropdown */}
      <FormControl fullWidth sx={{ bgcolor: "white", borderRadius: "8px" }}>
        <InputLabel id="gender-select-label">{label}</InputLabel>
        <Select
          labelId="gender-select-label"
          value={gender}
          onChange={handleChange}
          sx={{
            borderRadius: "8px",
            padding: "8px 10px",
            border: "1px solid",
            borderColor: "grey.300",
          }}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="unisex">Unisex</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default GenderSelector;