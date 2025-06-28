import { useEffect, useState } from "react";
import ProductsGrid from "./ProductsGrid";
import type { Product } from "../types";



const ProductsView = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/products.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);

  return (
    <div className="products-view container mx-auto">
      {/* //category filter */}
      <div className="bg-blue-500 text-white p-2 mb-4 rounded max-w-sm flex justify-between items-center">
        <select>
          <option value="all">All Categories</option>
          <option value="hoodie">Hoodies</option>
          <option value="jacket">Jackets</option>
          <option value="shoes">Shoes</option>
        </select>
      </div>

      <div>
        {/* //product grid */}

        <ProductsGrid products={filteredProducts} />
      </div>
    </div>
  );
};

export default ProductsView;
