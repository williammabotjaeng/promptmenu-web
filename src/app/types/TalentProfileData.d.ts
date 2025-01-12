export interface TalentProfileData {
    user: string | null; 
    headshot?: string | null; 
    date_of_birth?: string | null; 
    gender?: string | null; 
    phone_number?: string | null; 
    nationality?: string | null; 
    skills?: string[]; 
    height?: number | null; 
    weight?: number | null; 
    ethnicity?: string | null; 
    government_id?: File | null; 
    banking_details?: string | null; 
    portfolio_pdf?: File | null; 
    additional_images?: Record<string, any> | null; 
    is_verified?: boolean; 
    verification_notification_sent?: boolean; 
    created_at?: string; 
    updated_at?: string; 
}