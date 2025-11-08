import ProductCard from "@/components/shared/ProductCard/ProductCard";
import { cn } from "@/lib/utils";
import { Product } from "@/types/product";

const BestSelling = ({
  bg,
  isDark = false,
  products,
}: {
  bg: string;
  isDark?: boolean;
  products: Product[];
}) => {
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 md:mt-16">
      <div className="col-span-3 space-y-3 mb-5">
        <div className="text-sm text-white bg-gray-500 rounded-md w-fit mx-auto px-2 py-1">
          Best selling
        </div>
        <h3
          className={cn(
            "text-2xl text-black md:text-[34px] font-semibold text-center",
            {
              "text-white": isDark,
            }
          )}
        >
          You May Also Like
        </h3>
      </div>
      {products?.map((product) => (
        <ProductCard bg={bg} key={product.id} product={product} />
      ))}
    </div>
  );
};

export default BestSelling;
