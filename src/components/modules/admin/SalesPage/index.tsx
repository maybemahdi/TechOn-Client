"use client";

import MyButton from "@/components/ui/core/MyButton/MyButton";
import {
  DatePicker,
  Pagination,
  Select,
  Table,
  Typography
} from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

const { Title } = Typography;
const { Option } = Select;

interface SalesRecord {
  key: string;
  product: string;
  date: string;
  price: string;
  category: string;
  status: string;
  customer: string;
}

const mockData: SalesRecord[] = Array.from({ length: 24 }, (_, index) => ({
  key: `${index + 1}`,
  product: "iPhone 14",
  date: "10 Jan",
  price: "$30.00",
  category: "Smartphone",
  status: "Delivered",
  customer: "Emily Rose",
}));

export default function SalesPage() {
  const [selectedYear, setSelectedYear] = useState(dayjs().year().toString());

  const handleYearChange = (
    date: Dayjs | null,
    dateString: string | string[]
  ) => {
    if (typeof dateString === "string") setSelectedYear(dateString);
  };

  const [category, setCategory] = useState<string | undefined>(undefined);
  const [month, setMonth] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [objectQuery, setObjectQuery] = useState<
    { name: string; value: any }[]
  >([
    {
      name: "page",
      value: currentPage,
    },
    {
      name: "limit",
      value: pageSize,
    },
  ]);

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  useEffect(() => {
    setObjectQuery([
      {
        name: "page",
        value: currentPage,
      },
      {
        name: "limit",
        value: pageSize,
      },
    ]);
  }, [currentPage, pageSize]);

  const columns: ColumnsType<SalesRecord> = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Action",
      key: "action",
      render: () => <MyButton label="View" className="py-1 px-3" />,
    },
  ];

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      {/* Header with title and filters */}
      <div
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <Title
          level={2}
          className="text-2xl md:text-3xl font-semibold text-gray-800 mb-5"
        >
          Total Sales: $10,000
        </Title>

        <div style={{ display: "flex", gap: "12px" }}>
          <Select
            placeholder="Category"
            value={category}
            onChange={setCategory}
            style={{ width: 120 }}
            allowClear
          >
            <Option value="smartphone">Smartphone</Option>
            <Option value="laptop">Laptop</Option>
            <Option value="tablet">Tablet</Option>
          </Select>

          <Select
            placeholder="Month"
            value={month}
            onChange={setMonth}
            style={{ width: 100 }}
            allowClear
          >
            <Option value="jan">January</Option>
            <Option value="feb">February</Option>
            <Option value="mar">March</Option>
            <Option value="apr">April</Option>
            <Option value="may">May</Option>
            <Option value="jun">June</Option>
            <Option value="jul">July</Option>
            <Option value="aug">August</Option>
            <Option value="sep">September</Option>
            <Option value="oct">October</Option>
            <Option value="nov">November</Option>
            <Option value="dec">December</Option>
          </Select>

          <DatePicker
            onChange={handleYearChange}
            picker="year"
            defaultValue={dayjs(selectedYear, "YYYY")}
            className="w-20"
            size="middle"
          />
        </div>
      </div>

      {/* Data Table */}
      <Table
        columns={columns}
        dataSource={mockData}
        pagination={false}
        style={{
          backgroundColor: "#fff",
        }}
        scroll={{ x: "max-content" }}
      />
      {/* Pagination */}
      <div className="flex items-center justify-center w-fit mx-auto gap-4 my-5">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={20}
          onChange={handlePageChange}
          className="custom-pagination"
        />
      </div>
      {/* 🔥 Style wrapper fix for placeholder visibility */}
      <style jsx global>{`
        .ant-select-selection-placeholder {
          color: #9ca3af !important; /* Tailwind's gray-400 */
        }
      `}</style>
    </div>
  );
}
