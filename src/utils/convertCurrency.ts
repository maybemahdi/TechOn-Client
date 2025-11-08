// utils/convertCurrency.ts

import { Currency } from "@/redux/features/currency/currencySlice";

export const convertPrice = (
  priceInCiDollar: number,
  currency: Currency,
  rate: number
) => {
  if (currency === "US$") return priceInCiDollar / rate;
  return priceInCiDollar;
};
