export interface JobPayload {
    event_title: string;
    role: RoleDetails;
}
  
export interface RoleDetails {
    created_at: string;
    dailyPay: number;
    description: string;
    ethnicities: string[];
    genders: string[];
    hardDeadline: string;
    hourlyPay: number;
    maxAge: number;
    minAge: number;
    location: string;
    notes: string;
    openings: string;
    paymentTerms: string;
    projectPay: number;
    questions: Array<{ question: string }>;
    skill: string;
    softDeadline: string;
    title: string;
}