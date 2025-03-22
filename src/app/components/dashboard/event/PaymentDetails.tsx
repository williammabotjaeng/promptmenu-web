"use client";

import * as React from "react";
import { PaymentInput } from "./PaymentInput";
import { Box, Typography, Button, FormControlLabel, Switch } from "@mui/material";
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import RoleHeaderWithProgressBar from "./RoleHeaderWithProgressBar";
import { useState, useEffect } from "react";
import { useStore } from "zustand";
import useEventStore from "@/state/use-event-store";

export const PaymentDetails: React.FC<PostEventStepProps> = ({ activeStep, setActiveStep }) => {
  const { eventDetails, eventRole, setEventRole } = useStore(useEventStore);

  const [hourlyPay, setHourlyPay] = useState<number | string>(eventRole?.hourlyPay || "");
  const [dailyPay, setDailyPay] = useState<number | string>(eventRole?.dailyPay || "");
  const [projectPay, setProjectPay] = useState<number | string>(eventRole?.projectPay || "");
  const [paymentTerms, setPaymentTerms] = useState<string>(eventRole?.paymentTerms || "");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [autoCalculate, setAutoCalculate] = useState<boolean>(true);
  const [lastChangedField, setLastChangedField] = useState<string | null>(null);

  // Calculate event duration in hours and days
  const calculateEventDuration = () => {
    if (!eventDetails.startDateTime || !eventDetails.endDateTime) {
      return { hours: 8, days: 1 }; // Default values if dates not available
    }

    const startDate = new Date(eventDetails.startDateTime);
    const endDate = new Date(eventDetails.endDateTime);

    // Calculate duration in milliseconds
    const durationMs = endDate.getTime() - startDate.getTime();
    
    // Convert to hours (rounded up)
    const hours = Math.ceil(durationMs / (1000 * 60 * 60));
    
    // Convert to days (rounded up to nearest 0.5)
    const rawDays = durationMs / (1000 * 60 * 60 * 24);
    const days = Math.ceil(rawDays * 2) / 2; // Round to nearest 0.5
    
    return { hours, days };
  };

  // Get duration when component mounts
  const { hours: eventHours, days: eventDays } = calculateEventDuration();

  // Calculate rates based on the field that was changed
  useEffect(() => {
    if (!autoCalculate || !lastChangedField) return;

    const calculateRates = () => {
      // Handle each possible input field as the source of truth
      if (lastChangedField === 'hourlyPay' && hourlyPay !== "") {
        const hourlyValue = Number(hourlyPay);
        setDailyPay(Math.round(hourlyValue * 8)); // Assume 8-hour workday
        setProjectPay(Math.round(hourlyValue * eventHours)); // Total project based on event hours
      } 
      else if (lastChangedField === 'dailyPay' && dailyPay !== "") {
        const dailyValue = Number(dailyPay);
        setHourlyPay(Math.round(dailyValue / 8)); // Derive hourly from daily
        setProjectPay(Math.round(dailyValue * eventDays)); // Total project based on event days
      } 
      else if (lastChangedField === 'projectPay' && projectPay !== "") {
        const projectValue = Number(projectPay);
        setDailyPay(Math.round(projectValue / eventDays)); // Daily rate based on project total
        setHourlyPay(Math.round(projectValue / eventHours)); // Hourly rate based on project total
      }
    };

    calculateRates();
    // Reset last changed field after calculations
    setLastChangedField(null);
  }, [lastChangedField, hourlyPay, dailyPay, projectPay, autoCalculate, eventHours, eventDays]);

  const validateRates = () => {
    const newErrors: { [key: string]: string } = {};

    if (hourlyPay !== "" && Number(hourlyPay) < 0) {
      newErrors.hourlyPay = "Hourly rate cannot be negative.";
    }

    if (dailyPay !== "" && Number(dailyPay) < 0) {
      newErrors.dailyPay = "Daily rate cannot be negative.";
    }

    if (projectPay !== "" && Number(projectPay) < 0) {
      newErrors.projectPay = "Project rate cannot be negative.";
    }

    // Only check relationships if not auto-calculating (otherwise they're always in proper relation)
    if (!autoCalculate) {
      if (dailyPay !== "" && projectPay !== "" && Number(projectPay) < Number(dailyPay)) {
        newErrors.projectPay = "Project rate cannot be less than daily rate.";
      }

      if (dailyPay !== "" && hourlyPay !== "" && Number(dailyPay) < Number(hourlyPay)) {
        newErrors.dailyPay = "Daily rate cannot be less than hourly rate.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleContinue = () => {
    if (validateRates()) {
      setEventRole({
        ...eventRole,
        hourlyPay: Number(hourlyPay) || 0,
        dailyPay: Number(dailyPay) || 0,
        projectPay: Number(projectPay) || 0,
        paymentTerms: paymentTerms
      });
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleRateChange = (id: string, value: string) => {
    const numericValue = value === "" ? "" : parseInt(value, 10);

    if (id === "hourlyPay") {
      setHourlyPay(numericValue);
      setLastChangedField("hourlyPay");
    } else if (id === "dailyPay") {
      setDailyPay(numericValue);
      setLastChangedField("dailyPay");
    } else if (id === "projectPay") {
      setProjectPay(numericValue);
      setLastChangedField("projectPay");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        justifyContent: "center",
        padding: { xs: 2, md: 4 },
        pb: { xs: 10, md: 4 },
      }}
    >
      <RoleHeaderWithProgressBar progressValue={72} indexValue={3} />

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
          padding: "15px",
          marginTop: "20px",
          marginLeft: "15px",
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <Typography variant="h4" sx={{ pb: 2, color: "#977342" }}>
          Payment Details
        </Typography>
        
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Event Duration: ~{eventHours} hours ({eventDays} days)
          </Typography>
          
          <FormControlLabel
            control={
              <Switch 
                checked={autoCalculate}
                onChange={(e) => setAutoCalculate(e.target.checked)}
                color="primary"
              />
            }
            label="Auto-calculate rates"
          />
        </Box>
        
        <Box sx={{ display: "flex", flexDirection: "column", mt: 2, width: "100%", color: "black" }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <PaymentInput
              label="Per Hour"
              id="hourlyPay"
              value={hourlyPay}
              onChange={(e) => handleRateChange("hourlyPay", e.target.value)}
              error={errors.hourlyPay}
            />
            <PaymentInput
              label="Per Day"
              id="dailyPay"
              value={dailyPay}
              onChange={(e) => handleRateChange("dailyPay", e.target.value)}
              error={errors.dailyPay}
            />
            <PaymentInput
              label="Per Project"
              id="projectPay"
              value={projectPay}
              onChange={(e) => handleRateChange("projectPay", e.target.value)}
              error={errors.projectPay}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
            <label htmlFor="paymentTerms" style={{ padding: "8px 0", fontWeight: "bold" }}>
              Payment Terms
            </label>
            <textarea
              id="paymentTerms"
              style={{
                marginTop: "8px",
                height: "128px",
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "20px",
                border: "1px solid #D1D5DB",
                width: "100%",
                resize: "none",
              }}
              onChange={(e) => setPaymentTerms(e.target.value)}
              value={paymentTerms}
              placeholder="Specify payment schedule, methods accepted, etc."
              aria-label="Enter payment terms"
            />
          </Box>
        </Box>
      </form>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignSelf: "flex-end",
          mt: 4,
          mr: { xs: 0, md: 0 },
          textAlign: "center",
        }}
      >
        <Button onClick={handleBack} sx={{ color: "#977342", border: "2px solid #977342", 
          "&hover": {
            color: "white"
          }
         }}>
          Go Back
        </Button>
        <Button onClick={handleContinue} sx={{ color: "white", backgroundColor: "#977342" }}>
          Next Step
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentDetails;