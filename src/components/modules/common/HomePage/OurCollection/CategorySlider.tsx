"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function CategorySlider({
  categories,
  selectedCategory,
  onSelect,
}: {
  categories: string[];
  selectedCategory: string;
  onSelect: (cat: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth * 0.6; // how much to scroll per click
    scrollRef.current.scrollTo({
      left:
        dir === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  // Animation variants
  const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  const fadeUpItem = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="relative mb-12"
    >
      <div className="flex items-center">
        {/* Left Arrow */}
        <div
          className="rounded-full p-[2px] gradient-border mr-4"
          aria-hidden="true"
        >
          <button
            onClick={() => scroll("left")}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-core-gradient shadow-md hover:shadow-lg transition-shadow"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Scrollable Categories */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-x-auto scroll-smooth scrollbar-hide"
        >
          <div className="flex gap-3 px-2 w-max">
            {categories.map((category) => (
              <motion.div key={category} variants={fadeUpItem}>
                <div
                  className={`rounded-lg p-[2px] ${
                    selectedCategory === category
                      ? "gradient-border shadow-lg"
                      : "border border-transparent"
                  }`}
                >
                  <button
                    onClick={() => onSelect(category)}
                    className={`whitespace-nowrap  px-4 py-3 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${
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
          </div>
        </div>

        {/* Right Arrow */}
        <div
          className="rounded-full p-[2px] gradient-border ml-4"
          aria-hidden="true"
        >
          <button
            onClick={() => scroll("right")}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-core-gradient shadow-md hover:shadow-lg transition-shadow"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
