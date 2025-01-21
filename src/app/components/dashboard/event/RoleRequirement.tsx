import * as React from "react";
import { Box, Typography, TextField } from "@mui/material";

const RoleRequirement: React.FC = () => (
  <Box 
    sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      p: 4, 
      mt: 3, 
      maxWidth: '768px', 
      backgroundColor: 'white', 
      borderRadius: '16px', 
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
      width: '100%', 
      px: { xs: 2, md: 5 } 
    }}
  >
    <Typography 
      variant="h4" 
      sx={{ 
        pb: 2, 
        fontWeight: 'bold', 
        color: '#977342' 
      }}
    >
      Role Requirements
    </Typography>
    
    <Box sx={{ flexDirection: 'column', width: '100%' }}>
      <Box sx={{ flexDirection: 'column', width: '100%' }}>
        <Typography 
          variant="subtitle2" 
          sx={{ 
            pt: 1, 
            pb: 1, 
            color: 'black',
            fontWeight: 'bold' 
          }}
        >
          Role Skill
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'space-between', 
            px: 1, 
            py: 1, 
            mt: 1, 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            border: '1px solid', 
            borderColor: 'gray.300' 
          }}
        >
          <Typography sx={{ my: 'auto' }}>Actor</Typography>
          <Box 
            component="img"
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/3a544052ff3a223b44b5b722cc0cceac6f027791bf450cb52f3df85844734282?apiKey=7fae980a988640eea8add1e49a5d542e&"
            alt="Role Skill Icon"
            sx={{ 
              width: '32px', 
              height: '32px', 
              objectFit: 'contain' 
            }}
          />
        </Box>
      </Box>

      <Box sx={{ flexDirection: 'column', mt: 2 }}>
        <Typography 
          variant="subtitle2" 
          sx={{ 
            py: 1, 
            color: 'black',
            fontWeight: 'bold' 
          }}
        >
          Number of People Needed
        </Typography>
        <TextField
          type="number"
          id="people_needed"
          variant="outlined"
          sx={{ 
            mt: 1, 
            width: '100%', 
            borderRadius: '8px', 
            '& .MuiOutlinedInput-root': { 
              borderRadius: '8px' 
            } 
          }}
          aria-label="Number of People Needed"
        />
      </Box>
    </Box>
  </Box>
);

export default RoleRequirement;