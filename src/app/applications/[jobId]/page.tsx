"use client";

import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Button,
  CircularProgress,
  Alert,
  Grid,
  IconButton,
  useTheme,
  useMediaQuery,
  Avatar,
  Tabs,
  Tab,
  Rating,
  Tooltip,
  Badge,
  Paper,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SecondaryHeader from "@/components/SecondaryHeader";
import PrimaryFooter from "@/components/PrimaryFooter";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LinkIcon from "@mui/icons-material/Link";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEvent } from "@/providers/event-provider";
import { useStore } from "zustand";
import useCurrentRoleStore from "@/state/use-current-role-store";
import WhiteLoading from "@/components/WhiteLoading";
import { useCookies } from "react-cookie";
import moment from "moment";

// Default image to use when no poster is available
const DEFAULT_JOB_IMAGE =
  "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/fbf9227c806ec79d0dbbdfafe208eba075157780299caaa1a8b6d38ae92d7bb2?apiKey=7fae980a988640eea8add1e49a5d542e&";
const DEFAULT_AVATAR = "https://i.pravatar.cc/300";

// Helper function to format date for display
const formatDeadline = (dateString) => {
  if (!dateString) return "No deadline";
  
  try {
    const date = new Date(dateString);
    
    // Format date with time
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  } catch (error) {
    console.error("Date formatting error:", error);
    return dateString;
  }
};

// Calculate if a deadline is urgent (within 5 days)
const isDeadlineUrgent = (deadlineStr) => {
  if (!deadlineStr) return false;

  try {
    const deadline = new Date(deadlineStr);
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 && diffDays <= 5;
  } catch (error) {
    return false;
  }
};

// Mock talent profiles for demonstration
const mockTalentProfiles = [
  {
    id: 1,
    user_id: 'user1',
    name: 'Sarah Johnson',
    profileImage: 'https://i.pravatar.cc/300?img=1',
    email: 'sarah.j@example.com',
    phone: '+1 555-123-4567',
    location: 'Dubai, UAE',
    skills: ['Modeling', 'Runway', 'Commercial'],
    rating: 4.8,
    experience: '5 years',
    portfolio: 'https://portfolio.example.com/sarah',
    applicationDate: '2024-02-15T14:30:00',
    coverLetter: 'I am excited about this opportunity as it aligns perfectly with my experience in luxury fashion events. I have worked with brands like Gucci and Prada, and I believe I can bring a unique perspective to your show.',
    status: 'pending'
  },
  {
    id: 2,
    user_id: 'user2',
    name: 'Michael Chen',
    profileImage: 'https://i.pravatar.cc/300?img=3',
    email: 'michael.c@example.com',
    phone: '+1 555-987-6543',
    location: 'Abu Dhabi, UAE',
    skills: ['Photography', 'Videography', 'Editing'],
    rating: 4.5,
    experience: '7 years',
    portfolio: 'https://portfolio.example.com/michael',
    applicationDate: '2024-02-16T09:15:00',
    coverLetter: 'With my extensive background in fashion photography, I believe I can capture the essence of your event perfectly. I specialize in editorial style photography that tells a compelling story.',
    status: 'pending'
  },
  {
    id: 3,
    user_id: 'user3',
    name: 'Aisha Mohammed',
    profileImage: 'https://i.pravatar.cc/300?img=5',
    email: 'aisha.m@example.com',
    phone: '+971 50 123 4567',
    location: 'Sharjah, UAE',
    skills: ['Hosting', 'Public Speaking', 'Event Management'],
    rating: 4.9,
    experience: '4 years',
    portfolio: 'https://portfolio.example.com/aisha',
    applicationDate: '2024-02-17T16:45:00',
    coverLetter: 'I have hosted over 50 fashion events in the region and have developed a strong presence in the industry. My ability to engage audiences while maintaining a professional atmosphere would be perfect for your event.',
    status: 'hired'
  },
  {
    id: 4,
    user_id: 'user4',
    name: 'David Wilson',
    profileImage: 'https://i.pravatar.cc/300?img=7',
    email: 'david.w@example.com',
    phone: '+1 555-765-4321',
    location: 'Dubai, UAE',
    skills: ['Makeup', 'Hair Styling', 'Fashion Consulting'],
    rating: 4.2,
    experience: '9 years',
    portfolio: 'https://portfolio.example.com/david',
    applicationDate: '2024-02-14T10:30:00',
    coverLetter: 'Having worked with celebrities and major fashion brands, I bring a wealth of experience in creating stunning looks that align with brand aesthetics. I would love to contribute to your event.',
    status: 'rejected'
  },
  {
    id: 5,
    user_id: 'user5',
    name: 'Olivia Rahman',
    profileImage: 'https://i.pravatar.cc/300?img=9',
    email: 'olivia.r@example.com',
    phone: '+971 54 987 6543',
    location: 'Ajman, UAE',
    skills: ['Modeling', 'Acting', 'Dancing'],
    rating: 4.7,
    experience: '3 years',
    portfolio: 'https://portfolio.example.com/olivia',
    applicationDate: '2024-02-18T11:20:00',
    coverLetter: 'I would be thrilled to be part of this event. With my background in both modeling and performing arts, I can bring versatility to your show while maintaining the professional standards your brand is known for.',
    status: 'pending'
  }
];

// Talent application card component
const TalentApplicationCard = ({ talent, onHire, onReject, onViewProfile }) => {
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null);
  
  const handleActionMenuOpen = (event) => {
    setActionMenuAnchor(event.currentTarget);
  };
  
  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
  };
  
  return (
    <Card 
      elevation={1}
      sx={{
        borderRadius: 2,
        mb: 2.5,
        overflow: 'visible',
        border: '1px solid',
        borderColor: talent.status === 'hired' 
          ? 'rgba(76, 175, 80, 0.3)' 
          : talent.status === 'rejected' 
            ? 'rgba(244, 67, 54, 0.3)' 
            : 'rgba(0, 0, 0, 0.05)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={2}>
          {/* Left column: Profile image and status */}
          <Grid item xs={12} sm={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar 
                src={talent.profileImage} 
                alt={talent.name}
                sx={{ 
                  width: 80, 
                  height: 80, 
                  border: '3px solid',
                  borderColor: talent.status === 'hired' 
                    ? 'success.main' 
                    : talent.status === 'rejected' 
                      ? 'error.main' 
                      : "#977342",
                  mb: 1
                }}
              />
              {talent.status !== 'pending' && (
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    bottom: 5, 
                    right: -5,
                    backgroundColor: talent.status === 'hired' ? 'success.main' : 'error.main',
                    color: 'white',
                    borderRadius: '50%',
                    width: 28,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {talent.status === 'hired' 
                    ? <CheckCircleOutlineIcon fontSize="small" /> 
                    : <CancelOutlinedIcon fontSize="small" />}
                </Box>
              )}
            </Box>
            
            <Rating 
              value={talent.rating} 
              precision={0.1} 
              readOnly 
              size="small"
              sx={{ mb: 1 }}
            />
            
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem', textAlign: 'center' }}>
              Applied {moment(talent.applicationDate).fromNow()}
            </Typography>
          </Grid>
          
          {/* Middle column: Talent details */}
          <Grid item xs={12} sm={7}>
            <Box sx={{ mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mr: 1 }}>
                  {talent.name}
                </Typography>
                <Chip 
                  label={talent.experience} 
                  size="small"
                  sx={{ 
                    backgroundColor: 'rgba(151, 115, 66, 0.1)', 
                    color: "#977342",
                    height: 22
                  }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                {talent.skills.map((skill, index) => (
                  <Chip 
                    key={index} 
                    label={skill} 
                    size="small"
                    sx={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.05)', 
                      fontSize: '0.7rem',
                      height: 20
                    }}
                  />
                ))}
              </Box>
              
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <EmailOutlinedIcon sx={{ color: 'text.secondary', fontSize: '0.9rem', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {talent.email}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <PhoneOutlinedIcon sx={{ color: 'text.secondary', fontSize: '0.9rem', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {talent.phone}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <LocationOnOutlinedIcon sx={{ color: 'text.secondary', fontSize: '0.9rem', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {talent.location}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <LinkIcon sx={{ color: 'text.secondary', fontSize: '0.9rem', mr: 1 }} />
                    <Typography 
                      variant="body2" 
                      color="primary"
                      sx={{ 
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' } 
                      }}
                      onClick={() => window.open(talent.portfolio, '_blank')}
                    >
                      View Portfolio
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            
            {talent.coverLetter && (
              <Box 
                sx={{ 
                  p: 1.5, 
                  backgroundColor: 'rgba(0,0,0,0.02)', 
                  borderRadius: 1,
                  mt: 2
                }}
              >
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  {talent.coverLetter.length > 150 
                    ? `${talent.coverLetter.substring(0, 150)}...` 
                    : talent.coverLetter}
                </Typography>
              </Box>
            )}
          </Grid>
          
          {/* Right column: Actions */}
          <Grid item xs={12} sm={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
            {talent.status === 'pending' ? (
              <>
                <Button 
                  variant="contained" 
                  startIcon={<CheckCircleOutlineIcon />}
                  onClick={() => onHire(talent.id)}
                  sx={{
                    mb: 1.5,
                    backgroundColor: 'success.main',
                    '&:hover': {
                      backgroundColor: 'success.dark',
                    }
                  }}
                >
                  Hire Talent
                </Button>
                
                <Button 
                  variant="outlined" 
                  startIcon={<CancelOutlinedIcon />}
                  onClick={() => onReject(talent.id)}
                  sx={{
                    mb: 1.5,
                    borderColor: 'error.main',
                    color: 'error.main',
                    '&:hover': {
                      backgroundColor: 'error.light',
                      borderColor: 'error.dark',
                      color: 'error.dark',
                    }
                  }}
                >
                  Reject
                </Button>
              </>
            ) : (
              <Button 
                variant="outlined"
                sx={{
                  mb: 1.5,
                  borderColor: talent.status === 'hired' ? 'success.main' : 'error.main',
                  color: talent.status === 'hired' ? 'success.main' : 'error.main',
                }}
                disabled
              >
                {talent.status === 'hired' ? 'Hired' : 'Rejected'}
              </Button>
            )}
            
            <Button 
              variant="outlined"
              onClick={() => onViewProfile(talent.id)}
              sx={{
                borderColor: "#977342",
                color: "#977342",
                mb: 1.5,
                '&:hover': {
                  backgroundColor: 'rgba(151, 115, 66, 0.05)',
                  borderColor: "#CEAB76",
                }
              }}
            >
              View Full Profile
            </Button>

            <IconButton 
              aria-label="more actions"
              onClick={handleActionMenuOpen}
              sx={{ 
                alignSelf: 'flex-end',
                color: 'text.secondary'
              }}
            >
              <MoreVertIcon />
            </IconButton>
            
            <Menu
              anchorEl={actionMenuAnchor}
              open={Boolean(actionMenuAnchor)}
              onClose={handleActionMenuClose}
            >
              <MenuItem onClick={() => { handleActionMenuClose(); window.location.href = `mailto:${talent.email}`; }}>
                Send Email
              </MenuItem>
              <MenuItem onClick={() => { handleActionMenuClose(); }}>
                Download Resume
              </MenuItem>
              <MenuItem onClick={() => { handleActionMenuClose(); }}>
                Add to Favorites
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

// Tab panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`applicants-tabpanel-${index}`}
      aria-labelledby={`applicants-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Main ApplicationsPage component
export default function ApplicationsPage ({ params }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const { id } = params;
  const { getRole, roleSignedUrls } = useEvent();
  const { currentRole } = useStore(useCurrentRoleStore);
  const [cookies] = useCookies(['username']);

  // State
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [applications, setApplications] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);

  // Gold color theme
  const goldPrimary = "#977342";
  const goldLight = "#CEAB76";

  // Fetch role and applications data
  useEffect(() => {
    const loadRoleData = () => {
      console.log("Current Role:", currentRole);
      try {
        setLoading(true);
        setError(null);
        
        // Check if we have a valid currentRole object
        if (currentRole && currentRole.id) {
          // Create a properly formatted role object
          const formattedRole = {
            id: currentRole.id,
            title: currentRole.title || "Untitled Role",
            description: currentRole.description || "No description available",
            location: currentRole.location || "Remote",
            deadline:
              currentRole.deadline ||
              currentRole.hard_deadline ||
              currentRole.soft_deadline,
            eventPoster: currentRole.event_poster || "",
            isUrgent:
              currentRole.is_urgent ||
              isDeadlineUrgent(
                currentRole.deadline ||
                currentRole.hard_deadline ||
                currentRole.soft_deadline
              ),
            hourlyPay: currentRole.hourlyPay,
            dailyPay: currentRole.dailyPay,
            projectPay: currentRole.projectPay,
            openings: currentRole.openings,
            genders: currentRole.genders,
            ethnicities: currentRole.ethnicities,
            minAge: currentRole.minAge,
            maxAge: currentRole.maxAge,
            skill: currentRole.skill,
            experienceLevel: currentRole.experience_level,
            roleType: currentRole.role_type,
            event: currentRole.event,
            // For real implementation, get applicants from the role data
            applicants: currentRole.applicants || []
          };
          
          setRole(formattedRole);
          
          // In a real implementation, you would fetch talent profiles here
          // and match them with the role's applicants
          // For now, we'll use mock data
          setApplications(mockTalentProfiles);
        } else {
          setError("Role not found. Please go back and try again.");
        }
      } catch (err) {
        console.error("Error processing role data:", err);
        setError("Failed to load role details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    loadRoleData();
  }, [currentRole]);

  // Update image URL when roleSignedUrls changes
  useEffect(() => {
    if (roleSignedUrls && role?.id) {
      const signedUrl = roleSignedUrls[role.id];
      if (signedUrl && signedUrl !== "") {
        setRole((prev) => ({
          ...prev,
          imageUrl: signedUrl,
        }));
      } else if (!role.imageUrl) {
        setRole((prev) => ({
          ...prev,
          imageUrl: DEFAULT_JOB_IMAGE,
        }));
      }
    }
  }, [roleSignedUrls, role?.id]);

  // Calculate highest pay rate to display
  const getPayDisplay = () => {
    if (!role) return "Contact for rates";

    if (role.projectPay) return `${role.projectPay} AED (Project)`;
    if (role.dailyPay) return `${role.dailyPay} AED/day`;
    if (role.hourlyPay) return `${role.hourlyPay} AED/hr`;
    return "Contact for rates";
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle filter menu
  const handleFilterMenuOpen = (event) => {
    setFilterMenuAnchor(event.currentTarget);
  };
  
  const handleFilterMenuClose = () => {
    setFilterMenuAnchor(null);
  };

  // Handle talent actions
  const handleHireTalent = (talentId) => {
    // In a real implementation, you would call an API to update the talent status
    setApplications(applications.map(talent => 
      talent.id === talentId ? { ...talent, status: 'hired' } : talent
    ));
  };
  
  const handleRejectTalent = (talentId) => {
    // In a real implementation, you would call an API to update the talent status
    setApplications(applications.map(talent => 
      talent.id === talentId ? { ...talent, status: 'rejected' } : talent
    ));
  };
  
  const handleViewProfile = (talentId) => {
    // In a real implementation, you would navigate to the talent profile page
    console.log(`Viewing profile for talent ID: ${talentId}`);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          minHeight: "100vh",
        }}
      >
        <SecondaryHeader />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            flexDirection: "column",
            gap: 2,
          }}
        >
          <CircularProgress sx={{ color: goldPrimary }} />
          <Typography>Loading applications...</Typography>
        </Box>
        <PrimaryFooter />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          minHeight: "100vh",
        }}
      >
        <SecondaryHeader />
        <Container maxWidth="md" sx={{ my: 8, textAlign: "center" }}>
          <ErrorOutlineIcon sx={{ fontSize: 60, color: "#f44336", mb: 2 }} />
          <Typography variant="h4" sx={{ mb: 2, fontWeight: "600" }}>
            Oops! Something went wrong
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "#666" }}>
            {error}
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.push("/dashboard")}
            sx={{
              backgroundColor: goldPrimary,
              color: "white",
              borderRadius: "8px",
              py: 1.5,
              px: 4,
              textTransform: "none",
              fontWeight: "500",
              "&:hover": {
                backgroundColor: goldLight,
              },
            }}
          >
            Return to Dashboard
          </Button>
        </Container>
        <PrimaryFooter />
      </Box>
    );
  }

  if (!currentRole) return <WhiteLoading />;

  // Filter applications by tab
  const filteredApplications = 
    tabValue === 0 ? applications : 
    tabValue === 1 ? applications.filter(app => app.status === 'pending') :
    tabValue === 2 ? applications.filter(app => app.status === 'hired') :
    applications.filter(app => app.status === 'rejected');

  // Calculate application statistics
  const pendingCount = applications.filter(app => app.status === 'pending').length;
  const hiredCount = applications.filter(app => app.status === 'hired').length;
  const rejectedCount = applications.filter(app => app.status === 'rejected').length;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <SecondaryHeader />

      <Container maxWidth="xl" sx={{ my: { xs: 3, md: 5 }, flexGrow: 1 }}>
        {/* Header with navigation */}
        <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => router.push("/dashboard")}
            aria-label="go back"
            sx={{
              mr: 2,
              color: goldPrimary,
              "&:hover": {
                backgroundColor: "rgba(151, 115, 66, 0.08)",
              },
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>

          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "1.5rem", md: "2rem" },
              color: "#333",
            }}
          >
            Applications for {role?.title}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Left column: Role details */}
          <Grid item xs={12} md={4} lg={3}>
            <Card
              elevation={0}
              sx={{
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid #eee",
                position: 'sticky',
                top: 24,
              }}
            >
              <Box sx={{ position: "relative" }}>
                {!imageLoaded && !imageError && (
                  <Box
                    sx={{
                      height: 180,
                      backgroundColor: "rgba(151, 115, 66, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress sx={{ color: goldPrimary }} />
                  </Box>
                )}

                <CardMedia
                  component="img"
                  image={role?.imageUrl || DEFAULT_JOB_IMAGE}
                  alt={`${role?.title} job opportunity`}
                  sx={{
                    height: 180,
                    objectFit: "cover",
                    display: imageLoaded || imageError ? "block" : "none",
                  }}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => {
                    setImageError(true);
                    setImageLoaded(true);
                  }}
                />

                {role?.isUrgent && (
                  <Chip
                    label="URGENT"
                    color="error"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      fontWeight: "600",
                      letterSpacing: "0.5px",
                      fontSize: "11px",
                      zIndex: 1,
                    }}
                  />
                )}
              </Box>
              <CardContent sx={{ p: 3 }}>
  <Typography
    variant="h5"
    component="h2"
    sx={{
      fontWeight: "600",
      color: "#333",
      mb: 2,
    }}
  >
    {role?.title}
  </Typography>

  <Grid container spacing={2} sx={{ mb: 3 }}>
    <Grid item xs={12}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <LocationOnOutlinedIcon sx={{ color: goldPrimary, mr: 1 }} />
        <Typography variant="body1" color="text.secondary">
          {role?.location || "Remote"}
        </Typography>
      </Box>
    </Grid>

    <Grid item xs={12}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <AccessTimeOutlinedIcon sx={{ color: goldPrimary, mr: 1 }} />
        <Typography variant="body1" color="text.secondary">
          Deadline: {formatDeadline(role?.deadline)}
        </Typography>
      </Box>
    </Grid>

    <Grid item xs={12}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <MonetizationOnOutlinedIcon sx={{ color: goldPrimary, mr: 1 }} />
        <Typography variant="body1" color="text.secondary">
          {getPayDisplay()}
        </Typography>
      </Box>
    </Grid>

    {role?.openings && (
      <Grid item xs={12}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <WorkOutlineOutlinedIcon sx={{ color: goldPrimary, mr: 1 }} />
          <Typography variant="body1" color="text.secondary">
            {role.openings}{" "}
            {parseInt(role.openings) === 1 ? "Position" : "Positions"}
          </Typography>
        </Box>
      </Grid>
    )}
  </Grid>

  <Divider sx={{ my: 2 }} />

  {/* Application statistics */}
  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
    Application Stats
  </Typography>

  <Grid container spacing={2} sx={{ mb: 2 }}>
    <Grid item xs={4}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 1.5, 
          textAlign: 'center',
          backgroundColor: 'rgba(151, 115, 66, 0.08)',
          borderRadius: 2
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: goldPrimary }}>
          {applications.length}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Total
        </Typography>
      </Paper>
    </Grid>

    <Grid item xs={4}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 1.5, 
          textAlign: 'center',
          backgroundColor: 'rgba(76, 175, 80, 0.08)',
          borderRadius: 2
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'success.main' }}>
          {hiredCount}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Hired
        </Typography>
      </Paper>
    </Grid>

    <Grid item xs={4}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 1.5, 
          textAlign: 'center',
          backgroundColor: 'rgba(244, 67, 54, 0.08)',
          borderRadius: 2
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'error.main' }}>
          {rejectedCount}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Rejected
        </Typography>
      </Paper>
    </Grid>
  </Grid>

  <Divider sx={{ my: 2 }} />

  {/* Quick actions */}
  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
    Actions
  </Typography>

  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <Button
      variant="contained"
      fullWidth
      sx={{
        backgroundColor: goldPrimary,
        color: 'white',
        '&:hover': {
          backgroundColor: goldLight,
        }
      }}
      onClick={() => router.push(`/events/edit/${role.id}`)}
    >
      Edit Role
    </Button>

    <Button
      variant="outlined"
      fullWidth
      sx={{
        borderColor: goldPrimary,
        color: goldPrimary,
        '&:hover': {
          borderColor: goldLight,
          backgroundColor: 'rgba(151, 115, 66, 0.05)',
        }
      }}
      onClick={() => window.open(`/jobs/${role.id}`, '_blank')}
    >
      View Public Listing
    </Button>
  </Box>
</CardContent>
</Card>
        </Grid>

        {/* Right column: Applications */}
        <Grid item xs={12} md={8} lg={9}>
          <Card
            elevation={0}
            sx={{
              borderRadius: "12px",
              border: "1px solid #eee",
              overflow: "visible",
              mb: 4
            }}
          >
            <CardContent sx={{ p: 3 }}>
              {/* Tabs and filters header */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                borderBottom: 1,
                borderColor: 'divider',
              }}>
                <Tabs 
                  value={tabValue} 
                  onChange={handleTabChange}
                  indicatorColor="primary"
                  textColor="inherit"
                  sx={{
                    '& .MuiTab-root': {
                      color: 'text.secondary',
                      fontWeight: 500,
                      '&.Mui-selected': {
                        color: goldPrimary,
                        fontWeight: 600,
                      }
                    },
                    '& .MuiTabs-indicator': {
                      backgroundColor: goldPrimary,
                    }
                  }}
                >
                  <Tab label={`All (${applications.length})`} />
                  <Tab label={`Pending (${pendingCount})`} />
                  <Tab label={`Hired (${hiredCount})`} />
                  <Tab label={`Rejected (${rejectedCount})`} />
                </Tabs>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title="Filter applications">
                    <IconButton 
                      onClick={handleFilterMenuOpen}
                      size="small"
                      sx={{ color: 'text.secondary' }}
                    >
                      <FilterListIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title="Sort applications">
                    <IconButton 
                      size="small"
                      sx={{ color: 'text.secondary' }}
                    >
                      <SortIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Menu
                  anchorEl={filterMenuAnchor}
                  open={Boolean(filterMenuAnchor)}
                  onClose={handleFilterMenuClose}
                >
                  <MenuItem onClick={handleFilterMenuClose}>Experience: 0-1 years</MenuItem>
                  <MenuItem onClick={handleFilterMenuClose}>Experience: 1-3 years</MenuItem>
                  <MenuItem onClick={handleFilterMenuClose}>Experience: 3+ years</MenuItem>
                  <MenuItem onClick={handleFilterMenuClose}>Rating: 4+ stars</MenuItem>
                  <MenuItem onClick={handleFilterMenuClose}>Location: Dubai</MenuItem>
                </Menu>
              </Box>

              {/* Applications content */}
              <TabPanel value={tabValue} index={0}>
                {filteredApplications.length > 0 ? (
                  filteredApplications.map(talent => (
                    <TalentApplicationCard
                      key={talent.id}
                      talent={talent}
                      onHire={handleHireTalent}
                      onReject={handleRejectTalent}
                      onViewProfile={handleViewProfile}
                    />
                  ))
                ) : (
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <PersonOutlineOutlinedIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      No applications found
                    </Typography>
                    <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
                      There are no applications matching your current filters.
                    </Typography>
                  </Box>
                )}
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                {filteredApplications.length > 0 ? (
                  filteredApplications.map(talent => (
                    <TalentApplicationCard
                      key={talent.id}
                      talent={talent}
                      onHire={handleHireTalent}
                      onReject={handleRejectTalent}
                      onViewProfile={handleViewProfile}
                    />
                  ))
                ) : (
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <PersonOutlineOutlinedIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      No pending applications
                    </Typography>
                    <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
                      All applications have been processed.
                    </Typography>
                  </Box>
                )}
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                {filteredApplications.length > 0 ? (
                  filteredApplications.map(talent => (
                    <TalentApplicationCard
                      key={talent.id}
                      talent={talent}
                      onHire={handleHireTalent}
                      onReject={handleRejectTalent}
                      onViewProfile={handleViewProfile}
                    />
                  ))
                ) : (
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      No hired talents yet
                    </Typography>
                    <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
                      Review your pending applications and hire talents.
                    </Typography>
                  </Box>
                )}
              </TabPanel>

              <TabPanel value={tabValue} index={3}>
                {filteredApplications.length > 0 ? (
                  filteredApplications.map(talent => (
                    <TalentApplicationCard
                      key={talent.id}
                      talent={talent}
                      onHire={handleHireTalent}
                      onReject={handleRejectTalent}
                      onViewProfile={handleViewProfile}
                    />
                  ))
                ) : (
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <CancelOutlinedIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      No rejected applications
                    </Typography>
                    <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
                      You haven't rejected any applicants yet.
                    </Typography>
                  </Box>
                )}
              </TabPanel>
            </CardContent>
          </Card>
          
          {/* Help box */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: '12px',
              border: '1px solid #eee',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              bgcolor: 'rgba(151, 115, 66, 0.05)',
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(151, 115, 66, 0.1)',
                color: goldPrimary,
              }}
            >
              <CalendarTodayOutlinedIcon />
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333' }}>
                Event Date Approaching
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Remember to finalize your talent selections at least 7 days before your event date.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>

    <PrimaryFooter />
  </Box>
);
}