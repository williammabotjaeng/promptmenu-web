"use client";

import { createContext, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useCookies } from "react-cookie";

// Create AI context
const AIContext = createContext(null);

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
  },
});

// Define interface for the assistant request payload
interface AssistantRequestPayload {
  question: string;
  includeUnstructuredSources: boolean;
  confidenceScoreThreshold: number;
  filters?: {
    metadataFilter?: {
      logicalOperation: string;
      metadata: Array<{ key: string; value: string }>;
    };
  };
}

export function AIProvider({ children }) {
  const [cookies] = useCookies(["access_token"]);

  // Setup axios interceptor for auth headers
  api.interceptors.request.use(
    (config) => {
      const accessToken = cookies.access_token;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Assistant mutation - matches backend expectations
  const assistantMutation = useMutation({
    mutationKey: ["assistant"],
    mutationFn: async ({ question, filters = null }: { question: string; filters?: any }) => {
      console.log("Sending assistant request:", question);
      
      const payload: AssistantRequestPayload = {
        question,
        includeUnstructuredSources: true,
        confidenceScoreThreshold: 0.3
      };
      
      // Add filters if provided
      if (filters) {
        payload.filters = filters;
      }
      
      const response = await api.post("/ai/assistant/", payload);
      return response.data;
    },
    onError: (error) => {
      console.error("Assistant API error:", error);
    },
  });

  // Expose AI methods and state
  const aiServices = {
    // Assistant method
    askQuestion: (data) => assistantMutation.mutateAsync(data),
    
    // Loading states
    isAssistantLoading: assistantMutation.isPending,
    
    // Response data
    assistantResponse: assistantMutation.data,
    
    // Error states
    assistantError: assistantMutation.error,
    
    // Reset function
    resetAssistantResponse: () => assistantMutation.reset(),
    
    // Api instance for authenticated requests
    api,
  };

  return <AIContext.Provider value={aiServices}>{children}</AIContext.Provider>;
}

// Custom hook to use AI context
export function useAI() {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error("useAI must be used within an AIProvider");
  }
  return context;
}

export default AIContext;