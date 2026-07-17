import axios from "axios";
import Constants from "expo-constants";

const apiUrl =
    Constants.expoConfig?.extra?.backendUrl;


export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});









