import { CompleteProfileBody } from "@/types/types";
import axios from "axios";
import { api } from "./axios";





export const completeProfile = async (data: CompleteProfileBody) => {
    try {
        const response = await api.post(
            "/onboarding/complete-profile",
            data
        );

        return {
            ok: true,
            data: response.data,
            message: response.data.message,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                ok: false,
                error:
                    error.response?.data?.message ??
                    error.message,
            };
        }

        return {
            ok: false,
            error: "Something went wrong",
        };
    }
};