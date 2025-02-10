import { create } from 'zustand';

interface LocalRolesState {
  roles: Array<string>; 
  setRoles: (roles: Array<string>) => void; 
  clearRoles: () => void; 
}

const useLocalRolesStore = create<LocalRolesState>((set) => ({
  roles: [], 
  setRoles: (roles: Array<string>) => set({ roles }), 
  clearRoles: () => set({ roles: [] }), 
}));

export default useLocalRolesStore;