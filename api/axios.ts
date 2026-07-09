import axios from "axios"


export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
})