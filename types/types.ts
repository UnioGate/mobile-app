import { MainStackParamList } from "@/app/main/type";
import { ReactNode } from "react";

export type DropdownOption = {
  label: string | ReactNode;
  value: string | number | boolean;
  searchText?: string;
  iso?: string;
};


export type StateOptionSource = {
  name: string;
  country_code: string;
};

export type LogoKey = "eth" | "btc" | "card";

export type TransactionStatus = "Completed" | "Pending" | "Failed" | "Successful" | "Unsuccessful";

export type PaymentMethod = "USDT (Tron)" | "Card";


export type transaction_detail_type = {
  method: PaymentMethod;
  image: LogoKey;
  tx_time: Date;
  amount: number;
  status: TransactionStatus,
  recipient: string,
  id: string,
};


export type GroupedTx = {
  date: string
  transactions: transaction_detail_type[]
  totalAmount: number
  totalCount: number
}

export type methodKey = "card" | "crypto" | "nfc"

export type method_option_type = {
  title: string;
  subtitle: string;
  image: methodKey;
}


export type stableCoinKey = "usdt" | "usdc" | "cngn"


export type stableCoinOptionData = {
  title: string;
  rate: string;
  img: stableCoinKey;
}



export type networkKey = "eth" | "tron" | "base"


export type networkOptionData = {
  title: string;
  img: networkKey;
}

type RouteName = keyof MainStackParamList & string;

export type transfer_method_option_type = {
  title: string;
  subtitle: string;
  icon: ReactNode;
  textColor: string;
  background_color: string;
  route: RouteName
}



export type WithdrawalStatus = "Completed" | "Pending" | "Failed";


export interface Withdrawal {
  id: string;
  amount: number;
  bank: string;
  accountMasked: string;
  status: WithdrawalStatus;
  date: string;
  fee: number;
  netAmount: number;
  reference: string;
  account_number: number;
  account_name: string;
}



export type CurrencyFlagCode = "GHC" | "GBP" | "NGN" | "USD" | "ZAR" | "ZES";

export interface commonCurrenciesShape {
  image: CurrencyFlagCode;
  abbreviation: CurrencyFlagCode;
  sign: string;
  title: string
}



export type TeamMemberStatus = "active" | "inactive";

export interface TeamMember {
  id: string;
  avatar?: string;
  fullName: string;
  role: string;
  email: string;
  phone: string;
  status: TeamMemberStatus;
  joinedAt: string;
}
