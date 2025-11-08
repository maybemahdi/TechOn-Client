"use client";

import blogDemoImag from "@/assets/images/demoBlog.png";
import Loading from "@/components/ui/core/Loading/Loading";
import MyButton from "@/components/ui/core/MyButton/MyButton";
import {
  useDeleteBlogMutation,
  useGetAllBlogForAdminQuery,
} from "@/redux/features/admin/admin.api";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { DeleteOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Pagination } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

const { Meta } = Card;

interface BlogPost {
  id: string;
  title: string;
  shortDesc: string;
  coverImage: string;
  category: string;
}

const BlogManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [objectQuery, setObjectQuery] = useState<
    { name: string; value: any }[]
  >([
    {
      name: "page",
      value: currentPage,
    },
    {
      name: "limit",
      value: pageSize,
    },
  ]);

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  useEffect(() => {
    setObjectQuery([
      {
        name: "page",
        value: currentPage,
      },
      {
        name: "limit",
        value: pageSize,
      },
    ]);
  }, [currentPage, pageSize]);

  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetAllBlogForAdminQuery(objectQuery);
  const blogs: BlogPost[] = response?.data?.blogs || [];

  // const [blogs, setBlogs] = React.useState<BlogPost[]>([
  //   {
  //     id: 1,
  //     title: "Lorem Ipsum is simply dummy text of the printing",
  //     description:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  //     category: "Smart mobiles",
  //     author: {
  //       name: "Alex T.",
  //       role: "Owner",
  //       avatar: "/abstract-profile.png",
  //     },
  //     image: blogDemoImag.src,
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem Ipsum is simply dummy text of the printing",
  //     description:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  //     category: "Smart mobiles",
  //     author: {
  //       name: "Alex T.",
  //       role: "Owner",
  //       avatar: "/abstract-profile.png",
  //     },
  //     image: blogDemoImag.src,
  //   },
  //   {
  //     id: 3,
  //     title: "Lorem Ipsum is simply dummy text of the printing",
  //     description:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  //     category: "Smart mobiles",
  //     author: {
  //       name: "Alex T.",
  //       role: "Owner",
  //       avatar: "/abstract-profile.png",
  //     },
  //     image: blogDemoImag.src,
  //   },
  // ]);

  const [deleteBlog] = useDeleteBlogMutation();
  const handleDeleteBlog = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await handleAsyncWithToast(async () => {
          return deleteBlog(id);
        }, "Deleting blog...");
        if (res?.data?.success) {
          Swal.fire("Deleted!", "Your blog has been deleted.", "success");
        }
      }
    });
  };

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      {/* Create Blog Button */}
      <div className="mb-6">
        <Link href={"/admin/blogs/create"}>
          <MyButton label="Create Blog" customIcon={<PlusOutlined />} />
        </Link>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-8xl">
        {blogs?.map((blog) => (
          <Card
            key={blog?.id}
            hoverable
            className="rounded-xl cursor-auto overflow-hidden border border-orange-200 bg-white"
            cover={
              <img
                alt={blog?.title}
                src={blog?.coverImage || "/placeholder.svg"}
                className="h-48 w-full object-cover"
              />
            }
            actions={[
              <div className="px-5">
                <MyButton
                  onClick={() => handleDeleteBlog(blog?.id)}
                  label="Delete"
                  className="!bg-sec-gradient !py-2 !px-3 !text-sm"
                  customIcon={<DeleteOutlined />}
                />
              </div>,
            ]}
          >
            {/* Category Tag */}
            <div className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded inline-block mb-3">
              {blog?.category}
            </div>

            {/* Title */}
            <h3 className="text-base font-semibold text-gray-800 mb-3 leading-snug">
              {blog?.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {blog.shortDesc}
            </p>

            {/* Author Info */}
            <Meta
              avatar={
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                />
              }
              title={
                <div className="text-sm font-medium text-gray-800">Admin</div>
              }
            />
          </Card>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-center w-fit mx-auto gap-4 my-8">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={response?.data?.totalData || 0}
          onChange={handlePageChange}
          className="custom-pagination"
        />
      </div>
    </div>
  );
};

export default BlogManagement;
