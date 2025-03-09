"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/providers/auth-providers';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { OnboardingProvider } from "@/providers/onboarding-providers";
import { CompanyProvider } from '@/providers/company-provider';
import { TalentProfileProvider } from "@/providers/talent-profile-provider";
import { EventProvider } from "@/providers/event-provider";
import ProtectedRoutes from "./protected-routes";
import "@/styles/globals.css";
import { MessageProvider } from "./providers/message-provider";
import { TikTokProvider } from "./providers/tiktok-provider";
import { SnapchatProvider } from "./providers/snapchat-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#CEAB76',
    },
    secondary: {
      main: '#977342',
    },
    text: {
      primary: '#4B5563',
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <SnapchatProvider>
            <TikTokProvider>
            <MessageProvider>
              <CompanyProvider>
                <EventProvider>
                  <TalentProfileProvider>
                    <AuthProvider>
                      <OnboardingProvider>
                        <ProtectedRoutes>
                          {children}
                        </ProtectedRoutes>
                      </OnboardingProvider>
                    </AuthProvider>
                  </TalentProfileProvider>
                </EventProvider>
              </CompanyProvider>
            </MessageProvider>
            </TikTokProvider>
            </SnapchatProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}