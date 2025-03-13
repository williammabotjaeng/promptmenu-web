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
import useTalentOnboardingStore from "@/state/use-talent-onboarding-store";
import Loading from "@/components/Loading";

const steps = [
  { number: 1, title: "Headshot", isActive: false },
  { number: 2, title: "Skills", isActive: false },
  { number: 3, title: "Payment", isActive: true },
  { number: 4, title: "Attributes", isActive: false },
  { number: 5, title: "Social", isActive: false },
  { number: 6, title: "ID", isActive: false },
  { number: 7, title: "Portfolio", isActive: false },
  { number: 8, title: "Review", isActive: false },
];

const InfluencerSteps = [
  { number: 1, title: "Headshot", isActive: false },
  { number: 2, title: "Personal Info", isActive: false },
  { number: 3, title: "Skills", isActive: false },
  { number: 4, title: "Payment", isActive: true },
  { number: 5, title: "Attributes", isActive: false },
  { number: 6, title: "Social", isActive: false },
  { number: 7, title: "ID", isActive: false },
  { number: 8, title: "Portfolio", isActive: false },
  { number: 9, title: "Review", isActive: false },
];

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

export const PaymentSection: React.FC<OnboardingStepProps> = ({
  activeStep,
  setActiveStep,
}) => {
  const [activePaymentMethod, setActivePaymentMethod] =
    useState<string>("creditCard");

  const { paymentMethods, setPaymentMethods, talentData } = useStore(
    useTalentOnboardingStore
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [cookies] = useCookies(['user_role']);

  const userRole = cookies['user_role'];

  const [loading, setLoading] = useState(false);

  const [paymentDetails, setPaymentDetails] = useState({
    ccNumber: paymentMethods?.ccNumber || "",
    ccFirstName: paymentMethods?.ccFirstName || "",
    ccLastName: paymentMethods?.ccLastName || "",
    ccExpiry: paymentMethods?.ccExpiry || "",
    ccCVC: paymentMethods?.ccCVC || "",
    paypalEmail: paymentMethods?.paypalEmail || "",
    bankName: paymentMethods?.bankName || "",
    iBAN: paymentMethods?.iBAN || "",
    accountNumber: paymentMethods?.accountNumber || "",
  });

  const router = useRouter();

  const onClose = () => {
    router.push("/portal");
  };

  const handleContinue = () => {
    setLoading(true);
    const hasPhysicalAttributeSkill = talentData.skills.some((skill) =>
      skillsRequiringPhysicalAttributes.includes(skill.name)
    );
    setPaymentMethods({
      payment_method: activePaymentMethod,
      ...paymentDetails,
    });
    const areAllFieldsEmpty = Object.values(paymentDetails).every(
      (value) => value === ""
    );
    if (!areAllFieldsEmpty) {
      if (hasPhysicalAttributeSkill) {
        setActiveStep(activeStep + 1);
      } else {
        setActiveStep(activeStep + 2);
      }
    } else {
      setSnackbarMessage("Add At least 1 Payment Method.");
      setSnackbarOpen(true);
    }
    setLoading(false);
  };

  const handleSkip = () => {
    const hasPhysicalAttributeSkill = talentData.skills.some((skill) =>
      skillsRequiringPhysicalAttributes.includes(skill.name)
    );

    if (hasPhysicalAttributeSkill) {
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(activeStep + 2);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    } else {
      router.push("/portal");
    }
  };

  const handleInputChange = (field) => (event) => {
    setPaymentDetails((prev) => ({ ...prev, [field]: event.target.value }));
  };

  useEffect(() => {
    if (paymentMethods) {
      setPaymentDetails({
        ccNumber: paymentMethods.ccNumber || "",
        ccFirstName: paymentMethods.ccFirstName || "",
        ccLastName: paymentMethods.ccLastName || "",
        ccExpiry: paymentMethods.ccExpiry || "",
        ccCVC: paymentMethods.ccCVC || "",
        paypalEmail: paymentMethods.paypalEmail || "",
        bankName: paymentMethods.bankName || "",
        accountNumber: paymentMethods.accountNumber || "",
        iBAN: paymentMethods.iBAN || "",
      });
    }
  }, [paymentMethods]);

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
              value={paymentDetails.paypalEmail || ""}
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
              value={paymentDetails.accountNumber || ""}
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
              value={paymentDetails.bankName || ""}
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
              value={paymentDetails.iBAN || ""}
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
        backgroundColor: "black",
        minHeight: "100vh",
        pb: 4,
      }}
    >
      {/* Header Section */}
      <OnboardingHeader steps={userRole === 'influencer' ? InfluencerSteps : steps} onClose={onClose} />

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
            color: "#977342",
            border: "2px solid #977342",
            "&:hover": { color: "#fff" },
            marginBottom: { xs: 1, md: 0 },
          }}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          sx={{
            color: "#000",
            backgroundColor: "#CEAB76",
            "&:hover": { backgroundColor: "#b08a5c" },
          }}
          onClick={handleContinue}
        >
          Continue
        </Button>
        <Button
          sx={{
            color: "#977342",
            border: "2px solid #977342",
            "&:hover": { color: "#fff" },
            width: { xs: "100%", md: "auto" },
            marginBottom: { xs: 1, md: 0 },
            mt: { xs: 1 },
          }}
          onClick={handleSkip}
        >
          Skip for Now
        </Button>
      </Box>
      {/* Step Indicator Section */}
      <Typography
        variant="caption"
        sx={{
          paddingX: 2,
          paddingY: 1,
          marginBottom: 0,
          color: "gray",
          textAlign: "center",
          mt: 2,
        }}
      >
        Step {activeStep + 1} of {userRole === 'talent' ? 8 : 11} - Headshot Upload
      </Typography>
      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
