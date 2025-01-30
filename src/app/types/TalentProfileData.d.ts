export interface TalentProfileData {
    website: string;
    social_media_links: any;
    user: string | null; 
    firstname?: string | null;
    lastname?: string | null;
    headshot?: string | null; 
    date_of_birth?: string | null; 
    gender?: string | null; 
    phone_number?: string | null; 
    whatsapp_number?: string | null;
    nationality?: string | null; 
    skills?: string[]; 
    height?: number | null; 
    weight?: number | null; 
    eyeColor?: string | null;
    hairColor?: string | null;
    government_id_front?: string | null;
    government_id_back?: string | null;  
    banking_details?: string | null; 
    portfolio_pdf?: File | null; 
    additional_images?: Record<string, any> | null; 
    is_verified?: boolean; 
    verification_notification_sent?: boolean; 
    created_at?: string; 
    updated_at?: string; 
}