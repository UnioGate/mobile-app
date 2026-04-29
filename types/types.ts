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

export type LogoKey = "eth" | "btc";

export type transaction_detail_type = {
  method: string;
  image: LogoKey;
  tx_time: Date;
  amount: number;
  status: "Successful" | "Pending" | "Unsuccessful"
};


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
