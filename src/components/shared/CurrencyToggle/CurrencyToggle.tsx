"use client";

import {
  selectCurrency,
  toggleCurrency,
} from "@/redux/features/currency/currencySlice";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import { DollarSign } from "lucide-react";

export default function CurrencyToggle() {
  const dispatch = useDispatch();
  const currency = useAppSelector(selectCurrency);

  const isKYD = currency === "CI$";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => dispatch(toggleCurrency())}
        className="group relative flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105"
      >
        {/* Icon */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2 rounded-full">
          <DollarSign size={18} />
        </div>

        {/* Text */}
        <div className="flex items-center gap-1 text-gray-700 font-semibold text-sm">
          <span>{isKYD ? "CI$" : "US$"}</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500">
            {isKYD ? "Switch to USD" : "Switch to KYD"}
          </span>
        </div>

        {/* Hover Effect Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      </button>
    </div>
  );
}
