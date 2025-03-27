import * as React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, Chip, styled } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { useRouter } from 'next/navigation';
import { useStore } from 'zustand';
import useCurrentRoleStore from '@/state/use-current-role-store';
import { useCookies } from 'react-cookie';

// Helper to truncate text
const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
  overflow: 'hidden',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(151, 115, 66, 0.15)'
  }
}));

const UrgentBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '12px',
  right: '12px',
  backgroundColor: '#ff4d4f',
  color: 'white',
  padding: '4px 12px',
  borderRadius: '12px',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  zIndex: 1,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
}));

export const JobCard = ({ 
  imageUrl, 
  isUrgent, 
  title, 
  description, 
  location, 
  deadline, 
  hourlyPay, 
  dailyPay, 
  projectPay, 
  roleId, 
  role,
  isDemo = false
}) => {
  const router = useRouter();
  const { setCurrentRole } = useStore(useCurrentRoleStore);
  const [cookies] = useCookies(['ssh_session_id', 'sessionID']);

  // Check if user is logged in
  const isLoggedIn = React.useMemo(() => {
    return !!(cookies.ssh_session_id || cookies.sessionID);
  }, [cookies]);

  // Format title to ensure consistency
  const formattedTitle = title || 'Untitled Role';
  
  // Truncate description
  const truncatedDescription = truncateText(description, 120);
  
  // Determine pay display
  const getPayDisplay = () => {
    if (hourlyPay) return `${hourlyPay}/hr`;
    if (dailyPay) return `${dailyPay}/day`;
    if (projectPay) return projectPay;
    return 'Pay not specified';
  };
  
  const handleViewJob = () => {
    if (isLoggedIn) {
      setCurrentRole(role);
      router.push(`/roles/${roleId}`);
    } else {
      // Redirect to registration page if not logged in
      router.push('/register/1');
    }
  };

  return (
    <StyledCard elevation={2}>
      <Box sx={{ position: 'relative' }}>
        {isUrgent && (
          <UrgentBadge>
            Urgent
          </UrgentBadge>
        )}
        <CardMedia
          component="img"
          height="160"
          image={imageUrl || 'https://via.placeholder.com/400x200?text=No+Image'}
          alt={formattedTitle}
          sx={{ objectFit: 'cover' }}
        />
      </Box>
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
        <Typography 
          variant="h6" 
          component="h2" 
          sx={{ 
            fontWeight: 600, 
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.3,
            height: '2.6em'
          }}
        >
          {formattedTitle}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOnOutlinedIcon sx={{ color: '#977342', fontSize: 18, mr: 0.5 }} />
          <Typography variant="body2" sx={{ color: '#555' }}>
            {location || 'Location not specified'}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <BusinessCenterOutlinedIcon sx={{ color: '#977342', fontSize: 18, mr: 0.5 }} />
          <Typography variant="body2" sx={{ color: '#555' }}>
            {getPayDisplay()}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AccessTimeOutlinedIcon sx={{ color: '#977342', fontSize: 18, mr: 0.5 }} />
          <Typography variant="body2" sx={{ color: '#555' }}>
            Deadline: {deadline}
          </Typography>
        </Box>
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            mb: 'auto',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.5,
            minHeight: '4.5em'
          }}
        >
          {truncatedDescription}
        </Typography>
        
        <Button
          variant="contained"
          fullWidth
          onClick={handleViewJob}
          sx={{
            mt: 2,
            backgroundColor: '#977342',
            '&:hover': {
              backgroundColor: '#7D5F35',
            },
            textTransform: 'none',
            borderRadius: '8px',
            fontWeight: 500
          }}
        >
          {isDemo || !isLoggedIn ? 'Sign Up to Apply' : 'View Details'}
        </Button>
      </CardContent>
    </StyledCard>
  );
};