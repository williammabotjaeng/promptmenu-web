"use client";

import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { SocialMediaLinkProps } from '@/types/Props/SocialMediaLinkProps';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import DefaultIcon from '@mui/icons-material/AccountCircle'; 

export const SocialMediaLink: React.FC<SocialMediaLinkProps> = ({ icon, username }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'facebook':
        return <FacebookIcon />;
      case 'twitter':
        return <TwitterIcon />;
      case 'instagram':
        return <InstagramIcon />;
      case 'linkedin':
        return <LinkedInIcon />;
      case 'tiktok':
        return <FontAwesomeIcon icon={faTiktok} />;
      default:
        return <DefaultIcon />;
    }
  };

  const platform = icon.includes('facebook') ? 'facebook' :
                   icon.includes('twitter') ? 'twitter' :
                   icon.includes('instagram') ? 'instagram' :
                   icon.includes('linkedin') ? 'linkedin' :
                   icon.includes('tiktok') ? 'tiktok' : 'default';

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', paddingY: 1, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '16px', marginRight: 2 }}>
        {getIcon(platform)}
      </Box>
      <Typography variant="body1" sx={{ color: '#CEAB76', flexGrow: 1 }}>
        {username}
      </Typography>
    </Box>
  );
};