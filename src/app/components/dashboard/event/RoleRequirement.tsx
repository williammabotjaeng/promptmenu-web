import * as React from "react";
import { 
  Box, 
  Typography, 
  TextField, 
  Card, 
  CardContent, 
  InputAdornment,
  Divider,
  Fade
} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WorkIcon from '@mui/icons-material/Work';
import SkillSelector from "./SkillSelector";
import useEventStore from "@/state/use-event-store";
import { useStore } from "zustand";
import { useState, useEffect } from "react";

const RoleRequirement: React.FC = () => {
  const { eventRole, setEventRole } = useStore(useEventStore);
  const [openings, setOpenings] = useState(eventRole?.openings || 0);
  const [location, setLocation] = useState(eventRole?.location || "");
  const [animate, setAnimate] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleOpeningsChange = (event: any) => {

    if (event?.target?.value > 0) {
        setError(false);
        setOpenings(event?.target?.value);

        setEventRole({
          ...eventRole,
          openings: event?.target?.value
        });
    } else {
      setError(true);
    }
  }

  const handleLocation = (event: any) => {
    setLocation(event?.target?.value);
    setEventRole({
      ...eventRole,
      location: event?.target?.value
    });
  }

  return (
    <Fade in={animate} timeout={800}>
      <Card
        elevation={4}
        sx={{
          maxWidth: "768px",
          width: "100%",
          borderRadius: "16px",
          overflow: "visible",
          background: "linear-gradient(to bottom, #ffffff, #f9f7f3)",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0px 12px 24px rgba(151, 115, 66, 0.15)",
            transform: "translateY(-5px)"
          }
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "700",
                color: "#977342",
                fontSize: { xs: "1.75rem", md: "2.25rem" },
                position: "relative",
                display: "inline-block",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  width: "50%",
                  height: "3px",
                  bottom: "-8px",
                  left: "0",
                  backgroundColor: "#CEAB76",
                  borderRadius: "2px"
                }
              }}
            >
              Role Requirements
            </Typography>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h6"
              sx={{
                color: "#333",
                fontWeight: "600",
                mb: 2,
                display: "flex",
                alignItems: "center",
                "&:before": {
                  content: '""',
                  width: "4px",
                  height: "24px",
                  backgroundColor: "#977342",
                  marginRight: "12px",
                  borderRadius: "2px"
                }
              }}
            >
              What skill is required?
            </Typography>
            {/* Custom wrapper for SkillSelector to ensure it fills the entire width */}
            <Box sx={{ 
              width: "100%",
              "& > *": { 
                width: "100% !important", 
                borderRadius: "12px !important",
                backgroundColor: "#FFFFFF !important",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05) !important",
                transition: "all 0.3s ease !important",
                "&:hover": {
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1) !important"
                },
                "&.Mui-focused": {
                  boxShadow: "0px 4px 12px rgba(151, 115, 66, 0.2) !important"
                }
              },
              "& .MuiInputBase-root": {
                paddingLeft: "14px !important",
                height: "56px !important",
                borderRadius: "12px !important",
                "&::before": {
                  display: "flex",
                  content: '""',
                  width: "24px",
                  height: "24px",
                  marginRight: "8px",
                  // backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23977342'%3E%3Cpath d='M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm1 14h-2v-2h2v2zm0-3h-2V8h2v6z'/%3E%3C/svg%3E")`
                }
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(151, 115, 66, 0.3) !important",
                borderWidth: "1px !important",
                transition: "all 0.3s ease !important"
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#977342 !important",
                borderWidth: "1px !important"
              }
            }}>
              <SkillSelector />
            </Box>
          </Box>

          <Divider sx={{ my: 4, opacity: 0.6 }} />

          <Box sx={{ mt: 3 }}>
            <Typography
              variant="h6"
              sx={{
                color: "#333",
                fontWeight: "600",
                mb: 2,
                display: "flex",
                alignItems: "center",
                "&:before": {
                  content: '""',
                  width: "4px",
                  height: "24px",
                  backgroundColor: "#977342",
                  marginRight: "12px",
                  borderRadius: "2px"
                }
              }}
            >
              How many people do you need?
            </Typography>
            <TextField
              type="number"
              id="people_needed"
              variant="outlined"
              value={openings}
              onChange={handleOpeningsChange}
              error={error}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PeopleAltIcon sx={{ color: "#977342" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#FFFFFF",
                  height: "56px",
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)"
                  },
                  "&.Mui-focused": {
                    boxShadow: "0px 4px 12px rgba(151, 115, 66, 0.2)"
                  }
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(151, 115, 66, 0.3)",
                  borderWidth: "1px"
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#977342",
                  borderWidth: "1px"
                }
              }}
              aria-label="Number of People Needed"
            />
          </Box>

          <Divider sx={{ my: 4, opacity: 0.6 }} />

          <Box sx={{ mt: 3 }}>
            <Typography
              variant="h6"
              sx={{
                color: "#333",
                fontWeight: "600",
                mb: 2,
                display: "flex",
                alignItems: "center",
                "&:before": {
                  content: '""',
                  width: "4px",
                  height: "24px",
                  backgroundColor: "#977342",
                  marginRight: "12px",
                  borderRadius: "2px"
                }
              }}
            >
              Where will they work?
            </Typography>
            <TextField
              type="text"
              id="location"
              variant="outlined"
              placeholder="e.g., Dubai Marina, Downtown Dubai"
              value={location}
              onChange={handleLocation}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon sx={{ color: "#977342" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#FFFFFF",
                  height: "56px",
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)"
                  },
                  "&.Mui-focused": {
                    boxShadow: "0px 4px 12px rgba(151, 115, 66, 0.2)"
                  }
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(151, 115, 66, 0.3)",
                  borderWidth: "1px"
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#977342",
                  borderWidth: "1px"
                }
              }}
              aria-label="Location (City/Town)"
            />
          </Box>
          
          <Box sx={{ 
            mt: 5, 
            p: 3, 
            borderRadius: "12px", 
            backgroundColor: "rgba(151, 115, 66, 0.08)",
            border: "1px dashed rgba(151, 115, 66, 0.3)"
          }}>
            <Typography variant="body2" sx={{ color: "#977342", fontStyle: "italic" }}>
              Providing clear requirements helps you attract the perfect candidates for your event. 
              Be specific about skills needed and exact location to improve matching quality.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default RoleRequirement;