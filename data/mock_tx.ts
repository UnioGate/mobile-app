import { transaction_detail_type } from "@/types/types";

export const transactions: transaction_detail_type[] = [
    {
        id: "7f4d9b42-5c13-4f2f-a6c1-8e2c1d9a1001",
        method: "USDT (Tron)",
        amount: 20000,
        image: "btc",
        status: "Completed",
        tx_time: new Date("2026-05-17T09:21:00"),
        recipient: "James A."
    },
    {
        id: "2c91a8f7-1d44-4d8f-bc77-5f7a8d2b1002",
        method: "Card",
        amount: 12000,
        image: "btc",
        status: "Completed",
        tx_time: new Date("2026-04-19T10:47:00"),
        recipient: "James A."
    },
    {
        id: "94b3d6c8-7a25-45a0-9f3d-2b6f4e1c1003",
        method: "Card",
        amount: 3000,
        image: "card",
        status: "Completed",
        tx_time: new Date("2026-04-19T13:21:00"),
        recipient: "James A."
    },
    {
        id: "d1e7f2a4-3b89-4e7c-8d22-6c9a5f0b1004",
        method: "Card",
        amount: 12000,
        image: "eth",
        status: "Pending",
        tx_time: new Date("2026-04-19T14:47:00"),
        recipient: "James A."
    },
    {
        id: "a8c5e1d9-6f34-4b1e-91c7-3d2f8a7b1005",
        method: "USDT (Tron)",
        amount: 300000,
        image: "card",
        status: "Unsuccessful",
        tx_time: new Date("2026-05-29T13:21:00"),
        recipient: "Victoria O."
    }
];