import { useAuthStore } from "@/stores/authStore";
import { api } from "./axios";



export const logout = async () => {
    const { refreshToken, logout: clearStore } = useAuthStore.getState()

    try {
        if (refreshToken) {
            await api.post("/auth/logout", {
                refreshToken
            })
        }
    }

    finally {
        // Cleared local state irrespective of the response
        clearStore()
    }


}