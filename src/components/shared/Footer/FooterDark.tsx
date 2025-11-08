"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaSnapchatGhost,
  FaTiktok,
  FaPinterestP,
} from "react-icons/fa";
import { FaXTwitter, FaThreads } from "react-icons/fa6";
import logo from "@/assets/images/logo.png";
import { useSubscribeNewsLetterMutation } from "@/redux/features/auth/authApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import Link from "next/link";

export default function FooterDark() {
  const [email, setEmail] = useState("");
  const [subscribe] = useSubscribeNewsLetterMutation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await handleAsyncWithToast(async () => {
      return subscribe({ email });
    }, "Subscribing to newsletter...");
    if (res?.data?.success) {
      setEmail("");
    }
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" as const },
    }),
  };

  return (
    <footer className="bg-gradient-to-br from-gray-950 via-black to-gray-900 py-16 px-4 border-t border-gray-800">
      <div className="container mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Company Info */}
          <motion.div
            variants={columnVariants}
            custom={0}
            className="lg:col-span-2"
          >
            <div className="mb-6">
              <img
                src={logo.src}
                alt="Logo"
                className="h-auto md:h-[100px] w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              At TeeCraft Dev we believe every tee tells a story. Whether you're
              designing a custom masterpiece or shopping our curated
              collections, we're here to bring your creative vision to life.
            </p>
          </motion.div>

          {/* Information */}
          <motion.div variants={columnVariants} custom={1}>
            <h3 className="font-semibold text-white mb-4">Information</h3>
            <ul className="space-y-3">
              {[
                { title: "About Us", link: "/about" },
                { title: "Our Blogs", link: "/blog" },
                // { title: "Privacy Policy", link: "/privacy-policy" },
                { title: "Contact Us", link: "/contact" },
                { title: "FAQ", link: "/#faq" },
                // { title: "Stay Connected", link: "/stay-connected" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.link}
                    className="text-gray-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Useful Links */}
          <motion.div variants={columnVariants} custom={2}>
            <h3 className="font-semibold text-white mb-4">Useful Links</h3>
            <ul className="space-y-3">
              {[
                { title: "My Account", link: "/user/edit-profile" },
                { title: "Browse Shop", link: "/shop" },
                { title: "Your Cart", link: "/cart" },
                { title: "Support", link: "/contact" },
                { title: "Testimonial", link: "/testimonials" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item?.link}
                    className="text-gray-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Get In Touch & Newsletter */}
          <motion.div
            variants={columnVariants}
            custom={3}
            className="lg:col-span-1"
          >
            <div className="mb-8">
              <h3 className="font-semibold text-white mb-4">Get In Touch</h3>
              <div className="space-y-3 text-sm text-gray-400">
                <Link href={`https://wa.me/13459293555`} target="_blank">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">📱</span>+ 1 345 929
                    3555
                  </div>
                </Link>
                <div>
                  <span className="text-green-500 mr-2">📧</span>{" "}
                  <a href="mailto:JH7Hv@example.com">info@techon345.com</a>
                </div>
                <div>
                  George Town, Grand Cayman
                  <br /> Cayman Islands Ky1-1206
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Newsletter</h3>
              <p className="text-sm text-gray-400 mb-4">
                Subscribe our newsletter
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address..."
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm text-gray-200 placeholder-gray-500"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-core-gradient text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300"
                >
                  Subscribe
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 Tech On 345. All rights reserved.
          </p>

          <div className="flex space-x-4">
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
        </motion.div>
      </div>
    </footer>
  );
}
