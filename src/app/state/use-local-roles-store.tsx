import { create } from 'zustand';

interface LocalRolesState {
  roles: Array<any>; 
  setRoles: (roles: Array<any>) => void; 
  clearRoles: () => void; 
}

const useLocalRolesStore = create<LocalRolesState>((set) => ({
  roles: [], 
  setRoles: (roles: Array<any>) => set({ roles }), 
  clearRoles: () => set({ roles: [] }), 
}));

export default useLocalRolesStore;