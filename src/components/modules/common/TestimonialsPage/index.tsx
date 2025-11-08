import Link from "next/link";
import React from "react";
import Testimonials from "../HomePage/Testimonials/Testimonials";

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm container mx-auto py-8">
          <Link href={"/"} className="text-gray-400">
            Home
          </Link>
          <span className="text-gray-400">{">"}</span>
          <span className="text-white">Testimonials</span>
        </div>
        <Testimonials isPage />
      </div>
    </div>
  );
};

export default TestimonialsPage;
