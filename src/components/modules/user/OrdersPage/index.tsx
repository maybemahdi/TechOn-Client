"use client";
import Loading from "@/components/ui/core/Loading/Loading";
import MyButton from "@/components/ui/core/MyButton/MyButton";
import { useGetMyOrdersQuery } from "@/redux/features/order/order.api";
import { Form, Input, Modal, Rate } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { Order } from "../OverviewPage";
import { useCreateReviewMutation } from "@/redux/features/product/product.api";
import { toast } from "sonner";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { convertPrice } from "@/utils/convertCurrency";

const AllOrdersPage: React.FC = () => {
  //currency and rate
  const { currency, rate } = useSelector((state: RootState) => state.currency);

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [objectQuery, setObjectQuery] = useState<
    { name: string; value: any }[]
  >([
    {
      name: "page",
      value: currentPage,
    },
    {
      name: "limit",
      value: entriesPerPage,
    },
  ]);
  const [selectedProduct, setSelectedProduct] = useState<{
    productId: string;
    productName: string;
  } | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [createReview] = useCreateReviewMutation();
  const handleSubmit = async (values: { rating: number; review: string }) => {
    setLoading(true);
    try {
      const res = await createReview({
        productId: selectedProduct!.productId,
        data: {
          rating: values.rating,
          comment: values.review,
        },
      });

      if (res?.data?.success) {
        toast.success("Review submitted successfully!");
        form.resetFields();
        setIsModalOpen(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetMyOrdersQuery(objectQuery);
  const orders: Order[] = response?.data?.orders;
  // if any order includes multiple products then every single product should have single row in table
  // Transform nested order items into individual product rows
  const refactoredOrders =
    orders?.flatMap((order) =>
      order.items?.map((item) => ({
        productId: item.product?.id,
        orderId: order.id,
        orderCode: order.orderCode,
        quantity: item.quantity,
        status: order.status,
        createdAt: order.createdAt,
        productName: item.product?.name,
        productPrice: order?.totalPrice,
        totalItems: order.items?.length,
        category: item.product?.category,
      }))
    ) || [];

  const totalPages = response?.data?.totalPages || 1;
  // const startIndex = (currentPage - 1) * entriesPerPage;
  // const endIndex = startIndex + entriesPerPage;
  // const currentOrders = orders.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEntriesChange = (entries: number) => {
    setEntriesPerPage(entries);
    setCurrentPage(1);
  };

  const getPaginationRange = (currentPage: number, totalPages: number) => {
    const range = [];
    const showPages = 5; // Number of page buttons to show

    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + showPages - 1);

    // Adjust start if we're near the end
    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      range.push(1);
      if (startPage > 2) {
        range.push("...");
      }
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    // Add last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        range.push("...");
      }
      range.push(totalPages);
    }

    return range;
  };

  const PaginationButton: React.FC<{
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    active?: boolean;
  }> = ({ children, onClick, disabled = false, active = false }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1 text-sm border rounded transition-colors duration-200 ${
        active
          ? "bg-blue-500 text-white border-blue-500"
          : disabled
          ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
          : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
      }`}
    >
      {children}
    </button>
  );

  if (isLoading || isFetching) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <span className="cursor-pointer hover:text-gray-900 transition-colors">
            Home
          </span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-gray-900 font-medium">Orders</span>
        </div>

        {/* Header with Title and Filters */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">All Orders</h1>

          {/* Filter Options */}
          {/* <div className="flex items-center space-x-4">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="Month">Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="Year">Year</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div> */}
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {refactoredOrders.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.orderCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {currency} {" "} {convertPrice(row?.productPrice, currency, rate).toFixed(2)} {" "}
                      for {row.totalItems}{" "}
                      {row.totalItems > 1 ? "items" : "item"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(row.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 flex items-center gap-2 whitespace-nowrap text-sm text-gray-900">
                      <Link href={`/shop/${row.productId}`}>
                        <MyButton
                          label="View"
                          className="py-1 px-2 text-sm rounded-lg"
                        />
                      </Link>
                      {/* <MyButton
                        onClick={() => {
                          setSelectedProduct({
                            productId: row.productId,
                            productName: row.productName,
                          });
                          setIsModalOpen(true);
                        }}
                        label="Review"
                        className="py-1 px-2 text-sm rounded-lg"
                      /> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer with Entries selector and Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            {/* Entries selector */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Entries</span>
              <select
                value={entriesPerPage}
                onChange={(e) => handleEntriesChange(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={6}>6</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            {/* Pagination */}
            <div className="flex items-center space-x-1">
              <PaginationButton
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ←
              </PaginationButton>

              {getPaginationRange(currentPage, totalPages).map((page, index) =>
                typeof page === "number" ? (
                  <PaginationButton
                    key={index}
                    onClick={() => handlePageChange(page)}
                    active={page === currentPage}
                  >
                    {page}
                  </PaginationButton>
                ) : (
                  <span key={index} className="px-2 text-gray-500">
                    {page}
                  </span>
                )
              )}

              <PaginationButton
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                →
              </PaginationButton>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={600}
      >
        <div className="text-center space-y-3 mb-6">
          <h2 className="text-2xl font-semibold">
            Review for {selectedProduct?.productName || "Product"}
          </h2>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ rating: 0 }}
        >
          <Form.Item
            label="Write a review"
            name="rating"
            rules={[{ required: true, message: "Please provide a rating!" }]}
          >
            <Rate />
          </Form.Item>

          <Form.Item
            name="review"
            rules={[
              { required: true, message: "Please write your review!" },
              { min: 10, message: "Review must be at least 10 characters." },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Write review..." />
          </Form.Item>

          <Form.Item>
            <MyButton type="submit" label="Submit" fullWidth />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AllOrdersPage;
