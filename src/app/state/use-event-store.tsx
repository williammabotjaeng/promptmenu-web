import { Question } from '@/components/dashboard/event/FormSection';
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
  roles: EventRole[];
}

export interface EventMediaType {
  eventPromoVideo: File | string | null;
  eventPhotos: File[] | string[] | null;
  eventPoster: File | string | null;
}

export interface EventRole {
  id: string;
  skill: string;
  openings: number;
  title: string;
  description: string;
  location: string;
  genders: string[];
  minAge: number | string;
  maxAge: number | string;
  ethnicities: string[];
  hourlyPay: number;
  dailyPay: number;
  projectPay: number;
  paymentTerms: string;
  questions: Question[];
  hardDeadline: string;
  softDeadline: string;
  eventPoster: string;
  notes: string;
  company_id: string | number;
  event: string | number;
  created_at: string;
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
    roles: []
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
    genders: [],
    minAge: 0,
    maxAge: 0,
    ethnicities: [],
    hourlyPay: 0,
    dailyPay: 0,
    projectPay: 0,
    paymentTerms: '',
    questions: [],
    hardDeadline: '',
    softDeadline: '',
    notes: '',
    created_at: '',
    location: '',
    company_id: '',
    event: '',
    id: '',
    eventPoster: ''
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
        roles: []
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
        genders: [],
        minAge: 0,
        maxAge: 0,
        ethnicities: [],
        hourlyPay: 0,
        dailyPay: 0,
        projectPay: 0,
        paymentTerms: '',
        questions: [],
        hardDeadline: '',
        softDeadline: '',
        notes: '',
        created_at: '',
        location: '',
        company_id: '',
        event: '',
        id: '',
        eventPoster: ''
      },
    }),
}));

export default useEventStore;