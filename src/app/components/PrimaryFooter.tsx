import React from "react";
import { Box, Typography, Link } from "@mui/material";
import Grid from '@mui/material/GridLegacy';
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingX: 2,
        paddingY: 3,
        width: "100%",
        backgroundColor: "#977342",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          opacity: 1,
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            maxWidth: "1248px",
            margin: "0 auto",
            flexWrap: { xs: "wrap", md: "nowrap" },
          }}
        >
          <Grid item xs={12} sm={4}>
            <Box sx={{ paddingBottom: 5 }}>
              <Typography
                variant="h6"
                sx={{
                  paddingBottom: 1,
                  fontWeight: "bold",
                  color: "#fff",
                  fontSize: "24px",
                }}
              >
                Staffing Solutions Hub
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  marginTop: 2,
                  color: "white",
                  fontSize: "14px",
                }}
              >
                Staffing Your Success, One Event at a Time.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ paddingBottom: 5 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  fontSize: { xs: "16px", md: "16px" },
                }}
              >
                Quick Links
              </Typography>
              <Box sx={{ marginTop: 2 }}>
                <Typography
                  component="div"
                  sx={{
                    color: "#fff",
                    marginTop: 1,
                    fontSize: { xs: "14px", md: "16px" },
                  }}
                >
                  <Link href="/about">About</Link>
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    color: "#fff",
                    marginTop: 1,
                    fontSize: { xs: "14px", md: "16px" },
                  }}
                >
                  <Link href="/terms-of-service">Terms of Service</Link>
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    color: "#fff",
                    marginTop: 1,
                    fontSize: { xs: "14px", md: "16px" },
                  }}
                >
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ paddingBottom: 5 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#fff",
                  fontSize: "16px",
                }}
              >
                Contact
              </Typography>
              <Box sx={{ marginTop: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                    marginTop: 1,
                  }}
                >
                  <LocationOnIcon sx={{ color: "#fff", marginRight: "8px" }} />
                  <Typography
                    variant="body2"
                    sx={{ color: "#fff", fontSize: "16px" }}
                  >
                    ACICO Business Park
                    <br /> Port Saeed, Dubai - UAE
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                    marginTop: 1,
                  }}
                >
                  <PhoneIcon sx={{ color: "#fff", marginRight: "8px" }} />
                  <Typography
                    variant="body2"
                    sx={{ color: "#fff", fontSize: "16px" }}
                  >
                    +971 56 759 8878
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                    marginTop: 1,
                  }}
                >
                  <EmailIcon sx={{ color: "#fff", marginRight: "8px" }} />
                  <Typography
                    variant="body2"
                    sx={{ 
                      color: "#fff", 
                      fontSize: { xs: "16px", sm: "12px", md: "16px" },
                    }}
                  >
                    info@staffingsolutionshub.com
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ paddingBottom: 5 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  fontSize: "16px",
                }}
              >
                Follow Us
              </Typography>
              <Box sx={{ marginTop: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FacebookIcon
                    sx={{
                      color: "#fff",
                      fontSize: "24px",
                      marginRight: "10px",
                    }}
                  />
                  <TwitterIcon
                    sx={{
                      color: "#fff",
                      fontSize: "24px",
                      marginRight: "10px",
                    }}
                  />
                  <InstagramIcon sx={{ color: "#fff", fontSize: "24px" }} />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          sx={{
            paddingTop: 3,
            textAlign: "center",
            color: "#fff",
            borderTop: "1px solid #ceab76",
          }}
        >
          © 2025 Staffing Solutions Hub. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
