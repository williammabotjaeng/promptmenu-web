"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/providers/auth-providers";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { OnboardingProvider } from "@/providers/onboarding-providers";
import { CompanyProvider } from "@/providers/company-provider";
import { TalentProfileProvider } from "@/providers/talent-profile-provider";
import { EventProvider } from "@/providers/event-provider";
import ProtectedRoutes from "./protected-routes";
import "@/styles/globals.css";
import { CookiesProvider } from "react-cookie";
import { MessageProvider } from "./providers/message-provider";
import { TikTokProvider } from "./providers/tiktok-provider";
import { SnapchatProvider } from "./providers/snapchat-provider";

const theme = createTheme({
  palette: {
    primary: {
      main: "#CEAB76",
    },
    secondary: {
      main: "#977342",
    },
    text: {
      primary: "#4B5563",
    },
  },
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
                          <AuthProvider>
                            
                              <ProtectedRoutes>{children}</ProtectedRoutes>
                        
                          </AuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
