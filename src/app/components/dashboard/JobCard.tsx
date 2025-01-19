"use item";

import React from 'react';
import { Box, Typography, Card, CardContent, Chip } from '@mui/material';
import { Avatar } from '@mui/material';

import { JobCardProps } from '@/types/Props/JobCardProps';

export function JobCard({ title, status, requirements, location, daysAgo, salary }: JobCardProps) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', padding: 2, borderRadius: '12px', border: '1px solid', borderColor: 'transparent', backgroundColor: 'rgba(0, 0, 0, 0)', width: '100%' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
            {title}
          </Typography>
          <Chip
            label={status}
            sx={{
              backgroundColor: status === 'Active' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 193, 7, 0.1)',
              color: status === 'Active' ? 'green' : 'orange',
              fontSize: '0.75rem',
              borderRadius: '12px',
            }}
          />
        </Box>
        <Typography variant="body2" sx={{ color: 'gray', marginTop: 1 }}>
          {requirements}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                alt=""
                src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/bfd648982e2202b569290b273b752a8734fbaeed4ed0cf44d433879d7d47fc53?apiKey=7fae980a988640eea8add1e49a5d542e&"
                sx={{ width: 16, height: 16 }}
              />
              <Typography variant="body2" sx={{ color: 'gray' }}>
                {location}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                alt=""
                src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/38268533ff7e6c03e460a7cb8adde4c43d3657810b778b66e3f42f4017a7a52f?apiKey=7fae980a988640eea8add1e49a5d542e&"
                sx={{ width: 16, height: 16 }}
              />
              <Typography variant="body2" sx={{ color: 'gray' }}>
                {daysAgo} days ago
              </Typography>
            </Box>
          </Box>
          <Typography variant="h6" sx={{ color: 'gray' }}>
            {salary}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}