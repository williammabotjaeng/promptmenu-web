import React from "react";
import { LabelledInput, LabelledTextArea } from "@/components/dashboard/event/FormElements";
import { SectionHeader } from "@/components/dashboard/event/SectionHeader";
import { Box, Paper } from "@mui/material";

const RoleDetailsForm: React.FC = () => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignSelf: 'center', 
        p: { xs: 2, md: 4 }, 
        mt: 3, 
        mx: { xs: 2, md: 4 }, 
        width: { xs: '100%', md: '60%' },
        borderRadius: '16px' 
      }}
    >
      <SectionHeader>Role Details</SectionHeader>
      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2, color: 'black' }}>
        <LabelledInput label="Role Title" id="roleTitle" />
        <LabelledTextArea label="Detailed Description" id="detailedDescription" />
      </Box>
    </Paper>
  );
};

export default RoleDetailsForm;