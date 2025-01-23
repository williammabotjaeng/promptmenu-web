"use client";

import React from 'react';
import { Box, Grid } from '@mui/material';
import { Statistic } from '@/components/Statistic'; 

const StatisticsSection = ({ statistics }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        paddingX: 5, 
        paddingY: 5, 
        width: '100%', 
        textAlign: 'center', 
        backgroundColor: 'transparent', 
        maxWidth: '100%', 
        '@media (max-width:600px)': { paddingX: 2 } 
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          paddingX: 1, 
          width: '100%', 
          backgroundColor: 'transparent' 
        }}
      >
        <Grid 
          container 
          spacing={1} 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            backgroundColor: 'transparent' 
          }}
        >
          {statistics.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Statistic {...stat} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default StatisticsSection;