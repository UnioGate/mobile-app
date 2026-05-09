import { transfer_method_option_type } from "@/types/types";



export const transfer_payment_method: transfer_method_option_type[] = [
    {
        subtitle: "Debit/Credit Card",
        title: "Pay with Card",
        icon: "card",
        background_color: "#FF070733",
        textColor: "#FF0707"
    },

        {
        subtitle: "Bank Transfer",
        title: "Direct transfer",
        icon: "business",
        background_color: "#14AE5C33",
        textColor: "#14AE5C"
    },


        {
        subtitle: "Dial code to pay",
        title: "USSD",
        icon: "phone-portrait-outline",
        background_color: "#253E861A",
        textColor: "#253E86"
    },
]