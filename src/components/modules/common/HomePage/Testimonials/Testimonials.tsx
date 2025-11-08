"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Testimonial {
  id: number;
  name: string;
  title: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "M Ebanks",
    title: "George Town, Grand Cayman",
    rating: 5,
    text: "I ordered a new iPhone at 10 a.m. and it showed up at noon, no extra charge, no fuss. The courier was friendly and helped me set up Face ID right there. Best tech shopping experience I’ve had here in Cayman.",
    // avatar: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: 2,
    name: "S. Bodden",
    title: "West Bay, Grand Cayman",
    rating: 5,
    text: "Love the idea of same-day delivery. My new iPhone 16 Pro Max arrived safely in 45 minutes. The service was professional too.",
    // avatar: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    id: 3,
    name: "R. Smith",
    title: "Spotts, Grand Cayman",
    rating: 5,
    text: "I bought a gaming console for my son. The delivery came faster than I expected, and the support team even walked me through connecting the new console to WiFi. Very impressed, local tech at its best.",
    // avatar: "https://randomuser.me/api/portraits/men/31.jpg",
  },
  {
    id: 4,
    name: "A. Watler",
    title: "Cayman Brac",
    rating: 5,
    text: "As someone living on Brac, I was skeptical about same-day delivery here. But they partnered with Cayman Cargo and my order arrived the very same day. The free delivery was a nice bonus. Well done, techON345!",
    // avatar: "https://randomuser.me/api/portraits/women/41.jpg",
  },
  {
    id: 5,
    name: "Priya",
    title: "Savannah, Grand Cayman",
    rating: 5,
    text: "Great experience! I ordered a smart home device for my condo. They delivered in under 1 hour and even helped test it before leaving. I felt taken care of. I’ll be back for more stuff.",
    // avatar: "https://randomuser.me/api/portraits/women/51.jpg",
  },
  {
    id: 6,
    name: "D. Ebanks",
    title: "East End, Grand Cayman",
    rating: 5,
    text: "I like that I only pay upon delivery, gives peace of mind. My order came quickly, and the delivery guy accepted card payment at my door. Everything went smoothly.",
    // avatar: "https://randomuser.me/api/portraits/men/61.jpg",
  },
  {
    id: 7,
    name: "C. McLaughlin",
    title: "Bodden Town, Grand Cayman",
    rating: 5,
    text: "I needed a charger and a backup power bank last minute. techON345 came through in under an hour. The prices were very fair. Local, fast, reliable.",
    // avatar: "https://randomuser.me/api/portraits/men/71.jpg",
  },
  {
    id: 8,
    name: "W. Thompson",
    title: "Rum Point, Grand Cayman",
    rating: 5,
    text: "I ordered while on vacation for my kids. They delivered to our rental villa, as promised. Everything was in perfect shape.",
    // avatar: "https://randomuser.me/api/portraits/women/81.jpg",
  },
];


const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const scaleVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <motion.div
      variants={scaleVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-[#0848AF] backdrop-blur-sm rounded-2xl p-6 h-full border border-[#0848AF]"
    >
      {/* Star Rating */}
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= testimonial.rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-300 text-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-white text-sm leading-relaxed mb-6">
        {testimonial.text}
      </p>

      {/* Customer Info */}
      <div className="flex items-center gap-3">
        {/* <img
          src={testimonial.avatar || "/placeholder.svg"}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        /> */}
        <div>
          <h4 className="text-white font-medium text-sm">{testimonial.name}</h4>
          <p className="text-white/70 text-xs">{testimonial.title}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function Testimonials({ isPage = false }: { isPage?: boolean }) {
  return (
    <section id="testimonial" className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-black/90"></div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          {!isPage ? (
            <>
              <div className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                Testimonials
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What Our Customers Says
              </h2>
            </>
          ) : (
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Testimonials
            </h2>
          )}
        </motion.div>

        {/* Testimonials Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !bg-white/50",
              bulletActiveClass: "swiper-pagination-bullet-active !bg-white",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            
            effect="coverflow"
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <motion.button
            variants={scaleVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>
          <motion.button
            variants={scaleVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Swiper Styles */}
      <style jsx global>{`
        .testimonials-swiper .swiper-pagination {
          bottom: -50px !important;
        }
        .testimonials-swiper .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          margin: 0 6px !important;
        }
      `}</style>
    </section>
  );
}
