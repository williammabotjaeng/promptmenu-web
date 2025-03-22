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
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
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

  return (
    <Card 
      sx={{ 
        width: { xs: '100%', sm: '48%', md: '31%', lg: '23%' },
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
        }
      }}
      elevation={2}
    >
      <Box sx={{ position: 'relative' }}>
        {!imageLoaded && !imageError && (
          <Skeleton 
            variant="rectangular" 
            height={200} 
            animation="wave" 
            sx={{ backgroundColor: 'rgba(151, 115, 66, 0.1)' }} 
          />
        )}
        
        <CardMedia
          component="img"
          image={imageError ? '/fallback-profile-image.jpg' : profile.imageUrl}
          alt={`${profile.name}'s profile photo`}
          sx={{ 
            height: 200, 
            objectFit: 'cover',
            display: imageLoaded || imageError ? 'block' : 'none'
          }}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
        />
        
        {profile.isFeatured && (
          <Chip
            label="FEATURED"
            color="primary"
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              fontWeight: '600',
              letterSpacing: '0.5px',
              fontSize: '11px',
              backgroundColor: '#977342',
              zIndex: 1
            }}
          />
        )}
      </Box>
      
      <CardContent sx={{ padding: 2 }}>
        <Typography 
          variant="h6" 
          component="h2" 
          sx={{ 
            fontWeight: 600, 
            fontSize: '1.1rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {profile.name}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, mb: 1.5 }}>
          <LocationOnOutlinedIcon sx={{ color: '#777', fontSize: 16, mr: 0.5 }} />
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              fontSize: '0.85rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {profile.location}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ fontSize: '0.85rem' }}
          >
            {profile.age} years
          </Typography>
          
          {profile.gender && (
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ fontSize: '0.85rem' }}
            >
              {profile.gender}
            </Typography>
          )}
        </Box>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2, minHeight: '28px' }}>
          {profile.skills && Array.isArray(profile.skills) && profile.skills.slice(0, 3).map((skill, index) => (
            <Chip
              key={index}
              label={String(skill)} // Ensure the label is always a string
              size="small"
              sx={{
                fontSize: '0.7rem',
                height: '22px',
                backgroundColor: 'rgba(151, 115, 66, 0.1)',
                color: '#977342',
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
                backgroundColor: 'rgba(151, 115, 66, 0.05)',
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
          }}
        >
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default SidebarProfileCard;