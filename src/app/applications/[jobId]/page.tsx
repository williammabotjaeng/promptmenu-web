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
import { useTalentProfile } from "@/providers/talent-profile-provider";

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

// Talent application card component
const TalentApplicationCard = ({ talent, onHire, onReject, onViewProfile, signedUrls }) => {
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null);
  
  const handleActionMenuOpen = (event) => {
    setActionMenuAnchor(event.currentTarget);
  };
  
  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
  };

  // Get the signed URL for the talent's headshot
  const profileImageUrl = talent?.user?.id && signedUrls && signedUrls[talent.user.id] 
    ? signedUrls[talent.user.id] 
    : DEFAULT_AVATAR;
  
  console.log(`Profile image for user ${talent?.user?.id}:`, {
    hasUserID: Boolean(talent?.user?.id),
    hasSignedUrls: Boolean(signedUrls),
    hasSpecificURL: talent?.user?.id && signedUrls ? Boolean(signedUrls[talent.user.id]) : false,
    finalURL: profileImageUrl
  });
  
  const status = talent?.application_data?.status || 'pending';
  
  return (
    <Card 
      elevation={1}
      sx={{
        borderRadius: 2,
        mb: 2.5,
        overflow: 'visible',
        border: '1px solid',
        borderColor: status === 'hired' 
          ? 'rgba(76, 175, 80, 0.3)' 
          : status === 'rejected' 
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
                src={profileImageUrl} 
                alt={`${talent.firstname} ${talent.lastname}`}
                sx={{ 
                  width: 80, 
                  height: 80, 
                  border: '3px solid',
                  borderColor: status === 'hired' 
                    ? 'success.main' 
                    : status === 'rejected' 
                      ? 'error.main' 
                      : "#977342",
                  mb: 1
                }}
              />
              {status !== 'pending' && (
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    bottom: 5, 
                    right: -5,
                    backgroundColor: status === 'hired' ? 'success.main' : 'error.main',
                    color: 'white',
                    borderRadius: '50%',
                    width: 28,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {status === 'hired' 
                    ? <CheckCircleOutlineIcon fontSize="small" /> 
                    : <CancelOutlinedIcon fontSize="small" />}
                </Box>
              )}
            </Box>
            
            <Rating 
              value={talent.rating || 0} 
              precision={0.1} 
              readOnly 
              size="small"
              sx={{ mb: 1 }}
            />
            
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem', textAlign: 'center' }}>
              Applied {moment(talent.application_data?.application_date || new Date()).fromNow()}
            </Typography>
          </Grid>
          
          {/* Middle column: Talent details */}
          <Grid item xs={12} sm={7}>
            <Box sx={{ mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mr: 1 }}>
                  {typeof talent.firstname === 'string' ? talent.firstname : ''} {typeof talent.lastname === 'string' ? talent.lastname : ''}
                </Typography>
                <Chip 
                  label={typeof talent.experience === 'string' ? talent.experience : ''}
                  size="small"
                  sx={{ 
                    backgroundColor: 'rgba(151, 115, 66, 0.1)', 
                    color: "#977342",
                    height: 22,
                    display: talent.experience ? 'flex' : 'none'
                  }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                {Array.isArray(talent.skills) && talent.skills.map((skill, index) => {
                  // Handle case where skill might be an object with name property
                  const skillLabel = typeof skill === 'string' 
                    ? skill 
                    : (typeof skill === 'object' && skill !== null && 'name' in skill) 
                      ? skill.name 
                      : '';
                      
                  return (
                    <Chip 
                      key={index} 
                      label={skillLabel}
                      size="small"
                      sx={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.05)', 
                        fontSize: '0.7rem',
                        height: 20
                      }}
                    />
                  );
                })}
              </Box>
              
              <Grid container spacing={1}>
                {talent.user?.email && (
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <EmailOutlinedIcon sx={{ color: 'text.secondary', fontSize: '0.9rem', mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {typeof talent.user?.email === 'string' ? talent.user.email : ''}
                      </Typography>
                    </Box>
                  </Grid>
                )}
                
                {talent.phone_number && (
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <PhoneOutlinedIcon sx={{ color: 'text.secondary', fontSize: '0.9rem', mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {typeof talent.phone_number === 'string' ? talent.phone_number : ''}
                      </Typography>
                    </Box>
                  </Grid>
                )}
                
                {talent.nationality && (
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <LocationOnOutlinedIcon sx={{ color: 'text.secondary', fontSize: '0.9rem', mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {typeof talent.nationality === 'string' ? talent.nationality : ''}
                      </Typography>
                    </Box>
                  </Grid>
                )}
                
                {talent.social_media_links?.website && (
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
                        onClick={() => window.open(talent.social_media_links.website, '_blank')}
                      >
                        View Portfolio
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Box>
            
            {talent.application_data?.cover_letter && (
              <Box 
                sx={{ 
                  p: 1.5, 
                  backgroundColor: 'rgba(0,0,0,0.02)', 
                  borderRadius: 1,
                  mt: 2
                }}
              >
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  {typeof talent.application_data?.cover_letter === 'string' 
                    ? (talent.application_data.cover_letter.length > 150 
                      ? `${talent.application_data.cover_letter.substring(0, 150)}...` 
                      : talent.application_data.cover_letter)
                    : ''}
                </Typography>
              </Box>
            )}
          </Grid>
          
          {/* Right column: Actions */}
          <Grid item xs={12} sm={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
            {status === 'pending' ? (
              <>
                <Button 
                  variant="contained" 
                  startIcon={<CheckCircleOutlineIcon />}
                  onClick={() => onHire(talent.user?.id)}
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
                  onClick={() => onReject(talent.user?.id)}
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
                  borderColor: status === 'hired' ? 'success.main' : 'error.main',
                  color: status === 'hired' ? 'success.main' : 'error.main',
                }}
                disabled
              >
                {status === 'hired' ? 'Hired' : 'Rejected'}
              </Button>
            )}
            
            <Button 
              variant="outlined"
              onClick={() => onViewProfile(talent.user?.id)}
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
              {talent.user?.email && (
                <MenuItem onClick={() => { handleActionMenuClose(); window.location.href = `mailto:${talent.user.email}`; }}>
                  Send Email
                </MenuItem>
              )}
              {talent.portfolio_pdf && (
                <MenuItem onClick={() => { handleActionMenuClose(); /* Logic to download resume */ }}>
                  Download Resume
                </MenuItem>
              )}
              <MenuItem onClick={() => { handleActionMenuClose(); /* Logic to add to favorites */ }}>
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
export default function ApplicationsPage({ params }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const { id } = params;
  const { getRole, roleSignedUrls } = useEvent();
  const { currentRole } = useStore(useCurrentRoleStore);
  const [cookies] = useCookies(['username']);
  
  // Get talent profile functions from context
  const { 
    roleApplicants, 
    fetchRoleApplicants,
    updateApplicantStatus, 
    profileSignedUrls 
  } = useTalentProfile();

  // State
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);
  const [sortOption, setSortOption] = useState("newest");
  const [filteredApplications, setFilteredApplications] = useState([]);

  // Gold color theme
  const goldPrimary = "#977342";
  const goldLight = "#CEAB76";

  // Fetch role and applications data on initial mount only
  useEffect(() => {
    if (!currentRole?.id || !fetchRoleApplicants) return;
    
    const loadRoleData = async () => {
      try {
        setLoading(true);
        setError(null);
        
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
        };
        
        setRole(formattedRole);
        
        // Fetch real applicants for this role
        try {
          await fetchRoleApplicants(String(currentRole.id));
        } catch (err) {
          console.error("Error fetching role applicants:", err);
          setError("Failed to load applicants. Please try again later.");
        }
      } catch (err) {
        console.error("Error processing role data:", err);
        setError("Failed to load role details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    loadRoleData();
    // Only run this effect once on mount or when currentRole.id changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRole?.id]);

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

  // Filter and sort applications when role applicants change or tab changes
  useEffect(() => {
    if (!roleApplicants) return;
    
    let filtered = [...roleApplicants];
    
    // Apply tab filtering
    if (tabValue === 1) {
      filtered = filtered.filter(app => 
        app.application_data?.status === 'pending'
      );
    } else if (tabValue === 2) {
      filtered = filtered.filter(app => 
        app.application_data?.status === 'hired'
      );
    } else if (tabValue === 3) {
      filtered = filtered.filter(app => 
        app.application_data?.status === 'rejected'
      );
    }
    
    // Apply sorting
    if (sortOption === "newest") {
      filtered.sort((a, b) => {
        const dateA: any = new Date(a.application_data?.application_date || 0);
        const dateB: any = new Date(b.application_data?.application_date || 0);
        return dateB - dateA;
      });
    } else if (sortOption === "oldest") {
      filtered.sort((a, b) => {
        const dateA: any = new Date(a.application_data?.application_date || 0);
        const dateB: any = new Date(b.application_data?.application_date || 0);
        return dateA - dateB;
      });
    } else if (sortOption === "rating") {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    
    setFilteredApplications(filtered);
  }, [roleApplicants, tabValue, sortOption]);

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
  
  // Handle sorting menu item selection
  const handleSortChange = (sortType) => {
    setSortOption(sortType);
    handleFilterMenuClose();
  };

  // Handle talent actions
  const handleHireTalent = async (userId) => {
    if (!userId || !role?.id) return;
    
    try {
      await updateApplicantStatus(role.id, userId, 'hired');
    } catch (error) {
      console.error("Error hiring talent:", error);
    }
  };
  
  const handleRejectTalent = async (userId) => {
    if (!userId || !role?.id) return;
    
    try {
      await updateApplicantStatus(role.id, userId, 'rejected');
    } catch (error) {
      console.error("Error rejecting talent:", error);
    }
  };
  
  const handleViewProfile = (userId) => {
    if (!userId) return;
    
    // Navigate to the talent profile page
    router.push(`/talent/profile/${userId}`);
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

  // Calculate application statistics
  const applications = roleApplicants || [];
  const pendingCount = applications.filter(app => app.application_data?.status === 'pending').length;
  const hiredCount = applications.filter(app => app.application_data?.status === 'hired').length;
  const rejectedCount = applications.filter(app => app.application_data?.status === 'rejected').length;

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

                  {role?.deadline && (
                    <Grid item xs={12}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AccessTimeOutlinedIcon sx={{ color: goldPrimary, mr: 1 }} />
                        <Typography variant="body1" color="text.secondary">
                          Deadline: {formatDeadline(role?.deadline)}
                        </Typography>
                      </Box>
                    </Grid>
                  )}

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
                        onClick={handleFilterMenuOpen}
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
                    <MenuItem onClick={() => handleSortChange("newest")}>Sort: Newest First</MenuItem>
                    <MenuItem onClick={() => handleSortChange("oldest")}>Sort: Oldest First</MenuItem>
                    <MenuItem onClick={() => handleSortChange("rating")}>Sort: Highest Rating</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleFilterMenuClose}>Experience: 0-1 years</MenuItem>
                    <MenuItem onClick={handleFilterMenuClose}>Experience: 1-3 years</MenuItem>
                    <MenuItem onClick={handleFilterMenuClose}>Experience: 3+ years</MenuItem>
                  </Menu>
                </Box>

                {/* Applications content */}
                <TabPanel value={tabValue} index={0}>
                  {filteredApplications.length > 0 ? (
                    filteredApplications.map(talent => (
                      <TalentApplicationCard
                        key={talent.user?.id || talent.id}
                        talent={talent}
                        onHire={handleHireTalent}
                        onReject={handleRejectTalent}
                        onViewProfile={handleViewProfile}
                        signedUrls={profileSignedUrls}
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
                        key={talent.user?.id || talent.id}
                        talent={talent}
                        onHire={handleHireTalent}
                        onReject={handleRejectTalent}
                        onViewProfile={handleViewProfile}
                        signedUrls={profileSignedUrls}
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
                        key={talent.user?.id || talent.id}
                        talent={talent}
                        onHire={handleHireTalent}
                        onReject={handleRejectTalent}
                        onViewProfile={handleViewProfile}
                        signedUrls={profileSignedUrls}
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
                        key={talent.user?.id || talent.id}
                        talent={talent}
                        onHire={handleHireTalent}
                        onReject={handleRejectTalent}
                        onViewProfile={handleViewProfile}
                        signedUrls={profileSignedUrls}
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