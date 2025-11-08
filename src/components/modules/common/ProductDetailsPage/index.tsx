"use client";

import Footer from "@/components/shared/Footer/Footer";
import Loading from "@/components/ui/core/Loading/Loading";
import {
  useGetBestSellingQuery,
  useGetSingleProductQuery,
} from "@/redux/features/product/product.api";
import { Empty } from "antd";
import { motion } from "framer-motion";
import Link from "next/link";
import BestSelling from "../CartPage/BestSelling/BestSelling";
import { ProductDetailsSection } from "./ProductDetailsSection/ProductDetailsSection";
import { ProductTabs } from "./ProductTabs/ProductTabs";

const ProductDetailsPage = ({ id }: { id: string }) => {
  const { data: response, isLoading } = useGetSingleProductQuery(id);
  const category = response?.data?.category;
  const {
    data: responseOfBestSellingProducts,
    isLoading: isBestSellingProductsLoading,
  } = useGetBestSellingQuery(
    [
      {
        name: "page",
        value: 1,
      },
      {
        name: "limit",
        value: 7,
      },
      // {
      //   name: "category",
      //   value: category,
      // },
    ]
    // {
    //   skip: !category,
    // }
  );

  if (isLoading || isBestSellingProductsLoading) return <Loading />;

  if (!response?.data)
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <Empty description="Product not found" />
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      <motion.div
        // initial={{ opacity: 0, y: 30 }}
        // whileInView={{ opacity: 1, y: 0 }}
        // viewport={{ once: true, amount: 0.3 }}
        className="container mx-auto px-4 py-6"
      >
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm py-8 w-fit">
          <Link href={"/"} className="text-black">
            Home
          </Link>
          <span className="text-gray-400">{">"}</span>
          <Link href={"/shop"} className="text-black">
            Shop
          </Link>
          <span className="text-gray-400">{">"}</span>
          <span className="text-black">Product Details</span>
        </div>

        {/* Product Details Section */}
        <motion.div
          // initial={{ opacity: 0, y: 30 }}
          // whileInView={{ opacity: 1, y: 0 }}
          // viewport={{ once: true, amount: 0.3 }}
        >
          <ProductDetailsSection productData={response?.data} />
        </motion.div>

        {/* Product Tabs Section */}
        <motion.div
          // initial={{ opacity: 0, y: 30 }}
          // whileInView={{ opacity: 1, y: 0 }}
          // viewport={{ once: true, amount: 0.3 }}
          className="mt-12"
        >
          <ProductTabs productData={response?.data} />
        </motion.div>

        {/* specifications set dangerouslySetInnerHTML={{ __html: productData?.specifications || "" }} */}
        <motion.div
          // initial={{ opacity: 0, y: 30 }}
          // whileInView={{ opacity: 1, y: 0 }}
          // viewport={{ once: true, amount: 0.3 }}
          className="mt-12"
        >
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: response?.data?.specs || "",
              }}
            />
          </div>
        </motion.div>

        {/* Related Products Section */}
        {responseOfBestSellingProducts?.data?.data?.length > 0 ? (
          <motion.div
            // initial={{ opacity: 0, y: 30 }}
            // whileInView={{ opacity: 1, y: 0 }}
            // viewport={{ once: true, amount: 0.3 }}
            className="mt-12"
          >
            <BestSelling
              bg="bg-white"
              products={responseOfBestSellingProducts?.data?.data}
            />
          </motion.div>
        ) : (
          ""
        )}
      </motion.div>
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
