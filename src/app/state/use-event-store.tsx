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

export interface EventMediaType {
  eventPromoVideo: File | string | null;
  eventPhotos: File[] | string[] | null;
  eventPoster: File | string | null;
}

interface EventRole {
  skill: string;
  openings: number;
  title: string;
  description: string;
  gender: string;
  minAge: number;
  maxAge: number;
  ethnicity: string;
}

interface EventStoreState {
  eventDetails: EventDetails;
  eventMedia: EventMediaType;
  eventRole: EventRole;
  setEventDetails: (updates: Partial<EventDetails>) => void;
  setEventMedia: (title: keyof EventMediaType, value: File | File[]) => void;
  setEventRole: (updates: Partial<EventRole>) => void;
  clearEventDetails: () => void;
  clearEventMedia: () => void;
  clearEventRole: () => void;
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

  eventMedia: {
    eventPromoVideo: null,
    eventPhotos: [],
    eventPoster: null,
  },

  eventRole: {
      skill: '',
      openings: 0,
      title: '',
      description: '',
      gender: '',
      minAge: 0,
      maxAge: 0,
      ethnicity: ''
  },

  setEventDetails: (updates) =>
    set((state) => ({
      eventDetails: { ...state.eventDetails, ...updates },
    })),

  setEventMedia: (title, value) =>
    set((state) => ({
      eventMedia: {
        ...state.eventMedia,
        [title]: Array.isArray(value) ? [...value] : value,
      },
    })),

  setEventRole: (updates) =>
    set((state) => ({
      eventRole: { ...state.eventRole, ...updates },
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

  clearEventMedia: () =>
    set({
      eventMedia: {
        eventPromoVideo: null,
        eventPhotos: [],
        eventPoster: null,
      },
    }),

  clearEventRole: () =>
    set({
      eventRole: {
          skill: '',
          openings: 0,
          title: '',
          description: '',
          gender: '',
          minAge: 0,
          maxAge: 0,
          ethnicity: ''
      },
    }),
}));

export default useEventStore;