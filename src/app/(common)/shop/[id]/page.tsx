import ProductDetailsPage from "@/components/modules/common/ProductDetailsPage";
import React from "react";

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <div>
      <ProductDetailsPage id={id} />
    </div>
  );
};





export default ProductDetails;
