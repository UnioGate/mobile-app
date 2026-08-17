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

export type LogoKey = "eth" | "btc" | "card" | "usdc" | "usdt" | "cngn";

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
  transactions: SaleRecord[]
  totalAmount: number
  totalCount: number
}

export type methodKey = "card" | "crypto" | "nfc"

export type method_option_type = {
  title: string;
  subtitle: string;
  image: methodKey;
  value: "" | "crypto" | "nfc" | "bank_transfer"
}


export type stableCoinKey = "usdt" | "usdc" | "cngn"


export type stableCoinOptionData = {
  title: "USDT" | "USDC" | "NGN" | "CNGN" | "";
  rate: string;
  img: stableCoinKey;
}



export type networkKey = "eth" | "tron" | "base"


export type networkOptionData = {
  title: "tron" | "base" | "nomba" | "eth" | "";
  img: networkKey;
}


export type transfer_method_option_type = {
  title: string;
  subtitle: string;
  icon: ReactNode;
  textColor: string;
  background_color: string;
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
  image?: string | null
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
  timestamp: number;
}



export interface inviteBody {
  identifier: string;
  type: string;
}


export interface Bank {
  name: string;
  code: string;
}



export interface bankAccountBody {
  accountNumber: string;
  bankCode: string;
  bankName: string;
  id?: string
}

export interface bankAccountResolveBody {
  accountNumber: string;
  bankCode: string
}



export interface myAccount {
  id: string
  accountNumber: string
  bank: string
  accountName: string
}


export interface SalesBody {
  amount: string,
  paymentType: "bank_transfer" | "crypto" | "nfc" | "",
  description: string,
  currency?: "USDT" | "USDC" | "NGN" | "CNGN" | "",
  network?: "tron" | "base" | "nomba" | "eth" | ""
}


export interface CreateSalesResponse {
  id: string,
  amount: string,
  paymentType: string,
  status: "pending" | "confirmed" | "expired",
  walletAddress: string,
  expiresAt: string,
  qrCode: string
}


export interface SaleRecord {
  id: string;

  amount: string;
  amountPaid: string | null;

  paymentType: "crypto" | "bank_transfer";
  currency: "USDT" | "USDC" | "NGN" | "CNGN" | "",
  network: "base" | "tron" | "nomba";

  status: "pending" | "completed" | "failed" | "expired" | "confirmed";

  description: string | null;

  walletAddress: string;
  cryptoTxHash: string | null;

  expiresAt: string;
  createdAt: string;

  businessId: string;
  initiatorId: string;
}


export interface Breakdown {
  currency: string,
  amount: string,
  ngnEquivalent: string
}


export interface BankWithdrawRequest {
  walletId: string;
  bankAccountId: string;
  amount: string
}



export interface CryptoWithdrawRequest {
  walletId: string;
  toAddress: string;
  amount: string
}



export interface OfframpResponse {
  id: string;
  cryptoAmount: string;
  nairaAmount: string;
  rate: string;
  cryptoTxHash: string;
  status: "crypto_sent" | "naira_paid";
}


export interface BankWithdrawResponse {
  reference: string,
  transactionId: string;
  amount: string;
  status: "Success" | "Pending";
  bankAccount: myAccount
}


export type currentTier = "Tier 1" | "Tier 2" | "Tier 3"

export interface tierShape {
  dailySalesLimit: number,
  dailyWithdrawalLimit: number,
  monthlyWithdrawalLimit: number | string,
  resetTime: number,
  title: currentTier
}




export interface pollResponse {
  id: string;
  amount: string;
  amountPaid: string | null;
  businessId: string;
  createdAt: string;
  cryptoTxHash: string | null;
  currency: "USDT" | "USDC" | "NGN";
  description: string | null;
  expiresAt: string;
  initiatorId: string;
  network: "base" | "tron" | "nomba";
  paymentType: "crypto" | "bank_transfer";
  status: "pending" | "confirmed" | "expired"
  walletAddress: string;
}


export interface updateSaleStatus {
  txHash: string;
  amountPaid: string;
}
