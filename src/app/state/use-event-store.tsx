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
  setEventTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setLocation: (location: string) => void;
  setStartDateTime: (dateTime: string) => void;
  setEndDateTime: (dateTime: string) => void;
  setMealsProvided: (provided: boolean) => void;
  setTransportProvided: (provided: boolean) => void;
  setAccommodationProvided: (provided: boolean) => void;
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
  setEventTitle: (title) => set((state) => ({ eventDetails: { ...state.eventDetails, eventTitle: title } })),
  setDescription: (description) => set((state) => ({ eventDetails: { ...state.eventDetails, description } })),
  setLocation: (location) => set((state) => ({ eventDetails: { ...state.eventDetails, location } })),
  setStartDateTime: (dateTime) => set((state) => ({ eventDetails: { ...state.eventDetails, startDateTime: dateTime } })),
  setEndDateTime: (dateTime) => set((state) => ({ eventDetails: { ...state.eventDetails, endDateTime: dateTime } })),
  setMealsProvided: (provided) => set((state) => ({ eventDetails: { ...state.eventDetails, mealsProvided: provided } })),
  setTransportProvided: (provided) => set((state) => ({ eventDetails: { ...state.eventDetails, transportProvided: provided } })),
  setAccommodationProvided: (provided) => set((state) => ({ eventDetails: { ...state.eventDetails, accommodationProvided: provided } })),
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