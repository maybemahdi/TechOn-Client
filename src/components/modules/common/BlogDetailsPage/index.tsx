"use client";
import FooterDark from "@/components/shared/Footer/FooterDark";
import Image from "next/image";
import Link from "next/link";
import { BiLogoBlogger } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
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
import NewsletterDark from "../HomePage/Newsletter/NewsLetterDark";
import {
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
} from "@/redux/features/blog/blog.api";
import Loading from "@/components/ui/core/Loading/Loading";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { RelatedBlogs } from "./RelatedBlogs/RelatedBlogs";

export interface Blog {
  id: string;
  title: string;
  shortDesc: string;
  coverImage: string;
  category: string;
  parts: Part[];
  createdAt: string;
  updatedAt: string;
}

export interface Part {
  title: string;
  desc: string;
  image?: string;
  index: number;
}

const BlogDetailsPage = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetSingleBlogQuery(id, { skip: !id });
  const blog: Blog = data?.data;
  const category = blog?.category;

  const { data: blogResponse, isLoading: isBlogLoading } = useGetAllBlogsQuery(
    [
      {
        name: "limit",
        value: 7,
      },
      {
        name: "category",
        value: category,
      },
    ],
    {
      skip: !category,
    }
  );

  const blogs: Blog[] = blogResponse?.data?.blogs || [];

  if (isLoading || isBlogLoading) return <Loading />;
  return (
    <div className="min-h-screen bg-black">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm container mx-auto py-8">
        <Link href={"/"} className="text-gray-400">
          Home
        </Link>
        <span className="text-gray-400">{">"}</span>
        <Link href={"/blog"} className="text-gray-400">
          Blog
        </Link>
        <span className="text-gray-400">{">"}</span>
        <span className="text-white">{blog?.title}</span>
      </div>

      {/* details section */}
      <section className="container mx-auto px-4 pb-10">
        {/* Date */}
        <p className="text-center text-sm text-gray-400 uppercase tracking-wider mb-3">
          Published on {new Date(blog?.createdAt).toLocaleDateString()}
        </p>

        {/* Title */}
        <h1 className="text-center text-2xl md:text-3xl font-bold text-white mb-2">
          {blog?.title}
        </h1>

        {/* Description */}
        <p className="text-center text-gray-400 mb-8">{blog?.shortDesc}</p>

        {/* Blog Image */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <Image
            src={
              blog?.coverImage ||
              "https://www.notebookcheck.net/fileadmin/Notebooks/Apple/iPhone_16_Pro/16_zu_9_Teaser.JPEG"
            }
            alt="Blog cover"
            width={700}
            height={400}
            className="mx-auto rounded-xl  object-cover"
            priority
            quality={100}
          />
        </div>
      </section>

      {/* Extra Description Section */}
      {blog?.parts?.map((part: Part, index: number) => (
        <div
          key={index}
          className="grid md:grid-cols-1 gap-8 items-center container mx-auto px-4 py-10"
        >
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-white mb-4">
              {part?.title}
            </h2>
            <p className="text-gray-300 leading-relaxed">{part?.desc}</p>
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg">
            {part?.image && (
              <Image
                src={part?.image}
                alt="Blog cover"
                width={700}
                height={400}
                className="mx-auto rounded-xl object-cover"
                priority
                quality={100}
              />
            )}
          </div>
        </div>
      ))}

      {/* Author + Share Section */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center md:items-start py-8">
        {/* Author Info */}
        <div className="flex items-center gap-3 mb-6 md:mb-0">
          <div className="flex flex-col items-start gap-3">
            <p className="text-white font-medium">About the author</p>
            <div className="flex items-center gap-3">
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
              <div>
                <p className="text-white font-medium">{"Admin"}</p>
                {/* <p className="text-sm text-gray-400">{"authorRole"}</p> */}
              </div>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <p className="text-white font-medium">Share this article</p>
          <div className="flex gap-4 text-gray-300 text-lg">
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

      <NewsletterDark />
      <RelatedBlogs blogs={blogs?.filter((b) => b.id !== blog?.id)} />
      <FooterDark />
    </div>
  );
};

export default BlogDetailsPage;
