import { CreateSalesResponse, SaleRecord, SalesBody } from "@/types/types";
import axios from "axios";
import { api } from "./axios";



// this is the endpoint for creating a payment session
export const createSale = async (data: SalesBody) => {
    try {
        const response = await api.post("/sales/create", data)
        const result = response.data;

        return {
            ok: true,
            message: result.message,
            createSalesResponse: result.sale as CreateSalesResponse
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



// this endpoint polls the backend for status updates for on a transaction
export const getSalesById = async (id: string) => {

    try {
        const response = await api.get(`/sales/${id}`);
        return {
            ok: true as const,
            sale: response.data.sale
        }
    } catch (error) {
        return {
            ok: false as const,
            error: error
        }
    }

}




// this endpoint fetches the sales history
export const fetchSales = async () => {
    try {
        const response = await api.get("/sales/list");
        const result = response.data;

        return {
            ok: true,
            sale: result.sales as SaleRecord[]
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