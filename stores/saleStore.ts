import { fetchSales } from "@/api/sales.api";
import { CreateSalesResponse, SaleRecord, SalesBody } from "@/types/types";
import axios from "axios";
import { create } from "zustand";



interface SalesStore {

    // Request data
    sale: SalesBody


    // Response data
    saleResponse: CreateSalesResponse | null;


    // sales history
    salesHistory: SaleRecord[]
    isLoadingHistory: boolean
    todaySales: SaleRecord[]
    sumTodayTX: number


    // actions
    setSalesData: (data: Partial<SalesBody>) => void;
    setSaleResponse: (response: CreateSalesResponse) => void;
    resetSale: () => void;
    fetchSalesHistory: () => void;
    filterTodaySales: () => void;
    sumDailyTx: () => void;


    // timer
    isTimeOut: boolean;
    setIsTimeOut: (value: boolean) => void;
}



const initialState: SalesBody = {
    amount: "",
    description: "",
    paymentType: "",
    currency: "",
    network: "",
}


export const useSaleStore = create<SalesStore>((set, get) => ({
    sale: initialState,


    salesHistory: [],
    isLoadingHistory: false,
    todaySales: [],
    sumTodayTX: 0,

    saleResponse: null,

    setSalesData: (data) =>
        set((state) => ({
            sale: {
                ...state.sale,
                ...data,
            },
        })),


    setSaleResponse: (response) =>
        set({
            saleResponse: response,
        }),

    resetSale: () =>
        set({
            sale: initialState,
            saleResponse: null
        }),


    isTimeOut: false,

    setIsTimeOut: (value) =>
        set({
            isTimeOut: value,
        }),

    fetchSalesHistory: async () => {
        set({ isLoadingHistory: true });

        try {
            const response = await fetchSales();

            if (!response.ok || !response.sale) {
                console.error(response);
                return;
            }

            set({
                salesHistory: response.sale,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error.response?.data);
            }

            console.error(error);
        } finally {
            set({
                isLoadingHistory: false,
            });
        }
    },


    filterTodaySales: () => {
        const { salesHistory } = get()

        const today = new Date();

        const todaySales = salesHistory.filter((sale) => {
            const saleDate = new Date(sale.createdAt);

            return saleDate.toDateString() === today.toDateString();
        });


        set({
            todaySales
        })
    },


    sumDailyTx: () => {
        const { todaySales } = get()

        const sum = todaySales.reduce((total, current) => total + Number(current.amount), 0)

        set({
            sumTodayTX: sum
        })
    },

}))