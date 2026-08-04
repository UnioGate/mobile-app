// useCountdown.ts
import { useSaleStore } from "@/stores/saleStore";
import { useEffect, useRef } from "react";

export function useSaleCountdown() {
    const { saleResponse, setTimeLeft, setIsTimeOut } = useSaleStore();
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        const expiresAt = saleResponse?.expiresAt;
        if (!expiresAt) return;

        const expiryTime = new Date(expiresAt).getTime();

        const tick = () => {
            const msLeft = expiryTime - Date.now();

            if (msLeft <= 0) {
                setTimeLeft({ minutes: "00", seconds: "00" });
                setIsTimeOut(true);
                if (intervalRef.current) clearInterval(intervalRef.current);
                return;
            }

            const totalSeconds = Math.floor(msLeft / 1000);
            const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
            const seconds = (totalSeconds % 60).toString().padStart(2, "0");

            setTimeLeft({ minutes, seconds });
        };

        tick(); // run immediately so there's no 1s delay before the first display
        intervalRef.current = setInterval(tick, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [saleResponse?.expiresAt]);
}




