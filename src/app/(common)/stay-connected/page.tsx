import Footer from "@/components/shared/Footer/Footer";
import MyButton from "@/components/ui/core/MyButton/MyButton";
import Link from "next/link";
import React from "react";
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

const SocialCard = ({
  icon: Icon,
  iconColor,
  name,
  bgColor,
  url,
}: {
  icon: React.ElementType;
  iconColor: string;
  name: string;
  bgColor: string;
  url: string;
}) => (
  <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow">
    <div className={`${bgColor} rounded-2xl p-4 mb-4`}>
      <Icon className={`!w-8 !h-8 ${iconColor}`} strokeWidth={1.5} />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
    <p className="text-sm text-gray-500 mb-6">Follow us for daily updates</p>
    <a href={url} target="_blank" className="w-full">
      <MyButton label={name === "YouTube" ? "Subscribe" : "Follow"} fullWidth />
    </a>
  </div>
);

export default function StayConnected() {
  const socialPlatforms = [
    {
      icon: FaFacebookF,
      name: "Facebook",
      iconColor: "text-[#1877F2]", // Official blue
      bgColor: "bg-[#E7F3FF]", // Light blue background
      url: "https://www.facebook.com/techon345",
    },
    {
      icon: FaInstagram,
      name: "Instagram",
      iconColor: "text-[#E4405F]", // Instagram pink/red gradient base
      bgColor: "bg-[#FFE5EC]", // Soft pink background
      url: "https://www.instagram.com/techon345",
    },
    {
      icon: FaTiktok,
      name: "TikTok",
      iconColor: "text-[#ffffff]", // TikTok teal #69C9D0
      bgColor: "bg-[#010101]", // Black base background
      url: "https://www.tiktok.com/@techon3451",
    },
    {
      icon: FaYoutube,
      name: "YouTube",
      iconColor: "text-[#FF0000]", // YouTube red
      bgColor: "bg-[#FFECEC]", // Light red background
      url: "https://www.youtube.com/@techon345",
    },
    {
      icon: FaXTwitter,
      name: "X (Twitter)",
      iconColor: "text-black", // X is pure black logo now
      bgColor: "bg-[#E6E6E6]", // Light gray background
      url: "https://www.x.com/techon345",
    },
    {
      icon: FaLinkedinIn,
      name: "LinkedIn",
      iconColor: "text-[#0A66C2]", // LinkedIn blue
      bgColor: "bg-[#EAF3FC]", // Light blue background
      url: "https://www.linkedin.com/company/techon345",
    },
    {
      icon: FaPinterestP,
      name: "Pinterest",
      iconColor: "text-[#E60023]", // Pinterest red
      bgColor: "bg-[#FFE5E9]", // Soft pink/red background
      url: "https://www.pinterest.com/techon345",
    },
    {
      icon: FaThreads,
      name: "Threads",
      iconColor: "text-black", // Threads is black & white logo
      bgColor: "bg-[#F2F2F2]", // Light gray background
      url: "https://www.threads.net/@techon345",
    },
    {
      icon: FaSnapchatGhost,
      name: "Snapchat",
      iconColor: "text-[#FFFC00]", // Official yellow
      bgColor: "bg-[#000000]", // Black background for contrast
      url: "https://www.snapchat.com/@techon345",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-16 px-4 md:px-0">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Stay Connected
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Follow us on your favorite platforms and be part of our growing
              community. Click any platform below to connect with just one tap!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialPlatforms.map((platform, index) => (
              <SocialCard
                key={index}
                icon={platform.icon}
                iconColor={platform?.iconColor}
                name={platform.name}
                bgColor={platform.bgColor}
                url={platform.url}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
