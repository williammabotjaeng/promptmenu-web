import * as React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Facebook, Google, Twitter } from "@mui/icons-material";
import SSHGoldLogo from "@/assets/GoldLogo.png";
import LoginBG from "@/assets/login-img.png";

export const ForgotForm: React.FC = () => {
  return (
    <Grid
      container
      sx={{ height: { xs: "100%", md: "125vh" }, backgroundColor: "black" }}
    >
      {/* Left Column */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "100%" },
          padding: { xs: 1, md: 4 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            padding: { md: 12, xs: 4 },
          }}
        >
          <img
            loading="lazy"
            src={SSHGoldLogo?.src}
            alt="Company logo"
            style={{ maxWidth: "204px", marginBottom: "20px" }}
          />
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              width: { xs: "100%" },
              flexDirection: "column",
              justifyContent: "center",
              mt: { xs: 0, md: 16 },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#977342",
                marginBottom: 2,
                fontSize: { xs: "20px" },
                textAlign: { xs: "center" },
              }}
            >
              Forgot your Password?
            </Typography>
            <Typography variant="body1" sx={{ color: "gray", marginBottom: 4 }}>
              Enter your email address to reset.
            </Typography>
            <form>
              {/* Styled Input Fields */}
              <TextField
                label="Email"
                type="email"
                placeholder="Enter your Email"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  sx: {
                    color: "#977342",
                    width: { xs: "100%" },
                    "&.Mui-focused": {
                      color: "#977342",
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#977342",
                      color: "#977342",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#977342",
                      color: "#977342",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#977342",
                      color: "#977342",
                    },
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  marginTop: 3,
                  backgroundColor: "#977342",
                  color: "white",
                  padding: "10px 20px",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "#977342",
                    color: "white",
                  },
                }}
              >
                Send Email
              </Button>
              <Box sx={{ textAlign: "center", marginTop: 2 }}>
                <Typography variant="body2" sx={{ color: "gray" }}>
                  Don't have an account? <br />
                  <Box
                    sx={{
                      color: "#977342",
                      "&:hover": {
                        color: "#CEAB76",
                        background: "transparent",
                      },
                    }}
                  >
                    Sign up as{" "}
                    <Link style={{ color: "white" }} href="/register/2">
                      Client
                    </Link>{" "}
                    or{" "}
                    <Link style={{ color: "white" }} href="/register/1">
                      Talent
                    </Link>
                  </Box>
                </Typography>
              </Box>
            </form>
          </Box>
        </Box>
      </Grid>

      {/* Right Column */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{ display: { md: "flex", xs: "none" }, position: "relative" }}
      >
        <img
          loading="lazy"
          src={LoginBG?.src}
          alt="Background fashion event"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "relative",
            top: 0,
            left: 0,
          }}
        />
        {/* Black Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}
        >
          {/* Slogan */}
          <Box sx={{ position: "absolute", top: 16, left: 16, color: "white" }}>
            <Typography variant="h6">
              Staffing Your Success, One Event at a Time.
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "white", marginTop: 1, opacity: 0.6 }}
            >
              Connect with top brands and opportunities in the fashion industry.
            </Typography>
          </Box>
          {/* Social Icons */}
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: 16,
              display: "flex",
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              sx={{
                borderColor: "white",
                color: "white",
                "&:hover": {
                  backgroundColor: "#977342",
                  color: "white",
                },
              }}
            >
              <Facebook />
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "white",
                color: "white",
                "&:hover": {
                  backgroundColor: "#977342",
                  color: "white",
                },
              }}
            >
              <Google />
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "white",
                color: "white",
                "&:hover": {
                  backgroundColor: "#977342",
                  color: "white",
                },
              }}
            >
              <Twitter />
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
