import * as React from "react";
import { Box, Typography } from "@mui/material";

type GenderSelectorProps = {
  label: string;
  value: string;
  imageSrc: string;
};

const GenderSelector: React.FC<GenderSelectorProps> = ({
  label,
  value,
  imageSrc,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', bgcolor: 'transparent' }}>
      <Typography 
        variant="body2" 
        sx={{ paddingTop: '1px', paddingBottom: '10px', fontWeight: 'bold', color: 'black' }}
      >
        {label}
      </Typography>
      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 2, 
          justifyContent: 'space-between', 
          padding: '8px 10px', 
          marginTop: 2, 
          bgcolor: 'white', 
          borderRadius: '8px', 
          border: '1px solid', 
          borderColor: 'grey.300' 
        }}
      >
        <Box sx={{ my: 'auto' }}>{value}</Box>
        <img
          loading="lazy"
          src={imageSrc}
          alt=""
          style={{ objectFit: 'contain', width: '32px', height: '32px' }} 
        />
      </Box>
    </Box>
  );
};

export default GenderSelector;