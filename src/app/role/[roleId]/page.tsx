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
} from "@mui/material";
import Header from "@/components/dashboard/Header";
import GreyFooter from "@/components/GreyFooter";
import DemographicsForm from "@/components/dashboard/event/page/DemographicsForm";
import SaveIcon from "@mui/icons-material/Save";

const EventRoleDetail = () => {
  // Sample data based on the provided object
  const roleDetail = {
    description:
      ' <a href="{% url opts|admin_urlname :\'changelist\' %}" class="hover:underline text-blue-600">{{ opts.verbose_name_plural|capfirst }}</a>',
    location: "Dubai",
    daily_pay: 40,
    hourly_pay: 20,
    project_pay: 70,
    soft_deadline: "2025-03-08T19:05:00+04:00",
    hard_deadline: "2025-03-10T19:05:00+04:00",
    max_age: 24,
    min_age: 20,
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "white",
      }}
    >
      <Header />

      <Box sx={{ flexGrow: 1, padding: { xs: 2, md: 3 } }}>
        <Grid container spacing={3}>
          {/* Role Detail Card */}
          <Grid item xs={12}>
            <Card sx={{ padding: 2, borderRadius: "12px", boxShadow: 1 }}>
              <CardContent>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", marginBottom: 2 }}
                >
                  Role Details
                </Typography>

                {/* Description Textarea */}
                <br />
                <TextField
                  label="Event Title"
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
                <br />
                <Typography>Description</Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  placeholder="Type the role description here..."
                  defaultValue={roleDetail.description}
                  variant="outlined"
                  sx={{ marginBottom: 2 }}
                />

                {/* Location TextField */}
                <TextField
                  fullWidth
                  label="Location"
                  defaultValue={roleDetail.location}
                  variant="outlined"
                  sx={{ marginBottom: 2 }}
                />

                {/* Pay Fields */}
                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Daily Pay"
                      type="number"
                      defaultValue={roleDetail.daily_pay}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Hourly Pay"
                      type="number"
                      defaultValue={roleDetail.hourly_pay}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Project Pay"
                      type="number"
                      defaultValue={roleDetail.project_pay}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>

                {/* Deadline Fields */}
                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                  <Grid item xs={6}>
                    <Typography>Soft Deadline</Typography>
                    <TextField
                      fullWidth
                      type="datetime-local"
                      defaultValue={roleDetail.soft_deadline.split(".")[0]} // Remove milliseconds
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>Soft Deadline</Typography>
                    <TextField
                      fullWidth
                      type="datetime-local"
                      defaultValue={roleDetail.hard_deadline.split(".")[0]}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>

                {/* Age Fields */}
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Min Age"
                      type="number"
                      defaultValue={roleDetail.min_age}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Max Age"
                      type="number"
                      defaultValue={roleDetail.max_age}
                      variant="outlined"
                    />
                  </Grid>
                  <DemographicsForm />
                {/* Submit Button */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-evenly",
                    padding: 4,
                    mt: 2,
                    mr: { md: 26 },
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      px: 4,
                      py: 2,
                      mr: { xs: null, sm: null, md: 4 },
                      color: "#977342",
                      backgroundColor: "#fff",
                      "&:hover": {
                        backgroundColor: "#fff",
                        color: "#CEAB76",
                      },
                    }}
                    onClick={null}
                  >
                    Discard Changes
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#977342",
                      color: "white",
                      mt: { xs: 2, sm: 2, md: 0 },
                      "&:hover": {
                        backgroundColor: "#fff",
                        border: "1px solid #977342",
                        color: "#977342",
                      },
                    }}
                    onClick={null}
                  >
                    Save Role
                    <SaveIcon sx={{ marginLeft: "8px" }} />
                  </Button>
                </Box>
            
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <GreyFooter />
    </Box>
  );
};

export default EventRoleDetail;
