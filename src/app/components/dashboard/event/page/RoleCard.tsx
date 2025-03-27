"use client";

import * as React from "react";
import { Box, Typography, Chip, Paper, Divider, Avatar } from "@mui/material";
import { RoleCardProps } from "@/types/Props/RoleCardProps";
import { useRouter } from "next/navigation";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WorkIcon from '@mui/icons-material/Work';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

export const RoleCard: React.FC<RoleCardProps> = ({
  id,
  title,
  status,
  requirements,
  location,
  postedTime,
  salary
}) => {
  const router = useRouter();

  const handleRoleClick = () => {
    router?.push(`/role/${id}`);
  };

  // Status color mapping
  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'active':
        return { color: '#4CAF50', bgColor: '#E8F5E9' };
      case 'pending':
        return { color: '#FF9800', bgColor: '#FFF3E0' };
      case 'closed':
        return { color: '#F44336', bgColor: '#FFEBEE' };
      default:
        return { color: '#4CAF50', bgColor: '#E8F5E9' };
    }
  };

  const statusStyle = getStatusColor(status);

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '12px',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        backgroundColor: 'white',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        mb: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          borderColor: 'rgba(151, 115, 66, 0.3)',
        },
      }}
      onClick={handleRoleClick}
    >
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              sx={{ 
                bgcolor: 'rgba(151, 115, 66, 0.1)', 
                color: '#977342',
                mr: 2
              }}
            >
              <WorkIcon />
            </Avatar>
            
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: '600', 
                color: '#333',
                fontSize: { xs: '1.1rem', md: '1.25rem' } 
              }}
            >
              {title}
            </Typography>
          </Box>
          
          <Chip 
            label={status} 
            sx={{ 
              fontWeight: 500,
              color: statusStyle.color,
              bgcolor: statusStyle.bgColor,
              borderRadius: '6px',
              border: 'none'
            }} 
          />
        </Box>
        
        {/* Requirements */}
        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            py: 1,
            px: 2,
            mb: 2,
            bgcolor: 'rgba(0, 0, 0, 0.02)',
            borderRadius: '8px'
          }}
        >
          <PeopleAltIcon sx={{ color: '#666', mr: 1, fontSize: '1rem' }} />
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#555', 
              fontSize: { xs: '0.875rem', md: '0.9rem' } 
            }}
          >
            {requirements}
          </Typography>
        </Box>
        
        <Divider sx={{ my: 2, opacity: 0.6 }} />
        
        {/* Footer */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mt: 1 
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2, mb: { xs: 1, sm: 0 } }}>
            <LocationOnIcon sx={{ color: '#977342', fontSize: '1.2rem', mr: 0.5 }} />
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#666', 
                fontSize: { xs: '0.8rem', md: '0.875rem' } 
              }}
            >
              {location}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2, mb: { xs: 1, sm: 0 } }}>
            <AccessTimeIcon sx={{ color: '#977342', fontSize: '1.2rem', mr: 0.5 }} />
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#666', 
                fontSize: { xs: '0.8rem', md: '0.875rem' } 
              }}
            >
              {postedTime}
            </Typography>
          </Box>
          
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: '600', 
              color: '#977342', 
              fontSize: { xs: '1rem', md: '1.1rem' },
              ml: { xs: 0, sm: 'auto' },
              mt: { xs: 1, sm: 0 }
            }}
          >
            {salary}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default RoleCard;