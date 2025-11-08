"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}


const faqData: FAQItem[] = [
  {
    id: 1,
    question: "Do you really deliver same day — and is delivery free?",
    answer:
      "Yes, that’s one of our core promises. As long as your order is placed before our cut-off time (8pm daily), we deliver same day at no charge. There are no hidden delivery fees or surprise shipping costs. We’ve built our logistics for speed and reliability, so your tech arrives fast every time.",
  },
  {
    id: 2,
    question: "Which areas of the Cayman Islands do you deliver to?",
    answer:
      "We deliver island-wide across all three Cayman Islands — Grand Cayman, Cayman Brac, and Little Cayman. Orders on Grand Cayman are fulfilled same day within hours. For Cayman Brac and Little Cayman, we partner with Cayman Cargo to ensure your order arrives the same day or, in rare cases, by the next day, still at no additional cost. Wherever you are, we make sure your tech gets to you quickly and safely.",
  },
  {
    id: 3,
    question: "How do I pay for my order?",
    answer:
      "To make your experience as safe and comfortable as possible, we don’t take payments through our website. Instead, you can pay after your order arrives using any of the following methods:\n\n• Cash on Delivery\n• Cheque on Delivery\n• Debit or Credit Card (processed in person at delivery)\n• Online Bank Transfer\n\nYou never have to pre-pay or share payment details online. You only pay once you’ve received your order. Simple, secure, and worry-free.",
  },
  {
    id: 4,
    question: "What is your return, refund, and warranty policy?",
    answer:
      "All sales are final. Once a product is delivered, the sale is complete. (This policy helps us maintain the best prices and fastest service.)\n\n• Manufacturer warranties: Many items include an official manufacturer warranty.\n• 30-day limited warranty (store coverage): For products without a manufacturer warranty, we provide a 30-day limited warranty for factory defects.\n\nOur warranty doesn’t cover misuse, accidental damage, liquid exposure, or software issues.",
  },
  {
    id: 5,
    question: "What if you’re out of stock on something I really want?",
    answer:
      "Our system updates inventory in real time, so if it’s listed, it’s usually in stock. If a product does sell out, we’ll contact you right away with three options:\n\n• Place it on backorder with an estimated restock date\n• Swap it for an equivalent item\n• You’re always in control; we’ll never replace or charge you for anything without your approval.",
  },
  {
    id: 6,
    question: "I’m a tourist or visitor — can I order while I’m in Cayman and have it delivered to my hotel or rental?",
    answer:
      "Absolutely! Whether you’re here for a few days or a few months, you can shop just like a local. We deliver to hotels, resorts, Airbnbs, and vacation rentals anywhere in the Cayman Islands.",
  },
  {
    id: 7,
    question: "What kinds of support do you offer after my purchase?",
    answer:
      "We don’t disappear after delivery; we’re your ongoing tech partner. Our support includes:\n\n• Real human help via phone, WhatsApp, email, or social media.\n• Product setup guidance and advice to help you get the most out of your gear.\n• Troubleshooting help for minor setup or connectivity issues.\n\nWe’re local, responsive, and always here when you need us.",
  },
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(1);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 px-4 bg-gray-50">
      <div className="container py-12 mx-auto border-2 border-blue-300 rounded-lg">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <span className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-lg font-medium mb-4">
            Frequently Asked Questions
          </span>
          {/* <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Quick Help Before You Design
          </h2> */}
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className="max-w-[80%] mx-auto bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {faqData.map((item, index) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: "easeOut" as const },
                },
              }}
              className={`${index !== 0 ? "border-t border-gray-200" : ""}`}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-lg font-medium text-gray-900 pr-4">
                  {item.question}
                </span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                    openItem === item.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Animated Answer */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={
                  openItem === item.id
                    ? { height: "auto", opacity: 1 }
                    : { height: 0, opacity: 0 }
                }
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 text-gray-600 whitespace-pre-line leading-relaxed">
                  {item.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
