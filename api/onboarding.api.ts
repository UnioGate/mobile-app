import { CompleteProfileBody } from "@/types/types";
import { api } from "./axios";





export const completeProfile = async (data: CompleteProfileBody) => {

    const response = await api.post("/onboarding/complete-profile", data);

    return response.data;

}