"use client";

import Loading from "@/components/ui/core/Loading/Loading";
import { useDeleteProductMutation } from "@/redux/features/admin/admin.api";
import { useGetAllProductQuery } from "@/redux/features/product/product.api";
import { RootState } from "@/redux/store";
import { Product } from "@/types/product";
import { convertPrice } from "@/utils/convertCurrency";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { Pagination } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function AllProductsPage() {
  //currency and rate
  const { currency, rate } = useSelector((state: RootState) => state.currency);

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
    const queryArr = [
      {
        name: "page",
        value: currentPage,
      },
      {
        name: "limit",
        value: pageSize,
      },
    ];
    setObjectQuery(queryArr);
  }, [currentPage, pageSize]);

  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetAllProductQuery(objectQuery);
  const products: Product[] = response?.data?.data;

  const [deleteProduct] = useDeleteProductMutation();
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await handleAsyncWithToast(async () => {
          return deleteProduct(id);
        }, "Deleting product...");
        if (res?.data?.success) {
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
        }
      }
    });
  };

  if (isLoading || isFetching) return <Loading />;

  return (
    <div className="min-h-[calc(100vh-105px)]">
      <div className="max-w-8xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/admin/products/create">
            <button className="flex items-center gap-2 px-4 py-2 bg-core-gradient text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
              Add Product
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products?.map((product) => (
            <div key={product.id} className={`bg-white shadow-lg rounded-xl`}>
              <div className="relative w-full h-64 bg-slate-200 rounded-t-xl flex items-center justify-center overflow-hidden p-4">
                <img
                  src={
                    product.images[0] ||
                    "https://images.unsplash.com/photo-1759352371478-6071563e058a?w=500&auto=format&fit=crop&q=60"
                  }
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 mix-blend-multiply"
                  loading="lazy"
                />
              </div>

              <div className="space-y-2 p-4">
                <h3 className="font-semibold text-xl text-gray-900">
                  {product?.name?.slice(0, 18) +
                    (product?.name?.length > 18 ? "..." : "")}
                </h3>
                {/* price storage is in this format - priceStorage: [{storage: "128GB", price: "400"}, {storage: "256GB", price: "500"}] */}
                <p className="text-gray-600 text-sm">
                  {product?.priceStorage
                    ?.map(
                      (item) =>
                        `${currency} ${convertPrice(
                          Number(item?.price),
                          currency,
                          rate
                        )?.toFixed(2)}`
                    )
                    .join(" - ")}
                </p>

                <div className="flex gap-2 pt-2">
                  <Link href={`/admin/products/edit/${product.id}`}>
                    <button className="px-4 py-2 bg-core-gradient text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-4 py-2 bg-sec-gradient text-white text-sm font-medium rounded-md hover:bg-orange-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* pagination */}
        <div className="flex items-center justify-center w-fit mx-auto gap-4 my-5">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={response?.data?.meta?.total || 0}
            onChange={handlePageChange}
            className="custom-pagination"
          />
        </div>
      </div>
    </div>
  );
}
