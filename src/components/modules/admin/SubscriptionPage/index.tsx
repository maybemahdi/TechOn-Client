"use client";

import Loading from "@/components/ui/core/Loading/Loading";
import { useGetAllSubscribersQuery } from "@/redux/features/admin/admin.api";
import { Button, Pagination, Typography } from "antd";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const { Title } = Typography;

interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}


const SubscriptionPage: React.FC = () => {
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

  const { data: response, isLoading } = useGetAllSubscribersQuery(objectQuery);
  const subscribers: Subscriber[] = response?.data?.result || [];

  // Mock data for subscribers
  // const subscribers: Subscriber[] = [
  //   { id: "1", date: "15 September, 2025", email: "email@example.com" },
  //   { id: "2", date: "15 September, 2025", email: "email@example.com" },
  //   { id: "3", date: "15 September, 2025", email: "email@example.com" },
  //   { id: "4", date: "15 September, 2025", email: "email@example.com" },
  //   { id: "5", date: "15 September, 2025", email: "email@example.com" },
  //   { id: "6", date: "15 September, 2025", email: "email@example.com" },
  //   { id: "7", date: "15 September, 2025", email: "email@example.com" },
  //   { id: "8", date: "15 September, 2025", email: "email@example.com" },
  // ];

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-fit">
      <Title level={2} className="!mb-8 !text-black !font-semibold">
        Subscribers
      </Title>

      <div className="space-y-6 shadow-md p-5 rounded-md">
        {/* Table Headers */}
        <div className="flex justify-between items-center pb-2">
          <div className="flex-1">
            <h3 className="text-base font-medium text-black border-b-2 border-black inline-block pb-1">
              Date
            </h3>
          </div>
          <div className="flex-1">
            <h3 className="text-base font-medium text-black border-b-2 border-black inline-block pb-1">
              Email
            </h3>
          </div>
          <div className="w-32"></div>
        </div>

        {/* Subscriber Rows */}
        <div className="space-y-4">
          {subscribers?.map((subscriber) => (
            <div
              key={subscriber?.id}
              className="flex flex-col gap-3 sm:flex-row justify-between sm:items-center py-2"
            >
              <div className="flex-1">
                <span className="text-base text-black">
                  {new Date(subscriber?.createdAt).toDateString()}
                </span>
              </div>
              <div className="flex-1">
                <span className="text-base text-black">
                  {subscriber?.email}
                </span>
              </div>
              <div className="w-32">
                <Button
                  type="default"
                  size="small"
                  onClick={() => {
                    if (navigator.clipboard && window.isSecureContext) {
                      navigator.clipboard
                        .writeText(subscriber?.email)
                        .then(() => toast.success("Copied to clipboard"))
                        .catch(() => toast.error("Failed to copy"));
                    } else {
                      // Fallback for non-secure (HTTP) or older browsers
                      const textArea = document.createElement("textarea");
                      textArea.value = subscriber?.email;
                      textArea.style.position = "fixed";
                      textArea.style.left = "-9999px";
                      document.body.appendChild(textArea);
                      textArea.focus();
                      textArea.select();
                      try {
                        document.execCommand("copy");
                        toast.success("Copied to clipboard");
                      } catch (err) {
                        toast.error("Failed to copy");
                      }
                      document.body.removeChild(textArea);
                    }
                  }}
                  style={{
                    backgroundColor: "#fbbf24",
                    borderColor: "#fbbf24",
                    color: "#000",
                    fontWeight: "500",
                    height: "28px",
                    fontSize: "12px",
                  }}
                  className="!bg-yellow-500 hover:!bg-yellow-500 hover:!border-yellow-500 !text-white"
                >
                  Click to copy
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-center w-fit mx-auto gap-4 my-8">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={response?.data?.meta?.total}
          onChange={handlePageChange}
          className="custom-pagination"
        />
      </div>
    </div>
  );
};

export default SubscriptionPage;
