import BankIcon2 from "@/components/icons/BankIcon2";
import CardIcon from "@/components/icons/CardIcon";
import UssdPhone from "@/components/icons/USSDPhoneIcon";
import { transfer_method_option_type } from "@/types/types";


export const transfer_payment_method: transfer_method_option_type[] = [
    {
        subtitle: "Debit/Credit Card",
        title: "Pay with Card",
        icon: <CardIcon />,
        background_color: "#FF070733",
        textColor: "#FF0707",
        route: "pay_with_card"
    },

    {
        subtitle: "Bank Transfer",
        title: "Direct transfer",
        icon: <BankIcon2 />,
        background_color: "#14AE5C33",
        textColor: "#14AE5C",
        route: "bank_transfer"
    },


    {
        subtitle: "Dial code to pay",
        title: "USSD",
        icon: <UssdPhone />,
        background_color: "#253E861A",
        textColor: "#253E86",
        route: "ussd_payments"
    },

]