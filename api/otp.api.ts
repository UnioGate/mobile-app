import { RequestOTPBody, VerifyOTPBody } from "@/types/types";
import { api } from "./axios";


export const requestOTP = async (data: RequestOTPBody) => {

    const response = await api.post("/auth/otp/request", data);

    return response.data;

}


export const verifyOTP = async (data: VerifyOTPBody) => {
    const response = await api.post("/auth/otp/verify", data);

    return response.data;
}