import * as React from "react";
import GenderSelector from './GenderSelector';
import AgeSelector from './AgeSelector';
import EthnicitySelector from './EthnicitySelector';
import { Box, Typography } from "@mui/material";

const DemographicsForm = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        padding: 4,
        marginTop: 3,
        marginLeft: 4,
        maxWidth: '100%',
        bgcolor: 'white',
        borderRadius: '16px',
        boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
        width: '768px',
      }}
    >
      <Typography 
        variant="h4" 
        sx={{ paddingBottom: 1.5, color: '#977342', fontWeight: 'bold' }}
      >
        Demographics
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: 2,
          width: '100%',
          color: 'black',
        }}
      >
        <GenderSelector 
          label="Gender" 
          value="Any" 
          imageSrc="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/3a544052ff3a223b44b5b722cc0cceac6f027791bf450cb52f3df85844734282?apiKey=7fae980a988640eea8add1e49a5d542e&" 
        />
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 2, 
            marginTop: 2, 
            fontSize: '0.875rem', // text-sm equivalent
            fontWeight: 'medium',
          }}
        >
          <AgeSelector label="Minimum Age" />
          <AgeSelector label="Maximum Age" />
        </Box>
        <EthnicitySelector 
          label="Ethnicity" 
          value="All Ethnicities" 
          imageSrc="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/13086ebea5f8380d161435bb28c2e9eb0400079c9838445d129aa81e22877af4?apiKey=7fae980a988640eea8add1e49a5d542e&" 
        />
      </Box>
    </Box>
  );
};

export default DemographicsForm;