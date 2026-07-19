// api.ts
import { useAuthStore } from "@/stores/authStore";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { router } from "expo-router";

export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// ---- Request interceptor: attach the access token ----
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ---- Response interceptor: refresh-and-retry on 401 ----

interface RetryConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

function onRefreshed(newToken: string) {
    refreshQueue.forEach((callback) => callback(newToken));
    refreshQueue = [];
}

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as RetryConfig;

        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        if (originalRequest.url?.includes("/auth/token/refresh")) {
            useAuthStore.getState().logout();
            router.replace("/auth/screens/SignIn");
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        if (isRefreshing) {
            return new Promise((resolve) => {
                refreshQueue.push((newToken: string) => {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    resolve(api(originalRequest));
                });
            });
        }

        isRefreshing = true;

        try {
            const refreshToken = useAuthStore.getState().refreshToken;
            if (!refreshToken) throw new Error("No refresh token");

            const { data } = await axios.post(
                `${api.defaults.baseURL}/auth/token/refresh`,
                { refreshToken }
            );

            useAuthStore.getState().setSession({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            });

            onRefreshed(data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return api(originalRequest);
        } catch (refreshError) {
            useAuthStore.getState().logout();
            router.replace("/auth/screens/SignIn");
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);