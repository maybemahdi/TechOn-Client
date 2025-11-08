"use client";

import ProductCard from "@/components/shared/ProductCard/ProductCard";
import ProductCardSkeleton from "@/components/shared/ProductCard/ProductCardSkeleton";
import { useGetAllProductQuery } from "@/redux/features/product/product.api";
import { Product } from "@/types/product";
import { Pagination } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ProductsGrid({
  sortBy,
  category,
  activeTag,
  setActiveTag,
  maxPrice,
  search,
}: {
  sortBy: string;
  category: string;
  activeTag: string;
  setActiveTag: (tag: string) => void;
  maxPrice: number;
  search: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
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
    const queryArr: any = [
      {
        name: "page",
        value: currentPage,
      },
      {
        name: "limit",
        value: pageSize,
      },
    ];
    if (search?.trim()) {
      queryArr.push({ name: "search", value: search });
    }
    if (sortBy?.trim()) {
      queryArr.push({ name: "sortBy", value: sortBy });
    }
    if (category?.trim()) {
      queryArr.push({ name: "category", value: category });
    }
    if (activeTag?.trim()) {
      queryArr.push({ name: "tag", value: activeTag });
    }
    setObjectQuery(queryArr);
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (search?.trim()) {
      setObjectQuery([
        {
          name: "page",
          value: currentPage,
        },
        {
          name: "limit",
          value: pageSize,
        },
        { name: "search", value: search },
      ]);
    }
  }, [search]);

  useEffect(() => {
    const newQueries = [];
    newQueries.push({ name: "page", value: 1 });
    newQueries.push({ name: "limit", value: pageSize });
    if (sortBy?.trim()) newQueries.push({ name: "sortBy", value: sortBy });
    if (category?.trim())
      newQueries.push({ name: "category", value: category });
    if (activeTag?.trim()) newQueries.push({ name: "tag", value: activeTag });
    if (maxPrice && maxPrice !== 2000)
      newQueries.push({ name: "maxPrice", value: maxPrice });

    if (newQueries.length > 0) setObjectQuery(newQueries);
  }, [sortBy, category, activeTag, maxPrice]);

  const {
    data: productsResponse,
    isLoading: isProductsLoading,
    isFetching: isProductsFetching,
  } = useGetAllProductQuery(objectQuery);
  const products: Product[] = productsResponse?.data?.data;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <>
      {category === "SmartMobiles" && (
        <motion.div
          className="flex flex-wrap justify-center gap-3 p-4 bg-gray-50 dark:bg-neutral-800 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-700 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {["iOS", "Android"].map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveTag(filter);
                setCurrentPage(1);
              }}
              className={`px-5 py-2.5 text-sm font-medium rounded-full border transition-colors duration-200
          ${
            activeTag === filter
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-neutral-700 dark:text-gray-100 dark:hover:bg-neutral-600"
          }
        `}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>
      )}
      <motion.div
        className="space-y-6"
        // initial="hidden"
        // whileInView="show"
        // viewport={{ once: true, amount: 0.2 }}
      >
        {/* Products Grid */}
        {!isProductsLoading && !isProductsFetching && products?.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {products?.map((product: Product, idx: number) => (
              <motion.div key={idx} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          ""
        )}

        {!isProductsLoading && !isProductsFetching && products?.length === 0 ? (
          <motion.p
            className="text-center text-gray-500 mt-10"
            variants={itemVariants}
          >
            No products found.
          </motion.p>
        ) : (
          ""
        )}

        {isProductsLoading || isProductsFetching ? (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6"
          >
            {Array.from({ length: 6 })?.map((_, index: number) => (
              <motion.div key={index} variants={itemVariants}>
                <ProductCardSkeleton />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          ""
        )}

        {/* Pagination */}
        <motion.div
          className="flex items-center justify-center w-fit mx-auto gap-4 !mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={productsResponse?.data?.meta?.total}
            onChange={handlePageChange}
            className="custom-pagination"
          />
        </motion.div>
      </motion.div>
    </>
  );
}
