import { create } from 'zustand';

export interface CurrentRole {
  id: number;
  title: string;
  description: string;
  location: string;
  daily_pay: number | null;
  hourly_pay: number | null;
  project_pay: number | null;
  soft_deadline: string | null;
  hard_deadline: string | null;
  application_deadline: string | null;
  max_age: number | null;
  min_age: number | null;
  ethnicities: string[];
  genders: string[];
  openings: number;
  experience_level: string | null;
  role_type: string | null;
  skill: string | null;
  role_payment_info: string | null;
  deadline_notes: string | null;
  application_questions: string | null;
  company_id: number | null;
  event: number;
  applicants: number[] | null;
  hired: number[] | null;
  rejected: number[] | null;
  payment_terms: string | null;
  created_at: string;
  updated_at: string;
}

export interface CurrentRoleState {
  currentRole: CurrentRole | null;
  
  setCurrentRole: (role: Partial<CurrentRole>) => void;
  
  clearCurrentRole: () => void;
}

const useCurrentRoleStore = create<CurrentRoleState>((set) => ({
  currentRole: null,
  
  setCurrentRole: (role: Partial<CurrentRole>) => set((state) => ({
    currentRole: state.currentRole ? { ...state.currentRole, ...role } : { ...role } as CurrentRole,
  })),
  
  clearCurrentRole: () => set({ currentRole: null }),
}));

export default useCurrentRoleStore;