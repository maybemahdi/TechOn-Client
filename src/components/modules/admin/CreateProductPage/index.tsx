"use client";
import RichTextEditor from "@/components/shared/rich-text-editor";
import Loading from "@/components/ui/core/Loading/Loading";
import MyButton from "@/components/ui/core/MyButton/MyButton";
import { useCreateProductMutation } from "@/redux/features/admin/admin.api";
import { useGetAllCategoriesQuery } from "@/redux/features/product/product.api";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
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
import { useEffect, useState } from "react";
import { toast } from "sonner";

const { TextArea } = Input;
const { Option } = Select;

// Mock data for categories
const mockCategories = [
  { id: "cat-1", label: "Electronics" },
  { id: "cat-2", label: "Clothing" },
  { id: "cat-3", label: "Home & Garden" },
  { id: "cat-4", label: "Sports" },
];

// Mock data for available tags
const availableTags = ["smartphone", "phone", "electronics", "mobile", "tech"];

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

interface PriceStorage {
  storage: string;
  price: string;
}

export default function CreateProductPage() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([{ question: "", answer: "" }]);
  const [priceStorage, setPriceStorage] = useState<PriceStorage[]>([
    { storage: "128GB", price: "400" },
    { storage: "256GB", price: "500" },
  ]);
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState({
    name: "iPhone 17 Pro",
    priceStorage: [
      { storage: "128GB", price: "400" },
      { storage: "256GB", price: "500" },
    ],
    image: "/modern-smartphone.png",
  });

  const [specs, setSpecs] = useState<string>("");
  const [showError, setShowError] = useState(false);
  const isEditorEmpty = (html: string) => {
    const textContent = html.replace(/<[^>]*>/g, "").trim();
    return textContent === "";
  };
  const onChange = (content: string) => {
    setSpecs(content);
    if (content && !isEditorEmpty(content)) {
      setShowError(false);
    }
  };

  const { data: response, isLoading } = useGetAllCategoriesQuery(undefined);
  const categories =
    response?.data?.map((item: any) => {
      return { id: item.id, label: item.name };
    }) || [];

  const handleFormChange = () => {
    const values = (form as any).getFieldsValue();

    let previewImage = "/modern-smartphone.png";

    if (fileList.length > 0) {
      const firstFile = fileList[0];
      if (firstFile.originFileObj) {
        previewImage = URL.createObjectURL(firstFile.originFileObj);
      } else if (firstFile.url) {
        previewImage = firstFile.url;
      }
    }

    setPreviewData({
      name: values.productTitle || "Product Name",
      priceStorage: priceStorage,
      image: previewImage,
    });
  };

  useEffect(() => {
    handleFormChange();
  }, [fileList, priceStorage]);

  const handleUploadChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
  };

  const addPriceStorage = () => {
    setPriceStorage([...priceStorage, { storage: "", price: "" }]);
  };

  const removePriceStorage = (index: number) => {
    if (priceStorage.length > 1) {
      setPriceStorage(priceStorage.filter((_, i) => i !== index));
    }
  };

  const updatePriceStorage = (
    index: number,
    field: "storage" | "price",
    value: string
  ) => {
    const newPriceStorage = [...priceStorage];
    newPriceStorage[index][field] = value;
    setPriceStorage(newPriceStorage);
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

  const [createProduct] = useCreateProductMutation();
  const onFinish = async (values: any) => {
    if (isEditorEmpty(specs)) {
      setShowError(true);
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();

      const bodyData = {
        name: values.productTitle,
        category: values.category,
        priceStorage: priceStorage.filter((ps) => ps.storage && ps.price),
        specs: specs,
        color: values.colors || [],
        intro: values.productIntro,
        guide: values.productGuide,
        sku: values.sku,
        tags: values.tags || [],
        title: values.productTitle,
        description: values.description,
        faq: faqs.filter((faq) => faq.question && faq.answer),
      };

      // console.log(JSON.stringify(bodyData, null, 2));
      // return;

      formData.append("bodyData", JSON.stringify(bodyData));
      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("productImages", file.originFileObj);
        }
      });
      const res = await handleAsyncWithToast(async () => {
        return createProduct(formData);
      }, "Creating product...");
      if (res?.data?.success) {
        toast.success("Product created successfully!");
        form.resetFields();
        setPriceStorage([{ storage: "128GB", price: "400" }]);
        setFileList([]);
        setFaqs([{ question: "", answer: "" }]);
        setSpecs("");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("specImage", file);

    const apiKey = process.env.NEXT_PUBLIC_BASE_URL;
    if (!apiKey) {
      throw new Error("API key is not set");
    }

    const response = await fetch(`${apiKey}/product/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success && data.data) {
      return data.data;
    } else {
      throw new Error("Image upload failed");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <Row gutter={24}>
        {/* Form Section */}
        <Col span={16}>
          <Card className="shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Add Product</h2>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onValuesChange={handleFormChange}
              initialValues={{
                productTitle: "iPhone 17 Pro",
                sku: "prd-001",
              }}
            >
              {/* Product Title */}
              <Form.Item
                label="Product Title"
                name="productTitle"
                rules={[
                  { required: true, message: "Please enter product title" },
                ]}
              >
                <Input placeholder="Product title" />
              </Form.Item>

              {/* Upload Images */}
              <Form.Item label="Upload Product Images">
                <Upload.Dragger
                  multiple
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleUploadChange}
                  beforeUpload={() => false}
                >
                  <div className="text-center p-4">
                    <PlusOutlined className="text-2xl text-gray-400 mb-2" />
                    <div className="text-gray-500">Drop your images here</div>
                  </div>
                </Upload.Dragger>
              </Form.Item>

              {/* Category */}
              <Form.Item
                label="Select Category"
                name="category"
                rules={[
                  { required: true, message: "Please select a category" },
                ]}
              >
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

              {/* Price & Storage Variants */}
              <Form.Item label="Price & Storage Variants">
                {priceStorage.map((variant, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 border rounded-lg bg-gray-50"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium">Variant {index + 1}</span>
                      {priceStorage.length > 1 && (
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
                          value={variant.storage}
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
                          placeholder="e.g., 400"
                          value={variant.price}
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
                {/* <Select
                  mode="multiple"
                  placeholder="Select colors"
                  style={{ width: "100%" }}
                >
                  {colorOptions.map((color) => (
                    <Option key={color.value} value={color.value}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: color.color }}
                        />
                        {color.label}
                      </div>
                    </Option>
                  ))}
                </Select> */}
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
              <Form.Item label="Product Intro" name="productIntro">
                <TextArea rows={3} placeholder="Intro" />
              </Form.Item>

              {/* Product Guide */}
              <Form.Item label="Product Guide" name="productGuide">
                <TextArea rows={3} placeholder="Description" />
              </Form.Item>

              {/* SKU */}
              <Form.Item
                label="SKU"
                name="sku"
                rules={[{ required: true, message: "Please enter SKU" }]}
              >
                <Input placeholder="Input SKU" />
              </Form.Item>

              {/* Tags */}
              <Form.Item label="Tags" name="tags">
                <Select
                  mode="tags"
                  placeholder="Input tag"
                  style={{ width: "100%" }}
                >
                  {availableTags.map((tag) => (
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

              {/* specification text editor */}
              <div className="mb-4">
                <p className="mb-2 text-sm !leading-[22px]">Specifications</p>
                <RichTextEditor
                  content={specs}
                  onChange={onChange}
                  onImageUpload={handleImageUpload}
                />
                {showError && isEditorEmpty(specs) && (
                  <p className="text-red-500 text-base mt-2">
                    Specifications is required
                  </p>
                )}
              </div>

              {/* FAQs */}
              <Form.Item label="Frequently Asked Questions">
                {faqs.map((faq, index) => (
                  <div key={index} className="mb-4 p-4 border rounded-lg">
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
              {/* Submit Button */}
              <Form.Item>
                <MyButton
                  label="Add Product"
                  fullWidth
                  type="submit"
                  iconPosition="left"
                  customIcon={<PlusOutlined />}
                />
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Preview Section */}
        <Col span={8}>
          <Card
            title="Preview"
            className="shadow-sm sticky"
            style={{ top: 20 }}
          >
            <div className="bg-white rounded-lg p-4">
              <img
                src={previewData.image || "/placeholder.svg"}
                alt={previewData.name}
                className="w-full h-48 object-contain rounded-lg mb-4"
              />
              <h3 className="font-semibold text-lg mb-2">{previewData.name}</h3>
              <div className="mb-4">
                {previewData.priceStorage.map((variant, index) => (
                  <div key={index} className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">{variant.storage}:</span> $
                    {variant.price}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button type="primary" size="small">
                  Edit
                </Button>
                <Button type="primary" danger size="small">
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

// "use client";

// import MyButton from "@/components/ui/core/MyButton/MyButton";
// import { useCreateProductMutation } from "@/redux/features/admin/admin.api";
// import {
//   useGetAllCategoriesQuery,
//   useGetAllTagsQuery,
// } from "@/redux/features/product/product.api";
// import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
// import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
// import type { UploadFile, UploadProps } from "antd";
// import {
//   Button,
//   Card,
//   Col,
//   Form,
//   Input,
//   InputNumber,
//   Row,
//   Select,
//   Upload,
// } from "antd";
// import { Loader } from "lucide-react";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import { label } from "three/src/nodes/TSL.js";

// const { TextArea } = Input;
// const { Option } = Select;

// // Mock data for categories
// const categories = [
//   { id: "cat-1", label: "Electronics" },
//   { id: "cat-2", label: "Clothing" },
//   { id: "cat-3", label: "Home & Garden" },
//   { id: "cat-4", label: "Sports" },
// ];

// // Mock data for available tags
// const availableTags = ["smartphone", "phone", "electronics", "mobile", "tech"];

// // Color options
// const colorOptions = [
//   { label: "White", value: "white", color: "#ffffff" },
//   { label: "Black", value: "black", color: "#000000" },
//   { label: "Blue", value: "blue", color: "#1890ff" },
//   { label: "Sky Blue", value: "skyblue", color: "#87CEEB" },
//   { label: "Red", value: "red", color: "#ff4d4f" },
//   { label: "Green", value: "green", color: "#52c41a" },
//   { label: "Purple", value: "purple", color: "#722ed1" },
//   { label: "Yellow", value: "yellow", color: "#fadb14" },
//   { label: "Orange", value: "orange", color: "#fa8c16" },
//   { label: "Cyan", value: "cyan", color: "#13c2c2" },
//   { label: "Magenta", value: "magenta", color: "#eb2f96" },
//   { label: "Lime", value: "lime", color: "#a0d911" },
//   { label: "Geek Blue", value: "geekblue", color: "#2f54eb" },
//   { label: "Volcano", value: "volcano", color: "#fa541c" },
//   { label: "Gold", value: "gold", color: "#faad14" },
//   { label: "Light Gold", value: "lightgold", color: "#FDDC5C" },
//   { label: "Pink", value: "pink", color: "#eb2f96" },
//   { label: "Crimson", value: "crimson", color: "#eb2f96" },
//   { label: "Violet", value: "violet", color: "#722ed1" },
//   { label: "Indigo", value: "indigo", color: "#722ed1" },
//   { label: "Teal", value: "teal", color: "#1890ff" },
// ];

// interface FAQ {
//   question: string;
//   answer: string;
// }

// export default function CreateProductPage() {
//   const [form] = Form.useForm();
//   const [fileList, setFileList] = useState<UploadFile[]>([]);
//   const [faqs, setFaqs] = useState<FAQ[]>([{ question: "", answer: "" }]);
//   const [previewData, setPreviewData] = useState({
//     name: "iPhone 17 Pro",
//     price: 1099.0,
//     image: "/iphone-17-pro-with-purple-gradient-screen-showing-.jpg",
//   });

//   const { data: response, isLoading } = useGetAllCategoriesQuery(undefined);
//   const categories =
//     response?.data?.map((item: any) => {
//       return { id: item.id, label: item.name };
//     }) || [];

//   const handleFormChange = () => {
//     const values = (form as any).getFieldsValue();

//     let previewImage =
//       "/iphone-14-pro-with-purple-gradient-screen-showing-.jpg";

//     if (fileList.length > 0) {
//       const firstFile = fileList[0];
//       if (firstFile.originFileObj) {
//         previewImage = URL.createObjectURL(firstFile.originFileObj);
//       } else if (firstFile.url) {
//         previewImage = firstFile.url;
//       }
//     }

//     setPreviewData({
//       name: values.productTitle || "Product Name",
//       price: values.price || 0,
//       image: previewImage,
//     });
//   };

//   useEffect(() => {
//     handleFormChange();
//   }, [fileList]);

//   const handleUploadChange: UploadProps["onChange"] = ({
//     fileList: newFileList,
//   }) => {
//     setFileList(newFileList);
//   };

//   const addFAQ = () => {
//     setFaqs([...faqs, { question: "", answer: "" }]);
//   };

//   const removeFAQ = (index: number) => {
//     if (faqs.length > 1) {
//       setFaqs(faqs.filter((_, i) => i !== index));
//     }
//   };

//   const updateFAQ = (
//     index: number,
//     field: "question" | "answer",
//     value: string
//   ) => {
//     const newFaqs = [...faqs];
//     newFaqs[index][field] = value;
//     setFaqs(newFaqs);
//   };

//   const [createProduct] = useCreateProductMutation();
//   const onFinish = async (values: any) => {
//     const formData = new FormData();

//     // Add images to FormData
//     fileList.forEach((file) => {
//       if (file.originFileObj) {
//         formData.append("productImages", file.originFileObj);
//       }
//     });

//     // Prepare body data
//     const bodyData = {
//       name: values.productTitle,
//       category: values.category,
//       price: values.price,
//       color: values.colors || [],
//       intro: values.productIntro,
//       guide: values.productGuide,
//       sku: values.sku,
//       tags: values.tags || [],
//       title: values.productTitle,
//       description: values.description,
//       faq: faqs.filter((faq) => faq.question && faq.answer),
//     };

//     formData.append("bodyData", JSON.stringify(bodyData));
//     fileList.forEach((file) => {
//       if (file.originFileObj) {
//         formData.append("productImages", file.originFileObj);
//       }
//     });
//     const res = await handleAsyncWithToast(async () => {
//       return createProduct(formData);
//     }, "Creating product...");
//     if (res?.data?.success) {
//       form.resetFields();
//       toast.success("Product created successfully!");
//     }
//   };

//   if (isLoading) {
//     return <Loader />;
//   }
//   return (
//     <div className="min-h-screen">
//       <Row gutter={24}>
//         {/* Form Section */}
//         <Col span={16}>
//           <Card className="shadow-sm">
//             <h2 className="text-2xl font-bold mb-4">Add Product</h2>
//             <Form
//               form={form}
//               layout="vertical"
//               onFinish={onFinish}
//               onValuesChange={handleFormChange}
//               initialValues={{
//                 productTitle: "iPhone 17 Pro",
//                 price: 1099,
//                 sku: "prd-001",
//               }}
//             >
//               {/* Product Title */}
//               <Form.Item
//                 label="Product title"
//                 name="productTitle"
//                 rules={[
//                   { required: true, message: "Please enter product title" },
//                 ]}
//               >
//                 <Input placeholder="Product title" />
//               </Form.Item>

//               {/* Upload Images */}
//               <Form.Item label="Upload product images">
//                 <Upload.Dragger
//                   multiple
//                   listType="picture-card"
//                   fileList={fileList}
//                   onChange={handleUploadChange}
//                   beforeUpload={() => false}
//                   className="upload-area"
//                 >
//                   <div className="text-center p-4">
//                     <PlusOutlined className="text-2xl text-gray-400 mb-2" />
//                     <div className="text-gray-500">Drop your images here</div>
//                   </div>
//                 </Upload.Dragger>
//               </Form.Item>

//               {/* Category */}
//               <Form.Item
//                 label="Select Category"
//                 name="category"
//                 rules={[
//                   { required: true, message: "Please select a category" },
//                 ]}
//               >
//                 <Select placeholder="Category">
//                   {categories.map((cat: any) => (
//                     <Option key={cat.id} value={cat.label}>
//                       {cat.label}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>

//               {/* Price */}
//               <Form.Item
//                 label="Product Price"
//                 name="price"
//                 rules={[{ required: true, message: "Please enter price" }]}
//               >
//                 <InputNumber
//                   placeholder="Product Price"
//                   style={{ width: "100%" }}
//                   min={0}
//                   step={0.01}
//                   precision={2}
//                 />
//               </Form.Item>

//               {/* Colors */}
//               <Form.Item label="Add Color" name="colors">
//                 <Select
//                   mode="multiple"
//                   placeholder="Select colors"
//                   style={{ width: "100%" }}
//                 >
//                   {colorOptions.map((color) => (
//                     <Option key={color.value} value={color.value}>
//                       <div className="flex items-center gap-2">
//                         <div
//                           className="w-4 h-4 rounded-full border"
//                           style={{ backgroundColor: color.color }}
//                         />
//                         {color.label}
//                       </div>
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>

//               {/* Product Intro */}
//               <Form.Item label="Product Intro" name="productIntro">
//                 <TextArea rows={3} placeholder="Intro" />
//               </Form.Item>

//               {/* Product Guide */}
//               <Form.Item label="Product Guide" name="productGuide">
//                 <TextArea rows={3} placeholder="Description" />
//               </Form.Item>

//               {/* SKU */}
//               <Form.Item
//                 label="SKU"
//                 name="sku"
//                 rules={[{ required: true, message: "Please enter SKU" }]}
//               >
//                 <Input placeholder="Input SKU" />
//               </Form.Item>

//               {/* Tags */}
//               <Form.Item label="Tags" name="tags">
//                 <Select
//                   mode="tags"
//                   placeholder="Input tag"
//                   style={{ width: "100%" }}
//                 >
//                   {availableTags.map((tag) => (
//                     <Option key={tag} value={tag}>
//                       {tag}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>

//               {/* Description */}
//               <Form.Item label="Description">
//                 <Form.Item name="title" style={{ marginBottom: 8 }}>
//                   <Input placeholder="Title" />
//                 </Form.Item>
//                 <Form.Item name="description" style={{ marginBottom: 0 }}>
//                   <TextArea rows={3} placeholder="Description" />
//                 </Form.Item>
//               </Form.Item>

//               {/* FAQs */}
//               <Form.Item label="Frequently Asked Question">
//                 {faqs.map((faq, index) => (
//                   <div key={index} className="mb-4 p-4 border rounded-lg">
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="font-medium">FAQ {index + 1}</span>
//                       {faqs.length > 1 && (
//                         <Button
//                           type="text"
//                           danger
//                           size="small"
//                           icon={<DeleteOutlined />}
//                           onClick={() => removeFAQ(index)}
//                         />
//                       )}
//                     </div>
//                     <Input
//                       placeholder="Question"
//                       value={faq.question}
//                       onChange={(e) =>
//                         updateFAQ(index, "question", e.target.value)
//                       }
//                       className="mb-2"
//                     />
//                     <TextArea
//                       placeholder="Answer"
//                       value={faq.answer}
//                       onChange={(e) =>
//                         updateFAQ(index, "answer", e.target.value)
//                       }
//                       rows={2}
//                     />
//                   </div>
//                 ))}
//                 <Button
//                   type="dashed"
//                   onClick={addFAQ}
//                   icon={<PlusOutlined />}
//                   className="w-full"
//                 >
//                   Add FAQ
//                 </Button>
//               </Form.Item>

//               {/* Submit Button */}
//               <Form.Item>
//                 <MyButton
//                   label="Add Product"
//                   fullWidth
//                   type="submit"
//                   iconPosition="left"
//                   customIcon={<PlusOutlined />}
//                 />
//               </Form.Item>
//             </Form>
//           </Card>
//         </Col>

//         {/* Preview Section */}
//         <Col span={8}>
//           <Card title="Preview" className="shadow-sm">
//             <div className="bg-white rounded-lg p-4">
//               <img
//                 src={previewData.image || "/placeholder.svg"}
//                 alt={previewData.name}
//                 className="w-full h-48 object-cover rounded-lg mb-4"
//               />
//               <h3 className="font-semibold text-lg mb-2">{previewData.name}</h3>
//               <p className="text-gray-600 mb-4">
//                 ${previewData.price.toFixed(2)}
//               </p>
//               <div className="flex gap-2">
//                 <Button type="primary" size="small">
//                   Edit
//                 </Button>
//                 <Button type="primary" danger size="small">
//                   Delete
//                 </Button>
//               </div>
//             </div>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// }
