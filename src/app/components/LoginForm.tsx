"use client";

import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

interface LoginFormProps {
  onLogin: (userData: { usernameOrEmail: string; password: string }) => void; 
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.usernameOrEmail) newErrors.usernameOrEmail = "Username or Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Call the onLogin prop with the form data
      onLogin(formData);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "var(--primary-bg)",
        color: "var(--primary-text)",
        border: "2px solid #977342", 
        borderRadius: "8px",
        fontFamily: "Open Sans",
        outline: "2px solid #977342", 
        outlineOffset: "4px", 
        marginTop: '24px'
      }}
    >
      <h1 style={{ textAlign: "center", color: "var(--dark-gold)" }}>Login</h1>
      <form onSubmit={handleSubmit}>
        {/* Username or Email Field */}
        <TextField
          label="Username or Email"
          name="usernameOrEmail"
          value={formData.usernameOrEmail}
          onChange={handleChange}
          fullWidth
          required
          error={!!errors.usernameOrEmail}
          helperText={errors.usernameOrEmail}
          sx={{
            marginBottom: "20px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#977342", 
              },
              "&:hover fieldset": {
                borderColor: "#977342", 
              },
              "&.Mui-focused fieldset": {
                borderColor: "#977342", 
                color: "#977342"
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
          sx={{
            marginBottom: "20px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#977342", 
              },
              "&:hover fieldset": {
                borderColor: "#977342",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#977342", 
                color: '#977342'
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
    </Box>
  );
};

export default LoginForm;