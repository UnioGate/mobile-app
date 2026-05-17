import { transaction_detail_type } from "@/types/types";

export const transactions: transaction_detail_type[] = [
    {
        method: "USDT (Tron)",
        amount: 20000,
        image: "btc",
        status: "Successful",
        tx_time: new Date("2026-05-17T09:21:00"),
        recipient: "James A."
    },
    {
        method: "Card",
        amount: 12000,
        image: "btc",
        status: "Successful",
        tx_time: new Date("2026-04-19T10:47:00"),
        recipient: "James A."
    },
    {
        method: "Card",
        amount: 3000,
        image: "btc",
        status: "Successful",
        tx_time: new Date("2026-04-19T13:21:00"),
        recipient: "James A."
    },
    {
        method: "Card",
        amount: 12000,
        image: "btc",
        status: "Pending",
        tx_time: new Date("2026-04-19T14:47:00"),
        recipient: "James A."
    },
    {
        method: "USDT (Tron)",
        amount: 300000,
        image: "btc",
        status: "Failed",
        tx_time: new Date("2026-05-29T13:21:00"),
        recipient: "Victoria O."
    }
];