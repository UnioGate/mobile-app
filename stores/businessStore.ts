
import { listBusinesses } from "@/api/businessService.api";
import { Business } from "@/types/types";
import { create } from "zustand";


interface BusinessState {
    businesses: Business[];
    isLoading: boolean;
    error: string | null;

    fetchBusinesses: () => Promise<void>;
    getCurrentBusiness: (businessId: string | undefined) => Business | undefined;
}

export const useBusinessStore = create<BusinessState>((set, get) => ({
    businesses: [],
    isLoading: false,
    error: null,

    fetchBusinesses: async () => {
        set({ isLoading: true, error: null });

        const result = await listBusinesses();

        if (result.ok) {
            set({ businesses: result.businesses, isLoading: false });
        } else {
            set({ error: result.error, isLoading: false });
        }
    },

    getCurrentBusiness: (businessId) =>
        get().businesses.find((b) => b.id === businessId),
}));

// Convenience selectors
export const useBusinesses = () => useBusinessStore((s) => s.businesses);
export const useBusinessesLoading = () => useBusinessStore((s) => s.isLoading);