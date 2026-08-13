import { fetchMyAccounts, getBanks } from "@/api/bank-accounts.api";
import { bankLogo } from "@/app/main/type";
import { Bank, myAccount } from "@/types/types";
import { create } from "zustand";




interface BankAccountStoreProps {
    accounts: myAccount[];
    isLoading: boolean;
    error: string | null;
    banks: Bank[]
    isLoadingBanks: boolean,
    fetchAccounts: () => Promise<void>;
    fetchBanks: () => Promise<void>;
    getBankName: (code: string) => string;
    bankLogos: bankLogo[]
    fetchBankLogos: () => Promise<void>
}



export const UseBankAccountStore = create<BankAccountStoreProps>((set, get) => ({
    accounts: [],
    isLoading: false,
    error: null,
    banks: [],
    isLoadingBanks: false,
    bankLogos: [],




    // fetch bank accounts
    fetchAccounts: async () => {
        const response = await fetchMyAccounts();

        if (response.ok) {
            set({
                accounts: response.accounts,
                error: null,
            });
        } else {
            set({
                error: response.error,
            });
        }
    },



    // this function fetches the banks
    fetchBanks: async () => {
        // Don't refetch if already loaded — banks rarely/never change mid-session.

        set({
            isLoadingBanks: true
        })

        if (get().banks.length > 0) return;

        const response = await getBanks();

        if (response.ok) {
            set({ banks: response.banks, isLoadingBanks: false });
        }

        else {
            set({
                isLoadingBanks: false
            });
        }
    },


    getBankName: (code: string) => {
        const bank = get().banks.find((b) => b.code === code);
        return bank?.name ?? code;
    },






    fetchBankLogos: async () => {
        try {
            const response = await fetch(
                "https://cdn.jsdelivr.net/gh/Nigerian-Bank-Logos/ng-bank-logos@main/dist/banks_NGN.json"
            );

            const data = await response.json();

            set({
                bankLogos: data.banks
            });

            console.log(data)
        } catch (error) {
            console.error("Failed to fetch bank logos:", error);
        }
    }

}))