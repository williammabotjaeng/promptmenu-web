import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import useEventStore from "@/state/use-event-store";

type LabelledInputProps = {
  label: string;
};

type LabelledTextAreaProps = {
  label: string;
};

export const LabelledInput: React.FC<LabelledInputProps> = ({ label }) => {
  const { eventRole, setEventRole } = useEventStore();

  const [roleTitle, setRoleTitle] = useState(eventRole?.title || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleTitle(e?.target?.value);
    setEventRole({ title: e.target.value, created_at: Date.now().toLocaleString() }); 
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", maxWidth: "100%" }}>
      <Typography variant="body1" sx={{ mb: 1, fontWeight: "bold" }}>
        {label}
      </Typography>
      <TextField
        type="text"
        value={roleTitle} 
        onChange={handleChange} 
        variant="outlined"
        sx={{ borderRadius: "8px", height: "50px" }}
        aria-label={label}
      />
    </Box>
  );
};

export const LabelledTextArea: React.FC<LabelledTextAreaProps> = ({ label }) => {
  const { eventRole, setEventRole } = useEventStore();

  const [roleDescription, setRoleDescription] = useState(eventRole?.description || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleDescription(e?.target?.value);
    setEventRole({ description: e.target.value }); 
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", mt: 2, maxWidth: "100%" }}>
      <Typography variant="body1" sx={{ mb: 1, fontWeight: "bold" }}>
        {label}
      </Typography>
      <TextField
        value={roleDescription} 
        onChange={handleChange}
        variant="outlined"
        multiline
        rows={4}
        sx={{ borderRadius: "8px" }}
        aria-label={label}
      />
    </Box>
  );
};