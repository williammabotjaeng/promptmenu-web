import * as React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { PaymentMethod } from "@/components/portal/onboarding/PaymentMethod";
import OnboardingHeader from "@/components/portal/onboarding/OnboardingHeader";
import { useRouter } from "next/navigation";
import { OnboardingStepProps } from "@/types/Props/OnboardingStepProps";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { useCookies } from "react-cookie";
import { useTalentProfile } from "@/providers/talent-profile-provider";
import Loading from "@/components/Loading";

export const skillsRequiringPhysicalAttributes: string[] = [
  "Modeling",
  "Sports Modeling",
  "Ushering",
  "Hosting",
  "Security Management",
];

const paymentMethodsTab = [
  { label: "Bank Transfer", value: "bankAccount" },
  { label: "via PayPal", value: "paypal" },
];

export const PaymentSection: React.FC = () => {
  const [activePaymentMethod, setActivePaymentMethod] =
    useState<string>("creditCard");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [paymentDetails, setPaymentDetails] = useState({
      paypalEmail: "",
      bankName: "",
      iBAN: "",
      accountNumber: "",
    });

  const [cookies] = useCookies(['user_role']);

  const userRole = cookies['user_role'];

  const [loading, setLoading] = useState(false);

  const { talentProfile, fetchTalentProfile } = useTalentProfile();

  const router = useRouter();

  const onClose = () => {
    router.push("/portal");
  };

  const handleContinue = () => {
   
  };

  const handleInputChange = (field) => (event) => {
    // setPaymentDetails((prev) => ({ ...prev, [field]: event.target.value }));
  };

  useEffect(() => {
    const loadPaymentDetails = async () => {
      
      await fetchTalentProfile(); 

      setPaymentDetails({
        paypalEmail: talentProfile?.paypalEmail || '',
        bankName: talentProfile?.bankName || '',
        iBAN: talentProfile?.iBAN || '',
        accountNumber: talentProfile?.accountNumber || '',
      });
    };

    loadPaymentDetails(); 
  }, [fetchTalentProfile, talentProfile]); 

  const renderPaymentForm = () => {
    switch (activePaymentMethod) {
      case "paypal":
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="body1" sx={{ mb: 2, color: "#977342" }}>
              Enter your PayPal email:
            </Typography>
            <TextField
              fullWidth
              placeholder="PayPal Email"
              variant="outlined"
              value={paymentDetails?.paypalEmail || ""}
              onChange={handleInputChange("paypalEmail")}
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#977342",
                  },
                  "&:hover fieldset": {
                    borderColor: "#CEAB76",
                  },
                },
              }}
            />
          </Box>
        );
      case "bankAccount":
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="body1" sx={{ mb: 2, color: "#977342" }}>
              Enter your banking details:
            </Typography>
            <TextField
              fullWidth
              placeholder="Account Number"
              variant="outlined"
              value={paymentDetails?.accountNumber || ""}
              onChange={handleInputChange("accountNumber")}
              sx={{
                mb: 2,
                backgroundColor: "white",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#977342",
                  },
                  "&:hover fieldset": {
                    borderColor: "#CEAB76",
                  },
                },
              }}
            />
            <TextField
              fullWidth
              placeholder="Bank Name"
              variant="outlined"
              value={paymentDetails?.bankName || ""}
              onChange={handleInputChange("bankName")}
              sx={{
                mb: 2,
                backgroundColor: "white",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#977342",
                  },
                  "&:hover fieldset": {
                    borderColor: "#CEAB76",
                  },
                },
              }}
            />
            <TextField
              fullWidth
              placeholder="IBAN"
              variant="outlined"
              value={paymentDetails?.iBAN || ""}
              onChange={handleInputChange("iBAN")}
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#977342",
                  },
                  "&:hover fieldset": {
                    borderColor: "#CEAB76",
                  },
                },
              }}
            />
          </Box>
        );
      default:
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="body1" sx={{ mb: 2, color: "#977342" }}>
              Please select your preferred payment method.
            </Typography>
          </Box>
        );
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) return <Loading />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        minHeight: "100vh",
        pb: 1,
      }}
    >
      {/* Payment Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingX: { xs: 2, md: 4 },
          paddingTop: 4,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#977342",
            paddingBottom: 3,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          How would you like to get Paid?
        </Typography>

        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 4,
            borderRadius: "8px",
            backgroundColor: "rgba(151, 115, 66, 0.05)",
            width: "100%",
            maxWidth: "768px",
          }}
        >
          {/* Payment Method Tabs */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              py: 0.5,
              textAlign: "center",
              borderBottom: "1px solid rgba(75, 85, 99, 0.2)",
              color: "#4B5563",
            }}
          >
            {paymentMethodsTab.map((method) => (
              <PaymentMethod
                key={method.value}
                label={method.label}
                isActive={activePaymentMethod === method.value}
                onClick={() => setActivePaymentMethod(method.value)}
              />
            ))}
          </Box>

          {/* Render Payment Form */}
          {renderPaymentForm()}
        </Paper>
      </Box>

      {/* Navigation Buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { xs: "flex-start", md: "space-between" },
          marginTop: 4,
          width: { xs: "100%", md: "55%" },
          paddingX: 2,
          alignItems: { md: "center" },
          marginLeft: { xs: "auto", md: "20%" },
        }}
      >
        <Button
          sx={{
            color: "#000",
            backgroundColor: "#CEAB76",
            "&:hover": { backgroundColor: "#b08a5c", color: "white" },
          }}
          onClick={handleContinue}
        >
          Save Payment Details
        </Button>
      </Box>
    </Box>
  );
};
