export interface EventDetailsProps {
    eventTitle: string;
    setEventTitle: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
    location: string;
    setLocation: (value: string) => void;
    startDateTime: string | null;
    setStartDateTime: (value: string | null) => void;
    endDateTime: string | null;
    setEndDateTime: (value: string | null) => void;
    mealsProvided: boolean;
    setMealsProvided: (value: boolean) => void;
    transportProvided: boolean;
    setTransportProvided: (value: boolean) => void;
    accommodationProvided: boolean;
    setAccommodationProvided: (value: boolean) => void;
    error: string;
    handleSaveSection: () => void;
  }