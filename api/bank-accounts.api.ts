import { Bank, bankAccountBody, bankAccountResolveBody } from "@/types/types";
import axios from "axios";
import { api } from "./axios";



export const getBanks = async () => {

    try {
        const response = await api.get("/bank-accounts/banks")
        const result = response.data;

        return {
            ok: true as const,
            banks: result.banks as Bank[],
        };

    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                ok: false as const,
                error: error.response?.data?.error ?? error.message,
            };
        }
        return { ok: false as const, error: "Something went wrong" };
    }

}





export const saveBankAccount = async (data: bankAccountBody) => {

    try {
        const response = await api.post("/bank-accounts", data);
        const result = response.data;



        return {
            ok: true,
            message: result.message,
            bankAccount: result.bankAccountDetails as bankAccountBody
        }
    }

    catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                ok: false,
                error: error.response?.data.error ?? error.message
            }
        }

        return {
            ok: false,
            error: "Something went wrong"
        }
    }

}




export const resolveBankAcct = async (data: bankAccountResolveBody) => {

    try {
        const response = await api.post("/bank-accounts/resolve", data);
        const result = response.data;

        return {
            ok: true,
            accountName: result.accountName,
            accountNumber: result.accountNumber
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                ok: false,
                error: error.response?.data.error ?? error.message
            }
        }


        return {
            ok: false,
            error: "Something went wrong"
        }

    }
}




export const fetchMyAccounts = async () => {
    try {
        const response = await api.get("/bank-accounts")
        const result = response.data;


        return {
            ok: true,
            accounts: result.bankAccounts
        }


    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                ok: false,
                error: error.response?.data.error ?? error.message
            }
        }

        return {
            ok: false,
            error: "Something went wrong"
        }
    }
}







// This endpoint deletes a bank account
export const deleteAccount = async (id: string) => {

    try {
        const response = await api.delete(`/bank-accounts/${id}`)
        const result = response.data;

        return {
            ok: true as const,
            message: result.message
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                ok: false,
                error: error.response?.data.error ?? error.message
            }
        }

        return {
            ok: false,
            error: "Something went wrong"
        }
    }

}