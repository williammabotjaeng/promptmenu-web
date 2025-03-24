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
  roleSignedUrls: Record<string, string> | null;
  fetchEvent: () => Promise<void>;
  deleteEvent: () => Promise<void>;
  getRole: (roleId: string) => Promise<void>;
  getRoles: () => Promise<void>;
  getUserRoles: () => Promise<void>;
  getEventRoles: (eventId: string) => Promise<void>;
  getUserEvents: () => Promise<void>;
  getAllEvents: () => Promise<void>;
  createEvent: (eventData: any) => Promise<void>;
  updateEvent: (eventId: string, data: any) => Promise<void>;
  clearSignedUrls: () => void;
  fetchRoleSignedUrls: (roles: any[]) => Promise<Record<string, string>>;
  submitApplication: (applicationData: ApplicationData) => Promise<void>;
}

interface GetRoleInput {
  eventId: string;
  roleId: string;
}

interface ApplicationData {
  role_id: string | number;
  event_id?: string | number;
  user_id?: string | number;
}

const EventContext = createContext<EventContextType | null>(null);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["access", "username", "event_id", "csrfToken", "current_event"]);

  const [signedUrls, setSignedUrls] = useState<Record<string, string> | null>(null);
  const [roleSignedUrls, setRoleSignedUrls] = useState<Record<string, string> | null>(null);
  
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
    onSuccess: async (data) => {
      setRoles(data);
      console.log("Roles fetched successfully", data);
      
      // Fetch signed URLs for role posters
      if (Array.isArray(data) && data.length > 0) {
        try {
          const urls = await fetchRoleSignedUrls(data);
          setRoleSignedUrls(urls);
        } catch (error) {
          console.error("Error fetching role signed URLs:", error);
        }
      }
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
    onSuccess: async (data) => {
      setRoles(data);
      console.log("Event roles fetched successfully", data);
      
      // Fetch signed URLs for event role posters
      if (Array.isArray(data) && data.length > 0) {
        try {
          const urls = await fetchRoleSignedUrls(data);
          setRoleSignedUrls(urls);
        } catch (error) {
          console.error("Error fetching event role signed URLs:", error);
        }
      }
    },
    onError: (error) => {
      console.error("Error fetching event roles: ", error);
    },
  });

  const getUserRolesMutation = useMutation({
    mutationKey: ["get_user_roles"],
    mutationFn: async () => {
      const response = await restCall(
        "/dashboard/events/user-roles/",
        "GET",
        {},
        accessToken
      );
      console.log("User Roles Response", response);
      return response;
    },
    onSuccess: async (data) => {
      setRoles(data);
      console.log("User roles fetched successfully", data);
      
      // Fetch signed URLs for role posters
      if (Array.isArray(data) && data.length > 0) {
        try {
          const urls = await fetchRoleSignedUrls(data);
          setRoleSignedUrls(urls);
        } catch (error) {
          console.error("Error fetching user role signed URLs:", error);
        }
      }
    },
    onError: (error) => {
      console.error("Error fetching user roles: ", error);
    },
  });

const submitApplicationMutation = useMutation({
  mutationKey: ["submit_application"],
  mutationFn: async (applicationData: ApplicationData) => {
    console.log("Application Data:", applicationData);
    return await restCall(
      "/dashboard/events/applications/submit/",
      "POST",
      applicationData,
      accessToken
    );
  },
  onSuccess: (data) => {
    console.log("Application submitted successfully", data);
  },
  onError: (error) => {
    console.error("Error submitting application: ", error);
  },
});

  const getRoleMutation = useMutation({
    mutationKey: ["get_role"],
    mutationFn: async (roleId: string) => {
      console.log("Role ID:", roleId);
      
      if (!roleId) {
        throw new Error("Role ID is required to fetch the role.");
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
    onSuccess: async (data) => {
      setRoles(data); 
      console.log("Role fetched successfully", data);
      
      // If we receive a single role object
      if (data && data.id && data.eventPoster) {
        try {
          const urls = await fetchRoleSignedUrls([data]);
          setRoleSignedUrls(urls);
        } catch (error) {
          console.error("Error fetching role signed URL:", error);
        }
      }
    },
    onError: (error) => {
      console.error("Error fetching role: ", error);
    },
  });

  const deleteEventMutation = useQuery({
    queryKey: ["delete_event"],
    queryFn: async () => {
      console.log("Event ID Provider:", eventIDGlobal);
      const response = await restCall(
        `/dashboard/events/${eventIDGlobal}/delete/`,
        "DELETE",
        {},
        accessToken
      );
      console.log("Event Response", response);
      return response;
    },
    enabled: false,
  });

  // New function to fetch signed URLs for role posters
const fetchRoleSignedUrls = async (roles: any[]): Promise<Record<string, string>> => {
  if (!roles || roles.length === 0) {
    return {};
  }
  
  console.log("Fetching signed URLs for roles:", roles);
  
  // Extract eventPoster paths from roles with proper typing
  const posterPaths: Record<string, string> = roles.reduce((acc: Record<string, string>, role) => {
    if (role && role.id && role.event_poster && typeof role.event_poster === 'string') {
      acc[role.id] = role.event_poster;
    }
    return acc;
  }, {});

  // Skip if no posters to fetch
  if (Object.keys(posterPaths).length === 0) {
    console.log("No role posters to fetch");
    return {};
  }

  try {
    // Prepare the payload for the API
    const filenames = Object.values(posterPaths).filter((path): path is string => Boolean(path));
    
    console.log("Requesting signed URLs for file paths:", filenames);
    
    const response = await csrfRestCall(
      `/dashboard/event-assets/get-signed-urls/`,
      "POST",
      {
        filenames: {
          rolePosterPaths: filenames,
        },
      },
      accessToken,
      csrfToken
    );
    
    console.log("Role Poster Signed URLs response:", response);
    
    // Get the signed URLs - they come as an array in rolePosterPaths, not as individual properties
    const signedUrlsResponse = response?.signed_urls || {};
    console.log("Signed URLs Response:", signedUrlsResponse);
    
    // Check if we have the expected array structure
    if (!signedUrlsResponse.rolePosterPaths || !Array.isArray(signedUrlsResponse.rolePosterPaths)) {
      console.error("Unexpected signed URLs response format", signedUrlsResponse);
      return {};
    }
    
    // Map the role IDs to their respective signed URLs using array index
    const roleUrlMap: Record<string, string> = {};
    console.log("Role URL Map initialized:", roleUrlMap);
    
    // Convert posterPaths to array for indexing
    const roleIds = Object.keys(posterPaths);
    
    // Map each role ID to the corresponding URL by index
    roleIds.forEach((roleId, index) => {
      if (index < signedUrlsResponse.rolePosterPaths.length) {
        roleUrlMap[roleId] = signedUrlsResponse.rolePosterPaths[index];
      }
    });
    
    console.log("Mapped role IDs to signed URLs:", roleUrlMap);
    return roleUrlMap;
  } catch (error) {
    console.error("Error fetching role signed URLs:", error);
    return {};
  }
};

  const getUserEvents = async () => {
    return await userEventsMutation?.mutateAsync();
  };

  const getAllEvents = async () => {
    return await allEventsMutation?.mutateAsync();
  };

  const submitApplication = async (applicationData: ApplicationData) => {
    return await submitApplicationMutation?.mutateAsync(applicationData);
  };

  const getRole = async (roleId: string) => {
    return await getRoleMutation?.mutateAsync(roleId);
  };

  const getUserRoles = async () => {
    return await getUserRolesMutation?.mutateAsync();
  };

  const getRoles = async () => {
    return await getRolesMutation?.mutateAsync();
  };

  const getEventRoles = async (eventId: string) => {
    return await getEventRolesMutation?.mutateAsync(eventId);
  };

  const deleteEvent = async () => {
    await deleteEventMutation?.refetch();
  };

  const fetchEvent = async () => {
    await fetchEventMutation?.refetch();
  };

  const createEvent = async (eventData: any) => {
    await createEventMutation?.mutateAsync(eventData);
  };

  const updateEvent = async (eventId: string, data: EventData) => {
    await updateEventMutation?.mutateAsync({ eventId, data });
  };

  useEffect(() => {
    const fetchSignedUrls = async () => {
      if (fetchEventMutation.data) {
        try {
          const event = fetchEventMutation.data;

          const eventAssets = {
            eventPoster: event?.event_poster,
            eventVideo: event?.event_video,
            eventPhotos: [...(event?.event_photos || [])],
          };

          console.log("Event Assets:", eventAssets);

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
          setSignedUrls(response?.signed_urls);
        } catch (error) {
          console.error("Error fetching signed URLs:", error);
        }
      }
    };

    fetchSignedUrls();
  }, [fetchEventMutation.data]);

  const clearSignedUrls = () => {
    setSignedUrls(null);
    setRoleSignedUrls(null);
  };

  return (
    <EventContext.Provider
      value={{
        event: fetchEventMutation.data,
        signedUrls,
        roleSignedUrls,
        fetchEvent,
        createEvent,
        updateEvent,
        deleteEvent,
        getRole,
        getRoles,
        getUserRoles,
        getEventRoles,
        getUserEvents,
        getAllEvents,
        clearSignedUrls,
        fetchRoleSignedUrls,
        submitApplication
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