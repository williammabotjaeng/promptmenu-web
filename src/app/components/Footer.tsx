import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Link from "next/link";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingX: { xs: 2, md: 4 }, // Responsive padding
        paddingY: 3,
        width: "100%",
        backgroundColor: "black",
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
                  color: "#977342",
                  fontSize: { xs: "20px", md: "24px" }, // Responsive font size
                }}
              >
                Staffing Solutions Hub
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  marginTop: 2,
                  color: "white",
                  fontSize: { xs: "12px", md: "14px" }, // Responsive font size
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
                  fontSize: { xs: "16px", md: "16px" }, // Responsive font size
                }}
              >
                Quick Links
              </Typography>
              <Box sx={{ marginTop: 2 }}>
                <Typography
                  component="div"
                  sx={{
                    color: "#9CA3AF",
                    marginTop: 1,
                    fontSize: { xs: "14px", md: "16px" },
                  }} // Responsive font size
                >
                  <Link href="/about">About</Link>
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    color: "#9CA3AF",
                    marginTop: 1,
                    fontSize: { xs: "14px", md: "16px" },
                  }} // Responsive font size
                >
                  <Link href="/terms-of-service">Terms of Service</Link>
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    color: "#9CA3AF",
                    marginTop: 1,
                    fontSize: { xs: "14px", md: "16px" },
                  }} // Responsive font size
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
                  fontSize: { xs: "16px", md: "16px" }, // Responsive font size
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
                  <LocationOnIcon
                    sx={{ color: "#977342", marginRight: "8px" }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#9CA3AF",
                      fontSize: { xs: "14px", md: "14px" },
                    }}
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
                  <PhoneIcon sx={{ color: "#977342", marginRight: "8px" }} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#9CA3AF",
                      fontSize: { xs: "14px", md: "16px" },
                    }}
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
                  <EmailIcon sx={{ color: "#977342", marginRight: "8px" }} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#9CA3AF",
                      fontSize: { xs: "14px", md: "16px" },
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
                  fontSize: { xs: "16px", md: "16px" }, // Responsive font size
                }}
              >
                Follow Us
              </Typography>
              <Box sx={{ marginTop: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Link
                    href="https://web.facebook.com/people/Staffing-Solutions-Hub/61568735786489"
                    target="_blank"
                  >
                    <FacebookIcon
                      sx={{
                        color: "#977342",
                        fontSize: "24px",
                        marginRight: "10px",
                        "&:hover": {
                          color: "white",
                        },
                      }}
                    />
                  </Link>
                  <Link href="https://x.com/staffinghub_ae" target="_blank">
                    <TwitterIcon
                      sx={{
                        color: "#977342",
                        fontSize: "24px",
                        marginRight: "10px",
                        "&:hover": {
                          color: "white",
                        },
                      }}
                    />
                  </Link>
                  <Link
                    href="https://www.instagram.com/staffingsolutionshub"
                    target="_blank"
                  >
                    <InstagramIcon
                      sx={{
                        color: "#977342",
                        fontSize: "24px",
                        marginRight: "12px",
                        "&:hover": {
                          color: "white",
                        },
                      }}
                    />
                  </Link>
                  <Link
                    href="https://www.tiktok.com/@staffingsolutionshub"
                    target="_blank"
                  >
                    <FontAwesomeIcon
                      className="tiktok-footer"
                      style={{
                        color: "#977342",
                        fontSize: "24px",
                        marginRight: "10px",
                      }}
                      icon={faTiktok}
                    />
                  </Link>
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
            color: "#9CA3AF",
            fontSize: { xs: "12px", md: "14px" },
          }}
        >
          © 2025 Staffing Solutions Hub. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
