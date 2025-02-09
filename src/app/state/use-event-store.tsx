import { create } from 'zustand';

interface EventDetails {
  eventTitle: string;
  description: string;
  location: string;
  startDateTime: string;
  endDateTime: string;
  mealsProvided: boolean;
  transportProvided: boolean;
  accommodationProvided: boolean;
}

interface EventStoreState {
  eventDetails: EventDetails;
  setEventDetails: (updates: Partial<EventDetails>) => void;
  clearEventDetails: () => void;
}

const useEventStore = create<EventStoreState>((set) => ({
  eventDetails: {
    eventTitle: '',
    description: '',
    location: '',
    startDateTime: '',
    endDateTime: '',
    mealsProvided: false,
    transportProvided: false,
    accommodationProvided: false,
  },
  setEventDetails: (updates) =>
    set((state) => ({
      eventDetails: { ...state.eventDetails, ...updates }, 
    })),
  clearEventDetails: () =>
    set({
      eventDetails: {
        eventTitle: '',
        description: '',
        location: '',
        startDateTime: '',
        endDateTime: '',
        mealsProvided: false,
        transportProvided: false,
        accommodationProvided: false,
      },
    }),
}));

export default useEventStore;