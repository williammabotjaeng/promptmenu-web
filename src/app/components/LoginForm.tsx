"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useAuth } from "@/providers/auth-providers";
import { useRouter } from "next/navigation"; 
import { useCookies } from "react-cookie";
import { useStore } from "zustand";
import useUserDataStore from "@/state/use-user-data-store";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const [cookies] = useCookies(['user_role', 'profile_progress', 'onboarding_presented', 'profile_completed']);

  const {
    user_role,
    profile_progress,
    onboarding_presented,
    profile_completed
  } = useStore(useUserDataStore);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!formData.username) newErrors.username = "Username or Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await login(formData.username, formData.password);

        // Show success message and redirect to dashboard
        setSnackbarMessage("Login successful! Redirecting...");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        
        setTimeout(() => {
          
          console.log("1. ", onboarding_presented);
          console.log("2. ", profile_progress);
          console.log("3. ", profile_completed);

          if (useUserDataStore?.getState()?.onboarding_presented && useUserDataStore?.getState()?.profile_progress > 0.6) {
            console.log("Routing option 1");
            const redirectPath = useUserDataStore?.getState()?.user_role === 'client' ? '/dashboard' : '/portal';
            router.push(redirectPath);
          } else if (useUserDataStore?.getState()?.profile_progress < 0.6 && !useUserDataStore?.getState()?.profile_completed) {
            console.log("Routing option 2");
            const onboardingPath = useUserDataStore?.getState()?.user_role === 'client' ? '/client-onboarding' : '/talent-onboarding';
            console.log("Redirecting to: ", onboardingPath, "with user role", useUserDataStore?.getState()?.user_role); 
            router.push(onboardingPath);
          } else {
            console.log("Routing option 3");
            const fallbackPath = useUserDataStore?.getState()?.user_role === 'client' ? '/dashboard' : '/portal';
            router.push(fallbackPath);
          }
        }, 2000);
        
      } catch (error) {
        console.error("Login failed:", error);
        setSnackbarMessage("Login failed. Please check your credentials.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = (event: React.SyntheticEvent<any> | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ maxWidth: "400px", margin: "0 auto", padding: "20px", backgroundColor: "var(--primary-bg)", color: "var(--primary-text)", border: "2px solid #977342", borderRadius: "8px", fontFamily: "Open Sans", outline: "2px solid #977342", outlineOffset: "4px", marginTop: "24px" }}>
      <h1 style={{ textAlign: "center", color: "var(--dark-gold)" }}>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "20px" }}>
        
        {/* Username or Email Field */}
        <TextField
          label="Username or Email"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          required
          error={!!errors.username}
          helperText={errors.username}
          onFocus={(e) => e.target.style.color = "#977342"} 
          onBlur={(e) => e.target.style.color = "#977342"}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#977342",
                color: "#977342"
              },
              "&:hover fieldset": {
                borderColor: "#977342",
                color: "#977342"
              },
              "&.Mui-focused fieldset": {
                borderColor: "#977342",
                color: "#977342",
              },
              "&.Mui-filled fieldset": {
                borderColor: "#977342",
                color: "#977342",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#977342",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#977342",
            },
          }}
        />

        {/* Password Field */}
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
          error={!!errors.password}
          helperText={errors.password}
          onFocus={(e) => e.target.style.color = "#977342"} 
          onBlur={(e) => e.target.style.color = "#977342"} 
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#977342",
              },
              "&:hover fieldset": {
                borderColor: "#977342",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#977342",
                color: "#977342",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#977342",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#977342",
            },
          }}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#977342",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#CEAB76",
            },
          }}
        >
          Login
        </Button>
      </form>

      {/* Snackbar for feedback */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginForm;