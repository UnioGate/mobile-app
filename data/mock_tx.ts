import { transaction_detail_type } from "@/types/types";

export const transactions: transaction_detail_type[] = [
    {
        method: "USDT",
        amount: 20000,
        image: "eth",
        status: "Successful",
        tx_time: new Date("2026-04-19T09:21:00")
    },
    {
        method: "USDT",
        amount: 12000,
        image: "eth",
        status: "Successful",
        tx_time: new Date("2026-04-19T10:47:00")
    },
    {
        method: "Card",
        amount: 3000,
        image: "eth",
        status: "Successful",
        tx_time: new Date("2026-04-19T13:21:00")
    },
    {
        method: "Card",
        amount: 12000,
        image: "eth",
        status: "Pending",
        tx_time: new Date("2026-04-19T14:47:00")
    },
    {
        method: "USDT",
        amount: 300000,
        image: "eth",
        status: "Unsuccessful",
        tx_time: new Date("2026-04-19T13:21:00")
    }
];