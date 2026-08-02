import { BankWithdrawRequest, BankWithdrawResponse } from "@/types/types";
import { api } from "./axios";



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
        return {
            ok: false as const,
            error: error
        }
    }



}