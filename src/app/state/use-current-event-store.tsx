import { create } from "zustand";

export interface CurrentEvent {
  endDateTime: string;
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
  roles: number[];
  eventPoster: string;
  eventVideo: string;
  createdAt: string;
  updatedAt: string;
}

export interface CurrentEventState {
  currentEvent: CurrentEvent | null;
  setCurrentEvent: (event: Partial<CurrentEvent>) => void;
  clearCurrentEvent: () => void;
}

const useCurrentEventStore = create<CurrentEventState>((set) => ({
  currentEvent: null,
  setCurrentEvent: (event: Partial<CurrentEvent>) =>
    set((state) => ({
      currentEvent: { ...state.currentEvent, ...event },
    })),
  clearCurrentEvent: () => set({ currentEvent: null }),
}));

export default useCurrentEventStore;
