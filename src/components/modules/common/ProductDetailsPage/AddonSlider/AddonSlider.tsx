"use client";
import { useGetAllCategoriesQuery } from "@/redux/features/product/product.api";
import { Carousel, Skeleton } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Category } from "../../HomePage/OurCollection/OurCollection";

const addonCategories = [
  "SmartMobiles",
  "iPad & TabZone",
  "Laptop & MacBook Hub",
  "WriteTech",
  "Tech Essentials",
  "Bass & Beats Lab",
];

export function AddonSlider({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}) {
  const carouselRef = useRef<any>(null);

  const { data: categoriesResponse, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery({});
  const categories: string[] = categoriesResponse?.data?.map(
    (category: Category) => category.name
  );

  const nextSlide = () => {
    carouselRef.current?.next();
  };

  const prevSlide = () => {
    carouselRef.current?.prev();
  };

  if (isCategoriesLoading)
    return (
      <div>
        <Skeleton active style={{ width: "100%", height: "100%" }} />
        <Skeleton active style={{ width: "100%", height: "100%" }} />
        <Skeleton active style={{ width: "100%", height: "100%" }} />
        <Skeleton active style={{ width: "100%", height: "100%" }} />
      </div>
    );

  return (
    <div className="relative mb-12">
      <div className="flex items-center">
        {/* Left Arrow */}
        <div
          className={`rounded-full p-[2px] gradient-border mr-4`}
          aria-hidden="true"
        >
          <button
            onClick={prevSlide}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-core-gradient shadow-md hover:shadow-lg transition-shadow"
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
            draggable
            slidesToShow={2}
            slidesToScroll={1}
            responsive={[
              {
                breakpoint: 1024,
                settings: { slidesToShow: 2 },
              },
              {
                breakpoint: 768,
                settings: { slidesToShow: 2 },
              },
              {
                breakpoint: 480,
                settings: { slidesToShow: 1 },
              },
            ]}
          >
            {categories?.map((category) => (
              <div key={category} className="px-1">
                <div
                  className={`rounded-lg p-[2px] gradient-border ${
                    selectedCategory === category ? "shadow-lg" : ""
                  }`}
                  aria-hidden="true"
                >
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full px-4 py-3 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-core-gradient text-white"
                        : "bg-white text-gray-800 hover:text-white hover:bg-core-gradient"
                    }
                        `}
                  >
                    {category}
                  </button>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Right Arrow */}
        <div
          className={`rounded-full p-[2px] gradient-border ml-4`}
          aria-hidden="true"
        >
          <button
            onClick={nextSlide}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-core-gradient shadow-md hover:shadow-lg transition-shadow"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
