import React from "react";
import { Box, TextField, Typography } from "@mui/material";

type LabelledInputProps = {
  label: string;
  id: string;
};

type LabelledTextAreaProps = {
  label: string;
  id: string;
};

export const LabelledInput: React.FC<LabelledInputProps> = ({ label, id }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '100%' }}>
    <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
      {label}
    </Typography>
    <TextField
      type="text"
      id={id}
      variant="outlined"
      sx={{ borderRadius: '8px', height: '50px' }}
      aria-label={label}
    />
  </Box>
);

export const LabelledTextArea: React.FC<LabelledTextAreaProps> = ({ label, id }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2, maxWidth: '100%' }}>
    <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
      {label}
    </Typography>
    <TextField
      id={id}
      variant="outlined"
      multiline
      rows={4}
      sx={{ borderRadius: '8px' }}
      aria-label={label}
    />
  </Box>
);