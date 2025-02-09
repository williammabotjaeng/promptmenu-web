import * as React from "react";
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Chip } from "@mui/material";
import { useStore } from "zustand";
import useEventStore from "@/state/use-event-store";
import CloseIcon from "@mui/icons-material/Close";

type GenderSelectorProps = {
  label: string;
};

const GenderSelector: React.FC<GenderSelectorProps> = ({ label }) => {
  const { eventRole, setEventRole } = useStore(useEventStore); 
  const [genders, setGenders] = React.useState<string[]>(Array.from(eventRole?.genders) || []); 

  const handleChange = (event: React.ChangeEvent<any>) => {
    const selectedGenders = event.target.value as string[];
    setGenders(selectedGenders); 
    setEventRole({ ...eventRole, genders: selectedGenders }); 
  };

  const handleDelete = (genderToDelete: string) => {
    const updatedGenders = genders.filter((gender) => gender !== genderToDelete);
    setGenders(updatedGenders); 
    setEventRole({ ...eventRole, genders: updatedGenders }); 
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

      {/* Multi-Select Dropdown */}
      <FormControl fullWidth sx={{ bgcolor: "white", borderRadius: "8px" }}>
        <InputLabel id="gender-select-label">{label}</InputLabel>
        <Select
          labelId="gender-select-label"
          multiple
          value={genders}
          onChange={handleChange}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {(selected as string[]).map((value) => (
                <Chip
                  key={value}
                  label={value}
                  onDelete={() => handleDelete(value)} 
                  deleteIcon={<CloseIcon />}
                />
              ))}
            </Box>
          )}
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