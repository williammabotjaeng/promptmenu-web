import * as React from "react";
import { DateTimePicker } from "./DeadlineDateTimePicker";
import { 
  Box, 
  TextField, 
  Typography, 
  Alert,
  Fade,
  Tooltip,
  IconButton,
  useTheme,
  useMediaQuery,
  Chip,
  Card,
  Divider,
  alpha
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import NotesIcon from '@mui/icons-material/Notes';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import { useStore } from "zustand";
import { useCookies } from "react-cookie";
import useEventStore from "@/state/use-event-store";

export const DeadlineForm: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { eventRole, setEventRole, eventDetails } = useStore(useEventStore);
  
  const [cookies] = useCookies([
    'company_id',
    'event_id'
  ]);
  
  const companyID = cookies['company_id'];
  const eventID = cookies['event_id'];
  
  const [formData, setFormData] = React.useState({
    softDeadline: eventRole.softDeadline || "",
    hardDeadline: eventRole.hardDeadline || "",
    notes: eventRole.notes || "",
  });

  const [errors, setErrors] = React.useState({
    softDeadline: "",
    hardDeadline: "",
    general: ""
  });

  // Get the minimum valid deadline date (24 hours before event starts)
  const getMinDeadlineDate = (): Date => {
    if (!eventDetails?.startDateTime) {
      // If no event start date, use current date
      return new Date();
    }

    const eventStartDate = new Date(eventDetails.startDateTime);
    const minDeadlineDate = new Date(eventStartDate);
    minDeadlineDate.setHours(eventStartDate.getHours() - 24);
    
    return minDeadlineDate;
  };

  const validateDeadlines = (
    field: "softDeadline" | "hardDeadline" | "both", 
    value?: string
  ): boolean => {
    const newErrors = { ...errors };
    let isValid = true;
    const minDeadlineDate = getMinDeadlineDate();
    const eventStartDate = eventDetails?.startDateTime 
      ? new Date(eventDetails.startDateTime) 
      : null;

    // Format function for displaying date in error message
    const formatDate = (date: Date): string => {
      return date.toLocaleString(undefined, {
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    // Validate soft deadline
    if (field === "softDeadline" || field === "both") {
      const softDeadlineValue = value || formData.softDeadline;
      
      if (softDeadlineValue) {
        const softDeadlineDate = new Date(softDeadlineValue);
        
        // Check if soft deadline is at least 24 hours before event start
        if (eventStartDate && softDeadlineDate > new Date(eventStartDate)) {
          newErrors.softDeadline = "Soft deadline must be before the event start date";
          isValid = false;
        } else if (eventStartDate && softDeadlineDate > minDeadlineDate) {
          newErrors.softDeadline = `Soft deadline must be at least 24 hours before the event (before ${formatDate(minDeadlineDate)})`;
          isValid = false;
        } else {
          newErrors.softDeadline = "";
        }
      }
    }

    // Validate hard deadline
    if (field === "hardDeadline" || field === "both") {
      const hardDeadlineValue = value || formData.hardDeadline;
      
      if (hardDeadlineValue) {
        const hardDeadlineDate = new Date(hardDeadlineValue);
        
        // Check if hard deadline is at least 24 hours before event start
        if (eventStartDate && hardDeadlineDate > new Date(eventStartDate)) {
          newErrors.hardDeadline = "Hard deadline must be before the event start date";
          isValid = false;
        } else if (eventStartDate && hardDeadlineDate > minDeadlineDate) {
          newErrors.hardDeadline = `Hard deadline must be at least 24 hours before the event (before ${formatDate(minDeadlineDate)})`;
          isValid = false;
        } else {
          newErrors.hardDeadline = "";
        }
        
        // Check if hard deadline is after soft deadline
        if (formData.softDeadline) {
          const softDeadlineDate = new Date(formData.softDeadline);
          if (hardDeadlineDate < softDeadlineDate) {
            newErrors.hardDeadline = "Hard deadline cannot be earlier than soft deadline";
            isValid = false;
          }
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);
    
    // Validate as we type
    if (field === "softDeadline" || field === "hardDeadline") {
      validateDeadlines(field as "softDeadline" | "hardDeadline", value);
    }
    
    // Only update the store if validation passes
    const isValid = validateDeadlines(field as "softDeadline" | "hardDeadline", value);
    if (isValid || field === "notes") {
      setEventRole({
        ...eventRole,
        company_id: companyID,
        event: eventID,
        ...updatedFormData
      });
    }
  };

  // Get formatted event start date for display
  const getFormattedEventStartDate = (): string => {
    if (!eventDetails?.startDateTime) return "not set";
    
    const eventStartDate = new Date(eventDetails.startDateTime);
    return eventStartDate.toLocaleString(undefined, {
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate min dates to ensure the right sequence
  const getSoftDeadlineMinDate = (): Date => {
    return new Date(); // Can't be in the past
  };

  const getHardDeadlineMinDate = (): Date => {
    if (formData.softDeadline) {
      return new Date(formData.softDeadline);
    }
    return new Date(); // Default to current date if no soft deadline
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingBottom: "16px",
        marginTop: "24px",
        width: { xs: "100%", md: "85%" },
      }}
    >
      <Card
        elevation={0}
        sx={{
          mb: 4,
          p: 2.5,
          borderRadius: "12px",
          border: `1px solid ${alpha('#977342', 0.15)}`,
          backgroundColor: alpha('#977342', 0.03),
          display: "flex",
          alignItems: "center",
        }}
      >
        <CalendarTodayIcon 
          sx={{ 
            color: "#977342", 
            mr: 2,
            fontSize: 24
          }} 
        />
        <Box>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              color: "#977342",
              fontWeight: "bold",
              mb: 0.5
            }}
          >
            Event Start Date
          </Typography>
          <Typography variant="body2" sx={{ color: "#6B7280" }}>
            {getFormattedEventStartDate()}
          </Typography>
        </Box>
        <Chip 
          label="24h minimum" 
          icon={<AlarmOnIcon />} 
          size="small"
          sx={{ 
            ml: "auto", 
            fontWeight: "medium",
            backgroundColor: alpha('#977342', 0.1),
            color: "#977342",
            border: `1px solid ${alpha('#977342', 0.3)}`,
            '.MuiChip-icon': {
              color: "#977342",
              fontSize: 16
            }
          }} 
        />
      </Card>

      <Box sx={{ marginBottom: 3 }}>
        <Typography 
          variant="body1" 
          sx={{ 
            color: "#374151",
            fontWeight: "medium",
            display: "flex",
            alignItems: "center",
            mb: 2
          }}
        >
          Set Application Deadlines
          <Tooltip title="Deadlines must be at least 24 hours before the event starts" placement="right">
            <IconButton size="small" sx={{ ml: 0.5, p: 0.5 }}>
              <InfoIcon fontSize="small" sx={{ color: "#977342" }} />
            </IconButton>
          </Tooltip>
        </Typography>
        
        <Typography variant="body2" sx={{ color: "#6B7280", mb: 3 }}>
          By when do you want to stop receiving applications for this position?
        </Typography>
      </Box>
      
      {errors.general && (
        <Fade in={!!errors.general} timeout={450}>
          <Alert 
            severity="error"
            icon={<ErrorOutlineIcon />}
            sx={{ 
              mb: 3,
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(211, 47, 47, 0.1)",
              '.MuiAlert-icon': {
                color: "#d32f2f",
                alignItems: "center"
              }
            }}
          >
            {errors.general}
          </Alert>
        </Fade>
      )}

      <Box sx={{ 
        display: "flex", 
        flexDirection: { xs: "column", md: "row" }, 
        gap: { xs: 3, md: 4 }, 
        marginBottom: 4 
      }}>
        {/* Soft Deadline */}
        <DateTimePicker
          label="Soft Deadline"
          value={formData.softDeadline}
          onChange={(value) => handleChange("softDeadline", value)}
          error={!!errors.softDeadline}
          helperText={errors.softDeadline || "Applications preferred by this date"}
          minDateTime={getSoftDeadlineMinDate()}
        />
        
        {/* Hard Deadline */}
        <DateTimePicker
          label="Hard Deadline"
          value={formData.hardDeadline}
          onChange={(value) => handleChange("hardDeadline", value)}
          error={!!errors.hardDeadline}
          helperText={errors.hardDeadline || "No applications accepted after this date"}
          minDateTime={getHardDeadlineMinDate()}
        />
      </Box>

      <Divider sx={{ my: 3, borderColor: alpha('#000', 0.08) }} />

      <Box sx={{ marginBottom: 3 }}>
        <Typography 
          variant="body1" 
          sx={{ 
            color: "#374151", 
            fontWeight: "medium",
            display: "flex",
            alignItems: "center",
            mb: 2  
          }}
        >
          <NotesIcon sx={{ mr: 1, color: "#977342" }} />
          Additional Notes
        </Typography>
        
        <TextField
          id="notes"
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          placeholder="Add any additional information about application deadlines..."
          multiline
          rows={4}
          variant="outlined"
          sx={{
            marginTop: 1,
            width: "100%",
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              transition: "all 0.3s ease-in-out",
              backgroundColor: "rgba(151, 115, 66, 0.03)",
              "&:hover": {
                backgroundColor: "rgba(151, 115, 66, 0.08)",
                boxShadow: "0 4px 12px rgba(151, 115, 66, 0.12)",
                transform: "translateY(-2px)",
              },
              '&:hover fieldset': {
                borderColor: '#977342',
              },
              '&.Mui-focused': {
                backgroundColor: "rgba(151, 115, 66, 0.08)",
              },
              '&.Mui-focused fieldset': {
                borderColor: '#977342',
                borderWidth: "2px"
              },
              "& fieldset": {
                borderColor: "rgba(151, 115, 66, 0.3)",
              }
            },
            boxShadow: "0 2px 8px rgba(151, 115, 66, 0.08)",
          }}
          InputProps={{
            sx: {
              py: 1.5,
              px: 2,
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default DeadlineForm;