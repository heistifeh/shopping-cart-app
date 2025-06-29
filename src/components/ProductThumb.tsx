import { Link } from "react-router-dom";
import type { Product } from "../types";
import CartButton from "./ui/CartButton";

const ProductThumb = ({ product }: { product: Product }) => {
  const isOutOfStock = product.isOutOfStock === true;
  return (
    <div
      // to={`/products/${product.id}`}
      key={product.id}
      className="group relative flex flex-col gap-y-2 items-center justify-center bg-white p-24 h-[300px] cursor-pointer  rounded-lg border border-gray-200 shadow hover:shadow-md "
    >
      <img
        src={product.image}
        alt="Product Image"
        width={100}
        height={100}
        className={`${"group-hover:-translate-y-2 transition-all duration-500 sm:scale-120 md:scale-130"}`}
      />
      <div className="absolute bottom-5 left-5">
        <h1 className={`text-zinc-700 "text-sm`}>{product.name}</h1>
        <span className={`text-pink-400 "text-sm`}>${product.price}</span>
      </div>
      {isOutOfStock && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-500/10">
          <span className="text-white font-bold text-lg">Out of Stock</span>
        </div>
      )}

      <CartButton product={product} />
    </div>
  );
};

export default ProductThumb;
