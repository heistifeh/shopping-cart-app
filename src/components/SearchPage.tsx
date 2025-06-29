// src/pages/SearchPage.tsx
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useMemo, useState } from "react";
import ProductThumb from "./ProductThumb";
import type { Product } from "../types";
import Navbar from "./Navbar";
import ProductsView from "./ProductsView";
import ProductsGrid from "./ProductsGrid";
import { MdOutlineArrowBackIos } from "react-icons/md";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
  const { allProducts } = useCart();
  const query = useQuery().get("query")?.toLowerCase() || "";
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    const matched = allProducts.filter((p) =>
      p.name.toLowerCase().includes(query)
    );
    setResults(matched);
  }, [query, allProducts]);

  return (
    <>
      <div className="bg-gray-100 min-h-screen font-titillium">
        <div className="px-4 container mx-auto">
          <Navbar />
          {results.length > 0 ? (
            // <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            //   {results.map((product) => (
            //     <ProductThumb key={product.id} product={product} scale={120} />
            //   ))}
            // </div>
            <ProductsGrid products={results} />
          ) : (
            <p className="text-gray-500">No products found.</p>
          )}

          <div className="mt-8 text-center">
            <Link
              to="/"
              className="flex items-center justify-center text-base sm:text-base  hover:underline hover:text-blue-800 transition bg-pink-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 max-w-sm mx-auto"
            >
              <MdOutlineArrowBackIos />

              <span>Go back to explore all products</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
