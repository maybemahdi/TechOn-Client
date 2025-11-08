"use client";

import Loading from "@/components/ui/core/Loading/Loading";
import MyButton from "@/components/ui/core/MyButton/MyButton";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/redux/features/admin/admin.api";
import { useGetAllCategoriesQuery } from "@/redux/features/product/product.api";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Input } from "antd";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
}

export default function CategoriesPage() {
  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetAllCategoriesQuery(undefined);

  const categories = response?.data || [];

  const [newCategory, setNewCategory] = useState("");

  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    const res = await handleAsyncWithToast(async () => {
      return createCategory({ name: newCategory });
    }, "Creating category...");

    if (res?.data?.success) {
      setNewCategory("");
    }
  };
  const handleDeleteCategory = async (id: string) => {
    const res = await handleAsyncWithToast(async () => {
      return deleteCategory(id);
    }, "Deleting category...");
    if (res?.data?.success) {
      toast.success("Category deleted successfully!");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddCategory();
    }
  };

  if (isLoading || isFetching) return <Loading />;

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          All categories
        </h1>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {categories.map((category: { id: string; name: string }) => (
            <Card
              key={category.id}
              className="relative border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              styles={{ body: { padding: "24px 16px", textAlign: "center" } }}
            >
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="absolute top-2 right-2 w-6 h-6 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <CloseOutlined className="text-white text-xs" />
              </button>
              <div className="text-gray-900 font-medium text-base">
                {category.name}
              </div>
            </Card>
          ))}
        </div>

        {/* Add Category Section */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-900">
            Product Category
          </label>

          <Input
            placeholder="Write category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyPress={handleKeyPress}
            className="h-12 text-base"
            style={{
              borderRadius: "8px",
              border: "1px solid #d1d5db",
            }}
          />

          <MyButton
            label="Add Category"
            onClick={handleAddCategory}
            customIcon={<PlusOutlined />}
            iconPosition="left"
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}
