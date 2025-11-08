"use client";
import React from "react";
import { motion } from "framer-motion";
const Promise = () => {
  return (
    <section className="bg-black  text-white py-16 px-4">
      <h2 className="text-4xl lg:text-5xl font-bold text-center mb-8">
        Our Brand Promise:
      </h2>
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p className=" text-gray-200 leading-relaxed">
            We’re a forward-thinking e-commerce company built to make buying
            electronics & more in the Cayman Islands fast, easy, and
            frustration-free. Whether you’re a local or a visitor, we’re here to
            give you a better tech experience.
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-200">
            <li>
              We only stock <b>trusted, high-performance tech</b>
            </li>
            <li>We deliver fast — because your time is the most valuable</li>
            <li>We offer real support — because your experience matters</li>
            <li>
              We deliver quickly & reliably — no waiting for international
              shipping
            </li>
            <li>We stock the most trusted products</li>
            <li>
              We make your experience <b>smooth, modern, and effortless</b>
            </li>
          </ul>
        </motion.div>

        {/* --- Experience --- */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p className=" text-gray-200 leading-relaxed">
            We saw the gap, the long shipping delays, the lack of options, and
            decided to bridge it with something better —{" "}
            <b>Digital-First Electronics</b> store that’s always open, always
            stocked, and always reliable.
          </p>

          <p className="mt-4 text-gray-200 leading-relaxed">
            No matter who you are or how long you’re here, we believe you
            deserve:
          </p>
          <ul className="list-disc list-inside mt-3 space-y-1">
            <li>Faster access to quality innovations & more</li>
            <li>Responsive on-island delivery, available same day</li>
            <li>Real support from real people</li>
            <li>Fast replacement for warranty issues</li>
            <li>
              Exceptional <b>after-sales service</b> with professional Tech and
              Value service
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Promise;
