import { method_option_type } from "@/types/types";



export const payment_method: method_option_type[] = [
    {
        image: "crypto",
        title: "Crypto",
        subtitle: "USDT, USDC, CNGN",
        value: "crypto"
    },

    {
        image: "card",
        title: "Card/Transfer",
        subtitle: "Cards, Bank Transfer",
        value: "bank_transfer"
    },


    {
        image: "nfc",
        title: "Tap to Pay",
        subtitle: "NFC payment",
        value: "nfc"
    },
]