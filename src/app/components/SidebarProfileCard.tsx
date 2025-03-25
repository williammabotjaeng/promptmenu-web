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
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import WcOutlinedIcon from '@mui/icons-material/WcOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import StarIcon from '@mui/icons-material/Star';
import { useRouter } from 'next/navigation';
import ReactCountryFlag from 'react-country-flag';
import countryList from 'react-select-country-list';

interface ProfileProps {
  id: string | number;
  name: string;
  location?: string;
  nationality?: string;
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
  const theme = useTheme();
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  
  // Responsive breakpoints
  const isXsScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMdScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLgScreen = useMediaQuery(theme.breakpoints.up('lg'));
  
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
  
  // Get country name from nationality code, fall back to location if needed
  const getCountryName = (code: string) => {
    if (!code) return '';
    
    // Convert two-letter code to uppercase for better matching
    const upperCode = code.toUpperCase();
    
    // Use react-select-country-list to get country name
    try {
      const countries = countryList().getData();
      const country = countries.find(country => country.value.toUpperCase() === upperCode);
      return country ? country.label : code;
    } catch (error) {
      // Fallback if countryList has an issue
      console.error("Error getting country name:", error);
      return code;
    }
  };
  
  // Get location display text
  const getLocationDisplay = () => {
    if (profile.location) {
      return getCountryName(profile.location);
    }
    return profile.location || 'Location not specified';
  };
  
  // Check if the nationality is a valid country code (2 characters)
  const isValidCountryCode = profile.location && profile.location.length === 2;

  return (
    <Card 
      sx={{ 
        width: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'transform 0.2s, box-shadow 0.2s',
        height: '100%',
        display: 'flex',
        flexDirection: { xs: 'row', sm: 'column' },
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
          width: { xs: '40%', sm: '100%' },
          height: { xs: 'auto', sm: '0' },
          pt: { xs: 0, sm: '100%' }, // 1:1 Aspect ratio for sm and up
          backgroundColor: 'rgba(151, 115, 66, 0.05)'
        }}
      >
        {!imageLoaded && !imageError && (
          <Box
            sx={{
              position: { xs: 'relative', sm: 'absolute' },
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              height: { xs: '100%', sm: 'auto' },
              aspectRatio: { xs: '3/4', sm: 'auto' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Skeleton 
              variant="rectangular" 
              width="100%" 
              height="100%" 
              animation="wave" 
              sx={{ backgroundColor: 'rgba(151, 115, 66, 0.1)' }} 
            />
          </Box>
        )}
        
        {imageError ? (
          <Box
            sx={{
              position: { xs: 'relative', sm: 'absolute' },
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              height: { xs: '100%', sm: 'auto' },
              aspectRatio: { xs: '3/4', sm: 'auto' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Avatar
              sx={{ 
                width: { xs: '60%', sm: '60%' }, 
                height: { xs: '40%', sm: '60%' },
                bgcolor: 'rgba(151, 115, 66, 0.2)',
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
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
              position: { xs: 'relative', sm: 'absolute' },
              top: 0,
              left: 0,
              width: '100%',
              height: { xs: '100%', sm: '100%' },
              aspectRatio: { xs: '3/4', sm: 'auto' },
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
              width: '40px',
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
          padding: { xs: 1.5, sm: 2 }, 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          width: { xs: '60%', sm: '100%' }
        }}
      >
        <Typography 
          variant="h6" 
          component="h2" 
          sx={{ 
            fontWeight: 600, 
            fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.1rem' },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: '#333'
          }}
        >
          {profile.name}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.75, mb: 0.5 }}>
          {isValidCountryCode ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ReactCountryFlag
                countryCode={profile.location}
                svg
                style={{
                  width: '1em',
                  height: '1em',
                  marginRight: '8px',
                  borderRadius: '2px'
                }}
                title={getLocationDisplay()}
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontSize: { xs: '0.75rem', sm: '0.85rem' },
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  color: '#666'
                }}
              >
                {getLocationDisplay()}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnOutlinedIcon sx={{ color: '#977342', fontSize: { xs: 14, sm: 16 }, mr: 0.5 }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontSize: { xs: '0.75rem', sm: '0.85rem' },
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  color: '#666'
                }}
              >
                {profile.location || 'Location not specified'}
              </Typography>
            </Box>
          )}
        </Box>
        
        <Divider sx={{ my: { xs: 1, sm: 1.5 }, opacity: 0.5 }} />
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: { xs: 1, sm: 1.5 },
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          gap: { xs: 0.5, sm: 0 }
        }}>      
          {profile.gender && (
            <Box sx={{ display: 'flex', alignItems: 'center', minWidth: { xs: '48%', sm: 'auto' } }}>
              <WcOutlinedIcon sx={{ color: '#977342', fontSize: { xs: 14, sm: 16 }, mr: 0.5 }} />
              <Typography 
                variant="body2" 
                sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' }, color: '#666' }}
              >
                {profile.gender}
              </Typography>
            </Box>
          )}
        </Box>
        
        <Typography 
          variant="body2" 
          sx={{ 
            fontSize: { xs: '0.7rem', sm: '0.75rem' }, 
            color: '#888', 
            mb: 0.75,
            fontWeight: 500,
            display: { xs: 'none', sm: 'block' }
          }}
        >
          SKILLS
        </Typography>
        
        <Box 
          sx={{ 
            display: { xs: 'none', sm: 'flex' },
            flexWrap: 'wrap', 
            gap: { xs: 0.5, sm: 0.75 }, 
            mb: 'auto',
            minHeight: { xs: '22px', sm: '28px' },        
          }}
        >
          {profile.skills && Array.isArray(profile.skills) && profile.skills.slice(0, 3).map((skill, index) => (
            <Chip
              key={index}
              label={String(skill)}
              size="small"
              sx={{
                fontSize: { xs: '0.65rem', sm: '0.7rem' },
                height: { xs: '20px', sm: '22px' },
                backgroundColor: 'rgba(151, 115, 66, 0.08)',
                color: '#977342',
                fontWeight: 500,
                '& .MuiChip-label': {
                  px: { xs: 0.75, sm: 1 }
                }
              }}
            />
          ))}
          
          {profile.skills && Array.isArray(profile.skills) && profile.skills.length > 3 && (
            <Chip
              label={`+${profile.skills.length - 3}`}
              size="small"
              sx={{
                fontSize: { xs: '0.65rem', sm: '0.7rem' },
                height: { xs: '20px', sm: '22px' },
                backgroundColor: 'rgba(151, 115, 66, 0.04)',
                color: '#977342',
                '& .MuiChip-label': {
                  px: { xs: 0.75, sm: 1 }
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
            fontSize: { xs: '0.75rem', sm: '0.85rem' },
            borderRadius: '8px',
            py: { xs: 0.75, sm: 1 },
            mt: { xs: 1, sm: 2 },
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