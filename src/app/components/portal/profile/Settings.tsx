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
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { PaymentMethod } from "@/components/portal/onboarding/PaymentMethod";
import OnboardingHeader from "@/components/portal/onboarding/OnboardingHeader";
import { useRouter } from "next/navigation";
import { OnboardingStepProps } from "@/types/Props/OnboardingStepProps";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { useCookies } from "react-cookie";
import useTalentOnboardingStore from "@/state/use-talent-onboarding-store";
import { SettingsScreen } from "../onboarding/SettingsScreen";
import { useSettings } from "@/providers/settings-provider";
import { useAuth } from "@/providers/auth-providers";
import WhiteLoading from "@/components/WhiteLoading";

const settingsScreenTab = [
  { label: "Communication", value: "communications" },
];

export const Settings: React.FC = () => {
  const [activeSettingsScreen, setActiveSettingsScreen] =
    useState<string>("communication");
  const [communicationSettings, setCommunicationSettings] = useState({
    send_email_notifications: false,
    send_ssh_updates: false,
    allow_browser_notifications: false,
  });
  const [userEmail, setUserEmail] = useState("");
  const [sendEmailNotifications, setSendEmailNotifications] = useState(false);
  const [sendSSHUpdates, setSendSSHUpdates] = useState(false);
  const [allowBrowserNotifications, setAllowBrowserNotifications] =
    useState(false);

  const { paymentMethods, setPaymentMethods, talentData } = useStore(
    useTalentOnboardingStore
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [cookies, setCookie] = useCookies(["user_role", "username", "has_settings"]);

  const userRole = cookies?.user_role || "";
  const userName = cookies?.username || "";
  const hasSettings = cookies?.has_settings;

  const [loading, setLoading] = useState(false);

  const { settings, createSettings, updateSettings, fetchSettings } =
    useSettings();

  const { updateUser } = useAuth();

  const router = useRouter();

  const onClose = () => {
    router.push("/portal");
  };

  const handleSaveSettings = () => {
    updateSettings({
      user: userName,
      send_email_notifications: communicationSettings?.send_email_notifications,
      send_ssh_updates: communicationSettings?.send_ssh_updates,
      allow_browser_notifications: communicationSettings?.allow_browser_notifications
    });
    fetchSettings();
    setSnackbarMessage("Headshot Uploaded Successfully");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleInputChange = (event: any) => {
    console.log("Event:", event);
    setUserEmail(event?.target?.value);
  };

  useEffect(() => {
    fetchSettings();
    console.log("Settings:", settings);
    setCommunicationSettings({
      send_email_notifications: settings?.send_email_notifications,
      send_ssh_updates: settings?.send_ssh_updates,
      allow_browser_notifications: settings?.allow_browser_notifications
    });
    if (!hasSettings) {
      createSettings({
        user: userName,
        send_email_notifications: false,
        send_ssh_updates: false,
        allow_browser_notifications: false,
      });

      updateUser({
        field: "has_settings",
        value: true,
      });

      setCookie("has_settings", true);

      fetchSettings();
    }
    console.log("Settings:", settings);
  }, [settings]);

  const renderSettingsForm = () => {
    switch (activeSettingsScreen) {
      case "communications":
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="body1" sx={{ mb: 2, color: "#977342" }}>
              Communication Preferences:
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "#977342",
                  }}
                  checked={communicationSettings?.send_email_notifications}
                  onChange={handleCheckboxChange("send_email_notifications")}
                />
              }
              label="Send Email Notifications"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "#977342",
                  }}
                  checked={communicationSettings?.send_ssh_updates}
                  onChange={handleCheckboxChange("send_ssh_updates")}
                />
              }
              label="Send SSH Regular Updates"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "#977342",
                  }}
                  checked={communicationSettings?.allow_browser_notifications}
                  onChange={handleCheckboxChange("allow_browser_notifications")}
                  onClick={handleBrowserNotificationClick}
                />
              }
              label="Allow Browser Notifications"
            />
          </Box>
        );
      default:
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="body1" sx={{ mb: 2, color: "#977342" }}>
              Please select your preferred settings.
            </Typography>
          </Box>
        );
    }
  };

  // Helper functions for handling checkbox changes and browser notification requests
  const handleCheckboxChange = (field) => (event) => {
    console.log("Field:", field, "Event:", event.target.checked);
    setCommunicationSettings((prev) => ({
      ...prev,
      [field]: event.target.checked,
    }));
  };

  const handleBrowserNotificationClick = async (event) => {
    if (event.target.checked) {
      // Request permission for browser notifications
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        // Handle the case where permission is denied
        event.target.checked = false; // Uncheck the checkbox if permission is denied
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) return <WhiteLoading />;

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
      {/* Settings Section */}
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
          How would you like SSH to interact with you?
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
          {/* Settings Method Tabs */}
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
            {settingsScreenTab.map((method) => (
              <SettingsScreen
                key={method.value}
                label={method.label}
                isActive={activeSettingsScreen === method.value}
                onClick={() => {
                  console.log("Emitted method:", method?.value);
                  setActiveSettingsScreen(method.value);
                }}
              />
            ))}
          </Box>

          {/* Render Settings Form */}
          {renderSettingsForm()}
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
          onClick={handleSaveSettings}
        >
          Save Settings
        </Button>
      </Box>
      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity === "success" ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
