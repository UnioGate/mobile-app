import { useAuthStore } from "@/stores/authStore";
import { RequestOTPBody, VerifyOTPBody } from "@/types/types";
import { api } from "./axios";


export const requestOTP = async (data: RequestOTPBody) => {

    const response = await api.post("/auth/otp/request", data);

    return response.data;

}


export const verifyOTP = async (data: VerifyOTPBody) => {
    const response = await api.post("/auth/otp/verify", data);
    const result = response.data;


    // Existing user: tokens are already there, log them in immediately.
    if (!result.isNewUser) {
        useAuthStore.getState().setSession({
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            user: result.user,
            role: result.role
        })
    }


    // New user: no tokens yet. Caller checks `isNewUser` and `hasInvite`
    // to decide whether to route to complete-profile (and whether to
    // carry inviteBusinessId along).
    return result;

}

