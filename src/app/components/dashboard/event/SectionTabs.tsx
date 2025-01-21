import * as React from "react";
import { Box, Typography } from "@mui/material";

interface SectionTabsProps {
  sections: string[];
}

const SectionTabs: React.FC<SectionTabsProps> = ({ sections }) => (
  <Box 
    sx={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 2, 
      justifyContent: 'space-between', 
      mt: 2, 
      width: '100%', 
      maxWidth: '1052px' 
    }}
  >
    {/* Left Section */}
    <Box 
      sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        flex: 1, 
        gap: 4, 
        pb: 2 
      }}
    >
      {sections.map((section, index) => (
        <Typography 
          key={index} 
          variant="body1" 
          sx={{ 
            fontWeight: 'medium', 
            color: 'text.secondary' 
          }}
        >
          {section}
        </Typography>
      ))}
    </Box>

    {/* Right Section */}
    <Typography 
      variant="body1" 
      sx={{ 
        alignSelf: 'flex-start', 
        color: 'text.secondary' 
      }}
    >
      Questions
    </Typography>
  </Box>
);

export default SectionTabs;