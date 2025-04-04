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

// Define interface for menu analysis parameters
interface MenuAnalysisParams {
  file: File;
  userId?: string;
  displayName?: string;
  fullName?: string;
  email?: string;
  restaurant?: string;
  dietary_restrictions?: string;
  health_conditions?: string;
  [key: string]: any; // For any additional metadata
}

// Define interface for receipt analysis parameters
interface ReceiptAnalysisParams {
  file: File;
  userId?: string;
  displayName?: string;
  fullName?: string;
  email?: string;
  restaurant?: string;
  [key: string]: any; // For any additional metadata
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

  // Menu Image Analysis mutation
  const menuAnalysisMutation = useMutation({
    mutationKey: ["menuAnalysis"],
    mutationFn: async (params: MenuAnalysisParams) => {
      console.log("Sending menu analysis request for:", params.file.name);
      
      // Create FormData object for file upload
      const formData = new FormData();
      
      // Append the file
      formData.append('file', params.file);
      
      // Append all other parameters to the form data
      Object.keys(params).forEach(key => {
        if (key !== 'file' && params[key] !== undefined) {
          formData.append(key, params[key]);
        }
      });
      
      // Need to change the content type for file uploads
      const response = await api.post("/ai/analyze-menu/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Authorization header will be added by the interceptor
        },
      });
      
      return response.data;
    },
    onError: (error) => {
      console.error("Menu Analysis API error:", error);
    },
  });

  // Receipt Analysis mutation
  const receiptAnalysisMutation = useMutation({
    mutationKey: ["receiptAnalysis"],
    mutationFn: async (params: ReceiptAnalysisParams) => {
      console.log("Sending receipt analysis request for:", params.file.name);
      
      // Create FormData object for file upload
      const formData = new FormData();
      
      // Append the file
      formData.append('file', params.file);
      
      // Append all other parameters to the form data
      Object.keys(params).forEach(key => {
        if (key !== 'file' && params[key] !== undefined) {
          formData.append(key, params[key]);
        }
      });
      
      // Need to change the content type for file uploads
      const response = await api.post("/ai/analyze-receipt/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Authorization header will be added by the interceptor
        },
      });
      
      return response.data;
    },
    onError: (error) => {
      console.error("Receipt Analysis API error:", error);
    },
  });

  // Expose AI methods and state
  const aiServices = {
    // Assistant method
    askQuestion: (data) => assistantMutation.mutateAsync(data),
    
    // Menu Analysis method
    analyzeMenuImage: (data) => menuAnalysisMutation.mutateAsync(data),

    // Receipt Analysis method
    analyzeReceipt: (data) => receiptAnalysisMutation.mutateAsync(data),
    
    // Loading states
    isAssistantLoading: assistantMutation.isPending,
    isMenuAnalysisLoading: menuAnalysisMutation.isPending,
    isReceiptAnalysisLoading: receiptAnalysisMutation.isPending,
    
    // Response data
    assistantResponse: assistantMutation.data,
    menuAnalysisResponse: menuAnalysisMutation.data,
    receiptAnalysisResponse: receiptAnalysisMutation.data,
    
    // Error states
    assistantError: assistantMutation.error,
    menuAnalysisError: menuAnalysisMutation.error,
    receiptAnalysisError: receiptAnalysisMutation.error,
    
    // Reset functions
    resetAssistantResponse: () => assistantMutation.reset(),
    resetMenuAnalysisResponse: () => menuAnalysisMutation.reset(),
    resetReceiptAnalysisResponse: () => receiptAnalysisMutation.reset(),
    
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