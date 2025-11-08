"use client";

import FooterDark from "@/components/shared/Footer/FooterDark";
import MyButton from "@/components/ui/core/MyButton/MyButton";
import { useCreateContactMutation } from "@/redux/features/product/product.api";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { Breadcrumb, Form, Input } from "antd";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaSnapchat,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { FaThreads, FaXTwitter } from "react-icons/fa6";
import { toast } from "sonner";

const { TextArea } = Input;

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [form] = Form.useForm();
  const [contact] = useCreateContactMutation();
  const onFinish = async (values: ContactFormData) => {
    const res = await handleAsyncWithToast(async () => {
      return contact(values);
    }, "Sending message...");
    if (res?.data?.success) {
      form.resetFields();
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="container mx-auto px-4 py-8"
      >
        {/* Breadcrumb */}
        <Breadcrumb
          style={{ color: "white" }}
          className="mb-8 !text-white"
          separator=">"
          items={[
            { title: "Home", href: "/" },
            { title: "Contact", href: "#" },
          ]}
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Have questions about custom designs, orders, or just want to chat?
            <br />
            Reach out—we'd love to hear from you!
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-gradient-to-br from-blue-900/20 to-orange-900/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8"
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="space-y-6"
            >
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Please enter your name" },
                  { min: 2, message: "Name must be at least 2 characters" },
                ]}
              >
                <Input
                  placeholder="Your Name"
                  className="bg-transparent border-gray-600 text-white placeholder-gray-400 h-12 rounded-lg"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "#4B5563",
                    color: "white",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input
                  placeholder="Your Email"
                  className="!bg-transparent !border-gray-600 text-white placeholder-gray-400 h-12 rounded-lg"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "#4B5563",
                    color: "white",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="subject"
                rules={[
                  { required: true, message: "Please enter a subject" },
                  { min: 5, message: "Subject must be at least 5 characters" },
                ]}
              >
                <Input
                  placeholder="Subject"
                  className="bg-transparent border-gray-600 text-white placeholder-gray-400 h-12 rounded-lg"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "#4B5563",
                    color: "white",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="message"
                rules={[
                  { required: true, message: "Please enter your message" },
                  {
                    min: 10,
                    message: "Message must be at least 10 characters",
                  },
                ]}
              >
                <TextArea
                  placeholder="Your Message"
                  rows={6}
                  className="bg-transparent border-gray-600 text-white placeholder-gray-400 rounded-lg"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "#4B5563",
                    color: "white",
                    resize: "none",
                  }}
                />
              </Form.Item>

              <Form.Item>
                <MyButton type="submit" label="Send Message" fullWidth />
              </Form.Item>
            </Form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-gradient-to-br from-blue-900/20 to-orange-900/20 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
          >
            <div className="space-y-6">
              {/* Email Card */}
              <div className="bg-gray-800 rounded-xl p-6 border border-orange-400">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-700 rounded-lg px-5 py-4 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                    >
                      <path
                        d="M23.7885 5.26807L16.5098 12.4999L23.7885 19.7317C23.92 19.4567 23.9999 19.1527 23.9999 18.828V6.17177C23.9999 5.84707 23.92 5.54308 23.7885 5.26807Z"
                        fill="white"
                      />
                      <path
                        d="M21.892 4.0625H2.11073C1.78603 4.0625 1.48205 4.14233 1.20703 4.27391L10.51 13.53C11.3325 14.3525 12.6702 14.3525 13.4927 13.53L22.7957 4.27391C22.5207 4.14233 22.2167 4.0625 21.892 4.0625Z"
                        fill="white"
                      />
                      <path
                        d="M0.211406 5.26807C0.0798281 5.54308 0 5.84707 0 6.17177V18.828C0 19.1527 0.0798281 19.4568 0.211406 19.7317L7.49011 12.4999L0.211406 5.26807Z"
                        fill="white"
                      />
                      <path
                        d="M15.517 13.4941L14.487 14.5241C13.1164 15.8947 10.8863 15.8947 9.51567 14.5241L8.48573 13.4941L1.20703 20.726C1.48205 20.8575 1.78603 20.9374 2.11073 20.9374H21.892C22.2167 20.9374 22.5207 20.8575 22.7957 20.726L15.517 13.4941Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-semibold mb-1">
                      Email us
                    </h3>
                    <p className="text-gray-300 text-sm mb-2">
                      We will respond within 24 hours
                    </p>
                    <a href="mailto:info@techon345.com" className="text-white">
                      info@techon345.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Call Card */}
              <div className="bg-gray-800 rounded-xl p-6 border border-orange-400">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-700 rounded-lg px-5 py-4 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.8651 13.903C14.4109 14.0886 14.1208 14.7997 13.8264 15.163C13.6754 15.3491 13.4954 15.3781 13.2634 15.2848C11.5586 14.6056 10.2517 13.468 9.31091 11.8991C9.15153 11.6558 9.18013 11.4636 9.37231 11.2377C9.65637 10.903 10.0136 10.5228 10.0904 10.0719C10.2611 9.07438 8.957 5.98016 7.23481 7.38219C2.27919 11.4205 15.5017 22.1309 17.8881 16.3381C18.5631 14.6961 15.6179 13.5945 14.8651 13.903ZM12.0001 22.4037C10.2475 22.4037 8.52294 21.9378 7.01309 21.0556C6.77075 20.9136 6.47778 20.8761 6.20684 20.9497L2.92606 21.8502L4.06888 19.3325C4.2245 18.9898 4.18466 18.5909 3.96481 18.2863C2.74231 16.5917 2.09591 14.5911 2.09591 12.5C2.09591 7.03859 6.53872 2.59578 12.0001 2.59578C17.4615 2.59578 21.9039 7.03859 21.9039 12.5C21.9039 17.9609 17.4611 22.4037 12.0001 22.4037ZM12.0001 0.5C5.38325 0.5 0.000125453 5.88312 0.000125453 12.5C0.000125453 14.8278 0.661063 17.0633 1.91684 19.0034L0.0938755 23.0183C-0.0744058 23.3891 -0.0129995 23.8231 0.250438 24.132C0.452938 24.3687 0.745907 24.5 1.04825 24.5C1.72419 24.5 5.40997 23.3417 6.34794 23.0844C8.08184 24.012 10.0267 24.5 12.0001 24.5C18.6165 24.5 24.0001 19.1164 24.0001 12.5C24.0001 5.88312 18.6165 0.5 12.0001 0.5Z"
                        fill="#39AE41"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-semibold mb-1">
                      Call us
                    </h3>
                    <p className="text-gray-300 text-sm mb-2">
                      We will respond within 24 hours
                    </p>
                    <Link href={`https://wa.me/13459293555`} target="_blank">
                      <p className="text-white">+ 1 345 929 3555</p>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Social Media Card */}
              <div className="bg-gray-800 rounded-xl p-6 border border-orange-400">
                <h3 className="text-white text-xl font-semibold mb-4">
                  Social Media
                </h3>
                <div className="flex items-center gap-4 flex-wrap">
                  <Link
                    href="https://www.facebook.com/techon345"
                    target="_blank"
                  >
                    <FaFacebook className="w-6 h-6 text-white hover:text-blue-500 cursor-pointer transition-colors" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/techon345"
                    target="_blank"
                  >
                    <FaInstagram className="w-6 h-6 text-white hover:text-pink-500 cursor-pointer transition-colors" />
                  </Link>
                  <Link
                    href="https://www.tiktok.com/@techon3451"
                    target="_blank"
                  >
                    <FaTiktok className="w-6 h-6 text-white hover:text-black cursor-pointer transition-colors" />
                  </Link>
                  <Link
                    href="https://www.youtube.com/@techon345"
                    target="_blank"
                  >
                    <FaYoutube className="w-6 h-6 text-white hover:text-red-500 cursor-pointer transition-colors" />
                  </Link>
                  <Link href="https://www.x.com/techon345" target="_blank">
                    <FaXTwitter className="w-6 h-6 text-white hover:text-gray-400 cursor-pointer transition-colors" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/techon345"
                    target="_blank"
                  >
                    <FaLinkedin className="w-6 h-6 text-white hover:text-blue-600 cursor-pointer transition-colors" />
                  </Link>
                  <Link
                    href="https://www.pinterest.com/techon345"
                    target="_blank"
                  >
                    <FaPinterest className="w-6 h-6 text-white hover:text-red-600 cursor-pointer transition-colors" />
                  </Link>
                  <Link
                    href="https://www.threads.net/@techon345"
                    target="_blank"
                  >
                    <FaThreads className="w-6 h-6 text-white hover:text-gray-400 cursor-pointer transition-colors" />
                  </Link>
                  <Link
                    href="https://www.snapchat.com/@techon345"
                    target="_blank"
                  >
                    <FaSnapchat className="w-6 h-6 text-white hover:text-yellow-400 cursor-pointer transition-colors" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <FooterDark />
    </div>
  );
}
