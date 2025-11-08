"use client";

import { RootState } from "@/redux/store";
import { convertPrice } from "@/utils/convertCurrency";
import { DatePicker } from "antd";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import dayjs, { Dayjs } from "dayjs";
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface EarningData {
  month: string;
  earning: number;
}

const SalesReport = ({
  selectedYear,
  setSelectedYear,
  data,
}: {
  selectedYear: string;
  setSelectedYear: any;
  data: { month: string; count: number }[];
}) => {
  //currency and rate
  const { currency, rate } = useSelector((state: RootState) => state.currency);

  const handleYearChange = (
    date: Dayjs | null,
    dateString: string | string[]
  ) => {
    if (typeof dateString === "string") setSelectedYear(dateString);
  };

  const response = {
    data: data.reduce((acc: { [key: string]: number }, item) => {
      acc[item.month] = item.count;
      return acc;
    }, {}),
  };

  const earningsOrg: EarningData[] = useMemo(() => {
    return Object.entries(response?.data)?.map(([month, earning]) => ({
      month,
      earning: typeof earning === "number" ? earning : 0,
    }));
  }, [response?.data]);

  const chartData = useMemo(() => {
    return {
      labels: earningsOrg?.map((e) => e.month),
      datasets: [
        {
          id: "sales",
          label: "Total Sale",
          data: earningsOrg?.map((e) => e.earning),
          backgroundColor: "#FF6903",
          borderRadius: 10,
          barPercentage: 0.5,
        },
      ],
    };
  }, [earningsOrg]);

  const chartOptions = useMemo(() => {
    const earnings = earningsOrg.map((item) => item.earning);
    const min = Math.min(...earnings);
    const max = Math.max(...earnings);
    const padding = Math.max((max - min) * 0.1, max * 0.1, 10);

    return {
      responsive: true,
      maintainAspectRatio: false,
      resizeDelay: 200,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "white",
          titleColor: "#111827",
          bodyColor: "#111827",
          borderColor: "#e5e7eb",
          borderWidth: 1,
          callbacks: {
            label: function (tooltipItem: any) {
              return `${currency} ${convertPrice(
                tooltipItem?.raw,
                currency,
                rate
              )?.toFixed(2)}`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#6b7280", font: { size: 14 } },
        },
        y: {
          min: Math.max(0, min - padding),
          max: max + padding,
          grid: { color: "#f3f4f6" },
          ticks: {
            color: "#6b7280",
            font: { size: 14 },
            callback: (value: any) => Number(value).toFixed(0),
          },
        },
      },
    };
  }, [earningsOrg]);

  return (
    <div className="bg-white rounded-md shadow-sm p-6 md:p-8 border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Sales Report
        </h2>
        <DatePicker
          onChange={handleYearChange}
          picker="year"
          defaultValue={dayjs(selectedYear, "YYYY")}
          className="w-20"
          size="middle"
        />
      </div>

      <div className="w-full h-[400px] md:h-[500px]">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default SalesReport;
