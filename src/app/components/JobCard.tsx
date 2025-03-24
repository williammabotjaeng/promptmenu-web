import * as React from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Chip,
  Divider,
  Avatar,
  Tooltip,
  Skeleton
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { useRouter } from 'next/navigation';
import { useStore } from 'zustand';
import useCurrentRoleStore from '@/state/use-current-role-store';

interface JobCardProps {
  imageUrl: string;
  isUrgent?: boolean;
  title: string;
  description: string;
  location: string;
  deadline: string;
  roleId: number | string;
  hourlyPay?: number;
  dailyPay?: number;
  projectPay?: number;
  openings?: number;
  skill?: string;
  role?: any;
}

export const JobCard: React.FC<JobCardProps> = ({
  imageUrl,
  isUrgent = false,
  title,
  description,
  location,
  deadline,
  roleId,
  hourlyPay,
  dailyPay,
  projectPay,
  openings,
  skill,
  role
}) => {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const { setCurrentRole } = useStore(useCurrentRoleStore);

  // Truncate description to a reasonable length
  const truncateDescription = (text: string, maxLength: number = 100) => {
    if (!text) return "No description available";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Handle apply button click
  const handleApply = () => {
    // Navigate to role application page
    setCurrentRole({
      ...role,
      event_poster: imageUrl
    });
    router.push(`/apply/${roleId}`);
  };

  // Calculate highest pay rate to display
  const getPayDisplay = () => {
    if (projectPay) return `${projectPay} AED (Project)`;
    if (dailyPay) return `${dailyPay} AED/day`;
    if (hourlyPay) return `${hourlyPay} AED/hr`;
    return "Contact for rates";
  };

  return (
    <Card 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        width: '100%', 
        height: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
        }
      }}
      elevation={2}
    >
      <Box sx={{ position: 'relative' }}>
        {!imageLoaded && !imageError && (
          <Skeleton 
            variant="rectangular" 
            height={180} 
            animation="wave" 
            sx={{ backgroundColor: 'rgba(151, 115, 66, 0.1)' }} 
          />
        )}
        
        <CardMedia
          component="img"
          image={imageError ? '/fallback-job-image.jpg' : imageUrl}
          alt={`${title} job opportunity`}
          sx={{ 
            height: 180, 
            objectFit: 'cover',
            display: imageLoaded || imageError ? 'block' : 'none'
          }}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
        />
        
        {isUrgent && (
          <Chip
            label="URGENT"
            color="error"
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              fontWeight: '600',
              letterSpacing: '0.5px',
              fontSize: '11px',
              zIndex: 1
            }}
          />
        )}
        
        {skill && (
          <Chip
            label={skill}
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              backgroundColor: 'rgba(255,255,255,0.85)',
              color: '#977342',
              fontWeight: '500',
              fontSize: '11px',
              zIndex: 1
            }}
          />
        )}
      </Box>
      
      <CardContent sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        padding: 2.5,
        flexGrow: 1,
        justifyContent: 'space-between'
      }}>
        <Box>
          <Typography 
            variant="h6" 
            component="h2"
            sx={{ 
              fontWeight: '600', 
              color: '#333',
              mb: 1,
              fontSize: '1.1rem',
              lineHeight: 1.3
            }}
          >
            {title}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 2,
              lineHeight: 1.5
            }}
          >
            {truncateDescription(description)}
          </Typography>
        </Box>
        
        <Box>
          <Divider sx={{ my: 1.5 }} />
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 2 }}>
            <Tooltip title="Location" arrow>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOnOutlinedIcon sx={{ color: '#977342', fontSize: '1.1rem', mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                  {location || 'Remote'}
                </Typography>
              </Box>
            </Tooltip>
            
            <Tooltip title="Application Deadline" arrow>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                <AccessTimeOutlinedIcon sx={{ color: '#977342', fontSize: '1.1rem', mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                  {deadline}
                </Typography>
              </Box>
            </Tooltip>
          </Box>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', mt: 1.5 }}>
            <Tooltip title="Payment" arrow>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MonetizationOnOutlinedIcon sx={{ color: '#977342', fontSize: '1.1rem', mr: 0.5 }} />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: '500', 
                    color: '#555',
                    fontSize: '0.85rem'
                  }}
                >
                  {getPayDisplay()}
                </Typography>
              </Box>
            </Tooltip>
            
            {openings && (
              <Tooltip title="Number of Openings" arrow>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <WorkOutlineOutlinedIcon sx={{ color: '#977342', fontSize: '1.1rem', mr: 0.5 }} />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: '500', 
                      color: '#555',
                      fontSize: '0.85rem'
                    }}
                  >
                    {openings} {openings === 1 ? 'Position' : `${openings} Positions`}
                  </Typography>
                </Box>
              </Tooltip>
            )}
          </Box>
          
          <Button
            variant="contained"
            fullWidth
            onClick={handleApply}
            sx={{
              mt: 2.5,
              py: 1,
              backgroundColor: '#977342',
              color: 'white',
              fontWeight: '500',
              textTransform: 'none',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#7D5F35',
              },
              '&:focus': {
                boxShadow: '0 0 0 2px rgba(151, 115, 66, 0.3)',
              }
            }}
          >
            Apply Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCard;