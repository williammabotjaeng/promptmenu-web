"use client";

import * as React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Divider,
  Paper,
  Tooltip,
  Alert,
  Snackbar,
} from "@mui/material";
import Header from "@/components/dashboard/Header";
import GreyFooter from "@/components/GreyFooter";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import FetchingRole from "@/components/dashboard/FetchingRole";
import useCurrentRoleStore from "@/state/use-current-role-store";
import { useStore } from "zustand";
import { useEvent } from "@/providers/event-provider";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// Experience level options
const experienceLevels = ["Entry Level", "Intermediate", "Senior", "Expert"];

// Role type options
const roleTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance",
  "Temporary",
];

// Ethnicities options
const ethnicitiesOptions = [
  "Arab",
  "Pakistani",
  "Indian",
  "Emirati",
  "Egyptian",
  "Filipino",
  "European",
  "African",
  "East Asian",
  "Other",
];

// Gender options
const genderOptions = ["male", "female", "unisex"];

const SectionTitle = ({ title, icon }) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 3, mt: 3 }}>
    <Divider sx={{ flexGrow: 1, mr: 2 }} />
    <Typography variant="h6" 
      sx={{ 
        color: "#977342", 
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        px: 2,
        py: 1,
        borderRadius: 1,
        bgcolor: "#977342" + "10",
      }}>
      {icon}
      {title}
    </Typography>
    <Divider sx={{ flexGrow: 1, ml: 2 }} />
  </Box>
);

const EventRoleDetail = () => {
  const [cookies, setCookie] = useCookies([
    "event_id",
    "access_token",
    "referrer",
  ]);

  const [loading, setLoading] = useState(false);

  const eventID = cookies?.event_id;
  const accessToken = cookies?.access_token;

  const { currentRole, setCurrentRole } = useStore(useCurrentRoleStore);

  const { updateEvent } = useEvent();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const router = useRouter();

  // State for role data
  const [role, setRole] = useState({
    title: "",
    description: "",
    location: "",
    daily_pay: "",
    hourly_pay: "",
    project_pay: "",
    soft_deadline: "",
    hard_deadline: "",
    application_deadline: "",
    max_age: "",
    min_age: "",
    ethnicities: [],
    genders: [],
    openings: "",
    experience_level: "",
    role_type: "",
    skill: "",
    role_payment_info: "",
    deadline_notes: "",
    company_id: "",
    questions: [],
  });

  // State for form validation
  const [errors, setErrors] = useState({
    title: "Title is required",
    location: "Location is required",
    openings: "Number of openings is required",
  });
  const [isLoading, setIsLoading] = useState(true);

  // Format date for datetime-local input
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    return dateString.split("+")[0]; // Remove timezone part
  };

  // Load role data from the store into local state
  useEffect(() => {
    if (currentRole) {
      // Handle application_questions specially to ensure it's an array
      let questions = [];

      // Check if application_questions exists and handle different formats
      if (currentRole.application_questions) {
        // If it's already an array, use it directly
        if (Array.isArray(currentRole.application_questions)) {
          questions = currentRole.application_questions;
        }
        // If it's a string that might be JSON, try to parse it
        else if (typeof currentRole.application_questions === "string") {
          try {
            const parsed = JSON.parse(currentRole.application_questions);
            questions = Array.isArray(parsed) ? parsed : [parsed];
          } catch (e) {
            // If parsing fails, treat it as a single question
            questions = [currentRole.application_questions];
          }
        }
        // For any other type, convert to array
        else {
          questions = [currentRole.application_questions];
        }
      }

      setRole({
        title: currentRole.title || "",
        description: currentRole.description || "",
        location: currentRole.location || "",
        daily_pay: currentRole.daily_pay ? String(currentRole.daily_pay) : "",
        hourly_pay: currentRole.hourly_pay
          ? String(currentRole.hourly_pay)
          : "",
        project_pay: currentRole.project_pay
          ? String(currentRole.project_pay)
          : "",
        soft_deadline: formatDateForInput(currentRole.soft_deadline) || "",
        hard_deadline: formatDateForInput(currentRole.hard_deadline) || "",
        application_deadline:
          formatDateForInput(currentRole.application_deadline) || "",
        max_age: currentRole.max_age ? String(currentRole.max_age) : "",
        min_age: currentRole.min_age ? String(currentRole.min_age) : "",
        ethnicities: currentRole.ethnicities || [],
        genders: currentRole.genders || [],
        openings: currentRole.openings ? String(currentRole.openings) : "",
        experience_level: currentRole.experience_level || "",
        role_type: currentRole.role_type || "",
        skill: currentRole.skill || "",
        role_payment_info: currentRole.role_payment_info || "",
        deadline_notes: currentRole.deadline_notes || "",
        company_id: currentRole.company_id
          ? String(currentRole.company_id)
          : "",
        questions: questions, // Use the properly processed questions array
      });

      // Clear validation errors if we have valid data
      if (currentRole.title && currentRole.location && currentRole.openings) {
        setErrors({
          title: "",
          location: "",
          openings: "",
        });
      }

      setIsLoading(false);
    } else {
      // Handle the unlikely case where currentRole doesn't exist
      console.error("No role data found in store");
      router.back();
    }
  }, [currentRole, router, eventID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRole({
      ...role,
      [name]: value,
    });
  };

  const handleMultiSelectChange = (event, fieldName) => {
    const {
      target: { value },
    } = event;

    setRole({
      ...role,
      [fieldName]: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleDiscardChanges = () => {
    // Reload the page or reset form to original values
    window.location.reload();
  };

  const handleUpdateRole = async () => {
    // Validate form
    const newErrors = {
      title: "",
      location: "",
      openings: "",
    };
    if (!role.title) newErrors.title = "Title is required";
    if (!role.location) newErrors.location = "Location is required";
    if (!role.openings) newErrors.openings = "Number of openings is required";

    if (!newErrors.title && !newErrors.location && !newErrors.openings) {
      try {
        setLoading(true);

        // Prepare the updated role object with proper type conversions
        const updatedRole = {
          id: currentRole?.id,
          title: role.title,
          description: role.description,
          location: role.location,
          daily_pay: role.daily_pay ? Number(role.daily_pay) : null,
          hourly_pay: role.hourly_pay ? Number(role.hourly_pay) : null,
          project_pay: role.project_pay ? Number(role.project_pay) : null,
          soft_deadline: role.soft_deadline,
          hard_deadline: role.hard_deadline,
          application_deadline: role.application_deadline,
          max_age: role.max_age ? Number(role.max_age) : null,
          min_age: role.min_age ? Number(role.min_age) : null,
          ethnicities: role.ethnicities,
          genders: role.genders,
          openings: Number(role.openings),
          experience_level: role.experience_level,
          role_type: role.role_type,
          skill: role.skill,
          role_payment_info: role.role_payment_info,
          deadline_notes: role.deadline_notes,
          application_questions: role.questions,
          company_id: role.company_id ? Number(role.company_id) : null,
          event: currentRole?.event,
        };

        // Update the role in the store
        setCurrentRole(updatedRole);

        // Find the role in the current event and update it
        const eventObj = {
          roles: [role],
        };

        console.log("Updated Role:", updatedRole);
        console.log("Updated Event:", eventObj);

        // Call the API to update the event
        await updateEvent(eventID, eventObj);

        setSnackbarMessage("Role updated successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);

        // Wait a moment before navigating
        setTimeout(() => {
          router.push(`/event/${eventID}`);
        }, 1500);
      } catch (error) {
        console.error("Error updating role:", error);
        setSnackbarMessage("Failed to update role. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const goBack = () => {
    router.back();
  };

  const handleDeleteRole = () => {
    // Here you would add a confirmation dialog before actually deleting
    alert("Delete functionality would be implemented here");
  };

  if (isLoading) {
    return <FetchingRole />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Header />

      <Box sx={{ flexGrow: 1, padding: { xs: 2, md: 4 } }}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <IconButton
            onClick={goBack}
            sx={{
              color: "#977342",
              "&:hover": {
                color: "#CEAB76",
                backgroundColor: "rgba(206, 171, 118, 0.1)",
              },
              mr: 2,
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "600",
              color: "#333",
              flexGrow: 1,
            }}
          >
            Edit Role: {role.title}
          </Typography>
        </Paper>

        <Card sx={{ borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <CardContent sx={{ p: 4 }}>
            {/* Basic Role Information */}
            <SectionTitle 
              title="Basic Information" 
              icon={<InfoOutlinedIcon fontSize="small" sx={{ mr: 1, color: "#977342" }} />} 
            />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Role Title"
                  name="title"
                  value={role.title}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  error={!!errors.title}
                  helperText={errors.title}
                  InputProps={{
                    sx: { borderRadius: 1 }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Skill"
                  name="skill"
                  value={role.skill}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    sx: { borderRadius: 1 }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  value={role.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    sx: { borderRadius: 1 }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Location"
                  name="location"
                  value={role.location}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  error={!!errors.location}
                  helperText={errors.location}
                  InputProps={{
                    sx: { borderRadius: 1 }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Number of Openings"
                  name="openings"
                  type="number"
                  value={role.openings}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  error={!!errors.openings}
                  helperText={errors.openings}
                  InputProps={{ 
                    inputProps: { min: 1 },
                    sx: { borderRadius: 1 }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Experience Level</InputLabel>
                  <Select
                    name="experience_level"
                    value={role.experience_level || ""}
                    onChange={handleChange}
                    label="Experience Level"
                    sx={{ borderRadius: 1 }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {experienceLevels.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Role Type</InputLabel>
                  <Select
                    name="role_type"
                    value={role.role_type || ""}
                    onChange={handleChange}
                    label="Role Type"
                    sx={{ borderRadius: 1 }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {roleTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Payment Information */}
            <SectionTitle 
              title="Payment Information" 
              icon={<InfoOutlinedIcon fontSize="small" sx={{ mr: 1, color: "#977342" }} />} 
            />

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Hourly Pay"
                  name="hourly_pay"
                  type="number"
                  value={role.hourly_pay}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  InputProps={{ 
                    inputProps: { min: 0 },
                    sx: { borderRadius: 1 }
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label="Daily Pay"
                  name="daily_pay"
                  type="number"
                  value={role.daily_pay}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  InputProps={{ 
                    inputProps: { min: 0 },
                    sx: { borderRadius: 1 }
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label="Project Pay"
                  name="project_pay"
                  type="number"
                  value={role.project_pay}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  InputProps={{ 
                    inputProps: { min: 0 },
                    sx: { borderRadius: 1 }
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Payment Terms & Information"
                  name="role_payment_info"
                  value={role.role_payment_info || ""}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    sx: { borderRadius: 1 }
                  }}
                />
              </Grid>
            </Grid>

            {/* Deadline Information */}
            <SectionTitle 
              title="Deadline Information" 
              icon={<InfoOutlinedIcon fontSize="small" sx={{ mr: 1, color: "#977342" }} />} 
            />

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Typography variant="body2" sx={{ mb: 1, color: "#666" }}>
                  Soft Deadline
                  <Tooltip title="The target completion date that would be ideal but can be flexible">
                    <HelpOutlineIcon fontSize="small" sx={{ ml: 1, color: "#977342", fontSize: 16, verticalAlign: "text-bottom" }} />
                  </Tooltip>
                </Typography>
                <TextField
                  name="soft_deadline"
                  type="datetime-local"
                  value={role.soft_deadline}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    sx: { borderRadius: 1 }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="body2" sx={{ mb: 1, color: "#666" }}>
                  Hard Deadline
                  <Tooltip title="The final date by which the work must be completed without exceptions">
                    <HelpOutlineIcon fontSize="small" sx={{ ml: 1, color: "#977342", fontSize: 16, verticalAlign: "text-bottom" }} />
                  </Tooltip>
                </Typography>
                <TextField
                  name="hard_deadline"
                  type="datetime-local"
                  value={role.hard_deadline}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    sx: { borderRadius: 1 }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="body2" sx={{ mb: 1, color: "#666" }}>
                  Application Deadline
                  <Tooltip title="The last date when applicants can apply for this role">
                    <HelpOutlineIcon fontSize="small" sx={{ ml: 1, color: "#977342", fontSize: 16, verticalAlign: "text-bottom" }} />
                  </Tooltip>
                </Typography>
                <TextField
                  name="application_deadline"
                  type="datetime-local"
                  value={role.application_deadline}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    sx: { borderRadius: 1 }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Deadline Notes"
                  name="deadline_notes"
                  value={role.deadline_notes || ""}
                  onChange={handleChange}
                  multiline
                  rows={2}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    sx: { borderRadius: 1 }
                  }}
                />
              </Grid>
            </Grid>

            {/* Demographics */}
            <SectionTitle 
              title="Demographics" 
              icon={<InfoOutlinedIcon fontSize="small" sx={{ mr: 1, color: "#977342" }} />} 
            />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Ethnicities</InputLabel>
                  <Select
                    multiple
                    name="ethnicities"
                    value={role.ethnicities || []}
                    onChange={(e) =>
                      handleMultiSelectChange(e, "ethnicities")
                    }
                    input={<OutlinedInput label="Ethnicities" sx={{ borderRadius: 1 }} />}
                    renderValue={(selected) => (
                      <Box
                        sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                      >
                        {selected.map((value) => (
                          <Chip 
                            key={value} 
                            label={value} 
                            sx={{ 
                              backgroundColor: "#977342" + "20", 
                              color: "#977342",
                              borderRadius: "4px",
                            }} 
                          />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {ethnicitiesOptions.map((ethnicity) => (
                      <MenuItem key={ethnicity} value={ethnicity}>
                        <Checkbox
                          checked={
                            (role.ethnicities || []).indexOf(ethnicity) > -1
                          }
                        />
                        <ListItemText primary={ethnicity} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Genders</InputLabel>
                  <Select
                    multiple
                    name="genders"
                    value={role.genders || []}
                    onChange={(e) => handleMultiSelectChange(e, "genders")}
                    input={<OutlinedInput label="Genders" sx={{ borderRadius: 1 }} />}
                    renderValue={(selected) => (
                      <Box
                        sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                      >
                        {selected.map((value) => (
                          <Chip 
                            key={value} 
                            label={value} 
                            sx={{ 
                              backgroundColor: "#977342" + "20", 
                              color: "#977342",
                              borderRadius: "4px",
                            }} 
                          />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {genderOptions.map((gender) => (
                      <MenuItem key={gender} value={gender}>
                        <Checkbox
                          checked={
                            (role.genders || []).indexOf(gender) > -1
                          }
                        />
                        <ListItemText primary={gender} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Minimum Age"
                  name="min_age"
                  type="number"
                  value={role.min_age}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  InputProps={{ 
                    inputProps: { min: 0 },
                    sx: { borderRadius: 1 }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Maximum Age"
                  name="max_age"
                  type="number"
                  value={role.max_age}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  InputProps={{ 
                    inputProps: { min: 0 },
                    sx: { borderRadius: 1 }
                  }}
                />
              </Grid>
            </Grid>

            {/* Application Questions */}
            <SectionTitle 
              title="Application Questions" 
              icon={<InfoOutlinedIcon fontSize="small" sx={{ mr: 1, color: "#977342" }} />} 
            />

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Application Questions"
                  name="application_questions"
                  value={role.questions || ""}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  placeholder="Add questions for applicants, separated by new lines or in JSON format"
                  helperText="These questions will be asked to applicants when they apply for this role"
                  InputProps={{
                    sx: { borderRadius: 1 }
                  }}
                />
              </Grid>
            </Grid>

            {/* Hidden Fields */}
            <input
              type="hidden"
              name="company_id"
              value={role.company_id}
            />

            {/* Action Buttons */}
            <Box sx={{ 
              mt: 6, 
              pt: 3, 
              borderTop: 1, 
              borderColor: "divider",
              display: "flex", 
              justifyContent: "space-between",
              flexWrap: "wrap", 
              gap: 2 
            }}>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteForeverIcon />}
                onClick={handleDeleteRole}
                sx={{
                  bgcolor: "#d32f2f",
                  color: "white",
                  order: { xs: 3, sm: 1 },
                  minWidth: "180px",
                  py: 1.5,
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(211, 47, 47, 0.2)",
                  "&:hover": {
                    bgcolor: "#b71c1c",
                    boxShadow: "0 4px 12px rgba(211, 47, 47, 0.3)",
                  }
                }}
              >
                Delete Role
              </Button>
              
              <Box sx={{ 
                display: "flex", 
                gap: 2,
                order: { xs: 1, sm: 2 },
                flexGrow: { xs: 1, sm: 0 }
              }}>
                <Button
                  variant="outlined"
                  onClick={handleDiscardChanges}
                  sx={{
                    color: "#666",
                    borderColor: "#ccc",
                    py: 1.5,
                    px: 3,
                    borderRadius: "8px",
                    "&:hover": {
                      bgcolor: "#f5f5f5",
                      borderColor: "#999"
                    }
                  }}
                >
                  Discard Changes
                </Button>
                
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleUpdateRole}
                  disabled={loading}
                  sx={{
                    bgcolor: "#977342",
                    color: "white",
                    py: 1.5,
                    px: 4,
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(151, 115, 66, 0.2)",
                    "&:hover": {
                      bgcolor: "#CEAB76",
                      boxShadow: "0 4px 12px rgba(151, 115, 66, 0.3)",
                    }
                  }}
                >
                  {loading ? "Saving..." : "Save Role"}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity === "success" ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <GreyFooter />
    </Box>
  );
};

export default EventRoleDetail;