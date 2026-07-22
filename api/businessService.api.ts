import { useAuthStore } from "@/stores/authStore";
import { Business, inviteBody } from "@/types/types";
import axios from "axios";
import { api } from "./axios";






export const listBusinesses = async () => {
    try {
        const response = await api.get("business/list");


        return {
            ok: true,
            businesses: response.data.businesses as Business[]
        };
    }

    catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                ok: false,
                error: error.response?.data.error ?? error.message,
            };
        }

        return {
            ok: false,
            error: "Something went wrong"
        }
    }
}





export const switchBusiness = async (businessId: string) => {
    try {
        const response = await api.post("/business/switch", { businessId });
        const result = response.data;

        // Only the access token changes here — refreshToken and user stay
        // the same, but role is now scoped to the new business.
        useAuthStore.getState().setSession({
            accessToken: result.accessToken,
            role: result.business, // { id, role } — matches ActiveRole shape
        });

        return {
            ok: true,
            message: result.message,
            business: result.business,
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




export const addTeamMember = async (data: inviteBody) => {

    try {
        const response = await api.post("/onboarding/invite-sales-rep", data);
        const result = response.data

        return {
            ok: true,
            message: result.message
        };

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