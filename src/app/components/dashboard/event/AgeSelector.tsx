import * as React from "react";
import { Box, TextField, Typography } from "@mui/material";

type AgeSelectorProps = {
  label: string;
};

const AgeSelector: React.FC<AgeSelectorProps> = ({ label }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, width: 'fit-content' }}>
      <Typography 
        variant="body2" 
        sx={{ paddingY: 1, color: 'black', fontWeight: 'bold' }}
      >
        {label}
      </Typography>
      <TextField
        type="number"
        variant="outlined"
        sx={{
          marginTop: 2,
          bgcolor: 'white',
          borderRadius: '8px',
          height: '50px',
          '& .MuiOutlinedInput-root': {
            border: '1px solid',
            borderColor: 'grey.300',
          },
        }}
        inputProps={{
          'aria-label': label,
        }}
      />
    </Box>
  );
};

export default AgeSelector;