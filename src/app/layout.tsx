"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/providers/auth-providers';
import { OnboardingProvider } from "@/providers/onboarding-providers";
import { CompanyProvider } from '@/providers/company-provider';
import { TalentProfileProvider } from "@/providers/talent-profile-provider";
import { EventProvider } from "@/providers/event-provider";
import ProtectedRoutes from "./protected-routes";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        <QueryClientProvider client={queryClient}>
          <CompanyProvider>
            <EventProvider>
              <TalentProfileProvider>
                <AuthProvider>
                  <ProtectedRoutes>
                    <OnboardingProvider>
                      {children}
                    </OnboardingProvider>
                  </ProtectedRoutes>
                </AuthProvider>
              </TalentProfileProvider>
            </EventProvider>
          </CompanyProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}