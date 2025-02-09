import * as React from "react";
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useStore } from "zustand";
import useEventStore from "@/state/use-event-store";

type EthnicitySelectorProps = {
  label: string;
};

const EthnicitySelector: React.FC<EthnicitySelectorProps> = ({ label }) => {
  const { eventRole, setEventRole } = useStore(useEventStore); 
  const [ethnicities, setEthnicities] = React.useState<string[]>(Array.from(eventRole.ethnicities) || []);

  // Synchronize local state with Zustand store when the component mounts
  React.useEffect(() => {
    setEthnicities(eventRole.ethnicities || []);
  }, [eventRole.ethnicities]);

  const handleChange = (event: React.ChangeEvent<any>) => {
    const updatedEthnicities = event.target.value as string[];
    setEthnicities(updatedEthnicities); 
    setEventRole({
      ...eventRole,
      ethnicities: updatedEthnicities, 
    });
  };

  // Common ethnicities in the UAE
  const ethnicitiesList = [
    "Emirati",
    "Indian",
    "Pakistani",
    "Bangladeshi",
    "Filipino",
    "Egyptian",
    "Jordanian",
    "Syrian",
    "Lebanese",
    "Sudanese",
    "Other",
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", marginTop: 2, width: "100%", bgcolor: "transparent" }}>
      {/* Label */}
      <Typography
        variant="body2"
        sx={{ paddingY: 1, color: "black", fontWeight: "bold", whiteSpace: "nowrap" }}
      >
        {label}
      </Typography>

      {/* Multi-Select Dropdown */}
      <FormControl fullWidth sx={{ bgcolor: "white", borderRadius: "8px" }}>
        <InputLabel id="ethnicity-select-label">{label}</InputLabel>
        <Select
          labelId="ethnicity-select-label"
          multiple
          value={ethnicities}
          onChange={handleChange}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {(selected as string[]).map((value) => (
                <Chip
                  key={value}
                  label={value}
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
          {ethnicitiesList.map((ethnicity) => (
            <MenuItem key={ethnicity} value={ethnicity}>
              {ethnicity}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default EthnicitySelector;