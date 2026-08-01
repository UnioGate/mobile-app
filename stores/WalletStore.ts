import { getRates, getTotalBalance } from "@/api/walletService.api";
import { RatesResponse } from "@/types/types";
import axios from "axios";
import { create } from "zustand";




interface WalletStore {
    // data
    walletBalance: string;
    isLoadingBalance: boolean
    rate: RatesResponse


    // actions
    fetchBalance: () => void
    fetchRates: () => void

}


export const useWalletStore = create<WalletStore>((set, get) => ({
    walletBalance: "",
    isLoadingBalance: false,
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
        timestamp: ""
    },

    fetchBalance: async () => {
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
                walletBalance: response.totalBalanceNgn
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
        try {
            const response = await getRates()

            if (!response.ok || !response.rates) {
                console.error(response)
                return
            }

            set({
                rate: response
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
    }


}))