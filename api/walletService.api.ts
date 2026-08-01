import { RatesResponse, TotalBalanceResponse, Wallet } from "@/types/types";
import axios from "axios";
import { api } from "./axios";



// this endpoint gets all the user wallets
export const getWallets = async () => {
    try {
        const response = await api.get("/wallets");

        return {
            ok: true,
            wallets: response.data.wallets as Wallet[],
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                ok: false,
                error: error.response?.data?.error ?? error.message,
            };
        }
        return { ok: false, error: "Something went wrong" };
    }
};


// this functions fetches the wallet balance
export const getTotalBalance = async () => {
    try {
        const response = await api.get("/wallets/total-balance");
        const result: TotalBalanceResponse = response.data;

        return {
            ok: true,
            totalBalanceNgn: result.totalBalanceNgn,
            breakdown: result.breakdown,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                ok: false,
                error: error.response?.data?.error ?? error.message,
            };
        }
        return { ok: false, error: "Something went wrong" };
    }
};




// this function fetches the exchange rates
export const getRates = async () => {
    try {
        const response = await api.get("/wallets/rates");
        const result: RatesResponse = response.data;

        return {
            ok: true,
            rates: result.rates,
            timestamp: result.timestamp,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                ok: false,
                error: error.response?.data?.error ?? error.message,
            };
        }
        return { ok: false, error: "Something went wrong" };
    }
};