"use client";

import MyGradientButton from "@/components/ui/core/MyButton/MyGradientButton";
import {
  useGetAllCategoriesQuery,
  useGetAllTagsQuery,
  useGetBestSellingQuery,
} from "@/redux/features/product/product.api";
import { Skeleton } from "antd";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Category } from "../../HomePage/OurCollection/OurCollection";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import { useState } from "react";

// const categories = [
//   { name: "Smart Mobiles", active: true },
//   { name: "iPad & TabZone", active: false },
//   { name: "Laptop & MacBook", active: false },
//   { name: "WristTech", active: false },
//   { name: "Tech Essentials", active: false },
//   { name: "Bass & Beats Lab", active: false },
//   { name: "Smart Surveillance", active: false },
//   { name: "Tool Tech", active: false },
//   { name: "PetTech", active: false },
//   { name: "Console Corner", active: false },
//   { name: "VR World", active: false },
//   { name: "Fitness & Wellness Tech", active: false },
//   { name: "Smart Home", active: false },
//   { name: "KidsZone", active: false },
// ];

// const bestSellerProducts = [
//   {
//     id: 1,
//     name: "Essential Comfort T-Shirt",
//     price: 50.0,
//     rating: 4.7,
//     image: "https://i.ibb.co.com/V0zwxxvy/elegant-smartphone-composition.jpg",
//   },
//   {
//     id: 2,
//     name: "Wireless Bass Headphones",
//     price: 120.0,
//     rating: 4.9,
//     image: "https://i.ibb.co.com/V0zwxxvy/elegant-smartphone-composition.jpg",
//   },
//   {
//     id: 3,
//     name: "4K Smart TV Stick",
//     price: 80.0,
//     rating: 4.5,
//     image: "https://i.ibb.co.com/V0zwxxvy/elegant-smartphone-composition.jpg",
//   },
//   {
//     id: 4,
//     name: "Pro Gaming Mouse",
//     price: 45.0,
//     rating: 4.6,
//     image: "https://i.ibb.co.com/V0zwxxvy/elegant-smartphone-composition.jpg",
//   },
//   {
//     id: 5,
//     name: "Fitness Smart Watch",
//     price: 150.0,
//     rating: 4.8,
//     image: "https://i.ibb.co.com/V0zwxxvy/elegant-smartphone-composition.jpg",
//   },
// ];

// const productTags = [
//   "mobile",
//   "laptop",
//   "watch",
//   "computer",
//   "sweater",
//   "tank top",
//   "gaming",
//   "headphones",
// ];

export function ShopSidebar({
  activeTag,
  setActiveTag,
  setActiveCategory,
  activeCategory,
  priceRange,
  setPriceRange,
}: {
  activeTag: string;
  setActiveTag: React.Dispatch<React.SetStateAction<string>>;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  activeCategory: string;
  priceRange: number[];
  setPriceRange: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const router = useRouter();

  const [tagPage, setTagPage] = useState(1);
  const tagsPerPage = 10; // Adjust this for items per page

  const { data: categoriesResponse, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery({});
  const categories: string[] = categoriesResponse?.data?.map(
    (category: Category) => category.name
  );

  const { data: responseOfTags, isLoading: isTagsLoading } = useGetAllTagsQuery(
    {}
  );
  const productTags: string[] = responseOfTags?.data || [];
  // const productTags = [
  //   "iphone",
  //   "smartphone",
  //   "ios",
  //   "android",
  //   "wireless earbuds",
  //   "dual sim",
  //   "samsung",
  //   "smartwatch",
  // ];

  const {
    data: responseOfBestSellingProducts,
    isLoading: isBestSellingProductsLoading,
  } = useGetBestSellingQuery([
    {
      name: "page",
      value: 1,
    },
    {
      name: "limit",
      value: 5,
    },
  ]);
  const bestSellerProducts: Product[] =
    responseOfBestSellingProducts?.data?.data;

  // Animation Variants
  const sectionVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const listVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  // Pagination logic
  const indexOfLastTag = tagPage * tagsPerPage;
  const indexOfFirstTag = indexOfLastTag - tagsPerPage;
  const currentTags = productTags.slice(indexOfFirstTag, indexOfLastTag);
  const totalTagPages = Math.ceil(productTags.length / tagsPerPage);

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={listVariant}
    >
      {/* Category Section */}
      <motion.div
        variants={sectionVariant}
        className="rounded-lg px-4 bg-transparent -mt-1"
      >
        <h3 className="text-white font-semibold mb-4 border-l-2 bg-gray-500/30 border-orange-500 px-3 py-2 rounded">
          Category
        </h3>
        {isCategoriesLoading ? (
          <div>
            <Skeleton style={{ height: 30 }} />
            <Skeleton style={{ height: 30 }} />
            <Skeleton style={{ height: 30 }} />
            <Skeleton style={{ height: 30 }} />
            <Skeleton style={{ height: 30 }} />
          </div>
        ) : (
          ""
        )}
        {!isCategoriesLoading && categories?.length > 0 ? (
          <motion.div className="space-y-2" variants={listVariant}>
            {categories?.map((category) => (
              <div
                key={category}
                className={`rounded-lg p-[2px] gradient-border ${
                  activeCategory === category ? "shadow-lg" : ""
                }`}
                aria-hidden="true"
              >
                <motion.button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setActiveTag("");
                  }}
                  variants={itemVariant}
                  // whileHover={{ scale: 1.03, x: 5 }}
                  // whileTap={{ scale: 0.95 }}
                  className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    activeCategory === category
                      ? "bg-core-gradient text-white"
                      : "bg-[#191919] text-white hover:bg-core-gradient"
                  }`}
                >
                  {category}
                </motion.button>
              </div>
            ))}
          </motion.div>
        ) : (
          ""
        )}
      </motion.div>

      {/* Price Filter Section */}
      <motion.div
        variants={sectionVariant}
        className="rounded-lg p-4 bg-transparent"
      >
        <h3 className="text-white font-semibold mb-4 border-l-2 bg-gray-500/30 border-orange-600 px-3 py-2 rounded">
          Filter by price
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-300">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="5000"
              step="10"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number.parseInt(e.target.value)])
              }
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider accent-orange-500"
            />
          </div>
        </div>
      </motion.div>

      {/* Best Seller Section */}
      {/* {!isBestSellingProductsLoading && bestSellerProducts?.length > 0 && (
        <motion.div
          variants={sectionVariant}
          className="rounded-lg p-4 bg-transparent"
        >
          <h3 className="text-white font-semibold mb-4 border-l-2 bg-gray-500/30 border-orange-600 px-3 py-2 rounded">
            Best Seller
          </h3>
          <motion.div className="space-y-3" variants={listVariant}>
            {bestSellerProducts?.map((product: any, index: number) => (
              <motion.div
                onClick={() => router.push(`/shop/${product.id}`)}
                key={index}
                variants={itemVariant}
                whileHover={{ scale: 1.02 }}
                className="flex cursor-pointer items-center gap-3 p-2 rounded hover:bg-gray-800 transition-colors"
              >
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-12 h-12 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-white text-sm font-medium truncate">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-400">
                      {product.averageRating}
                    </span>
                  </div>
                  <p className="text-orange-400 text-sm font-semibold">
                    $
                    {product?.priceStorage
                      ?.map((p: any) => p.price)
                      ?.join(" - $")}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )} */}

      {/* Product Tags Section */}
      <motion.div
        variants={sectionVariant}
        className="rounded-lg p-4 bg-transparent"
      >
        <h3 className="text-white font-semibold mb-4 border-l-2 bg-gray-500/30 border-orange-600 px-3 py-2 rounded">
          Product tags
        </h3>
        <motion.div
          className="flex flex-wrap gap-2"
          variants={listVariant}
          initial="hidden"
          animate="visible"
        >
          {isTagsLoading ? (
            <div className="w-full flex justify-center items-center">
              <Skeleton style={{ height: 30 }} />
              <Skeleton style={{ height: 30 }} />
              <Skeleton style={{ height: 30 }} />
            </div>
          ) : (
            ""
          )}
          {!isTagsLoading && currentTags?.length > 0
            ? currentTags?.map((tag) => (
                <MyGradientButton
                  key={tag}
                  variant="secondary"
                  label={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`text-[10px] !px-16 !py-4 ${
                    activeTag === tag ? "!bg-orange-500" : ""
                  }`}
                  isActive={activeTag === tag}
                />
              ))
            : ""}
        </motion.div>

        {/* Pagination Buttons */}
        {!isTagsLoading && totalTagPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <button
              disabled={tagPage === 1}
              onClick={() => setTagPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-white px-2 py-1">
              {tagPage} / {totalTagPages}
            </span>
            <button
              disabled={tagPage === totalTagPages}
              onClick={() =>
                setTagPage((prev) => Math.min(prev + 1, totalTagPages))
              }
              className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
