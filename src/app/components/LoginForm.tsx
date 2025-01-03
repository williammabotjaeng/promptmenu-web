"use client";

import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

const LoginForm = () => {
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

    // Basic validation
    const newErrors = {};
    if (!formData.usernameOrEmail) newErrors.usernameOrEmail = "Username or Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Submit the form (e.g., send to API)
      console.log("Login form submitted:", formData);
      alert("Login successful!");
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
        border: "2px solid var(--dark-gold)",
        borderRadius: "8px",
        fontFamily: "Open Sans",
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
          sx={{ marginBottom: "20px" }}
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
          sx={{ marginBottom: "20px" }}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "var(--blue-munsell-2)",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "var(--moonstone)",
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