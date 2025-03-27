"use client";

import * as React from "react";
import { PaymentInput } from "./PaymentInput";
import { Box, Typography, Button, FormControlLabel, Switch, Tooltip } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import RoleHeaderWithProgressBar from "./RoleHeaderWithProgressBar";
import { useState, useEffect } from "react";
import { useStore } from "zustand";
import useEventStore from "@/state/use-event-store";

// Types needed for time slots
interface TimeSlot {
  startTime: Date | null;
  endTime: Date | null;
}

interface TimeSlots {
  monday: TimeSlot;
  tuesday: TimeSlot;
  wednesday: TimeSlot;
  thursday: TimeSlot;
  friday: TimeSlot;
  saturday: TimeSlot;
  sunday: TimeSlot;
}

interface TimeSlotsConfig {
  mode: 'universal' | 'perDay';
  universalTimeSlot: TimeSlot;
  dailyTimeSlots: TimeSlots;
}

export const PaymentDetails: React.FC<PostEventStepProps> = ({ activeStep, setActiveStep }) => {
  const { eventDetails, eventRole, setEventRole } = useStore(useEventStore);

  const [hourlyPay, setHourlyPay] = useState<number | string>(eventRole?.hourlyPay || "");
  const [dailyPay, setDailyPay] = useState<number | string>(eventRole?.dailyPay || "");
  const [projectPay, setProjectPay] = useState<number | string>(eventRole?.projectPay || "");
  const [paymentTerms, setPaymentTerms] = useState<string>(eventRole?.paymentTerms || "");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [autoCalculate, setAutoCalculate] = useState<boolean>(true);
  const [lastChangedField, setLastChangedField] = useState<string | null>(null);

  // Event duration calculation state
  const [eventDuration, setEventDuration] = useState({
    totalHours: 0,
    totalDays: 0,
    workingHours: 0,
    workingDays: 0
  });

  // Calculate event duration and working hours based on time slots
  useEffect(() => {
    const calculateEventDuration = () => {
      if (!eventDetails.startDateTime || !eventDetails.endDateTime) {
        return { totalHours: 8, totalDays: 1, workingHours: 8, workingDays: 1 }; // Default values
      }

      const startDate = new Date(eventDetails.startDateTime);
      const endDate = new Date(eventDetails.endDateTime);

      // Calculate total duration in milliseconds
      const durationMs = endDate.getTime() - startDate.getTime();
      
      // Convert to hours and days
      const totalHours = Math.ceil(durationMs / (1000 * 60 * 60));
      const rawDays = durationMs / (1000 * 60 * 60 * 24);
      const totalDays = Math.ceil(rawDays * 2) / 2; // Round to nearest 0.5
      
      // Default to total duration if no time slots defined
      let workingHours = totalHours;
      let workingDays = totalDays;

      // Calculate working hours based on time slots if available
      if (eventDetails.timeSlotsConfig) {
        const { timeSlotsConfig } = eventDetails;
        
        if (timeSlotsConfig.mode === 'universal') {
          // Universal time slot calculation
          if (timeSlotsConfig.universalTimeSlot.startTime && timeSlotsConfig.universalTimeSlot.endTime) {
            const start = new Date(timeSlotsConfig.universalTimeSlot.startTime);
            const end = new Date(timeSlotsConfig.universalTimeSlot.endTime);
            
            // Hours per day based on universal slot
            const hoursPerDay = (end.getHours() + end.getMinutes()/60) - 
                               (start.getHours() + start.getMinutes()/60);
            
            // Unique days in the event
            const uniqueDaysSet = new Set();
            let currentDate = new Date(startDate);
            
            while (currentDate <= endDate) {
              uniqueDaysSet.add(currentDate.getDay());
              currentDate.setDate(currentDate.getDate() + 1);
            }
            
            const uniqueDaysCount = uniqueDaysSet.size;
            workingHours = hoursPerDay * uniqueDaysCount;
            workingDays = uniqueDaysCount;
          }
        } else {
          // Per-day time slot calculation
          let totalWorkingHours = 0;
          const activeDays = new Set();
          
          // Map day of week (0-6) to day name
          const dayMapping: Record<number, keyof TimeSlots> = {
            0: 'sunday',
            1: 'monday',
            2: 'tuesday',
            3: 'wednesday',
            4: 'thursday',
            5: 'friday',
            6: 'saturday',
          };
          
          // Iterate through each day of the event
          let currentDate = new Date(startDate);
          while (currentDate <= endDate) {
            const dayName = dayMapping[currentDate.getDay()];
            const daySlot = timeSlotsConfig.dailyTimeSlots[dayName];
            
            if (daySlot.startTime && daySlot.endTime) {
              const start = new Date(daySlot.startTime);
              const end = new Date(daySlot.endTime);
              
              // Calculate hours for this day
              const hoursForDay = (end.getHours() + end.getMinutes()/60) - 
                                 (start.getHours() + start.getMinutes()/60);
              
              totalWorkingHours += hoursForDay;
              activeDays.add(dayName);
            }
            
            // Move to next day
            currentDate.setDate(currentDate.getDate() + 1);
          }
          
          workingHours = totalWorkingHours;
          workingDays = activeDays.size;
        }
      }
      
      return { 
        totalHours, 
        totalDays, 
        workingHours: Math.max(workingHours, 1), // Ensure at least 1 hour
        workingDays: Math.max(workingDays, 0.5)  // Ensure at least half a day
      };
    };

    const duration = calculateEventDuration();
    setEventDuration(duration);
  }, [eventDetails.startDateTime, eventDetails.endDateTime, eventDetails.timeSlotsConfig]);

  // Calculate rates based on the field that was changed and using working hours
  useEffect(() => {
    if (!autoCalculate || !lastChangedField) return;

    const { workingHours, workingDays } = eventDuration;
    const hoursPerDay = workingHours / workingDays || 8; // Default to 8 if calculation is invalid

    const calculateRates = () => {
      // Handle each possible input field as the source of truth
      if (lastChangedField === 'hourlyPay' && hourlyPay !== "") {
        const hourlyValue = Number(hourlyPay);
        setDailyPay(Math.round(hourlyValue * hoursPerDay)); // Daily rate based on working hours per day
        setProjectPay(Math.round(hourlyValue * workingHours)); // Total project based on working hours
      } 
      else if (lastChangedField === 'dailyPay' && dailyPay !== "") {
        const dailyValue = Number(dailyPay);
        setHourlyPay(Math.round(dailyValue / hoursPerDay)); // Derive hourly from daily
        setProjectPay(Math.round(dailyValue * workingDays)); // Total project based on working days
      } 
      else if (lastChangedField === 'projectPay' && projectPay !== "") {
        const projectValue = Number(projectPay);
        setDailyPay(Math.round(projectValue / workingDays)); // Daily rate based on project total
        setHourlyPay(Math.round(projectValue / workingHours)); // Hourly rate based on project total
      }
    };

    calculateRates();
    // Reset last changed field after calculations
    setLastChangedField(null);
  }, [lastChangedField, hourlyPay, dailyPay, projectPay, autoCalculate, eventDuration]);

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

    // Only check relationships if not auto-calculating
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
        paymentTerms: paymentTerms,
        // Store calculated working hours/days for reference
        calculatedHours: eventDuration.workingHours,
        calculatedDays: eventDuration.workingDays
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
        
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2, flexWrap: "wrap" }}>
          <Box sx={{ mb: 1 }}>
            <Typography variant="body2" sx={{ color: "text.secondary", display: "flex", alignItems: "center", mb: 0.5 }}>
              Total Event Duration: {eventDuration.totalHours} hours ({eventDuration.totalDays} days)
            </Typography>
            
            <Typography variant="body2" sx={{ 
              color: "#977342", 
              fontWeight: "medium", 
              display: "flex", 
              alignItems: "center",
              mb: 0.5 
            }}>
              Working Hours: {eventDuration.workingHours} hours ({eventDuration.workingDays} days)
              <Tooltip title="Calculated based on your event's working hours schedule" placement="right">
                <InfoIcon sx={{ ml: 0.5, fontSize: 16 }} />
              </Tooltip>
            </Typography>
            
            <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
              Calculations are based on working hours from your time slots
            </Typography>
          </Box>
          
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
              hint={`Based on ${Math.round(eventDuration.workingHours / eventDuration.workingDays)} hours per day`}
            />
            <PaymentInput
              label="Per Project"
              id="projectPay"
              value={projectPay}
              onChange={(e) => handleRateChange("projectPay", e.target.value)}
              error={errors.projectPay}
              hint={`For entire ${eventDuration.workingHours} working hours`}
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