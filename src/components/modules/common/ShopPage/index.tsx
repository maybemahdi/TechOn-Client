"use client";
import Link from "next/link";
import { ProductsGrid } from "./ProductsGrid/ProductsGrid";
import { ShopSidebar } from "./ShopSidebar/ShopSidebar";
import FooterDark from "@/components/shared/Footer/FooterDark";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Drawer, Button, Input } from "antd";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const filterableOptions = ["l2h", "h2l"];

export default function ShopPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [activeCategory, setActiveCategory] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // if (true) {
  //   return (
  //     <div className="h-[calc(100vh-100px)] flex items-center justify-center text-3xl font-bold text-red-500">
  //       The page is under construction
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-black">
      {/* Breadcrumb */}
      <motion.div
        className="container mx-auto px-4 md:px-8 py-8 text-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 30 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href={"/"} className="text-gray-400">
              Home
            </Link>
            <span className="text-gray-400">{">"}</span>
            <span className="text-white">Shop</span>
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
            <Input
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              allowClear
              suffix={
                <SearchOutlined
                  style={{ cursor: "pointer", color: "#1890ff" }}
                />
              }
              className="w-full md:w-80"
            />

            <div className="flex gap-2 mt-2 md:mt-0">
              {filterableOptions.map((option) => (
                <motion.button
                  key={option}
                  onClick={() => setSelectedFilter(option)}
                  className={cn(
                    "px-4 py-2 bg-gray-600 text-white rounded-full text-sm hover:bg-orange-500 transition-colors duration-300",
                    { "bg-orange-500": selectedFilter === option }
                  )}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {option === "l2h" ? "Low to High" : "High to Low"}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:hidden mb-4">
            <Button
              type="primary"
              icon={<MenuOutlined />}
              onClick={() => setDrawerVisible(true)}
              className="bg-orange-500 border-orange-500 hover:bg-orange-600"
            >
              Filters
            </Button>
          </div>

          <motion.div
            className="hidden lg:block lg:w-1/4"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <ShopSidebar
              activeTag={activeTag}
              setActiveTag={setActiveTag}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </motion.div>

          <Drawer
            title="Filters"
            placement="left"
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            className="lg:hidden"
            styles={{
              body: { backgroundColor: "#000", padding: 0 },
              header: {
                backgroundColor: "#000",
                borderBottom: "1px solid #333",
                color: "#fff",
              },
            }}
          >
            <div className="bg-black text-white">
              <ShopSidebar
                activeTag={activeTag}
                setActiveTag={setActiveTag}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </div>
          </Drawer>

          {/* Products Grid */}
          <motion.div
            className="lg:w-3/4 flex flex-col gap-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <ProductsGrid
              sortBy={selectedFilter}
              activeTag={activeTag}
              setActiveTag={setActiveTag}
              category={activeCategory}
              maxPrice={priceRange[1]}
              search={searchValue}
            />
          </motion.div>
        </div>
      </div>

      <FooterDark />
    </div>
  );
}
