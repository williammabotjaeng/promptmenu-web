export interface EventData {
    title: string; 
    description: string; 
    location: string; 
    start_time: string; 
    end_time: string; 
    slug?: string; 
    organizer: string; 
    capacity: number; 
    attendees?: string[]; 
    created_at?: string; 
    updated_at?: string; 
}