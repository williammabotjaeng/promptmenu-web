export interface CompanyData {
    user: string; 
    name: string; 
    logo?: File | null; 
    slogan?: string | null; 
    description?: string | null; 
    address?: string | null; 
    phone_number?: string | null; 
    whatsapp_number?: string | null; 
    payment_method?: string | null; 
    website?: string | null; 
    social_media_links?: Record<string, string> | null; 
    created_at?: string; 
    updated_at?: string; 
}