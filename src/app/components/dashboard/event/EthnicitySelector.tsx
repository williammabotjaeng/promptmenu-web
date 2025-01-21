import * as React from "react";
import { Box, Typography } from "@mui/material";

type EthnicitySelectorProps = {
  label: string;
  value: string;
  imageSrc: string;
};

const EthnicitySelector: React.FC<EthnicitySelectorProps> = ({
  label,
  value,
  imageSrc,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2, width: '100%', bgcolor: 'transparent' }}>
      <Typography 
        variant="body2" 
        sx={{ paddingY: 1, color: 'black', fontWeight: 'bold', whiteSpace: 'nowrap' }}
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

export default EthnicitySelector;