import React from "react";
import { Typography } from "@mui/material";

type SectionHeaderProps = {
  children: React.ReactNode;
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({ children }) => (
  <Typography 
    variant="h4" 
    sx={{ 
      pb: 3.5, 
      fontWeight: 'bold', 
      color: '#977342', 
      maxWidth: '100%' 
    }}
  >
    {children}
  </Typography>
);