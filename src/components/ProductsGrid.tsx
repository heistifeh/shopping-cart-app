import type { Product } from "../types";
import ProductThumb from "./ProductThumb";

const ProductsGrid = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
      {products.map((product) => (
        <ProductThumb key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsGrid;
