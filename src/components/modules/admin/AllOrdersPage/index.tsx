"use client";

import Loading from "@/components/ui/core/Loading/Loading";
import MyButton from "@/components/ui/core/MyButton/MyButton";
import {
  useChangeOrderStatusMutation,
  useGetAllOrdersQuery,
} from "@/redux/features/admin/admin.api";
import { RootState } from "@/redux/store";
import { convertPrice } from "@/utils/convertCurrency";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { DatePicker, Dropdown, Modal, Pagination, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const { Option } = Select;

export type OrderData = {
  id: string;
  orderCode: string;
  status: string;
  totalPrice: number;
  billingDetails: {
    firstName: string;
    lastName: string;
    companyName: string;
    country: string;
    city: string;
    street: string;
    postcode: any;
    phone: string;
    email: string;
    other: string;
    paymentMethod: string;
  };
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
  };
  items: Array<{
    product: {
      id: string;
      name: string;
      price: number;
      category: string;
    };
    quantity: number;
  }>;
};

// const mockData: OrderData[] = [
//   {
//     key: "1",
//     product: "iPhone 14",
//     date: "10 Jan",
//     price: "$30.00",
//     category: "Smartphone",
//     status: "Approved",
//     customer: "Emily Rose",
//   },
//   {
//     key: "2",
//     product: "iPhone 14",
//     date: "10 Jan",
//     price: "$30.00",
//     category: "Smartphone",
//     status: "Rejected",
//     customer: "Emily Rose",
//   },
//   // ... more data
// ];

export default function AllOrdersPage() {
  //currency and rate
  const { currency, rate } = useSelector((state: RootState) => state.currency);

  const [activeTab, setActiveTab] = useState<
    "PENDING" | "COMPLETED" | "REJECTED"
  >("PENDING");

  const [selectedYear, setSelectedYear] = useState(dayjs().year().toString());
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

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);

  const handleView = (order: OrderData) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

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
      {
        name: "status",
        value: activeTab,
      },
    ]);
  }, [activeTab]);

  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetAllOrdersQuery(objectQuery);
  const orders: OrderData[] = response?.data?.orders || [];

  const handleYearChange = (
    date: Dayjs | null,
    dateString: string | string[]
  ) => {
    if (typeof dateString === "string") setSelectedYear(dateString);
  };

  const handleTabChange = (tab: "Pending" | "Completed" | "Rejected") => {
    const tabMap: Record<string, "PENDING" | "COMPLETED" | "REJECTED"> = {
      Pending: "PENDING",
      Completed: "COMPLETED",
      Rejected: "REJECTED",
    };
    setActiveTab(tabMap[tab]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "text-green-500";
      case "REJECTED":
        return "text-red-500";
      case "PENDING":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  const [changeStatus] = useChangeOrderStatusMutation();

  const handleStatusChange = async (id: string, status: string) => {
    await handleAsyncWithToast(async () => {
      return changeStatus({
        id: id,
        status: status,
      });
    }, "Changing order status...");
  };

  const columns: ColumnsType<OrderData> = [
    {
      title: "Order Code",
      dataIndex: "orderCode",
      key: "orderCode",
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_: any, record) => (
        <span className="font-medium">
          {new Date(record.createdAt).toDateString()}
        </span>
      ),
    },
    {
      title: "Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) => (
        <span className="font-medium">
          {currency} {convertPrice(Number(text), currency, rate)?.toFixed(2)}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <div className="flex items-center gap-1">
          <span className={`${getStatusColor(status)} font-medium`}>
            {status}
          </span>
        </div>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (_, record) => (
        <span className="font-medium">{record?.user?.name}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record) => (
        <div className="flex gap-2">
          <MyButton
            onClick={() => {
              handleView(record);
            }}
            label="View"
            className="py-1 px-3"
          />
          {/* antd dropdown with menu items to change user status */}
          <div style={{ position: "relative" }}>
            <Dropdown
              menu={{
                items: [
                  {
                    key: "1",
                    label: "Completed",
                    onClick: () => handleStatusChange(record?.id, "COMPLETED"),
                  },
                  {
                    key: "2",
                    label: "Rejected",
                    onClick: () => handleStatusChange(record?.id, "REJECTED"),
                  },
                ],
              }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <span>
                <MyButton label="More" className="py-1 px-3" />
              </span>
            </Dropdown>
          </div>
        </div>
      ),
    },
  ];

  if (isLoading || isFetching) return <Loading />;

  return (
    <div className="min-h-screen">
      <div className="bg-white rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          {/* Tabs */}
          <div className="flex gap-2">
            {["Pending", "Completed", "Rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab as any)}
                className={`h-9 px-5 rounded-lg font-medium border transition ${
                  activeTab === tab?.toUpperCase()
                    ? "bg-core-gradient border-blue-600 text-white"
                    : "bg-transparent border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Filters */}
          {/* <div className="flex gap-3">
            <Select
              defaultValue="Category"
              className="h-10 w-32"
              suffixIcon={
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="#666"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            >
              <Option value="all">All Categories</Option>
              <Option value="smartphone">Smartphone</Option>
              <Option value="laptop">Laptop</Option>
            </Select>
            <Select
              defaultValue="Status"
              className="h-10 w-32"
              suffixIcon={
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="#666"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            >
              <Option value="all">All Status</Option>
              <Option value="approved">Approved</Option>
              <Option value="pending">Pending</Option>
              <Option value="rejected">Rejected</Option>
            </Select>
            <DatePicker
              onChange={handleYearChange}
              picker="year"
              defaultValue={dayjs(selectedYear, "YYYY")}
              className="w-20"
              size="middle"
            />
          </div> */}
        </div>

        {/* Table */}
        <Table
          rowKey={(record: any) => record?.id}
          columns={columns}
          dataSource={orders}
          pagination={false}
          className="orders-table"
        />
        {/* Pagination */}
        <div className="flex items-center justify-center w-fit mx-auto gap-4 my-5">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={response?.data?.totalData}
            onChange={handlePageChange}
            className="custom-pagination"
          />
        </div>
      </div>
      {/* Modal */}
      <Modal
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        width={600}
        title="Order Detail"
      >
        {selectedOrder && (
          <div className="space-y-4 text-gray-700">
            <p>
              <span className="font-semibold">Payment method:</span>{" "}
              {selectedOrder.paymentMethod}
            </p>
            <div className="grid grid-cols-2 gap-4 border rounded-md p-4">
              <div>
                <p className="font-semibold">Billed to</p>
                <p>
                  {selectedOrder.billingDetails.firstName +
                    " " +
                    selectedOrder.billingDetails.lastName}
                </p>
                <p>{selectedOrder.billingDetails.email}</p>
              </div>
              <div>
                <p className="font-semibold">Billed date</p>
                <p>{new Date(selectedOrder.createdAt)?.toDateString()}</p>
              </div>
              <div className="col-span-2">
                <p className="font-semibold">Email</p>
                <p>{selectedOrder.billingDetails.email}</p>
                <p className="mt-2 font-semibold">Phone</p>
                <p>{selectedOrder.billingDetails.phone}</p>
                <p className="mt-2 font-semibold">Address</p>
                <p>{selectedOrder.billingDetails.street}</p>
                <p>{selectedOrder.billingDetails.city}</p>
                <p>{selectedOrder.billingDetails.country}</p>
                <p>{selectedOrder.billingDetails.postcode ?? ""}</p>
              </div>
            </div>

            <div className="mt-4 border-t pt-2 overflow-auto w-full">
              <div className="grid grid-cols-5 font-semibold border-b pb-1">
                <span>Item</span>
                <span>Quantity</span>
                <span>Color</span>
                <span>Storage</span>
                <span>Rate</span>
              </div>
              {selectedOrder?.items?.map((item: any) => (
                <div
                  key={item.product._id}
                  className="grid grid-cols-5 py-1 border-b"
                >
                  <span>{item.product.name}</span>
                  <span>{item.quantity}</span>
                  <span>{item.color}</span>
                  <span>{item.storage}</span>
                  {/* <span>${item.product.priceStorage?.find((i: any) => i.storage === item.storage)?.price}</span> */}
                  <span>
                    {currency}{" "}
                    {convertPrice(
                      Number(
                        Number(
                          item.product.priceStorage?.find(
                            (i: any) => i.storage === item.storage
                          )?.price
                        ) * Number(item.quantity)
                      ),
                      currency,
                      rate
                    )?.toFixed(2)}
                  </span>
                </div>
              ))}
              {/* <div className="grid grid-cols-4 py-1 font-semibold">
                <span>Subtotal</span>
                <span></span>
                <span></span>
                <span>$1600.00</span>
              </div> */}
              <div className="grid grid-cols-5 py-1 font-semibold text-lg">
                <span>Total</span>
                <span></span>
                <span></span>
                <span></span>
                <span>
                  {currency}{" "}
                  {convertPrice(Number(selectedOrder?.totalPrice), currency, rate)?.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
