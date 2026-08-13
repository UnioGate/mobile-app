import { fetchMyAccounts, getBanks } from "@/api/bank-accounts.api";
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
    getBankName: (code: string) => string
}



export const UseBankAccountStore = create<BankAccountStoreProps>((set, get) => ({
    accounts: [],
    isLoading: false,
    error: null,
    banks: [],
    isLoadingBanks: false,




    // fetch bank accounts
    fetchAccounts: async () => {
        set({
            isLoading: true,
            error: null
        });

        const response = await fetchMyAccounts();


        if (response.ok) {
            set({
                accounts: response.accounts,
                isLoading: false
            });
            console.log(response)
        }

        else {
            set({
                error: response.error,
                isLoading: false
            })
        }
    },



    // this function fetches the banks
    fetchBanks: async () => {
        // Don't refetch if already loaded — banks rarely/never change mid-session.


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


}))