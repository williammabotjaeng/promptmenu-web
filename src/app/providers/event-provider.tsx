"use client";

import React, { createContext, useContext } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { restCall } from '@/services/restCall';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { EventData } from '@/types/EventData';
import { useStore } from 'zustand';
import useClientOnboardingStore from '@/state/use-client-onboarding-store';
import useLocalRolesStore from '@/state/use-local-roles-store';
import useUserEventStore from '@/state/use-user-events-store';

interface EventContextType {
  event: EventData | null;
  fetchEvent: () => Promise<void>;
  getRoles: () => Promise<void>;
  getUserEvents: () => Promise<void>;
  createEvent: (eventData) => Promise<void>;
  updateEvent: (eventId: string, data: any) => Promise<void>;
}

const EventContext = createContext<EventContextType | null>(null);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['access', 'username', 'event_id']);
  const accessToken = cookies['access'];
  const userName = cookies['username'];
  const { setRoles } = useStore(useLocalRolesStore);
  const { setUserEvents } = useStore(useUserEventStore);

  const fetchEventMutation = useQuery({
    queryKey: ['fetch_event'],
    queryFn: async () => {
      const response = await restCall(`/dashboard/event/retrieve/?username=${userName}`, 'GET', {}, accessToken);
      console.log("Event Response", response);
      return response;
    },
    enabled: false, 
  });

  const createEventMutation = useMutation({
    mutationKey: ['create_event'],
    mutationFn: async (eventData) => {
      console.log("Create Event Data:", eventData);
      return await restCall('/dashboard/events/create/', 'POST', eventData, accessToken);
    },
    onSuccess: (data) => {
      console.log('Event created successfully', data);
      setCookie('event_id', data?.id);
    },
    onError: (error) => {
      console.error('Error creating event: ', error);
    },
  });

  const updateEventMutation = useMutation({
    mutationKey: ['update_event'],
    mutationFn: async ({ eventId, data }: { eventId: string; data: EventData }) => {
      console.log("Event Data:", data);
      return await restCall(`/dashboard/events/${eventId}/edit/`, 'PUT', data, accessToken);
    },
    onSuccess: (data) => {
      console.log('Event updated successfully', data);
    },
    onError: (error) => {
      console.error('Error updating event: ', error);
    },
  });

  const userEventsMutation = useMutation({
    mutationKey: ["user_events"],
    mutationFn: async () => {
      const response = await restCall("/dashboard/user-events/", "GET", {}, accessToken);
      console.log("User Events:", response);
      setUserEvents(response);
      return response;
    },
    onSuccess: (data) => {
      setRoles(data);
      console.log("Events fetched successfully", data);
    },
    onError: (error) => {
      console.error("Error fetching User Events: ", error);
    },
  });

  const getRolesMutation = useMutation({
    mutationKey: ["get_roles"],
    mutationFn: async () => {
      const response = await restCall("/dashboard/events/roles/", "GET", {}, accessToken);
      console.log("Roles Response", response);
      return response;
    },
    onSuccess: (data) => {
      setRoles(data);
      console.log("Roles fetched successfully", data);
    },
    onError: (error) => {
      console.error("Error fetching roles: ", error);
    },
  });

  const getUserEvents = async () => {
    return await userEventsMutation.mutateAsync();
  };

  const getRoles = async () => {
    return await getRolesMutation.mutateAsync();
  };

  const fetchEvent = async () => {
    await fetchEventMutation.refetch();
  };

  const createEvent = async (eventData) => {
    await createEventMutation.mutateAsync(eventData);
  };

  const updateEvent = async (eventId: string, data: EventData) => {
    await updateEventMutation.mutateAsync({ eventId, data });
  };

  return (
    <EventContext.Provider value={{ event: fetchEventMutation.data, fetchEvent, createEvent, updateEvent, getRoles, getUserEvents }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};