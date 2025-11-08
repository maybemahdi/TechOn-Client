"use client";

import MyButton from "@/components/ui/core/MyButton/MyButton";
import { addProduct } from "@/redux/features/cart/cartSlice";
import { toggleWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Product } from "@/types/product";
import { convertPrice } from "@/utils/convertCurrency";
import { Eye, Heart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  bg?: string;
  btnAction?: string;
}

export default function ProductCard({
  product,
  bg = "bg-white",
  btnAction = "View Details",
}: ProductCardProps) {
  //currency and rate
  const { currency, rate } = useSelector((state: RootState) => state.currency);

  //wishlist
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const router = useRouter();

  const dispatch = useAppDispatch();
  const handleAddToCart = async () => {
    dispatch(
      addProduct({
        ...product,
        id: product.id,
        orderQuantity: 1,
      })
    );
    toast.success(`1 item(s) added to cart!`);
  };

  const handleBuyNow = () => {
    // sessionStorage.setItem(
    //   "productToBuy",
    //   JSON.stringify(product)
    // );
    // router.push("/checkout?type=buy");
    router.push(`/shop/${product.id}`);
  };

  return (
    <div
      className={`${bg} rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full`}
    >
      {/* Product Image */}
      <div className="relative group">
        <div className="relative w-full h-60 bg-slate-200 rounded-md flex items-center justify-center overflow-hidden p-4">
          <img
            src={
              product.images[0] ||
              "https://images.unsplash.com/photo-1759352371478-6071563e058a?w=500&auto=format&fit=crop&q=60"
            }
            alt={product.name}
            className="w-full h-full object-contain rounded-md group-hover:scale-105 transition-transform duration-300 mix-blend-multiply"
            loading="lazy"
          />
        </div>

        {/* New Arrival Badge */}
        {/* {product.isNewArrival && (
          <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            New arrival
          </div>
        )} */}

        {/* Action Icons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => dispatch(toggleWishlist(product))}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isInWishlist
                ? "bg-red-500 text-white"
                : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${isInWishlist ? "fill-current" : ""}`}
            />
          </button>
          <Link href={`/shop/${product.id}`}>
            <button className="w-10 h-10 bg-gray-500 text-white hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
              <Eye className="w-4 h-4" />
            </button>
          </Link>
          {/* <button
            onClick={handleAddToCart}
            className="w-10 h-10 bg-gray-500 text-white hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
          </button> */}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-2 flex flex-col flex-1">
        <div className="flex-1">
          <Link href={`/shop/${product.id}`}>
            <h3
              className={`text-sm font-semibold ${
                bg === "bg-white" ? "text-gray-900" : "text-white"
              }`}
            >
              {product.name?.slice(0, 50) + (product.name.length > 50 ? "..." : "")}
            </h3>
          </Link>
          <p
            className={`!text-xs font-medium bg-blue-100 rounded-md px-2 py-1 w-fit !mb-2 ${
              bg === "bg-white" ? "text-gray-900" : "text-white"
            } mb-4`}
          >
            {product.category}
          </p>
          <p
            className={`text-xs font-semibold !mb-2 ${
              bg === "bg-white" ? "text-gray-900" : "text-white"
            } mb-4`}
          >
            {/* {product?.priceStorage
            ?.map(
              (item) =>
                `${convertPrice(Number(item?.price), currency, rate).toFixed(
                  2
                )} ${currency}`
            )
            .join(" - ")} */}
            {currency}{" "}
            {convertPrice(
              Number(product?.priceStorage[0]?.price),
              currency,
              rate
            ).toFixed(2)}
          </p>
        </div>
        <div
          className={`rounded-[10px] mt-auto p-[2px] gradient-border w-full`}
          aria-hidden="true"
        >
          <MyButton
            onClick={
              btnAction === "Add to Cart" ? handleAddToCart : handleBuyNow
            }
            label={btnAction}
            fullWidth
            className="!bg-transparent !text-xs"
          />
        </div>
      </div>
    </div>
  );
}
