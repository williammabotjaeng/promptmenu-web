"use client";

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Link as MuiLink, 
  Divider, 
  Button,
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
  InputAdornment
} from '@mui/material';
import Link from 'next/link';
import { 
  FacebookOutlined, 
  Twitter, 
  Instagram,
  LinkedIn,
  YouTube,
  Send,
  LocationOn,
  Phone,
  Email,
  MenuBook
} from '@mui/icons-material';

// Props types
interface QuickLinkProps {
  label: string;
  url: string;
}

interface ContactInfoProps {
  icon: string;
  text: string;
  alt: string;
}

interface SocialLinkProps {
  icon: string;
  url: string;
  alt: string;
}

interface FooterProps {
  quickLinks: QuickLinkProps[];
  contactInfo: ContactInfoProps[];
  socialLinks: SocialLinkProps[];
}

// Microsoft-inspired color scheme
const theme = {
  colors: {
    primary: "#107C10", // Microsoft green
    secondary: "#0078D4", // Microsoft blue
    accent: "#50E6FF", // Azure blue
    background: "#f8f9fa",
    dark: "#2b2b2b",
    text: "#323130",
    lightText: "#605E5C",
    white: "#FFFFFF",
  },
};

const Footer: React.FC<FooterProps> = ({ quickLinks, contactInfo, socialLinks }) => {
  // Map icon strings to actual icon components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'facebook':
        return <FacebookOutlined />;
      case 'twitter':
        return <Twitter />;
      case 'instagram':
        return <Instagram />;
      case 'linkedin':
        return <LinkedIn />;
      case 'youtube':
        return <YouTube />;
      case 'location_on':
        return <LocationOn />;
      case 'phone':
        return <Phone />;
      case 'email':
        return <Email />;
      default:
        return <MenuBook />;
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ bgcolor: theme.colors.dark, color: theme.colors.white, pt: 8, pb: 4 }}>
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {/* Brand and Description */}
          <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <MenuBook sx={{ color: theme.colors.accent, fontSize: 34, mr: 1 }} />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.accent})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                PromptMenu
              </Typography>
            </Box>
            
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3, maxWidth: 300 }}>
              Transforming restaurant menus with interactive, multimedia-rich digital experiences powered by Azure AI technology.
            </Typography>
            
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                borderRadius: 2, 
                bgcolor: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                mb: 3
              }}
            >
              <Typography variant="subtitle2" sx={{ color: theme.colors.white, mb: 1 }}>
                Subscribe to our newsletter
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <TextField
                  placeholder="Your email address"
                  size="small"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255,255,255,0.05)',
                      borderRadius: 2,
                      color: 'rgba(255,255,255,0.9)',
                      '& fieldset': {
                        borderColor: 'rgba(255,255,255,0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255,255,255,0.3)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.colors.accent,
                      },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" sx={{ color: theme.colors.accent }}>
                          <Send fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Paper>

            {/* Social links */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                size="small"
                sx={{
                  color: theme.colors.white,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    bgcolor: theme.colors.secondary,
                  },
                }}
              >
                <FacebookOutlined fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: theme.colors.white,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    bgcolor: theme.colors.secondary,
                  },
                }}
              >
                <Twitter fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: theme.colors.white,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    bgcolor: theme.colors.secondary,
                  },
                }}
              >
                <Instagram fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: theme.colors.white,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    bgcolor: theme.colors.secondary,
                  },
                }}
              >
                <LinkedIn fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Quick Links */}
          <Box sx={{ flex: '1 1 180px' }}>
            <Typography variant="subtitle1" sx={{ color: theme.colors.white, fontWeight: 600, mb: 3 }}>
              Quick Links
            </Typography>
            <List sx={{ p: 0 }}>
              {quickLinks.map((link, index) => (
                <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                  <Link href={link.url} passHref style={{ textDecoration: 'none' }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255,255,255,0.7)',
                        '&:hover': {
                          color: theme.colors.accent,
                        },
                      }}
                    >
                      {link.label}
                    </Typography>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Features */}
          <Box sx={{ flex: '1 1 180px' }}>
            <Typography variant="subtitle1" sx={{ color: theme.colors.white, fontWeight: 600, mb: 3 }}>
              Features
            </Typography>
            <List sx={{ p: 0 }}>
              <ListItem sx={{ px: 0, py: 0.5 }}>
                <Link href="/features/menus" passHref style={{ textDecoration: 'none' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.7)',
                      '&:hover': {
                        color: theme.colors.accent,
                      },
                    }}
                  >
                    Digital Menus
                  </Typography>
                </Link>
              </ListItem>
              <ListItem sx={{ px: 0, py: 0.5 }}>
                <Link href="/features/videos" passHref style={{ textDecoration: 'none' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.7)',
                      '&:hover': {
                        color: theme.colors.accent,
                      },
                    }}
                  >
                    Video Integration
                  </Typography>
                </Link>
              </ListItem>
              <ListItem sx={{ px: 0, py: 0.5 }}>
                <Link href="/features/translation" passHref style={{ textDecoration: 'none' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.7)',
                      '&:hover': {
                        color: theme.colors.accent,
                      },
                    }}
                  >
                    AI Translation
                  </Typography>
                </Link>
              </ListItem>
              <ListItem sx={{ px: 0, py: 0.5 }}>
                <Link href="/features/analytics" passHref style={{ textDecoration: 'none' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.7)',
                      '&:hover': {
                        color: theme.colors.accent,
                      },
                    }}
                  >
                    Customer Insights
                  </Typography>
                </Link>
              </ListItem>
            </List>
          </Box>

          {/* Contact Info */}
          <Box sx={{ flex: '1 1 250px' }}>
            <Typography variant="subtitle1" sx={{ color: theme.colors.white, fontWeight: 600, mb: 3 }}>
              Contact Us
            </Typography>
            
            <List sx={{ p: 0 }}>
              {contactInfo.map((info, index) => (
                <ListItem key={index} sx={{ px: 0, py: 1, display: 'flex', alignItems: 'flex-start' }}>
                  <Box sx={{ mr: 2, color: theme.colors.accent, mt: 0.5 }}>
                    {getIconComponent(info.icon)}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(255,255,255,0.7)' }}
                    dangerouslySetInnerHTML={{ __html: info.text }}
                  />
                </ListItem>
              ))}
            </List>
            
            <Box sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderColor: theme.colors.accent,
                  color: theme.colors.accent,
                  borderRadius: 2,
                  '&:hover': {
                    borderColor: theme.colors.accent,
                    bgcolor: 'rgba(80, 230, 255, 0.1)',
                  },
                }}
              >
                Contact Support
              </Button>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* Bottom Footer */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'center', sm: 'center' } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, sm: 0 } }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              © {currentYear} PromptMenu. All rights reserved.
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="/privacy" passHref style={{ textDecoration: 'none' }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255,255,255,0.5)',
                  '&:hover': {
                    color: theme.colors.accent,
                  },
                }}
              >
                Privacy Policy
              </Typography>
            </Link>
            <Link href="/terms" passHref style={{ textDecoration: 'none' }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255,255,255,0.5)',
                  '&:hover': {
                    color: theme.colors.accent,
                  },
                }}
              >
                Terms of Service
              </Typography>
            </Link>
            <Link href="/cookies" passHref style={{ textDecoration: 'none' }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255,255,255,0.5)',
                  '&:hover': {
                    color: theme.colors.accent,
                  },
                }}
              >
                Cookie Policy
              </Typography>
            </Link>
          </Box>
        </Box>
        
        {/* Microsoft Partnership */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 4, 
          pt: 3, 
          borderTop: '1px solid rgba(255,255,255,0.05)'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            px: 3,
            py: 1,
            bgcolor: 'rgba(255,255,255,0.05)',
            borderRadius: 5,
          }}>
            <svg width="16" height="16" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
              <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
              <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
              <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
            </svg>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
              Powered by Azure AI
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;