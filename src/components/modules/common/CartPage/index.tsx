"use client";

import Footer from "@/components/shared/Footer/Footer";
import Loading from "@/components/ui/core/Loading/Loading";
import MyButton from "@/components/ui/core/MyButton/MyButton";
import { cn } from "@/lib/utils";
import {
  decrementOrderQuantity,
  incrementOrderQuantity,
  orderedProductsSelector,
  removeProduct,
  subTotalSelector,
} from "@/redux/features/cart/cartSlice";
import { useGetBestSellingQuery } from "@/redux/features/product/product.api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { convertPrice } from "@/utils/convertCurrency";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Image, InputNumber, Space, Typography } from "antd";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { useSelector } from "react-redux";
import FAQ from "../HomePage/FAQ/FAQ";
import BestSelling from "./BestSelling/BestSelling";

const { Title, Text } = Typography;

export default function CartPage() {
  //currency and rate
  const { currency, rate } = useSelector((state: RootState) => state.currency);

  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(orderedProductsSelector);
  const subTotal = useAppSelector(subTotalSelector);

  const total = subTotal;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
      value: 6,
    },
  ]);

  if (isBestSellingProductsLoading) return <Loading />;

  const startHolding = (action: () => void) => {
    action();
    intervalRef.current = setInterval(action, 150);
  };

  const stopHolding = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleIncrement = (productId: string) =>
    dispatch(incrementOrderQuantity(productId));
  const handleDecrement = (productId: string) =>
    dispatch(decrementOrderQuantity(productId));
  const handleRemove = (productId: string) =>
    dispatch(removeProduct(productId));

  console.log(cartProducts);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm py-8 w-fit">
          <Link href={"/"} className="text-black">
            Home
          </Link>
          <span className="text-gray-400">{">"}</span>
          <span className="text-black">Cart</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Cart Items */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-sm">
              {/* Table Header */}
              <div className="grid grid-cols-16 gap-4 pb-4 border-b border-gray-200 font-medium text-gray-700">
                <div className="col-span-1"></div>
                <div className="col-span-2">Image</div>
                <div className="col-span-3">Name</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-2">Color</div>
                <div className="col-span-2">Variant</div>
                <div className="col-span-2">Quantity</div>
                <div className="col-span-2">Sub total</div>
              </div>

              {/* Cart Items */}
              <div className="space-y-4 mt-4">
                {cartProducts?.map((product) => (
                  <motion.div
                    key={product.id}
                    className="grid grid-cols-16 gap-4 items-center py-4 border-b border-gray-100"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    {/* Remove Button */}
                    <div className="col-span-1">
                      <Button
                        type="text"
                        danger
                        shape="circle"
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemove(product.id)}
                        className="bg-red-50 text-white hover:!bg-red-100"
                      />
                    </div>

                    {/* Product Image */}
                    <div className="col-span-2">
                      <Image
                        src={
                          product.images[0] ||
                          "/placeholder.svg?height=80&width=80&query=laptop"
                        }
                        alt={product.name}
                        width={70}
                        height={70}
                        className="rounded-lg object-cover"
                      />
                    </div>

                    {/* Product Name */}
                    <div className="col-span-3">
                      <Text className="font-medium">{product.name}</Text>
                    </div>

                    {/* Price */}
                    <div className="col-span-2">
                      <Text className="font-medium">
                        {currency}{" "}
                        {convertPrice(
                          Number(product?.price),
                          currency,
                          rate
                        ).toFixed(2)}
                      </Text>
                    </div>

                    {/* Color */}
                    <div className="col-span-2">
                      <Text className="font-medium">{product?.color || "-"}</Text>
                    </div>

                    {/* Storage */}
                    <div className="col-span-2">
                      <Text className="font-medium">{product?.storage || "-"}</Text>
                    </div>

                    {/* Quantity Controls */}
                    <div className="col-span-2">
                      <Space.Compact>
                        <Button
                          icon={<MinusOutlined />}
                          onMouseDown={() =>
                            startHolding(() => handleDecrement(product.id))
                          }
                          onMouseUp={stopHolding}
                          onMouseLeave={stopHolding}
                          disabled={product.orderQuantity <= 1}
                        />
                        <InputNumber
                          value={product.orderQuantity}
                          min={1}
                          readOnly
                          className={cn("text-center", {
                            "w-12": product.orderQuantity > 9,
                            "w-8": product.orderQuantity <= 9,
                          })}
                        />
                        <Button
                          icon={<PlusOutlined />}
                          onMouseDown={() =>
                            startHolding(() => handleIncrement(product.id))
                          }
                          onMouseUp={stopHolding}
                          onMouseLeave={stopHolding}
                        />
                      </Space.Compact>
                    </div>

                    {/* Subtotal */}
                    <div className="col-span-2">
                      <Text className="font-medium">
                        {currency}{" "}
                        {convertPrice(
                          Number(product.price * product.orderQuantity),
                          currency,
                          rate
                        ).toFixed(2)}
                      </Text>
                    </div>
                  </motion.div>
                ))}

                {cartProducts.length === 0 && (
                  <div className="text-center py-12">
                    <Text className="text-gray-500">Your cart is empty</Text>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Cart Totals */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-1"
          >
            <Card className="shadow-sm">
              <Title level={4} className="mb-4">
                Cart Totals
              </Title>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <Text>Sub total</Text>
                  <Text className="font-medium">
                    $
                    {convertPrice(Number(subTotal), currency, rate)?.toFixed(2)}
                  </Text>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <Text className="font-medium">Total</Text>
                  <Text className="font-bold text-lg">
                    ${convertPrice(Number(total), currency, rate)?.toFixed(2)}
                  </Text>
                </div>

                <Link href="/checkout?type=cart">
                  <MyButton label="Proceed to Checkout" fullWidth />{" "}
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Related products */}
      {/* <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 my-10 md:my-16"
      >
        <div className="col-span-3 mb-5">
          <h3 className="text-2xl md:text-[34px] font-semibold text-center">
            Related Products
          </h3>
        </div>
        {products?.slice(0, 3).map((product: Product) => (
          <ProductCard
            btnAction={"Add to Cart"}
            bg="bg-black"
            key={product.id}
            product={product}
          />
        ))}
      </motion.div> */}

      {/* Best selling products */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <BestSelling
          bg={"bg-white"}
          products={responseOfBestSellingProducts?.data?.data}
        />
      </motion.div>

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <FAQ />
      </motion.div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
