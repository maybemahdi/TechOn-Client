"use client";

import MyButton from "@/components/ui/core/MyButton/MyButton";
import { addProduct } from "@/redux/features/cart/cartSlice";
import { useGetAllProductQuery } from "@/redux/features/product/product.api";
import { toggleWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Product, ProductDetails } from "@/types/product";
import { Button, InputNumber, Select, Skeleton } from "antd";
import { Heart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { AddonSlider } from "../AddonSlider/AddonSlider";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaSnapchatGhost,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { FaThreads, FaXTwitter } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { convertPrice } from "@/utils/convertCurrency";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// const productImages = [
//   "https://www.apple.com/newsroom/images/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/article/Apple-iPhone-17-Pro-cosmic-orange-250909_inline.jpg.large.jpg",
//   "https://www.apple.com/newsroom/images/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/article/Apple-iPhone-17-Pro-cosmic-orange-250909_inline.jpg.large.jpg",
//   "https://www.apple.com/newsroom/images/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/article/Apple-iPhone-17-Pro-cosmic-orange-250909_inline.jpg.large.jpg",
//   "https://www.apple.com/newsroom/images/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/article/Apple-iPhone-17-Pro-cosmic-orange-250909_inline.jpg.large.jpg",
// ];

// const colorOptions = [
//   { name: "Silver", value: "silver", color: "bg-gray-300" },
//   { name: "Black", value: "black", color: "bg-black" },
//   { name: "Gold", value: "gold", color: "bg-yellow-600" },
// ];

export function ProductDetailsSection({
  productData,
}: {
  productData: ProductDetails;
}) {
  //currency and rate
  const { currency, rate } = useSelector((state: RootState) => state.currency);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState(
    productData?.images[0] || ""
  );

  const [selectedCategory, setSelectedCategory] = useState("iPhone");
  const [addOns, setAddons] = useState<Product[]>([]);

  const {
    data: productsResponse,
    isLoading: isProductsLoading,
    isFetching: isProductsFetching,
  } = useGetAllProductQuery([{ name: "category", value: selectedCategory }], {
    skip: !selectedCategory,
  });
  const products: Product[] = productsResponse?.data?.data;

  const dispatch = useAppDispatch();

  // const productData: ProductDetails = {
  //   id: "68dbc1993a045f0b1ebd40a9",
  //   name: "product4",
  //   category: "Watch",
  //   price: 99.99,
  //   color: ["red", "green"],
  //   intro: "demo intro",
  //   guide: "provide some guideline about product",
  //   sku: "N/A",
  //   tags: ["phone", "smart"],
  //   title: "Provide a title",
  //   description: "Provide a details description here about your product",
  //   faq: {
  //     question: "question1",
  //     ans: "answer1",
  //   },
  //   images: [
  //     "https://smtech-space.nyc3.digitaloceanspaces.com/1759233840681-download%20%285%29.jpeg",
  //   ],
  //   createdAt: "2025-09-30T11:40:09.530Z",
  //   updatedAt: "2025-09-30T12:04:26.090Z",
  // };

  //wishlist
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const isInWishlist = wishlist.some((item) => item.id === productData.id);

  const handleAddToCart = async () => {
    if (productData?.priceStorage?.length > 1 && !selectedStorage) {
      toast.error("Please select a storage/variant option.");
      return;
    }
    if (productData?.color?.length > 1 && !selectedColor) {
      toast.error("Please select a color option.");
      return;
    }
    setIsAddingToCart(true);
    dispatch(
      addProduct({
        ...productData,
        orderQuantity: quantity,
        color: selectedColor || productData?.color?.[0] || "N/A",
        storage:
          selectedStorage || productData?.priceStorage?.[0]?.storage || "N/A",
        price: Number(
          productData?.priceStorage?.find(
            (item) => item.storage === selectedStorage
          )?.price ||
            productData?.priceStorage?.[0]?.price ||
            0
        ),
      })
    );
    addOns.forEach((addOn) =>
      dispatch(
        addProduct({
          ...addOn,
          orderQuantity: 1,
          color: selectedColor || productData?.color?.[0] || "N/A",
          storage:
            selectedStorage || productData?.priceStorage?.[0]?.storage || "N/A",
          price: Number(
            productData?.priceStorage?.find(
              (item) => item.storage === selectedStorage
            )?.price ||
              productData?.priceStorage?.[0]?.price ||
              0
          ),
        })
      )
    );
    setIsAddingToCart(false);
    toast.success(`${quantity + addOns.length} item(s) added to cart!`);
    setQuantity(1);
    setAddons([]);
  };

  const handleBuyNow = () => {
    if (productData?.priceStorage?.length > 1 && !selectedStorage) {
      toast.error("Please select a storage/variant option.");
      return;
    }
    if (productData?.color?.length > 1 && !selectedColor) {
      toast.error("Please select a color option.");
      return;
    }
    sessionStorage.setItem(
      "productToBuy",
      JSON.stringify({
        ...productData,
        selectedStorage:
          selectedStorage || productData?.priceStorage?.[0]?.storage || "N/A",
        selectedColor: selectedColor || productData?.color?.[0] || "N/A",
        price: Number(
          productData?.priceStorage?.find(
            (item) => item.storage === selectedStorage
          )?.price ||
            productData?.priceStorage?.[0]?.price ||
            0
        ),
      })
    );
    router.push("/checkout?type=buy");
  };

  if (isProductsLoading || isProductsFetching) {
    return (
      <div>
        <Skeleton active style={{ width: "100%", height: "100%" }} />
        <Skeleton active style={{ width: "100%", height: "100%" }} />
        <Skeleton active style={{ width: "100%", height: "100%" }} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Product Images */}
      <div className="space-y-4">
        {/* Main Product Image */}
        <div className="h-auto w-auto relative overflow-hidden rounded-lg bg-slate-100 flex items-center justify-center">
          <img
            src={
              selectedImage ||
              productData?.images[0] ||
              "https://images.unsplash.com/photo-1759352371478-6071563e058a?w=500&auto=format&fit=crop&q=60"
            }
            alt={productData?.name}
            className="object-contain max-h-[400px] mx-auto transition-transform duration-300 hover:scale-105 mix-blend-multiply filter brightness-105 contrast-110"
            loading="lazy"
          />
        </div>

        {/* Thumbnail Images */}
        <div className="grid grid-cols-3 gap-2">
          {productData?.images?.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(image)}
              className="h-auto w-auto relative overflow-hidden rounded-lg bg-slate-100 flex items-center justify-center"
            >
              <img
                src={image}
                alt={productData?.name}
                className="object-contain max-h-[100px] mx-auto transition-transform duration-300 hover:scale-105 mix-blend-multiply filter brightness-105 contrast-110"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Addon Categories Slider */}
        {/* <AddonSlider
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        /> */}

        {/* Thumbnail Images for add-ons */}
        {/* <div
          className={`grid grid-cols-3 gap-2 ${
            products?.length > 0 ? "" : "hidden"
          }`}
        >
          {products?.map((p, index) => (
            <div
              key={index}
              onClick={() => {
                if (addOns?.some((item) => item.id === p.id)) {
                  setAddons(addOns.filter((item) => item.id !== p.id));
                } else {
                  setAddons([...addOns, p]);
                }
              }}
              className={`aspect-square relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-500 to-white ${
                addOns?.some((item) => item.id === p.id)
                  ? "border-4 border-blue-500"
                  : ""
              }`}
            >
              <Image
                src={
                  p?.images[0] ||
                  "https://www.apple.com/newsroom/images/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/article/Apple-iPhone-17-Pro-cosmic-orange-250909_inline.jpg.large.jpg"
                }
                alt={`AddOn ${index + 1}`}
                fill
                priority
                quality={90}
                className="object-contain rounded-md w-auto cursor-pointer hover:opacity-80 transition-opacity"
              />
            </div>
          ))}
        </div> */}
      </div>

      {/* Product Information */}
      <div className="space-y-4">
        {/* Product Price */}
        <div className="text-3xl font-bold text-gray-900">
          {selectedStorage
            ? (() => {
                const selected = productData?.priceStorage?.find(
                  (item) => item.storage === selectedStorage
                );
                return selected
                  ? `${currency} ${convertPrice(
                      Number(selected?.price),
                      currency,
                      rate
                    ).toFixed(2)}`
                  : "";
              })()
            : productData?.priceStorage
                ?.map(
                  (item) =>
                    `${currency} ${convertPrice(
                      Number(item?.price),
                      currency,
                      rate
                    ).toFixed(2)}`
                )
                .join(" - ")}
        </div>

        {/* Product Title */}
        <h1 className="text-2xl font-semibold text-gray-900">
          {productData?.name}
        </h1>

        {/* Product intro */}
        <p className="text-gray-600 leading-relaxed">{productData?.intro}</p>

        {/* Product Guide */}
        {/* <div className="text-sm font-medium text-gray-900">
          Product Guide:{" "}
          <span className="text-gray-600 leading-relaxed">
            {productData?.guide}
          </span>{" "}
        </div> */}

        {/* Color Selection */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-900">Colors:</div>
          <div className="flex flex-wrap gap-2">
            {/* {productData.color.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 bg-${color?.toLowerCase()}-500 ${
                  selectedColor === color
                    ? "border-gray-900"
                    : "border-gray-300"
                }`}
                aria-label={`Select ${color} color`}
              />
            ))} */}
            {productData.color.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-2 py-1 text-sm border rounded-md m-[2px] transition ${
                  selectedColor === color
                    ? "border-gray-900 bg-gray-100"
                    : "border-gray-300 bg-white"
                }`}
                aria-label={`Select ${color} color`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* storage variant */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-900">Storage:</div>
          <div className="flex flex-wrap gap-2">
            {productData.priceStorage.map((storage) => (
              <button
                key={storage.storage}
                onClick={() =>
                  setSelectedStorage(
                    storage.storage === "variant" ? "N/A" : storage.storage
                  )
                }
                className={`px-2 py-1 text-sm border rounded-md m-[2px] transition ${
                  selectedStorage === storage.storage
                    ? "border-gray-900 bg-gray-100"
                    : "border-gray-300 bg-white"
                }`}
                aria-label={`Select ${storage.storage} storage`}
              >
                {storage.storage !== "variant" ? storage.storage : "N/A"}
              </button>
            ))}
          </div>
        </div>

        {/* Delivery Options */}
        {/* <div className="space-y-3">
          <div className="text-sm font-medium text-gray-900">Delivery</div>
          <Select
            placeholder="Choose an option"
            className="w-full"
            size="large"
            options={[
              { value: "standard", label: "Standard Delivery (5-7 days)" },
              { value: "express", label: "Express Delivery (2-3 days)" },
              { value: "overnight", label: "Overnight Delivery" },
            ]}
          />
        </div> */}

        {/* Quantity and Add to Cart */}
        <div className="flex flex-wrap sm:flex-nowrap gap-4">
          <InputNumber
            min={1}
            value={quantity}
            onChange={(value) => setQuantity(value || 1)}
            size="large"
            className="w-48"
          />
          <MyButton
            onClick={handleAddToCart}
            isLoading={isAddingToCart}
            label="Add to Cart"
            fullWidth
          />
          <MyButton onClick={handleBuyNow} label="Buy Now" fullWidth />
        </div>

        {/* addOns count */}
        {addOns.length > 0 && (
          <div className="text-sm font-medium text-gray-900">
            Addons: {addOns.length}
            <div className="flex flex-col gap-3 mt-3">
              {addOns.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setAddons(addOns.filter((i) => i.id !== item.id));
                      }}
                      className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                    <span>{item.name}</span>
                  </div>
                  <span>
                    {item?.priceStorage
                      ?.map((item) => `$${item.price}`)
                      .join(" - ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={() => dispatch(toggleWishlist(productData))}
            icon={
              <Heart
                color={isInWishlist ? "red" : "black"}
                className={`w-4 h-4 ${isInWishlist ? "fill-red-500" : ""}`}
              />
            }
            size="large"
            className={`flex items-center gap-2`}
          >
            Add to favourite
          </Button>
          {/* <Button
            icon={<GitCompare className="w-4 h-4" />}
            size="large"
            className="flex items-center gap-2"
          >
            Compare
          </Button> */}
        </div>

        {/* Product Meta Information */}
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium">SKU:</span> {productData?.sku}
          </div>
          <div>
            <span className="font-medium">Category:</span>{" "}
            {productData?.category}
          </div>
          <div>
            <span className="font-medium">Tags:</span>{" "}
            {productData?.tags?.join(", ")}
          </div>
        </div>

        {/* Social Share */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-900">Share:</div>
          <div className="flex space-x-4">
            {[
              { icon: FaFacebookF, url: "https://www.facebook.com/techon345" },
              { icon: FaInstagram, url: "https://www.instagram.com/techon345" },
              { icon: FaTiktok, url: "https://www.tiktok.com/@techon3451" },
              { icon: FaYoutube, url: "https://www.youtube.com/@techon345" },
              { icon: FaXTwitter, url: "https://www.x.com/techon345" },
              {
                icon: FaLinkedinIn,
                url: "https://www.linkedin.com/company/techon345",
              },
              {
                icon: FaPinterestP,
                url: "https://www.pinterest.com/techon345",
              },
              { icon: FaThreads, url: "https://www.threads.net/@techon345" },
              {
                icon: FaSnapchatGhost,
                url: "https://www.snapchat.com/@techon345",
              },
            ].map((Icon, idx) => (
              <Link
                key={idx}
                href={Icon.url}
                target="_blank"
                // whileHover={{ scale: 1.2 }}
                className="text-gray-400 hover:text-blue-600 hover:scale-110 transform duration-500 transition-colors"
              >
                <Icon.icon size={18} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
