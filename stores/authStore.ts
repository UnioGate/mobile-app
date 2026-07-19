import { AuthState } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            accessToken: null,
            refreshToken: null,
            user: null,
            role: null,

            isAuthenticated: () => !!get().accessToken,

            setSession: (data) =>
                set((state) => ({
                    accessToken: data.accessToken ?? state.accessToken,
                    refreshToken: data.refreshToken ?? state.refreshToken,
                    user: data.user ?? state.user,
                    role: data.role ?? state.role,
                })),

            setTokens: (tokens) =>
                set({
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                }),

            setAccessToken: (accessToken) => set({ accessToken }),

            logout: () =>
                set({
                    accessToken: null,
                    refreshToken: null,
                    user: null,
                    role: null,
                }),
        }),
        {
            name: "unio-auth", // localStorage key
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                user: state.user,
                role: state.role,
            }),
        }
    )
);

// Convenience selectors — use these in components instead of the whole store
// to avoid unnecessary re-renders.
export const useAccessToken = () => useAuthStore((s) => s.accessToken);
export const useCurrentRole = () => useAuthStore((s) => s.role);
export const useCurrentUser = () => useAuthStore((s) => s.user);
export const useIsOwner = () => useAuthStore((s) => s.role?.role === "owner");