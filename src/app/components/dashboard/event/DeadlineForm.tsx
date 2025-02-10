import * as React from "react";
import { DateTimePicker } from "./DeadlineDateTimePicker";
import { DeadlineFormProps } from "@/types/Props/DeadlineFormProps";
import { Box, TextField, Typography } from "@mui/material";
import { useStore } from "zustand";
import useEventStore from "@/state/use-event-store";

export const DeadlineForm: React.FC<DeadlineFormProps> = () => {
  const { eventRole, setEventRole } = useStore(useEventStore);

  const [formData, setFormData] = React.useState({
    softDeadline: eventRole.softDeadline || "",
    hardDeadline: eventRole.hardDeadline || "",
    notes: eventRole.notes || "",
  });

  // Handle input changes and update both local state and Zustand store
  const handleChange = (field: keyof typeof formData, value: string) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);

    setEventRole({
      ...eventRole,
      ...updatedFormData,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingBottom: "16px",
        marginTop: "24px",
        width: "70%",
      }}
    >
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="body2" sx={{ color: "#374151" }}>
          By when do you want to stop receiving applications.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
        {/* Soft Deadline */}
        <DateTimePicker
          label="Soft Deadline"
          value={formData.softDeadline}
          onChange={(value) => handleChange("softDeadline", value)}
        />

        {/* Hard Deadline */}
        <DateTimePicker
          label="Hard Deadline"
          value={formData.hardDeadline}
          onChange={(value) => handleChange("hardDeadline", value)}
        />
      </Box>

      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="body2" sx={{ color: "#374151", fontWeight: "medium" }}>
          Any notes or remarks?
        </Typography>
        <TextField
          id="notes"
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)} // Update notes
          multiline
          rows={4}
          variant="outlined"
          sx={{
            marginTop: 1,
            width: { md: "100%", xs: "143%" },
          }}
        />
      </Box>
    </Box>
  );
};