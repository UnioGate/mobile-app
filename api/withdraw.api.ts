import { BankWithdrawRequest, BankWithdrawResponse, CryptoWithdrawRequest, OfframpResponse } from "@/types/types";
import axios from "axios";
import { api } from "./axios";




// NGN wallet → bank (owner-only)
export const withdrawBank = async (value: BankWithdrawRequest) => {
    try {
        const response = await api.post("/withdraw/bank", value);
        const result = response.data;

        return {
            ok: true,
            message: result.message,
            transfer: result.transfer as BankWithdrawResponse,
            newBalance: result.newBalance,
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                ok: false as const,
                error: error.response?.data?.error ?? error.message
            };
        }
        return {
            ok: false as const,
            error: "Something went wrong"
        };
    }

}







// Crypto -> external address (owner-only)
export const withdrawCrypto = async (data: CryptoWithdrawRequest) => {

    try {

        const response = await api.post("/withdraw/crypto", data);
        const result = response.data;


        return {
            ok: true as const,
            message: result.message,
            transaction: result.transaction,
            newBalance: result.newBalance

        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                ok: false as const,
                error: error.response?.data?.error ?? error.message
            };
        }
        return {
            ok: false as const,
            error: "Something went wrong"
        };
    }

}







// Crypto -> Naira via bank
export const withdrawOfframp = async (data: BankWithdrawRequest) => {


    try {

        const response = await api.post("/withdraw/offramp", data);
        const result = response.data;

        return {
            ok: true as const,
            message: result.message,
            offramp: result.offramp as OfframpResponse,
            newWalletBalance: result.newWalletBalance,
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                ok: false as const,
                error: error.response?.data?.error ?? error.message
            };
        }
        return {
            ok: false as const,
            error: "Something went wrong"
        };
    }
}






// Get offramp history
export const getOfframpHistory = async () => {

    try {

        const response = await api.get("/withdraw/offramp/history");
        const result = response.data;
        return {
            ok: true as const,
            getOfframpRequests: result.getOfframpRequests as OfframpResponse[]
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                ok: false as const,
                error: error.response?.data?.error ?? error.message
            };
        }
        return {
            ok: false as const,
            error: "Something went wrong"
        };
    }

}





// This endpoint manually confirms a transaction to be complete
export const markComplete = async (id: string) => {
    try {
        const response = await api.put(`/withdraw/offramp/${id}/complete`)
        const result = response.data;

        return {
            ok: true as const,
            message: "Completed"
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                ok: false as const,
                error: error.response?.data?.error ?? error.message
            };
        }
        return {
            ok: false as const,
            error: "Something went wrong"
        };
    }
}