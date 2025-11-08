"use client";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Tag } from "antd";
import Link from "next/link";
import { Blog } from "..";

export function RelatedBlogs({ blogs }: { blogs: Blog[] }) {
  if(blogs?.length === 0) {
    return null
  }
  return (
    <div className="!space-y-8 container mx-auto mb-10 md:mb-16">
      {/* Section Header */}
      <div className="text-center space-y-2">
        <div className="text-sm text-white bg-gray-500 rounded-md w-fit mx-auto px-2 py-1">
          Latest Blogs
        </div>
        <h2 className="text-2xl font-semibold text-white">
          Browse Our Latest Blogs
        </h2>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs?.map((post) => (
          <Link href={`/blog/${post.id}`}>
            <Card
              className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 cursor-pointer shadow-xl"
              cover={
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post?.coverImage || "/placeholder.svg"}
                    alt={post?.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              }
            >
              <div className="p-2">
                <Tag color="blue" className="mb-3 text-xs">
                  {post.category}
                </Tag>
                <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                  {post.title}
                </h3>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  {post.shortDesc.split(" ").slice(0, 40).join(" ") + " ..."}
                </p>
                <div className="flex items-center gap-3">
                  <Avatar
                    style={{ backgroundColor: "#87d068" }}
                    icon={<UserOutlined />}
                  />
                  <div>
                    <p className="text-white font-medium text-sm">Admin</p>
                    {/* <p className="text-gray-400 text-xs">{post.author.role}</p> */}
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
