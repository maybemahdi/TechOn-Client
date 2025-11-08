"use client";

import ProductCard from "@/components/shared/ProductCard/ProductCard";
import ProductCardSkeleton from "@/components/shared/ProductCard/ProductCardSkeleton";
import Loading from "@/components/ui/core/Loading/Loading";
import { Carousel } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  useGetAllCategoriesQuery,
  useGetAllProductQuery,
} from "@/redux/features/product/product.api";
import { motion } from "framer-motion";
import { PriceStorage } from "@/types/product";

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  // price: number;
  priceStorage: PriceStorage[];
  images: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
}

export default function OurCollection() {
  const [selectedCategory, setSelectedCategory] = useState("SmartMobiles");
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<any>(null);

  const { data: categoriesResponse, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery({});

  const categories: string[] = useMemo(
    () =>
      categoriesResponse?.data?.map((category: Category) => category.name) ||
      [],
    [categoriesResponse]
  );

  useEffect(() => {
    setSelectedCategory(categories[0]);
  }, [categories]);

  const {
    data: productsResponse,
    isLoading: isProductsLoading,
    isFetching: isProductsFetching,
  } = useGetAllProductQuery(
    [
      { name: "category", value: selectedCategory },
      { name: "page", value: 1 },
      { name: "limit", value: 12 },
    ],
    {
      skip: !selectedCategory,
    }
  );

  const products: Product[] = productsResponse?.data?.data || [];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const visibleSlides = 5;

  const nextSlide = () => {
    const totalSlides = categories.length;
    if (currentSlide + visibleSlides < totalSlides) {
      carouselRef.current?.next();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      carouselRef.current?.prev();
    }
  };

  // Framer Motion Variants
  const staggerContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeUpItem = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  if (isCategoriesLoading) return <Loading />;

  return (
    <section className="py-16 px-4 bg-black/90">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Our Collection
          </div>
          <h2 className="text-4xl font-bold text-white mb-8">
            Explore Our Collection
          </h2>
        </motion.div>

        {/* Category Slider */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative mb-12"
        >
          <div className="flex items-center">
            {/* Prev Button */}
            <div
              className="rounded-full p-[2px] gradient-border mr-4"
              aria-hidden="true"
            >
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className={`flex items-center justify-center w-10 h-10 rounded-full 
                ${
                  currentSlide === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-core-gradient hover:shadow-lg"
                } 
                shadow-md transition-shadow`}
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Carousel */}
            <div className="flex-1 overflow-hidden">
              <Carousel
                ref={carouselRef}
                dots={false}
                infinite={false}
                slidesToShow={visibleSlides}
                slidesToScroll={1}
                beforeChange={(current, next) => setCurrentSlide(next)}
                responsive={[
                  { breakpoint: 1024, settings: { slidesToShow: 4 } },
                  { breakpoint: 768, settings: { slidesToShow: 2 } },
                  { breakpoint: 480, settings: { slidesToShow: 1 } },
                ]}
              >
                {categories.map((category) => (
                  <motion.div
                    key={category}
                    variants={fadeUpItem}
                    className="px-2"
                  >
                    <div
                      className={`rounded-lg p-[2px] gradient-border ${
                        selectedCategory === category ? "shadow-lg" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <button
                        onClick={() => handleCategoryChange(category)}
                        className={`w-full px-3 text-nowrap py-3 rounded-lg whitespace-nowrap text-xs md:text-sm font-medium transition-all duration-300 ${
                          selectedCategory === category
                            ? "bg-core-gradient text-white"
                            : "bg-[#191919] text-white hover:bg-core-gradient"
                        }`}
                      >
                        {category}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </Carousel>
            </div>

            {/* Next Button */}
            <div
              className="rounded-full p-[2px] gradient-border ml-4"
              aria-hidden="true"
            >
              <button
                onClick={nextSlide}
                disabled={currentSlide + visibleSlides >= categories.length}
                className={`flex items-center justify-center w-10 h-10 rounded-full 
                ${
                  currentSlide + visibleSlides >= categories.length
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-core-gradient hover:shadow-lg"
                } 
                shadow-md transition-shadow`}
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        {!isProductsLoading && !isProductsFetching && products.length > 0 ? (
          <motion.div
            key={selectedCategory}
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {products.map((product: Product) => (
              <motion.div key={product.id} variants={fadeUpItem}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : null}

        {/* Skeletons */}
        {(isProductsLoading || isProductsFetching || products.length === 0) && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <motion.div key={index} variants={fadeUpItem}>
                <ProductCardSkeleton />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
