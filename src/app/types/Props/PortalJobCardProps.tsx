export interface PortalJobCardProps {
    roleId: string | number;
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
    role?: any;
  }