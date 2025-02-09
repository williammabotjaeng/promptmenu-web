import * as React from "react";
import { TextField, Box, Typography } from "@mui/material";
import { useStore } from "zustand";
import useEventStore from "@/state/use-event-store";

export interface PaymentInputProps {
  label: string;
  id: "hourlyPay" | "dailyPay" | "projectPay"; 
}

export const PaymentInput: React.FC<PaymentInputProps> = ({ label, id }) => {
  const { eventRole, setEventRole } = useStore(useEventStore); 
  const [value, setValue] = React.useState<number | string>(eventRole[id] || ""); 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value === "" ? "" : parseFloat(event.target.value); 
    setValue(newValue); 

    // Update Zustand store dynamically based on the id
    setEventRole({
      ...eventRole,
      [id]: newValue,
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Typography
        sx={{
          paddingY: 1,
          bgcolor: "transparent",
          fontWeight: "bold",
          fontSize: { xs: "0.875rem", md: "1rem" }, 
        }}
      >
        {label} (AED)
      </Typography>
      <TextField
        type="number"
        id={id}
        value={value}
        onChange={handleChange}
        variant="outlined"
        sx={{
          marginTop: 2,
          bgcolor: "white",
          borderRadius: "8px",
          height: "50px",
          width: { xs: "100%", md: "auto" },
          "& .MuiOutlinedInput-root": {
            border: "1px solid",
            borderColor: "grey.300",
          },
        }}
        inputProps={{
          "aria-label": `Enter ${label} amount in AED`,
        }}
      />
    </Box>
  );
};