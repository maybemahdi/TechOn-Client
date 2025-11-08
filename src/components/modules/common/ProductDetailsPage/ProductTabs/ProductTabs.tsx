"use client";

import { ProductDetails } from "@/types/product";
import { Tabs, Collapse } from "antd";
import type { TabsProps } from "antd";

export function ProductTabs({ productData }: { productData: ProductDetails }) {
  // const faqData = [
  //   {
  //     key: "1",
  //     label: "How do I create a custom T-shirt design?",
  //     children: (
  //       <p className="text-gray-600 leading-relaxed">
  //         After you place your order, our team takes 2-3 business days to
  //         carefully hand-print your design. Once shipped, U.S. orders typically
  //         arrive in 3-5 business days with free tracking, while international
  //         orders take 7-14 business days depending on location. You'll receive a
  //         shipping confirmation email with tracking details as soon as your
  //         order is on its way, plus a helpful care guide to keep your tee
  //         looking its best. Need your design sooner? Express shipping options
  //         are available at checkout for faster delivery!
  //       </p>
  //     ),
  //   },
  //   {
  //     key: "2",
  //     label: "How do I create a custom T-shirt design?",
  //     children: (
  //       <p className="text-gray-600 leading-relaxed">
  //         After you place your order, our team takes 2-3 business days to
  //         carefully hand-print your design. Once shipped, U.S. orders typically
  //         arrive in 3-5 business days with free tracking, while international
  //         orders take 7-14 business days depending on location.
  //       </p>
  //     ),
  //   },
  //   {
  //     key: "3",
  //     label: "How do I create a custom T-shirt design?",
  //     children: (
  //       <p className="text-gray-600 leading-relaxed">
  //         After you place your order, our team takes 2-3 business days to
  //         carefully hand-print your design. Once shipped, U.S. orders typically
  //         arrive in 3-5 business days with free tracking, while international
  //         orders take 7-14 business days depending on location.
  //       </p>
  //     ),
  //   },
  //   {
  //     key: "4",
  //     label: "How do I create a custom T-shirt design?",
  //     children: (
  //       <p className="text-gray-600 leading-relaxed">
  //         After you place your order, our team takes 2-3 business days to
  //         carefully hand-print your design. Once shipped, U.S. orders typically
  //         arrive in 3-5 business days with free tracking, while international
  //         orders take 7-14 business days depending on location.
  //       </p>
  //     ),
  //   },
  //   {
  //     key: "5",
  //     label: "How do I create a custom T-shirt design?",
  //     children: (
  //       <p className="text-gray-600 leading-relaxed">
  //         After you place your order, our team takes 2-3 business days to
  //         carefully hand-print your design. Once shipped, U.S. orders typically
  //         arrive in 3-5 business days with free tracking, while international
  //         orders take 7-14 business days depending on location.
  //       </p>
  //     ),
  //   },
  // ];

  const faqData =
    Array.isArray(productData?.faq) &&
    productData?.faq?.map((faq, index: number) => ({
      key: `${index + 1}`,
      label: faq.question,
      children: <p className="text-gray-600 leading-relaxed">{faq?.answer || faq?.ans}</p>,
    }));

  const items: TabsProps["items"] = [
    {
      key: "description",
      label: "Description",
      children: (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {productData?.title}
          </h2>
          <div className="text-gray-600 leading-relaxed space-y-4">
            <p>{productData?.description}</p>
          </div>
        </div>
      ),
    },
    {
      key: "faq",
      label: "FAQ",
      children: (
        <Collapse
          items={faqData ? faqData : undefined}
          className="w-full"
          ghost
          expandIconPosition="end"
        />
      ),
    },
  ];

  return (
    <div className="mb-12">
      <Tabs
        defaultActiveKey="description"
        items={items}
        className="antd-custom-tabs"
        size="small"
      />

      <style jsx global>{`
        .antd-custom-tabs .ant-tabs-tab {
          background: transparent !important;
          border: 1px solid #d1d5db !important;
          border-radius: 6px !important;
          margin-right: 3px !important;
          width: 200px !important;
          text-align: center !important;
          padding-left: 20px !important;
          margin-bottom: 8px !important;
          border-radius: 10px !important;
        }

        .antd-custom-tabs .ant-tabs-tab-active {
          background: #f97316 !important;
          color: white !important;
          border-color: #f97316 !important;
        }

        .antd-custom-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: white !important;
        }

        .antd-custom-tabs .ant-tabs-ink-bar {
          display: none !important;
        }

        .antd-custom-tabs .ant-collapse-item {
          border: 1px solid #fed7aa !important;
          border-radius: 8px !important;
          margin-bottom: 8px !important;
        }
      `}</style>
    </div>
  );
}
