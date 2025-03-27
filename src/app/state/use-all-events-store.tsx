import { create } from 'zustand';

// Define the type for a single event
interface Event {
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
interface EventsState {
  allEvents: Event[]; 
  setAllEvents: (events: Event[]) => void; 
  addEvent: (event: Event) => void; 
  updateEvent: (id: number, updatedEvent: Partial<Event>) => void; 
  removeEvent: (id: number) => void;
  clearAllEvents: () => void; 
}

// Create the Zustand store
const useAllEventsStore = create<EventsState>((set) => ({
  // Initial state
  allEvents: [],

  // Replace the entire array of events
  setAllEvents: (events) =>
    set({
      allEvents: events,
    }),

  // Add a single event to the array
  addEvent: (event) =>
    set((state) => ({
      allEvents: [...state.allEvents, event],
    })),

  // Update a specific event by ID
  updateEvent: (id, updatedEvent) =>
    set((state) => ({
      allEvents: state.allEvents.map((event) =>
        event.id === id ? { ...event, ...updatedEvent } : event
      ),
    })),

  // Remove a specific event by ID
  removeEvent: (id) =>
    set((state) => ({
      allEvents: state.allEvents.filter((event) => event.id !== id),
    })),

  // Clear all events
  clearAllEvents: () =>
    set({
      allEvents: [],
    }),
}));

export default useAllEventsStore;