import { ReactNode } from "react";

export type DropdownOption = {
  label: string | ReactNode;
  value: string | number | boolean;
  searchText?: string;
  iso?: string;
};




