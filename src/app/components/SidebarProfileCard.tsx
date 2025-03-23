import * as React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Skeleton,
  Avatar,
  Divider
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import WcOutlinedIcon from '@mui/icons-material/WcOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import StarIcon from '@mui/icons-material/Star';
import { useRouter } from 'next/navigation';

interface ProfileProps {
  id: string | number;
  name: string;
  location: string;
  age: number;
  skills: string[];
  imageUrl: string;
  isFeatured?: boolean;
  gender?: string;
  ethnicity?: string;
  height?: number;
  weight?: number;
}

interface SidebarProfileCardProps {
  profile: ProfileProps;
}

const SidebarProfileCard: React.FC<SidebarProfileCardProps> = ({ profile }) => {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  
  const handleViewProfile = () => {
    router.push(`/talent/${profile.id}`);
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card 
      sx={{ 
        width: { xs: '100%', sm: '100%', md: '31%', lg: '23%' },
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'transform 0.2s, box-shadow 0.2s',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 16px rgba(151, 115, 66, 0.15)'
        }
      }}
      elevation={2}
    >
      {/* Profile Image Section */}
      <Box 
        sx={{ 
          position: 'relative',
          pt: '100%', // 1:1 Aspect ratio
          width: '100%',
          backgroundColor: 'rgba(151, 115, 66, 0.05)'
        }}
      >
        {!imageLoaded && !imageError && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Skeleton 
              variant="circular" 
              width="40%" 
              height="40%" 
              animation="wave" 
              sx={{ backgroundColor: 'rgba(151, 115, 66, 0.1)' }} 
            />
          </Box>
        )}
        
        {imageError ? (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Avatar
              sx={{ 
                width: '60%', 
                height: '60%',
                bgcolor: 'rgba(151, 115, 66, 0.2)',
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#977342'
              }}
            >
              {getInitials(profile.name)}
            </Avatar>
          </Box>
        ) : (
          <CardMedia
            component="img"
            image={profile.imageUrl}
            alt={`${profile.name}'s profile photo`}
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: imageLoaded ? 'block' : 'none'
            }}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
          />
        )}
        
        {profile.isFeatured && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '40%',
              height: '40px',
              background: 'linear-gradient(135deg, transparent 0%, transparent 50%, #977342 50%, #977342 100%)',
              zIndex: 1
            }}
          >
            <StarIcon 
              sx={{ 
                position: 'absolute',
                top: '4px',
                right: '4px',
                color: 'white',
                fontSize: '1.2rem'
              }} 
            />
          </Box>
        )}
      </Box>
      
      {/* Profile Info Section */}
      <CardContent 
        sx={{ 
          padding: 2, 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography 
          variant="h6" 
          component="h2" 
          sx={{ 
            fontWeight: 600, 
            fontSize: '1.1rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: '#333'
          }}
        >
          {profile.name}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 0.5 }}>
          <LocationOnOutlinedIcon sx={{ color: '#977342', fontSize: 16, mr: 0.5 }} />
          <Typography 
            variant="body2" 
            sx={{ 
              fontSize: '0.85rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: '#666'
            }}
          >
            {profile.location}
          </Typography>
        </Box>
        
        <Divider sx={{ my: 1.5, opacity: 0.5 }} />
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 1.5 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CakeOutlinedIcon sx={{ color: '#977342', fontSize: 16, mr: 0.5 }} />
            <Typography 
              variant="body2" 
              sx={{ fontSize: '0.85rem', color: '#666' }}
            >
              {profile.age} years
            </Typography>
          </Box>
          
          {profile.gender && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <WcOutlinedIcon sx={{ color: '#977342', fontSize: 16, mr: 0.5 }} />
              <Typography 
                variant="body2" 
                sx={{ fontSize: '0.85rem', color: '#666' }}
              >
                {profile.gender}
              </Typography>
            </Box>
          )}
        </Box>
        
        <Typography 
          variant="body2" 
          sx={{ 
            fontSize: '0.75rem', 
            color: '#888', 
            mb: 1,
            fontWeight: 500
          }}
        >
          SKILLS
        </Typography>
        
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 0.75, 
            mb: 'auto',
            minHeight: '28px' 
          }}
        >
          {profile.skills && Array.isArray(profile.skills) && profile.skills.slice(0, 3).map((skill, index) => (
            <Chip
              key={index}
              label={String(skill)}
              size="small"
              sx={{
                fontSize: '0.7rem',
                height: '22px',
                backgroundColor: 'rgba(151, 115, 66, 0.08)',
                color: '#977342',
                fontWeight: 500,
                '& .MuiChip-label': {
                  px: 1
                }
              }}
            />
          ))}
          
          {profile.skills && Array.isArray(profile.skills) && profile.skills.length > 3 && (
            <Chip
              label={`+${profile.skills.length - 3}`}
              size="small"
              sx={{
                fontSize: '0.7rem',
                height: '22px',
                backgroundColor: 'rgba(151, 115, 66, 0.04)',
                color: '#977342',
                '& .MuiChip-label': {
                  px: 1
                }
              }}
            />
          )}
        </Box>
        
        <Button
          variant="contained"
          fullWidth
          onClick={handleViewProfile}
          sx={{
            textTransform: 'none',
            backgroundColor: '#977342',
            '&:hover': {
              backgroundColor: '#7D5F35',
            },
            fontSize: '0.85rem',
            borderRadius: '8px',
            py: 1,
            mt: 2,
            fontWeight: 500,
            '&:focus': {
              boxShadow: '0 0 0 3px rgba(151, 115, 66, 0.3)'
            }
          }}
        >
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default SidebarProfileCard;