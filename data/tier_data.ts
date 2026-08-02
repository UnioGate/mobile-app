import { tierShape } from "@/types/types";

export const tierData: tierShape[] = [
    {
        title: "Tier 1",
        dailySalesLimit: 5000000,
        dailyWithdrawalLimit: 100000,
        monthlyWithdrawalLimit: 100000000,
        resetTime: 24
    },
    {
        title: "Tier 2",
        dailySalesLimit: 20000000,
        dailyWithdrawalLimit: 500000,
        monthlyWithdrawalLimit: 400000000,
        resetTime: 24
    },
    {
        title: "Tier 3",
        dailySalesLimit: 100000000,
        dailyWithdrawalLimit: 5000000,
        monthlyWithdrawalLimit: "Unlimited",
        resetTime: 30
    },
];