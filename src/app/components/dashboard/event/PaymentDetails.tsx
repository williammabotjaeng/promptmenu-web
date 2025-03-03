"use client";

import * as React from "react";
import { PaymentInput } from "./PaymentInput";
import { Box, Typography, Button } from "@mui/material";
import { PostEventStepProps } from "@/types/Props/PostEventStepProps";
import RoleHeaderWithProgressBar from "./RoleHeaderWithProgressBar";
import { useState } from "react";
import { useStore } from "zustand";
import useEventStore from "@/state/use-event-store";

export const PaymentDetails: React.FC<PostEventStepProps> = ({ activeStep, setActiveStep }) => {
  const { eventRole, setEventRole } = useStore(useEventStore);

  const [hourlyPay, setHourlyPay] = useState<number | string>(eventRole?.hourlyPay || "");
  const [dailyPay, setDailyPay] = useState<number | string>(eventRole?.dailyPay || "");
  const [projectPay, setProjectPay] = useState<number | string>(eventRole?.projectPay || "");
  const [paymentTerms, setPaymentTerms] = useState<string>(eventRole?.paymentTerms || "");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

    if (dailyPay !== "" && projectPay !== "" && Number(projectPay) < Number(dailyPay)) {
      newErrors.projectPay = "Project rate cannot be less than daily rate.";
    }

    if (dailyPay !== "" && hourlyPay !== "" && Number(dailyPay) < Number(hourlyPay)) {
      newErrors.dailyPay = "Daily rate cannot be less than hourly rate.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleContinue = () => {
    if (validateRates()) {
      setEventRole({
        ...eventRole,
        hourlyPay: Number(hourlyPay),
        dailyPay: Number(dailyPay),
        projectPay: Number(projectPay),
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
    } else if (id === "dailyPay") {
      setDailyPay(numericValue);
    } else if (id === "projectPay") {
      setProjectPay(numericValue);
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
        <Button onClick={handleBack} sx={{ color: "#977342", border: "2px solid #977342" }}>
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