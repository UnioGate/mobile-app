import { getRates, getTotalBalance } from "@/api/walletService.api";
import { Breakdown, RatesResponse } from "@/types/types";
import axios from "axios";
import { create } from "zustand";




interface WalletStore {
    // data
    walletBalance: string;
    isLoadingBalance: boolean;
    rate: RatesResponse;
    breakdown: Breakdown[];
    lastFetched: number | null;
    firstDisplay: boolean;


    // actions
    fetchBalance: () => void
    fetchRates: () => void

}


const CACHE_DURATION = 25 * 60 * 1000; // 25 minutes

export const useWalletStore = create<WalletStore>((set, get) => ({
    walletBalance: "",
    isLoadingBalance: false,
    lastFetched: null,
    firstDisplay: false,

    rate: {
        rates: {
            USDC: {
                NGN: 0,
                USD: 0
            },
            USDT: {
                NGN: 0,
                USD: 0
            }
        },
        timestamp: 0
    },

    fetchBalance: async () => {

        const { firstDisplay } = get();


        set({
            isLoadingBalance: true
        })

        try {
            const response = await getTotalBalance();

            if (!response.ok || !response.totalBalanceNgn) {
                console.error(response)
                return;
            }


            set({
                walletBalance: response.totalBalanceNgn,
                firstDisplay: false
            });

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error.response?.data)
            }
        }

        finally {
            set({
                isLoadingBalance: false
            })
        }
    },


    fetchRates: async () => {
        const { rate, lastFetched } = get()

        // If we already have data and it's less than 25 minutes old,
        // return it instead of hitting the API.

        if (rate &&
            lastFetched &&
            Date.now() - lastFetched < CACHE_DURATION
        ) {
            return;
        }

        try {
            const response = await getRates()

            if (!response.ok || !response.rates) {
                console.error(response)
                return;
            }

            set({
                rate: response,
                lastFetched: response.timestamp
            })

        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    ok: false,
                    error: error.response?.data?.error ?? error.message,
                };
            }
            return { ok: false, error: "Something went wrong" };
        }
    },


    breakdown: []


}))