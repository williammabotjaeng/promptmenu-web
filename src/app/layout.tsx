"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/providers/auth-providers";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProtectedRoutes from "./protected-routes";
import "@/styles/globals.css";
import { CookiesProvider } from "react-cookie";
import { AIProvider } from "@/providers/ai-provider";

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
                            <AIProvider>
                              <ProtectedRoutes>{children}</ProtectedRoutes>
                            </AIProvider>
                          </AuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
