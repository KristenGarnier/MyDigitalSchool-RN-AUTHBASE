import { create } from 'zustand';

export const useUserStore = create((set) => ({
	connected: undefined,
	setConnected: (value) => set((state) => ({ connected: value })),
}));
