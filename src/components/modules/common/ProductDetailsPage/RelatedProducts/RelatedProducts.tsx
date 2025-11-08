"use client";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import { Product } from "@/types/product";

export function RelatedProducts({products}: {products: Product[]}) {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center space-y-2">
        <div className="text-sm text-gray-500">Related Products</div>
        <h2 className="text-2xl font-semibold text-gray-900">
          You May Also Like
        </h2>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
