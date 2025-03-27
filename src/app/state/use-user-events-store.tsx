import { create } from 'zustand';

// Define the type for a single user event
interface UserEvent {
  id: number | null;
  title: string;
  description: string;
  location: string;
  start_time: string;
  end_time: string;
  event_status: string;
  event_poster: string;
  event_video: string;
  event_photos: string[];
  organizer: string;
  roles: number[];
  capacity: number;
  attendees: any[];
  meals_provided: boolean;
  transport_provided: boolean;
  accommodation_provided: boolean;
  application_deadline: string | null;
  email_updates: string;
  accepted_locations: string[];
  applicant_requirements: Record<string, any>;
  created_at: string;
  updated_at: string;
  slug: string;
}

// Define the type for the Zustand store
interface UserEventsState {
  userEvents: UserEvent[]; // Array of user events
  setUserEvents: (events: UserEvent[]) => void; // Replace the entire array of events
  addUserEvent: (event: UserEvent) => void; // Add a single event to the array
  updateUserEvent: (id: number, updatedEvent: Partial<UserEvent>) => void; // Update a specific event by ID
  removeUserEvent: (id: number) => void; // Remove a specific event by ID
  clearUserEvents: () => void; // Clear all events
}

// Create the Zustand store
const useUserEventsStore = create<UserEventsState>((set) => ({
  // Initial state
  userEvents: [],

  // Replace the entire array of events
  setUserEvents: (events) =>
    set({
      userEvents: events,
    }),

  // Add a single event to the array
  addUserEvent: (event) =>
    set((state) => ({
      userEvents: [...state.userEvents, event],
    })),

  // Update a specific event by ID
  updateUserEvent: (id, updatedEvent) =>
    set((state) => ({
      userEvents: state.userEvents.map((event) =>
        event.id === id ? { ...event, ...updatedEvent } : event
      ),
    })),

  // Remove a specific event by ID
  removeUserEvent: (id) =>
    set((state) => ({
      userEvents: state.userEvents.filter((event) => event.id !== id),
    })),

  // Clear all events
  clearUserEvents: () =>
    set({
      userEvents: [],
    }),
}));

export default useUserEventsStore;