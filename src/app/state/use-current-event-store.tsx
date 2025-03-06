import { create } from 'zustand';

export interface CurrentEventState {
    id: number;
    title: string;
    description: string;
    location: string;
    startTime: string;
    endTime: string;
    capacity: number;
    acceptedLocations: string[];
    accommodationProvided: boolean;
    mealsProvided: boolean;
    transportProvided: boolean;
    eventStatus: string;
    eventPhotos: string[];
    eventPoster: string;
    eventVideo: string;
    createdAt: string;
    updatedAt: string;
    setCurrentEvent: (event: Partial<CurrentEventState>) => void;
    clearCurrentEvent: () => void;
}

const useCurrentEventStore = create<CurrentEventState>((set) => ({
    id: 0,
    title: '',
    description: '',
    location: '',
    startTime: '',
    endTime: '',
    capacity: 0,
    acceptedLocations: [],
    accommodationProvided: false,
    mealsProvided: false,
    transportProvided: false,
    eventStatus: 'draft',
    eventPhotos: [],
    eventPoster: '',
    eventVideo: '',
    createdAt: '',
    updatedAt: '',
    
    setCurrentEvent: (event: Partial<CurrentEventState>) => set((state) => ({ ...state, ...event })),
    clearCurrentEvent: () => set({
        id: 0,
        title: '',
        description: '',
        location: '',
        startTime: '',
        endTime: '',
        capacity: 0,
        acceptedLocations: [],
        accommodationProvided: false,
        mealsProvided: false,
        transportProvided: false,
        eventStatus: 'draft',
        eventPhotos: [],
        eventPoster: '',
        eventVideo: '',
        createdAt: '',
        updatedAt: '',
    }),
}));

export default useCurrentEventStore;