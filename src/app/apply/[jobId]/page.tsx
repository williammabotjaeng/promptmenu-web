"use client";

import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert,
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
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { useEvent } from "@/providers/event-provider";

// Default image to use when no poster is available
const DEFAULT_JOB_IMAGE =
  "https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/fbf9227c806ec79d0dbbdfafe208eba075157780299caaa1a8b6d38ae92d7bb2?apiKey=7fae980a988640eea8add1e49a5d542e&";

// Helper function to format date for display
const formatDeadline = (dateString) => {
  if (!dateString) return "No deadline";

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
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
  const { getRole, roleSignedUrls, submitApplication } = useEvent();

  // State for role data and application process
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
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
    answers: [],
  });

  // Form validation state
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  // Fetch role data
  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        setLoading(true);
        setError(null);

        const roleData: any = await getRole(id);

        if (roleData) {
          // Initialize answers array based on questions length
          const questionsArray = Array.isArray(roleData.application_questions)
            ? roleData.application_questions
            : roleData.application_questions
            ? [roleData.application_questions]
            : [];

          // Create a properly formatted role object
          const formattedRole = {
            id: roleData.id,
            title: roleData.title || "Untitled Role",
            description: roleData.description || "No description available",
            location: roleData.location || "Remote",
            deadline:
              roleData.application_deadline ||
              roleData.hard_deadline ||
              roleData.soft_deadline,
            eventPoster: roleData.event_poster || "",
            isUrgent:
              roleData.is_urgent ||
              isDeadlineUrgent(
                roleData.application_deadline ||
                  roleData.hard_deadline ||
                  roleData.soft_deadline
              ),
            hourlyPay: roleData.hourly_pay,
            dailyPay: roleData.daily_pay,
            projectPay: roleData.project_pay,
            openings: roleData.openings,
            genders: roleData.genders,
            ethnicities: roleData.ethnicities,
            minAge: roleData.min_age,
            maxAge: roleData.max_age,
            skill: roleData.skill,
            experienceLevel: roleData.experience_level,
            roleType: roleData.role_type,
            questions: questionsArray,
            event: roleData.event,
          };

          setRole(formattedRole);
          setFormData({
            ...formData,
            answers: new Array(questionsArray.length).fill(""),
          });
        } else {
          setError("Role not found");
        }
      } catch (err) {
        console.error("Error fetching role:", err);
        setError("Failed to load role details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRoleData();
    }
  }, [id]);

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
        // Set default image if no signed URL is available
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
    if (validateForm()) {
      try {
        setSubmitting(true);

        // Prepare application data
        const applicationData = {
          role_id: role.id,
          event_id: role.event,
          applicant_name: formData.fullName,
          applicant_email: formData.email,
          applicant_phone: formData.phone,
          cover_letter: formData.coverLetter,
          resume_link: formData.resumeLink,
          work_samples: formData.workSamples,
          application_answers: formData.answers,
          status: "pending",
        };

        // Submit application
        await submitApplication(applicationData);

        // Show success message
        setSubmissionSuccess(true);
        setActiveStep(2);
      } catch (err) {
        console.error("Error submitting application:", err);
        setError("Failed to submit application. Please try again later.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  // Handle navigation between steps
  const handleNext = () => {
    if (activeStep === 0) {
      setActiveStep(1);
    } else if (activeStep === 1) {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (activeStep === 1) {
      setActiveStep(0);
    } else {
      router.push("/jobs");
    }
  };

  // Step content components
  const RoleDetails = () => (
    <Card
      elevation={0}
      sx={{
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #eee",
        height: "100%",
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
          component="h1"
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
  );

  const ApplicationForm = () => (
    <Card
      elevation={0}
      sx={{
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #eee",
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h5"
          component="h1"
          sx={{
            fontWeight: "600",
            color: "#333",
            mb: 3,
          }}
        >
          Application Form
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!formErrors.fullName}
              helperText={formErrors.fullName}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "&:hover fieldset": {
                    borderColor: "#977342",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#977342",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!formErrors.email}
              helperText={formErrors.email}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "&:hover fieldset": {
                    borderColor: "#977342",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#977342",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!formErrors.phone}
              helperText={formErrors.phone}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "&:hover fieldset": {
                    borderColor: "#977342",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#977342",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Cover Letter (Optional)"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              placeholder="Introduce yourself and explain why you're a good fit for this role"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "&:hover fieldset": {
                    borderColor: "#977342",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#977342",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Resume Link (Optional)"
              name="resumeLink"
              value={formData.resumeLink}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              placeholder="Link to your resume on Google Drive, Dropbox, etc."
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "&:hover fieldset": {
                    borderColor: "#977342",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#977342",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Portfolio/Work Samples (Optional)"
              name="workSamples"
              value={formData.workSamples}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              placeholder="Link to your portfolio, work samples, etc."
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "&:hover fieldset": {
                    borderColor: "#977342",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#977342",
                  },
                },
              }}
            />
          </Grid>
        </Grid>

        {role?.questions && role.questions.length > 0 && (
          <>
            <Typography
              variant="h6"
              sx={{
                mt: 4,
                mb: 3,
                fontWeight: "600",
                color: "#333",
                display: "flex",
                alignItems: "center",
              }}
            >
              <DescriptionOutlinedIcon sx={{ mr: 1, color: "#977342" }} />
              Additional Questions
            </Typography>

            <Grid container spacing={3}>
              {role.questions.map((question, index) => (
                <Grid item xs={12} key={index}>
                  <TextField
                    label={`${index + 1}. ${question}`}
                    value={formData.answers[index] || ""}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    multiline
                    rows={3}
                    fullWidth
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        "&:hover fieldset": {
                          borderColor: "#977342",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#977342",
                        },
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </CardContent>
    </Card>
  );

  const SuccessScreen = () => (
    <Card
      elevation={0}
      sx={{
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #eee",
        height: "100%",
        textAlign: "center",
        py: 6,
      }}
    >
      <CardContent sx={{ p: 3 }}>
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
          onClick={() => router.push("/jobs")}
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
      </CardContent>
    </Card>
  );

  // Main render logic
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
          <Typography variant="h6" color="text.secondary">
            Loading role details...
          </Typography>
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
            onClick={() => router.push("/jobs")}
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
            onClick={handleBack}
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
            {activeStep === 0
              ? "Apply For Role"
              : activeStep === 1
              ? "Complete Application"
              : "Application Submitted"}
          </Typography>
        </Box>

        <Box sx={{ width: "100%", mb: 4 }}>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{
              "& .MuiStepLabel-root .Mui-completed": {
                color: "#977342",
              },
              "& .MuiStepLabel-root .Mui-active": {
                color: "#977342",
              },
            }}
          >
            <Step>
              <StepLabel>View Role Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Complete Application</StepLabel>
            </Step>
            <Step>
              <StepLabel>Submit</StepLabel>
            </Step>
          </Stepper>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            {activeStep === 0 && <RoleDetails />}
            {activeStep === 1 && <ApplicationForm />}
            {activeStep === 2 && <SuccessScreen />}
          </Grid>
        </Grid>

        {activeStep < 2 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 4,
              pt: 2,
              borderTop: "1px solid #eee",
            }}
          >
            <Button
              variant="outlined"
              onClick={handleBack}
              startIcon={<ArrowBackIosNewIcon />}
              sx={{
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
              {activeStep === 0 ? "Back to Jobs" : "Back to Details"}
            </Button>

            <Button
              variant="contained"
              onClick={handleNext}
              disabled={submitting}
              endIcon={
                submitting ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
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
              {activeStep === 0
                ? "Apply Now"
                : submitting
                ? "Submitting..."
                : "Submit Application"}
            </Button>
          </Box>
        )}
      </Container>

      <PrimaryFooter />
    </Box>
  );
};

export default RoleApplyPage;
