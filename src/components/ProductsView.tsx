import { useEffect, useState } from "react";
import ProductsGrid from "./ProductsGrid";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";

const ProductsView = () => {
  const [category, setCategory] = useState("all");

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch("/products.json");
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setProducts(data);
  //     } catch (error) {
  //       console.error("Failed to fetch products:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  const { allProducts } = useCart();

  // const filteredProducts =
  //   category === "all"
  //     ? allProducts
  //     : allProducts.filter((product) => product.category === category);

  return (
    <div className="products-view container mx-auto">
      {/* //category filter */}
      <div className="bg-pink-900 text-white p-2 mb-4 rounded max-w-sm flex justify-between items-center">
        <select>
          <option value="all">All Categories</option>
          <option value="hoodie">Hoodies</option>
          <option value="jacket">Jackets</option>
          <option value="shoes">Shoes</option>
        </select>
      </div>

      <div>
        {/* //product grid */}

        <ProductsGrid products={allProducts} />
      </div>
    </div>
  );
};

export default ProductsView;
