"use client";
import Footer from "@/components/shared/Footer/Footer";
import MyButton from "@/components/ui/core/MyButton/MyButton";
import {
  clearCart,
  orderedProductsSelector,
  subTotalSelector,
} from "@/redux/features/cart/cartSlice";
import {
  useCreateCartOrderMutation,
  useCreateSingleOrderMutation,
} from "@/redux/features/order/order.api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { convertPrice } from "@/utils/convertCurrency";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { Card, Checkbox, Divider, Form, Input, Radio, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
interface OrderItem {
  key?: string;
  product: string;
  color?: string;
  storage?: string;
  quantity: number;
  price: string;
}

const CheckoutPage: React.FC = () => {
  //currency and rate
  const { currency, rate } = useSelector((state: RootState) => state.currency);

  const searchParams = useSearchParams();
  const type = searchParams.get("type"); // could be buy or cart
  const [buyNowProduct, setBuyNowProduct] = useState<any>(
    JSON.parse(sessionStorage.getItem("productToBuy") ?? "{}")
  );
  const router = useRouter();

  console.log(buyNowProduct);

  const cartProducts = useAppSelector(orderedProductsSelector);
  const subTotal = useAppSelector(subTotalSelector);

  useEffect(() => {
    if (!type || (type !== "buy" && type !== "cart")) {
      router.back();
    }
    // if type is buy but no product in session storage, redirect back
    if (type === "buy" && Object.keys(buyNowProduct).length === 0) {
      router.back();
    }
    // if type is cart but no product in cart state, redirect back
    if (type === "cart" && cartProducts.length === 0) {
      router.back();
    }
  }, [type, buyNowProduct, cartProducts, router]);

  const [form] = Form.useForm();

  const orderColumns: ColumnsType<OrderItem> = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (text, record) => (
        <div>
          <p className="font-medium">{text}</p>
          {/* Show color and storage if available */}
          {(record.color || record.storage) && (
            <p className="text-gray-500 text-xs">
              {record.color && (
                <span>
                  <span className="font-semibold">Color:</span>{" "}
                  {record?.color || "-"}
                </span>
              )}
              <br />
              {/* {record.color && record.storage && <span> | </span>} */}
              {record.storage && (
                <span>
                  <span className="font-semibold">Variant:</span>{" "}
                  {record?.storage || "-"}
                </span>
              )}
            </p>
          )}
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "right",
    },
  ];

  // const orderData: OrderItem[] = [
  //   {
  //     key: "1",
  //     product: "Product One",
  //     quantity: 1,
  //     subtotal: "$30.00",
  //   },
  //   {
  //     key: "2",
  //     product: "Product Two",
  //     quantity: 1,
  //     subtotal: "$30.00",
  //   },
  //   {
  //     key: "3",
  //     product: "Product Three",
  //     quantity: 1,
  //     subtotal: "$30.00",
  //   },
  // ];

  let orderData: OrderItem[] = [];
  if (type === "buy") {
    orderData = [
      {
        key: "1",
        product: buyNowProduct.name,
        color: buyNowProduct.selectedColor || "N/A",
        storage: buyNowProduct.selectedStorage || "N/A",
        quantity: 1,
        price: `${currency} ${convertPrice(
          Number(buyNowProduct?.price),
          currency,
          rate
        )?.toFixed(2)}`,
      },
    ];
  }

  if (type === "cart") {
    orderData = cartProducts?.map((product: any) => ({
      key: product?.id,
      product: product?.name,
      color: product?.color || "N/A",
      storage: product.storage || "N/A",
      quantity: product?.orderQuantity,
      price: `${currency} ${convertPrice(
        Number(product?.price),
        currency,
        rate
      )?.toFixed(2)}`,
    }));
  }

  const [singleOrder] = useCreateSingleOrderMutation();
  const [cartOrder] = useCreateCartOrderMutation();
  const dispatch = useAppDispatch();
  const onFinish = async (values: any) => {
    // console.log("Form values:", JSON.stringify(values, null, 2));
    // Handle form submission
    if (type === "buy") {
      const payload = {
        productId: buyNowProduct.id,
        quantity: 1,
        storage: buyNowProduct.selectedStorage,
        color: buyNowProduct.selectedColor,
        paymentMethod: values.paymentMethod,
        billingDetails: {
          firstName: values.firstName,
          lastName: values.lastName,
          companyName: values.company,
          country: values.country,
          city: values.city,
          street: values.address,
          postcode: Number(values.postcode),
          phone: values.phone,
          email: values.email,
          other: values.additionalInfo,
          paymentMethod: values.paymentMethod,
        },
      };
      const res = await handleAsyncWithToast(async () => {
        return singleOrder(payload);
      }, "Placing order...");
      if (res?.data?.success) {
        form.resetFields();
        sessionStorage.removeItem("productToBuy");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Thank you for your order! Our team will be in touch shortly to coordinate your delivery.",
        }).then(() => {
          window.location.href = `/user/orders`;
        });
      }
    }
    if (type === "cart") {
      const payload = {
        products: cartProducts?.map((product) => {
          return {
            id: product?.id,
            quantity: product?.orderQuantity,
            price: product?.price,
            storage: product?.storage,
            color: product?.color,
          };
        }),
        paymentMethod: values?.paymentMethod,
        billingDetails: {
          firstName: values.firstName,
          lastName: values.lastName,
          companyName: values.company,
          country: values.country,
          city: values.city,
          street: values.address,
          postcode: Number(values.postcode),
          phone: values.phone,
          email: values.email,
          other: values.additionalInfo,
          paymentMethod: values.paymentMethod,
        },
      };
      const res = await handleAsyncWithToast(async () => {
        return cartOrder(payload);
      }, "Placing order...");
      if (res?.data?.success) {
        form.resetFields();
        sessionStorage.removeItem("productToBuy");
        dispatch(clearCart());
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Thank you for your order! Our team will be in touch shortly to coordinate your delivery.",
        }).then(() => {
          window.location.href = `/user/orders`;
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Billing Details Section */}
          <div className="lg:col-span-3">
            <Card
              title="Billing Details"
              //   className="shadow-md"
              styles={{ header: { fontSize: "20px", fontWeight: "bold" } }}
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    name="firstName"
                    label={<span className="font-semibold">First Name*</span>}
                    rules={[
                      {
                        required: true,
                        message: "Please input your first name!",
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>

                  <Form.Item
                    name="lastName"
                    label="Last Name*"
                    rules={[
                      {
                        required: true,
                        message: "Please input your last name!",
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </div>

                <Form.Item name="company" label="Company Name (Optional)">
                  <Input size="large" />
                </Form.Item>

                <Form.Item
                  name="country"
                  label="Country/Region*"
                  rules={[
                    { required: true, message: "Please select your country!" },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>

                <Form.Item
                  name="address"
                  label="Street Address*"
                  rules={[
                    { required: true, message: "Please input your address!" },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>

                <Form.Item
                  name="city"
                  label="Town/City*"
                  rules={[
                    { required: true, message: "Please input your city!" },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>

                <Form.Item
                  name="postcode"
                  label="Postcode*"
                  rules={[
                    { required: true, message: "Please input your postcode!" },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone*"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email Address*"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>

                <Form.Item
                  name="additionalInfo"
                  label="Others Information (Optional)"
                >
                  <Input.TextArea rows={4} />
                </Form.Item>
              </Form>
            </Card>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-2">
            <Card
              title="Your Order"
              className="shadow-md"
              styles={{ header: { fontSize: "20px", fontWeight: "bold" } }}
            >
              <Table
                columns={orderColumns}
                dataSource={orderData}
                pagination={false}
                className="mb-6"
                summary={() => (
                  <>
                    <Table.Summary.Row>
                      <Table.Summary.Cell
                        index={0}
                        colSpan={2}
                        className="font-semibold"
                      >
                        Subtotal
                      </Table.Summary.Cell>
                      <Table.Summary.Cell
                        index={1}
                        className="text-right font-semibold"
                      >
                        {currency}{" "}
                        {type === "cart"
                          ? convertPrice(
                              Number(subTotal),
                              currency,
                              rate
                            )?.toFixed(2)
                          : convertPrice(
                              Number(buyNowProduct?.price),
                              currency,
                              rate
                            )?.toFixed(2)}
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                    {/* <Table.Summary.Row>
                      <Table.Summary.Cell
                        index={0}
                        colSpan={2}
                        className="font-semibold"
                      >
                        Total
                      </Table.Summary.Cell>
                      <Table.Summary.Cell
                        index={1}
                        className="text-right font-semibold"
                      >
                        $120.00
                      </Table.Summary.Cell>
                    </Table.Summary.Row> */}
                  </>
                )}
              />

              <Divider />

              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-4">
                  Select payment method
                </h3>

                <Form form={form} onFinish={onFinish}>
                  <Form.Item name="paymentMethod" rules={[{ required: true }]}>
                    <Radio.Group className="w-full">
                      <div className="flex flex-col space-y-3">
                        <Radio value="CASH" className="py-2">
                          Cash on Delivery
                        </Radio>
                        <Radio value="CARD" className="py-2">
                          Card on Delivery
                        </Radio>
                        <Radio value="BANK" className="py-2">
                          Online Bank Transfer/Cheque on Delivery
                        </Radio>
                      </div>
                    </Radio.Group>
                  </Form.Item>
                </Form>
              </div>

              <Divider />

              <Form form={form} onFinish={onFinish}>
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error(
                                "You must agree to the terms and conditions"
                              )
                            ),
                    },
                  ]}
                >
                  <Checkbox>
                    I have read and agree to the website terms and condition.
                  </Checkbox>
                </Form.Item>
              </Form>
              <p>
                Once your order is placed, we'll be in touch to arrange your
                delivery.
              </p>
              <Form form={form} onFinish={onFinish}>
                <MyButton type="submit" label="Place Order" fullWidth />
              </Form>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
