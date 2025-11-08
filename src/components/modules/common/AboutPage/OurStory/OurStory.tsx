"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import companies from "@/assets/images/companies.png";
import ourStoryImage from "@/assets/images/ourStoryImage.png";
import { Play } from "lucide-react";
import MyGradientButton from "@/components/ui/core/MyButton/MyGradientButton";

const OurStory = () => {
  const [activeTab, setActiveTab] = useState("Goals");

  const tabs = ["Goals", "Mission", "Vision"];

  //  "Individuals shopping for personal tech.",
  //   "Small businesses needing on-island solutions.",
  //   "Medium to large companies sourcing trusted electronics",
  //   "5-Star Rated Service",

const features = [
  // Goals
  {
    category: "Goals",
    description: "Help individuals discover high-quality tech at fair prices.",
  },
  {
    category: "Goals",
    description:
      "Support small businesses with reliable IT and hardware solutions.",
  },
  {
    category: "Goals",
    description:
      "Provide corporate clients with scalable and efficient electronics procurement.",
  },
  {
    category: "Goals",
    description:
      "Deliver 5-star customer service and personalized shopping experiences.",
  },
  {
    category: "Goals",
    description:
      "Offer sustainable and eco-friendly product options wherever possible.",
  },

  // Mission
  {
    category: "Mission",
    description:
      "To empower people and businesses through innovative technology.",
  },
  {
    category: "Mission",
    description:
      "To make advanced tech accessible to everyone in the Cayman Islands and beyond.",
  },
  {
    category: "Mission",
    description:
      "To provide trusted, top-quality electronics backed by excellent local support.",
  },
  {
    category: "Mission",
    description:
      "To build long-term relationships with customers through transparency and reliability.",
  },

  // Vision
  {
    category: "Vision",
    description:
      "To become the most trusted and customer-focused tech retailer in the Caribbean.",
  },
  {
    category: "Vision",
    description:
      "To inspire innovation and digital growth across local communities.",
  },
  {
    category: "Vision",
    description:
      "To redefine how technology enhances everyday life in the modern world.",
  },
  {
    category: "Vision",
    description:
      "To set new standards for sustainability and service in the global tech retail market.",
  },
];


  return (
    <section className="bg-black text-white py-16 px-4">
      <div className="container mx-auto">
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Side - Video/Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }} // animate when 30% of element is visible
            transition={{ duration: 1 }}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <video width="100%" controls>
                <source
                  src="https://res.cloudinary.com/daudgshta/video/upload/v1760067171/Untitled_design_n6dwzd.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">
              Who We Serve
            </h2>

            {/* Tabs */}
            <div className="flex gap-4 mb-8">
              {tabs.map((tab) => (
                <MyGradientButton
                  variant="secondary"
                  key={tab}
                  label={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`!px-6 !py-5 !w-full rounded-lg font-medium transition-all duration-300
                  ${
                    activeTab === tab
                      ? "!bg-yellow-500 outline-none ring-4 ring-opacity-50 ring-orange-400"
                      : ""
                  }
                   `}
                />
              ))}
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {features
                ?.filter((feature) => feature.category === activeTab)
                .map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.2 * index }}
                    className="flex items-center gap-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.404 22.4038C4.66517 22.4038 0 17.7386 0 11.9998C0 6.26092 4.66517 1.5957 10.404 1.5957C13.0356 1.5957 15.5052 2.55151 17.4292 4.3152C16.7892 4.69361 16.1716 5.11278 15.5776 5.56649C14.1198 4.39038 12.3071 3.74284 10.404 3.74284C5.85589 3.74284 2.14714 7.45164 2.14714 11.9998C2.14714 16.5479 5.85589 20.2567 10.404 20.2567C16.7323 20.2567 20.4895 13.4922 17.7676 8.23278C18.1801 7.84916 18.6047 7.47733 19.0405 7.11791C19.1692 7.01178 19.299 6.90664 19.4297 6.80255C20.3402 8.37518 20.8082 10.1582 20.8082 11.9997C20.8081 17.7386 16.1429 22.4038 10.404 22.4038Z"
                        fill="#FF6903"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.6773 17.348C10.5602 17.348 10.4626 17.27 10.4236 17.1724C10.4041 17.1333 8.72535 12.7999 6.1292 11.1602C5.62168 10.8479 5.23136 10.5161 5.38749 9.7743C5.54361 9.05207 6.03165 8.64215 6.91001 8.44694C8.47156 8.11509 10.1503 10.5356 10.7749 11.5311C12.9611 8.34939 17.3336 3.35226 23.697 2.76667C24.004 2.73068 24.1175 3.18572 23.8337 3.31323C23.7361 3.35226 14.6398 7.51006 10.9506 17.1919C10.892 17.2895 10.7944 17.348 10.6773 17.348Z"
                        fill="#FF6903"
                      />
                    </svg>
                    <span className="text-lg text-gray-300">
                      {feature?.description}
                    </span>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>

        {/* Brand Logos */}
        <motion.div
          className="pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <img src={companies.src} alt="Brand Logos" />
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;
