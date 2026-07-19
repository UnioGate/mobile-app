import { useAuthStore } from "@/stores/authStore";
import { CompleteBusinessInformationBody, CompleteProfileBody } from "@/types/types";
import axios from "axios";
import { api } from "./axios";





export const completeProfile = async (data: CompleteProfileBody) => {
    try {
        const response = await api.post(
            "/onboarding/complete-profile",
            data
        );
        const result = response.data;

        // Invited sales rep: backend auto-joined them and returned a full
        // session right here. No create-business step for this path.
        if (result.accessToken && result.refreshToken && result.role) {
            useAuthStore.getState().setSession({
                accessToken: result.accessToken,
                refreshToken: result.refreshToken,
                role: result.role,
            });

            return {
                ok: true,
                isInvitedRep: true,
                message: result.message,
                userId: result.userId,
            };
        }


        // Normal owner signup: no session yet, caller routes to
        // create-business next using this userId.
        return {
            ok: true,
            data: response.data,
            message: response.data.message,
            userId: response.data.userId
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




// create business profile function
export const createBusiness = async (data: CompleteBusinessInformationBody) => {

    try {
        const response = await api.post("/onboarding/create-business", data);
        const result = response.data;


        // This is the payoff; tokens, business, and wallets (including the
        // Nomba virtual account) all arrive together. Persist the session now.

        useAuthStore.getState().setSession({
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            user: result.user,
            role: result.role,
        });

        return {
            ok: true,
            message: result.message,
            business: result.business,
            wallets: result.wallets,
        };

    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                ok: false,
                error:
                    error.response?.data?.message ??
                    error.message
            };
        }


        return {
            ok: false,
            error: "Something went wrong"
        }
    }
}