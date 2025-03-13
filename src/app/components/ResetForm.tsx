import * as React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Facebook, Google, Twitter, Visibility, VisibilityOff } from "@mui/icons-material";
import SSHGoldLogo from "@/assets/GoldLogo.png";
import { useState } from "react";
import { usePathname } from "next/navigation";
import LoginBG from "@/assets/login-img.png";

export const ResetForm: React.FC = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isInfluencer, setIsInfluencer] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const pathname = usePathname();

  const username = pathname.split('/')[2];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("Name:", name);
    console.log("Value:", value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const { password, confirmPassword } = formData;

    const requirements = [
      {
        check: password && confirmPassword,
        message: "All fields are required.",
      },
      {
        check: password.length >= 8,
        message: "Password must be at least 8 characters long.",
      },
      {
        check: /[A-Z]/.test(password),
        message: "Password must contain at least one uppercase letter.",
      },
      {
        check: /[a-z]/.test(password),
        message: "Password must contain at least one lowercase letter.",
      },
      {
        check: /[0-9]/.test(password),
        message: "Password must contain at least one digit.",
      },
      {
        check: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        message: "Password must contain at least one special character.",
      },
      {
        check: !password.includes(username),
        message: "Password cannot contain the username.",
      },
      {
        check: password === confirmPassword,
        message: "Passwords must match.",
      },
    ];

    const unmetRequirements = requirements.filter(
      (requirement) => !requirement.check
    );

    if (unmetRequirements.length > 0) {
      return unmetRequirements.map((req) => req.message);
    }

    return [];
  };

  const SubmitReset = () => {

    validateForm();

    

  }

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
            src={SSHGoldLogo.src}
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
              Reset your Password
            </Typography>
            <Typography variant="body1" sx={{ color: "gray", marginBottom: 4 }}>
              Enter your new Password to reset.
            </Typography>
            <form>
              {/* Styled Input Fields */}
              {/* Password Field */}
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{
                  sx: {
                    color: "#977342",
                    "&.Mui-focused": {
                      color: "#977342",
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    color: "#977342",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#977342",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#977342",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#977342",
                    },
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? (
                          <VisibilityOff sx={{ color: "#977342" }} />
                        ) : (
                          <Visibility sx={{ color: "#977342" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Confirm Password Field */}
              <TextField
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{
                  sx: {
                    color: "#977342",
                    "&.Mui-focused": {
                      color: "#977342",
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    color: "#977342",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#977342",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#977342",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#977342",
                    },
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={toggleConfirmPasswordVisibility}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff sx={{ color: "#977342" }} />
                        ) : (
                          <Visibility sx={{ color: "#977342" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
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
                onClick={SubmitReset}
              >
                Reset Password
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
