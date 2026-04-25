import { method_option_type } from "@/types/types";



export const payment_method: method_option_type[] = [
    {
        image: "crypto",
        title: "Crypto",
        subtitle: "USDT, USDC, CNGN"
    },

    {
        image: "card",
        title: "Card/Transfer",
        subtitle: "Cards, Bank Transfer"
    },


    {
        image: "nfc",
        title: "Tap to Pay",
        subtitle: "NFC payment"
    },
]