// store/slices/currencySlice.ts
import { createSlice } from "@reduxjs/toolkit";

export type Currency = "CI$" | "US$";

interface CurrencyState {
  currency: Currency;
  rate: number;
}

const initialState: CurrencyState = {
  currency: "CI$",
  rate: 0.8,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    toggleCurrency: (state) => {
      state.currency = state.currency === "CI$" ? "US$" : "CI$";
    },
  },
});

export const selectCurrency = (state: { currency: CurrencyState }) =>
  state.currency.currency;

export const { toggleCurrency } = currencySlice.actions;
export default currencySlice.reducer;
