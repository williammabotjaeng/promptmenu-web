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
  TextField,
  CircularProgress,
  Alert,
  Grid,
  IconButton,
  useTheme,
  useMediaQuery,
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
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import { useEvent } from "@/providers/event-provider";
import FetchingRole from "@/components/dashboard/FetchingRole";
import { useStore } from "zustand";
import useCurrentRoleStore from "@/state/use-current-role-store";
import WhiteLoading from "@/components/WhiteLoading";
import { useAnimationFrame } from "framer-motion";
import { useCookies } from "react-cookie";

// Default image to use when no poster is available
const DEFAULT_JOB_IMAGE =
  "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/fbf9227c806ec79d0dbbdfafe208eba075157780299caaa1a8b6d38ae92d7bb2?apiKey=7fae980a988640eea8add1e49a5d542e&";

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

// Basic form validation
const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
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

const RoleApplyPage = ({ params }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const { id } = params;
  const { submitApplication, roleSignedUrls } = useEvent();
  const { currentRole, clearCurrentRole } = useStore(useCurrentRoleStore);
  const [cookies] = useCookies(['username']);

  // State for role data and application process
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Application form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resumeLink: "",
    workSamples: "",
    messageToHiringManager: "",
    answers: [],
  });

  // Form validation state
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const userName = cookies?.username;

  // Load role data from currentRole store
  useEffect(() => {
    const loadRoleData = () => {
      console.log("Current Role:", currentRole);
      try {
        setLoading(true);
        setError(null);
        
        // Check if we have a valid currentRole object
        if (currentRole && currentRole.id) {
          // Initialize answers array based on questions length
          const questionsArray = Array.isArray(currentRole.application_questions)
            ? currentRole.application_questions
            : currentRole.application_questions
              ? [currentRole.application_questions]
              : [];
          
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
            questions: questionsArray,
            event: currentRole.event,
          };
          
          setRole(formattedRole);
          setFormData(prev => ({
            ...prev,
            answers: new Array(questionsArray.length).fill(""),
          }));
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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear validation errors as user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  // Handle question answers
  const handleAnswerChange = (index, value) => {
    const newAnswers = [...formData.answers];
    newAnswers[index] = value;
    setFormData({
      ...formData,
      answers: newAnswers,
    });
  };

  // Validate form before submission
  const validateForm = () => {
    const errors = {
      fullName: "",
      email: "",
      phone: "",
    };
    let isValid = true;

    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handle application submission
  const handleSubmit = async () => {
      try {
        await submitApplication({
            user_id: userName,
            event_id: currentRole?.event_id,
            role_id: currentRole?.id            
        });
        // Show success message
        setSubmissionSuccess(true);
      } catch (err) {
        console.error("Error submitting application:", err);
        setError("Failed to submit application. Please try again later.");
      } finally {
        setSubmitting(false);
      }
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
          <CircularProgress sx={{ color: "#977342" }} />
          <FetchingRole />
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
            onClick={() => {
                clearCurrentRole();
                router.push("/jobs");
            }}
            sx={{
              backgroundColor: "#977342",
              color: "white",
              borderRadius: "8px",
              py: 1.5,
              px: 4,
              textTransform: "none",
              fontWeight: "500",
              "&:hover": {
                backgroundColor: "#CEAB76",
              },
            }}
          >
            Browse Jobs
          </Button>
        </Container>
        <PrimaryFooter />
      </Box>
    );
  }

  if (!currentRole) return <WhiteLoading />;

  if (submissionSuccess) {
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
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "rgba(76, 175, 80, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px auto",
            }}
          >
            <CheckCircleOutlineIcon sx={{ fontSize: 40, color: "#4caf50" }} />
          </Box>

          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: "600",
              color: "#333",
              mb: 2,
            }}
          >
            Application Submitted!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#555",
              mb: 4,
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Thank you for applying to {role?.title}. Your application has been
            received and will be reviewed shortly. We'll be in touch with you via
            the email address you provided.
          </Typography>

          <Button
            variant="contained"
            onClick={() => {
                clearCurrentRole();
                router.push("/jobs");
            }}
            sx={{
              backgroundColor: "#977342",
              color: "white",
              borderRadius: "8px",
              py: 1.5,
              px: 4,
              textTransform: "none",
              fontWeight: "500",
              "&:hover": {
                backgroundColor: "#CEAB76",
              },
            }}
          >
            Browse More Jobs
          </Button>
        </Container>
        <PrimaryFooter />
      </Box>
    );
  }

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

      <Container maxWidth="lg" sx={{ my: { xs: 3, md: 5 }, flexGrow: 1 }}>
        <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => { 
                clearCurrentRole();
                router.push("/jobs"); 
            }}
            aria-label="go back"
            sx={{
              mr: 2,
              color: "#977342",
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
            Apply For {role?.title}
          </Typography>
        </Box>

        {/* Role Details Card */}
        <Card
          elevation={0}
          sx={{
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #eee",
            mb: 4,
          }}
        >
          <Box sx={{ position: "relative" }}>
            {!imageLoaded && !imageError && (
              <Box
                sx={{
                  height: 220,
                  backgroundColor: "rgba(151, 115, 66, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress sx={{ color: "#977342" }} />
              </Box>
            )}

            <CardMedia
              component="img"
              image={role?.imageUrl || DEFAULT_JOB_IMAGE}
              alt={`${role?.title} job opportunity`}
              sx={{
                height: 220,
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

            {role?.skill && (
              <Chip
                label={role.skill}
                size="small"
                sx={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  backgroundColor: "rgba(255,255,255,0.85)",
                  color: "#977342",
                  fontWeight: "500",
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
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LocationOnOutlinedIcon sx={{ color: "#977342", mr: 1 }} />
                  <Typography variant="body1" color="text.secondary">
                    {role?.location || "Remote"}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AccessTimeOutlinedIcon sx={{ color: "#977342", mr: 1 }} />
                  <Typography variant="body1" color="text.secondary">
                    Apply by {formatDeadline(role?.deadline)}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <MonetizationOnOutlinedIcon sx={{ color: "#977342", mr: 1 }} />
                  <Typography variant="body1" color="text.secondary">
                    {getPayDisplay()}
                  </Typography>
                </Box>
              </Grid>

              {role?.openings && (
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <WorkOutlineOutlinedIcon sx={{ color: "#977342", mr: 1 }} />
                    <Typography variant="body1" color="text.secondary">
                      {role.openings}{" "}
                      {parseInt(role.openings) === 1 ? "Position" : "Positions"}
                    </Typography>
                  </Box>
                </Grid>
              )}

              {role?.experienceLevel && (
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PersonOutlineOutlinedIcon sx={{ color: "#977342", mr: 1 }} />
                    <Typography variant="body1" color="text.secondary">
                      {role.experienceLevel}
                    </Typography>
                  </Box>
                </Grid>
              )}

              {role?.roleType && (
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <WorkOutlineOutlinedIcon sx={{ color: "#977342", mr: 1 }} />
                    <Typography variant="body1" color="text.secondary">
                      {role.roleType}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" sx={{ mb: 2, fontWeight: "600" }}>
              Role Description
            </Typography>

            <Typography
              variant="body1"
              sx={{
                whiteSpace: "pre-line",
                mb: 3,
                color: "#444",
                lineHeight: 1.7,
              }}
            >
              {role?.description}
            </Typography>

            {(role?.ethnicities?.length > 0 ||
              role?.genders?.length > 0 ||
              role?.minAge ||
              role?.maxAge) && (
              <>
                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" sx={{ mb: 2, fontWeight: "600" }}>
                  Requirements
                </Typography>

                <Grid container spacing={2}>
                  {role?.genders?.length > 0 && (
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        Gender:
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {role.genders.map((gender) => (
                          <Chip
                            key={gender}
                            label={gender}
                            size="small"
                            sx={{
                              backgroundColor: "rgba(151, 115, 66, 0.1)",
                              color: "#977342",
                            }}
                          />
                        ))}
                      </Box>
                    </Grid>
                  )}

                  {role?.ethnicities?.length > 0 && (
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        Ethnicity:
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {role.ethnicities.map((ethnicity) => (
                          <Chip
                            key={ethnicity}
                            label={ethnicity}
                            size="small"
                            sx={{
                              backgroundColor: "rgba(151, 115, 66, 0.1)",
                              color: "#977342",
                            }}
                          />
                        ))}
                      </Box>
                    </Grid>
                  )}

                  {(role?.minAge || role?.maxAge) && (
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        Age Range:
                      </Typography>
                      <Typography variant="body1">
                        {role.minAge && role.maxAge
                          ? `${role.minAge} - ${role.maxAge} years`
                          : role.minAge
                          ? `Minimum ${role.minAge} years`
                          : `Maximum ${role.maxAge} years`}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </>
            )}
          </CardContent>
        </Card>

        <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={submitting}
                startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : null}
                sx={{
                  backgroundColor: "#977342",
                  color: "white",
                  borderRadius: "8px",
                  py: 1.5,
                  px: 4,
                  textTransform: "none",
                  fontWeight: "500",
                  "&:hover": {
                    backgroundColor: "#CEAB76",
                  },
                }}
              >
                {submitting ? "Submitting Application..." : "Apply for this Role"}
              </Button>
              
              <Button
                variant="outlined"
                onClick={() => { 
                    clearCurrentRole();
                    router.push("/jobs");
                }}
                sx={{
                  ml: 2,
                  borderColor: "#977342",
                  color: "#977342",
                  borderRadius: "8px",
                  py: 1.5,
                  px: 3,
                  textTransform: "none",
                  fontWeight: "500",
                  "&:hover": {
                    backgroundColor: "rgba(151, 115, 66, 0.04)",
                    borderColor: "#CEAB76",
                  },
                }}
              >
                Cancel
              </Button>
            </Box>
      </Container>

      <PrimaryFooter />
    </Box>
  );
};

export default RoleApplyPage;