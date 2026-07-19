import { MainStackParamList } from "@/app/main/type";
import { InternalAxiosRequestConfig } from "axios";
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



export interface RequestOTPBody {
  identifier: string;
  type: "email" | "whatsapp";
}


export interface VerifyOTPBody {
  identifier: string;
  code: number
}


export interface CompleteProfileBody {
  identifier?: string;
  type?: string;
  firstName: string;
  lastName: string,
  country: string,
  email?: string,
  phoneNumber?: string
  inviteBusinessId: string | null;
  dob?: Date | null;
  userId?: string
}



export interface CompleteBusinessInformationBody {
  name: string;
  address: string;
  city: string;
  town: string;
  postalCode: string;
  primaryCurrency: string;
  userId?: string;
}


export type State = {
  id: number;
  name: string;
  country_id: number;
  country_code: string;
  country_name: string;
  iso2: string;
  iso3166_2: string;
  fips_code: string;
  type: string;
  level: string | null;
  parent_id: number | null;
  native: string;
  latitude: string;
  longitude: string;
  timezone: string;
  translations: Record<string, string>;
  wikiDataId: string;
  population: number | null;
};


export type Currency = {
  country: string,
  currency_code: string
}


export type Role = "owner" | "sales_rep";


export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}


export interface ActiveRole {
  role: Role;
  businessId: string;
}


export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  role: ActiveRole | null;

  isAuthenticated: () => boolean;

  setSession: (data: {
    accessToken?: string;
    refreshToken?: string;
    user?: User;
    role?: ActiveRole;
  }) => void;

  setTokens: (tokens: AuthTokens) => void;

  setAccessToken: (accessToken: string) => void;

  logout: () => void;
}




export interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}



export interface Business {
  id: string;
  name: string;
  city?: string;
  image?: string;
  role?: Role;
}




export type WalletCurrency = "USDT" | "USDC" | "NGN";
export type WalletNetwork = "tron" | "base" | "nomba";

export interface Wallet {
  id: string;
  currency: WalletCurrency;
  network: WalletNetwork;
  amount: string;
  address: string | "pending";
  createdAt?: string;
}


export interface TotalBalanceResponse {
  totalBalanceNgn: string;
  breakdown: Array<{
    currency: string;
    amount: string;
    ngnEquivalent: string;
  }>;
}


export interface RatesResponse {
  rates: {
    USDT: { NGN: number; USD: number };
    USDC: { NGN: number; USD: number };
  };
  timestamp: string;
}