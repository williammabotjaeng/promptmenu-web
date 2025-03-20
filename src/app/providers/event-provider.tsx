"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { restCall } from "@/services/restCall";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { EventData } from "@/types/EventData";
import { useStore } from "zustand";
import useClientOnboardingStore from "@/state/use-client-onboarding-store";
import useLocalRolesStore from "@/state/use-local-roles-store";
import useUserEventStore from "@/state/use-user-events-store";
import useAllEventsStore from "@/state/use-all-events-store";
import { csrfRestCall } from "@/services/csrfRestCall";
import useCurrentEventStore from "@/state/use-current-event-store";

interface EventContextType {
  event: EventData | null;
  signedUrls: Record<string, string> | null;
  fetchEvent: () => Promise<void>;
  getRole: (roleId: string) => Promise<void>;
  getRoles: () => Promise<void>;
  getEventRoles: (eventId) => Promise<void>;
  getUserEvents: () => Promise<void>;
  getAllEvents: () => Promise<void>;
  createEvent: (eventData) => Promise<void>;
  updateEvent: (eventId: string, data: any) => Promise<void>;
}

interface GetRoleInput {
  eventId: string;
  roleId: string;
}

const EventContext = createContext<EventContextType | null>(null);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["access", "username", "event_id", "csrfToken", "current_event"]);

  const [signedUrls, setSignedUrls] = useState<Record<string, string> | null>(
      null
  );
  
  const accessToken = cookies["access"];
  const userName = cookies["username"];
  const csrfToken = cookies["csrfToken"];
  const eventIDGlobal = cookies["event_id"];

   const { setCurrentEvent } = useStore(useCurrentEventStore);
  const { setRoles } = useStore(useLocalRolesStore);
  const { setUserEvents } = useStore(useUserEventStore);
  const { setAllEvents } = useStore(useAllEventsStore);

  const fetchEventMutation = useQuery({
    queryKey: ["fetch_event"],
    queryFn: async () => {
      console.log("Event ID Provider:", eventIDGlobal);
      const response = await restCall(
        `/dashboard/events/${eventIDGlobal}`,
        "GET",
        {},
        accessToken
      );
      console.log("Event Response", response);
      return response;
    },
    enabled: false,
  });

  const createEventMutation = useMutation({
    mutationKey: ["create_event"],
    mutationFn: async (eventData) => {
      console.log("Create Event Data:", eventData);
      return await restCall(
        "/dashboard/events/create/",
        "POST",
        eventData,
        accessToken
      );
    },
    onSuccess: (data) => {
      console.log("Event created successfully", data);
      setCookie("event_id", data?.id);
    },
    onError: (error) => {
      console.error("Error creating event: ", error);
    },
  });

  const updateEventMutation = useMutation({
    mutationKey: ["update_event"],
    mutationFn: async ({
      eventId,
      data,
    }: {
      eventId: string;
      data: EventData;
    }) => {
      console.log("Event Data:", data);
      return await restCall(
        `/dashboard/events/${eventId}/edit/`,
        "PUT",
        data,
        accessToken
      );
    },
    onSuccess: (data) => {
      setCookie("current_event", data);
      setCurrentEvent(data);
      console.log("Event updated successfully", data);
    },
    onError: (error) => {
      console.error("Error updating event: ", error);
    },
  });

  const userEventsMutation = useMutation({
    mutationKey: ["user_events"],
    mutationFn: async () => {
      const response = await restCall(
        "/dashboard/user-events/",
        "GET",
        {},
        accessToken
      );
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

  const allEventsMutation = useMutation({
    mutationKey: ["all_events"],
    mutationFn: async () => {
      const response = await restCall(
        "/dashboard/dashboard/all-events/",
        "GET",
        {},
        accessToken
      );
      console.log("All Events:", response);
      setAllEvents(response);
      return response;
    },
    onSuccess: (data) => {
      setRoles(data);
      console.log("Events fetched successfully", data);
    },
    onError: (error) => {
      console.error("Error fetching All Events: ", error);
    },
  });

  const getRolesMutation = useMutation({
    mutationKey: ["get_roles"],
    mutationFn: async () => {
      const response = await restCall(
        "/dashboard/events/roles/",
        "GET",
        {},
        accessToken
      );
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

  const getEventRolesMutation = useMutation({
    mutationKey: ["get_event_roles"],
    mutationFn: async (eventId: string) => {
      console.log("Event ID:", eventId);
      if (!eventId) {
        throw new Error("Event ID is required to fetch roles.");
      }
      const response = await restCall(
        `/dashboard/events/roles/${eventId}/`, 
        "GET",
        {},
        accessToken
      );
      console.log("Event Roles Response", response);
      return response;
    },
    onSuccess: (data) => {
      setRoles(data);
      console.log("Event roles fetched successfully", data);
    },
    onError: (error) => {
      console.error("Error fetching event roles: ", error);
    },
  });

  const getRoleMutation = useMutation({
    mutationKey: ["get_role"],
    mutationFn: async (roleId: string) => {
      console.log("Role ID:", roleId);
      
      if (!roleId) {
        throw new Error("Both Event ID and Role ID are required to fetch the role.");
      }
  
      const response = await restCall(
        `/dashboard/events/roles/${roleId}/`, 
        "GET",
        {},
        accessToken
      );
  
      console.log("Role Response", response);
      return response;
    },
    onSuccess: (data) => {
      setRoles(data); 
      console.log("Role fetched successfully", data);
    },
    onError: (error) => {
      console.error("Error fetching role: ", error);
    },
  });

  const getUserEvents = async () => {
    return await userEventsMutation?.mutateAsync();
  };

  const getAllEvents = async () => {
    return await allEventsMutation?.mutateAsync();
  };

  const getRole = async (roleId) => {
    return await getRoleMutation?.mutateAsync(roleId);
  };

  const getRoles = async () => {
    return await getRolesMutation?.mutateAsync();
  };

  const getEventRoles = async (eventId: string) => {
    return await getEventRolesMutation?.mutateAsync(eventId);
  };

  const fetchEvent = async () => {
    await fetchEventMutation?.refetch();
  };

  const createEvent = async (eventData) => {
    await createEventMutation?.mutateAsync(eventData);
  };

  const updateEvent = async (eventId: string, data: EventData) => {
    await updateEventMutation?.mutateAsync({ eventId, data });
  };

  useEffect(() => {
    const fetchSignedUrls = async () => {
      if (fetchEventMutation.data) {
        const event = fetchEventMutation.data;

        const eventAssets = {
          eventPoster: event?.event_poster,
          eventVideo: event?.event_video,
          eventPhotos: [...event?.event_photos],
        };

        console.log("Event Assets:", eventAssets);

        try {
          const response = await csrfRestCall(
            `/dashboard/event-assets/get-signed-urls/`,
            "POST",
            {
              filenames: {
                eventPoster: eventAssets?.eventPoster,
                eventVideo: eventAssets?.eventVideo,
                eventPhotos: eventAssets?.eventPhotos,
              },
            },
            accessToken,
            csrfToken
          );
          console.log("Signed URLs:", response);
          setSignedUrls(response.signed_urls);
        } catch (error) {
          console.error("Error fetching signed URLs:", error);
        }
      }
    };

    fetchSignedUrls();
  }, [fetchEventMutation.data]);

  return (
    <EventContext.Provider
      value={{
        event: fetchEventMutation.data,
        signedUrls,
        fetchEvent,
        createEvent,
        updateEvent,
        getRole,
        getRoles,
        getEventRoles,
        getUserEvents,
        getAllEvents
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
};
