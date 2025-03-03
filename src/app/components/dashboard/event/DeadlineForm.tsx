import * as React from "react";
import { DateTimePicker } from "./DeadlineDateTimePicker";
import { Box, TextField, Typography } from "@mui/material";
import { useStore } from "zustand";
import { useCookies } from "react-cookie";
import useEventStore from "@/state/use-event-store";

export const DeadlineForm: React.FC = () => {
  const { eventRole, setEventRole } = useStore(useEventStore);

  const [cookies] = useCookies([
    'company_id',
    'event_id'
  ]);

  const companyID = cookies['company_id'];
  const eventID = cookies['event_id'];

  const [formData, setFormData] = React.useState({
    softDeadline: eventRole.softDeadline || "",
    hardDeadline: eventRole.hardDeadline || "",
    notes: eventRole.notes || "",
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);

    setEventRole({
      ...eventRole,
      company_id: companyID,
      event: eventID,
      ...updatedFormData
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
          onChange={(e) => handleChange("notes", e.target.value)} 
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