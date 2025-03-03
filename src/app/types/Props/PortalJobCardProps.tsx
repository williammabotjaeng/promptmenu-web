export interface PortalJobCardProps {
    title: string; 
    location: string; 
    hourlyPay?: number; 
    dailyPay?: number;
    projectPay?: number; 
    genders?: string[]; 
    ethnicities?: string[]; 
    skill?: string; 
    openings?: string; 
    hardDeadline?: string; 
    minAge?: number;
    maxAge?: number;
  }