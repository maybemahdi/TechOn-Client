"use client";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { convertPrice } from "@/utils/convertCurrency";
import React from "react";

const Stats = ({
  stats,
  isLoading,
  isFetching,
}: {
  stats: any;
  isLoading?: boolean;
  isFetching?: boolean;
}) => {
  //currency and rate
  const { currency, rate } = useAppSelector(
    (state: RootState) => state.currency
  );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats?.map((stat: any, index: number) => (
        <div
          key={index}
          className={`bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 `}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {stat?.title}
              </h3>
              {index === 1 || index === 2 ? (
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {currency}{" "}
                  {convertPrice(stat?.value, currency, rate)?.toFixed(2)}
                </p>
              ) : (
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {stat?.value}
                </p>
              )}
              <p className="text-sm text-gray-500">{stat?.subtitle}</p>
            </div>
            {stat?.icon && (
              <div className="ml-4 p-3 bg-gray-50 rounded-full">
                {stat?.icon}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
