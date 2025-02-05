import { SkillType } from "./Props/SkillTagProps";

export interface TalentProfileData {
  legalFullName: string;
  stageName: string;
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
  skills?: SkillType[];
  height?: number | null;
  weight?: number | null;
  eyeColor?: string | null;
  hairColor?: string | null;
  government_id_front?: string | null;
  government_id_back?: string | null;
  banking_details?: string | null;
  portfolio_pdf?: {
    type: string | null; 
    file: File | string | null;
    fileName: string | null;
  };
  portfolio_video?: {
    type: string | null;
    file: File | string | null;
    fileName: string | null;
  };
  additional_images?: string[] | null;
  is_verified?: boolean;
  verification_notification_sent?: boolean;
  created_at?: string;
  updated_at?: string;
}