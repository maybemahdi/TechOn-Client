"use client";

import Loading from "@/components/ui/core/Loading/Loading";
import MyButton from "@/components/ui/core/MyButton/MyButton";
import { useUpdateProductMutation } from "@/redux/features/admin/admin.api";
import {
  useGetAllCategoriesQuery,
  useGetSingleProductQuery,
} from "@/redux/features/product/product.api";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { DeleteOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import { SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";

const { TextArea } = Input;
const { Option } = Select;

// Mock data for categories
const categories = [
  { id: "cat-1", label: "Electronics" },
  { id: "cat-2", label: "Clothing" },
  { id: "cat-3", label: "Home & Garden" },
  { id: "cat-4", label: "Sports" },
  { id: "cat-5", label: "Watch" },
];

// Mock data for available tags
const availableTags = [
  "smartphone",
  "phone",
  "electronics",
  "mobile",
  "tech",
  "smart",
];

// Color options
const colorOptions = [
  "White",
  "Black",
  "Blue",
  "Red",
  "Green",
  "Yellow",
  "Pink",
  "Purple",
  "Orange",
  "Gray",
  "Brown",
  "Navy",
];

interface FAQ {
  question: string;
  answer: string;
}

// Mock product data for update form
const mockProductData = {
  name: "iPhone 15 Pro Max",
  category: "Electronics",
  price: 1199.99,
  colors: ["black", "blue", "white"],
  intro: "The most advanced iPhone ever with titanium design and A17 Pro chip.",
  guide:
    "Handle with care. Use official Apple accessories for best performance. Keep software updated.",
  sku: "IPHONE-15-PRO-MAX-001",
  tags: ["smartphone", "phone", "electronics"],
  title: "iPhone 15 Pro Max - Premium Flagship",
  description:
    "Experience the ultimate in mobile technology with the iPhone 15 Pro Max. Featuring a stunning 6.7-inch Super Retina XDR display, powerful A17 Pro chip, and advanced camera system.",
  faq: [
    {
      question: "What's included in the box?",
      answer:
        "iPhone 15 Pro Max, USB-C charging cable, documentation, and SIM ejector tool.",
    },
    {
      question: "Does it support 5G?",
      answer: "Yes, the iPhone 15 Pro Max supports 5G connectivity worldwide.",
    },
  ],
  images: [
    "/iphone-15-pro-max-front-view.jpg",
    "/iphone-15-pro-max-back-view.jpg",
  ],
};

export type Product = {
  id: string;
  name: string;
  category: string;
  priceStorage: Array<{
    storage: string;
    price: string;
  }>;
  color: Array<string>;
  intro: string;
  guide: string;
  sku: string;
  tags: Array<string>;
  title: string;
  description: string;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  images: Array<string>;
  createdAt: string;
  updatedAt: string;
};

export default function UpdateProductPage({ id }: { id: string }) {
  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetSingleProductQuery(id);
  const productData: Product = response?.data;

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  useEffect(() => {
    if (productData?.images) {
      setFileList(
        productData.images.map((url, index) => ({
          uid: `-${index}`,
          name: `image-${index}.jpg`,
          status: "done" as const,
          url: url,
        }))
      );
    }
  }, [productData]);

  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [prices, setPrices] = useState<{ storage: string; price: string }[]>(
    []
  );
  useEffect(() => {
    if (productData?.faq) {
      setFaqs(productData.faq);
    }
  }, [productData]);
  useEffect(() => {
    if (productData?.priceStorage?.length) {
      setPrices(productData.priceStorage);
    }
  }, [productData]);

  const addPriceStorage = () => {
    setPrices([...prices, { storage: "", price: "" }]);
  };

  const removePriceStorage = (index: number) => {
    if (prices.length > 1) {
      setPrices(prices.filter((_, i) => i !== index));
    }
  };

  const updatePriceStorage = (
    index: number,
    field: "storage" | "price",
    value: string
  ) => {
    setPrices((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleFormChange = () => {
    const values = form.getFieldsValue();

    let previewImage = productData?.images[0];

    if (fileList.length > 0) {
      const firstFile = fileList[0];
      if (firstFile.originFileObj) {
        previewImage = URL.createObjectURL(firstFile.originFileObj);
      } else if (firstFile.url) {
        previewImage = firstFile.url;
      }
    }
  };

  const handleUploadChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
    handleFormChange();
  };

  const addFAQ = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const removeFAQ = (index: number) => {
    if (faqs.length > 1) {
      setFaqs(faqs.filter((_, i) => i !== index));
    }
  };

  const updateFAQ = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  const { data: responseOfCategories, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery(undefined);
  const categories =
    responseOfCategories?.data?.map((item: any) => {
      return { id: item.id, label: item.name };
    }) || [];

  const [updateProduct] = useUpdateProductMutation();
  const onFinish = async (values: any) => {
    const formData = new FormData();

    // Add images to FormData using loop
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("productImages", file.originFileObj);
      }
    });

    // Prepare body data matching backend expectations
    const bodyData = {
      name: values.name,
      category: values.category,
      priceStorage: prices.filter((p) => p.storage && p.price),
      color: values.colors || [],
      intro: values.intro,
      guide: values.guide,
      sku: values.sku,
      tags: values.tags || [],
      title: values.title,
      description: values.description,
      faq: faqs.filter((faq) => faq.question && faq.answer),
    };

    formData.append("bodyData", JSON.stringify(bodyData));

    const res = await handleAsyncWithToast(async () => {
      return updateProduct({ id, formData });
    }, "Updating product...");

    if (res?.data?.success) {
      toast.success("Product updated successfully!");
    }
  };

  if (isLoading || isFetching || isCategoriesLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <Row gutter={24}>
        {/* Form Section */}
        <Col span={16}>
          <Card className="shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Update Product</h2>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onValuesChange={handleFormChange}
              initialValues={{
                name: productData?.name,
                category: productData?.category,
                colors: productData?.color,
                intro: productData?.intro,
                guide: productData?.guide,
                sku: productData?.sku,
                tags: productData?.tags,
                title: productData?.title,
                description: productData?.description,
              }}
            >
              {/* Product Name */}
              <Form.Item label="Product Name" name="name">
                <Input placeholder="Product name" />
              </Form.Item>

              {/* Upload Images */}
              <Form.Item label="Upload product images">
                <Upload.Dragger
                  multiple
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleUploadChange}
                  beforeUpload={() => false}
                  className="upload-area"
                >
                  <div className="text-center p-4">
                    <PlusOutlined className="text-2xl text-gray-400 mb-2" />
                    <div className="text-gray-500">Drop your images here</div>
                  </div>
                </Upload.Dragger>
              </Form.Item>

              {/* Category */}
              <Form.Item label="Select Category" name="category">
                {/* <Select placeholder="Category">
                  {categories?.map((cat: any) => (
                    <Option key={cat.id} value={cat.label}>
                      {cat.label}
                    </Option>
                  ))}
                </Select> */}
                <select
                  className="w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Category
                  </option>
                  {categories?.map((cat: any) => (
                    <option key={cat.id} value={cat.label}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </Form.Item>

              {/* Price */}
              {/* <Form.Item label="Product Price" name="price">
                <InputNumber
                  placeholder="Product Price"
                  style={{ width: "100%" }}
                  min={0}
                  step={0.01}
                  precision={2}
                  prefix="$"
                />
              </Form.Item> */}

              {/* Price & Storage Variants */}
              <Form.Item label="Price & Storage Variants">
                {prices.map((variant, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 border rounded-lg bg-gray-50"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium">Variant {index + 1}</span>
                      {prices.length > 1 && (
                        <Button
                          type="text"
                          danger
                          size="small"
                          icon={<DeleteOutlined />}
                          onClick={() => removePriceStorage(index)}
                        />
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Storage
                        </label>
                        <Input
                          placeholder="e.g., 128GB"
                          value={variant.storage ?? ""}
                          onChange={(e) =>
                            updatePriceStorage(index, "storage", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Price
                        </label>
                        <Input
                          placeholder="e.g., 1400"
                          type="text"
                          value={variant.price ?? ""}
                          onChange={(e) =>
                            updatePriceStorage(index, "price", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  type="dashed"
                  onClick={addPriceStorage}
                  icon={<PlusOutlined />}
                  className="w-full"
                >
                  Add Storage Variant
                </Button>
              </Form.Item>

              {/* Colors */}
              <Form.Item label="Add Color" name="colors">
                <Select
                  mode="tags"
                  size="large"
                  placeholder="Select colors"
                  className="rounded-lg"
                  maxTagCount="responsive"
                >
                  {colorOptions.map((color) => (
                    <Option key={color} value={color}>
                      <Space>
                        {/* <div
                          className="w-4 h-4 rounded-full border border-gray-300"
                        /> */}
                        {color}
                      </Space>
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Product Intro */}
              <Form.Item label="Product Intro" name="intro">
                <TextArea rows={3} placeholder="Intro" />
              </Form.Item>

              {/* Product Guide */}
              <Form.Item label="Product Guide" name="guide">
                <TextArea rows={3} placeholder="Description" />
              </Form.Item>

              {/* SKU */}
              <Form.Item label="SKU" name="sku">
                <Input placeholder="Input SKU" />
              </Form.Item>

              {/* Tags */}
              <Form.Item label="Tags" name="tags">
                <Select
                  mode="tags"
                  placeholder="Input tag"
                  style={{ width: "100%" }}
                >
                  {availableTags?.map((tag) => (
                    <Option key={tag} value={tag}>
                      {tag}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Description */}
              <Form.Item label="Description">
                <Form.Item name="title" style={{ marginBottom: 8 }}>
                  <Input placeholder="Title" />
                </Form.Item>
                <Form.Item name="description" style={{ marginBottom: 0 }}>
                  <TextArea rows={3} placeholder="Description" />
                </Form.Item>
              </Form.Item>

              {/* FAQs */}
              <Form.Item label="Frequently Asked Question">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 border rounded-lg bg-gray-50"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">FAQ {index + 1}</span>
                      {faqs.length > 1 && (
                        <Button
                          type="text"
                          danger
                          size="small"
                          icon={<DeleteOutlined />}
                          onClick={() => removeFAQ(index)}
                        />
                      )}
                    </div>
                    <Input
                      placeholder="Question"
                      value={faq.question}
                      onChange={(e) =>
                        updateFAQ(index, "question", e.target.value)
                      }
                      className="mb-2"
                    />
                    <TextArea
                      placeholder="Answer"
                      value={faq.answer}
                      onChange={(e) =>
                        updateFAQ(index, "answer", e.target.value)
                      }
                      rows={2}
                    />
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={addFAQ}
                  icon={<PlusOutlined />}
                  className="w-full"
                >
                  Add FAQ
                </Button>
              </Form.Item>

              {/* Submit Button */}
              <Form.Item>
                {/* <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  size="large"
                  className="w-full"
                >
                  Update Product
                </Button> */}
                <MyButton
                  label="Update Product"
                  fullWidth
                  type="submit"
                  iconPosition="right"
                  customIcon={<SaveOutlined />}
                />
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
