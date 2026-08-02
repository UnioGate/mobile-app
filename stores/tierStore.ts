import { currentTier, tierShape } from "@/types/types";
import { create } from "zustand";



interface TierStore {
    // current tier
    currentTier: currentTier | null,
    tierDetails: tierShape | null,



    //  usage
    usage: {
        todaySales: number,
        todayWithdrawal: number,
        monthlyWithdrawal: number
    };


    // remaining limits
    limits: {
        dailySalesLeft: number,
        dailyWithdrawalLeft: number,
        monthlyWithdrawalLeft: number,
    }



    // Loading state
    isLoading: boolean


    // actions
    setTierData: (data: {
        currentTier: currentTier;
        tierDetails: tierShape;
        usage: TierStore["usage"];
        limits: TierStore["limits"]
    }) => void;


    updateUsage: (usage: Partial<TierStore["usage"]>) => void;


    updateLimits: (limits: Partial<TierStore["limits"]>) => void;

    reset: () => void;
}



const initialState = {
    currentTier: null,
    tierDetails: null,

    usage: {
        todaySales: 0,
        todayWithdrawal: 0,
        monthlyWithdrawal: 0,
    },

    limits: {
        dailySalesLeft: 0,
        dailyWithdrawalLeft: 0,
        monthlyWithdrawalLeft: 0,
    },

    isLoading: false,
};





export const useTierStore = create<TierStore>((set) => ({
    ...initialState,

    setTierData: (data) =>
        set({
            currentTier: data.currentTier,
            tierDetails: data.tierDetails,
            usage: data.usage,
            limits: data.limits,
        }),

    updateUsage: (usage) =>
        set((state) => ({
            usage: {
                ...state.usage,
                ...usage,
            },
        })),

    updateLimits: (limits) =>
        set((state) => ({
            limits: {
                ...state.limits,
                ...limits,
            },
        })),

    reset: () => set(initialState),
}));