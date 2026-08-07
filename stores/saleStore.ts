import { fetchSales } from "@/api/sales.api";
import { CreateSalesResponse, myAccount, pollResponse, SaleRecord, SalesBody } from "@/types/types";
import axios from "axios";
import { create } from "zustand";



interface SalesStore {

    // Request data
    sale: SalesBody


    // Response data
    saleResponse: CreateSalesResponse | null;

    // poll data
    pollResponse: pollResponse | null;

    // bank fee
    bankFee: number


    // account detail for transfer
    accountDetails: myAccount | null


    timeLeft: {
        minutes: string,
        seconds: string
    }

    // sales history
    salesHistory: SaleRecord[]
    isLoadingHistory: boolean
    todaySales: SaleRecord[]
    sumTodayTX: number


    // actions
    setSalesData: (data: Partial<SalesBody>) => void;
    setSaleResponse: (response: CreateSalesResponse) => void;
    setPollResponse: (response: pollResponse) => void;
    resetSale: () => void;
    fetchSalesHistory: () => void;
    filterTodaySales: () => void;
    sumDailyTx: () => void;
    setTimeLeft: (timeLeft: { minutes: string; seconds: string }) => void;
    setAccountDetail: (data: myAccount | null) => void;


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

    pollResponse: null,

    accountDetails: null,

    timeLeft: {
        minutes: "00",
        seconds: "00"
    },


    bankFee: 50,


    setSalesData: (data) =>
        set((state) => ({
            sale: {
                ...state.sale,
                ...data,
            },
        })),



    // the sales response setter function
    setSaleResponse: (response) =>
        set({
            saleResponse: response,
        }),



    // the reset setter function
    resetSale: () =>
        set({
            sale: initialState,
            saleResponse: null,
            pollResponse: null,
            timeLeft: { minutes: "00", seconds: "00" },
            isTimeOut: false,
        }),



    // the poll response setter function
    setPollResponse: (response) =>
        set({
            pollResponse: response
        }),


    setTimeLeft: (timeLeft) =>
        set({
            timeLeft
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
        const { salesHistory } = get();

        const today = new Date();

        const todaySales = salesHistory.filter((sale) => {
            const saleDate = new Date(sale.createdAt);

            return (
                saleDate.toDateString() === today.toDateString() &&
                sale.status === "confirmed"
            );
        });

        set({
            todaySales,
        });
    },


    sumDailyTx: () => {
        const { todaySales } = get()

        const sum = todaySales.reduce((total, current) => total + Number(current.amount), 0)

        set({
            sumTodayTX: sum
        })
    },


    setAccountDetail: (data) => {
        set({
            accountDetails: data
        })
    }

}))