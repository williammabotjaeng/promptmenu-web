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

interface EventMedia {
  eventPromoVideo: File | null;
  eventPhotos: File[];
  eventPoster: File | null;
}

interface EventStoreState {
  eventDetails: EventDetails;
  eventMedia: EventMedia;
  setEventDetails: (updates: Partial<EventDetails>) => void;
  setEventMedia: (title: keyof EventMedia, value: File | File[]) => void;
  clearEventDetails: () => void;
  clearEventMedia: () => void;
}

const useEventStore = create<EventStoreState>((set) => ({
  // Initial state for event details
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
  // Initial state for event media
  eventMedia: {
    eventPromoVideo: null,
    eventPhotos: [],
    eventPoster: null,
  },
  // Setter for event details
  setEventDetails: (updates) =>
    set((state) => ({
      eventDetails: { ...state.eventDetails, ...updates },
    })),
  // Setter for event media
  setEventMedia: (title, value) =>
    set((state) => ({
      eventMedia: {
        ...state.eventMedia,
        [title]: Array.isArray(value) ? [...value] : value,
      },
    })),
  // Clear event details
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
  // Clear event media
  clearEventMedia: () =>
    set({
      eventMedia: {
        eventPromoVideo: null,
        eventPhotos: [],
        eventPoster: null,
      },
    }),
}));

export default useEventStore;