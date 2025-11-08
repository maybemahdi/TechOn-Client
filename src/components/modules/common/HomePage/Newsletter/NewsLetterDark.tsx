"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSubscribeNewsLetterMutation } from "@/redux/features/auth/authApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";

export default function NewsletterDark() {
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

  return (
    <section className="pb-16 pt-8 px-4 bg-black">
      <motion.div
        className="container mx-auto rounded-xl border border-[#bd5a1971] bg-gradient-to-br from-gray-900 via-gray-950 to-black shadow-xl p-8 md:p-12 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          Unlock Inspiration Daily!
        </motion.h2>

        <motion.p
          className="text-gray-400 mb-2 text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
        >
           Subscribe to get early access to new Deals, creative ideas, and insider updates.
        </motion.p>

        <motion.p
          className="text-gray-500 mb-8 text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
        >
         No clutter. No spam. Just next-level inspiration.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-md border border-gray-700 bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-core-gradient text-white font-semibold py-3 px-6 rounded-md hover:from-blue-700 hover:to-cyan-600 transition-all duration-300"
          >
            Subscribe
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
}
