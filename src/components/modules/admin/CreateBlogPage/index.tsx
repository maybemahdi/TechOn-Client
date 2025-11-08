"use client";

import Loading from "@/components/ui/core/Loading/Loading";
import MyButton from "@/components/ui/core/MyButton/MyButton";
import { useCreateBlogMutation } from "@/redux/features/admin/admin.api";
import { useGetAllCategoriesQuery } from "@/redux/features/product/product.api";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, Form, Input, Select, Upload } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const { TextArea } = Input;
const { Option } = Select;

// Fake category data
const categories = [
  { id: "cat-1", label: "Technology" },
  { id: "cat-2", label: "Business" },
  { id: "cat-3", label: "Lifestyle" },
  { id: "cat-4", label: "Health" },
  { id: "cat-5", label: "Education" },
];

interface BlogPart {
  index: number;
  title: string;
  desc: string;
  imageFile?: File | null;
}

interface BlogFormData {
  category: string;
  title: string;
  shortDesc: string;
}

export default function CreateBlogPage() {
  const navigate = useRouter();
  const [form] = Form.useForm();
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [blogParts, setBlogParts] = useState<BlogPart[]>([
    { index: 0, title: "", desc: "", imageFile: null },
  ]);
  const [loading, setLoading] = useState(false);

  const handleCoverImageUpload: UploadProps["customRequest"] = ({
    file,
    onSuccess,
  }) => {
    setCoverImageFile(file as File);
    onSuccess?.("ok");
  };

  const { data: response, isLoading } = useGetAllCategoriesQuery(undefined);
  const categories =
    response?.data?.map((item: any) => {
      return { id: item.id, label: item.name };
    }) || [];

  const handleBlogPartImageUpload = (
    partIndex: number
  ): UploadProps["customRequest"] => {
    return ({ file, onSuccess }) => {
      setBlogParts((prev) =>
        prev.map((part) =>
          part.index === partIndex ? { ...part, imageFile: file as File } : part
        )
      );
      onSuccess?.("ok");
    };
  };

  const addBlogPart = () => {
    const newIndex = blogParts.length;
    setBlogParts([
      ...blogParts,
      { index: newIndex, title: "", desc: "", imageFile: null },
    ]);
  };

  const removeBlogPart = (index: number) => {
    if (blogParts.length === 1) {
      toast.warning("At least one blog part is required!");
      return;
    }
    setBlogParts((prev) =>
      prev
        .filter((part) => part.index !== index)
        .map((part, idx) => ({ ...part, index: idx }))
    );
  };

  const updateBlogPart = (
    index: number,
    field: keyof BlogPart,
    value: string
  ) => {
    setBlogParts((prev) =>
      prev.map((part) =>
        part.index === index ? { ...part, [field]: value } : part
      )
    );
  };

  const [createBlog] = useCreateBlogMutation();

  const onFinish = async (values: BlogFormData) => {
    if (!coverImageFile) {
      toast.error("Cover image is required!");
      return;
    }

    const invalidParts = blogParts.filter(
      (part) => !part.title.trim() || !part.desc.trim()
    );
    if (invalidParts.length > 0) {
      toast.error("All blog parts must have a title and description!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      // Add cover image
      formData.append("coverImage", coverImageFile);

      // Add blog part images with indexed keys
      blogParts.forEach((part) => {
        if (part.imageFile) {
          formData.append(`uploadBlogImages[${part.index}]`, part.imageFile);
        }
      });

      // Add bodyData with correct structure
      formData.append(
        "bodyData",
        JSON.stringify({
          title: values.title,
          shortDesc: values.shortDesc,
          category: values.category, // Using category name, not ID
          parts: blogParts.map((part) => ({
            index: part.index,
            title: part.title,
            desc: part.desc,
          })),
        })
      );

      // Send to API
      const res = await handleAsyncWithToast(async () => {
        return createBlog(formData);
      }, "Creating blog...");

      if (res?.data?.success) {
        toast.success("Blog created successfully!");
        form.resetFields();
        setCoverImageFile(null);
        setBlogParts([{ index: 0, title: "", desc: "", imageFile: null }]);
      }
    } catch (error) {
      console.error("Failed to create blog:", error);
      toast.error("Failed to create blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const uploadButton = (
    <div className="flex flex-col items-center justify-center p-8 text-gray-400">
      <PlusOutlined className="text-2xl mb-2 text-red-500" />
      <div>Drop your files here</div>
    </div>
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-5xl">
      <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-6"
      >
        {/* Category Selection */}
        <Form.Item
          label={
            <span className="text-sm font-medium text-gray-700">
              Select Category
            </span>
          }
          name="category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select placeholder="Select Category" size="large" className="w-full">
            {categories.map((cat: any) => (
              <Option key={cat.id} value={cat.label}>
                {cat.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Title */}
        <Form.Item
          label={
            <span className="text-sm font-medium text-gray-700">Title</span>
          }
          name="title"
          rules={[
            { required: true, message: "Please enter a title!" },
            { min: 5, message: "Title must be at least 5 characters!" },
          ]}
        >
          <Input
            placeholder="Write topic"
            size="large"
            className="rounded-lg"
          />
        </Form.Item>

        {/* Short Description */}
        <Form.Item
          label={
            <span className="text-sm font-medium text-gray-700">
              Short Description
            </span>
          }
          name="shortDesc"
          rules={[
            { required: true, message: "Please enter a short description!" },
            { min: 10, message: "Description must be at least 10 characters!" },
          ]}
        >
          <TextArea
            placeholder="Write description"
            rows={4}
            className="rounded-lg"
          />
        </Form.Item>

        {/* Cover Image */}
        <Form.Item
          label={
            <span className="text-sm font-medium text-gray-700">
              Cover Image
            </span>
          }
          required
        >
          <Upload.Dragger
            name="coverImage"
            customRequest={handleCoverImageUpload}
            showUploadList={false}
            accept="image/*"
            className="rounded-lg transition-colors"
          >
            {coverImageFile ? (
              <div className="p-4">
                <div className="text-green-600 mb-2">
                  ✓ Cover image uploaded
                </div>
                <div className="text-sm text-gray-500">
                  {coverImageFile.name}
                </div>
              </div>
            ) : (
              uploadButton
            )}
          </Upload.Dragger>
        </Form.Item>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Blog Parts</h3>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={addBlogPart}
              className="bg-gradient-to-r from-blue-600 to-cyan-400 border-0 rounded-lg px-6 py-2 h-auto"
            >
              Add Blog Part
            </Button>
          </div>

          {blogParts.map((part, idx) => (
            <div
              key={part.index}
              className="border border-gray-200 rounded-lg p-6 space-y-4 relative"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-md font-medium text-gray-700">
                  Part {idx + 1}
                </h4>
                {blogParts.length > 1 && (
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeBlogPart(part.index)}
                  >
                    Remove
                  </Button>
                )}
              </div>

              {/* Part Title */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Title
                </label>
                <Input
                  placeholder="Write part title"
                  size="large"
                  value={part.title}
                  onChange={(e) =>
                    updateBlogPart(part.index, "title", e.target.value)
                  }
                  className="rounded-lg"
                />
              </div>

              {/* Part Description */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Description
                </label>
                <TextArea
                  placeholder="Write part description"
                  rows={4}
                  value={part.desc}
                  onChange={(e) =>
                    updateBlogPart(part.index, "desc", e.target.value)
                  }
                  className="rounded-lg"
                />
              </div>

              {/* Part Image (Optional) */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Image (Optional)
                </label>
                <Upload.Dragger
                  name={`blogPartImage-${part.index}`}
                  customRequest={handleBlogPartImageUpload(part.index)}
                  showUploadList={false}
                  accept="image/*"
                  className="rounded-lg transition-colors"
                >
                  {part.imageFile ? (
                    <div className="p-4">
                      <div className="text-green-600 mb-2">
                        ✓ Image uploaded
                      </div>
                      <div className="text-sm text-gray-500">
                        {part.imageFile.name}
                      </div>
                    </div>
                  ) : (
                    uploadButton
                  )}
                </Upload.Dragger>
              </div>
            </div>
          ))}
        </div>

        {/* Publish Button */}
        <Form.Item className="mb-0">
          <MyButton label="Publish Blog" fullWidth type="submit" />
        </Form.Item>
      </Form>
    </div>
  );
}
