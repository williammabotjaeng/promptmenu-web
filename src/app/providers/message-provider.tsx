"use client";

import React, { createContext, useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { restCall } from "@/services/restCall";
import { useCookies } from "react-cookie";
import { access } from "fs";

interface MessageData {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  sent: boolean;
}

interface MessageContextType {
  messages: MessageData[] | null;
  fetchMessages: () => Promise<void>;
  sendMessage: (data: Omit<MessageData, "id" | "timestamp" | "isRead">) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;
  markAsRead: (messageId: string) => Promise<void>;
}

const MessageContext = createContext<MessageContextType | null>(null);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [cookies, setCookie] = useCookies([
    'access'
  ]);

  const accessToken = cookies?.access;

  const fetchMessagesQuery = useQuery({
    queryKey: ["fetch_messages"],
    queryFn: async () => {
      const response = await restCall("/accounts/messages/", "GET", {}, accessToken);
      console.log("Messages:", response);
      return response;
    },
    enabled: false, 
  });

  const sendMessageMutation = useMutation({
    mutationKey: ["send_message"],
    mutationFn: async (data: Omit<MessageData, "id" | "timestamp" | "isRead" | "sent">) => {
      return await restCall("/accounts/messages/send/", "POST", data, accessToken);
    },
    onSuccess: () => {
      fetchMessagesQuery.refetch(); 
    },
  });

  const deleteMessageMutation = useMutation({
    mutationKey: ["delete_message"],
    mutationFn: async (messageId: string) => {
      return await restCall(`/accounts/messages/delete/${messageId}/`, "DELETE", {}, accessToken);
    },
    onSuccess: () => {
      fetchMessagesQuery.refetch(); 
    },
  });

  const markAsReadMutation = useMutation({
    mutationKey: ["mark_as_read"],
    mutationFn: async (messageId: string) => {
      return await restCall(`/accounts/messages/mark-as-read/${messageId}/`, "PATCH", {}, accessToken);
    },
    onSuccess: () => {
      fetchMessagesQuery.refetch(); 
    },
  });

  const fetchMessages = async () => {
    await fetchMessagesQuery.refetch();
  };

  const sendMessage = async (data: Omit<MessageData, "id" | "timestamp" | "isRead" | "sent">) => {
    await sendMessageMutation.mutateAsync(data);
  };

  const deleteMessage = async (messageId: string) => {
    await deleteMessageMutation.mutateAsync(messageId);
  };

  const markAsRead = async (messageId: string) => {
    await markAsReadMutation.mutateAsync(messageId);
  };

  return (
    <MessageContext.Provider
      value={{
        messages: fetchMessagesQuery.data || null,
        fetchMessages,
        sendMessage,
        deleteMessage,
        markAsRead,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};